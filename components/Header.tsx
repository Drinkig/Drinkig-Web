import { useEffect, useState } from "react";
import { cn } from "./ui/utils";

const drinkeasyLogo = "/images/drinkeasy-logo.png";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img
              src={drinkeasyLogo}
              alt="드링키지"
              className="h-7 w-auto brightness-0 invert"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
              기능
            </a>
            <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">
              사용 방법
            </a>
            <a href="#why" className="text-sm text-gray-400 hover:text-white transition-colors">
              드링키지란
            </a>
          </nav>

          <a
            href="https://apps.apple.com/kr/app/%EB%93%9C%EB%A7%81%ED%82%A4%EC%A7%80/id6741486172"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white bg-white/10 hover:bg-white/15 px-5 py-2.5 rounded-full transition-colors"
          >
            다운로드
          </a>
        </div>
      </div>
    </header>
  );
}
