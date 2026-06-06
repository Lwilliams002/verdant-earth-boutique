import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, type PointerEvent } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

/**
 * Hero product render with:
 *  - pointer-driven 3D tilt (rotateX/Y + slight translateZ for depth)
 *  - continuous idle float (drift Y + gentle sway X + micro-roll)
 *  - scroll-linked parallax (rises slightly as you scroll the hero)
 *  - soft ground shadow that scales/blurs in sync with the float
 *  - device tilt on touch devices (gyroscope) as a fallback for "no hover"
 *  - respects prefers-reduced-motion
 */
export function FloatingBottle({ src, alt, className, priority }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  // Pointer position, normalized -0.5..0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  // 3D rotation — stronger on Y (looks like it's turning toward you)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [14, -14]), {
    stiffness: 90,
    damping: 16,
    mass: 0.6,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-18, 18]), {
    stiffness: 90,
    damping: 16,
    mass: 0.6,
  });
  // Small parallax translate so the bottle "follows" the cursor a touch
  const tx = useSpring(useTransform(px, [-0.5, 0.5], [-22, 22]), {
    stiffness: 70,
    damping: 20,
  });
  const ty = useSpring(useTransform(py, [-0.5, 0.5], [-16, 16]), {
    stiffness: 70,
    damping: 20,
  });

  // Scroll parallax — bottle rises slightly as the hero scrolls past
  const { scrollY } = useScroll();
  const scrollLift = useTransform(scrollY, [0, 600], [0, -60]);
  const scrollLiftSpring = useSpring(scrollLift, { stiffness: 60, damping: 18 });

  // Shadow reacts to vertical float — bigger/softer when bottle "rises"
  const shadowScale = useTransform(ty, [-16, 16], [0.85, 1.1]);
  const shadowOpacity = useTransform(ty, [-16, 16], [0.18, 0.32]);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onPointerLeave() {
    px.set(0);
    py.set(0);
  }

  // Device orientation (mobile) — only attach for touch / no-hover devices
  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (canHover) return;

    function onOrient(e: DeviceOrientationEvent) {
      // gamma: left/right tilt (-90..90), beta: front/back (-180..180)
      const g = (e.gamma ?? 0) / 45; // ~-1..1
      const b = ((e.beta ?? 0) - 45) / 90; // recenter around "phone held up"
      px.set(Math.max(-0.5, Math.min(0.5, g * 0.5)));
      py.set(Math.max(-0.5, Math.min(0.5, b * 0.5)));
    }
    window.addEventListener("deviceorientation", onOrient);
    return () => window.removeEventListener("deviceorientation", onOrient);
  }, [px, py, reduce]);

  return (
    <div
      ref={wrapRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={className}
      style={{ perspective: 1600, perspectiveOrigin: "50% 40%" }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ y: scrollLiftSpring, transformStyle: "preserve-3d" }}
      >
        {/* Idle float wrapper — continuous, multi-axis */}
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -14, 0, -8, 0],
                  x: [0, 4, 0, -4, 0],
                  rotate: [0, 0.6, 0, -0.6, 0],
                }
          }
          transition={{
            duration: 9,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {/* Pointer-driven 3D layer */}
          <motion.div
            className="relative h-full w-full will-change-transform"
            style={{
              rotateX,
              rotateY,
              x: tx,
              y: ty,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Subtle highlight sheen that shifts with rotation */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[40%] mix-blend-screen"
              style={{
                background:
                  "radial-gradient(60% 40% at 35% 25%, rgba(255,255,255,0.35), transparent 60%)",
                translateZ: 40,
              }}
            />
            <img
              src={src}
              alt={alt}
              width={1024}
              height={1536}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              className="bottle-shadow relative h-full w-full select-none object-contain"
              style={{ transform: "translateZ(60px)" }}
            />
          </motion.div>

          {/* Ground shadow — separate so it doesn't tilt with the bottle */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-[4%] mx-auto h-10 w-[55%] rounded-[50%] bg-forest-deep blur-2xl"
            style={{
              scale: shadowScale,
              opacity: shadowOpacity,
              transform: "translateZ(-40px)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
