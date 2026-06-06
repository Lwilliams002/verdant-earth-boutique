import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function FloatingBottle({ src, alt, className, priority }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 18 });
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 80, damping: 20 });
  const ty = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), { stiffness: 80, damping: 20 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ perspective: 1400 }}
    >
      <motion.div
        className="animate-float"
        style={{ rotateX: rx, rotateY: ry, x: tx, y: ty, transformStyle: "preserve-3d" }}
      >
        <img
          src={src}
          alt={alt}
          width={1024}
          height={1536}
          loading={priority ? "eager" : "lazy"}
          className="bottle-shadow h-full w-full select-none object-contain"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
