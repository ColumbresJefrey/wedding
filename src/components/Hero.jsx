import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronDown, Heart } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Hero({ onOpenKeepsake }) {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      
      {/* Background Decorative Paper Texture & Subtle Gradient */}
      <div className="absolute inset-0 bg-[#FAF7EE] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#8A9A86_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      {/* Subtle Botanical corner accents */}
      <div className="absolute top-20 left-6 sm:left-12 w-28 sm:w-44 h-28 sm:h-44 border-t border-l border-gold-300/40 pointer-events-none" />
      <div className="absolute bottom-12 right-6 sm:right-12 w-28 sm:w-44 h-28 sm:h-44 border-b border-r border-gold-300/40 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto w-full text-center z-10">
        
        {/* Monogram / Top Announcement */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-gold-300/60 bg-ivory-100/80 mb-6 backdrop-blur-sm"
        >
          <span className="font-script text-xl text-gold-600">The Wedding of</span>
          <span className="h-1 w-1 rounded-full bg-gold-400" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-sans text-charcoal-600 font-medium">
            December 20, 2026
          </span>
        </motion.div>

        {/* Couple's Names - Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-charcoal-900 tracking-tight font-light leading-[0.95]">
            Daniel <span className="font-script text-gold-500 font-normal text-6xl sm:text-8xl md:text-9xl align-middle">&</span> Sophia
          </h1>
        </motion.div>

        {/* Short Romantic Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto font-serif text-lg sm:text-xl md:text-2xl text-charcoal-600 italic font-light leading-relaxed mb-8 px-4"
        >
          "Two lives, two hearts, joined together in friendship, united forever in love."
        </motion.p>

        {/* Wedding Cover Photograph — Editorial Arch / Framing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative max-w-3xl mx-auto px-2 mb-10"
        >
          <div className="relative p-2 sm:p-3 bg-ivory-50 rounded-2xl shadow-luxury border border-gold-300/40">
            {/* Inner Border */}
            <div className="relative overflow-hidden rounded-xl aspect-[16/10] sm:aspect-[16/9] group">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85"
                alt="Daniel & Sophia — Wedding Cover"
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent pointer-events-none" />

              {/* Photo Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between text-ivory-50 text-left pointer-events-none">
                <div>
                  <span className="font-script text-2xl sm:text-3xl text-gold-200 block drop-shadow-md">
                    Ever After
                  </span>
                  <p className="font-serif text-sm sm:text-base tracking-wider drop-shadow-sm">
                    Willowbrook Manor • Greenwich, Connecticut
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 text-[11px] uppercase tracking-widest text-ivory-200/90 font-sans">
                  Ceremony begins at 3:30 PM
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location & Quick Action CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-sans uppercase tracking-[0.2em]"
        >
          <a
            href="#rsvp"
            className="w-full sm:w-auto px-8 py-3.5 bg-charcoal-900 hover:bg-gold-600 text-ivory-50 font-medium rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            RSVP for the Celebration
          </a>
          <a
            href="#details"
            className="w-full sm:w-auto px-8 py-3.5 border border-charcoal-800 hover:border-gold-500 hover:text-gold-600 text-charcoal-800 font-medium rounded-sm transition-all duration-300 cursor-pointer"
          >
            Explore Wedding Details
          </a>
          <button
            onClick={onOpenKeepsake}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/70 hover:bg-white border border-gold-300/80 hover:border-gold-500 text-charcoal-800 font-medium rounded-sm transition-all duration-300 shadow-sm cursor-pointer"
          >
            Formal Keepsake
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-14 flex flex-col items-center justify-center text-charcoal-400 gap-1"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-sans">Scroll to Celebrate</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-gold-500" />
        </motion.div>

      </div>
    </section>
  );
}

