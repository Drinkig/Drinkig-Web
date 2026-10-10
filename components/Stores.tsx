import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Roadmap } from "./Roadmap";
import { Em } from "./Em";
import { useLanguage, type TranslationKey } from "../i18n";
import { STORE_INQUIRY_EMAIL } from "../lib/constants";
import { EASE, resolve, rise, riseNow } from "../lib/motion";

const FLOW = ["step1", "step2", "step3", "step4"] as const;
const BENEFITS = ["1", "2", "3"] as const;
const TYPES = ["restaurant", "shop", "other"] as const;

// 매장 도입 문의 폼. 서버 없이 메일 앱을 연다: 받는 사람 sean@gourmevel.com, 본문에 입력값을 채운다.
function InquiryForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", type: "", typeOther: "", email: "", phone: "", note: "" });
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.type) return;
    const typeLabel = form.type === "other" ? form.typeOther : t(`stores.form.type.${form.type}` as TranslationKey);
    const body = [
      `${t("stores.form.name")}: ${form.name}`,
      `${t("stores.form.type")}: ${typeLabel}`,
      `${t("stores.form.email")}: ${form.email}`,
      `${t("stores.form.phone")}: ${form.phone}`,
      "",
      form.note,
    ].join("\n");
    const subject = `${t("stores.form.subject")} ${form.name}`;
    window.location.href = `mailto:${STORE_INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="grid items-start gap-5 sm:grid-cols-2">
      <label className="grid gap-2">
        <span className="text-sm text-paper/70">{t("stores.form.name")}</span>
        <input className="field" required value={form.name} onChange={set("name")} autoComplete="organization" />
      </label>
      <fieldset className="grid gap-2">
        <legend className="text-sm text-paper/70">{t("stores.form.type")}</legend>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={form.type === v}
              onClick={() => setForm((f) => ({ ...f, type: v }))}
              className="chip"
            >
              {t(`stores.form.type.${v}`)}
            </button>
          ))}
        </div>
        {form.type === "other" && (
          <input
            className="field mt-1"
            required
            autoFocus
            value={form.typeOther}
            onChange={set("typeOther")}
            placeholder={t("stores.form.type.otherHint")}
          />
        )}
      </fieldset>
      <label className="grid gap-2">
        <span className="text-sm text-paper/70">{t("stores.form.email")}</span>
        <input className="field" type="email" required value={form.email} onChange={set("email")} autoComplete="email" />
      </label>
      <label className="grid gap-2">
        <span className="text-sm text-paper/70">{t("stores.form.phone")}</span>
        <input className="field" type="tel" required value={form.phone} onChange={set("phone")} autoComplete="tel" />
      </label>
      <label className="grid gap-2 sm:col-span-2">
        <span className="text-sm text-paper/70">{t("stores.form.note")}</span>
        <textarea className="field min-h-[120px] resize-y" value={form.note} onChange={set("note")} />
      </label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary">
          {t("stores.form.submit")}
        </button>
        <span className="text-sm text-paper/50">{t("stores.form.hint")}</span>
      </div>
    </form>
  );
}

export function Stores() {
  const { t } = useLanguage();

  return (
    <>
      <Header dark />
      <main className="tone-dark">
        {/* 히어로 */}
        <section className="wash-ink relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
          {/* 사진은 오른쪽 절반의 배경. 왼쪽과 아래가 종이로 녹아든다. */}
          <motion.div
            className="photo-fade-left pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[58%] lg:block"
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            aria-hidden="true"
          >
            <img src="/images/photos/store-hero.webp" alt="" width={1200} height={1500} fetchPriority="high" decoding="async" className="h-full w-full object-cover object-[center_40%]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
          </motion.div>
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="max-w-4xl">
              <motion.h1
                className="whitespace-pre-line text-[2.75rem] font-bold leading-[1.15] tracking-[-0.03em] text-paper md:text-[3.75rem] lg:text-[4.25rem]"
                {...riseNow(0.08)}
              >
                <Em text={t("stores.title")} />
              </motion.h1>
              <motion.p className="mt-6 max-w-xl text-lg leading-[1.7] text-paper/75" {...riseNow(0.2)}>
                <Em text={t("stores.description")} />
              </motion.p>
              <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" {...riseNow(0.3)}>
                <a href="#inquiry" className="btn-primary">
                  {t("stores.cta")}
                </a>
                <a href="#flow" className="btn-secondary group border-transparent bg-paper/10 text-paper hover:border-transparent hover:bg-paper/20">
                  {t("stores.how")}
                  <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </motion.div>
            </div>
            {/* 모바일: 사진이 글 아래에서 위로 녹아 올라온다 */}
            <div className="relative -mx-6 mt-12 lg:hidden" aria-hidden="true">
              <img src="/images/photos/store-hero.webp" alt="" width={1200} height={1500} decoding="async" className="h-72 w-full object-cover object-[center_35%]" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent" />
            </div>
          </div>
          <div className="relative z-10 mx-auto mt-16 max-w-6xl px-6 md:mt-24">
            <motion.div className="grad-rule origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, ease: EASE, delay: 0.6 }} />
          </div>
        </section>

        {/* 손님의 사정: 사진이 띠 전체의 배경, 오른쪽이 잉크로 어두워지고 그 위에 글 */}
        <section className="relative overflow-hidden border-y border-paper/10 bg-ink text-paper">
          <motion.img
            src="/images/photos/store-guests.webp"
            alt=""
            width={1600}
            height={1067}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[35%_center]"
            initial={{ scale: 1.06 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.6, ease: EASE }}
            aria-hidden="true"
          />
          {/* 사진 전체를 한 단계 어둡게 누르고, 글이 올라가는 오른쪽은 더 어둡게 */}
          <div className="absolute inset-0 bg-ink/45" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ink/50 to-ink/90 lg:via-ink/30 lg:to-ink/85" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-40">
            <motion.div className="lg:ml-auto lg:max-w-[460px]" {...rise()}>
              <h2 className="whitespace-pre-line text-[2.25rem] font-bold leading-[1.15] tracking-[-0.03em] md:text-[3rem]">
                <Em text={t("stores.problem.title")} />
              </h2>
              <p className="mt-6 text-lg leading-[1.8] text-paper/80"><Em text={t("stores.problem.desc")} /></p>
            </motion.div>
          </div>
        </section>

        {/* 작동 방식: 4단계 로드맵 */}
        <section id="flow" className="scroll-mt-20 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div {...rise()}>
              <h2 className="max-w-2xl text-[2.25rem] font-bold leading-[1.15] tracking-[-0.03em] text-paper md:text-[3rem]">
                <Em text={t("stores.flow.title")} />
              </h2>
            </motion.div>
            <Roadmap
              className="mt-14 md:mt-16"
              dark
              steps={FLOW.map((s) => ({ title: t(`stores.flow.${s}.title`), desc: t(`stores.flow.${s}.desc`) }))}
            />
          </div>
        </section>

        {/* 매장이 얻는 것: 사진이 오른쪽 가장자리에서 종이로 녹아든다 */}
        <section className="relative overflow-hidden border-t border-paper/10">
          <motion.div className="photo-fade-left pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block" {...resolve()} aria-hidden="true">
            <img src="/images/photos/store-pour.webp" alt="" width={1600} height={1067} loading="lazy" decoding="async" className="h-full w-full object-cover object-[60%_center]" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
          </motion.div>
          <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="lg:max-w-[540px]">
              <motion.div {...rise()}>
                <h2 className="whitespace-pre-line text-[2.25rem] font-bold leading-[1.15] tracking-[-0.03em] text-paper md:text-[3rem]">
                  <Em text={t("stores.benefit.title")} />
                </h2>
              </motion.div>
              <dl className="mt-10 divide-y divide-paper/10 border-t border-paper/10">
                {BENEFITS.map((b, i) => (
                  <motion.div key={b} className="py-5" {...rise(0.1 + i * 0.1)}>
                    <dt className="text-lg font-semibold text-paper">{t(`stores.benefit.${b}.title`)}</dt>
                    <dd className="mt-1.5 text-lg leading-[1.7] text-paper/70"><Em text={t(`stores.benefit.${b}.desc`)} /></dd>
                  </motion.div>
                ))}
              </dl>
            </div>
            <div className="relative -mx-6 mt-12 lg:hidden" aria-hidden="true">
              <img src="/images/photos/store-pour.webp" alt="" width={1600} height={1067} loading="lazy" decoding="async" className="h-64 w-full object-cover" />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink to-transparent" />
            </div>
          </div>
        </section>

        {/* 준비할 것 · 비용: 두 장의 패널, 가운데 정렬, 위에 브랜드 선 */}
        <section className="border-t border-paper/10 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-2 md:gap-6">
            {(["setup", "price"] as const).map((k, i) => (
              <motion.div
                key={k}
                className="relative overflow-hidden rounded-[24px] bg-paper/[0.06] px-8 py-12 text-center md:px-12 md:py-16"
                {...rise(i * 0.12)}
              >
                <h2 className="whitespace-pre-line text-[1.75rem] font-bold leading-[1.2] tracking-[-0.03em] text-paper md:text-[2.25rem]">
                  <Em text={t(`stores.${k}.title`)} />
                </h2>
                <p className="mx-auto mt-5 max-w-sm text-lg leading-[1.7] text-paper/70">{t(`stores.${k}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 문의 폼: 잉크 띠 */}
        <section id="inquiry" className="scroll-mt-20 bg-[#232220] text-paper">
          <div className="grad-rule" />
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-12">
            <motion.div className="lg:col-span-5" {...rise()}>
              <h2 className="text-[2.25rem] font-bold leading-[1.15] tracking-[-0.03em] md:text-[3rem]">{t("stores.form.title")}</h2>
              <p className="mt-5 max-w-md text-lg leading-[1.7] text-paper/70">{t("stores.form.desc")}</p>
            </motion.div>
            <motion.div className="lg:col-span-6 lg:col-start-7" {...rise(0.1)}>
              <InquiryForm />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer dark />
    </>
  );
}
