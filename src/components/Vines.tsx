import { type SVGProps } from "react";

/**
 * Decorative botanical SVGs — vines, leaves, sprigs.
 * All use currentColor so they inherit from text-* classes.
 */

export function VineCurl(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 360" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M30 10 C 60 80, 20 140, 90 180 C 160 220, 100 290, 160 350"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      {/* leaves along the vine */}
      <g fill="currentColor" opacity="0.9">
        <ellipse cx="48" cy="55" rx="14" ry="6" transform="rotate(-35 48 55)" />
        <ellipse cx="38" cy="105" rx="16" ry="7" transform="rotate(20 38 105)" />
        <ellipse cx="70" cy="160" rx="18" ry="7" transform="rotate(-15 70 160)" />
        <ellipse cx="125" cy="195" rx="20" ry="8" transform="rotate(25 125 195)" />
        <ellipse cx="135" cy="245" rx="16" ry="7" transform="rotate(-30 135 245)" />
        <ellipse cx="118" cy="295" rx="18" ry="7" transform="rotate(15 118 295)" />
        <ellipse cx="155" cy="335" rx="14" ry="6" transform="rotate(-20 155 335)" />
      </g>
      {/* tiny berries */}
      <g fill="currentColor" opacity="0.6">
        <circle cx="92" cy="180" r="2.5" />
        <circle cx="98" cy="186" r="2" />
        <circle cx="160" cy="220" r="2.5" />
      </g>
    </svg>
  );
}

export function LeafSprig(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M90 10 C 90 90, 90 160, 90 215" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <g fill="currentColor">
        <path d="M90 40 C 60 35, 40 50, 35 70 C 60 72, 82 60, 90 45 Z" opacity="0.9" />
        <path d="M90 60 C 120 55, 140 70, 145 90 C 120 92, 98 80, 90 65 Z" opacity="0.85" />
        <path d="M90 95 C 58 90, 36 105, 30 128 C 58 130, 84 118, 90 100 Z" opacity="0.9" />
        <path d="M90 120 C 122 115, 146 130, 152 152 C 122 154, 98 142, 90 125 Z" opacity="0.85" />
        <path d="M90 155 C 62 152, 44 166, 40 184 C 64 186, 86 174, 90 158 Z" opacity="0.9" />
      </g>
    </svg>
  );
}

export function FernArc(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 140 C 90 20, 310 20, 390 140" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.8" />
      <g fill="currentColor" opacity="0.85">
        {Array.from({ length: 14 }).map((_, i) => {
          const t = i / 13;
          const x = 10 + t * 380;
          const y = 140 - Math.sin(t * Math.PI) * 120;
          const rot = -60 + t * 120;
          return (
            <ellipse
              key={i}
              cx={x}
              cy={y - 10}
              rx={12}
              ry={4.5}
              transform={`rotate(${rot} ${x} ${y - 10})`}
            />
          );
        })}
      </g>
    </svg>
  );
}

export function CornerVine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5 5 C 60 20, 110 60, 130 120 C 145 165, 180 195, 215 215"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.85"
      />
      <g fill="currentColor" opacity="0.9">
        <ellipse cx="40" cy="22" rx="14" ry="5" transform="rotate(20 40 22)" />
        <ellipse cx="75" cy="42" rx="16" ry="6" transform="rotate(-15 75 42)" />
        <ellipse cx="108" cy="78" rx="18" ry="6.5" transform="rotate(35 108 78)" />
        <ellipse cx="132" cy="125" rx="18" ry="6.5" transform="rotate(-20 132 125)" />
        <ellipse cx="158" cy="170" rx="16" ry="6" transform="rotate(40 158 170)" />
        <ellipse cx="195" cy="200" rx="13" ry="5" transform="rotate(-10 195 200)" />
      </g>
    </svg>
  );
}

export function SmallSprig(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M40 5 C 40 60, 40 90, 40 115" stroke="currentColor" strokeWidth="1.2" />
      <g fill="currentColor">
        <ellipse cx="40" cy="25" rx="14" ry="5" transform="rotate(-30 40 25)" />
        <ellipse cx="40" cy="50" rx="16" ry="5.5" transform="rotate(30 40 50)" />
        <ellipse cx="40" cy="75" rx="14" ry="5" transform="rotate(-25 40 75)" />
        <ellipse cx="40" cy="98" rx="11" ry="4" transform="rotate(20 40 98)" />
      </g>
    </svg>
  );
}
