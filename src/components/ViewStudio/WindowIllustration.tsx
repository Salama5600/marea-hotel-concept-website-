import React, { useId } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { RoomId } from '../../types';
import { calculateColors, SkyColors } from '../../utils/colorMath';

interface WindowIllustrationProps {
  room: RoomId;
  time: number;
}

const WINDOW_CLIP_PATH = 'M170 505 V260 A330 220 0 0 1 830 260 V505 Z';
const COLOR_TRANSITION = {
  transition: 'fill 300ms linear, stop-color 300ms linear, opacity 300ms linear'
};

const STARS_COORDS = [
  [240, 120],
  [320, 80],
  [420, 150],
  [560, 90],
  [610, 190],
  [760, 110],
  [800, 220],
  [290, 210],
  [470, 70],
  [700, 60]
];

const SKYLINE_BUILDINGS = [
  [180, 26, 40],
  [210, 18, 28],
  [232, 30, 55],
  [266, 20, 34],
  [290, 24, 46],
  [318, 34, 26],
  [356, 16, 40],
  [376, 28, 60],
  [408, 22, 30],
  [434, 30, 44]
];

const NIGHT_WINDOWS = [
  [188, 340],
  [240, 320],
  [300, 330],
  [384, 315],
  [420, 345],
  [442, 335]
];

const OLIVE_TREE_ELLIPSES = [
  [260, 300, 70],
  [330, 270, 80],
  [400, 300, 66],
  [300, 345, 54],
  [380, 345, 56]
];

interface SeaProps {
  y: number;
  colors: SkyColors;
  sunX: number;
  time: number;
  prefix: string;
}

const SeaHorizon: React.FC<SeaProps> = ({ y, colors, sunX, time, prefix }) => {
  return (
    <g>
      <rect x="0" y={y} width="1000" height={625 - y} fill={`url(#${prefix}seaGrad)`} />
      {/* Sun shimmer on water */}
      {[0, 1, 2, 3, 4].map((r) => (
        <rect
          key={r}
          x={sunX - 70 + r * 8}
          y={y + 10 + r * 18}
          width={140 - r * 16}
          height="3"
          rx="1.5"
          fill="#FFC27A"
          opacity={colors.reflectWarm * (1 - r * 0.15)}
        />
      ))}
      {/* Moon shimmer on water */}
      {[0, 1, 2, 3].map((n) => (
        <rect
          key={`m${n}`}
          x={650 + n * 8}
          y={y + 12 + n * 16}
          width={80 - n * 16}
          height="2.5"
          rx="1"
          fill="#E8EEF2"
          opacity={colors.moonOpacity * 0.7 * (1 - n * 0.18)}
        />
      ))}
      {/* Wave ripples */}
      <path
        d={`M0 ${y + 40} q60 -6 120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0`}
        stroke="#fff"
        strokeOpacity={time > 80 ? 0.06 : 0.15}
        fill="none"
        className="anim-waves"
      />
    </g>
  );
};

