import type { ReactNode } from "react";
import type { ImageKind, Motif } from "@/content/types";

/**
 * Generated placeholder artwork used until real photography is supplied
 * (§5.5 photography direction: origin/landscape, product macro,
 * factory/industrial, human/farmer). Colours are restricted to the token
 * palette. Output is deterministic per `seed` so SSR and client match.
 */

const C = {
  forest900: "#102A24",
  forest700: "#163F35",
  green: "#3F725D",
  gold: "#D4A53A",
  ivory: "#F7F5EF",
  sand: "#E9E3D5",
  sage: "#66756E",
  border: "#D8DED9",
  clay: "#A9493D",
};

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 400;
const H = 300;
const f = (n: number) => n.toFixed(1);

function ridge(r: () => number, base: number, amp: number, step = 50) {
  const pts: [number, number][] = [];
  const phase = r() * Math.PI * 2;
  for (let x = -40; x <= W + 40; x += step) {
    pts.push([x, base + Math.sin(x / 90 + phase) * amp + (r() - 0.5) * amp * 0.8]);
  }
  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q ${f(pts[i][0])} ${f(pts[i][1])} ${f(mx)} ${f(my)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${f(last[0])} ${f(last[1])} L ${W + 40} ${H + 10} L -40 ${H + 10} Z`;
  return d;
}

function Origin({ r, id }: { r: () => number; id: string }) {
  const sunX = 60 + r() * 280;
  const layers = [
    { base: 120 + r() * 20, amp: 18, fill: C.sage, op: 0.45 },
    { base: 160 + r() * 20, amp: 22, fill: C.green, op: 0.7 },
    { base: 200 + r() * 20, amp: 20, fill: C.forest700, op: 1 },
    { base: 245 + r() * 15, amp: 14, fill: C.forest900, op: 1 },
  ];
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.ivory} />
          <stop offset="1" stopColor={C.sand} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      <circle cx={sunX} cy={70 + r() * 20} r={30} fill={C.gold} opacity={0.35} />
      {layers.map((l, i) => (
        <path key={i} d={ridge(r, l.base, l.amp)} fill={l.fill} opacity={l.op} />
      ))}
      {/* crop rows / terraces */}
      {Array.from({ length: 7 }).map((_, i) => (
        <path
          key={`row${i}`}
          d={ridge(r, 214 + i * 12, 6, 80).split(" L ")[0]}
          fill="none"
          stroke={C.ivory}
          strokeOpacity={0.12}
          strokeWidth={2}
        />
      ))}
    </>
  );
}

function Macro({ r, motif, id }: { r: () => number; motif: Motif; id: string }) {
  const cfg: Record<Motif, { bg: string; fills: string[]; size: number }> = {
    bean: { bg: C.forest900, fills: [C.green, C.sage, C.sand], size: 1 },
    cherry: { bg: C.forest700, fills: [C.clay, C.gold, C.clay], size: 1 },
    grain: { bg: C.forest900, fills: [C.ivory, C.sand, C.border], size: 1 },
    kernel: { bg: C.forest700, fills: [C.ivory, C.sand, C.border], size: 1 },
    peppercorn: { bg: C.sand, fills: [C.forest900, C.forest700, C.sage], size: 1 },
    fruit: { bg: C.ivory, fills: [C.clay, C.gold, C.green], size: 1 },
    stick: { bg: C.sand, fills: [C.clay, C.gold, C.forest700], size: 1 },
    star: { bg: C.forest900, fills: [C.clay, C.gold, C.forest700], size: 1 },
    leaf: { bg: C.ivory, fills: [C.green, C.forest700], size: 1 },
  };
  const { bg, fills } = cfg[motif];
  const items: ReactNode[] = [];
  const spacing = motif === "fruit" ? 110 : motif === "stick" ? 70 : motif === "peppercorn" ? 22 : motif === "grain" ? 26 : 38;
  let k = 0;
  for (let y = -20; y < H + 40; y += spacing * 0.8) {
    for (let x = -20; x < W + 40; x += spacing) {
      const cx = x + (r() - 0.5) * spacing * 0.7;
      const cy = y + (r() - 0.5) * spacing * 0.7;
      const rot = r() * 180;
      const fill = fills[Math.floor(r() * fills.length)];
      const key = k++;
      const t = `translate(${f(cx)} ${f(cy)}) rotate(${f(rot)})`;
      switch (motif) {
        case "bean":
          items.push(
            <g key={key} transform={t}>
              <ellipse rx={17} ry={12} fill={fill} />
              <path d="M -13 0 Q 0 4 13 0" stroke={C.forest900} strokeOpacity={0.55} strokeWidth={2} fill="none" />
            </g>,
          );
          break;
        case "cherry":
          items.push(
            <g key={key} transform={t}>
              <circle r={13} fill={fill} />
              <circle r={4} cx={-4} cy={-4} fill={C.ivory} opacity={0.25} />
            </g>,
          );
          break;
        case "grain":
          items.push(<ellipse key={key} transform={t} rx={13} ry={3.6} fill={fill} />);
          break;
        case "kernel":
          items.push(
            <path key={key} transform={t} d="M -16 -4 C -14 -16 14 -16 16 -4 C 12 -9 -12 -9 -8 4 C -12 2 -16 0 -16 -4 Z" fill={fill} />,
          );
          break;
        case "peppercorn":
          items.push(
            <g key={key} transform={t}>
              <circle r={7.5} fill={fill} />
              <circle r={2.2} cx={-2.5} cy={-2.5} fill={C.ivory} opacity={0.18} />
            </g>,
          );
          break;
        case "fruit":
          items.push(
            <g key={key} transform={t}>
              <ellipse rx={46} ry={38} fill={fill} opacity={0.9} />
              <path d="M -10 -38 Q 0 -60 14 -44" stroke={C.green} strokeWidth={6} fill="none" strokeLinecap="round" />
            </g>,
          );
          break;
        case "stick":
          items.push(
            <g key={key} transform={t}>
              <rect x={-60} y={-8} width={120} height={16} rx={7} fill={fill} />
              <rect x={-60} y={-2} width={120} height={3} fill={C.forest900} opacity={0.2} />
            </g>,
          );
          break;
        case "star": {
          let d = "";
          for (let i = 0; i < 16; i++) {
            const rad = i % 2 === 0 ? 18 : 6;
            const a = (Math.PI * 2 * i) / 16;
            d += `${i === 0 ? "M" : "L"} ${f(Math.cos(a) * rad)} ${f(Math.sin(a) * rad)} `;
          }
          items.push(<path key={key} transform={t} d={d + "Z"} fill={fill} />);
          break;
        }
        case "leaf":
          items.push(<path key={key} transform={t} d="M -20 0 Q 0 -14 20 0 Q 0 14 -20 0 Z" fill={fill} />);
          break;
      }
    }
  }
  return (
    <>
      <rect width={W} height={H} fill={bg} />
      {items}
      <rect width={W} height={H} fill={`url(#${id}-v)`} />
    </>
  );
}

function Factory({ r }: { r: () => number }) {
  const machines = Array.from({ length: 5 }).map((_, i) => ({
    x: 20 + i * 78 + r() * 10,
    h: 60 + r() * 60,
    w: 50 + r() * 16,
  }));
  return (
    <>
      <rect width={W} height={H} fill={C.sand} />
      <rect width={W} height={110} fill={C.ivory} />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={10 + i * 50} y={18} width={34} height={46} fill={C.border} />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <g key={`l${i}`}>
          <line x1={60 + i * 95} y1={0} x2={60 + i * 95} y2={90} stroke={C.forest900} strokeOpacity={0.3} />
          <circle cx={60 + i * 95} cy={94} r={6} fill={C.gold} opacity={0.8} />
        </g>
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`f${i}`} x1={200} y1={170} x2={-200 + i * 160} y2={H} stroke={C.forest900} strokeOpacity={0.08} />
      ))}
      {machines.map((m, i) => (
        <g key={`m${i}`}>
          <rect x={m.x} y={210 - m.h} width={m.w} height={m.h} fill={i % 2 ? C.forest700 : C.green} rx={3} />
          <rect x={m.x + 8} y={220 - m.h} width={m.w - 16} height={10} fill={C.ivory} opacity={0.25} />
          <circle cx={m.x + m.w - 12} cy={200 - m.h + 30} r={4} fill={C.gold} />
        </g>
      ))}
      <rect x={0} y={210} width={W} height={12} fill={C.forest900} />
      {Array.from({ length: 20 }).map((_, i) => (
        <circle key={`r${i}`} cx={10 + i * 21} cy={216} r={3} fill={C.sage} />
      ))}
    </>
  );
}

