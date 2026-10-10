import type { ReactNode } from "react";
import { motion } from "motion/react";
import { WORDMARK_SRC } from "../../lib/constants";
import { EASE } from "../../lib/motion";

/**
 * 손님 웹앱 공통 틀. 종이 톤, 모바일 기준. 상단에 작은 워드마크와 진행 선, 하단에 고정 버튼 자리.
 * 소비자 사이트 헤더(내비, App Store 버튼)는 쓰지 않는다. 손님은 와인 고르러 왔지 사이트 구경하러 온 게 아니다.
 */
export function StoreShell({ progress, children, footer }: { progress?: number; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="wash-hero relative flex min-h-[100svh] flex-col overflow-hidden bg-paper">
      <header className="relative z-10 px-5 pt-5">
        <img src={WORDMARK_SRC} alt="DRINKIG" width={800} height={134} className="h-4 w-auto" />
        {progress != null && (
          <div className="mt-4 h-[2px] w-full rounded-full bg-paper-line">
            <motion.div
              className="h-full origin-left rounded-full"
              style={{ background: "var(--grad)" }}
              initial={false}
              animate={{ scaleX: Math.max(0.02, Math.min(1, progress)) }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          </div>
        )}
      </header>
      <main className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col px-5 pb-32 pt-6">{children}</main>
      {footer && (
        <div className="fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-paper via-paper/95 to-transparent px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-8">
          <div className="mx-auto max-w-md">{footer}</div>
        </div>
      )}
    </div>
  );
}
