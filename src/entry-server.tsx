import { StrictMode } from "react";
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router";
import { AppShell } from "../App";

// 빌드 후 scripts/prerender.mjs가 이 함수를 호출해 정적 HTML을 생성한다.
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <AppShell />
        </StaticRouter>
      </StrictMode>,
      {
        onAllReady() {
          const body = new PassThrough();
          let html = "";
          body.on("data", (chunk) => {
            html += chunk;
          });
          body.on("end", () => resolve(html));
          stream.pipe(body);
        },
        onError(error) {
          reject(error);
        },
      },
    );
  });
}

export { getMeta, getPrerenderPaths, localizePath, pathnameToLang } from "../lib/seo-meta";
