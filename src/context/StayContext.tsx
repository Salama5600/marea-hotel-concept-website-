import React, { createContext, useContext, useMemo, useState } from 'react';
import { RoomId, TimeLabel } from '../types';
import { getTimeLabel } from '../utils/colorMath';

interface StayContextType {
  room: RoomId;
  setRoom: (room: RoomId) => void;
  time: number;
  setTime: (time: number | ((prev: number) => number)) => void;
  label: TimeLabel;
  scrollToSection: (id: string) => void;
}

const StayContext = createContext<StayContextType | null>(null);

export const StayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [room, setRoom] = useState<RoomId>('sea');
  const [time, setTime] = useState<number>(0);

  const label = useMemo(() => getTimeLabel(time), [time]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <StayContext.Provider
      value={{
        room,
        setRoom,
        time,
        setTime,
        label,
        scrollToSection
      }}
    >
      {children}
    </StayContext.Provider>
  );
};

export function useStay(): StayContextType {
  const ctx = useContext(StayContext);
  if (!ctx) {
    throw new Error('useStay must be used within a StayProvider');
  }
  return ctx;
}
