import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { createStore, fetchStores, type Store, type StoreStatus, type StoreType } from "../../lib/adminApi";
import { Badge, EmptyState, ErrorState, FilterChips, formatDateTime, LoadingState, PageHeader, Pagination } from "./shared";

export const STORE_TYPE_LABEL: Record<StoreType, string> = {
  RESTAURANT: "음식점",
  WINE_SHOP: "와인샵",
  OTHER: "기타",
};

const INPUT =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-purple-500 focus:outline-none";

export function AdminStores() {
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState<StoreStatus | "">("");
  const [rows, setRows] = useState<Store[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    setRows(null);
    try {
      const res = await fetchStores(page, status || undefined);
      setRows(res.content);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "목록을 불러오지 못했습니다.");
    }
  }, [page, status]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <PageHeader
        title="매장 관리"
        description="QR을 붙이는 매장과 그 매장의 와인 리스트를 관리합니다. 리스트를 올리고 상태를 '노출'로 바꾸면 손님에게 보입니다."
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <FilterChips
          options={[
            { value: "", label: "전체" },
            { value: "ACTIVE", label: "노출 중" },
            { value: "INACTIVE", label: "준비 중" },
          ]}
          value={status}
          onChange={(v) => {
            setStatus(v);
            setPage(0);
          }}
        />
        <Button size="sm" className="ml-auto" onClick={() => setCreating(true)}>
          매장 추가
        </Button>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : rows === null ? (
        <LoadingState />
      ) : rows.length === 0 ? (
        <EmptyState message="등록된 매장이 없습니다. '매장 추가'로 시작하세요." />
      ) : (
        <ul className="space-y-2">
          {rows.map((s) => (
            <li key={s.storeId}>
              <Link
                to={`/admin/stores/${s.storeId}`}
                className="block rounded-xl border border-zinc-200 bg-white px-4 py-3 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-zinc-900">{s.name}</p>
                  <Badge tone={s.status === "ACTIVE" ? "good" : "pending"}>{s.status === "ACTIVE" ? "노출 중" : "준비 중"}</Badge>
                  <Badge tone="neutral">{STORE_TYPE_LABEL[s.type]}</Badge>
                  <span className="ml-auto text-xs text-zinc-500">{formatDateTime(s.createdAt)}</span>
                </div>
                <p className="mt-1 text-xs text-zinc-500">
                  <span className="font-mono">/s/{s.slug}</span> · 와인 {s.wineCount}병{s.address ? ` · ${s.address}` : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {creating && <CreateStoreDialog onClose={() => setCreating(false)} onCreated={load} />}
    </>
  );
}

function CreateStoreDialog({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [name, setName] = useState("");
  const [type, setType] = useState<StoreType>("RESTAURANT");
  const [slug, setSlug] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [memo, setMemo] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setError(null);
    try {
      await createStore({
        name: name.trim(),
        type,
        slug: slug.trim() || undefined,
        address: address.trim() || undefined,
        latitude: lat.trim() ? Number(lat) : null,
        longitude: lng.trim() ? Number(lng) : null,
        memo: memo.trim() || undefined,
      });
      onCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "등록에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 p-0 md:p-4" onClick={() => !saving && onClose()}>
      <form
        onSubmit={submit}
        className="w-full md:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl md:rounded-2xl border border-zinc-200 bg-white p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-bold text-zinc-900">매장 추가</h3>
        <div>
          <label className="block text-sm text-zinc-700 mb-1.5">매장명</label>
          <input className={INPUT} value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} />
        </div>
        <div>
          <label className="block text-sm text-zinc-700 mb-1.5">업종</label>
          <div className="flex gap-2">
            {(Object.keys(STORE_TYPE_LABEL) as StoreType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm ${type === t ? "border-purple-300 bg-purple-50 text-purple-700" : "border-zinc-200 text-zinc-600"}`}
              >
                {STORE_TYPE_LABEL[t]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm text-zinc-700 mb-1.5">
            QR 코드 (선택) <span className="text-xs text-zinc-400">영소문자·숫자·하이픈 3~30자. 비우면 자동 생성</span>
          </label>
          <input className={INPUT} value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase())} pattern="[a-z0-9-]{3,30}" placeholder="예: seongsu-winebar" />
        </div>
        <div>
          <label className="block text-sm text-zinc-700 mb-1.5">주소</label>
          <input className={INPUT} value={address} onChange={(e) => setAddress(e.target.value)} maxLength={200} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-zinc-700 mb-1.5">위도</label>
            <input className={INPUT} value={lat} onChange={(e) => setLat(e.target.value)} inputMode="decimal" placeholder="37.5445" />
          </div>
          <div>
            <label className="block text-sm text-zinc-700 mb-1.5">경도</label>
            <input className={INPUT} value={lng} onChange={(e) => setLng(e.target.value)} inputMode="decimal" placeholder="127.0560" />
          </div>
        </div>
        <p className="-mt-2 text-xs text-zinc-400">위도·경도는 손님이 '근처 매장'으로 찾을 때만 쓰입니다. 네이버 지도에서 매장을 찾아 URL의 좌표를 넣으면 됩니다.</p>
        <div>
          <label className="block text-sm text-zinc-700 mb-1.5">운영 메모 (담당자, 연락처 등)</label>
          <textarea className={INPUT} rows={2} value={memo} onChange={(e) => setMemo(e.target.value)} maxLength={500} />
        </div>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="flex-1" disabled={saving} onClick={onClose}>
            취소
          </Button>
          <Button type="submit" className="flex-1" disabled={saving || !name.trim()}>
            {saving ? "등록 중..." : "등록"}
          </Button>
        </div>
      </form>
    </div>
  );
}
