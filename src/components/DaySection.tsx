import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Moon, Sun, Sunset, Utensils } from 'lucide-react';
import { TIMELINE } from '../data/hotelData';

const ICONS: Record<string, React.FC<{ size?: number; strokeWidth?: number; className?: string }>> = {
  coffee: Coffee,
  sun: Sun,
  utensils: Utensils,
  sunset: Sunset,
  moon: Moon
};

export const DaySection: React.FC = () => {
  return (
    <section id="day" className="section bg-sand">
      <div className="container-m">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <p className="tag mb-4">A Day at Marea</p>
          <h2 className="h-section">How a day here unfolds</h2>
        </div>

        {/* Timeline Container */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical Brass Connecting Line */}
          <motion.div
            className="absolute left-[22px] top-0 h-full w-px origin-top bg-brass md:left-1/2"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          <ol className="space-y-12 md:space-y-16">
            {TIMELINE.map((item, idx) => {
              const isEven = idx % 2 === 1;
              const IconComp = ICONS[item.iconName] || Sun;

              return (
                <li key={item.time} className="relative pl-16 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                  {/* Timeline Badge */}
                  <span className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full border border-brass bg-shell text-deep md:left-1/2 md:-translate-x-1/2 shadow-xs">
                    <IconComp size={20} strokeWidth={1.5} />
                  </span>

                  {/* Content Box */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                    className={`${isEven ? 'md:col-start-2' : 'md:text-right'}`}
                  >
                    <p className="text-sm font-semibold tracking-[0.12em] text-terracotta">{item.time}</p>
                    <h3 className="mt-1 font-serif text-3xl text-deep">{item.title}</h3>
                    <p className="mt-2 text-ink/80 leading-relaxed font-light">{item.description}</p>
                  </motion.div>
                </li>
              );
            })}
          </ol>

          {/* Poetic Closing Quote */}
          <p className="mt-20 text-center font-serif text-2xl italic text-sea">
            Every hour has its own light here.
          </p>
        </div>
      </div>
    </section>
  );
};
