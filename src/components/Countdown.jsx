import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, BellRing, Sparkles, Download } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const targetDate = new Date(weddingData.event.isoDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPassed: false,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDownloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ever After//Daniel & Sophia Wedding//EN',
      'BEGIN:VEVENT',
      'UID:wedding-daniel-sophia-2026@everafter.love',
      'DTSTAMP:20261111T120000Z',
      'DTSTART:20261220T203000Z',
      'DTEND:20261221T050000Z',
      'SUMMARY:Daniel & Sophia Wedding — Ever After',
      'DESCRIPTION:Celebrating the marriage of Daniel Hayes & Sophia Montgomery at Willowbrook Manor.',
      'LOCATION:Willowbrook Manor, 4200 Meadowview Lane, Greenwich, CT 06830',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Daniel-and-Sophia-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Daniel & Sophia Wedding'
  )}&dates=20261220T203000Z/20261221T050000Z&details=${encodeURIComponent(
    'Celebrate the marriage of Daniel Hayes and Sophia Montgomery at Willowbrook Manor.'
  )}&location=${encodeURIComponent(
    'Willowbrook Manor, 4200 Meadowview Lane, Greenwich, CT 06830'
  )}`;

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF7EE] via-[#F4EFE6] to-[#FAF7EE] relative overflow-hidden border-y border-gold-300/30">
      
      {/* Delicate background crest */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <span className="font-serif text-[280px] font-bold text-gold-600 select-none">
          {weddingData.couple.monogram}
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        
        {/* Section Header */}
        <div className="mb-10">
          <span className="font-script text-3xl sm:text-4xl text-gold-600 block mb-1">
            Counting Down the Moments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal-900 tracking-tight font-light">
            Until We Say <span className="italic font-normal">"I Do"</span>
          </h2>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-charcoal-500 font-sans">
            Sunday, December 20, 2026 • 3:30 PM EST
          </p>
        </div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative p-5 sm:p-7 bg-[#FAF7EE] rounded-sm shadow-luxury border border-gold-300/40 group hover:border-gold-400/80 transition-all duration-300"
            >
              {/* Inner outline frame */}
              <div className="absolute inset-2 border border-gold-400/20 pointer-events-none group-hover:border-gold-400/40 transition-colors" />

              {/* Number */}
              <div className="relative">
                <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal-900 font-light block tabular-nums leading-none mb-1">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-sans text-gold-600 font-medium">
                  {unit.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Calendar Integration Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs font-sans"
        >
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-ivory-50 hover:bg-gold-50 border border-gold-300/80 text-charcoal-800 uppercase tracking-widest rounded-sm transition-all shadow-sm hover:shadow"
          >
            <Calendar className="w-4 h-4 text-gold-600" />
            <span>Add to Google Calendar</span>
          </a>

          <button
            onClick={handleDownloadIcs}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-ivory-50 hover:bg-gold-50 border border-gold-300/80 text-charcoal-800 uppercase tracking-widest rounded-sm transition-all shadow-sm hover:shadow cursor-pointer"
          >
            <Download className="w-4 h-4 text-gold-600" />
            <span>Download iCal / Outlook</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}

