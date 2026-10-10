import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "./ui/utils";
import { useLanguage } from "../i18n";
import { APP_STORE_URL, WORDMARK_PAPER_SRC, WORDMARK_SRC } from "../lib/constants";

const NAV_LINKS = [
  { href: "#features", key: "nav.features" },
  { href: "#how-it-works", key: "nav.howItWorks" },
  { href: "#why", key: "nav.why" },
] as const;

export function Header({ dark = false }: { dark?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { t, lp } = useLanguage();
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "/en";
  // 홈이 아닌 페이지(매장 도입 문의 등)에서는 섹션 앵커를 홈 경로로 돌린다
  const anchor = (href: string) => (isHome ? href : `${lp("/")}${href}`);

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
    if (!isHome) return;
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
  }, [isHome]);

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
          ? dark
            ? "border-b border-paper/10 bg-ink/90 py-3 backdrop-blur-md"
            : "border-b border-paper-line bg-paper/90 py-3 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-5",
      )}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative flex items-center justify-between">
          <a href={lp("/")} aria-label="드링키지 홈" className="flex items-center">
            <img src={dark ? WORDMARK_PAPER_SRC : WORDMARK_SRC} alt="DRINKIG" width={800} height={134} className="h-[18px] w-auto md:h-5" />
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={anchor(link.href)} className="nav-link" aria-current={active === link.href ? "true" : undefined}>
                {t(link.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* 오른쪽 버튼 둘: 매장 도입 문의(잉크 채움, 주) · App Store(테두리, 보조) */}
            <Link
              to={lp("/stores")}
              className={cn(
                "hidden h-9 items-center rounded-full px-4 text-sm font-medium transition-colors md:inline-flex",
                dark ? "bg-paper text-ink hover:bg-paper-deep" : "bg-ink text-paper hover:bg-ink-soft",
              )}
              aria-current={pathname.endsWith("/stores") ? "page" : undefined}
            >
              {t("nav.stores")}
            </Link>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors",
                dark ? "border-transparent bg-paper/10 text-paper hover:bg-paper/20" : "border-ink/20 text-ink hover:border-ink",
              )}
            >
              {t("nav.download")}
            </a>
            <button
              type="button"
              className={cn("-mr-2 p-2 md:hidden", dark ? "text-paper" : "text-ink")}
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
            <ul className={cn("flex flex-col divide-y", dark ? "divide-paper/10" : "divide-paper-line")}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={anchor(link.href)} className={cn("block py-3", dark ? "text-paper/70 hover:text-paper" : "text-ink-soft hover:text-ink")} onClick={() => setMenuOpen(false)}>
                    {t(link.key)}
                  </a>
                </li>
              ))}
              <li>
                <Link to={lp("/stores")} className={cn("block py-3", dark ? "text-paper/70 hover:text-paper" : "text-ink-soft hover:text-ink")} onClick={() => setMenuOpen(false)}>
                  {t("nav.stores")}
                </Link>
              </li>
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
