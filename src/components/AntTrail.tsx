import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

// Рабочие на феромонной тропе (пунктир - те же лучи, что на логотипе).
// t - место муравья на тропе в долях её длины, y - небольшой сдвиг вбок,
// seed - несёт зерно: Messor - жнецы, зерно в жвалах их узнаваемый жест.
const WALKERS = [
  { t: 0, y: -2, seed: true },
  { t: 0.08, y: 2, seed: false },
  { t: 0.21, y: -2, seed: false },
  { t: 0.3, y: 1, seed: true },
  { t: 0.46, y: -1, seed: false },
  { t: 0.55, y: 2, seed: true },
  { t: 0.7, y: -2, seed: false },
  { t: 0.84, y: 1, seed: true },
];

// Скорость, а не длительность: тогда на телефоне и на широком экране
// муравьи идут одинаково, а не носятся по узкой тропе.
const SPEED = 30; // px/s
const HEIGHT = 64;
// Ширина до замера: с ней рендерится пререндер и первый проход гидрации.
const DEFAULT_WIDTH = 1440;
// Тропа начинается и кончается за краями, чтобы муравьи входили из-за экрана.
const OVERRUN = 80;

const round = (value: number) => Math.round(value * 10) / 10;

// Тропа петляет: две синусоиды разной длины, чтобы изгиб не выглядел
// механическим. Точки сглаживаются в кубические кривые (Catmull-Rom).
function buildTrail(width: number): { d: string; length: number } {
  const mid = HEIGHT / 2;
  const yAt = (x: number) =>
    mid + 9 * Math.sin((2 * Math.PI * x) / 420) + 3.5 * Math.sin((2 * Math.PI * x) / 160 + 1.3);
  const step = 28;
  const points: [number, number][] = [];
  for (let x = -OVERRUN; x <= width + OVERRUN + step; x += step) points.push([x, yAt(x)]);

  let length = 0;
  let d = `M${round(points[0]![0])} ${round(points[0]![1])}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${round(c1x)} ${round(c1y)} ${round(c2x)} ${round(c2y)} ${round(p2[0])} ${round(p2[1])}`;
    length += Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
  }
  return { d, length };
}

function Ant({ seed }: { seed: boolean }) {
  return (
    <svg className="ant" viewBox="0 0 48 28" aria-hidden="true">
      {/* Две «треноги» лап шагают попеременно, как у настоящего муравья:
          передняя и задняя с одной стороны, средняя - с другой. */}
      <g className="ant__legs-a" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 12.4 31 7.6 35 4.8" />
        <path d="M25 16 25.6 22 23.4 26" />
        <path d="M22.5 12.4 18.5 7 13 4.2" />
      </g>
      <g className="ant__legs-b" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 15.6 31 20.4 35 23.2" />
        <path d="M25 12 25.6 6 23.4 2" />
        <path d="M22.5 15.6 18.5 21 13 23.8" />
      </g>
      <g fill="currentColor">
        {/* брюшко, узелок стебелька, грудь, голова */}
        <path d="M1.5 14C1.5 9.5 5.5 8.2 9.5 8.4 14 8.6 17 11 17 14s-3 5.4-7.5 5.6C5.5 19.8 1.5 18.5 1.5 14Z" />
        <circle cx="19" cy="14" r="1.7" />
        <path d="M20.5 14c0-1.8 2-2.7 4.5-2.6 2.5.1 4.2 1 4.2 2.6s-1.7 2.5-4.2 2.6c-2.5.1-4.5-.8-4.5-2.6Z" />
        <ellipse cx="34" cy="14" rx="4.6" ry="4.2" />
      </g>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M37 10.6 38.5 5.2 44.5 3.6M37 17.4 38.5 22.8 44.5 24.4" strokeWidth="1.3" />
        <path d="M38.2 11.8Q41.2 12.4 41.6 14M38.2 16.2Q41.2 15.6 41.6 14" strokeWidth="1.4" />
      </g>
      {seed && (
        <g className="ant__seed">
          <ellipse cx="43.6" cy="14" rx="4" ry="2.5" />
          <path className="ant__seed-crease" d="M40.8 14h5.6" />
        </g>
      )}
    </svg>
  );
}

export default function AntTrail({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(DEFAULT_WIDTH);

  // Тропа строится под реальную ширину и перестраивается при ресайзе.
  // Вне экрана колонна стоит: анимация дешёвая, но крутить её впустую незачем.
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const measure = () => setWidth(Math.max(1, Math.round(node.getBoundingClientRect().width)));
    measure();
    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    resizeObserver?.observe(node);
    const visibilityObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => node.classList.toggle("is-paused", !entry?.isIntersecting))
        : null;
    visibilityObserver?.observe(node);
    return () => {
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
    };
  }, []);

  const trail = useMemo(() => buildTrail(width), [width]);
  const style = {
    "--trail-path": `path("${trail.d}")`,
    "--dur": `${Math.round(trail.length / SPEED)}s`,
    "--trail-h": `${HEIGHT}px`,
  } as CSSProperties;

  return (
    <div ref={ref} className={`ant-trail${className ? ` ${className}` : ""}`} style={style} aria-hidden="true">
      <svg className="ant-trail__line" width={width} height={HEIGHT} viewBox={`0 0 ${width} ${HEIGHT}`}>
        <path d={trail.d} />
      </svg>
      {WALKERS.map((walker, i) => (
        <span
          key={i}
          className="ant-trail__walker"
          style={{ "--i": i, "--t": walker.t, "--y": `${walker.y}px` } as CSSProperties}
        >
          <Ant seed={walker.seed} />
        </span>
      ))}
    </div>
  );
}
