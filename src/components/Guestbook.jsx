import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareHeart, Heart, Send, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Guestbook() {
  const defaultWishes = [
    {
      id: 1,
      author: "Victoria Montgomery",
      relation: "Maid of Honor",
      message: "To my dearest sister Sophia and my new brother Daniel: may your marriage be filled with endless laughter, late-night talks, and all the quiet joy in the world. I love you both so much!",
      date: "November 5, 2026",
    },
    {
      id: 2,
      author: "Lucas Hayes",
      relation: "Best Man",
      message: "Daniel, watching you find Sophia has been the greatest highlight. You are each other's greatest match. Cannot wait to give the speech of a lifetime in December!",
      date: "November 7, 2026",
    },
    {
      id: 3,
      author: "Eleanor & Arthur Montgomery",
      relation: "Parents of the Bride",
      message: "Our sweet Sophia, watching you grow into such a graceful woman and seeing Daniel love you with such devotion fills our hearts to overflowing. May God bless your home forever.",
      date: "November 8, 2026",
    },
  ];

  const [wishes, setWishes] = useState([]);
  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('everafter_wedding_guestbook');
      if (stored) {
        setWishes(JSON.parse(stored));
      } else {
        setWishes(defaultWishes);
        localStorage.setItem('everafter_wedding_guestbook', JSON.stringify(defaultWishes));
      }
    } catch (e) {
      setWishes(defaultWishes);
    }
  }, []);

  const handlePostWish = (e) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const newWish = {
      id: Date.now(),
      author: author.trim(),
      relation: relation.trim() || "Guest",
      message: message.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('everafter_wedding_guestbook', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setAuthor('');
    setRelation('');
    setMessage('');
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <section className="py-20 sm:py-32 bg-[#FAF7EE] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-script text-3xl sm:text-4xl text-gold-600 block mb-2">
            Words of Love & Blessings
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 tracking-tight font-light">
            The Guestbook
          </h2>
          <div className="h-[1px] w-20 bg-gold-400 mx-auto my-4" />
          <p className="font-serif text-lg text-charcoal-600 italic font-light">
            Leave a note of love, wisdom, or celebration for the newlyweds to cherish for years to come.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-sm border border-gold-300/40 shadow-sm mb-14 max-w-2xl mx-auto">
          <form onSubmit={handlePostWish} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest font-sans font-medium text-charcoal-600 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Charlotte Dubois"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#FAF7EE] border border-gold-300/80 rounded-sm text-sm font-sans focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest font-sans font-medium text-charcoal-600 mb-1">
                  Relation / Connection
                </label>
                <input
                  type="text"
                  placeholder="e.g. College Friend, Cousin"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7EE] border border-gold-300/80 rounded-sm text-sm font-sans focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest font-sans font-medium text-charcoal-600 mb-1">
                Your Blessing or Message *
              </label>
              <textarea
                rows={3}
                placeholder="Share your prayers, marriage advice, or heartfelt memories..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-[#FAF7EE] border border-gold-300/80 rounded-sm text-sm font-sans focus:outline-none focus:border-gold-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-sage-700 font-sans italic">
                {isSent ? "Thank you! Your wish has been posted." : ""}
              </span>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-charcoal-900 hover:bg-gold-600 text-ivory-50 text-xs uppercase tracking-widest font-sans rounded-sm transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-gold-300" />
                <span>Post Blessing</span>
              </button>
            </div>
          </form>
        </div>

        {/* Wishes List Feed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishes.map((wish) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-white/70 rounded-sm border border-gold-200/80 shadow-sm flex flex-col justify-between hover:border-gold-300 transition-colors"
            >
              <div>
                <Heart className="w-4 h-4 text-gold-500 fill-gold-300/40 mb-3" />
                <p className="font-serif text-sm text-charcoal-800 italic leading-relaxed">
                  "{wish.message}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gold-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-serif text-base text-charcoal-900 font-medium block">
                    {wish.author}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-charcoal-400 font-sans">
                    {wish.relation}
                  </span>
                </div>
                <span className="text-[10px] text-gold-700 font-sans">
                  {wish.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

