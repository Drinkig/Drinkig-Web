import { motion, type Variants } from "motion/react";
import { useLanguage } from "../i18n";
import { cn } from "./ui/utils";
import { EASE, rise } from "../lib/motion";

const STEPS = ["step1", "step2", "step3"] as const;

// 로드맵처럼: 선이 1 → 2 → 3으로 그어지고, 선이 닿는 순간 점이 튀어나오고 글이 뒤따른다.
// 데스크톱은 가로, 모바일은 세로. 선이 한 단계 건너는 데 걸리는 시간이 STEP_GAP.
const STEP_GAP = 0.8;
// 데스크톱 가로 선은 03에서 끊기지 않고 오른쪽 끝까지 이어진다. 세 칸을 지나므로 STEP_GAP × 3.
const LINE_DURATION = STEP_GAP * STEPS.length;

const trackH: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: LINE_DURATION, ease: "linear" } },
};
// 모바일 세로 선은 점과 점 사이 구간마다 하나씩, 차례로 그어진다.
const segmentV: Variants = {
  hidden: { scaleY: 0 },
  show: (i: number) => ({ scaleY: 1, transition: { duration: STEP_GAP, ease: "linear", delay: i * STEP_GAP } }),
};
// 노드는 동그라미 대신 숫자. 선이 닿는 순간 톡 튀어나온다.
const node: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  show: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 340, damping: 18, delay: i * STEP_GAP },
  }),
};
const text: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: i * STEP_GAP + 0.15 },
  }),
};

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="scroll-mt-20 border-t border-paper-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...rise()}>
          <p className="eyebrow">{t("how.eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.2] tracking-[-0.03em] text-ink md:text-[2.75rem]">
            {t("how.title")}
          </h2>
        </motion.div>

        <motion.ol
          className="relative mt-14 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-0"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* 데스크톱 가로 선: 바탕(연한) + 그어지는 선(잉크) */}
          <span className="absolute inset-x-0 top-[10px] hidden h-px bg-paper-line md:block" aria-hidden="true" />
          <motion.span
            className="absolute inset-x-0 top-[10px] hidden h-px origin-left bg-ink md:block"
            variants={trackH}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => (
            <li key={step} className="relative pl-10 md:pl-0 md:pr-10">
              {/* 모바일 세로 선: 이 점에서 다음 점까지 */}
              {i < STEPS.length - 1 && (
                <>
                  <span className="absolute -bottom-12 left-[11px] top-6 w-px bg-paper-line md:hidden" aria-hidden="true" />
                  <motion.span
                    className="absolute -bottom-12 left-[11px] top-6 w-px origin-top bg-ink md:hidden"
                    variants={segmentV}
                    custom={i}
                    aria-hidden="true"
                  />
                </>
              )}
              {/* 숫자 노드: 종이색 배경으로 선을 가려 선이 숫자 사이를 지나가는 것처럼 보인다 */}
              <motion.span
                className={cn(
                  "absolute left-0 top-0 inline-block bg-paper pb-1 text-sm font-semibold leading-5 tabular-nums tracking-[0.08em] text-ink md:relative md:pb-0 md:pr-4",
                  i > 0 && "md:-ml-4 md:pl-4", // 02, 03은 왼쪽 선과도 띄운다 (글 정렬은 그대로)
                )}
                variants={node}
                custom={i}
              >
                0{i + 1}
              </motion.span>
              <motion.div variants={text} custom={i} className="md:mt-7">
                <h3 className="text-xl font-semibold text-ink">{t(`how.${step}.title`)}</h3>
                <p className="mt-2 text-lg leading-[1.7] text-ink-soft">{t(`how.${step}.desc`)}</p>
              </motion.div>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
