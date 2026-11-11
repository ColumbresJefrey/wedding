import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Mail } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Navbar({ onReopenEnvelope, onOpenKeepsake }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Our Story", href: "#story" },
    { label: "Details", href: "#details" },
    { label: "Schedule", href: "#schedule" },
    { label: "Entourage", href: "#entourage" },
    { label: "Gallery", href: "#gallery" },
    { label: "Dress Code", href: "#dresscode" },
    { label: "Travel & FAQ", href: "#faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#FAF7EE]/95 backdrop-blur-md shadow-sm border-b border-gold-300/30 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo / Monogram */}
            <a
              href="#"
              className="flex items-center gap-2 group cursor-pointer"
            >
              <span className="font-serif text-2xl sm:text-3xl text-charcoal-900 tracking-tight font-light group-hover:text-gold-600 transition-colors">
                {weddingData.couple.groom.firstName} <span className="font-script text-gold-500 text-3xl font-normal">&</span> {weddingData.couple.bride.firstName}
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-charcoal-700 hover:text-gold-600 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-500 hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={onReopenEnvelope}
                title="View Invitation Envelope"
                className="flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider text-charcoal-600 hover:text-gold-600 transition-colors font-sans cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-gold-500" />
                <span>Envelope</span>
              </button>

              <button
                onClick={onOpenKeepsake}
                title="View Formal Printable Keepsake Card"
                className="flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-wider text-charcoal-600 hover:text-gold-600 transition-colors font-sans cursor-pointer"
              >
                <span>Keepsake</span>
              </button>

              <a
                href="#rsvp"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-sage-600 hover:bg-sage-700 text-ivory-50 text-xs uppercase tracking-[0.2em] font-sans font-medium rounded-sm shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                <span>RSVP</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="#rsvp"
                className="px-3 py-1.5 bg-sage-600 text-ivory-50 text-[11px] uppercase tracking-wider font-sans rounded-sm sm:hidden"
              >
                RSVP
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal-800 hover:text-gold-600 cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-stone-900/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="fixed top-0 right-0 bottom-0 w-72 bg-[#FAF7EE] shadow-2xl p-6 flex flex-col justify-between border-l border-gold-300/40 animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gold-300/30">
                <span className="font-serif text-2xl text-charcoal-900">
                  {weddingData.couple.monogram}
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-charcoal-500 hover:text-charcoal-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm uppercase tracking-[0.2em] font-sans text-charcoal-800 hover:text-gold-600 transition-colors py-1"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-gold-300/30 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReopenEnvelope();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-widest border border-gold-400 text-gold-700 rounded-sm font-sans"
              >
                <Mail className="w-4 h-4" />
                Re-open Envelope
              </button>

              <a
                href="#rsvp"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center py-3 bg-sage-600 text-ivory-50 text-xs uppercase tracking-widest font-sans font-medium rounded-sm shadow-sm"
              >
                Confirm RSVP
              </a>

              <p className="text-center font-serif text-xs text-charcoal-500 pt-2 italic">
                {weddingData.event.date} • Greenwich, CT
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

