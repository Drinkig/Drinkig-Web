import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  dismissReport,
  fetchReports,
  resolveReport,
  type Report,
  type ReportStatus,
  type ReportType,
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

const TYPE_LABEL: Record<ReportType, string> = {
  REVIEW: "리뷰",
  PRICE: "가격 정보",
  OTHER: "기타",
};

const STATUS_LABEL: Record<ReportStatus, string> = {
  PENDING: "대기",
  RESOLVED: "처리 완료",
  DISMISSED: "기각",
};

const STATUS_TONE: Record<ReportStatus, "pending" | "good" | "neutral"> = {
  PENDING: "pending",
  RESOLVED: "good",
  DISMISSED: "neutral",
};

export function AdminReports() {
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState<ReportStatus | "">("PENDING");
  const [type, setType] = useState<ReportType | "">("");
  const [rows, setRows] = useState<Report[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [actingId, setActingId] = useState<number | null>(null);
  const [noteFor, setNoteFor] = useState<{ id: number; action: "resolve" | "dismiss" } | null>(null);
  const [note, setNote] = useState("");

  const load = useCallback(async () => {
    setError(null);
    setRows(null);
    try {
      const res = await fetchReports(page, status || undefined, type || undefined);
      setRows(res.content);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "목록을 불러오지 못했습니다.");
    }
  }, [page, status, type]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAction = async () => {
    if (!noteFor || actingId !== null) return;
    setActingId(noteFor.id);
    try {
      if (noteFor.action === "resolve") {
        await resolveReport(noteFor.id, note.trim() || undefined);
      } else {
        await dismissReport(noteFor.id, note.trim() || undefined);
      }
      setNoteFor(null);
      setNote("");
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "처리에 실패했습니다.");
    } finally {
      setActingId(null);
    }
  };

  return (
    <>
      <PageHeader
        title="신고 관리"
        description="앱에서 접수된 리뷰/가격 정보 신고를 검토하고 처리합니다."
      />

      <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <FilterChips
          options={[
            { value: "", label: "전체 상태" },
            { value: "PENDING", label: "대기" },
            { value: "RESOLVED", label: "처리 완료" },
            { value: "DISMISSED", label: "기각" },
          ]}
          value={status}
          onChange={(v) => {
            setStatus(v);
            setPage(0);
          }}
        />
        <FilterChips
          options={[
            { value: "", label: "전체 유형" },
            { value: "REVIEW", label: "리뷰" },
            { value: "PRICE", label: "가격 정보" },
            { value: "OTHER", label: "기타" },
          ]}
          value={type}
          onChange={(v) => {
            setType(v);
            setPage(0);
          }}
        />
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : rows === null ? (
        <LoadingState />
      ) : rows.length === 0 ? (
        <EmptyState message="해당 조건의 신고가 없습니다. 앱에서 신고가 접수되면 여기에 쌓입니다." />
      ) : (
        <ul className="space-y-2">
          {rows.map((row) => (
            <li
              key={row.reportId}
              className="rounded-xl border border-white/10 bg-surface-raised px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <Badge tone="neutral">{TYPE_LABEL[row.type]}</Badge>
                <Badge tone={STATUS_TONE[row.status]}>{STATUS_LABEL[row.status]}</Badge>
                <span className="ml-auto text-xs text-zinc-500">{formatDateTime(row.createdAt)}</span>
              </div>

              {row.targetSummary && (
                <p className="mt-2 rounded-lg bg-black/30 p-2.5 text-sm text-zinc-300 whitespace-pre-wrap break-all">
                  {row.targetSummary}
                </p>
              )}
              {row.reason && (
                <p className="mt-2 text-sm text-zinc-300">
                  <span className="text-xs text-zinc-500 mr-1.5">사유</span>
                  {row.reason}
                </p>
              )}
              <p className="mt-1.5 text-xs text-zinc-500">
                신고자: {row.reporterName || "-"}
                {row.reporterEmail ? ` (${row.reporterEmail})` : ""}
                {row.targetId != null ? ` · 대상 ID: ${row.targetId}` : ""}
              </p>

              {row.status !== "PENDING" && (
                <p className="mt-1.5 text-xs text-zinc-500">
                  처리: {formatDateTime(row.handledAt)}
                  {row.adminNote ? ` · 메모: ${row.adminNote}` : ""}
                </p>
              )}

              {row.status === "PENDING" &&
                (noteFor?.id === row.reportId ? (
                  <div className="mt-3 space-y-2">
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="처리 메모 (선택)"
                      className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={actingId !== null}
                        onClick={() => {
                          setNoteFor(null);
                          setNote("");
                        }}
                      >
                        취소
                      </Button>
                      <Button size="sm" disabled={actingId !== null} onClick={handleAction}>
                        {actingId !== null
                          ? "처리 중..."
                          : noteFor.action === "resolve"
                            ? "처리 완료 확정"
                            : "기각 확정"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      disabled={actingId !== null}
                      onClick={() => setNoteFor({ id: row.reportId, action: "resolve" })}
                    >
                      처리 완료
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={actingId !== null}
                      onClick={() => setNoteFor({ id: row.reportId, action: "dismiss" })}
                    >
                      기각
                    </Button>
                  </div>
                ))}
            </li>
          ))}
        </ul>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </>
  );
}
