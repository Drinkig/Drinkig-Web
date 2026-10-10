import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  fallbackBottle,
  fetchStoreDetail,
  formatWon,
  getSessionId,
  logStoreEvent,
  recommendStore,
  StoreApiError,
  type Recommendation,
  type RecommendedWine,
  type StoreDetail,
  type Taste,
} from "../../lib/storeApi";
import { APP_STORE_URL } from "../../lib/constants";
import { EASE } from "../../lib/motion";
import { AppleLogo } from "../icons";
import { StoreShell } from "./StoreShell";

/**
 * /s/{slug} — QR을 찍은 손님의 흐름.
 *   intro → 취향 질문 5개 → 예산 → 결과
 * 앱 온보딩과 같은 다섯 축(1~5)을 일상 말로 묻는다. "잘 모르겠어요"는 null(서버에서 3으로 처리).
 */

type Axis = keyof Taste;

const QUESTIONS: Array<{ axis: Axis; title: string; hint: string; options: [string, string, string, string, string] }> = [
  { axis: "sweetness", title: "단맛은 어느 정도가 좋아요?", hint: "식사와 같이면 보통 드라이한 쪽이 잘 맞아요.", options: ["드라이하게", "살짝만", "보통", "달달하게", "아주 달게"] },
  { axis: "acidity", title: "새콤한 맛은요?", hint: "레몬이나 자몽 같은 상큼함이에요.", options: ["거의 없게", "살짝", "보통", "상큼하게", "아주 새콤하게"] },
  { axis: "tannin", title: "입안이 떫은 느낌은요?", hint: "진한 홍차를 마셨을 때처럼 입이 조이는 느낌이에요.", options: ["부드럽게", "살짝", "보통", "꽤 떫게", "아주 떫게"] },
  { axis: "body", title: "무게감은요?", hint: "가벼운 건 물처럼, 묵직한 건 우유처럼 입에 남아요.", options: ["가볍게", "살짝 가볍게", "보통", "묵직하게", "아주 묵직하게"] },
  { axis: "alcohol", title: "도수는요?", hint: "와인은 보통 11도에서 15도 사이예요.", options: ["낮게", "살짝 낮게", "보통", "높게", "아주 높게"] },
];

const EMPTY_TASTE: Taste = { sweetness: null, acidity: null, tannin: null, body: null, alcohol: null };
const STEP_INTRO = 0;
const STEP_BUDGET = QUESTIONS.length + 1;
const STEP_RESULT = QUESTIONS.length + 2;

const slide = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.3, ease: EASE },
};

