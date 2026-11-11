import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

/**
 * High-fidelity romantic harp & acoustic ambient synthesizer using Web Audio API.
 * 100% self-contained, zero external audio file latency or broken links.
 */
export default function AudioPlayer({ autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Romantic chord progression frequencies (Hz):
  // D Major / B Minor / G Major / A Major progression (Canon in D inspired)
  const chordNotes = [
    // D Major 9
    [146.83, 220.00, 277.18, 369.99, 440.00, 587.33],
    // B Minor 7
    [123.47, 185.00, 246.94, 293.66, 369.99, 493.88],
    // G Major 7
    [98.00, 196.00, 246.94, 293.66, 392.00, 587.33],
    // A Sus 4 / A Major
    [110.00, 220.00, 277.18, 329.63, 440.00, 659.25],
  ];

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playChime = (freq, time, duration = 3.5, gainVal = 0.08) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    // Dual oscillator for rich warm acoustic tone (Harp/Celeste timbre)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.002, time); // Subtle warm chorus detune

    // Warm low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.Q.setValueAtTime(1.5, time);

    // Natural plucked decay envelope
    gainNode.gain.setValueAtTime(0.0001, time);
    gainNode.gain.exponentialRampToValueAtTime(gainVal, time + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration + 0.1);
    osc2.stop(time + duration + 0.1);
  };

  const startRomanticLoop = () => {
    initAudio();
    isPlayingRef.current = true;
    setIsPlaying(true);

    let chordIndex = 0;
    let step = 0;

    const playSequence = () => {
      if (!isPlayingRef.current || !audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;
      const currentChord = chordNotes[chordIndex];

      // Play soft arpeggiated notes in gentle succession
      currentChord.forEach((note, i) => {
        const noteTime = now + (i * 0.45);
        const gain = i === 0 ? 0.07 : 0.045;
        playChime(note, noteTime, 4.0, gain);
      });

      chordIndex = (chordIndex + 1) % chordNotes.length;
      step++;

      // Next chord every ~3.2 seconds
      timerRef.current = setTimeout(playSequence, 3200);
    };

    playSequence();
  };

  const stopMusic = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const toggleMusic = () => {
    setHasInteracted(true);
    if (isPlaying) {
      stopMusic();
    } else {
      startRomanticLoop();
    }
  };

  // If user triggers invitation open, start gently
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying && !hasInteracted) {
      startRomanticLoop();
    }
  }, [autoPlayTrigger]);

  useEffect(() => {
    return () => {
      stopMusic();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleMusic}
        title={isPlaying ? "Mute Background Music" : "Play Romantic Music"}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 shadow-luxury cursor-pointer backdrop-blur-md ${
          isPlaying
            ? "bg-charcoal-900/90 text-gold-300 border-gold-400/40 hover:bg-charcoal-900"
            : "bg-ivory-50/90 text-charcoal-700 border-gold-300/40 hover:bg-ivory-100"
        }`}
      >
        <span className="relative flex h-3 w-3 items-center justify-center">
          {isPlaying ? (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
          ) : null}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-gold-400' : 'bg-charcoal-400'}`} />
        </span>

        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-gold-400 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-charcoal-500" />
        )}

        <span className="text-xs uppercase font-sans tracking-widest hidden sm:inline-block">
          {isPlaying ? "Music Playing" : "Play Music"}
        </span>

        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 bg-gold-400 animate-[bounce_1s_infinite_100ms] h-2" />
            <span className="w-0.5 bg-gold-400 animate-[bounce_1s_infinite_300ms] h-3" />
            <span className="w-0.5 bg-gold-400 animate-[bounce_1s_infinite_200ms] h-1.5" />
          </div>
        )}
      </button>
    </div>
  );
}

