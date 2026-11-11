import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Info, Shirt, Scissors } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function DressCode() {
  const { dressCode } = weddingData;

  return (
    <section id="dresscode" className="py-20 sm:py-32 bg-gradient-to-b from-[#FAF7EE] via-[#F4EFE6] to-[#FAF7EE] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-script text-3xl sm:text-4xl text-gold-600 block mb-2">
            Wedding Attire Guide
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 tracking-tight font-light">
            Dress Code & Palette
          </h2>
          <div className="h-[1px] w-20 bg-gold-400 mx-auto my-4" />
          <p className="font-serif text-xl sm:text-2xl text-charcoal-800 italic font-normal">
            {dressCode.attire}
          </p>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal-500 mt-2">
            {dressCode.subtitle}
          </p>
        </div>

        {/* Visual Color Palette Swatches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm p-8 sm:p-12 rounded-sm border border-gold-300/50 shadow-luxury mb-12"
        >
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-charcoal-500 font-semibold block">
              Suggested Color Palette
            </span>
            <p className="font-serif text-sm text-charcoal-600 italic mt-1">
              Guests are warmly encouraged to draw inspiration from our winter botanical wedding palette.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6">
            {dressCode.palette.map((color) => (
              <div key={color.name} className="flex flex-col items-center text-center group">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-md border-2 border-white transition-transform duration-300 group-hover:scale-110 mb-3"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="font-serif text-base sm:text-lg text-charcoal-900 font-medium">
                  {color.name}
                </span>
                <span className="text-[11px] font-sans uppercase tracking-wider text-charcoal-400">
                  {color.hex}
                </span>
                <span className="text-[10px] text-charcoal-500 font-sans mt-0.5">
                  {color.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Reserved Colors Notice */}
          <div className="mt-10 p-4 bg-champagne-100/60 border border-gold-300/50 rounded-sm flex items-center justify-center gap-3 text-xs font-sans text-charcoal-700 text-center">
            <Info className="w-4 h-4 text-gold-700 shrink-0" />
            <span>{dressCode.avoidNote}</span>
          </div>
        </motion.div>

        {/* Attire Breakdown: For Ladies & Gentlemen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Ladies */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-white/70 border border-gold-200 rounded-sm shadow-sm"
          >
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gold-200">
              <Scissors className="w-5 h-5 text-gold-600" />
              <h3 className="font-serif text-2xl text-charcoal-900 font-light">
                For the Ladies
              </h3>
            </div>
            <p className="font-sans text-sm text-charcoal-700 leading-relaxed font-light">
              {dressCode.ladies}
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-charcoal-500 font-sans list-disc list-inside">
              <li>Muted botanical greens, champagne, or deep formal hues</li>
              <li>Elegant warm wraps, shawls, or velvet capes for winter</li>
              <li>Heels or dressy flats comfortable for conservatory floors</li>
            </ul>
          </motion.div>

          {/* Gentlemen */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-white/70 border border-gold-200 rounded-sm shadow-sm"
          >
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gold-200">
              <Shirt className="w-5 h-5 text-gold-600" />
              <h3 className="font-serif text-2xl text-charcoal-900 font-light">
                For the Gentlemen
              </h3>
            </div>
            <p className="font-sans text-sm text-charcoal-700 leading-relaxed font-light">
              {dressCode.gentlemen}
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-charcoal-500 font-sans list-disc list-inside">
              <li>Black, deep charcoal, or midnight navy formal attire</li>
              <li>Polished formal dress shoes (oxfords or patent leather)</li>
              <li>Silk bow tie or coordinated necktie</li>
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

