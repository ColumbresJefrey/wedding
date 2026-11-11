import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import LoveStory from './components/LoveStory';
import WeddingDetails from './components/WeddingDetails';
import Entourage from './components/Entourage';
import PhotoGallery from './components/PhotoGallery';
import DressCode from './components/DressCode';
import RsvpForm from './components/RsvpForm';
import Guestbook from './components/Guestbook';
import AccommodationsFaq from './components/AccommodationsFaq';
import Footer from './components/Footer';
import EnvelopeModal from './components/EnvelopeModal';
import KeepsakeCardModal from './components/KeepsakeCardModal';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(true);
  const [isKeepsakeOpen, setIsKeepsakeOpen] = useState(false);
  const [musicTrigger, setMusicTrigger] = useState(false);

  const handleEnvelopeClose = () => {
    setIsEnvelopeOpen(false);
  };

  const handleMusicPrompt = () => {
    setMusicTrigger(true);
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpen(true);
  };

  const handleOpenKeepsake = () => {
    setIsKeepsakeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-charcoal-800 font-sans selection:bg-gold-200 selection:text-charcoal-900 relative">
      
      {/* Interactive Luxury Welcome / Envelope Opening Screen */}
      <EnvelopeModal
        isOpen={isEnvelopeOpen}
        onClose={handleEnvelopeClose}
        onMusicPrompt={handleMusicPrompt}
      />

      {/* Keepsake Formal Printable Invitation Card */}
      <KeepsakeCardModal
        isOpen={isKeepsakeOpen}
        onClose={() => setIsKeepsakeOpen(false)}
      />

      {/* Floating Audio Controller */}
      <AudioPlayer autoPlayTrigger={musicTrigger} />

      {/* Navigation */}
      <Navbar
        onReopenEnvelope={handleReopenEnvelope}
        onOpenKeepsake={handleOpenKeepsake}
      />

      <main>
        {/* Hero Section */}
        <Hero onOpenKeepsake={handleOpenKeepsake} />

        {/* Live Countdown & Calendar Sync */}
        <Countdown />

        {/* Our Love Story Timeline */}
        <LoveStory />

        {/* Ceremony, Reception & Schedule */}
        <WeddingDetails />

        {/* Wedding Entourage */}
        <Entourage />

        {/* Curated Photo Gallery & Lightbox */}
        <PhotoGallery />

        {/* Attire Guide & Visual Color Palette */}
        <DressCode />

        {/* RSVP Form with Persistence */}
        <RsvpForm />

        {/* Real-time Guestbook / Blessings */}
        <Guestbook />

        {/* Accommodations, FAQs & Wishing Well */}
        <AccommodationsFaq />
      </main>

      {/* Editorial Footer */}
      <Footer
        onReopenEnvelope={handleReopenEnvelope}
        onOpenKeepsake={handleOpenKeepsake}
      />

    </div>
  );
}
