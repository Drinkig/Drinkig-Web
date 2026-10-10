import { motion, type Variants } from "motion/react";
import { cn } from "./ui/utils";
import { EASE } from "../lib/motion";

export interface RoadmapStep {
  title: string;
  desc: string;
}

// 로드맵: 선이 01 → 02 → 03…으로 그어지고, 선이 닿는 순간 숫자가 튀어나오고 글이 뒤따른다.
// 데스크톱은 가로 한 줄(오른쪽 끝까지 이어짐), 모바일은 단계 사이 세로 구간선.
const STEP_GAP = 0.8;
const COLS: Record<number, string> = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" };

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
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: i * STEP_GAP + 0.15 } }),
};
const segmentV: Variants = {
  hidden: { scaleY: 0 },
  show: (i: number) => ({ scaleY: 1, transition: { duration: STEP_GAP, ease: "linear", delay: i * STEP_GAP } }),
};

export function Roadmap({ steps, className, dark = false }: { steps: RoadmapStep[]; className?: string; dark?: boolean }) {
  const faint = dark ? "bg-paper/15" : "bg-paper-line";
  const strong = dark ? "bg-paper" : "bg-ink";
  const fg = dark ? "text-paper" : "text-ink";
  const fgSoft = dark ? "text-paper/70" : "text-ink-soft";
  const nodeBg = dark ? "bg-ink" : "bg-paper";
  const trackH: Variants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: STEP_GAP * steps.length, ease: "linear" } },
  };
  return (
    <motion.ol
      className={cn("relative grid gap-12 md:gap-0", COLS[steps.length] ?? "md:grid-cols-3", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <span className={cn("absolute inset-x-0 top-[10px] hidden h-px md:block", faint)} aria-hidden="true" />
      <motion.span className={cn("absolute inset-x-0 top-[10px] hidden h-px origin-left md:block", strong)} variants={trackH} aria-hidden="true" />

      {steps.map((step, i) => (
        <li key={i} className="relative pl-10 md:pl-0 md:pr-10">
          {i < steps.length - 1 && (
            <>
              <span className={cn("absolute -bottom-12 left-[11px] top-6 w-px md:hidden", faint)} aria-hidden="true" />
              <motion.span className={cn("absolute -bottom-12 left-[11px] top-6 w-px origin-top md:hidden", strong)} variants={segmentV} custom={i} aria-hidden="true" />
            </>
          )}
          <motion.span
            className={cn(
              "absolute left-0 top-0 inline-block pb-1 text-sm font-semibold leading-5 tabular-nums tracking-[0.08em] md:relative md:pb-0 md:pr-4",
              nodeBg,
              fg,
              i > 0 && "md:-ml-4 md:pl-4",
            )}
            variants={node}
            custom={i}
          >
            0{i + 1}
          </motion.span>
          <motion.div variants={text} custom={i} className="md:mt-7">
            <h3 className={cn("text-xl font-semibold", fg)}>{step.title}</h3>
            <p className={cn("mt-2 text-lg leading-[1.7]", fgSoft)}>{step.desc}</p>
          </motion.div>
        </li>
      ))}
    </motion.ol>
  );
}
