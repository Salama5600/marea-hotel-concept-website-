import React from 'react';
import { motion } from 'motion/react';
import { Bed, Maximize2, Users } from 'lucide-react';
import { RoomId } from '../types';
import { ROOM_IDS, ROOMS } from '../data/hotelData';
import { useStay } from '../context/StayContext';

interface RoomCardArtworkProps {
  id: RoomId;
}

export const RoomCardArtwork: React.FC<RoomCardArtworkProps> = ({ id }) => {
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden="true">
      <rect width="400" height="260" fill="#F0E8DA" />
      <rect y="200" width="400" height="60" fill="#E3D3BC" />

      {/* Window Aperture */}
      <path
        d={
          id === 'suite'
            ? 'M40 190 V60 h180 v130Z'
            : 'M130 190 V80 A70 60 0 0 1 270 80 V190Z'
        }
        fill={id === 'garden' ? '#9DB48A' : '#7FB8D6'}
      />

      {/* Sea in Window */}
      {id !== 'garden' && (
        <rect
          x={id === 'suite' ? 40 : 130}
          y="140"
          width={id === 'suite' ? 180 : 140}
          height="50"
          fill="#3F8A94"
        />
      )}

      {/* Garden Canopy in Window */}
      {id === 'garden' && <ellipse cx="200" cy="150" rx="50" ry="30" fill="#6F8A55" />}

      {/* Suite Corner Side Window */}
      {id === 'suite' && <path d="M250 60 h110 v130 h-110Z" fill="#7FB8D6" opacity="0.8" />}

      {/* Window Frame */}
      <path
        d={
          id === 'suite'
            ? 'M40 60 v130 M220 60 v130'
            : 'M130 190 V80 A70 60 0 0 1 270 80 V190Z'
        }
        fill="none"
        stroke="#8A5A3B"
        strokeWidth="5"
      />

      {/* Bed Base */}
      <rect x="70" y="200" width="200" height="34" rx="8" fill="#FAF6EF" />
      <rect x="70" y="190" width="200" height="14" rx="6" fill="#5E8C8F" />

      {/* Pillows */}
      <rect x="80" y="180" width="50" height="16" rx="6" fill="#FAF6EF" />
      <rect x="210" y="180" width="50" height="16" rx="6" fill="#FAF6EF" />

      {/* Bedside Nightstand & Lamp */}
      <rect x="290" y="196" width="40" height="38" rx="4" fill="#B8924F" />
      <circle cx="310" cy="176" r="14" fill="#C4694A" opacity="0.85" />

      {/* Suite Bathtub */}
      {id === 'suite' && (
        <rect x="340" y="206" width="50" height="28" rx="12" fill="#FAF6EF" stroke="#E3D3BC" />
      )}
    </svg>
  );
};

export const RoomsSection: React.FC = () => {
  const { setRoom, scrollToSection } = useStay();

  const handlePreview = (id: RoomId) => {
    setRoom(id);
    scrollToSection('view-studio');
  };

  const handleBook = (id: RoomId) => {
    setRoom(id);
    scrollToSection('booking');
  };

  return (
    <section id="rooms" className="section bg-shell">
      <div className="container-m">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <p className="tag mb-4">Rooms</p>
          <h2 className="h-section">Three ways to stay</h2>
        </div>

        {/* 3 Room Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {ROOM_IDS.map((id, index) => {
            const item = ROOMS[id];
            return (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
                className="card-m flex flex-col overflow-hidden transition-[box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(31,58,61,0.16)]"
              >
                {/* Artwork Banner */}
                <div className="aspect-[4/3] bg-sand">
                  <RoomCardArtwork id={id} />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-3xl font-medium text-deep">{item.name}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-ink/80 font-light">{item.desc}</p>

                  {/* Room Specs */}
                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-deep">
                    <li className="flex items-center gap-1.5">
                      <Maximize2 size={16} strokeWidth={1.5} className="text-sea" />
                      {item.size}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Bed size={16} strokeWidth={1.5} className="text-sea" />
                      {item.bed}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Users size={16} strokeWidth={1.5} className="text-sea" />
                      {item.guests}
                    </li>
                  </ul>

                  <p className="mt-3 text-sm text-muted-foreground">{item.extras}</p>

                  <p className="mt-5 font-serif text-2xl text-deep">
                    from <span className="font-semibold">${item.price}</span>{' '}
                    <span className="font-sans text-sm text-muted-foreground font-normal">
                      / night
                    </span>
                  </p>

                  {/* Actions */}
                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-6 border-t border-sand">
                    <button
                      type="button"
                      className="btn btn-secondary cursor-pointer"
                      onClick={() => handlePreview(id)}
                    >
                      Preview this view
                    </button>
                    <button
                      type="button"
                      className="link-u min-h-[44px] text-sm font-semibold text-terracotta cursor-pointer"
                      onClick={() => handleBook(id)}
                    >
                      Book this room
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
