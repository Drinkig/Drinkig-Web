// 모션 프리셋. 두 종류만 둔다.
//  - 등장: 글은 떠오르고(rise), 사진은 블러가 걷힌다(resolve). 한 번만.
//  - 살아있음: 목업·캐릭터는 천천히 떠다닌다(float). 시스템이 동작 줄이기를 켜면 MotionConfig가 끈다.
export const EASE = [0.2, 0, 0, 1] as const;

/** 글 블록 진입: 12px 아래에서 떠오름 */
export const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.55, ease: EASE, delay },
});

/** 사진 진입: 블러가 걷히며 또렷해짐 (Cabine의 render reveal) */
export const resolve = (delay = 0) => ({
  initial: { opacity: 0, y: 10, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: EASE, delay },
});

/** 첫 화면 전용: 스크롤 없이 바로 재생 */
export const riseNow = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: EASE, delay },
});

/** 제목을 단어 단위로 차례로 띄울 때 쓰는 부모/자식 variants */
export const wordsParent = (delay = 0) => ({
  initial: "hidden",
  animate: "show",
  variants: { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } },
});
export const wordChild = {
  variants: {
    hidden: { opacity: 0, y: "0.5em" },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  },
};

/** 천천히 떠다님. amplitude는 px, 주기는 초. */
export const float = (amplitude = 8, duration = 6, delay = 0) => ({
  animate: { y: [0, -amplitude, 0] },
  transition: { duration, ease: "easeInOut" as const, repeat: Infinity, delay },
});
