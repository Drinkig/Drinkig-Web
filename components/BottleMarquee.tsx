import { MARQUEE_WINES } from "../data/wines";

// 와인병 카드가 옆으로 흘러가는 띠. 카드 안에는 병 사진만 둔다(이름·지역은 alt로만).
// 사진은 DB에 있는 실제 와인(흰 배경 제거). 트랙을 두 벌 이어 붙이고 -50%까지 밀면 끊김 없이 돈다.
// 이미지는 지연 로딩하지 않는다: transform으로 움직이는 트랙 안에서는 두 번째 벌이 늦게 떠서 빈 칸이 보인다.
export function BottleMarquee({ className = "" }: { className?: string }) {
  const strip = (ariaHidden: boolean) => (
    <ul className="flex shrink-0 gap-4 pr-4 md:gap-5 md:pr-5" aria-hidden={ariaHidden || undefined}>
      {MARQUEE_WINES.map((wine) => (
        <li
          key={wine.id}
          className="flex h-52 w-36 shrink-0 items-end justify-center rounded-2xl border border-white/[0.07] bg-white/[0.05] px-5 pb-6 pt-5 md:h-64 md:w-44"
        >
          <img
            src={`/images/wines/${wine.id}.webp`}
            alt={ariaHidden ? "" : wine.nameEng}
            height={480}
            decoding="async"
            className="max-h-full w-auto drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)]"
          />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${className}`} role="presentation">
      <div className="marquee-track">
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );
}
