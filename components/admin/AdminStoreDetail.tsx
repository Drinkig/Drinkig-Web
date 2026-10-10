import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import QRCode from "qrcode";
import { Button } from "../ui/button";
import {
  changeStoreStatus,
  deleteStoreWine,
  fetchStore,
  fetchStoreStats,
  fetchStoreWines,
  searchAdminWines,
  updateStore,
  updateStoreWine,
  uploadStoreWinesCsv,
  type AdminWinePreview,
  type Store,
  type StoreStats,
  type StoreWine,
  type StoreWineCsvResult,
} from "../../lib/adminApi";
import { SITE_URL } from "../../lib/constants";
import { Badge, ErrorState, LoadingState } from "./shared";
import { STORE_TYPE_LABEL } from "./AdminStores";

const INPUT =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-purple-500 focus:outline-none";
const AXES: Array<[keyof Pick<StoreWine, "sweetness" | "acidity" | "tannin" | "body" | "alcohol">, string]> = [
  ["sweetness", "당도"],
  ["acidity", "산도"],
  ["tannin", "타닌"],
  ["body", "바디"],
  ["alcohol", "알코올"],
];

export function AdminStoreDetail() {
  const { storeId: idParam } = useParams<{ storeId: string }>();
  const storeId = Number(idParam);
  const [store, setStore] = useState<Store | null>(null);
  const [wines, setWines] = useState<StoreWine[] | null>(null);
  const [stats, setStats] = useState<StoreStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [s, w, st] = await Promise.all([fetchStore(storeId), fetchStoreWines(storeId), fetchStoreStats(storeId, 30)]);
      setStore(s);
      setWines(w);
      setStats(st);
    } catch (err) {
      setError(err instanceof Error ? err.message : "매장을 불러오지 못했습니다.");
    }
  }, [storeId]);

  useEffect(() => {
    load();
  }, [load]);

  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!store || !wines) return <LoadingState />;

  return (
    <>
      <nav className="mb-4 text-xs text-zinc-500">
        <Link to="/admin/stores" className="hover:text-zinc-900">
          매장 관리
        </Link>{" "}
        / {store.name}
      </nav>

      <StoreHeader store={store} onChanged={setStore} />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <CsvCard storeId={storeId} onApplied={load} />
          <WineList storeId={storeId} wines={wines} onChanged={setWines} />
        </div>
        <div className="space-y-6">
          <QrCard slug={store.slug} name={store.name} />
          {stats && <StatsCard stats={stats} />}
        </div>
      </div>
    </>
  );
}

// ---- 매장 머리: 이름·상태·수정 ----

