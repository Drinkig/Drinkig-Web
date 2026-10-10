import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Roadmap } from "./Roadmap";
import { Em } from "./Em";
import { useLanguage, type TranslationKey } from "../i18n";
import { EASE, resolve, rise, riseNow } from "../lib/motion";

const FLOW = ["step1", "step2", "step3", "step4"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// 한국 전화번호 하이픈. 02는 2자리 지역번호, 나머지는 3자리. 숫자 외에는 버린다.
function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  const area = d.startsWith("02") ? 2 : 3;
  if (d.length <= area) return d;
  const rest = d.slice(area);
  // 가운데 자리: 전체 11자리면 4, 10자리(02-xxxx-xxxx 또는 0xx-xxx-xxxx)면 남는 만큼
  const midLen = d.length === 11 ? 4 : d.length === 10 ? (area === 2 ? 4 : 3) : rest.length <= 4 ? rest.length : rest.length - 4;
  if (rest.length <= midLen) return `${d.slice(0, area)}-${rest}`;
  return `${d.slice(0, area)}-${rest.slice(0, midLen)}-${rest.slice(midLen)}`;
}
const BENEFITS = ["1", "2", "3"] as const;
const TYPES = ["restaurant", "shop", "other"] as const;

// 필수 항목 라벨 뒤의 별표
const Req = () => (
  <span className="ml-0.5 text-[#ff8a80]" aria-hidden="true">
    *
  </span>
);

