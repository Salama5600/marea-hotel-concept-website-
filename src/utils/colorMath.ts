import { HourPhase, TimeLabel } from '../types';

export const HOURS: HourPhase[] = [
  { at: 0, name: 'Sunrise', time: '6:00 AM', mood: 'Soft light, salt air, the first coffee on the terrace.' },
  { at: 33, name: 'Midday', time: '12:00 PM', mood: 'Bright and open. Time for the beach and a long lunch.' },
  { at: 66, name: 'Sunset', time: '6:30 PM', mood: 'Everything turns gold. The best seat in the house is by the window.' },
  { at: 100, name: 'Night', time: '10:00 PM', mood: 'The sea goes quiet. Candlelight, a good book, and the sound of waves.' }
];

export function getNearestPhase(time: number): HourPhase {
  return HOURS.reduce((prev, curr) =>
    Math.abs(curr.at - time) < Math.abs(prev.at - time) ? curr : prev
  );
}

export function formatClockTime(time: number): string {
  const table = [
    [0, 360],
    [33, 720],
    [66, 1110],
    [100, 1320]
  ];
  let minutes = 360;
  for (let r = 0; r < table.length - 1; r++) {
    const [startT, startM] = table[r];
    const [endT, endM] = table[r + 1];
    if (time >= startT && time <= endT) {
      minutes = startM + ((time - startT) / (endT - startT)) * (endM - startM);
      break;
    }
  }
  minutes = Math.round(minutes / 15) * 15;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const displayHour = ((hours + 11) % 12) + 1;
  const displayMins = mins.toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  return `${displayHour}:${displayMins} ${ampm}`;
}

export function getTimeLabel(time: number): TimeLabel {
  const phase = getNearestPhase(time);
  const clock = formatClockTime(time);
  return {
    phase: phase.name,
    clock,
    display: `${phase.name} · ${clock}`,
    aria: `${phase.name}, ${clock}`
  };
}

const hexToRgb = (hex: string): number[] => [1, 3, 5].map((idx) => parseInt(hex.slice(idx, idx + 2), 16));

function interpolateHex(hexA: string, hexB: string, factor: number): string {
  const rgbA = hexToRgb(hexA);
  const rgbB = hexToRgb(hexB);
  return (
    '#' +
    rgbA
      .map((val, idx) => Math.round(val + (rgbB[idx] - val) * factor).toString(16).padStart(2, '0'))
      .join('')
  );
}

export function interpolateValue(time: number, stops: [number, any][]): any {
  for (let n = 0; n < stops.length - 1; n++) {
    const [t1, v1] = stops[n];
    const [t2, v2] = stops[n + 1];
    if (time <= t2) {
      const progress = Math.max(0, (time - t1) / (t2 - t1));
      return typeof v1 === 'number' ? v1 + (v2 - v1) * progress : interpolateHex(v1, v2, progress);
    }
  }
  return stops[stops.length - 1][1];
}

const X_STOPS = [0, 33, 66, 100];
const makeStops = (colors: any[]): [number, any][] => X_STOPS.map((t, n) => [t, colors[n]]);

export interface SkyColors {
  sky1: string;
  sky2: string;
  sky3: string;
  sea: string;
  seaDeep: string;
  land: string;
  wall: string;
  wood: string;
  sunGlow: string;
  stage: string;
  glow: number;
  sunR: number;
  sunOpacity: number;
  moonOpacity: number;
  reflectWarm: number;
}

export function calculateColors(time: number): SkyColors {
  return {
    sky1: interpolateValue(time, makeStops(['#F6B98E', '#7FB8D6', '#E5806A', '#0F1E2E'])),
    sky2: interpolateValue(time, makeStops(['#FBE3C4', '#A9D0E3', '#F2B38A', '#18304A'])),
    sky3: interpolateValue(time, makeStops(['#FAF1DD', '#CFE6EF', '#6C5B8C', '#1F3A55'])),
    sea: interpolateValue(time, makeStops(['#8FB5B0', '#3F8A94', '#4E6F83', '#16303F'])),
    seaDeep: interpolateValue(time, makeStops(['#6E9C99', '#2D6F7A', '#3A566A', '#0E2230'])),
    land: interpolateValue(time, makeStops(['#7D8F63', '#6F8A55', '#5D6448', '#1E2A26'])),
    wall: interpolateValue(time, makeStops(['#E8D6BF', '#F1E7D6', '#D7B193', '#2A2A33'])),
    wood: interpolateValue(time, makeStops(['#8A5A3B', '#94653F', '#7A4A31', '#3E2A22'])),
    sunGlow: interpolateValue(time, makeStops(['#FFB070', '#FFF3C4', '#FF9A5A', '#FF9A5A'])),
    stage: interpolateValue(time, makeStops(['#2A4446', '#1F3A3D', '#2E3540', '#0F1E22'])),
    glow: interpolateValue(time, makeStops([0.35, 0.05, 0.38, 0.62])),
    sunR: interpolateValue(time, makeStops([42, 30, 44, 44])),
    sunOpacity: interpolateValue(time, [[0, 1], [66, 1], [80, 0], [100, 0]]),
    moonOpacity: interpolateValue(time, [[0, 0], [74, 0], [92, 1], [100, 1]]),
    reflectWarm: interpolateValue(time, [[0, 0.35], [33, 0.1], [66, 0.75], [80, 0], [100, 0]])
  };
}
