import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { RoomId } from '../../types';
import { ROOM_IDS, ROOMS } from '../../data/hotelData';
import { useStay } from '../../context/StayContext';

interface ThumbnailProps {
  room: RoomId;
}

export const RoomThumbnail: React.FC<ThumbnailProps> = ({ room }) => {
  return (
    <svg viewBox="0 0 120 70" className="h-full w-full" aria-hidden="true">
      <rect width="120" height="70" fill="#CFE6EF" />
      <circle cx="88" cy="20" r="8" fill="#FFE3A6" />

      {room === 'garden' && (
        <>
          <rect y="40" width="120" height="8" fill="#5E8C8F" />
          <path d="M0 46 Q60 38 120 46 V70 H0Z" fill="#7D8F63" />
          <rect x="30" y="28" width="3" height="24" fill="#8A5A3B" />
          <ellipse cx="32" cy="26" rx="16" ry="10" fill="#6F8A55" />
          {[70, 76, 82, 88, 94].map((x) => (
            <ellipse key={x} cx={x} cy="50" rx="1.6" ry="4" fill="#9A88B8" />
          ))}
        </>
      )}

      {room === 'sea' && (
        <>
          <rect y="34" width="120" height="36" fill="#3F8A94" />
          <path d="M46 44 h16 l-2 3 h-12z M54 43 V30 L62 43Z" fill="#FAF6EF" />
          <rect x="98" y="24" width="3" height="10" fill="#FAF6EF" />
        </>
      )}

      {room === 'suite' && (
        <>
          <rect y="30" width="120" height="40" fill="#3F8A94" />
          {[8, 16, 22, 30, 38].map((x, t) => (
            <rect key={x} x={x} y={24 - (t % 3) * 4} width="6" height={6 + (t % 3) * 4} fill="#6F8A55" />
          ))}
          <rect y="50" width="120" height="20" fill="#E3D3BC" />
          <rect y="46" width="120" height="2" fill="#8A5A3B" />
          <ellipse cx="60" cy="58" rx="8" ry="2" fill="#8A5A3B" />
        </>
      )}
    </svg>
  );
};

export const RoomPicker: React.FC = () => {
  const { room, setRoom } = useStay();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const delta =
      e.key === 'ArrowRight' || e.key === 'ArrowDown'
        ? 1
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
        ? -1
        : 0;
    if (!delta) return;
    e.preventDefault();
    const nextIndex = (index + delta + 3) % 3;
    setRoom(ROOM_IDS[nextIndex]);
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Choose a room"
      className="mx-auto grid max-w-[880px] gap-4 sm:grid-cols-3"
    >
      {ROOM_IDS.map((id, index) => {
        const item = ROOMS[id];
        const isSelected = room === id;

        return (
          <motion.button
            key={id}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`${item.name}, from $${item.price} per night`}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => setRoom(id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            animate={{ scale: isSelected ? 1.03 : 1 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-4 rounded-2xl border p-3 text-left transition-colors cursor-pointer sm:flex-col sm:items-stretch ${
              isSelected
                ? 'border-terracotta bg-shell/10 ring-2 ring-terracotta shadow-md'
                : 'border-shell/15 bg-shell/5 hover:bg-shell/10'
            }`}
          >
            <span className="block h-16 w-24 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-full">
              <RoomThumbnail room={id} />
            </span>
            <span className="block">
              <span className="block font-serif text-xl text-shell">{item.name}</span>
              <span className="block text-sm leading-snug text-shell/70">{item.line}</span>
              <span className="mt-1 block text-sm font-semibold text-brass">
                from ${item.price} / night
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};
