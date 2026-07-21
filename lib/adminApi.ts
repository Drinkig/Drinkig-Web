// 어드민 API 클라이언트 — drinkig-server의 /login/admin, /admin/** 엔드포인트 호출 레이어.
// 토큰은 localStorage에 보관하고, 401 시 /reissue로 1회 재발급 후 재시도한다.

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "https://api.drinkig.com";

const ACCESS_KEY = "drinkig.admin.accessToken";
const REFRESH_KEY = "drinkig.admin.refreshToken";
const NAME_KEY = "drinkig.admin.name";

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

interface ApiEnvelope<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export function getAdminName(): string {
  return localStorage.getItem(NAME_KEY) ?? "";
}

export function isLoggedIn(): boolean {
  return localStorage.getItem(ACCESS_KEY) !== null;
}

export function clearSession(): void {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(NAME_KEY);
}

function saveTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
}

async function tryReissue(): Promise<boolean> {
  const refresh = localStorage.getItem(REFRESH_KEY);
  if (!refresh) return false;
  try {
    const res = await fetch(`${API_BASE}/reissue`, {
      method: "POST",
      headers: { "Authorization-Refresh": refresh },
    });
    const body = (await res.json()) as ApiEnvelope<{
      accessToken: string;
      refreshToken: string;
    }>;
    if (!res.ok || !body.isSuccess) return false;
    saveTokens(body.result.accessToken, body.result.refreshToken);
    return true;
  } catch {
    return false;
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const doFetch = () => {
    const token = localStorage.getItem(ACCESS_KEY);
    return fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers ?? {}),
      },
    });
  };

  let res = await doFetch();
  if (res.status === 401 && (await tryReissue())) {
    res = await doFetch();
  }

  const body = (await res.json().catch(() => null)) as ApiEnvelope<T> | null;
  if (res.status === 401 || res.status === 403) {
    clearSession();
    throw new ApiError(body?.message ?? "인증이 만료되었습니다.", res.status, body?.code);
  }
  if (!res.ok || !body || !body.isSuccess) {
    throw new ApiError(
      body?.message ?? `요청에 실패했습니다. (HTTP ${res.status})`,
      res.status,
      body?.code,
    );
  }
  return body.result;
}

// ---------- 타입 (서버 DTO와 1:1) ----------

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  totalPages: number;
}

export interface StatsOverview {
  totalMembers: number;
  newMembers7d: number;
  newMembers30d: number;
  onboardedMembers: number;
  totalScans: number;
  totalTastingNotes: number;
  activePremium: number;
  pendingWineRequests: number;
  pendingReports: number;
}

export interface DailyMetrics {
  date: string;
  signups: number;
  scans: number;
  scanUsers: number;
  tastingNotes: number;
  paidSubscriptions: number;
}

export interface Timeseries {
  from: string;
  to: string;
  days: DailyMetrics[];
}

export interface Funnel {
  signups: number;
  onboarded: number;
  scanned: number;
  noted: number;
  premium: number;
}

export interface DownloadStats {
  configured: boolean;
  days: { date: string; units: number }[];
}

export type WineRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface WineRequest {
  requestId: number;
  wineId: number;
  status: WineRequestStatus;
  name: string;
  nameEng: string | null;
  imageUrl: string | null;
  sort: string | null;
  country: string | null;
  region: string | null;
  variety: string | null;
  memo: string | null;
  rejectReason: string | null;
  createdAt: string;
}

export interface WineRequestDetail extends WineRequest {
  price: number;
  requesterName: string | null;
  requesterEmail: string | null;
}

export type ReportType = "REVIEW" | "PRICE" | "OTHER";
export type ReportStatus = "PENDING" | "RESOLVED" | "DISMISSED";

export interface Report {
  reportId: number;
  type: ReportType;
  status: ReportStatus;
  targetId: number | null;
  targetSummary: string | null;
  reason: string | null;
  adminNote: string | null;
  reporterName: string | null;
  reporterEmail: string | null;
  createdAt: string;
  handledAt: string | null;
}

