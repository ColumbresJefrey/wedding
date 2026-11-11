import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, HeartHandshake, AlertCircle, Sparkles, Send, Users, ShieldCheck, Trash2, Download } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function RsvpForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    attendance: 'attending', // 'attending' | 'declining'
    guestsCount: 1,
    guestNames: '',
    dietary: 'none',
    dietaryDetails: '',
    songRequest: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rsvpList, setRsvpList] = useState([]);
  const [showAdminView, setShowAdminView] = useState(false);

  // Load existing RSVPs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('everafter_wedding_rsvps');
      if (stored) {
        setRsvpList(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Could not load RSVPs from localStorage", e);
    }
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address for confirmation.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (formData.attendance === 'attending' && formData.guestsCount > 1 && !formData.guestNames.trim()) {
      errs.guestNames = 'Please list the names of all accompanying guests.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C29F5A', '#668266', '#FAF7EE', '#F3EAD3'],
      });
    } catch (e) {
      // Fallback silently if canvas not available
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newEntry = {
        id: Date.now(),
        ...formData,
        submittedAt: new Date().toLocaleString(),
      };

      const updated = [newEntry, ...rsvpList];
      setRsvpList(updated);
      try {
        localStorage.setItem('everafter_wedding_rsvps', JSON.stringify(updated));
      } catch (e) {
        console.error("Storage error", e);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      if (formData.attendance === 'attending') {
        triggerConfetti();
      }
    }, 600);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      attendance: 'attending',
      guestsCount: 1,
      guestNames: '',
      dietary: 'none',
      dietaryDetails: '',
      songRequest: '',
      message: '',
    });
    setErrors({});
  };

  const handleDeleteRsvp = (id) => {
    const updated = rsvpList.filter((item) => item.id !== id);
    setRsvpList(updated);
    localStorage.setItem('everafter_wedding_rsvps', JSON.stringify(updated));
  };

  const exportRsvpsCsv = () => {
    if (rsvpList.length === 0) return;
    const headers = ['Name', 'Email', 'Attendance', 'Guest Count', 'Guest Names', 'Dietary', 'Song Request', 'Message', 'Submitted At'];
    const rows = rsvpList.map(r => [
      `"${r.fullName}"`,
      `"${r.email}"`,
      `"${r.attendance}"`,
      `"${r.guestsCount}"`,
      `"${r.guestNames || ''}"`,
      `"${r.dietary}"`,
      `"${r.songRequest || ''}"`,
      `"${r.message || ''}"`,
      `"${r.submittedAt}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Wedding_RSVP_List_${weddingData.couple.groom.firstName}_${weddingData.couple.bride.firstName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="rsvp" className="py-20 sm:py-32 bg-[#FAF7EE] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-script text-3xl sm:text-4xl text-gold-600 block mb-2">
            Will You Join Us?
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-charcoal-900 tracking-tight font-light">
            Kindly Respond
          </h2>
          <div className="h-[1px] w-20 bg-gold-400 mx-auto my-4" />
          <p className="font-serif text-lg text-charcoal-600 italic font-light">
            Please RSVP by November 15, 2026 to help us finalize arrangements.
          </p>
        </div>

        {/* Main RSVP Card Container */}
        <div className="relative bg-white/90 backdrop-blur-sm p-8 sm:p-14 rounded-sm shadow-luxury border border-gold-300/50">
          
          {/* Inner Accent Line */}
          <div className="absolute inset-2 border border-gold-400/20 pointer-events-none" />

          {/* Success State */}
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-10 space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-sage-50 border-2 border-sage-500/50 flex items-center justify-center mx-auto text-sage-600 shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="font-script text-3xl sm:text-4xl text-gold-600 block">
                    Thank You Warmly
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-light">
                    {formData.attendance === 'attending'
                      ? "We Can't Wait to Celebrate With You!"
                      : "We Will Truly Miss Your Presence"}
                  </h3>
                  <p className="font-sans text-sm text-charcoal-600 max-w-md mx-auto pt-2">
                    {formData.attendance === 'attending'
                      ? `Your confirmation for ${formData.guestsCount} guest(s) has been officially recorded. A confirmation has been prepared for ${formData.email}.`
                      : `Thank you for letting us know, ${formData.fullName}. You will be warmly in our hearts on our special day.`}
                  </p>
                </div>

                {/* Summary Box */}
                <div className="p-6 bg-[#FAF7EE] border border-gold-200 rounded-sm max-w-md mx-auto text-left text-xs font-sans space-y-2 text-charcoal-700">
                  <div className="flex justify-between py-1 border-b border-gold-100">
                    <span className="text-charcoal-500 uppercase tracking-wider">Guest Name:</span>
                    <span className="font-medium">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gold-100">
                    <span className="text-charcoal-500 uppercase tracking-wider">Status:</span>
                    <span className={`font-medium uppercase tracking-wider ${formData.attendance === 'attending' ? 'text-sage-700' : 'text-charcoal-600'}`}>
                      {formData.attendance === 'attending' ? 'Joyfully Accepting' : 'Regretfully Declining'}
                    </span>
                  </div>
                  {formData.attendance === 'attending' && (
                    <>
                      <div className="flex justify-between py-1 border-b border-gold-100">
                        <span className="text-charcoal-500 uppercase tracking-wider">Party Size:</span>
                        <span className="font-medium">{formData.guestsCount} Attendee(s)</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-charcoal-500 uppercase tracking-wider">Dietary:</span>
                        <span className="font-medium capitalize">{formData.dietary}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-2.5 border border-charcoal-700 text-charcoal-800 text-xs uppercase tracking-widest font-sans rounded-sm hover:bg-charcoal-900 hover:text-white transition-colors cursor-pointer"
                  >
                    Submit Another Response
                  </button>
                  <a
                    href="#details"
                    className="px-6 py-2.5 bg-sage-600 hover:bg-sage-700 text-white text-xs uppercase tracking-widest font-sans rounded-sm shadow-sm transition-colors"
                  >
                    Review Wedding Day Details
                  </a>
                </div>
              </motion.div>
            ) : (
              /* RSVP Form */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                
                {/* Attendance Toggle */}
                <div className="space-y-3">
                  <label className="block text-xs uppercase tracking-[0.2em] font-sans font-medium text-charcoal-700 text-center">
                    Attendance Confirmation *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                    <label
                      className={`relative flex items-center justify-center gap-3 p-4 rounded-sm border cursor-pointer transition-all duration-300 text-center ${
                        formData.attendance === 'attending'
                          ? 'border-sage-600 bg-sage-50 text-sage-900 shadow-sm'
                          : 'border-gold-200 bg-white hover:border-gold-300 text-charcoal-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="attending"
                        checked={formData.attendance === 'attending'}
                        onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                        className="sr-only"
                      />
                      <Sparkles className={`w-4 h-4 ${formData.attendance === 'attending' ? 'text-sage-600' : 'text-charcoal-400'}`} />
                      <span className="font-serif text-lg">Joyfully Accepts</span>
                    </label>

                    <label
                      className={`relative flex items-center justify-center gap-3 p-4 rounded-sm border cursor-pointer transition-all duration-300 text-center ${
                        formData.attendance === 'declining'
                          ? 'border-charcoal-800 bg-stone-100 text-charcoal-900 shadow-sm'
                          : 'border-gold-200 bg-white hover:border-gold-300 text-charcoal-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value="declining"
                        checked={formData.attendance === 'declining'}
                        onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                        className="sr-only"
                      />
                      <span className="font-serif text-lg">Regretfully Declines</span>
                    </label>
                  </div>
                </div>

                {/* Primary Guest Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-sans font-medium text-charcoal-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: null });
                      }}
                      className={`w-full px-4 py-3 bg-[#FAF7EE] border ${
                        errors.fullName ? 'border-red-400 ring-1 ring-red-400' : 'border-gold-300/80 focus:border-gold-500'
                      } rounded-sm text-sm font-sans focus:outline-none transition-colors`}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-500 font-sans flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-sans font-medium text-charcoal-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. eleanor@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      className={`w-full px-4 py-3 bg-[#FAF7EE] border ${
                        errors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-gold-300/80 focus:border-gold-500'
                      } rounded-sm text-sm font-sans focus:outline-none transition-colors`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500 font-sans flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Details only if Attending */}
                {formData.attendance === 'attending' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6 pt-4 border-t border-gold-200"
                  >
                    {/* Number of Attendees */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
                      <div>
                        <label className="block text-xs uppercase tracking-[0.2em] font-sans font-medium text-charcoal-700 mb-2">
                          Total Attendees
                        </label>
                        <select
                          value={formData.guestsCount}
                          onChange={(e) => setFormData({ ...formData, guestsCount: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 bg-[#FAF7EE] border border-gold-300/80 rounded-sm text-sm font-sans focus:outline-none focus:border-gold-500 cursor-pointer"
                        >
                          <option value={1}>1 Guest (Myself)</option>
                          <option value={2}>2 Guests (+1 Plus One)</option>
                          <option value={3}>3 Guests</option>
                          <option value={4}>4 Guests</option>
                        </select>
                      </div>

                      {/* Guest Names if count > 1 */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs uppercase tracking-[0.2em] font-sans font-medium text-charcoal-700 mb-2">
                          {formData.guestsCount > 1 ? "Accompanying Guest Name(s) *" : "Notes on Guest"}
                        </label>
                        <input
                          type="text"
                          placeholder={formData.guestsCount > 1 ? "e.g. Julian Sterling" : "Optional party notes"}
                          value={formData.guestNames}
                          onChange={(e) => {
                            setFormData({ ...formData, guestNames: e.target.value });
                            if (errors.guestNames) setErrors({ ...errors, guestNames: null });
                          }}
                          className={`w-full px-4 py-3 bg-[#FAF7EE] border ${
                            errors.guestNames ? 'border-red-400 ring-1 ring-red-400' : 'border-gold-300/80 focus:border-gold-500'
                          } rounded-sm text-sm font-sans focus:outline-none transition-colors`}
                        />
                        {errors.guestNames && (
                          <p className="mt-1.5 text-xs text-red-500 font-sans flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.guestNames}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Dietary Preferences */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-[0.2em] font-sans font-medium text-charcoal-700 mb-2">
                          Dietary Preferences
                        </label>
                        <select
                          value={formData.dietary}
                          onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF7EE] border border-gold-300/80 rounded-sm text-sm font-sans focus:outline-none focus:border-gold-500 cursor-pointer"
                        >
                          <option value="none">No Dietary Restrictions</option>
                          <option value="vegetarian">Vegetarian</option>
                          <option value="vegan">Vegan</option>
                          <option value="gluten-free">Gluten-Free</option>
                          <option value="halal">Halal</option>
                          <option value="kosher">Kosher</option>
                          <option value="other">Specific Allergy (Details below)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-[0.2em] font-sans font-medium text-charcoal-700 mb-2">
                          Allergies / Special Meal Notes
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Nut allergy, shellfish allergy"
                          value={formData.dietaryDetails}
                          onChange={(e) => setFormData({ ...formData, dietaryDetails: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF7EE] border border-gold-300/80 rounded-sm text-sm font-sans focus:outline-none focus:border-gold-500"
                        />
                      </div>
                    </div>

                    {/* Song Request */}
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] font-sans font-medium text-charcoal-700 mb-2">
                        Song Request for the Dance Floor
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Frank Sinatra — Fly Me to the Moon"
                        value={formData.songRequest}
                        onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF7EE] border border-gold-300/80 rounded-sm text-sm font-sans focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Warm Message / Well Wishes */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] font-sans font-medium text-charcoal-700 mb-2">
                    A Note to Daniel & Sophia
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Leave a sweet note or blessing for the bride and groom..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF7EE] border border-gold-300/80 rounded-sm text-sm font-sans focus:outline-none focus:border-gold-500 resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center justify-center gap-3 px-12 py-4 bg-charcoal-900 hover:bg-gold-600 text-ivory-50 text-xs uppercase tracking-[0.25em] font-sans font-medium rounded-sm shadow-md hover:shadow-xl transition-all duration-300 disabled:opacity-70 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-gold-300 group-hover:translate-x-1 transition-transform" />
                    <span>{isSubmitting ? "Confirming Response..." : "Send RSVP Confirmation"}</span>
                  </button>
                </div>

              </motion.form>
            )}
          </AnimatePresence>

        </div>

        {/* Admin / Guest List Inspector Toggle (Client-side localStorage feature) */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAdminView(!showAdminView)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal-500 hover:text-gold-700 font-sans transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            <span>{showAdminView ? "Hide Stored RSVP Submissions" : `View Registered RSVPs (${rsvpList.length})`}</span>
          </button>

          {/* Stored RSVP Table */}
          {showAdminView && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-white rounded-sm border border-gold-300/60 shadow-lg text-left"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gold-200 gap-3">
                <div>
                  <h4 className="font-serif text-xl text-charcoal-900">
                    Stored RSVP Submissions (localStorage)
                  </h4>
                  <p className="text-xs text-charcoal-500 font-sans">
                    Demonstrates full client-side persistence without third-party mock delays.
                  </p>
                </div>

                {rsvpList.length > 0 && (
                  <button
                    onClick={exportRsvpsCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ivory-100 hover:bg-gold-100 text-charcoal-800 border border-gold-300 text-xs font-sans rounded-sm transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-gold-600" />
                    Export CSV
                  </button>
                )}
              </div>

              {rsvpList.length === 0 ? (
                <p className="py-8 text-center text-sm text-charcoal-500 font-serif italic">
                  No RSVP submissions stored yet. Submit the form above to see your entry appear here!
                </p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans text-charcoal-700">
                    <thead className="bg-[#FAF7EE] text-charcoal-500 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-2.5">Name</th>
                        <th className="p-2.5">Email</th>
                        <th className="p-2.5">Status</th>
                        <th className="p-2.5">Guests</th>
                        <th className="p-2.5">Dietary</th>
                        <th className="p-2.5">Message / Song</th>
                        <th className="p-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold-100">
                      {rsvpList.map((item) => (
                        <tr key={item.id} className="hover:bg-stone-50">
                          <td className="p-2.5 font-medium text-charcoal-900">{item.fullName}</td>
                          <td className="p-2.5 text-charcoal-600">{item.email}</td>
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium ${
                              item.attendance === 'attending' ? 'bg-sage-100 text-sage-800' : 'bg-stone-200 text-stone-700'
                            }`}>
                              {item.attendance}
                            </span>
                          </td>
                          <td className="p-2.5">{item.guestsCount}</td>
                          <td className="p-2.5 capitalize">{item.dietary}</td>
                          <td className="p-2.5 max-w-xs truncate text-charcoal-500 italic">
                            {item.message || item.songRequest || '—'}
                          </td>
                          <td className="p-2.5 text-right">
                            <button
                              onClick={() => handleDeleteRsvp(item.id)}
                              className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Delete Entry"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}

