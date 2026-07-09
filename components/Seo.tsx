import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL } from "../lib/constants";
import { getMeta, localizePath, pathnameToLang } from "../lib/seo-meta";

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLElement>(selector);
  if (el) el.setAttribute(attr, value);
}

function setAlternate(hreflang: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = "alternate";
    el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

// 클라이언트 라우팅 시 title/canonical/OG/hreflang을 현재 경로와 동기화한다.
// (첫 로드 HTML은 scripts/prerender.mjs가 같은 getMeta로 미리 채워둔다.)
export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getMeta(pathname);
    const lang = pathnameToLang(pathname);
    const url = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
    const koUrl = `${SITE_URL}${localizePath(pathname, "ko")}`;
    const enUrl = `${SITE_URL}${localizePath(pathname, "en")}`;

    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:locale"]', "content", lang === "en" ? "en_US" : "ko_KR");
    setMeta('meta[name="twitter:title"]', "content", meta.title);
    setAlternate("ko", koUrl);
    setAlternate("en", enUrl);
    setAlternate("x-default", koUrl);
  }, [pathname]);

  return null;
}
