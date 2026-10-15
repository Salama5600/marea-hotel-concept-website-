import React, { useState } from 'react';
import { Calendar, CheckCircle2, MessageCircle, Moon, Sun } from 'lucide-react';
import { RoomId } from '../types';
import { ROOM_IDS, ROOMS } from '../data/hotelData';
import { useStay } from '../context/StayContext';

export const BookingSection: React.FC = () => {
  const { room, setRoom, time, label, scrollToSection } = useStay();

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate nights
  let nights = 0;
  if (checkIn && checkOut) {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = d2.getTime() - d1.getTime();
    nights = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }

  const roomPrice = ROOMS[room].price;
  const estimatedTotal = nights * roomPrice;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!checkIn || !checkOut || nights <= 0) {
      errs.dates = 'Please select valid check-in and check-out dates.';
    }
    if (!name.trim()) {
      errs.name = 'Please enter your full name.';
    }
    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Please enter a valid email address.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
  };

  return (
    <section id="booking" className="section relative overflow-hidden bg-deep text-shell">
      {/* Background Decorative Pattern */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="wavesP" width="120" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20 q30 -14 60 0 t60 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wavesP)" />
      </svg>

      <div className="container-m relative grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20 items-start">
        {/* Left Column: Info & WhatsApp */}
        <div>
          <p className="tag mb-4 !text-brass">Booking</p>
          <h2 className="h-section !text-shell">
            Ready to choose <em className="font-normal italic">your hour?</em>
          </h2>
          <p className="mt-6 max-w-md text-shell/80 leading-relaxed font-light">
            Send us your dates and we will confirm availability within 24 hours. No payment is taken
            online.
          </p>

          <a
            href="https://wa.me/201000000000"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost-light mt-8 inline-flex items-center gap-2"
          >
            <MessageCircle size={18} strokeWidth={1.5} />
            Message us on WhatsApp
          </a>

          <ul className="mt-12 space-y-4 text-shell/85 text-sm font-light">
            <li className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-brass mt-1.5 shrink-0" />
              <span>Free cancellation up to 7 days before arrival.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-brass mt-1.5 shrink-0" />
              <span>No payment needed now. Pay at reception.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-brass mt-1.5 shrink-0" />
              <span>Breakfast on the terrace included with every stay.</span>
            </li>
          </ul>
        </div>

        {/* Right Column: Interactive Booking Card */}
        <div className="card-m bg-shell p-6 text-deep md:p-10 shadow-2xl border border-sand">
          {submitted ? (
            <div className="text-center py-10">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sea/15 text-sea mb-6">
                <CheckCircle2 size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-3xl font-medium text-deep">Request Received</h3>
              <p className="mt-3 text-ink/80 leading-relaxed font-light max-w-sm mx-auto">
                Thank you, {name}. We have reserved your preference for the{' '}
                <strong>{ROOMS[room].name}</strong> at <strong>{label.display}</strong>.
                Our team will confirm your stay via email within 24 hours.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary mt-8 cursor-pointer"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Check In */}
                <div>
                  <label htmlFor="checkIn" className="mb-1.5 block text-sm font-semibold text-deep">
                    Check-in date
                  </label>
                  <div className="relative">
                    <input
                      id="checkIn"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="h-12 w-full rounded-xl border border-input bg-white px-4 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-terracotta"
                    />
                  </div>
                </div>

                {/* Check Out */}
                <div>
                  <label htmlFor="checkOut" className="mb-1.5 block text-sm font-semibold text-deep">
                    Check-out date
                  </label>
                  <div className="relative">
                    <input
                      id="checkOut"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="h-12 w-full rounded-xl border border-input bg-white px-4 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-terracotta"
                    />
                  </div>
                </div>

                {errors.dates && (
                  <p className="sm:col-span-2 text-sm text-destructive" role="alert">
                    {errors.dates}
                  </p>
                )}

                {/* Guests */}
                <div>
                  <label htmlFor="guests" className="mb-1.5 block text-sm font-semibold text-deep">
                    Guests
                  </label>
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="h-12 w-full rounded-xl border border-input bg-white px-4 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-terracotta"
                  >
                    <option value="1">1 guest</option>
                    <option value="2">2 guests</option>
                    <option value="3">3 guests</option>
                    <option value="4">4 guests</option>
                  </select>
                </div>

                {/* Room */}
                <div>
                  <label htmlFor="roomSelect" className="mb-1.5 block text-sm font-semibold text-deep">
                    Room
                  </label>
                  <select
                    id="roomSelect"
                    value={room}
                    onChange={(e) => setRoom(e.target.value as RoomId)}
                    className="h-12 w-full rounded-xl border border-input bg-white px-4 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-terracotta"
                  >
                    {ROOM_IDS.map((id) => (
                      <option key={id} value={id}>
                        {ROOMS[id].name} · ${ROOMS[id].price}/night
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Hour Box */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-deep">
                    Preferred hour
                  </label>
                  <div className="flex items-center justify-between gap-3 rounded-xl bg-sand px-4 py-2 border border-input/40">
                    <span className="flex items-center gap-2 font-serif text-xl text-deep">
                      {time > 80 ? (
                        <Moon size={18} strokeWidth={1.5} className="text-sea" />
                      ) : (
                        <Sun size={18} strokeWidth={1.5} className="text-terracotta" />
                      )}
                      {label.display}
                    </span>
                    <button
                      type="button"
                      onClick={() => scrollToSection('view-studio')}
                      className="link-u min-h-[44px] text-sm font-semibold text-terracotta cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-deep">
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Yasmin Mansour"
                    className="h-12 w-full rounded-xl border border-input bg-white px-4 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-terracotta"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-deep">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yasmin@example.com"
                    className="h-12 w-full rounded-xl border border-input bg-white px-4 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-terracotta"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-deep">
                    Phone or WhatsApp{' '}
                    <span className="font-normal text-muted-foreground text-xs">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+20 1..."
                    className="h-12 w-full rounded-xl border border-input bg-white px-4 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-terracotta"
                  />
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold text-deep">
                    Special requests{' '}
                    <span className="font-normal text-muted-foreground text-xs">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Celebrating something? Need a late check-in?"
                    className="w-full rounded-xl border border-input bg-white p-4 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-terracotta resize-none"
                  />
                </div>
              </div>

              {/* Estimated Total Calculation */}
              <div className="mt-6 rounded-xl border border-sand bg-white p-4" aria-live="polite">
                <p className="text-deep font-medium">
                  Estimated total:{' '}
                  {nights > 0 ? (
                    <span className="font-semibold">
                      {nights} {nights === 1 ? 'night' : 'nights'} × ${roomPrice} ={' '}
                      <span className="font-serif text-2xl text-terracotta font-semibold">
                        ${estimatedTotal.toLocaleString('en-US')}
                      </span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground font-normal">
                      choose dates to see estimate
                    </span>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Estimate only. Final price confirmed by email.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-accent mt-6 w-full justify-center text-base cursor-pointer shadow-md"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-shell border-t-transparent rounded-full animate-spin" />
                    Sending…
                  </span>
                ) : (
                  'Send Booking Request'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