export const WindowIllustration: React.FC<WindowIllustrationProps> = ({ room, time }) => {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const prefix = `w${rawId}`;
  const colors = calculateColors(time);

  // Solar trajectory math
  const progress = Math.min(time / 72, 1.05);
  const sunX = 200 + 600 * progress;
  const sunY =
    420 -
    Math.sin(Math.PI * (0.08 + 0.84 * Math.min(progress, 1))) * 300 +
    Math.max(0, progress - 0.92) * 900;

  const isDark = colors.moonOpacity > 0.3 || time < 8;

  return (
    <svg
      viewBox="0 0 1000 625"
      className="block h-full w-full"
      role="img"
      aria-label={`Illustrated window view of ${room} room at ${time}% of day`}
    >
      <defs>
        <linearGradient id={`${prefix}skyGrad`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: colors.sky3, ...COLOR_TRANSITION }} />
          <stop offset="0.55" style={{ stopColor: colors.sky2, ...COLOR_TRANSITION }} />
          <stop offset="1" style={{ stopColor: colors.sky1, ...COLOR_TRANSITION }} />
        </linearGradient>

        <linearGradient id={`${prefix}seaGrad`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: colors.sea, ...COLOR_TRANSITION }} />
          <stop offset="1" style={{ stopColor: colors.seaDeep, ...COLOR_TRANSITION }} />
        </linearGradient>

        <radialGradient id={`${prefix}sunGlow`}>
          <stop offset="0" stopColor={colors.sunGlow} stopOpacity="0.8" />
          <stop offset="1" stopColor={colors.sunGlow} stopOpacity="0" />
        </radialGradient>

        <radialGradient id={`${prefix}roomGlow`} cx="0.5" cy="1" r="0.9">
          <stop offset="0" stopColor="#FFB45C" stopOpacity="1" />
          <stop offset="0.6" stopColor="#FFB45C" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FFB45C" stopOpacity="0" />
        </radialGradient>

        <clipPath id={`${prefix}winClip`}>
          <path d={WINDOW_CLIP_PATH} />
        </clipPath>
      </defs>

      {/* Clipped Window Scene */}
      <g clipPath={`url(#${prefix}winClip)`}>
        {/* Sky Background */}
        <rect width="1000" height="625" fill={`url(#${prefix}skyGrad)`} />

        {/* Night Sky: Stars and Crescent Moon */}
        <g opacity={colors.moonOpacity} style={COLOR_TRANSITION}>
          {STARS_COORDS.map(([cx, cy], idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={idx % 3 === 0 ? 2.4 : 1.6}
              fill="#FAF6EF"
            />
          ))}
          {/* Moon Glow */}
          <circle cx="690" cy="150" r="60" fill="#E8EEF2" opacity="0.12" />
          <circle cx="690" cy="150" r="30" fill="#EEF0EA" />
          <circle cx="702" cy="142" r="27" fill="#18304A" opacity="0.9" />
        </g>

        {/* Sun */}
        <g opacity={colors.sunOpacity}>
          <circle cx={sunX} cy={sunY} r={colors.sunR * 3} fill={`url(#${prefix}sunGlow)`} />
          <circle
            cx={sunX}
            cy={sunY}
            r={colors.sunR}
            fill={time > 20 && time < 45 ? '#FFF6D8' : '#FFD08A'}
          />
        </g>

        {/* Drifting Clouds */}
        <g fill="#FFFFFF" opacity={time > 80 ? 0.08 : 0.55}>
          <g className="anim-drift">
            <ellipse cx="330" cy="150" rx="70" ry="16" />
            <ellipse cx="370" cy="138" rx="40" ry="16" />
          </g>
          <g className="anim-drift-slow">
            <ellipse cx="640" cy="230" rx="90" ry="14" />
            <ellipse cx="610" cy="220" rx="40" ry="14" />
          </g>
        </g>

        {/* Room Specific Landscape with AnimatePresence */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.g
            key={room}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {room === 'garden' ? (
              <g>
                <SeaHorizon y={430} colors={colors} sunX={sunX} time={time} prefix={prefix} />
                {/* Dunes */}
                <path
                  d="M0 470 Q250 430 500 455 T1000 445 V625 H0Z"
                  fill={colors.land}
                  style={COLOR_TRANSITION}
                />
                <path
                  d="M0 520 Q300 490 600 510 T1000 500 V625 H0Z"
                  fill={colors.land}
                  opacity="0.85"
                  style={{ ...COLOR_TRANSITION, filter: 'brightness(0.85)' }}
                />
                {/* Olive Tree Trunk */}
                <rect
                  x="318"
                  y="330"
                  width="16"
                  height="190"
                  rx="6"
                  fill={colors.wood}
                  style={COLOR_TRANSITION}
                />
                <path
                  d="M326 400 q30 -40 70 -50 M326 380 q-30 -30 -70 -34"
                  stroke={colors.wood}
                  strokeWidth="7"
                  fill="none"
                />
                {/* Olive Canopy */}
                {OLIVE_TREE_ELLIPSES.map(([cx, cy, r], i) => (
                  <ellipse
                    key={i}
                    cx={cx}
                    cy={cy}
                    rx={r}
                    ry={r * 0.62}
                    fill={colors.land}
                    style={{ ...COLOR_TRANSITION, filter: `brightness(${0.95 + i * 0.05})` }}
                  />
                ))}
                {/* Lavender Sprigs */}
                {Array.from({ length: 22 }).map((_, n) => {
                  const x = 520 + n * 14;
                  const h = 40 + ((n * 37) % 30);
                  return (
                    <g key={n}>
                      <line x1={x} y1="520" x2={x + 4} y2={520 - h} stroke={colors.land} strokeWidth="3" />
                      <ellipse
                        cx={x + 4}
                        cy={520 - h}
                        rx="4"
                        ry="10"
                        fill={time > 80 ? '#4A4766' : '#9A88B8'}
                      />
                    </g>
                  );
                })}
              </g>
            ) : room === 'sea' ? (
              <g>
                <SeaHorizon y={380} colors={colors} sunX={sunX} time={time} prefix={prefix} />
                {/* Lighthouse on Rocks */}
                <path
                  d="M700 382 Q760 362 830 370 L860 382Z"
                  fill={colors.land}
                  style={COLOR_TRANSITION}
                />
                <rect x="760" y="318" width="12" height="52" fill={time > 80 ? '#c8c4bb' : '#F5EFE4'} />
                <rect x="760" y="332" width="12" height="7" fill="#C4694A" />
                <rect x="758" y="312" width="16" height="8" fill="#3a3a3a" />
                {/* Lighthouse Lantern Beacon */}
                <circle
                  cx="766"
                  cy="316"
                  r={isDark ? 10 : 3}
                  fill="#FFE08A"
                  opacity={isDark ? 0.9 : 0.5}
                />

                {/* Sailboat drifting */}
                <g className="anim-drift-slow">
                  <path d="M420 410 h70 l-10 12 h-50z" fill={colors.wood} />
                  <path d="M455 408 V340 L490 404Z" fill="#FAF6EF" opacity="0.95" />
                  <path d="M452 404 V352 L425 404Z" fill="#F0E8DA" opacity="0.9" />
                </g>
              </g>
            ) : (
              /* Signature Suite: Terrace and Alexandria Skyline */
              <g>
                <SeaHorizon y={360} colors={colors} sunX={sunX} time={time} prefix={prefix} />
                {/* Skyline Buildings */}
                <g fill={colors.land} style={COLOR_TRANSITION} opacity="0.9">
                  {SKYLINE_BUILDINGS.map(([bx, bw, bh], idx) => (
                    <rect key={idx} x={bx} y={362 - bh} width={bw} height={bh} />
                  ))}
                </g>
                {/* Glowing windows at dusk/night */}
                {time > 70 &&
                  NIGHT_WINDOWS.map(([wx, wy], idx) => (
                    <rect
                      key={idx}
                      x={wx}
                      y={wy}
                      width="4"
                      height="4"
                      fill="#FFD27A"
                      opacity={colors.moonOpacity}
                    />
                  ))}
                {/* Terrace Wall and Balustrade */}
                <path
                  d="M0 470 H1000 V625 H0Z"
                  fill={colors.wall}
                  style={{ ...COLOR_TRANSITION, filter: 'brightness(0.82)' }}
                />
                <rect x="0" y="420" width="1000" height="6" fill={colors.wood} />
                {Array.from({ length: 26 }).map((_, n) => (
                  <rect key={n} x={n * 40} y="424" width="3" height="50" fill={colors.wood} />
                ))}
                {/* Balcony Table & Chairs */}
                <ellipse cx="500" cy="500" rx="46" ry="10" fill={colors.wood} />
                <rect x="497" y="500" width="6" height="40" fill={colors.wood} />
                {[400, 600].map((chairX) => (
                  <g
                    key={chairX}
                    fill="none"
                    stroke={colors.wood}
                    strokeWidth="5"
                    strokeLinecap="round"
                  >
                    <path
                      d={`M${chairX - 20} 505 h40 M${chairX - 18} 505 v40 M${chairX + 18} 505 v40 M${
                        chairX + (chairX < 500 ? -20 : 20)
                      } 505 v-40`}
                    />
                  </g>
                ))}
              </g>
            )}
          </motion.g>
        </AnimatePresence>
      </g>

      {/* Architectural Window Frame & Wall (cutout) */}
      <path
        d={`M0 0H1000V625H0Z ${WINDOW_CLIP_PATH}`}
        fillRule="evenodd"
        fill={colors.wall}
        style={COLOR_TRANSITION}
      />
      {/* Arch Border and Mullions */}
      <path
        d={WINDOW_CLIP_PATH}
        fill="none"
        stroke={colors.wood}
        strokeWidth="16"
        style={COLOR_TRANSITION}
      />
      <line x1="500" y1="42" x2="500" y2="505" stroke={colors.wood} strokeWidth="7" />
      <line x1="170" y1="300" x2="830" y2="300" stroke={colors.wood} strokeWidth="5" />

      {/* Windowsill */}
      <rect
        x="140"
        y="505"
        width="720"
        height="22"
        rx="4"
        fill={colors.wood}
        style={COLOR_TRANSITION}
      />

      {/* Terracotta Vase with Eucalyptus on Sill */}
      <path d="M248 505 q-16 -28 0 -54 h22 q16 26 0 54z" fill="#C4694A" />
      <path
        d="M259 452 q-8 -40 -24 -60 M259 452 q6 -44 26 -58 M259 452 v-66"
        stroke="#5E8C8F"
        strokeWidth="3"
        fill="none"
      />

      {/* Brass and Leather Books on Sill */}
      <rect x="680" y="490" width="96" height="15" rx="2" fill="#1F3A3D" />
      <rect x="690" y="478" width="80" height="12" rx="2" fill="#B8924F" />

      {/* Curtains draping on left and right */}
      <path
        d="M0 0 H150 Q120 160 150 320 Q170 470 120 625 H0Z"
        fill="#F3E9DA"
        opacity="0.92"
      />
      <path
        d="M40 0 Q70 300 30 625 M95 0 Q120 300 80 625"
        stroke="#D9C8AE"
        strokeWidth="3"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M1000 0 H850 Q880 160 850 320 Q830 470 880 625 H1000Z"
        fill="#F3E9DA"
        opacity="0.92"
      />
      <path
        d="M960 0 Q930 300 970 625 M905 0 Q880 300 920 625"
        stroke="#D9C8AE"
        strokeWidth="3"
        fill="none"
        opacity="0.6"
      />

      {/* Warm Ambient Glow Overlay */}
      <rect
        width="1000"
        height="625"
        fill={`url(#${prefix}roomGlow)`}
        opacity={colors.glow}
        style={{ mixBlendMode: 'soft-light', ...COLOR_TRANSITION }}
        pointerEvents="none"
      />
      <rect
        width="1000"
        height="625"
        fill={`url(#${prefix}roomGlow)`}
        opacity={colors.glow * 0.35}
        style={COLOR_TRANSITION}
        pointerEvents="none"
      />
    </svg>
  );
};