export type ScanFeedbackRating = "GOOD" | "NORMAL" | "BAD";

export interface ScanFeedback {
  id: number;
  memberName: string | null;
  scanType: string;
  rating: ScanFeedbackRating;
  issues: string[];
  comment: string | null;
  createdAt: string;
}

// ---------- 엔드포인트 ----------

export async function login(username: string, password: string): Promise<void> {
  const res = await fetch(`${API_BASE}/login/admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const body = (await res.json().catch(() => null)) as ApiEnvelope<{
    accessToken: string;
    refreshToken: string;
    name: string;
  }> | null;
  if (!res.ok || !body || !body.isSuccess) {
    throw new ApiError(
      body?.message ?? "로그인에 실패했습니다.",
      res.status,
      body?.code,
    );
  }
  saveTokens(body.result.accessToken, body.result.refreshToken);
  localStorage.setItem(NAME_KEY, body.result.name ?? "");
}

export function fetchMe(): Promise<{ username: string; name: string }> {
  return apiFetch("/admin/me");
}

export function fetchOverview(): Promise<StatsOverview> {
  return apiFetch("/admin/stats/overview");
}

export function fetchTimeseries(from?: string, to?: string): Promise<Timeseries> {
  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  const qs = params.toString();
  return apiFetch(`/admin/stats/timeseries${qs ? `?${qs}` : ""}`);
}

export function fetchFunnel(): Promise<Funnel> {
  return apiFetch("/admin/stats/funnel");
}

export function fetchDownloads(from?: string, to?: string): Promise<DownloadStats> {
  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  const qs = params.toString();
  return apiFetch(`/admin/stats/downloads${qs ? `?${qs}` : ""}`);
}

export function refreshDownloads(): Promise<string> {
  return apiFetch("/admin/stats/downloads/refresh", { method: "POST" });
}

export function fetchWineRequests(
  page: number,
  status?: WineRequestStatus,
): Promise<PageResponse<WineRequest>> {
  const params = new URLSearchParams({ page: String(page), size: "10" });
  if (status) params.set("status", status);
  return apiFetch(`/admin/wine/request?${params.toString()}`);
}

export function fetchWineRequestDetail(requestId: number): Promise<WineRequestDetail> {
  return apiFetch(`/admin/wine/request/${requestId}`);
}

export function approveWineRequest(requestId: number): Promise<string> {
  return apiFetch(`/admin/wine/request/${requestId}/approve`, { method: "PATCH" });
}

export function rejectWineRequest(requestId: number, reason: string): Promise<string> {
  return apiFetch(`/admin/wine/request/${requestId}/reject`, {
    method: "PATCH",
    body: JSON.stringify({ reason }),
  });
}

export function fetchReports(
  page: number,
  status?: ReportStatus,
  type?: ReportType,
): Promise<PageResponse<Report>> {
  const params = new URLSearchParams({ page: String(page), size: "10" });
  if (status) params.set("status", status);
  if (type) params.set("type", type);
  return apiFetch(`/admin/report?${params.toString()}`);
}

export function resolveReport(reportId: number, adminNote?: string): Promise<string> {
  return apiFetch(`/admin/report/${reportId}/resolve`, {
    method: "PATCH",
    body: JSON.stringify({ adminNote: adminNote ?? null }),
  });
}

export function dismissReport(reportId: number, adminNote?: string): Promise<string> {
  return apiFetch(`/admin/report/${reportId}/dismiss`, {
    method: "PATCH",
    body: JSON.stringify({ adminNote: adminNote ?? null }),
  });
}

export function fetchScanFeedbacks(
  page: number,
  rating?: ScanFeedbackRating,
): Promise<PageResponse<ScanFeedback>> {
  const params = new URLSearchParams({ page: String(page), size: "10" });
  if (rating) params.set("rating", rating);
  return apiFetch(`/admin/scan-feedback?${params.toString()}`);
}
