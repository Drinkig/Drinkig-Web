// 각 기능별 심플한 일러스트 SVG 컴포넌트

export function MatchScoreIllust({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 와인 병 실루엣 */}
      <rect x="95" y="60" width="50" height="120" rx="8" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1.5" />
      <rect x="105" y="40" width="30" height="24" rx="4" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1.5" />
      <rect x="110" y="32" width="20" height="12" rx="3" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1.5" />
      {/* 라벨 */}
      <rect x="101" y="100" width="38" height="30" rx="4" fill="#a78bfa" opacity="0.15" stroke="#a78bfa" strokeWidth="1" />
      {/* 매칭 점수 원형 */}
      <circle cx="170" cy="80" r="32" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="2" />
      <circle cx="170" cy="80" r="32" fill="none" stroke="#c084fc" strokeWidth="3" strokeDasharray="160 200" strokeLinecap="round" transform="rotate(-90 170 80)" />
      <text x="170" y="76" textAnchor="middle" fill="#e9d5ff" fontSize="16" fontWeight="bold" fontFamily="system-ui">92</text>
      <text x="170" y="92" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="system-ui">MATCH</text>
      {/* 하트 아이콘 */}
      <path d="M168 60 l4-4 a3 3 0 0 1 5 0 l0 0 a3 3 0 0 1 0 5 l-5 5 l-5-5 a3 3 0 0 1 0-5 l0 0 a3 3 0 0 1 5 0 z" fill="#f472b6" opacity="0.6" />
    </svg>
  );
}

export function ScanIllust({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 폰 프레임 */}
      <rect x="70" y="40" width="100" height="170" rx="16" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1.5" />
      <rect x="78" y="56" width="84" height="138" rx="4" fill="#0f0f1a" />
      {/* 카메라 뷰파인더 */}
      <path d="M88 70 h12 v0" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
      <path d="M88 70 v12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
      <path d="M152 70 h-12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
      <path d="M152 70 v12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
      <path d="M88 160 v-12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
      <path d="M88 160 h12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
      <path d="M152 160 h-12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
      <path d="M152 160 v-12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
      {/* 스캔 라인 */}
      <line x1="92" y1="115" x2="148" y2="115" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6" strokeDasharray="4 3" />
      {/* 와인 라벨 (스캔 대상) */}
      <rect x="100" y="85" width="40" height="56" rx="4" fill="#a78bfa" opacity="0.1" stroke="#a78bfa" strokeWidth="1" />
      <line x1="108" y1="96" x2="132" y2="96" stroke="#a78bfa" strokeWidth="1" opacity="0.4" />
      <line x1="108" y1="103" x2="128" y2="103" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
      <line x1="108" y1="110" x2="124" y2="110" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
      {/* 결과 점수들 */}
      <circle cx="108" cy="176" r="6" fill="#c084fc" opacity="0.3" />
      <text x="108" y="179" textAnchor="middle" fill="#e9d5ff" fontSize="6" fontFamily="system-ui">95</text>
      <circle cx="124" cy="176" r="6" fill="#c084fc" opacity="0.2" />
      <text x="124" y="179" textAnchor="middle" fill="#e9d5ff" fontSize="6" fontFamily="system-ui">87</text>
      <circle cx="140" cy="176" r="6" fill="#c084fc" opacity="0.15" />
      <text x="140" y="179" textAnchor="middle" fill="#e9d5ff" fontSize="6" fontFamily="system-ui">72</text>
    </svg>
  );
}

export function ChatbotIllust({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 채팅 버블 - 유저 */}
      <rect x="100" y="50" width="110" height="36" rx="12" fill="#a78bfa" opacity="0.15" stroke="#a78bfa" strokeWidth="1" />
      <text x="115" y="73" fill="#e9d5ff" fontSize="11" fontFamily="system-ui">스테이크에 어울리는</text>
      <text x="115" y="60" fill="#e9d5ff" fontSize="0" fontFamily="system-ui"></text>
      {/* 유저 버블 꼬리 */}
      <path d="M200 86 l8 -6 l-2 10 z" fill="#a78bfa" opacity="0.15" />

      {/* 채팅 버블 - AI */}
      <rect x="30" y="100" width="140" height="50" rx="12" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1" />
      {/* AI 버블 꼬리 */}
      <path d="M40 150 l-8 6 l2-10 z" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1" />
      {/* 와인 추천 내용 */}
      <circle cx="52" cy="118" r="8" fill="#a78bfa" opacity="0.2" />
      <text x="52" y="121" textAnchor="middle" fill="#c084fc" fontSize="8" fontFamily="system-ui">1</text>
      <text x="66" y="121" fill="#d4d4d8" fontSize="10" fontFamily="system-ui">Cabernet Sauvignon</text>
      <circle cx="52" cy="137" r="8" fill="#a78bfa" opacity="0.15" />
      <text x="52" y="140" textAnchor="middle" fill="#c084fc" fontSize="8" fontFamily="system-ui">2</text>
      <text x="66" y="140" fill="#d4d4d8" fontSize="10" fontFamily="system-ui">Malbec Reserve</text>

      {/* 음식 아이콘 */}
      <circle cx="188" cy="170" r="24" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1" opacity="0.5" />
      <text x="188" y="175" textAnchor="middle" fontSize="20">🥩</text>
      {/* 와인 아이콘 */}
      <circle cx="52" cy="188" r="18" fill="#1a1a2e" stroke="#c084fc" strokeWidth="1" opacity="0.4" />
      <text x="52" y="193" textAnchor="middle" fontSize="14">🍷</text>
    </svg>
  );
}