function Logistics({ r }: { r: () => number }) {
  const colors = [C.forest700, C.green, C.gold, C.sage, C.clay];
  const stacks: ReactNode[] = [];
  for (let col = 0; col < 7; col++) {
    const height = 2 + Math.floor(r() * 3);
    for (let row = 0; row < height; row++) {
      stacks.push(
        <g key={`${col}-${row}`}>
          <rect x={20 + col * 54} y={214 - (row + 1) * 26} width={50} height={24} fill={colors[Math.floor(r() * colors.length)]} />
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1={26 + col * 54 + i * 7} y1={216 - (row + 1) * 26} x2={26 + col * 54 + i * 7} y2={236 - (row + 1) * 26} stroke={C.forest900} strokeOpacity={0.25} />
          ))}
        </g>,
      );
    }
  }
  return (
    <>
      <rect width={W} height={H} fill={C.ivory} />
      <rect y={214} width={W} height={H} fill={C.forest700} />
      <rect y={238} width={W} height={H} fill={C.forest900} />
      <path d="M 300 214 L 300 40 L 380 40 M 300 60 L 360 60 M 320 40 L 320 214" stroke={C.forest900} strokeWidth={5} fill="none" />
      <line x1={360} y1={40} x2={360} y2={120} stroke={C.forest900} strokeWidth={1.5} />
      {stacks}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={`w${i}`} x1={20 + i * 80} y1={252 + (i % 2) * 14} x2={70 + i * 80} y2={252 + (i % 2) * 14} stroke={C.ivory} strokeOpacity={0.2} strokeWidth={2} />
      ))}
    </>
  );
}

