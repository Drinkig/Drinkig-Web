// 매장 QR 손님용 API 클라이언트. 로그인 없음. drinkig-server의 /store/** 를 부른다.
const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "https://api.drinkig.com";

export class StoreApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

interface Envelope<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  const body = (await res.json().catch(() => null)) as Envelope<T> | null;
  if (!res.ok || !body || !body.isSuccess) {
    throw new StoreApiError(body?.message ?? `요청에 실패했습니다. (HTTP ${res.status})`, res.status, body?.code);
  }
  return body.result;
}

export type StoreType = "RESTAURANT" | "WINE_SHOP" | "OTHER";

export interface NearbyStore {
  slug: string;
  name: string;
  type: StoreType;
  address: string | null;
  distanceKm: number | null;
}

export interface StoreDetail {
  slug: string;
  name: string;
  type: StoreType;
  address: string | null;
  description: string | null;
  wineCount: number;
  sorts: string[];
  priceMin: number | null;
  priceMax: number | null;
}

export interface Taste {
  sweetness: number | null;
  acidity: number | null;
  tannin: number | null;
  body: number | null;
  alcohol: number | null;
}

export interface RecommendedWine {
  storeWineId: number;
  name: string;
  sort: string;
  price: number;
  glassPrice: number | null;
  description: string | null;
  imageUrl: string | null;
  matchScore: number;
  overBudget: boolean;
}

export interface Recommendation {
  storeName: string;
  budgetRelaxed: boolean;
  wines: RecommendedWine[];
}

export type StoreEventType = "VISIT" | "TASTE_SUBMIT" | "RESULT_VIEW" | "WINE_CLICK";

export function fetchNearbyStores(lat?: number, lng?: number, radiusKm?: number): Promise<NearbyStore[]> {
  const p = new URLSearchParams();
  if (lat != null && lng != null) {
    p.set("lat", String(lat));
    p.set("lng", String(lng));
    if (radiusKm) p.set("radiusKm", String(radiusKm));
  }
  const qs = p.toString();
  return call(`/store/nearby${qs ? `?${qs}` : ""}`);
}

export function fetchStoreDetail(slug: string): Promise<StoreDetail> {
  return call(`/store/${encodeURIComponent(slug)}`);
}

export function recommendStore(
  slug: string,
  taste: Taste,
  maxPrice: number | null,
  sorts: string[],
  sessionId: string,
): Promise<Recommendation> {
  return call(`/store/${encodeURIComponent(slug)}/recommend`, {
    method: "POST",
    body: JSON.stringify({ ...taste, maxPrice, sorts: sorts.length ? sorts : null, sessionId }),
  });
}

/** 실패해도 화면에 영향을 주지 않는다. 페이지를 떠나는 중에도 보내지도록 keepalive. */
export function logStoreEvent(slug: string, type: StoreEventType, sessionId: string, storeWineId?: number, payload?: unknown): void {
  fetch(`${API_BASE}/store/${encodeURIComponent(slug)}/event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, sessionId, storeWineId: storeWineId ?? null, payload: payload == null ? null : JSON.stringify(payload) }),
    keepalive: true,
  }).catch(() => undefined);
}

const SESSION_KEY = "drinkig.s.sid";

/** 손님 세션 id. 탭을 닫으면 사라진다(회원 아님). */
export function getSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

/** 사진이 연결되지 않은 와인에 쓰는 종류별 기본 병 사진 (public/images/wines) */
export function fallbackBottle(sort: string): string {
  const map: Record<string, string> = {
    레드: "114170",
    화이트: "062490",
    스파클링: "033092",
    로제: "015570",
  };
  return `/images/wines/${map[sort] ?? "093177"}.webp`;
}

export function formatWon(n: number): string {
  return `${n.toLocaleString("ko-KR")}원`;
}
