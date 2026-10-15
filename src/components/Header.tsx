import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStay } from '../context/StayContext';

interface NavItem {
  label: string;
  targetId: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Choose Your Hour', targetId: 'view-studio' },
  { label: 'Rooms', targetId: 'rooms' },
  { label: 'Dining & Experiences', targetId: 'day' },
  { label: 'A Day at Marea', targetId: 'day' },
  { label: 'FAQ', targetId: 'faq' }
];

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>('top');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollToSection } = useStay();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    const sectionIds = ['top', 'view-studio', 'rooms', 'day', 'amenities', 'faq', 'booking'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (targetId: string) => {
    setMobileMenuOpen(false);
    scrollToSection(targetId);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-sand bg-shell/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="container-m flex h-[72px] items-center justify-between gap-4" aria-label="Main">
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer text-left"
            aria-label="Marea Boutique Hotel, home"
          >
            <BrandLogo light={!scrolled} />
          </button>

          <ul className="hidden items-center gap-6 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.targetId;
              return (
                <li key={item.label} className="relative">
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.targetId)}
                    className={`link-u cursor-pointer text-sm font-medium transition-colors ${
                      scrolled ? 'text-deep hover:text-terracotta' : 'text-shell hover:text-sand'
                    }`}
                  >
                    {item.label}
                  </button>
                  <span
                    className={`absolute -bottom-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-terracotta transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleNavClick('booking')}
              className={`btn hidden sm:inline-flex ${scrolled ? 'btn-primary' : 'btn-ghost-light'}`}
            >
              Book Your Stay
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`grid h-11 w-11 place-items-center rounded-full lg:hidden cursor-pointer transition-colors ${
                scrolled ? 'text-deep hover:bg-sand' : 'text-shell hover:bg-shell/10'
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-shell p-6 shadow-2xl transition-transform animate-in slide-in-from-right flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-sand">
                <BrandLogo light={false} />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full text-deep hover:bg-sand cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <ul className="mt-8 space-y-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(item.targetId)}
                      className="block w-full text-left py-2 text-lg font-serif font-medium text-deep hover:text-terracotta transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-sand">
              <button
                type="button"
                onClick={() => handleNavClick('booking')}
                className="btn btn-primary w-full justify-center"
              >
                Book Your Stay
              </button>
              <div className="mt-4 text-xs text-muted-foreground text-center">
                Corniche Road, Alexandria, Egypt
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
