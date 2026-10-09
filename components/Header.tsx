import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "./ui/utils";
import { useLanguage } from "../i18n";
import { APP_STORE_URL, WORDMARK_SRC } from "../lib/constants";

const NAV_LINKS = [
  { href: "#features", key: "nav.features" },
  { href: "#how-it-works", key: "nav.howItWorks" },
  { href: "#why", key: "nav.why" },
] as const;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { t, lp } = useLanguage();

  // 헤더 아래 스크롤 진행 바
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 지금 보고 있는 섹션 밑에 그라데이션 밑줄이 머문다 (Cabine의 aria-current 탭)
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector<HTMLElement>(l.href)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
        else if (window.scrollY < 200) setActive(null);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.1, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,padding,border-color] duration-300",
        isScrolled || menuOpen
          ? "border-b border-paper-line bg-paper/90 py-3 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-5",
      )}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative flex items-center justify-between">
          <a href={lp("/")} aria-label="드링키지 홈" className="flex items-center">
            <img src={WORDMARK_SRC} alt="DRINKIG" width={800} height={134} className="h-[18px] w-auto md:h-5" />
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link" aria-current={active === link.href ? "true" : undefined}>
                {t(link.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center rounded-full border border-ink/20 px-4 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              {t("nav.download")}
            </a>
            <button
              type="button"
              className="-mr-2 p-2 text-ink md:hidden"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-nav" className="pb-2 pt-4 md:hidden">
            <ul className="flex flex-col divide-y divide-paper-line">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="block py-3 text-ink-soft hover:text-ink" onClick={() => setMenuOpen(false)}>
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* 스크롤 진행 바: 브랜드 그라데이션이 왼쪽에서 차오른다 */}
      <motion.div
        className={cn("absolute inset-x-0 bottom-[-1px] h-[2px] origin-left transition-opacity duration-300", isScrolled ? "opacity-100" : "opacity-0")}
        style={{ scaleX: progress, background: "var(--grad)" }}
        aria-hidden="true"
      />
    </header>
  );
}
