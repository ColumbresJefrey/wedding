import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, Award, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Entourage() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'Entire Party' },
    { id: 'honors', label: 'Maid & Best Man' },
    { id: 'bridal', label: 'Bridesmaids' },
    { id: 'groomsmen', label: 'Groomsmen' },
    { id: 'sponsors', label: 'Sponsors & Family' },
  ];

  return (
    <section id="entourage" className="py-20 sm:py-32 bg-gradient-to-b from-[#FAF7EE] via-[#F5EFE6] to-[#FAF7EE] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-script text-3xl sm:text-4xl text-gold-600 block mb-2">
            Those Who Stand Beside Us
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 tracking-tight font-light">
            Wedding Entourage
          </h2>
          <div className="h-[1px] w-20 bg-gold-400 mx-auto my-4" />
          <p className="font-serif text-lg text-charcoal-600 italic font-light">
            Our cherished family and lifelong friends who guide our steps and share our joy.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.2em] font-sans font-medium rounded-full transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-charcoal-900 text-ivory-50 shadow-md'
                  : 'bg-white/70 text-charcoal-600 hover:text-gold-600 hover:bg-white border border-gold-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Layout */}
        <div className="space-y-12">
          
          {/* Maid of Honor & Best Man */}
          {(activeTab === 'all' || activeTab === 'honors') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
              {weddingData.entourage.bridalParty.map((person) => (
                <div
                  key={person.name}
                  className="p-8 sm:p-10 bg-white/80 backdrop-blur-sm rounded-sm border border-gold-300/60 shadow-luxury text-center relative group hover:border-gold-400 transition-all"
                >
                  <div className="absolute top-4 right-4">
                    <Sparkles className="w-4 h-4 text-gold-400 opacity-60" />
                  </div>
                  <span className="font-script text-2xl text-gold-600 block mb-1">
                    Honor Attendant
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-light tracking-wide mb-2">
                    {person.name}
                  </h3>
                  <div className="inline-block px-3 py-1 bg-champagne-100/70 text-charcoal-700 text-xs uppercase tracking-widest font-sans rounded-full">
                    {person.role}
                  </div>
                  <p className="mt-3 text-xs text-charcoal-500 font-serif italic">
                    {person.relation}
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Bridesmaids & Groomsmen Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Bridesmaids */}
            {(activeTab === 'all' || activeTab === 'bridal') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/60 p-6 sm:p-8 rounded-sm border border-gold-200 shadow-sm"
              >
                <div className="text-center pb-6 border-b border-gold-200">
                  <span className="font-script text-3xl text-gold-600 block">The Bridesmaids</span>
                  <p className="text-[11px] uppercase tracking-widest text-charcoal-500 font-sans">
                    Guiding Sophia's Steps
                  </p>
                </div>

                <div className="divide-y divide-gold-200/50 mt-4">
                  {weddingData.entourage.bridesmaids.map((bm) => (
                    <div key={bm.name} className="py-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-xl text-charcoal-900 font-normal">
                          {bm.name}
                        </h4>
                        <span className="text-xs text-charcoal-500 font-serif italic">
                          {bm.relation}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-sage-600 font-sans font-medium bg-sage-50 px-2.5 py-1 rounded-sm border border-sage-200">
                        Bridesmaid
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Groomsmen */}
            {(activeTab === 'all' || activeTab === 'groomsmen') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/60 p-6 sm:p-8 rounded-sm border border-gold-200 shadow-sm"
              >
                <div className="text-center pb-6 border-b border-gold-200">
                  <span className="font-script text-3xl text-gold-600 block">The Groomsmen</span>
                  <p className="text-[11px] uppercase tracking-widest text-charcoal-500 font-sans">
                    Standing with Daniel
                  </p>
                </div>

                <div className="divide-y divide-gold-200/50 mt-4">
                  {weddingData.entourage.groomsmen.map((gm) => (
                    <div key={gm.name} className="py-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-xl text-charcoal-900 font-normal">
                          {gm.name}
                        </h4>
                        <span className="text-xs text-charcoal-500 font-serif italic">
                          {gm.relation}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-charcoal-600 font-sans font-medium bg-ivory-100 px-2.5 py-1 rounded-sm border border-gold-200">
                        Groomsman
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>

          {/* Sponsors, Parents & Flower Girls */}
          {(activeTab === 'all' || activeTab === 'sponsors') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 p-8 sm:p-10 rounded-sm border border-gold-300/50 shadow-luxury"
            >
              <div className="text-center mb-8">
                <span className="font-script text-3xl text-gold-600 block">Parents & Principal Sponsors</span>
                <p className="text-xs uppercase tracking-widest text-charcoal-500 font-sans">
                  Honored Guardians of Our Union
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-gold-200">
                {weddingData.entourage.parents.map((p) => (
                  <div key={p.role} className="text-center p-4 bg-champagne-50/50 rounded-sm">
                    <span className="text-xs uppercase tracking-[0.2em] text-gold-700 font-semibold block mb-2 font-sans">
                      {p.role}
                    </span>
                    <p className="font-serif text-xl text-charcoal-900 font-light">
                      {p.names.join(" & ")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Principal Sponsors Grid */}
              <div className="mt-8 text-center">
                <span className="text-xs uppercase tracking-[0.2em] text-charcoal-500 font-semibold block mb-4 font-sans">
                  Principal Sponsors
                </span>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                  {weddingData.entourage.sponsors[0].names.map((name) => (
                    <div key={name} className="px-4 py-2 bg-ivory-100 border border-gold-200 rounded-sm">
                      <span className="font-serif text-lg text-charcoal-800">{name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Little Angels (Flower Girls & Ring Bearer) */}
              <div className="mt-8 pt-6 border-t border-gold-200 flex flex-wrap justify-around text-center gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-gold-600 font-sans block mb-1">
                    Flower Girls
                  </span>
                  <p className="font-serif text-lg text-charcoal-800">
                    {weddingData.entourage.bearers[0].names.join(" & ")}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-widest text-gold-600 font-sans block mb-1">
                    Ring Bearer
                  </span>
                  <p className="font-serif text-lg text-charcoal-800">
                    {weddingData.entourage.bearers[1].names[0]}
                  </p>
                </div>
              </div>

            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}

