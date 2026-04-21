import { motion } from "motion/react";
import { useLanguage } from "../i18n";

// 매칭 점수 - 게이지가 채워지고 점수가 올라가는 애니메이션
export function MatchScoreIllust({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 와인 병 실루엣 */}
      <motion.g
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <rect x="95" y="60" width="50" height="120" rx="8" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1.5" />
        <rect x="105" y="40" width="30" height="24" rx="4" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1.5" />
        <rect x="110" y="32" width="20" height="12" rx="3" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1.5" />
        <rect x="101" y="100" width="38" height="30" rx="4" fill="#a78bfa" opacity="0.15" stroke="#a78bfa" strokeWidth="1" />
      </motion.g>

      {/* 매칭 점수 원형 - 게이지 채워지는 애니메이션 */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <circle cx="170" cy="80" r="32" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="2" />
        <motion.circle
          cx="170" cy="80" r="32"
          fill="none" stroke="#c084fc" strokeWidth="3"
          strokeLinecap="round"
          transform="rotate(-90 170 80)"
          initial={{ strokeDasharray: "0 200" }}
          whileInView={{ strokeDasharray: "160 200" }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        <text x="170" y="76" textAnchor="middle" fill="#e9d5ff" fontSize="16" fontWeight="bold" fontFamily="system-ui">92</text>
        <text x="170" y="92" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="system-ui">MATCH</text>
      </motion.g>

      {/* 하트 - 팝 애니메이션 */}
      <motion.path
        d="M168 60 l4-4 a3 3 0 0 1 5 0 l0 0 a3 3 0 0 1 0 5 l-5 5 l-5-5 a3 3 0 0 1 0-5 l0 0 a3 3 0 0 1 5 0 z"
        fill="#f472b6" opacity="0.6"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 0.3, delay: 1.2, type: "spring", stiffness: 400 }}
        viewport={{ once: true }}
        style={{ transformOrigin: "172px 60px" }}
      />
    </svg>
  );
}

