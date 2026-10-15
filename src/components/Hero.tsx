import React from 'react';
import { motion } from 'motion/react';
import { useStay } from '../context/StayContext';

const WINDOW_COORDS = [
  [1140, 500],
  [1170, 500],
  [1140, 550],
  [1300, 490],
  [1330, 540],
  [1240, 470],
  [1270, 520],
  [1210, 560]
];

export const Hero: React.FC = () => {
  const { scrollToSection } = useStay();

  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden bg-deep">
      {/* Background Animated Dawn SVG */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E99A78" />
            <stop offset="0.45" stopColor="#F6C49A" />
            <stop offset="0.75" stopColor="#FBE3C4" />
            <stop offset="1" stopColor="#FAF6EF" />
          </linearGradient>
          <radialGradient id="hSun">
            <stop offset="0" stopColor="#FFE6B5" />
            <stop offset="0.35" stopColor="#FFC98A" stopOpacity="0.7" />
            <stop offset="1" stopColor="#FFC98A" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1440" height="900" fill="url(#hSky)" />

        {/* Rising Sun */}
        <motion.g
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
        >
          <circle cx="980" cy="600" r="300" fill="url(#hSun)" />
          <circle cx="980" cy="600" r="92" fill="#FFE2B0" />
        </motion.g>

        {/* Citadel / Historic Alexandria Skyline Silhouette */}
        <g fill="#2A4446">
          <path d="M1120 640 V470 h70 v-30 h110 v30 h60 V640Z" />
          <rect x="1210" y="410" width="50" height="30" />
          {WINDOW_COORDS.map(([x, y], idx) => (
            <rect
              key={idx}
              x={x}
              y={y}
              width="14"
              height="20"
              rx="7"
              fill={idx % 3 === 0 ? '#FFD27A' : '#3A5658'}
            />
          ))}
        </g>

        {/* Rolling Mediterranean Waves */}
        <g className="anim-waves-slow">
          <path
            d="M-60 650 Q120 620 300 650 T660 650 T1020 650 T1380 650 T1740 650 V900 H-60Z"
            fill="#8FB5B0"
          />
        </g>
        <g className="anim-waves">
          <path
            d="M-60 710 Q140 680 340 710 T740 710 T1140 710 T1540 710 V900 H-60Z"
            fill="#5E8C8F"
          />
        </g>
        <g className="anim-waves-slow">
          <path
            d="M-60 780 Q160 750 380 780 T820 780 T1260 780 T1700 780 V900 H-60Z"
            fill="#1F3A3D"
          />
        </g>
      </svg>

      {/* Lighting overlay scrims */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-deep/75 via-deep/35 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deep/70 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div className="container-m relative flex w-full flex-1 flex-col justify-center pt-28 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-2xl text-shell"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/90">
            24 rooms · Alexandria, Egypt
          </p>
          <h1 className="h-hero mt-6 font-serif tracking-tight text-shell">
            Wake up to the sea, <br />
            <em className="font-normal italic">at the hour you love.</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-shell/85 md:text-xl font-light">
            Marea is a small hotel on the Mediterranean where every room has its own light. Slide
            through the day, choose your moment, then come stay with us.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('view-studio')}
              className="btn btn-accent shadow-lg cursor-pointer"
            >
              Choose Your Hour
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('booking')}
              className="btn btn-ghost-light cursor-pointer"
            >
              Book Your Stay
            </button>
          </div>

          {/* Trust Highlights */}
          <ul className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-shell/80">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" />
              Private beach access
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" />
              Breakfast on the terrace
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" />
              Open all year
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-70">
        <div className="h-9 w-5 rounded-full border border-shell/30 p-1 flex justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-shell/80 anim-scrolldot" />
        </div>
      </div>
    </section>
  );
};
