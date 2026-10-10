import { motion } from "motion/react";
import { useLanguage, type TranslationKey } from "../i18n";
import { cn } from "./ui/utils";
import { rise } from "../lib/motion";
import { PhoneFrame } from "./PhoneFrame";
import { BottleMarquee } from "./BottleMarquee";
import { Em } from "./Em";

// 기능 네 가지. 이미지는 전부 앱스토어에 올린 실제 화면. caption 키는 alt 텍스트로만 쓴다.
const FEATURES = [
  { key: "scan", src: "/images/shot-scan.webp", width: 720, height: 1281 },
  { key: "pairing", src: "/images/shot-pairing.webp", width: 720, height: 1358 },
  { key: "note", src: "/images/shot-note.webp", width: 720, height: 1358 },
  { key: "cellar", src: "/images/shot-cellar.webp", width: 720, height: 1358 },
] as const;

type FeatureKey = (typeof FEATURES)[number]["key"];
const k = (key: FeatureKey, part: "eyebrow" | "title" | "desc" | "caption") =>
  `features.${key}.${part}` as TranslationKey;

export function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section id="features" className="scroll-mt-20">
      {/* 섹션 머리: 잉크색 띠 위에 제목, 그 뒤로 와인병들이 지나간다 */}
      <div className="wash-ink relative overflow-hidden text-paper">
        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 md:pt-28">
          <motion.div {...rise()}>
            <p className="eyebrow text-paper/60">{t("features.eyebrow")}</p>
            <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.2] tracking-[-0.03em] md:text-[3rem]">
              <Em text={t("features.title")} />
            </h2>
          </motion.div>
        </div>
        <BottleMarquee className="mt-12 pb-14 md:mt-16 md:pb-20" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {FEATURES.map((f, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={f.key}
              className={cn(
                "grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-x-20",
                i > 0 && "border-t border-paper-line",
              )}
            >
              <motion.div className={cn("max-w-lg", flip && "lg:order-2")} {...rise()}>
                <p className="eyebrow">{t(k(f.key, "eyebrow"))}</p>
                <h3 className="mt-5 whitespace-pre-line text-[1.9rem] font-bold leading-[1.22] tracking-[-0.03em] text-ink md:text-[2.4rem]">
                  <Em text={t(k(f.key, "title"))} />
                </h3>
                <p className="mt-5 text-lg leading-[1.7] text-ink-soft">{t(k(f.key, "desc"))}</p>
              </motion.div>

              <figure className={cn(flip && "lg:order-1")}>
                <PhoneFrame src={f.src} alt={t(k(f.key, "caption"))} width={f.width} height={f.height} />
              </figure>
            </article>
          );
        })}
      </div>
    </section>
  );
}