// 스캔 - 스캔 라인이 위아래로 움직이는 애니메이션
export function ScanIllust({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 폰 프레임 */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <rect x="70" y="40" width="100" height="170" rx="16" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1.5" />
        <rect x="78" y="56" width="84" height="138" rx="4" fill="#0f0f1a" />
      </motion.g>

      {/* 뷰파인더 코너 */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <path d="M88 70 h12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
        <path d="M88 70 v12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
        <path d="M152 70 h-12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
        <path d="M152 70 v12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
        <path d="M88 160 v-12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
        <path d="M88 160 h12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
        <path d="M152 160 h-12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
        <path d="M152 160 v-12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
      </motion.g>

      {/* 스캔 라인 - 위아래 반복 */}
      <motion.line
        x1="92" x2="148"
        stroke="#a78bfa" strokeWidth="2" opacity="0.7"
        initial={{ y1: 80, y2: 80 }}
        animate={{ y1: [80, 155, 80], y2: [80, 155, 80] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 와인 라벨 */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <rect x="100" y="85" width="40" height="56" rx="4" fill="#a78bfa" opacity="0.1" stroke="#a78bfa" strokeWidth="1" />
        <line x1="108" y1="96" x2="132" y2="96" stroke="#a78bfa" strokeWidth="1" opacity="0.4" />
        <line x1="108" y1="103" x2="128" y2="103" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
        <line x1="108" y1="110" x2="124" y2="110" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
      </motion.g>

      {/* 결과 점수들 - 하나씩 나타남 */}
      <motion.g initial={{ opacity: 0, y: 4 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.8 }} viewport={{ once: true }}>
        <circle cx="108" cy="176" r="6" fill="#c084fc" opacity="0.3" />
        <text x="108" y="179" textAnchor="middle" fill="#e9d5ff" fontSize="6" fontFamily="system-ui">95</text>
      </motion.g>
      <motion.g initial={{ opacity: 0, y: 4 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 1.0 }} viewport={{ once: true }}>
        <circle cx="124" cy="176" r="6" fill="#c084fc" opacity="0.2" />
        <text x="124" y="179" textAnchor="middle" fill="#e9d5ff" fontSize="6" fontFamily="system-ui">87</text>
      </motion.g>
      <motion.g initial={{ opacity: 0, y: 4 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 1.2 }} viewport={{ once: true }}>
        <circle cx="140" cy="176" r="6" fill="#c084fc" opacity="0.15" />
        <text x="140" y="179" textAnchor="middle" fill="#e9d5ff" fontSize="6" fontFamily="system-ui">72</text>
      </motion.g>
    </svg>
  );
}

// 챗봇 - 채팅 버블이 순서대로 나타나는 애니메이션
export function ChatbotIllust({ className }: { className?: string }) {
  const { lang } = useLanguage();
  const chatText = lang === "ko" ? "스테이크에 어울리는" : "Goes with steak?";
  return (
    <svg className={className} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 유저 채팅 버블 */}
      <motion.g
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <rect x="100" y="50" width="110" height="36" rx="12" fill="#a78bfa" opacity="0.15" stroke="#a78bfa" strokeWidth="1" />
        <text x="115" y="73" fill="#e9d5ff" fontSize="11" fontFamily="system-ui">{chatText}</text>
        <path d="M200 86 l8 -6 l-2 10 z" fill="#a78bfa" opacity="0.15" />
      </motion.g>

      {/* AI 응답 버블 */}
      <motion.g
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        viewport={{ once: true }}
      >
        <rect x="30" y="100" width="140" height="50" rx="12" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1" />
        <path d="M40 150 l-8 6 l2-10 z" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1" />
      </motion.g>

      {/* 추천 결과 1 */}
      <motion.g
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 1.0 }}
        viewport={{ once: true }}
      >
        <circle cx="52" cy="118" r="8" fill="#a78bfa" opacity="0.2" />
        <text x="52" y="121" textAnchor="middle" fill="#c084fc" fontSize="8" fontFamily="system-ui">1</text>
        <text x="66" y="121" fill="#d4d4d8" fontSize="10" fontFamily="system-ui">Cabernet Sauvignon</text>
      </motion.g>

      {/* 추천 결과 2 */}
      <motion.g
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 1.3 }}
        viewport={{ once: true }}
      >
        <circle cx="52" cy="137" r="8" fill="#a78bfa" opacity="0.15" />
        <text x="52" y="140" textAnchor="middle" fill="#c084fc" fontSize="8" fontFamily="system-ui">2</text>
        <text x="66" y="140" fill="#d4d4d8" fontSize="10" fontFamily="system-ui">Malbec Reserve</text>
      </motion.g>

      {/* 음식 아이콘 - 바운스 */}
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4, type: "spring", stiffness: 300 }}
        viewport={{ once: true }}
        style={{ transformOrigin: "188px 170px" }}
      >
        <circle cx="188" cy="170" r="24" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1" opacity="0.5" />
        <text x="188" y="175" textAnchor="middle" fontSize="20">🥩</text>
      </motion.g>

      {/* 와인 아이콘 - 바운스 */}
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.5, type: "spring", stiffness: 300 }}
        viewport={{ once: true }}
        style={{ transformOrigin: "52px 188px" }}
      >
        <circle cx="52" cy="188" r="18" fill="#1a1a2e" stroke="#c084fc" strokeWidth="1" opacity="0.4" />
        <text x="52" y="193" textAnchor="middle" fontSize="14">🍷</text>
      </motion.g>
    </svg>
  );
}

