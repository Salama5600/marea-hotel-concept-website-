import React, { useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useStay } from '../../context/StayContext';
import { HOURS } from '../../utils/colorMath';

export const TimeSlider: React.FC = () => {
  const { time, setTime, label } = useStay();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const animationRef = useRef<number | null>(null);

  const stopAnimation = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const animateTo = (target: number) => {
    stopAnimation();
    const start = time;
    const duration = 600; // ms
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeInOutCubic
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setTime(start + (target - start) * eased);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(step);
  };

  const updateFromPointer = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const newTime = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setTime(newTime);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    stopAnimation();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updateFromPointer(e.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={`mx-auto w-full max-w-[880px] ${isDragging ? 'select-none' : ''}`}>
      {/* Time title */}
      <p className="mb-6 text-center font-serif text-3xl text-shell md:text-4xl" aria-live="polite">
        {label.phase}{' '}
        <span className="text-brass">·</span>{' '}
        <span className="italic">{label.clock}</span>
      </p>

      {/* Slider Track Container */}
      <div className="px-3" style={{ touchAction: 'pan-y' }}>
        <div
          ref={trackRef}
          className="slider-track relative h-2.5 cursor-pointer rounded-full"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Thumb */}
          <div
            role="slider"
            tabIndex={0}
            aria-label="Time of day"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(time)}
            aria-valuetext={label.aria}
            onKeyDown={(e) => {
              stopAnimation();
              const steps: Record<string, number> = {
                ArrowLeft: -2,
                ArrowDown: -2,
                ArrowRight: 2,
                ArrowUp: 2
              };
              if (e.key in steps) {
                e.preventDefault();
                setTime((prev) => Math.max(0, Math.min(100, prev + steps[e.key])));
              } else if (e.key === 'Home') {
                e.preventDefault();
                setTime(0);
              } else if (e.key === 'End') {
                e.preventDefault();
                setTime(100);
              }
            }}
            className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center focus:outline-none"
            style={{ left: `${time}%` }}
          >
            <span
              className={`grid h-7 w-7 place-items-center rounded-full bg-terracotta text-shell shadow-lg ring-4 ring-shell/25 transition-transform ${
                isDragging ? 'scale-125' : ''
              }`}
            >
              {time > 80 ? (
                <Moon size={14} strokeWidth={1.5} />
              ) : (
                <Sun size={14} strokeWidth={1.5} />
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Jump Buttons */}
      <div className="relative mt-4 h-11">
        {HOURS.map((phase) => (
          <button
            key={phase.name}
            type="button"
            onClick={() => animateTo(phase.at)}
            className="absolute -translate-x-1/2 px-1 text-xs uppercase tracking-[0.14em] text-shell/70 transition-colors hover:text-shell min-h-[44px] sm:text-[13px] cursor-pointer"
            style={{ left: `calc(${phase.at}% * 0.94 + 3%)` }}
          >
            <span className="mx-auto mb-1 block h-2 w-px bg-shell/40" />
            {phase.name}
          </button>
        ))}
      </div>
    </div>
  );
};
