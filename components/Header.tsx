import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { cn } from "./ui/utils";
import { motion } from "motion/react";

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

  const menuItems = [
    { label: "홈", href: "#home" },
    { label: "기능", href: "#features" },
    { label: "팀 소개", href: "#team" },
    { label: "History", href: "#history" },
  ];

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        isScrolled 
          ? "bg-black/50 backdrop-blur-xl border-white/5 py-3" 
          : "bg-transparent py-5"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
              <img 
                src={drinkeasyLogo} 
                alt="드링키지" 
                className="h-8 w-auto relative z-10 brightness-0 invert"
              />
            </div>
          </a>
          
          <nav className="hidden md:flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
            {menuItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="text-sm font-medium text-gray-400 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:inline-flex border-purple-500/30 hover:border-purple-500 text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 transition-all duration-300"
              onClick={() => window.open('https://apps.apple.com/kr/app/%EB%93%9C%EB%A7%81%ED%82%A4%EC%A7%80/id6741486172', '_blank')}
            >
              앱 다운로드
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}