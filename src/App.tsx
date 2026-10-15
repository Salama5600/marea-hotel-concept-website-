/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StayProvider } from './context/StayContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ViewStudio } from './components/ViewStudio/ViewStudio';
import { RoomsSection } from './components/RoomsSection';
import { DaySection } from './components/DaySection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <StayProvider>
      <div className="min-h-screen bg-shell text-ink flex flex-col font-sans selection:bg-terracotta/20 selection:text-terracotta">
        <Header />
        <main className="flex-1">
          <Hero />
          <ViewStudio />
          <RoomsSection />
          <DaySection />
          <AmenitiesSection />
          <TestimonialsSection />
          <FaqSection />
          <BookingSection />
        </main>
        <Footer />
      </div>
    </StayProvider>
  );
}