export function StoreApp() {
  const { slug = "" } = useParams<{ slug: string }>();
  const sessionId = useMemo(() => getSessionId(), []);
  const [store, setStore] = useState<StoreDetail | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [failed, setFailed] = useState(false);
  const [step, setStep] = useState(STEP_INTRO);
  const [taste, setTaste] = useState<Taste>(EMPTY_TASTE);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sorts, setSorts] = useState<string[]>([]);
  const [result, setResult] = useState<Recommendation | null>(null);
  const [recommending, setRecommending] = useState(false);
  const visited = useRef(false);

  useEffect(() => {
    let cancelled = false;
    fetchStoreDetail(slug)
      .then((d) => {
        if (cancelled) return;
        setStore(d);
        if (!visited.current) {
          visited.current = true;
          logStoreEvent(slug, "VISIT", sessionId);
        }
      })
      .catch((e) => {
        if (cancelled) return;
        if (e instanceof StoreApiError && (e.status === 404 || e.code?.startsWith("STORE"))) setNotFound(true);
        else setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [slug, sessionId]);

  // 예산 슬라이더 범위: 매장 가격대를 만 원 단위로 반올림
  const budget = useMemo(() => {
    if (!store?.priceMin || !store?.priceMax) return null;
    const min = Math.max(10000, Math.floor(store.priceMin / 10000) * 10000);
    const max = Math.max(min + 10000, Math.ceil(store.priceMax / 10000) * 10000);
    return { min, max, step: 10000 };
  }, [store]);

  useEffect(() => {
    if (budget && maxPrice === null && step < STEP_BUDGET) setMaxPrice(Math.round((budget.min + budget.max) / 2 / 10000) * 10000);
    // 처음 한 번만 기본값을 잡는다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budget]);

  const answer = (axis: Axis, value: number | null) => {
    setTaste((t) => ({ ...t, [axis]: value }));
    window.setTimeout(() => setStep((s) => s + 1), 160);
  };

  const [noBudget, setNoBudget] = useState(false);

  const submit = useCallback(async () => {
    if (!store || recommending) return;
    setRecommending(true);
    setStep(STEP_RESULT);
    try {
      const r = await recommendStore(slug, taste, noBudget ? null : maxPrice, sorts, sessionId);
      setResult(r);
      logStoreEvent(slug, "RESULT_VIEW", sessionId, undefined, { top: r.wines.slice(0, 5).map((w) => w.storeWineId) });
    } catch {
      setResult({ storeName: store.name, budgetRelaxed: false, wines: [] });
    } finally {
      setRecommending(false);
    }
  }, [store, recommending, slug, taste, noBudget, maxPrice, sorts, sessionId]);

  const restart = () => {
    setTaste(EMPTY_TASTE);
    setResult(null);
    setStep(1);
  };

  // ---- 상태 화면 ----
  if (notFound) {
    return (
      <StoreShell>
        <h1 className="text-[1.75rem] font-bold leading-[1.2] tracking-[-0.03em] text-ink">아직 준비 중인 매장이에요</h1>
        <p className="mt-3 text-ink-soft">QR이 맞는지 확인해 주세요. 근처 다른 매장을 찾아볼 수도 있어요.</p>
        <Link to="/s" className="btn-secondary mt-8 self-start">
          근처 매장 찾기
        </Link>
      </StoreShell>
    );
  }
  if (failed) {
    return (
      <StoreShell>
        <h1 className="text-[1.75rem] font-bold leading-[1.2] tracking-[-0.03em] text-ink">잠시 연결이 안 돼요</h1>
        <p className="mt-3 text-ink-soft">네트워크를 확인하고 다시 열어주세요.</p>
      </StoreShell>
    );
  }
  if (!store) {
    return (
      <StoreShell>
        <div className="h-8 w-2/3 animate-pulse rounded bg-paper-deep" />
        <div className="mt-4 h-4 w-full animate-pulse rounded bg-paper-deep" />
      </StoreShell>
    );
  }

  const progress = step === STEP_INTRO ? 0 : step >= STEP_RESULT ? 1 : step / STEP_RESULT;

  // ---- 화면 ----
  return (
    <StoreShell
      progress={progress}
      footer={
        step === STEP_INTRO ? (
          <button type="button" className="btn-primary w-full" onClick={() => setStep(1)}>
            시작하기
          </button>
        ) : step === STEP_BUDGET ? (
          <button type="button" className="btn-primary w-full" onClick={submit}>
            와인 골라보기
          </button>
        ) : step === STEP_RESULT && result && !recommending ? (
          <div className="flex gap-2">
            <button type="button" className="btn-secondary flex-1" onClick={restart}>
              다시 고르기
            </button>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1">
              <AppleLogo className="h-4 w-4" />
              취향 저장하기
            </a>
          </div>
        ) : undefined
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {step === STEP_INTRO && (
          <motion.section key="intro" {...slide} className="flex flex-1 flex-col">
            <p className="text-sm text-ink-muted">{store.address ?? "드링키지 도입 매장"}</p>
            <h1 className="mt-2 text-[2rem] font-bold leading-[1.15] tracking-[-0.03em] text-ink">{store.name}</h1>
            <p className="mt-5 text-lg leading-[1.6] text-ink-soft">
              질문 5개에 답하면
              <br />
              이 집 와인 {store.wineCount}병 중에서
              <br />
              지금 입맛에 맞는 병을 골라드려요.
            </p>
            {store.description && <p className="mt-4 text-ink-muted">{store.description}</p>}
            {budget && (
              <p className="mt-auto pt-10 text-sm text-ink-muted">
                {formatWon(store.priceMin!)} ~ {formatWon(store.priceMax!)}
              </p>
            )}
          </motion.section>
        )}

        {step >= 1 && step <= QUESTIONS.length && (
          <motion.section key={`q${step}`} {...slide}>
            <QuestionScreen
              index={step}
              q={QUESTIONS[step - 1]}
              value={taste[QUESTIONS[step - 1].axis]}
              onAnswer={(v) => answer(QUESTIONS[step - 1].axis, v)}
              onBack={() => setStep((s) => s - 1)}
            />
          </motion.section>
        )}

        {step === STEP_BUDGET && (
          <motion.section key="budget" {...slide}>
            <BackButton onClick={() => setStep(QUESTIONS.length)} />
            <h2 className="mt-4 text-[1.6rem] font-bold leading-[1.2] tracking-[-0.03em] text-ink">한 병에 얼마까지 생각하세요?</h2>
            <p className="mt-2 text-ink-muted">예산 안에서 먼저 골라드려요. 조금 넘는 와인도 따로 보여드려요.</p>

            {budget ? (
              <div className="mt-8">
                <p className="text-[2rem] font-bold tracking-[-0.03em] text-ink">
                  {noBudget ? "상관없어요" : `${formatWon(maxPrice ?? budget.max)} 이하`}
                </p>
                <input
                  type="range"
                  min={budget.min}
                  max={budget.max}
                  step={budget.step}
                  value={maxPrice ?? budget.max}
                  disabled={noBudget}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="range mt-4 w-full"
                  aria-label="최대 가격"
                />
                <div className="mt-1 flex justify-between text-xs text-ink-muted">
                  <span>{formatWon(budget.min)}</span>
                  <span>{formatWon(budget.max)}</span>
                </div>
                <button
                  type="button"
                  className={`mt-5 rounded-full px-4 py-2 text-sm transition-colors ${noBudget ? "bg-ink text-paper" : "bg-white/70 text-ink-soft"}`}
                  onClick={() => setNoBudget((v) => !v)}
                  aria-pressed={noBudget}
                >
                  예산은 상관없어요
                </button>
              </div>
            ) : (
              <p className="mt-8 text-ink-muted">이 매장은 가격 정보가 없어요. 바로 골라드릴게요.</p>
            )}

            {store.sorts.length > 1 && (
              <div className="mt-10">
                <p className="text-sm text-ink-muted">종류를 정해두셨다면</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["전체", ...store.sorts].map((s) => {
                    const on = s === "전체" ? sorts.length === 0 : sorts.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setSorts(s === "전체" ? [] : sorts.includes(s) ? sorts.filter((x) => x !== s) : [...sorts, s])}
                        className={`rounded-full px-4 py-2 text-sm transition-colors ${on ? "bg-ink text-paper" : "bg-white/70 text-ink-soft"}`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.section>
        )}

        {step === STEP_RESULT && (
          <motion.section key="result" {...slide}>
            <ResultScreen store={store} result={result} loading={recommending} onPick={(w) => logStoreEvent(slug, "WINE_CLICK", sessionId, w.storeWineId)} />
          </motion.section>
        )}
      </AnimatePresence>
    </StoreShell>
  );
}

// ---- 부품 ----

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="-ml-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm text-ink-muted hover:text-ink" aria-label="이전">
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 12H5M11 18l-6-6 6-6" />
      </svg>
      이전
    </button>
  );
}

function QuestionScreen({
  index,
  q,
  value,
  onAnswer,
  onBack,
}: {
  index: number;
  q: (typeof QUESTIONS)[number];
  value: number | null;
  onAnswer: (v: number | null) => void;
  onBack: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(value);
  return (
    <>
      <BackButton onClick={onBack} />
      <p className="mt-4 text-sm text-ink-muted">
        {index} / {QUESTIONS.length}
      </p>
      <h2 className="mt-1 text-[1.6rem] font-bold leading-[1.2] tracking-[-0.03em] text-ink">{q.title}</h2>
      <p className="mt-2 text-ink-muted">{q.hint}</p>
      <ul className="mt-7 space-y-2.5">
        {q.options.map((label, i) => {
          const v = i + 1;
          const on = picked === v;
          return (
            <li key={v}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setPicked(v);
                  onAnswer(v);
                }}
                className={`w-full rounded-2xl px-5 py-4 text-left text-lg transition-colors ${on ? "bg-ink text-paper" : "bg-white/70 text-ink hover:bg-white"}`}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
      <button type="button" className="mt-5 text-sm text-ink-muted underline decoration-paper-line underline-offset-4 hover:text-ink" onClick={() => onAnswer(null)}>
        잘 모르겠어요
      </button>
    </>
  );
}

function ResultScreen({
  store,
  result,
  loading,
  onPick,
}: {
  store: StoreDetail;
  result: Recommendation | null;
  loading: boolean;
  onPick: (w: RecommendedWine) => void;
}) {
  const [open, setOpen] = useState<number | null>(null);

  if (loading || !result) {
    return (
      <>
        <h2 className="text-[1.6rem] font-bold leading-[1.2] tracking-[-0.03em] text-ink">입맛에 맞춰 고르는 중</h2>
        <ul className="mt-8 space-y-3" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <li key={i} className="h-24 animate-pulse rounded-2xl bg-paper-deep" />
          ))}
        </ul>
      </>
    );
  }
  if (result.wines.length === 0) {
    return (
      <>
        <h2 className="text-[1.6rem] font-bold leading-[1.2] tracking-[-0.03em] text-ink">맞는 와인을 못 찾았어요</h2>
        <p className="mt-3 text-ink-soft">종류나 예산을 바꿔서 다시 골라보세요.</p>
      </>
    );
  }

  const inBudget = result.wines.filter((w) => !w.overBudget);
  const over = result.wines.filter((w) => w.overBudget);

  const card = (w: RecommendedWine, rank: number) => {
    const expanded = open === w.storeWineId;
    return (
      <li key={w.storeWineId}>
        <button
          type="button"
          onClick={() => {
            setOpen(expanded ? null : w.storeWineId);
            if (!expanded) onPick(w);
          }}
          className="flex w-full gap-4 rounded-2xl bg-white/70 p-4 text-left transition-colors hover:bg-white"
          aria-expanded={expanded}
        >
          <div className="relative h-24 w-14 shrink-0">
            <img src={w.imageUrl ?? fallbackBottle(w.sort)} alt="" className="h-full w-full object-contain" loading="lazy" />
            <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs font-semibold text-paper">{rank}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-2">
              <p className="min-w-0 flex-1 font-semibold leading-snug text-ink">{w.name}</p>
              <span className="shrink-0 rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-paper">{w.matchScore}점</span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {w.sort} · {formatWon(w.price)}
              {w.glassPrice ? ` · 잔 ${formatWon(w.glassPrice)}` : ""}
            </p>
            {expanded && w.description && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{w.description}</p>}
            {expanded && !w.description && <p className="mt-2 text-sm text-ink-muted">직원에게 이 이름을 말씀해 주세요.</p>}
          </div>
        </button>
      </li>
    );
  };

  return (
    <>
      <p className="text-sm text-ink-muted">{store.name}</p>
      <h2 className="mt-1 text-[1.6rem] font-bold leading-[1.2] tracking-[-0.03em] text-ink">지금 입맛에 맞는 순서예요</h2>
      <p className="mt-2 text-ink-muted">점수가 높을수록 잘 맞아요. 눌러서 설명을 보고, 직원에게 이름을 말씀하세요.</p>
      <ul className="mt-6 space-y-3">{inBudget.map((w, i) => card(w, i + 1))}</ul>
      {over.length > 0 && (
        <>
          <p className="mt-8 text-sm text-ink-muted">예산을 조금 넘지만 잘 맞는 와인</p>
          <ul className="mt-3 space-y-3">{over.map((w, i) => card(w, inBudget.length + i + 1))}</ul>
        </>
      )}
    </>
  );
}