function StoreHeader({ store, onChanged }: { store: Store; onChanged: (s: Store) => void }) {
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: store.name,
    address: store.address ?? "",
    latitude: store.latitude?.toString() ?? "",
    longitude: store.longitude?.toString() ?? "",
    description: store.description ?? "",
    memo: store.memo ?? "",
  });

  const toggleStatus = async () => {
    if (busy) return;
    const next = store.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    if (next === "ACTIVE" && store.wineCount === 0 && !window.confirm("와인이 한 병도 없습니다. 그래도 노출할까요?")) return;
    setBusy(true);
    try {
      onChanged(await changeStoreStatus(store.storeId, next));
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    if (busy) return;
    setBusy(true);
    try {
      onChanged(
        await updateStore(store.storeId, {
          name: form.name.trim(),
          address: form.address.trim(),
          latitude: form.latitude.trim() ? Number(form.latitude) : null,
          longitude: form.longitude.trim() ? Number(form.longitude) : null,
          description: form.description.trim(),
          memo: form.memo.trim(),
        }),
      );
      setEditing(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <header className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-xl font-bold text-zinc-900">{store.name}</h2>
        <Badge tone={store.status === "ACTIVE" ? "good" : "pending"}>{store.status === "ACTIVE" ? "노출 중" : "준비 중"}</Badge>
        <Badge tone="neutral">{STORE_TYPE_LABEL[store.type]}</Badge>
        <div className="ml-auto flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setEditing((v) => !v)}>
            {editing ? "닫기" : "정보 수정"}
          </Button>
          <Button size="sm" variant={store.status === "ACTIVE" ? "destructive" : "default"} disabled={busy} onClick={toggleStatus}>
            {store.status === "ACTIVE" ? "노출 중지" : "손님에게 노출"}
          </Button>
        </div>
      </div>
      <p className="mt-1.5 text-sm text-zinc-500">
        <span className="font-mono">{SITE_URL}/s/{store.slug}</span>
        {store.address ? ` · ${store.address}` : ""}
      </p>
      {store.memo && !editing && <p className="mt-2 rounded-lg bg-zinc-100 p-2.5 text-xs text-zinc-600 whitespace-pre-wrap">{store.memo}</p>}

      {editing && (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Field label="매장명">
            <input className={INPUT} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="주소">
            <input className={INPUT} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </Field>
          <Field label="위도">
            <input className={INPUT} value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} inputMode="decimal" />
          </Field>
          <Field label="경도">
            <input className={INPUT} value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} inputMode="decimal" />
          </Field>
          <Field label="손님에게 보이는 한 줄 소개" full>
            <input className={INPUT} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} maxLength={500} />
          </Field>
          <Field label="운영 메모" full>
            <textarea className={INPUT} rows={2} value={form.memo} onChange={(e) => setForm({ ...form, memo: e.target.value })} maxLength={500} />
          </Field>
          <div className="md:col-span-2 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditing(false)} disabled={busy}>
              취소
            </Button>
            <Button size="sm" onClick={save} disabled={busy || !form.name.trim()}>
              {busy ? "저장 중..." : "저장"}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="block text-sm text-zinc-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

// ---- CSV 업로드 ----

function CsvCard({ storeId, onApplied }: { storeId: number; onApplied: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<StoreWineCsvResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const r = await uploadStoreWinesCsv(storeId, file);
      setResult(r);
      if (r.applied) onApplied();
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드에 실패했습니다.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <h3 className="text-base font-bold text-zinc-900">와인 리스트 CSV</h3>
        <Button size="sm" className="ml-auto" disabled={busy} onClick={() => fileRef.current?.click()}>
          {busy ? "올리는 중..." : "CSV 올리기"}
        </Button>
        <input ref={fileRef} type="file" accept=".csv,text/csv" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
      </div>
      <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
        열: <span className="font-mono">이름, 종류, 가격, 당도, 산도, 타닌, 바디, 알코올</span> (선택: 잔가격, 설명). 수치는 1~5, 가격은 "45,000원"처럼 써도 됩니다.
        같은 이름은 덮어쓰고(사진 연결 유지), CSV에 없는 와인은 지워집니다. 오류가 하나라도 있으면 아무것도 바뀌지 않습니다.
      </p>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {result && result.applied && (
        <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
          반영됐습니다. 추가 {result.created} · 수정 {result.updated} · 삭제 {result.deleted}
        </p>
      )}
      {result && !result.applied && (
        <div className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <p className="font-medium">반영되지 않았습니다. 아래를 고쳐서 다시 올려주세요.</p>
          <ul className="mt-1.5 list-disc pl-5 space-y-0.5 text-xs">
            {result.errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

// ---- 와인 리스트 ----

function WineList({ storeId, wines, onChanged }: { storeId: number; wines: StoreWine[]; onChanged: (w: StoreWine[]) => void }) {
  const [linking, setLinking] = useState<StoreWine | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const patch = async (w: StoreWine, body: Parameters<typeof updateStoreWine>[2]) => {
    setBusyId(w.storeWineId);
    try {
      const updated = await updateStoreWine(storeId, w.storeWineId, body);
      onChanged(wines.map((x) => (x.storeWineId === updated.storeWineId ? updated : x)));
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (w: StoreWine) => {
    if (!window.confirm(`"${w.name}"을(를) 리스트에서 지울까요?`)) return;
    setBusyId(w.storeWineId);
    try {
      await deleteStoreWine(storeId, w.storeWineId);
      onChanged(wines.filter((x) => x.storeWineId !== w.storeWineId));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h3 className="text-base font-bold text-zinc-900">
        와인 리스트 <span className="text-sm font-normal text-zinc-500">{wines.length}병</span>
      </h3>
      {wines.length === 0 ? (
        <p className="py-10 text-center text-sm text-zinc-500">아직 와인이 없습니다. 위에서 CSV를 올리세요.</p>
      ) : (
        <ul className="mt-3 divide-y divide-zinc-100">
          {wines.map((w) => (
            <li key={w.storeWineId} className={`flex gap-3 py-3 ${w.available ? "" : "opacity-50"}`}>
              <button
                type="button"
                title={w.wineId ? `와인 DB #${w.wineId} 연결됨 (${w.wineName})` : "사진을 붙이려면 와인 DB와 연결"}
                onClick={() => setLinking(w)}
                className="size-14 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 hover:border-purple-300"
              >
                {w.imageUrl ? (
                  <img src={w.imageUrl} alt="" className="size-full object-contain" />
                ) : (
                  <span className="flex size-full items-center justify-center text-[10px] text-zinc-400">사진<br />연결</span>
                )}
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-zinc-900">{w.name}</p>
                  <Badge tone="neutral">{w.sort}</Badge>
                  {!w.available && <Badge tone="bad">숨김</Badge>}
                </div>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {w.price.toLocaleString()}원{w.glassPrice ? ` · 잔 ${w.glassPrice.toLocaleString()}원` : ""}
                  {" · "}
                  {AXES.map(([k, label]) => `${label}${w[k]}`).join(" ")}
                </p>
                {w.description && <p className="mt-0.5 truncate text-xs text-zinc-500">{w.description}</p>}
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <Button size="sm" variant="outline" disabled={busyId === w.storeWineId} onClick={() => patch(w, { available: !w.available })}>
                  {w.available ? "숨기기" : "보이기"}
                </Button>
                <Button size="sm" variant="ghost" disabled={busyId === w.storeWineId} onClick={() => remove(w)}>
                  삭제
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {linking && (
        <LinkWineDialog
          wine={linking}
          onClose={() => setLinking(null)}
          onPick={async (wineId) => {
            await patch(linking, { wineId });
            setLinking(null);
          }}
        />
      )}
    </section>
  );
}

/** 와인 DB 검색 → 고르면 사진이 붙는다. 이름이 달라도 상관없다(표시 이름은 매장 것 그대로). */
function LinkWineDialog({ wine, onClose, onPick }: { wine: StoreWine; onClose: () => void; onPick: (wineId: number) => Promise<void> }) {
  const [q, setQ] = useState(wine.wineName ?? wine.name);
  const [rows, setRows] = useState<AdminWinePreview[] | null>(null);
  const [busy, setBusy] = useState(false);

  const search = useCallback(async (term: string) => {
    if (!term.trim()) return;
    setRows(null);
    try {
      setRows((await searchAdminWines(term.trim())).content);
    } catch {
      setRows([]);
    }
  }, []);

  useEffect(() => {
    search(q);
    // 처음 열 때 한 번만
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pick = async (id: number) => {
    setBusy(true);
    try {
      await onPick(id);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 p-0 md:p-4" onClick={() => !busy && onClose()}>
      <div className="w-full md:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl md:rounded-2xl border border-zinc-200 bg-white p-5" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-base font-bold text-zinc-900">사진 연결: {wine.name}</h3>
        <p className="mt-1 text-xs text-zinc-500">와인 DB에서 같은 와인을 찾아 고르세요. 손님에게 보이는 이름은 매장 리스트의 이름 그대로입니다.</p>
        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            search(q);
          }}
        >
          <input className={INPUT} value={q} onChange={(e) => setQ(e.target.value)} placeholder="와인 이름 (한글/영문)" />
          <Button type="submit" size="sm">
            검색
          </Button>
        </form>
        {rows === null ? (
          <LoadingState />
        ) : rows.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-500">검색 결과가 없습니다. 다른 표기로 찾아보세요.</p>
        ) : (
          <ul className="mt-3 divide-y divide-zinc-100">
            {rows.map((r) => (
              <li key={r.wineId}>
                <button type="button" disabled={busy} onClick={() => pick(r.wineId)} className="w-full py-2.5 text-left hover:bg-zinc-50">
                  <p className="text-sm text-zinc-900">{r.name}</p>
                  <p className="text-xs text-zinc-500">
                    {[r.nameEng, r.sort, r.country, r.variety].filter(Boolean).join(" · ")}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3 flex gap-2">
          {wine.wineId && (
            <Button variant="outline" className="flex-1" disabled={busy} onClick={() => pick(0)}>
              연결 해제
            </Button>
          )}
          <Button variant="ghost" className="flex-1" disabled={busy} onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}

// ---- QR ----

function QrCard({ slug, name }: { slug: string; name: string }) {
  const url = `${SITE_URL}/s/${slug}`;
  const [png, setPng] = useState<string | null>(null);

  useEffect(() => {
    QRCode.toDataURL(url, { width: 1024, margin: 2, color: { dark: "#1B1A17", light: "#FFFFFF" } })
      .then(setPng)
      .catch(() => setPng(null));
  }, [url]);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h3 className="text-base font-bold text-zinc-900">QR</h3>
      <p className="mt-1 break-all font-mono text-xs text-zinc-500">{url}</p>
      {png && (
        <>
          <img src={png} alt={`${name} QR`} className="mt-3 w-40 rounded-lg border border-zinc-200" />
          <div className="mt-3 flex gap-2">
            <a href={png} download={`drinkig-qr-${slug}.png`} className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              PNG 받기
            </a>
            <Button size="sm" variant="outline" onClick={() => navigator.clipboard?.writeText(url)}>
              주소 복사
            </Button>
          </div>
        </>
      )}
      <p className="mt-3 text-xs text-zinc-400">1024px PNG. 스티커·테이블 텐트에 그대로 쓸 수 있습니다.</p>
    </section>
  );
}

// ---- 통계 ----

function StatsCard({ stats }: { stats: StoreStats }) {
  const axes = [
    ["sweetness", "당도"],
    ["acidity", "산도"],
    ["tannin", "타닌"],
    ["body", "바디"],
    ["alcohol", "알코올"],
  ] as const;
  const hasAvg = Object.keys(stats.tasteAverage ?? {}).length > 0;
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h3 className="text-base font-bold text-zinc-900">
        최근 {stats.days}일 <span className="text-sm font-normal text-zinc-500">손님 이용</span>
      </h3>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[
          ["QR 방문", stats.visits, `${stats.visitSessions}명`],
          ["취향 입력", stats.tasteSubmits, ""],
          ["와인 클릭", stats.wineClicks, ""],
        ].map(([label, value, sub]) => (
          <div key={label as string} className="rounded-lg bg-zinc-50 p-2.5">
            <dt className="text-[11px] text-zinc-500">{label}</dt>
            <dd className="text-lg font-bold text-zinc-900">{value}</dd>
            {sub && <dd className="text-[11px] text-zinc-400">{sub}</dd>}
          </div>
        ))}
      </dl>
      {hasAvg && (
        <div className="mt-4">
          <p className="text-xs text-zinc-500">손님 취향 평균 (1~5)</p>
          <ul className="mt-1.5 space-y-1">
            {axes.map(([k, label]) => (
              <li key={k} className="flex items-center gap-2 text-xs">
                <span className="w-10 text-zinc-500">{label}</span>
                <span className="h-1.5 flex-1 rounded-full bg-zinc-100">
                  <span className="block h-full rounded-full bg-purple-500" style={{ width: `${((stats.tasteAverage[k] ?? 0) / 5) * 100}%` }} />
                </span>
                <span className="w-7 text-right text-zinc-700">{stats.tasteAverage[k]?.toFixed(1) ?? "-"}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {stats.topWines.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-zinc-500">많이 눌린 와인</p>
          <ol className="mt-1.5 space-y-1 text-sm">
            {stats.topWines.map((w, i) => (
              <li key={w.storeWineId} className="flex gap-2">
                <span className="w-4 text-zinc-400">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate text-zinc-800">{w.name}</span>
                <span className="text-zinc-500">{w.clicks}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
      {!hasAvg && stats.topWines.length === 0 && <p className="mt-3 text-xs text-zinc-400">아직 손님 데이터가 없습니다.</p>}
    </section>
  );
}
