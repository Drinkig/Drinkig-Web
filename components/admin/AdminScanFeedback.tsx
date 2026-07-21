import { useCallback, useEffect, useState } from "react";
import {
  fetchScanFeedbacks,
  type ScanFeedback,
  type ScanFeedbackRating,
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

const RATING_LABEL: Record<ScanFeedbackRating, string> = {
  GOOD: "좋음",
  NORMAL: "보통",
  BAD: "나쁨",
};

const RATING_TONE: Record<ScanFeedbackRating, "good" | "neutral" | "bad"> = {
  GOOD: "good",
  NORMAL: "neutral",
  BAD: "bad",
};

const ISSUE_LABEL: Record<string, string> = {
  WRONG_WINE: "잘못된 와인",
  MISSING_WINE: "누락된 와인",
  NO_RESULT: "결과 없음",
  WRONG_INFO: "정보 오류",
  OTHER: "기타",
};

export function AdminScanFeedback() {
  const [page, setPage] = useState(0);
  const [rating, setRating] = useState<ScanFeedbackRating | "">("");
  const [rows, setRows] = useState<ScanFeedback[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setRows(null);
    try {
      const res = await fetchScanFeedbacks(page, rating || undefined);
      setRows(res.content);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "목록을 불러오지 못했습니다.");
    }
  }, [page, rating]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <PageHeader
        title="스캔 피드백"
        description="라벨/메뉴판 스캔 결과에 대한 유저 평가입니다. 스캔 품질 개선 우선순위 판단에 활용하세요."
      />

      <div className="mb-4">
        <FilterChips
          options={[
            { value: "", label: "전체" },
            { value: "GOOD", label: "좋음" },
            { value: "NORMAL", label: "보통" },
            { value: "BAD", label: "나쁨" },
          ]}
          value={rating}
          onChange={(v) => {
            setRating(v);
            setPage(0);
          }}
        />
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : rows === null ? (
        <LoadingState />
      ) : rows.length === 0 ? (
        <EmptyState message="해당 조건의 피드백이 없습니다." />
      ) : (
        <ul className="space-y-2">
          {rows.map((row) => (
            <li key={row.id} className="rounded-xl border border-white/10 bg-surface-raised px-4 py-3">
              <div className="flex items-center gap-2">
                <Badge tone={RATING_TONE[row.rating]}>{RATING_LABEL[row.rating]}</Badge>
                <Badge tone="neutral">{row.scanType === "label" ? "라벨" : "메뉴판"}</Badge>
                <span className="ml-auto text-xs text-zinc-500">{formatDateTime(row.createdAt)}</span>
              </div>
              {row.issues.length > 0 && (
                <p className="mt-2 text-sm text-zinc-300">
                  {row.issues.map((issue) => ISSUE_LABEL[issue] ?? issue).join(", ")}
                </p>
              )}
              {row.comment && (
                <p className="mt-1.5 rounded-lg bg-black/30 p-2.5 text-sm text-zinc-300 whitespace-pre-wrap break-all">
                  {row.comment}
                </p>
              )}
              <p className="mt-1.5 text-xs text-zinc-500">{row.memberName || "탈퇴 회원"}</p>
            </li>
          ))}
        </ul>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </>
  );
}
