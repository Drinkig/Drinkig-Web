import { Link } from "react-router-dom";

const drinkeasyLogo = "/images/drinkeasy-logo.png";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          {/* 로고 & 슬로건 */}
          <div>
            <img
              src={drinkeasyLogo}
              alt="드링키지"
              className="h-7 w-auto brightness-0 invert mb-3"
            />
            <p className="text-gray-500 text-sm">와인을 이지하게, 드링키지</p>
          </div>

          {/* 링크 */}
          <div className="flex gap-8 text-sm">
            <a
              href="https://apps.apple.com/kr/app/%EB%93%9C%EB%A7%81%ED%82%A4%EC%A7%80/id6741486172"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              App Store
            </a>
            <a
              href="https://www.instagram.com/drinkig.official/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Instagram
            </a>
            <Link to="/notices" className="text-gray-400 hover:text-white transition-colors">
              공지사항
            </Link>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-px bg-white/5 mb-8"></div>

        {/* 사업자 정보 */}
        <div className="text-gray-600 text-xs space-y-1.5">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>상호명: 고메블</span>
            <span>대표: 위승주</span>
            <span>사업자등록번호: 342-15-02376</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>서울특별시 서대문구 가재울미래로2, 114동 2102호</span>
            <span>연락처: 010-3655-5641</span>
            <span>이메일: drinkeasyy@gmail.com</span>
          </div>
          <div className="flex gap-4 pt-3">
            <Link to="/terms" className="hover:text-gray-400 transition-colors">이용약관</Link>
            <Link to="/privacy" className="hover:text-gray-400 transition-colors">개인정보 처리방침</Link>
          </div>
          <p className="pt-2 text-gray-700">&copy; 2025 Drinkig. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
