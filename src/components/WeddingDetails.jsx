import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ExternalLink, Copy, Check, GlassWater, Church, PartyPopper } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function WeddingDetails() {
  const [copiedCeremony, setCopiedCeremony] = useState(false);
  const [copiedReception, setCopiedReception] = useState(false);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'ceremony') {
      setCopiedCeremony(true);
      setTimeout(() => setCopiedCeremony(false), 2500);
    } else {
      setCopiedReception(true);
      setTimeout(() => setCopiedReception(false), 2500);
    }
  };

  return (
    <section id="details" className="py-20 sm:py-32 bg-[#FAF7EE] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="font-script text-3xl sm:text-4xl text-gold-600 block mb-2">
            Where & When
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 tracking-tight font-light">
            Wedding Details
          </h2>
          <div className="h-[1px] w-20 bg-gold-400 mx-auto my-4" />
          <p className="font-serif text-lg text-charcoal-600 italic font-light">
            We are honored to welcome you to our celebration in Greenwich, Connecticut.
          </p>
        </div>

        {/* Dual Venue Cards: Ceremony & Reception */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          
          {/* Ceremony Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-white/70 backdrop-blur-sm p-8 sm:p-12 rounded-sm shadow-luxury border border-gold-300/40 flex flex-col justify-between"
          >
            {/* Top decorative stamp */}
            <div className="flex items-center justify-between pb-6 border-b border-gold-200">
              <div className="flex items-center gap-3 text-gold-600">
                <Church className="w-6 h-6 stroke-[1.5]" />
                <span className="font-script text-2xl text-gold-700">The Nuptials</span>
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-sage-700 bg-sage-50 px-3 py-1 rounded-sm border border-sage-200">
                Part One
              </span>
            </div>

            <div className="my-8 space-y-4">
              <h3 className="font-serif text-3xl text-charcoal-900 font-light">
                {weddingData.event.ceremony.title}
              </h3>

              <div className="space-y-2 text-sm font-sans text-charcoal-600">
                <p className="font-serif text-xl text-gold-700 font-normal">
                  {weddingData.event.ceremony.venue}
                </p>
                <p className="text-charcoal-500 font-light">
                  {weddingData.event.ceremony.estate}
                </p>
                <div className="flex items-start gap-2 pt-1 text-charcoal-700">
                  <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <span>{weddingData.event.ceremony.address}</span>
                </div>
              </div>

              {/* Time Block */}
              <div className="pt-4 pb-2 border-t border-dashed border-gold-200 flex items-center gap-3 text-charcoal-800">
                <Clock className="w-4 h-4 text-gold-600 shrink-0" />
                <div>
                  <span className="font-serif text-lg font-medium">
                    {weddingData.event.ceremony.time}
                  </span>
                  <p className="text-xs text-charcoal-500 font-sans">
                    {weddingData.event.ceremony.arrivalTime}
                  </p>
                </div>
              </div>

              <p className="text-xs text-charcoal-500 italic font-serif leading-relaxed pt-2">
                {weddingData.event.ceremony.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="pt-6 border-t border-gold-200 flex flex-wrap items-center gap-3 text-xs font-sans">
              <a
                href={weddingData.event.ceremony.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-charcoal-900 hover:bg-gold-600 text-ivory-50 uppercase tracking-widest rounded-sm transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Google Maps</span>
              </a>

              <button
                onClick={() => handleCopy(weddingData.event.ceremony.address, 'ceremony')}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 border border-gold-300 hover:bg-ivory-100 text-charcoal-700 uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                title="Copy Address to Clipboard"
              >
                {copiedCeremony ? <Check className="w-3.5 h-3.5 text-sage-600" /> : <Copy className="w-3.5 h-3.5 text-gold-600" />}
                <span>{copiedCeremony ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </motion.div>

          {/* Reception Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-white/70 backdrop-blur-sm p-8 sm:p-12 rounded-sm shadow-luxury border border-gold-300/40 flex flex-col justify-between"
          >
            {/* Top decorative stamp */}
            <div className="flex items-center justify-between pb-6 border-b border-gold-200">
              <div className="flex items-center gap-3 text-gold-600">
                <GlassWater className="w-6 h-6 stroke-[1.5]" />
                <span className="font-script text-2xl text-gold-700">The Soirée</span>
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-gold-700 bg-gold-50 px-3 py-1 rounded-sm border border-gold-200">
                Part Two
              </span>
            </div>

            <div className="my-8 space-y-4">
              <h3 className="font-serif text-3xl text-charcoal-900 font-light">
                {weddingData.event.reception.title}
              </h3>

              <div className="space-y-2 text-sm font-sans text-charcoal-600">
                <p className="font-serif text-xl text-gold-700 font-normal">
                  {weddingData.event.reception.venue}
                </p>
                <p className="text-charcoal-500 font-light">
                  {weddingData.event.reception.estate}
                </p>
                <div className="flex items-start gap-2 pt-1 text-charcoal-700">
                  <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <span>{weddingData.event.reception.address}</span>
                </div>
              </div>

              {/* Time Block */}
              <div className="pt-4 pb-2 border-t border-dashed border-gold-200 flex items-center gap-3 text-charcoal-800">
                <Clock className="w-4 h-4 text-gold-600 shrink-0" />
                <div>
                  <span className="font-serif text-lg font-medium">
                    {weddingData.event.reception.time}
                  </span>
                  <p className="text-xs text-charcoal-500 font-sans">
                    {weddingData.event.reception.cocktails}
                  </p>
                </div>
              </div>

              <p className="text-xs text-charcoal-500 italic font-serif leading-relaxed pt-2">
                {weddingData.event.reception.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="pt-6 border-t border-gold-200 flex flex-wrap items-center gap-3 text-xs font-sans">
              <a
                href={weddingData.event.reception.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-charcoal-900 hover:bg-gold-600 text-ivory-50 uppercase tracking-widest rounded-sm transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Google Maps</span>
              </a>

              <button
                onClick={() => handleCopy(weddingData.event.reception.address, 'reception')}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 border border-gold-300 hover:bg-ivory-100 text-charcoal-700 uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                title="Copy Address to Clipboard"
              >
                {copiedReception ? <Check className="w-3.5 h-3.5 text-sage-600" /> : <Copy className="w-3.5 h-3.5 text-gold-600" />}
                <span>{copiedReception ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </motion.div>

        </div>

        {/* Order of Events / Schedule Section */}
        <div id="schedule" className="pt-12 border-t border-gold-300/40">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-script text-3xl text-gold-600 block mb-1">
              Order of Events
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-light">
              Wedding Day Itinerary
            </h3>
            <p className="text-xs uppercase tracking-widest text-charcoal-500 mt-2 font-sans">
              Sunday, December 20, 2026
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {weddingData.schedule.map((item, index) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="p-5 bg-white/60 border border-gold-200 rounded-sm hover:border-gold-400/70 transition-all hover:shadow-md"
              >
                <span className="font-sans text-xs uppercase tracking-widest text-gold-700 font-semibold block mb-1">
                  {item.time}
                </span>
                <h4 className="font-serif text-lg text-charcoal-900 font-medium mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-charcoal-500 font-light">
                  {item.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

