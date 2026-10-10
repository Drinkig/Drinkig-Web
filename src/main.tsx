import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "../App";
import { getPrerenderPaths } from "../lib/seo-meta";
import "../styles/globals.css";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// 프리렌더된 경로는 hydrate. 그 외(/admin, /s 등 클라이언트 전용)는 Vercel이 홈 HTML을 돌려주므로
// 그 마크업을 비우고 새로 렌더한다 (다른 화면 위에 hydrate하면 불일치로 전체 재렌더가 일어난다).
const path = window.location.pathname.replace(/\/+$/, "") || "/";
if (container.hasChildNodes() && new Set(getPrerenderPaths()).has(path)) {
  hydrateRoot(container, app);
} else {
  container.replaceChildren();
  createRoot(container).render(app);
}