function Human({ r, id }: { r: () => number; id: string }) {
  const x = 150 + r() * 100;
  return (
    <>
      <Origin r={r} id={id} />
      <g transform={`translate(${f(x)} 150)`}>
        <ellipse cx={0} cy={2} rx={17} ry={5} fill={C.forest900} />
        <circle cx={0} cy={10} r={13} fill={C.forest900} />
        <path d="M -26 150 L -30 60 Q -30 28 0 26 Q 30 28 30 60 L 26 150 Z" fill={C.forest900} />
        <path d="M 22 50 Q 50 70 46 100" stroke={C.forest900} strokeWidth={11} strokeLinecap="round" fill="none" />
        <ellipse cx={52} cy={110} rx={22} ry={14} fill={C.gold} opacity={0.9} />
      </g>
    </>
  );
}

export function PlaceholderArt({ kind, motif, seed }: { kind: ImageKind; motif?: Motif; seed: string }) {
  const r = rng(hash(seed));
  const id = `ph${hash(seed).toString(36)}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden focusable="false">
      <defs>
        <radialGradient id={`${id}-v`} cx="50%" cy="45%" r="75%">
          <stop offset="0.55" stopColor="#102A24" stopOpacity="0" />
          <stop offset="1" stopColor="#102A24" stopOpacity="0.45" />
        </radialGradient>
      </defs>
      {kind === "origin" && <Origin r={r} id={id} />}
      {kind === "product" && <Macro r={r} motif={motif ?? "bean"} id={id} />}
      {kind === "factory" && <Factory r={r} />}
      {kind === "logistics" && <Logistics r={r} />}
      {kind === "human" && <Human r={r} id={id} />}
    </svg>
  );
}
