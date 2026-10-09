import { motion } from "motion/react";
import { useLanguage, type TranslationKey } from "../i18n";
import { cn } from "./ui/utils";
import { rise } from "../lib/motion";
import { PhoneFrame } from "./PhoneFrame";

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
      <div className="mx-auto max-w-6xl px-6">
        <motion.div className="pt-16 md:pt-24" {...rise()}>
          <p className="eyebrow">{t("features.eyebrow")}</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.2] tracking-[-0.03em] text-ink md:text-[2.75rem]">
            {t("features.title")}
          </h2>
        </motion.div>

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
                  {t(k(f.key, "title"))}
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
