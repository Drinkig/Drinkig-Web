import type { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="mb-6">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {description && <p className="mt-1 text-sm text-zinc-400">{description}</p>}
    </header>
  );
}

export function Badge({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "pending" | "good" | "bad" | "neutral";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        tone === "pending" && "bg-yellow-500/15 text-yellow-300",
        tone === "good" && "bg-emerald-500/15 text-emerald-300",
        tone === "bad" && "bg-red-500/15 text-red-300",
        tone === "neutral" && "bg-white/10 text-zinc-300",
      )}
    >
      {children}
    </span>
  );
}

export function LoadingState() {
  return <p className="py-16 text-center text-sm text-zinc-500">불러오는 중...</p>;
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="py-16 text-center">
      <p className="text-sm text-red-400">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-3" onClick={onRetry}>
          다시 시도
        </Button>
      )}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return <p className="py-16 text-center text-sm text-zinc-500">{message}</p>;
}

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-4 flex items-center justify-center gap-3">
      <Button variant="outline" size="sm" disabled={page <= 0} onClick={() => onChange(page - 1)}>
        이전
      </Button>
      <span className="text-xs text-zinc-400">
        {page + 1} / {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages - 1}
        onClick={() => onChange(page + 1)}
      >
        다음
      </Button>
    </div>
  );
}

export function FilterChips<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T | ""; label: string }[];
  value: T | "";
  onChange: (value: T | "") => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt.value || "all"}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs transition-colors",
            value === opt.value
              ? "border-purple-500/60 bg-purple-500/15 text-purple-300"
              : "border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function formatDateTime(iso: string | null): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
