import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/hotelData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="section bg-sand" aria-labelledby="t-h">
      <div className="container-m">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <p className="tag mb-4">Guests say</p>
          <h2 id="t-h" className="h-section">Notes from past guests</h2>
        </div>

        {/* 3 Review Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeOut' }}
              className="card-m flex flex-col bg-shell p-8 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <span className="font-serif text-7xl leading-[0.6] text-brass select-none" aria-hidden="true">
                “
              </span>
              <blockquote className="mt-4 font-serif text-2xl leading-snug text-deep font-normal">
                {item.quote}
              </blockquote>

              <div className="mt-6 flex gap-1 text-brass" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} strokeWidth={1.5} fill="currentColor" />
                ))}
              </div>

              <div className="mt-auto flex items-center gap-3 pt-6 border-t border-sand">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-sea text-sm font-semibold text-shell shrink-0">
                  {item.initials}
                </span>
                <span>
                  <span className="block font-semibold text-deep">{item.name}</span>
                  <span className="block text-sm text-muted-foreground">{item.type}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          Demo testimonials for a portfolio project.
        </p>
      </div>
    </section>
  );
};
