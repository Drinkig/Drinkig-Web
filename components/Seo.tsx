import { useEffect } from "react";
import { SITE_URL } from "../lib/constants";

interface SeoProps {
  title: string;
  description?: string;
  /** 사이트 루트 기준 경로. 예: "/notices" */
  path: string;
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLElement>(selector);
  if (el) el.setAttribute(attr, value);
}

// CSR 환경에서 라우트별 title/description/canonical/OG를 동기화한다.
export function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    document.title = title;
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[name="twitter:title"]', "content", title);
    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
    }
  }, [title, description, path]);

  return null;
}
