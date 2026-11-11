import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function LoveStory() {
  return (
    <section id="story" className="py-20 sm:py-32 bg-[#FAF7EE] relative overflow-hidden">
      
      {/* Decorative floral watermark / background accents */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script text-3xl sm:text-4xl text-gold-600 block mb-2"
          >
            How Our Journey Began
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl text-charcoal-900 tracking-tight font-light"
          >
            Our Love Story
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-[1px] bg-gold-400 mx-auto my-4"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-serif text-lg text-charcoal-600 italic font-light"
          >
            "Every love story is beautiful, but ours is our favorite."
          </motion.p>
        </div>

        {/* Timeline Story Items */}
        <div className="relative">
          {/* Center Line for larger screens */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 -translate-x-1/2 w-[1px] bg-gradient-to-b from-gold-300 via-gold-400/60 to-gold-300 pointer-events-none" />

          <div className="space-y-16 sm:space-y-24">
            {weddingData.loveStory.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.title}
                  className={`relative flex flex-col md:flex-row items-center gap-8 lg:gap-14 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Central timeline marker dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-10 items-center justify-center w-8 h-8 rounded-full bg-[#FAF7EE] border-2 border-gold-500 shadow-md z-20">
                    <span className="w-2 h-2 rounded-full bg-gold-600" />
                  </div>

                  {/* Image Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full md:w-1/2"
                  >
                    <div className="relative p-2.5 sm:p-3 bg-ivory-50 rounded-lg shadow-luxury border border-gold-300/40 group overflow-hidden">
                      <div className="relative aspect-[4/3] rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-charcoal-900/10 group-hover:bg-transparent transition-colors" />

                        {/* Location Tag */}
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7EE]/90 backdrop-blur-sm rounded-full text-[10px] uppercase tracking-wider font-sans text-charcoal-700 shadow-sm">
                          <MapPin className="w-3 h-3 text-gold-600" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Text Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full md:w-1/2 text-center ${
                      isEven ? "md:text-left md:pl-6" : "md:text-right md:pr-6"
                    }`}
                  >
                    <span className="inline-block font-sans text-xs uppercase tracking-[0.25em] text-gold-600 font-semibold mb-2 bg-gold-100/60 px-3 py-1 rounded-sm">
                      {item.year}
                    </span>

                    <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal tracking-tight mt-1 mb-1">
                      {item.title}
                    </h3>

                    <p className="font-serif text-base sm:text-lg text-gold-700 italic mb-4 font-light">
                      {item.subtitle}
                    </p>

                    <p className="font-sans text-sm sm:text-base text-charcoal-600 leading-relaxed font-light max-w-lg mx-auto md:mx-0">
                      {item.description}
                    </p>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Closing Romance Quote Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-8 sm:p-12 bg-champagne-50/70 border border-gold-300/50 rounded-sm text-center relative max-w-3xl mx-auto shadow-sm"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FAF7EE] px-4">
            <Heart className="w-5 h-5 text-gold-500 fill-gold-400" />
          </div>

          <p className="font-serif text-xl sm:text-2xl text-charcoal-800 italic leading-relaxed">
            "And now these three remain: faith, hope, and love. But the greatest of these is love."
          </p>
          <span className="block mt-3 text-xs uppercase tracking-[0.25em] font-sans text-gold-600 font-medium">
            1 Corinthians 13:13
          </span>
        </motion.div>

      </div>
    </section>
  );
}