export function TastingNoteIllust({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 노트 카드 */}
      <rect x="50" y="45" width="140" height="160" rx="12" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1.5" />
      {/* 상단 와인 정보 */}
      <rect x="66" y="60" width="24" height="32" rx="4" fill="#a78bfa" opacity="0.15" />
      <text x="78" y="80" textAnchor="middle" fontSize="14">🍷</text>
      <line x1="100" y1="68" x2="170" y2="68" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
      <line x1="100" y1="78" x2="150" y2="78" stroke="#a78bfa" strokeWidth="1" opacity="0.2" />
      <line x1="100" y1="88" x2="135" y2="88" stroke="#a78bfa" strokeWidth="1" opacity="0.15" />
      {/* 구분선 */}
      <line x1="66" y1="105" x2="174" y2="105" stroke="#a78bfa" strokeWidth="0.5" opacity="0.2" />
      {/* 맛 키워드 태그들 */}
      <rect x="66" y="115" width="42" height="22" rx="11" fill="#a78bfa" opacity="0.15" stroke="#a78bfa" strokeWidth="0.5" />
      <text x="87" y="130" textAnchor="middle" fill="#c084fc" fontSize="9" fontFamily="system-ui">달콤한</text>
      <rect x="114" y="115" width="50" height="22" rx="11" fill="#f472b6" opacity="0.1" stroke="#f472b6" strokeWidth="0.5" />
      <text x="139" y="130" textAnchor="middle" fill="#f9a8d4" fontSize="9" fontFamily="system-ui">체리향</text>
      <rect x="66" y="143" width="46" height="22" rx="11" fill="#fbbf24" opacity="0.1" stroke="#fbbf24" strokeWidth="0.5" />
      <text x="89" y="158" textAnchor="middle" fill="#fcd34d" fontSize="9" fontFamily="system-ui">부드러운</text>
      <rect x="118" y="143" width="52" height="22" rx="11" fill="#34d399" opacity="0.1" stroke="#34d399" strokeWidth="0.5" />
      <text x="144" y="158" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontFamily="system-ui">미디엄바디</text>
      {/* 별점 대신 슬라이더 */}
      <rect x="66" y="178" width="108" height="4" rx="2" fill="#a78bfa" opacity="0.1" />
      <rect x="66" y="178" width="75" height="4" rx="2" fill="#a78bfa" opacity="0.4" />
      <circle cx="141" cy="180" r="5" fill="#c084fc" />
    </svg>
  );
}

export function CellarIllust({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 선반 구조 */}
      <line x1="40" y1="90" x2="200" y2="90" stroke="#a78bfa" strokeWidth="1.5" opacity="0.3" />
      <line x1="40" y1="150" x2="200" y2="150" stroke="#a78bfa" strokeWidth="1.5" opacity="0.3" />
      <line x1="40" y1="210" x2="200" y2="210" stroke="#a78bfa" strokeWidth="1.5" opacity="0.3" />
      {/* 상단 선반 - 와인 병들 */}
      <rect x="55" y="55" width="20" height="35" rx="4" fill="#a78bfa" opacity="0.2" stroke="#a78bfa" strokeWidth="0.8" />
      <rect x="60" y="45" width="10" height="12" rx="2" fill="#a78bfa" opacity="0.15" />
      <rect x="85" y="60" width="20" height="30" rx="4" fill="#c084fc" opacity="0.15" stroke="#c084fc" strokeWidth="0.8" />
      <rect x="90" y="50" width="10" height="12" rx="2" fill="#c084fc" opacity="0.1" />
      <rect x="115" y="52" width="20" height="38" rx="4" fill="#f472b6" opacity="0.15" stroke="#f472b6" strokeWidth="0.8" />
      <rect x="120" y="42" width="10" height="12" rx="2" fill="#f472b6" opacity="0.1" />
      <rect x="145" y="58" width="20" height="32" rx="4" fill="#fbbf24" opacity="0.15" stroke="#fbbf24" strokeWidth="0.8" />
      <rect x="150" y="48" width="10" height="12" rx="2" fill="#fbbf24" opacity="0.1" />
      {/* 중간 선반 */}
      <rect x="55" y="115" width="20" height="35" rx="4" fill="#34d399" opacity="0.15" stroke="#34d399" strokeWidth="0.8" />
      <rect x="60" y="105" width="10" height="12" rx="2" fill="#34d399" opacity="0.1" />
      <rect x="85" y="118" width="20" height="32" rx="4" fill="#a78bfa" opacity="0.15" stroke="#a78bfa" strokeWidth="0.8" />
      <rect x="90" y="108" width="10" height="12" rx="2" fill="#a78bfa" opacity="0.1" />
      {/* + 버튼 */}
      <rect x="125" y="120" width="30" height="28" rx="8" fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      <line x1="140" y1="128" x2="140" y2="142" stroke="#a78bfa" strokeWidth="1.5" opacity="0.3" />
      <line x1="133" y1="135" x2="147" y2="135" stroke="#a78bfa" strokeWidth="1.5" opacity="0.3" />
      {/* 하단 선반 - 카운트 */}
      <text x="70" y="185" fill="#a78bfa" fontSize="11" fontFamily="system-ui" opacity="0.6">보유 6병</text>
      <text x="70" y="200" fill="#71717a" fontSize="9" fontFamily="system-ui">마신 와인 12병</text>
    </svg>
  );
}
