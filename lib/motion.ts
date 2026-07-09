// 스크롤 진입 애니메이션 공통 프리셋.
// duration/easing/viewport 값이 섹션마다 흩어지지 않도록 여기서만 관리한다.

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
  viewport: { once: true, amount: 0.2 },
});

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
  viewport: { once: true, amount: 0.2 },
});

export const slideIn = (fromLeft: boolean) => ({
  initial: { opacity: 0, x: fromLeft ? -40 : 40 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
  viewport: { once: true, amount: 0.3 },
});