// 테이스팅 노트 - 태그가 하나씩 팝업되는 애니메이션
export function TastingNoteIllust({ className }: { className?: string }) {
  const { lang } = useLanguage();
  const tags = lang === "ko"
    ? ["달콤한", "체리향", "부드러운", "미디엄바디"]
    : ["Sweet", "Cherry", "Smooth", "Medium"];
  return (
    <svg className={className} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 노트 카드 */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <rect x="50" y="45" width="140" height="160" rx="12" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1.5" />
        <rect x="66" y="60" width="24" height="32" rx="4" fill="#a78bfa" opacity="0.15" />
        <text x="78" y="80" textAnchor="middle" fontSize="14">🍷</text>
        <line x1="100" y1="68" x2="170" y2="68" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
        <line x1="100" y1="78" x2="150" y2="78" stroke="#a78bfa" strokeWidth="1" opacity="0.2" />
        <line x1="100" y1="88" x2="135" y2="88" stroke="#a78bfa" strokeWidth="1" opacity="0.15" />
        <line x1="66" y1="105" x2="174" y2="105" stroke="#a78bfa" strokeWidth="0.5" opacity="0.2" />
      </motion.g>

      {/* 태그 1 */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4, type: "spring", stiffness: 400 }}
        viewport={{ once: true }}
        style={{ transformOrigin: "87px 126px" }}
      >
        <rect x="66" y="115" width="42" height="22" rx="11" fill="#a78bfa" opacity="0.15" stroke="#a78bfa" strokeWidth="0.5" />
        <text x="87" y="130" textAnchor="middle" fill="#c084fc" fontSize="9" fontFamily="system-ui">{tags[0]}</text>
      </motion.g>

      {/* 태그 2 */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.6, type: "spring", stiffness: 400 }}
        viewport={{ once: true }}
        style={{ transformOrigin: "139px 126px" }}
      >
        <rect x="114" y="115" width="50" height="22" rx="11" fill="#f472b6" opacity="0.1" stroke="#f472b6" strokeWidth="0.5" />
        <text x="139" y="130" textAnchor="middle" fill="#f9a8d4" fontSize="9" fontFamily="system-ui">{tags[1]}</text>
      </motion.g>

      {/* 태그 3 */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.8, type: "spring", stiffness: 400 }}
        viewport={{ once: true }}
        style={{ transformOrigin: "89px 154px" }}
      >
        <rect x="66" y="143" width="46" height="22" rx="11" fill="#fbbf24" opacity="0.1" stroke="#fbbf24" strokeWidth="0.5" />
        <text x="89" y="158" textAnchor="middle" fill="#fcd34d" fontSize="9" fontFamily="system-ui">{tags[2]}</text>
      </motion.g>

      {/* 태그 4 */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1.0, type: "spring", stiffness: 400 }}
        viewport={{ once: true }}
        style={{ transformOrigin: "144px 154px" }}
      >
        <rect x="118" y="143" width="52" height="22" rx="11" fill="#34d399" opacity="0.1" stroke="#34d399" strokeWidth="0.5" />
        <text x="144" y="158" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontFamily="system-ui">{tags[3]}</text>
      </motion.g>

      {/* 슬라이더 - 채워지는 애니메이션 */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.2 }}
        viewport={{ once: true }}
      >
        <rect x="66" y="178" width="108" height="4" rx="2" fill="#a78bfa" opacity="0.1" />
        <motion.rect
          x="66" y="178" height="4" rx="2" fill="#a78bfa" opacity="0.4"
          initial={{ width: 0 }}
          whileInView={{ width: 75 }}
          transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        <motion.circle
          cy="180" r="5" fill="#c084fc"
          initial={{ cx: 66 }}
          whileInView={{ cx: 141 }}
          transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </motion.g>
    </svg>
  );
}

