import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "./ui/utils";
import { useLanguage } from "../i18n";
import { APP_STORE_URL, LOGO_SRC } from "../lib/constants";

const NAV_LINKS = [
  { href: "#features", key: "nav.features" },
  { href: "#how-it-works", key: "nav.howItWorks" },
  { href: "#why", key: "nav.why" },
] as const;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || menuOpen
          ? "bg-surface-base/90 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative flex items-center justify-between">
          <a href="/" aria-label="드링키지 홈" className="flex items-center">
            <img
              src={LOGO_SRC}
              alt="드링키지"
              width={334}
              height={56}
              className="h-7 w-auto brightness-0 invert"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {t(link.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 px-5 py-2.5 rounded-full transition-colors"
            >
              {t("nav.download")}
            </a>
            <button
              type="button"
              className="md:hidden p-2 -mr-2 text-gray-300 hover:text-white transition-colors"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-nav" className="md:hidden pt-4 pb-2">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block py-3 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
