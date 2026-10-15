import React from 'react';

interface BrandLogoProps {
  light?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ light = false, className = '' }) => {
  return (
    <span className={`flex items-center gap-2.5 ${light ? 'text-shell' : 'text-deep'} ${className}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
        <path
          d="M3 17c3-3 5-3 8 0s5 3 8 0 5-3 10 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M3 23c3-3 5-3 8 0s5 3 8 0 5-3 10 0"
          fill="none"
          stroke="var(--terracotta)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="21" cy="9" r="3" fill="var(--brass)" />
      </svg>
      <span className="flex items-baseline gap-2">
        <span className="font-serif text-[28px] font-semibold leading-none tracking-normal">Marea</span>
        <span className="hidden text-[10px] uppercase tracking-[0.22em] opacity-80 sm:inline">
          Boutique Hotel
        </span>
      </span>
    </span>
  );
};
