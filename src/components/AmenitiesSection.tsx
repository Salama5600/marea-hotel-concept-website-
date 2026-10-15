import React from 'react';
import { motion } from 'motion/react';
import {
  Car,
  Clock,
  Dog,
  Plane,
  Umbrella,
  UtensilsCrossed,
  Wifi,
  Wind
} from 'lucide-react';
import { AMENITIES } from '../data/hotelData';

const AMENITY_ICONS: Record<
  string,
  React.FC<{ size?: number; strokeWidth?: number; className?: string }>
> = {
  wifi: Wifi,
  umbrella: Umbrella,
  utensils: UtensilsCrossed,
  car: Car,
  wind: Wind,
  clock: Clock,
  plane: Plane,
  paw: Dog
};

export const AmenitiesSection: React.FC = () => {
  return (
    <section id="amenities" className="section bg-shell">
      <div className="container-m">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <p className="tag mb-4">Good to know</p>
          <h2 className="h-section">Small details, done well</h2>
        </div>

        {/* 8 Amenities Grid */}
        <ul className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
          {AMENITIES.map((item, idx) => {
            const IconComp = AMENITY_ICONS[item.iconName] || Wifi;
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.1, ease: 'easeOut' }}
                className="text-center group"
              >
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sand text-deep transition-transform duration-300 group-hover:scale-105 shadow-xs">
                  <IconComp size={22} strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 font-serif text-2xl text-deep">{item.title}</h3>
                <p className="mt-1 text-[16px] leading-snug text-ink/75 font-light">
                  {item.description}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