// 마이 셀러 - 와인병이 하나씩 선반에 놓이는 애니메이션
export function CellarIllust({ className }: { className?: string }) {
  const { lang } = useLanguage();
  const ownedText = lang === "ko" ? "보유 6병" : "Own 6";
  const drankText = lang === "ko" ? "마신 12병" : "Had 12";
  return (
    <svg className={className} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 선반 구조 */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <line x1="40" y1="90" x2="200" y2="90" stroke="#ddd6fe" strokeWidth="1.5" opacity="0.5" />
        <line x1="40" y1="150" x2="200" y2="150" stroke="#ddd6fe" strokeWidth="1.5" opacity="0.5" />
        <line x1="40" y1="210" x2="200" y2="210" stroke="#ddd6fe" strokeWidth="1.5" opacity="0.5" />
      </motion.g>

      {/* 상단 선반 병 1 - 보라 */}
      <motion.g
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
        viewport={{ once: true }}
      >
        <rect x="55" y="55" width="20" height="35" rx="4" fill="#c084fc" opacity="0.6" stroke="#d8b4fe" strokeWidth="1.2" />
        <rect x="60" y="45" width="10" height="12" rx="2" fill="#c084fc" opacity="0.5" />
        <rect x="59" y="65" width="12" height="10" rx="2" fill="#e9d5ff" opacity="0.25" />
      </motion.g>

      {/* 상단 선반 병 2 - 핑크 */}
      <motion.g
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.35, type: "spring", stiffness: 300, damping: 15 }}
        viewport={{ once: true }}
      >
        <rect x="85" y="60" width="20" height="30" rx="4" fill="#f472b6" opacity="0.55" stroke="#f9a8d4" strokeWidth="1.2" />
        <rect x="90" y="50" width="10" height="12" rx="2" fill="#f472b6" opacity="0.45" />
        <rect x="89" y="68" width="12" height="10" rx="2" fill="#fce7f3" opacity="0.2" />
      </motion.g>

      {/* 상단 선반 병 3 - 레드 */}
      <motion.g
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.5, type: "spring", stiffness: 300, damping: 15 }}
        viewport={{ once: true }}
      >
        <rect x="115" y="52" width="20" height="38" rx="4" fill="#fb7185" opacity="0.55" stroke="#fda4af" strokeWidth="1.2" />
        <rect x="120" y="42" width="10" height="12" rx="2" fill="#fb7185" opacity="0.45" />
        <rect x="119" y="62" width="12" height="12" rx="2" fill="#ffe4e6" opacity="0.2" />
      </motion.g>

      {/* 상단 선반 병 4 - 골드 */}
      <motion.g
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.65, type: "spring", stiffness: 300, damping: 15 }}
        viewport={{ once: true }}
      >
        <rect x="145" y="58" width="20" height="32" rx="4" fill="#fbbf24" opacity="0.55" stroke="#fcd34d" strokeWidth="1.2" />
        <rect x="150" y="48" width="10" height="12" rx="2" fill="#fbbf24" opacity="0.45" />
        <rect x="149" y="66" width="12" height="10" rx="2" fill="#fef9c3" opacity="0.25" />
      </motion.g>

      {/* 중간 선반 병 1 - 민트 */}
      <motion.g
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.8, type: "spring", stiffness: 300, damping: 15 }}
        viewport={{ once: true }}
      >
        <rect x="55" y="115" width="20" height="35" rx="4" fill="#34d399" opacity="0.55" stroke="#6ee7b7" strokeWidth="1.2" />
        <rect x="60" y="105" width="10" height="12" rx="2" fill="#34d399" opacity="0.45" />
        <rect x="59" y="125" width="12" height="10" rx="2" fill="#d1fae5" opacity="0.2" />
      </motion.g>

      {/* 중간 선반 병 2 - 라벤더 */}
      <motion.g
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.95, type: "spring", stiffness: 300, damping: 15 }}
        viewport={{ once: true }}
      >
        <rect x="85" y="118" width="20" height="32" rx="4" fill="#a78bfa" opacity="0.55" stroke="#c4b5fd" strokeWidth="1.2" />
        <rect x="90" y="108" width="10" height="12" rx="2" fill="#a78bfa" opacity="0.45" />
        <rect x="89" y="126" width="12" height="10" rx="2" fill="#ede9fe" opacity="0.2" />
      </motion.g>

      {/* + 버튼 - 밝은 펄스 */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.1 }}
        viewport={{ once: true }}
      >
        <rect x="125" y="120" width="30" height="28" rx="8" fill="#c084fc" opacity="0.08" stroke="#d8b4fe" strokeWidth="1.5" strokeDasharray="3 3" />
        <motion.line
          x1="140" y1="128" x2="140" y2="142" stroke="#d8b4fe" strokeWidth="2"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.line
          x1="133" y1="135" x2="147" y2="135" stroke="#d8b4fe" strokeWidth="2"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.g>

      {/* 하단 카운트 - 밝은 배지 */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.3 }}
        viewport={{ once: true }}
      >
        <rect x="55" y="170" width="60" height="24" rx="12" fill="#c084fc" opacity="0.15" stroke="#d8b4fe" strokeWidth="0.8" />
        <text x="85" y="186" textAnchor="middle" fill="#e9d5ff" fontSize="10" fontFamily="system-ui" fontWeight="bold">{ownedText}</text>
        <rect x="122" y="170" width="72" height="24" rx="12" fill="#a78bfa" opacity="0.08" stroke="#c4b5fd" strokeWidth="0.8" />
        <text x="158" y="186" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontFamily="system-ui">{drankText}</text>
      </motion.g>
    </svg>
  );
}
