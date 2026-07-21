import { useMemo, useRef, useState, type ReactNode } from "react";

// 어드민 차트 공용 모듈 — 다크 서피스(#111111) 기준으로 검증된 색상만 사용한다.
// 시리즈 색: blue #3987e5 / aqua #199e70 / yellow #c98500 / violet #9085e9 / red #e66767
// 크롬(잉크) 색: 그리드 #2c2c2a, 베이스라인 #383835, 축 라벨 #898781, 보조 텍스트 #c3c2b7

export const SERIES = {
  blue: "#3987e5",
  aqua: "#199e70",
  yellow: "#c98500",
  violet: "#9085e9",
  red: "#e66767",
} as const;

const GRID = "#2c2c2a";
const BASELINE = "#383835";
const MUTED = "#898781";

export function StatTile({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-surface-raised px-4 py-3.5">
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-zinc-500">{sub}</p>}
    </div>
  );
}

export function ChartCard({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-surface-raised p-4">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="text-sm font-medium text-zinc-200">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

export interface Point {
  date: string;
  value: number;
}

function formatDateShort(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${Number(m)}.${Number(d)}`;
}

function niceMax(max: number): number {
  if (max <= 0) return 4;
  const pow = 10 ** Math.floor(Math.log10(max));
  for (const mult of [1, 2, 4, 5, 10]) {
    if (mult * pow >= max) return mult * pow;
  }
  return 10 * pow;
}

const W = 600;
const H = 180;
const PAD_L = 36;
const PAD_R = 8;
const PAD_T = 8;
const PAD_B = 22;

// 단일 시리즈 라인 차트 — 제목이 시리즈명을 대신하므로 범례 없음.
// 호버 시 크로스헤어 + 툴팁, 마커는 호버 시에만 노출.
export function LineChart({
  data,
  color,
  formatValue = (v: number) => v.toLocaleString(),
}: {
  data: Point[];
  color: string;
  formatValue?: (v: number) => string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const { points, yMax, ticks } = useMemo(() => {
    const max = niceMax(Math.max(0, ...data.map((d) => d.value)));
    const innerW = W - PAD_L - PAD_R;
    const innerH = H - PAD_T - PAD_B;
    const pts = data.map((d, i) => ({
      x: PAD_L + (data.length <= 1 ? innerW / 2 : (i / (data.length - 1)) * innerW),
      y: PAD_T + innerH - (d.value / max) * innerH,
    }));
    return { points: pts, yMax: max, ticks: [0, max / 2, max] };
  }, [data]);

  if (data.length === 0) {
    return <p className="py-10 text-center text-sm text-zinc-500">데이터가 없습니다</p>;
  }

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const baselineY = H - PAD_B;
  const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(1)},${baselineY} L${points[0].x.toFixed(1)},${baselineY} Z`;

  // x축 라벨은 5개 내외만
  const labelStep = Math.max(1, Math.ceil(data.length / 5));

  const handleMove = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let best = Infinity;
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - x);
      if (dist < best) {
        best = dist;
        nearest = i;
      }
    });
    setHover(nearest);
  };

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseLeave={() => setHover(null)}
      >
        {ticks.map((t) => {
          const y = PAD_T + (H - PAD_T - PAD_B) * (1 - t / yMax);
          return (
            <g key={t}>
              <line x1={PAD_L} x2={W - PAD_R} y1={y} y2={y} stroke={t === 0 ? BASELINE : GRID} strokeWidth={1} />
              <text x={PAD_L - 6} y={y + 3.5} textAnchor="end" fontSize={10} fill={MUTED}>
                {t >= 1000 ? `${t / 1000}k` : t}
              </text>
            </g>
          );
        })}
        {data.map((d, i) =>
          i % labelStep === 0 ? (
            <text key={d.date} x={points[i].x} y={H - 6} textAnchor="middle" fontSize={10} fill={MUTED}>
              {formatDateShort(d.date)}
            </text>
          ) : null,
        )}
        <path d={areaPath} fill={color} opacity={0.08} />
        <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
        {hover !== null && (
          <>
            <line
              x1={points[hover].x}
              x2={points[hover].x}
              y1={PAD_T}
              y2={H - PAD_B}
              stroke={MUTED}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <circle cx={points[hover].x} cy={points[hover].y} r={4} fill={color} stroke="#111111" strokeWidth={2} />
          </>
        )}
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute -top-1 rounded-md border border-white/10 bg-black/90 px-2.5 py-1.5 text-xs whitespace-nowrap"
          style={{
            left: `${(points[hover].x / W) * 100}%`,
            transform: points[hover].x > W * 0.7 ? "translateX(-105%)" : "translateX(8px)",
          }}
        >
          <span className="text-zinc-400">{data[hover].date}</span>{" "}
          <span className="font-medium text-white">{formatValue(data[hover].value)}</span>
        </div>
      )}
    </div>
  );
}

