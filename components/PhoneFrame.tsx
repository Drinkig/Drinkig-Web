import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { EASE } from "../lib/motion";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// 파스텔 워시 프레임 안의 폰.
//  - 스크롤하면 폰과 워시가 서로 반대 방향으로 조금씩 밀린다(패럴랙스).
//  - 마우스를 올리면 폰이 커서 쪽으로 살짝 기운다.
//  - 처음 보일 때는 블러가 걷히며 나타난다.
export function PhoneFrame({ src, alt, width, height }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [48, -48]);
  const washY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 120, damping: 18 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltY.set(px * 10);
    tiltX.set(-py * 8);
  };
  const onLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-paper-deep [perspective:1200px]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div className="wash-frame absolute -inset-[8%]" style={{ y: washY }} aria-hidden="true" />
      <motion.div
        className="absolute left-1/2 top-[7%] w-[68%]"
        style={{ x: "-50%", y: phoneY, rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="block w-full"
          initial={{ opacity: 0, y: 14, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        />
      </motion.div>
    </div>
  );
}
