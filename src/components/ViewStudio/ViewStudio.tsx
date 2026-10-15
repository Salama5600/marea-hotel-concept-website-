import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { useStay } from '../../context/StayContext';
import { calculateColors, getNearestPhase } from '../../utils/colorMath';
import { WindowIllustration } from './WindowIllustration';
import { TimeSlider } from './TimeSlider';
import { RoomPicker } from './RoomPicker';

export const ViewStudio: React.FC = () => {
  const { room, time, scrollToSection } = useStay();
  const currentPhase = getNearestPhase(time);
  const colors = calculateColors(time);

  return (
    <section
      id="view-studio"
      className="section relative overflow-hidden md:!py-36 text-shell"
      style={{
        backgroundColor: colors.stage,
        transition: 'background-color 400ms linear'
      }}
    >
      <div className="container-m">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-18">
          <p className="tag mb-4 !text-brass">The View Studio</p>
          <h2 className="h-section !text-shell">Choose your hour.</h2>
          <p className="mx-auto mt-5 max-w-[620px] text-shell/75 leading-relaxed">
            Pick a room, then drag the sun across the day. See how the light changes in the room and
            what the window looks out on. It is an illustration, but it is how we think about every
            stay.
          </p>
        </div>

        {/* Window Stage */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="mx-auto aspect-[16/10] w-full max-w-[880px] overflow-hidden rounded-3xl shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] ring-1 ring-shell/10">
            <WindowIllustration room={room} time={time} />
          </div>

          {/* Dynamic Mood Quote */}
          <div className="mx-auto mt-6 flex min-h-[3.5rem] max-w-xl items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPhase.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-serif text-xl italic text-shell/85 md:text-2xl"
              >
                “{currentPhase.mood}”
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Time Slider */}
        <div className="mt-10">
          <TimeSlider />
        </div>

        {/* Room Picker */}
        <div className="mt-12">
          <RoomPicker />
        </div>

        {/* CTA to Booking */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <button
            type="button"
            onClick={() => scrollToSection('booking')}
            className="btn btn-accent cursor-pointer shadow-xl flex items-center gap-2"
          >
            <Calendar size={18} strokeWidth={1.5} />
            Book this room at this hour
          </button>
          <p className="text-sm text-shell/55">
            Illustration for atmosphere only. Actual views vary by room and season.
          </p>
        </div>
      </div>
    </section>
  );
};
