// vite build(클라이언트) + vite build --ssr(서버) 후 실행되어
// 모든 라우트를 정적 HTML로 프리렌더한다. (SEO: 크롤러가 빈 #root 대신 실제 콘텐츠를 받음)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { render, getMeta, getPrerenderPaths, localizePath, pathnameToLang } = await import(
  path.join(root, "dist-server/entry-server.js")
);

const SITE_URL = "https://www.drinkig.com";
const template = fs.readFileSync(path.join(root, "dist/index.html"), "utf8");

const escapeHtml = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const setAttr = (html, selectorRe, value) => html.replace(selectorRe, `$1${value}$2`);

for (const url of getPrerenderPaths()) {
  const appHtml = await render(url);
  const meta = getMeta(url);
  const lang = pathnameToLang(url);
  const pageUrl = `${SITE_URL}${url === "/" ? "/" : url}`;
  const koUrl = `${SITE_URL}${localizePath(url, "ko")}`;
  const enUrl = `${SITE_URL}${localizePath(url, "en")}`;
  const title = escapeHtml(meta.title);
  const desc = escapeHtml(meta.description);

  let html = template
    .replace('<html lang="ko"', `<html lang="${lang}"`)
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  html = setAttr(html, /(<meta name="description" content=")[^"]*(")/, desc);
  html = setAttr(html, /(<link rel="canonical" href=")[^"]*(")/, pageUrl);
  html = setAttr(html, /(<link rel="alternate" hreflang="ko" href=")[^"]*(")/, koUrl);
  html = setAttr(html, /(<link rel="alternate" hreflang="en" href=")[^"]*(")/, enUrl);
  html = setAttr(html, /(<link rel="alternate" hreflang="x-default" href=")[^"]*(")/, koUrl);
  html = setAttr(html, /(<meta property="og:title" content=")[^"]*(")/, title);
  html = setAttr(html, /(<meta property="og:description" content=")[^"]*(")/, desc);
  html = setAttr(html, /(<meta property="og:url" content=")[^"]*(")/, pageUrl);
  html = setAttr(html, /(<meta property="og:locale" content=")[^"]*(")/, lang === "en" ? "en_US" : "ko_KR");
  html = setAttr(html, /(<meta name="twitter:title" content=")[^"]*(")/, title);
  html = setAttr(html, /(<meta name="twitter:description" content=")[^"]*(")/, desc);
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const outFile =
    url === "/" ? path.join(root, "dist/index.html") : path.join(root, "dist", url, "index.html");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  console.log(`prerendered ${url} → ${path.relative(root, outFile)}`);
}