// 매장 도입 문의 폼. 서버 없이 메일 앱을 연다: 받는 사람 sean@gourmevel.com, 본문에 입력값을 채운다.
function InquiryForm() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ name: "", type: "", typeOther: "", email: "", phone: "", note: "" });
  const [emailTouched, setEmailTouched] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!sent) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSent(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sent]);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // 이메일: 포커스가 빠진 뒤부터 검사. 틀리면 빨간 테두리와 안내 한 줄.
  const emailValid = EMAIL_RE.test(form.email.trim());
  const emailError = emailTouched && form.email.length > 0 && !emailValid;

  // 전화번호: 숫자만 받아서 010-1234-5678 꼴로 하이픈을 채운다. 지역번호(02 등)도 처리.
  const onPhone = (e: { target: { value: string } }) => setForm((f) => ({ ...f, phone: formatPhone(e.target.value) }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.type || sending) return;
    if (!emailValid) {
      setEmailTouched(true);
      return;
    }
    const typeLabel = form.type === "other" ? form.typeOther : t(`stores.form.type.${form.type}` as TranslationKey);
    setSending(true);
    setFailed(false);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, type: typeLabel, email: form.email, phone: form.phone, note: form.note, lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSent(true);
      setForm({ name: "", type: "", typeOther: "", email: "", phone: "", note: "" });
      setEmailTouched(false);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid items-start gap-5 sm:grid-cols-2">
      <label className="grid gap-2 sm:col-span-2">
        <span className="text-sm text-paper/70">
          {t("stores.form.name")}
          <Req />
        </span>
        <input className="field" required value={form.name} onChange={set("name")} autoComplete="organization" />
      </label>
      <fieldset className="grid gap-2 sm:col-span-2">
        <legend className="mb-2 text-sm text-paper/70">
          {t("stores.form.type")}
          <Req />
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {TYPES.map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={form.type === v}
              onClick={() => setForm((f) => ({ ...f, type: v }))}
              className="choice"
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
        <span className="text-sm text-paper/70">
          {t("stores.form.email")}
          <Req />
        </span>
        <input
          className={`field ${emailError ? "field-error" : ""}`}
          type="email"
          required
          value={form.email}
          onChange={set("email")}
          onBlur={() => setEmailTouched(true)}
          autoComplete="email"
          inputMode="email"
          aria-invalid={emailError || undefined}
          aria-describedby={emailError ? "email-error" : undefined}
        />
        {emailError && (
          <span id="email-error" className="text-sm text-[#ff8a80]">
            {t("stores.form.emailError")}
          </span>
        )}
      </label>
      <label className="grid gap-2">
        <span className="text-sm text-paper/70">
          {t("stores.form.phone")}
          <Req />
        </span>
        <input
          className="field"
          type="tel"
          required
          value={form.phone}
          onChange={onPhone}
          autoComplete="tel"
          inputMode="numeric"
          placeholder="010-0000-0000"
          maxLength={13}
        />
      </label>
      <label className="grid gap-2 sm:col-span-2">
        <span className="text-sm text-paper/70">{t("stores.form.note")}</span>
        <textarea className="field min-h-[120px] resize-y" value={form.note} onChange={set("note")} />
      </label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary disabled:opacity-60" disabled={sending}>
          {sending ? t("stores.form.sending") : t("stores.form.submit")}
        </button>
        {failed && <span className="text-sm text-[#ff8a80]">{t("stores.form.failed")}</span>}
      </div>

      {/* 접수 팝업 */}
      <AnimatePresence>
        {sent && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 p-4 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSent(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="sent-title"
              className="w-full max-w-md rounded-[24px] bg-paper p-8 text-ink shadow-2xl md:p-10"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="sent-title" className="text-2xl font-bold tracking-[-0.02em]">
                {t("stores.form.sentTitle")}
              </h3>
              <p className="mt-3 whitespace-pre-line leading-[1.7] text-ink-soft">{t("stores.form.sentDesc")}</p>
              <button type="button" className="btn-primary mt-8 w-full" onClick={() => setSent(false)}>
                {t("stores.form.sentClose")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
        <section className="wash-ink relative overflow-hidden pb-8 pt-28 md:pb-24 md:pt-40">
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
                className="whitespace-pre-line text-[2.125rem] font-bold leading-[1.15] tracking-[-0.03em] text-paper md:text-[3.75rem] lg:text-[4.25rem]"
                {...riseNow(0.08)}
              >
                <Em text={t("stores.title")} />
              </motion.h1>
              <motion.p className="mt-6 max-w-xl text-base leading-[1.7] md:text-lg text-paper/75" {...riseNow(0.2)}>
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
            <div className="relative -mx-6 mt-10 lg:hidden" aria-hidden="true">
              <img src="/images/photos/store-hero.webp" alt="" width={1200} height={1500} decoding="async" className="h-72 w-full object-cover object-[center_35%]" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent" />
            </div>
          </div>
          <div className="relative z-10 mx-auto mt-8 max-w-6xl px-6 md:mt-24">
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
          <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-40">
            <motion.div className="lg:ml-auto lg:max-w-[460px]" {...rise()}>
              <h2 className="whitespace-pre-line text-[1.75rem] font-bold leading-[1.15] tracking-[-0.03em] md:text-[3rem]">
                <Em text={t("stores.problem.title")} />
              </h2>
              <p className="mt-6 text-base leading-[1.8] md:text-lg text-paper/80"><Em text={t("stores.problem.desc")} /></p>
            </motion.div>
          </div>
        </section>

        {/* 작동 방식: 4단계 로드맵 */}
        <section id="flow" className="scroll-mt-20 py-14 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div {...rise()}>
              <h2 className="max-w-2xl text-[1.75rem] font-bold leading-[1.15] tracking-[-0.03em] text-paper md:text-[3rem]">
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
          <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 md:py-28">
            <div className="lg:max-w-[540px]">
              <motion.div {...rise()}>
                <h2 className="whitespace-pre-line text-[1.75rem] font-bold leading-[1.15] tracking-[-0.03em] text-paper md:text-[3rem]">
                  <Em text={t("stores.benefit.title")} />
                </h2>
              </motion.div>
              <dl className="mt-10 divide-y divide-paper/10 border-t border-paper/10">
                {BENEFITS.map((b, i) => (
                  <motion.div key={b} className="py-5" {...rise(0.1 + i * 0.1)}>
                    <dt className="text-lg font-semibold text-paper">{t(`stores.benefit.${b}.title`)}</dt>
                    <dd className="mt-1.5 text-base leading-[1.7] md:text-lg text-paper/70"><Em text={t(`stores.benefit.${b}.desc`)} /></dd>
                  </motion.div>
                ))}
              </dl>
            </div>
            <div className="relative -mx-6 mt-10 lg:hidden" aria-hidden="true">
              <img src="/images/photos/store-pour.webp" alt="" width={1600} height={1067} loading="lazy" decoding="async" className="h-64 w-full object-cover" />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink to-transparent" />
            </div>
          </div>
        </section>

        {/* 준비할 것 · 비용: 두 장의 패널, 가운데 정렬, 위에 브랜드 선 */}
        <section className="border-t border-paper/10 py-14 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-2 md:gap-6">
            {(["setup", "price"] as const).map((k, i) => (
              <motion.div
                key={k}
                className="relative overflow-hidden rounded-[24px] bg-paper/[0.06] px-6 py-9 text-center md:px-12 md:py-16"
                {...rise(i * 0.12)}
              >
                <h2 className="whitespace-pre-line text-[1.5rem] font-bold leading-[1.2] tracking-[-0.03em] text-paper md:text-[2.25rem]">
                  <Em text={t(`stores.${k}.title`)} />
                </h2>
                <p className="mx-auto mt-5 max-w-sm whitespace-pre-line text-base leading-[1.7] md:text-lg text-paper/70">{t(`stores.${k}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 문의 폼: 잉크 띠 */}
        <section id="inquiry" className="scroll-mt-20 border-t border-paper/10 text-paper">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:py-28 lg:grid-cols-12">
            <motion.div className="lg:col-span-5" {...rise()}>
              <h2 className="text-[1.75rem] font-bold leading-[1.15] tracking-[-0.03em] md:text-[3rem]">{t("stores.form.title")}</h2>
              <p className="mt-5 max-w-md text-base leading-[1.7] md:text-lg text-paper/70">{t("stores.form.desc")}</p>
            </motion.div>
            {/* 폼은 밝은 면의 상자 안에. 페이지에서 유일한 입력 영역이라 눈에 띄어야 한다. */}
            <motion.div className="rounded-[24px] bg-paper/[0.06] p-6 md:p-10 lg:col-span-7 lg:col-start-6" {...rise(0.1)}>
              <InquiryForm />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer dark />
    </>
  );
}