// 수직 바 차트 (다운로드 추이용) — 4px 라운드 상단, 바 간 2px 갭, 호버 툴팁
export function BarChart({
  data,
  color,
  formatValue = (v: number) => v.toLocaleString(),
}: {
  data: Point[];
  color: string;
  formatValue?: (v: number) => string;
}) {
  const [hover, setHover] = useState<number | null>(null);

  const yMax = niceMax(Math.max(0, ...data.map((d) => d.value)));
  if (data.length === 0) {
    return <p className="py-10 text-center text-sm text-zinc-500">데이터가 없습니다</p>;
  }

  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const slot = innerW / data.length;
  const barW = Math.max(2, Math.min(28, slot - 2));
  const labelStep = Math.max(1, Math.ceil(data.length / 5));
  const ticks = [0, yMax / 2, yMax];

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" onMouseLeave={() => setHover(null)}>
        {ticks.map((t) => {
          const y = PAD_T + innerH * (1 - t / yMax);
          return (
            <g key={t}>
              <line x1={PAD_L} x2={W - PAD_R} y1={y} y2={y} stroke={t === 0 ? BASELINE : GRID} strokeWidth={1} />
              <text x={PAD_L - 6} y={y + 3.5} textAnchor="end" fontSize={10} fill={MUTED}>
                {t >= 1000 ? `${t / 1000}k` : t}
              </text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const h = (d.value / yMax) * innerH;
          const x = PAD_L + i * slot + (slot - barW) / 2;
          const y = PAD_T + innerH - h;
          return (
            <g key={d.date}>
              {/* 히트 타깃은 마크보다 크게 */}
              <rect
                x={PAD_L + i * slot}
                y={PAD_T}
                width={slot}
                height={innerH}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
              />
              {d.value > 0 && (
                <path
                  d={`M${x},${PAD_T + innerH} L${x},${y + 4} Q${x},${y} ${x + 4},${y} L${x + barW - 4},${y} Q${x + barW},${y} ${x + barW},${y + 4} L${x + barW},${PAD_T + innerH} Z`}
                  fill={color}
                  opacity={hover === null || hover === i ? 1 : 0.45}
                />
              )}
              {i % labelStep === 0 && (
                <text x={PAD_L + i * slot + slot / 2} y={H - 6} textAnchor="middle" fontSize={10} fill={MUTED}>
                  {formatDateShort(d.date)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute -top-1 rounded-md border border-white/10 bg-black/90 px-2.5 py-1.5 text-xs whitespace-nowrap"
          style={{
            left: `${((PAD_L + hover * slot + slot / 2) / W) * 100}%`,
            transform: hover > data.length * 0.7 ? "translateX(-105%)" : "translateX(8px)",
          }}
        >
          <span className="text-zinc-400">{data[hover].date}</span>{" "}
          <span className="font-medium text-white">{formatValue(data[hover].value)}</span>
        </div>
      )}
    </div>
  );
}

// 퍼널 — 수평 바, 블루 순서형 램프(다크 서피스 2:1 이상 단계만 사용),
// 값·전환율은 잉크 토큰으로 직접 라벨링
const FUNNEL_RAMP = ["#3987e5", "#2a78d6", "#256abf", "#1c5cab", "#184f95"];

export function FunnelChart({ stages }: { stages: { label: string; value: number }[] }) {
  const max = Math.max(1, ...stages.map((s) => s.value));
  return (
    <ol className="space-y-2.5">
      {stages.map((stage, i) => {
        const prev = i === 0 ? null : stages[i - 1].value;
        const rate = prev && prev > 0 ? Math.round((stage.value / prev) * 100) : null;
        const widthPct = Math.max(1.5, (stage.value / max) * 100);
        return (
          <li key={stage.label}>
            <div className="flex items-baseline justify-between text-xs mb-1">
              <span className="text-zinc-300">{stage.label}</span>
              <span className="text-zinc-400">
                <span className="font-medium text-white">{stage.value.toLocaleString()}</span>
                {rate !== null && <span className="ml-1.5">({rate}%)</span>}
              </span>
            </div>
            <div className="h-4 rounded-r bg-black/30">
              <div
                className="h-full rounded-r"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: FUNNEL_RAMP[Math.min(i, FUNNEL_RAMP.length - 1)],
                }}
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
