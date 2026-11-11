import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function PhotoGallery() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const filteredGallery = selectedFilter === 'all'
    ? weddingData.gallery
    : weddingData.gallery.filter((img) => img.category === selectedFilter);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, filteredGallery.length]);

  const handleNext = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((prev) => (prev + 1) % filteredGallery.length);
    }
  };

  const handlePrev = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  return (
    <section id="gallery" className="py-20 sm:py-32 bg-[#FAF7EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-script text-3xl sm:text-4xl text-gold-600 block mb-2">
            Captured Moments
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 tracking-tight font-light">
            Photo Gallery
          </h2>
          <div className="h-[1px] w-20 bg-gold-400 mx-auto my-4" />
          <p className="font-serif text-lg text-charcoal-600 italic font-light">
            Memories of our adventures, quiet laughter, and the journey leading to forever.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'engagement', label: 'Engagement' },
            { id: 'travels', label: 'Travels' },
            { id: 'candid', label: 'Candid Moments' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.2em] font-sans font-medium rounded-full transition-all duration-300 cursor-pointer ${
                selectedFilter === cat.id
                  ? 'bg-charcoal-900 text-ivory-50 shadow-md'
                  : 'bg-white/70 text-charcoal-600 hover:text-gold-600 hover:bg-white border border-gold-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredGallery.map((photo, index) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveImageIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-sm bg-stone-100 shadow-luxury border border-gold-300/40"
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Subtle Darkening Overlay on Hover */}
                  <div className="absolute inset-0 bg-charcoal-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-ivory-50">
                    <span className="font-script text-2xl text-gold-300 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {photo.title}
                    </span>
                    <p className="font-serif text-sm italic text-ivory-100/90 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {photo.caption}
                    </p>
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 sm:p-8"
              onClick={() => setActiveImageIndex(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveImageIndex(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Central Lightbox Image Container */}
              <div
                className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  key={filteredGallery[activeImageIndex].src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={filteredGallery[activeImageIndex].src}
                  alt={filteredGallery[activeImageIndex].title}
                  className="max-h-[72vh] max-w-full rounded-sm object-contain shadow-2xl border border-white/10"
                />

                {/* Caption Bar */}
                <div className="mt-4 text-center text-ivory-50 max-w-lg">
                  <span className="font-script text-2xl text-gold-300 block">
                    {filteredGallery[activeImageIndex].title}
                  </span>
                  <p className="font-serif text-sm sm:text-base italic text-stone-300 mt-1">
                    {filteredGallery[activeImageIndex].caption}
                  </p>
                  <span className="text-[11px] uppercase tracking-widest text-stone-500 font-sans block mt-2">
                    {activeImageIndex + 1} of {filteredGallery.length}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

