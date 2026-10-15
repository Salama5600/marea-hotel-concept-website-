import React from 'react';
import { BrandLogo } from './BrandLogo';
import { useStay } from '../context/StayContext';

export const Footer: React.FC = () => {
  const { scrollToSection } = useStay();

  return (
    <footer className="bg-deeper text-shell">
      <div className="container-m grid gap-12 py-16 md:grid-cols-3">
        {/* Brand Column */}
        <div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer text-left"
          >
            <BrandLogo light={true} />
          </button>
          <p className="mt-5 max-w-xs font-serif text-xl italic text-shell/75 leading-relaxed">
            A small hotel on the Mediterranean, where every hour has its own light.
          </p>
        </div>

        {/* Explore Links */}
        <nav aria-label="Footer">
          <p className="tag mb-4 !text-brass">Explore</p>
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('view-studio')}
                className="link-u inline-flex min-h-[44px] items-center text-shell/85 cursor-pointer"
              >
                Choose Your Hour
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('rooms')}
                className="link-u inline-flex min-h-[44px] items-center text-shell/85 cursor-pointer"
              >
                Rooms
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('day')}
                className="link-u inline-flex min-h-[44px] items-center text-shell/85 cursor-pointer"
              >
                Dining &amp; Experiences
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('day')}
                className="link-u inline-flex min-h-[44px] items-center text-shell/85 cursor-pointer"
              >
                A Day at Marea
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('faq')}
                className="link-u inline-flex min-h-[44px] items-center text-shell/85 cursor-pointer"
              >
                FAQ
              </button>
            </li>
          </ul>
        </nav>

        {/* Contact Information */}
        <div>
          <p className="tag mb-4 !text-brass">Contact</p>
          <ul className="space-y-2 text-shell/85 font-light text-[15px]">
            <li>Corniche Road, Alexandria, Egypt</li>
            <li>Reception: 24 hours</li>
            <li>
              <a href="tel:+201000000000" className="link-u">
                +20 100 000 0000
              </a>
            </li>
            <li>
              <a href="mailto:stay@marea-hotel.example" className="link-u">
                stay@marea-hotel.example
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-shell/10">
        <div className="container-m flex flex-col gap-1 py-6 text-sm text-shell/60 md:flex-row md:justify-between">
          <p>© 2026 Marea Boutique Hotel. All rights reserved.</p>
          <p className="text-shell/45">This is a demo website for portfolio purposes.</p>
        </div>
      </div>
    </footer>
  );
};
