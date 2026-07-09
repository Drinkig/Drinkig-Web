import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "../App";
import "../styles/globals.css";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// 프리렌더된 HTML이 있으면 hydrate, 없으면(dev 서버) 새로 렌더
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
