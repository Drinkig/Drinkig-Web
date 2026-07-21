import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";
import { useState, useRef, useEffect } from "react";
import { APP_STORE_URL, INSTAGRAM_URL, LOGO_SRC, CONTACT_EMAIL } from "../lib/constants";
import { AppleLogo } from "./icons";

export function Footer() {
  const { lang, setLang, t, lp } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!langOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [langOpen]);

  return (
    <footer className="bg-surface-raised border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* 왼쪽: 로고 + 사업자 정보 + 카피라이트 */}
          <div>
            <img
              src={LOGO_SRC}
              alt="드링키지"
              width={334}
              height={56}
              loading="lazy"
              className="h-6 w-auto brightness-0 invert mb-4"
            />
            <p className="text-gray-500 text-xs mb-1.5">{t("footer.businessInfo")}</p>
            <p className="text-gray-500 text-xs mb-3">
              {t("footer.contact")}:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gray-300 transition-colors">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="text-gray-500 text-sm">
              Copyright &copy; 2026 Drinkig.{" "}
              <Link
                to="/admin"
                className="text-gray-600 hover:text-gray-400 transition-colors"
              >
                관리자
              </Link>
            </p>
          </div>

          {/* 오른쪽 */}
          <div className="flex flex-col items-start md:items-end gap-5">
            {/* 소셜 아이콘 */}
            <div className="flex items-center gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/25 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                </svg>
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/25 transition-colors"
                aria-label="App Store"
              >
                <AppleLogo className="w-4 h-4" />
              </a>
            </div>

            {/* 약관 링크들 */}
            <div className="flex items-center gap-5 text-sm">
              <Link to={lp("/privacy")} className="text-gray-400 hover:text-white transition-colors">
                {t("privacy")}
              </Link>
              <Link to={lp("/terms")} className="text-gray-400 hover:text-white transition-colors">
                {t("terms")}
              </Link>
              <Link to={lp("/notices")} className="text-gray-400 hover:text-white transition-colors">
                {t("notices")}
              </Link>
            </div>

            {/* 언어 선택 */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-label="언어 선택 / Select language"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                className="flex items-center gap-2 text-sm text-gray-400 border border-white/10 rounded-full px-4 py-2 hover:border-white/20 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                {lang === "ko" ? "한국어" : "English"}
                <svg className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {langOpen && (
                <div
                  role="listbox"
                  aria-label="Language"
                  className="absolute bottom-full mb-2 right-0 bg-surface-overlay border border-white/10 rounded-xl overflow-hidden shadow-xl min-w-[120px]"
                >
                  {([["ko", "한국어"], ["en", "English"]] as const).map(([code, label]) => (
                    <button
                      key={code}
                      role="option"
                      aria-selected={lang === code}
                      onClick={() => { setLang(code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${lang === code ? "text-white bg-white/5" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
