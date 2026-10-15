import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { FAQS } from '../data/hotelData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section bg-shell">
      <div className="container-m">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <p className="tag mb-4">FAQ</p>
          <h2 className="h-section">Before you book</h2>
        </div>

        {/* Accordion Container */}
        <div className="mx-auto max-w-[760px]">
          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="card-m overflow-hidden border border-sand">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggleIndex(index)}
                      className="group flex min-h-[64px] w-full items-center justify-between gap-4 px-6 py-4 text-left font-serif text-xl text-deep md:text-2xl cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <Plus
                        size={20}
                        strokeWidth={1.5}
                        className={`shrink-0 text-terracotta transition-transform duration-300 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-ink/80 leading-relaxed font-light border-t border-sand/40 pt-2">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
