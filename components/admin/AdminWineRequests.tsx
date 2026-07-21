import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  approveWineRequest,
  fetchWineRequestDetail,
  fetchWineRequests,
  rejectWineRequest,
  type WineRequest,
  type WineRequestDetail,
  type WineRequestStatus,
} from "../../lib/adminApi";
import {
  Badge,
  EmptyState,
  ErrorState,
  FilterChips,
  formatDateTime,
  LoadingState,
  PageHeader,
  Pagination,
} from "./shared";

const STATUS_LABEL: Record<WineRequestStatus, string> = {
  PENDING: "대기",
  APPROVED: "승인",
  REJECTED: "반려",
};

const STATUS_TONE: Record<WineRequestStatus, "pending" | "good" | "bad"> = {
  PENDING: "pending",
  APPROVED: "good",
  REJECTED: "bad",
};

export function AdminWineRequests() {
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState<WineRequestStatus | "">("PENDING");
  const [rows, setRows] = useState<WineRequest[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<WineRequestDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [acting, setActing] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejecting, setRejecting] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    setRows(null);
    try {
      const res = await fetchWineRequests(page, status || undefined);
      setRows(res.content);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "목록을 불러오지 못했습니다.");
    }
  }, [page, status]);

  useEffect(() => {
    load();
  }, [load]);

  const openDetail = async (requestId: number) => {
    setDetailLoading(true);
    setRejecting(false);
    setRejectReason("");
    try {
      setSelected(await fetchWineRequestDetail(requestId));
    } catch {
      setSelected(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selected || acting) return;
    setActing(true);
    try {
      await approveWineRequest(selected.requestId);
      setSelected(null);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "승인에 실패했습니다.");
    } finally {
      setActing(false);
    }
  };

  const handleReject = async () => {
    if (!selected || acting || !rejectReason.trim()) return;
    setActing(true);
    try {
      await rejectWineRequest(selected.requestId, rejectReason.trim());
      setSelected(null);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "반려에 실패했습니다.");
    } finally {
      setActing(false);
    }
  };

  return (
    <>
      <PageHeader
        title="와인 등록 요청"
        description="유저가 요청한 와인을 검토하고 정식 등록(승인) 또는 반려합니다. 반려 시 해당 와인을 사용한 셀러/노트 데이터가 삭제됩니다."
      />

      <div className="mb-4">
        <FilterChips
          options={[
            { value: "", label: "전체" },
            { value: "PENDING", label: "대기" },
            { value: "APPROVED", label: "승인" },
            { value: "REJECTED", label: "반려" },
          ]}
          value={status}
          onChange={(v) => {
            setStatus(v);
            setPage(0);
          }}
        />
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : rows === null ? (
        <LoadingState />
      ) : rows.length === 0 ? (
        <EmptyState message="해당 조건의 등록 요청이 없습니다." />
      ) : (
        <ul className="space-y-2">
          {rows.map((row) => (
            <li key={row.requestId}>
              <button
                type="button"
                onClick={() => openDetail(row.requestId)}
                className="w-full rounded-xl border border-white/10 bg-surface-raised px-4 py-3 text-left hover:border-white/25 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {row.imageUrl ? (
                    <img
                      src={row.imageUrl}
                      alt=""
                      className="size-12 rounded-lg object-cover bg-black/40 shrink-0"
                    />
                  ) : (
                    <div className="size-12 rounded-lg bg-black/40 shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-white">{row.name}</p>
                      <Badge tone={STATUS_TONE[row.status]}>{STATUS_LABEL[row.status]}</Badge>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-zinc-400">
                      {[row.sort, row.country, row.variety].filter(Boolean).join(" · ") || "정보 없음"}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">{formatDateTime(row.createdAt)}</p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {(selected || detailLoading) && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 p-0 md:p-4"
          onClick={() => !acting && setSelected(null)}
        >
          <div
            className="w-full md:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl md:rounded-2xl border border-white/10 bg-surface-overlay p-5"
            onClick={(e) => e.stopPropagation()}
          >
            {detailLoading || !selected ? (
              <LoadingState />
            ) : (
              <>
                <div className="flex items-start gap-4">
                  {selected.imageUrl && (
                    <img
                      src={selected.imageUrl}
                      alt=""
                      className="w-20 rounded-lg object-cover bg-black/40"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{selected.name}</h3>
                      <Badge tone={STATUS_TONE[selected.status]}>{STATUS_LABEL[selected.status]}</Badge>
                    </div>
                    {selected.nameEng && <p className="mt-0.5 text-xs text-zinc-400">{selected.nameEng}</p>}
                  </div>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {[
                    ["종류", selected.sort],
                    ["국가", selected.country],
                    ["지역", selected.region],
                    ["품종", selected.variety],
                    ["가격", selected.price ? `${selected.price.toLocaleString()}원` : null],
                    ["요청자", selected.requesterName],
                    ["요청자 이메일", selected.requesterEmail],
                    ["요청일", formatDateTime(selected.createdAt)],
                  ].map(([label, value]) => (
                    <div key={label as string}>
                      <dt className="text-xs text-zinc-500">{label}</dt>
                      <dd className="text-zinc-200 break-all">{value || "-"}</dd>
                    </div>
                  ))}
                </dl>

                {selected.memo && (
                  <div className="mt-3 rounded-lg bg-black/30 p-3 text-sm text-zinc-300">
                    <p className="text-xs text-zinc-500 mb-1">메모</p>
                    {selected.memo}
                  </div>
                )}
                {selected.rejectReason && (
                  <div className="mt-3 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
                    <p className="text-xs text-red-400/80 mb-1">반려 사유</p>
                    {selected.rejectReason}
                  </div>
                )}

                {selected.status === "PENDING" && !rejecting && (
                  <div className="mt-5 flex gap-2">
                    <Button className="flex-1" disabled={acting} onClick={handleApprove}>
                      {acting ? "처리 중..." : "승인"}
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      disabled={acting}
                      onClick={() => setRejecting(true)}
                    >
                      반려
                    </Button>
                  </div>
                )}

                {selected.status === "PENDING" && rejecting && (
                  <div className="mt-5 space-y-2">
                    <textarea
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="반려 사유를 입력하세요 (요청자에게 표시됩니다)"
                      rows={3}
                      className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" disabled={acting} onClick={() => setRejecting(false)}>
                        취소
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        disabled={acting || !rejectReason.trim()}
                        onClick={handleReject}
                      >
                        {acting ? "처리 중..." : "반려 확정"}
                      </Button>
                    </div>
                  </div>
                )}

                <Button variant="ghost" className="mt-3 w-full" disabled={acting} onClick={() => setSelected(null)}>
                  닫기
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
