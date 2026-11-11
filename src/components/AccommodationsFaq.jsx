import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bed, ChevronDown, Gift, Phone, ExternalLink, HelpCircle, Car, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function AccommodationsFaq() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-32 bg-gradient-to-b from-[#FAF7EE] via-[#F5EFE6] to-[#FAF7EE] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-script text-3xl sm:text-4xl text-gold-600 block mb-2">
            Stay & Information
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 tracking-tight font-light">
            Accommodations & FAQs
          </h2>
          <div className="h-[1px] w-20 bg-gold-400 mx-auto my-4" />
          <p className="font-serif text-lg text-charcoal-600 italic font-light">
            Everything you need for a comfortable, seamless weekend celebration.
          </p>
        </div>

        {/* Accommodations Cards */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-2 mb-8 text-gold-600">
            <Bed className="w-5 h-5" />
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-light">
              Guest Room Blocks
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {weddingData.accommodations.map((hotel) => (
              <div
                key={hotel.name}
                className="p-8 bg-white/80 rounded-sm border border-gold-300/50 shadow-luxury flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-gold-700 bg-gold-50 px-2.5 py-1 rounded-sm border border-gold-200">
                      {hotel.type}
                    </span>
                  </div>

                  <h4 className="font-serif text-2xl text-charcoal-900 font-light mt-2 mb-1">
                    {hotel.name}
                  </h4>

                  <p className="text-xs text-charcoal-500 font-sans mb-4">
                    {hotel.address}
                  </p>

                  <div className="p-3 bg-[#FAF7EE] border border-gold-200 rounded-sm mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-charcoal-500 font-sans block">
                      Special Group Code
                    </span>
                    <span className="font-sans font-semibold text-charcoal-800 tracking-wider text-sm select-all">
                      {hotel.discountCode}
                    </span>
                  </div>

                  <p className="text-xs text-charcoal-600 font-sans leading-relaxed">
                    {hotel.note}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gold-200 flex items-center justify-between text-xs font-sans">
                  <a
                    href={`tel:${hotel.phone}`}
                    className="inline-flex items-center gap-1.5 text-charcoal-700 hover:text-gold-600 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-600" />
                    <span>{hotel.phone}</span>
                  </a>

                  <a
                    href={hotel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-gold-700 hover:text-gold-800 font-medium tracking-wide uppercase text-[11px]"
                  >
                    <span>Book Online</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <span className="font-script text-2xl text-gold-600 block">Helpful Questions</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-light">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {weddingData.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={faq.question}
                  className="bg-white/70 border border-gold-200 rounded-sm overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gold-50/50 transition-colors"
                  >
                    <span className="font-serif text-lg text-charcoal-900 font-medium">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gold-600 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 text-sm font-sans text-charcoal-600 leading-relaxed font-light border-t border-gold-100 pt-3"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Registry / Wishing Well Card */}
        <div className="max-w-2xl mx-auto p-8 sm:p-10 bg-white/80 border border-gold-300/60 rounded-sm text-center shadow-luxury">
          <Gift className="w-8 h-8 text-gold-600 mx-auto mb-4 stroke-[1.5]" />
          <span className="font-script text-3xl text-gold-600 block mb-1">
            Wishing Well
          </span>
          <h4 className="font-serif text-2xl text-charcoal-900 font-light mb-3">
            Honeymoon & Future Registry
          </h4>
          <p className="font-serif text-base text-charcoal-600 italic leading-relaxed mb-6 font-light">
            "Your presence at our wedding is the greatest gift of all. If you wish to honor us with a gift, a wedding wishing well card box will be situated in the foyer for our Amalfi Coast adventure."
          </p>
          <div className="inline-block px-4 py-1.5 bg-[#FAF7EE] border border-gold-300 text-charcoal-700 text-xs uppercase tracking-widest font-sans rounded-sm">
            #ForeverDanielAndSophia
          </div>
        </div>

      </div>
    </section>
  );
}

