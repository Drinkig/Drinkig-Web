import { getNotice, notices } from "../data/notices";

export type Lang = "ko" | "en";

export function pathnameToLang(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ko";
}

/** 주어진 경로를 해당 언어의 경로로 변환한다. 예: ("/terms", "en") → "/en/terms" */
export function localizePath(pathname: string, lang: Lang): string {
  const base = pathname === "/en" ? "/" : pathname.replace(/^\/en\//, "/");
  if (lang === "ko") return base;
  return base === "/" ? "/en" : `/en${base}`;
}

export interface RouteMeta {
  title: string;
  description: string;
}

const DEFAULT_KO: RouteMeta = {
  title: "와인이 쉬워진다, 드링키지",
  description:
    "와인 초보도 쉽게. 추상적인 맛 표현을 일상 언어로 풀어, 내 취향에 꼭 맞는 와인을 추천해드립니다. 드링키지에서 나만의 와인을 찾아보세요.",
};

const DEFAULT_EN: RouteMeta = {
  title: "Wine made easy — Drinkig",
  description:
    "Tell us your taste, and we'll score every wine just for you. Drinkig makes wine easy for beginners.",
};

const STATIC_META: Record<string, Record<Lang, RouteMeta>> = {
  "/": { ko: DEFAULT_KO, en: DEFAULT_EN },
  "/terms": {
    ko: { title: "이용약관 | 드링키지", description: "드링키지 서비스 이용약관" },
    en: { title: "Terms of Service | Drinkig", description: "Drinkig terms of service" },
  },
  "/privacy": {
    ko: { title: "개인정보 처리방침 | 드링키지", description: "드링키지 개인정보 처리방침" },
    en: { title: "Privacy Policy | Drinkig", description: "Drinkig privacy policy" },
  },
  "/notices": {
    ko: { title: "공지사항 | 드링키지", description: "드링키지의 새로운 소식과 공지사항을 확인하세요." },
    en: { title: "Notices | Drinkig", description: "News and announcements from Drinkig." },
  },
};

export function getMeta(pathname: string): RouteMeta {
  const lang = pathnameToLang(pathname);
  const base = localizePath(pathname, "ko");

  const noticeMatch = base.match(/^\/notices\/(\d+)$/);
  if (noticeMatch) {
    const notice = getNotice(Number(noticeMatch[1]));
    if (notice) {
      return {
        title: lang === "en" ? `${notice.title} | Drinkig` : `${notice.title} | 드링키지`,
        description: STATIC_META["/notices"][lang].description,
      };
    }
    return STATIC_META["/notices"][lang];
  }

  return STATIC_META[base]?.[lang] ?? (lang === "en" ? DEFAULT_EN : DEFAULT_KO);
}

/** 프리렌더 대상 전체 경로 (ko + en) */
export function getPrerenderPaths(): string[] {
  const koPaths = ["/", "/terms", "/privacy", "/notices", ...notices.map((n) => `/notices/${n.id}`)];
  return [...koPaths, ...koPaths.map((p) => localizePath(p, "en"))];
}
