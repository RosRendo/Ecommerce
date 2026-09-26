'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, ArrowRight, Maximize2, Sparkles, Film, Disc } from 'lucide-react';

interface CinematicReel {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  duration: string;
  fps: string;
}

const REELS: CinematicReel[] = [
  {
    id: 'reel-01',
    number: '01',
    title: 'Geometric Void & Spatial Echo',
    subtitle: 'High-Dimensional Algorithmic Wireframe',
    description: 'A study in architectural reduction. Visualizing spatial acoustic waveforms reflecting off single-billet aluminum chambers with sub-millimeter precision.',
    videoUrl: 'https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4',
    duration: '00:18',
    fps: '30 FPS',
  },
  {
    id: 'reel-02',
    number: '02',
    title: 'Kinetic Horizon & Materiality',
    subtitle: 'Atmospheric Micro-Particle Dynamics',
    description: 'Exploration of physical mass against empty space. How raw materials—sand-cast bronze, Icelandic basalt, and unglazed ceramic—absorb and shape sound.',
    videoUrl: 'https://videos.pexels.com/video-files/4146475/4146475-hd_1920_1080_24fps.mp4',
    duration: '00:24',
    fps: '24 FPS',
  },
  {
    id: 'reel-03',
    number: '03',
    title: 'Monolithic Surface & Refraction',
    subtitle: 'Light Dispersion Through K9 Crystal',
    description: 'Macro cinematography capturing the interaction between high-purity optical crystal facets and diffused OLED illumination.',
    videoUrl: 'https://videos.pexels.com/video-files/4199353/4199353-hd_1920_1080_25fps.mp4',
    duration: '00:20',
    fps: '25 FPS',
  },
];

export function CinematicScrollReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [timecode, setTimecode] = useState('00:00:00:00');

  const currentReel = REELS[activeReelIndex];

  // Scroll animations linked to user scrolling through the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.45, 0.9], [0.93, 1, 0.95]);
  const videoY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.75, 0.95], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.35], [30, 0]);

  // Live cinematic timecode ticker
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame = (frame + 1) % 30;
      const seconds = Math.floor((Date.now() / 1000) % 60);
      const minutes = Math.floor((Date.now() / 60000) % 60);
      const sSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
      const sMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const sFrm = frame < 10 ? `0${frame}` : `${frame}`;
      setTimecode(`00:${sMin}:${sSec}:${sFrm}`);
    }, 33);

    return () => clearInterval(interval);
  }, []);

  // Video play/pause toggle
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Ambient sound synthesizer toggle (warm 55Hz studio drone)
  const toggleAmbientSound = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // 55Hz sine wave (A1 low studio room drone) + subtle harmonic
        osc.type = 'sine';
        osc.frequency.setValueAtTime(55, ctx.currentTime);
        gain.gain.setValueAtTime(0.045, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscRef.current = osc;
        gainRef.current = gain;
        setIsAudioOn(true);
      } else {
        if (isAudioOn) {
          audioCtxRef.current.suspend();
          setIsAudioOn(false);
        } else {
          audioCtxRef.current.resume();
          setIsAudioOn(true);
        }
      }
    } catch {
      // AudioContext fallback
      setIsAudioOn(!isAudioOn);
    }
  };

  const handleSelectReel = (index: number) => {
    setActiveReelIndex(index);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full border-b border-[#E5E5E5] bg-[#000000] text-[#FFFFFF] overflow-hidden py-20 lg:py-32"
    >
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 space-y-12">
        {/* Section Header: Editorial Metatags */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#262626] pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-[10px] uppercase font-mono tracking-[0.3em] text-[#A3A3A3]">
              <Film className="w-3.5 h-3.5 text-[#FFFFFF]" />
              <span>Cinema Dossier // 35mm Master Reel</span>
              <span className="text-[#525252]">/</span>
              <span className="text-[#FFFFFF]">Zurich Atelier Archive</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[0.04em] text-[#FFFFFF] leading-tight">
              Machined from silence. Form follows void.
            </h2>
          </div>

          <p className="text-xs text-[#A3A3A3] max-w-sm leading-relaxed font-light">
            Continuous optical documentation of acoustic void engineering, structural damping, and minimal monolithic proportions.
          </p>
        </div>

        {/* Cinematic Widescreen Viewport with Scroll-Driven Scaling */}
        <motion.div
          style={{ scale: videoScale }}
          className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[#121212] border border-[#262626] overflow-hidden shadow-2xl transition-all duration-300 group"
        >
          {/* HTML5 Video Stream from High-Bitrate CDN */}
          <motion.div style={{ y: videoY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <video
              ref={videoRef}
              src={currentReel.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover grayscale contrast-[1.2] brightness-[0.8] transition-all duration-700"
            />
          </motion.div>

          {/* Cinematic Vignette & Letterbox Shadow Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/70 pointer-events-none" />

          {/* Top HUD Display Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between pointer-events-none text-[10px] font-mono tracking-[0.2em] text-[#E5E5E5] z-20">
            <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-[#262626]">
              <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse" />
              <span className="text-[#FFFFFF]">REC</span>
              <span className="text-[#737373]">|</span>
              <span className="text-[#FFFFFF]">{timecode}</span>
              <span className="hidden sm:inline text-[#737373]">|</span>
              <span className="hidden sm:inline text-[#A3A3A3]">{currentReel.fps}</span>
            </div>

            <div className="hidden sm:flex items-center space-x-3 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-[#262626]">
              <span className="text-[#A3A3A3]">SCENE:</span>
              <span className="text-[#FFFFFF] uppercase">{currentReel.number} // {currentReel.id}</span>
              <span className="text-[#737373]">|</span>
              <span className="text-[#A3A3A3]">RES:</span>
              <span className="text-[#FFFFFF]">4K DCI WIDESCREEN</span>
            </div>
          </div>

          {/* Corner Crosshair Film Alignment Markers */}
          <div className="absolute top-4 left-4 text-xs font-mono text-[#525252] pointer-events-none">+</div>
          <div className="absolute top-4 right-4 text-xs font-mono text-[#525252] pointer-events-none">+</div>
          <div className="absolute bottom-4 left-4 text-xs font-mono text-[#525252] pointer-events-none">+</div>
          <div className="absolute bottom-4 right-4 text-xs font-mono text-[#525252] pointer-events-none">+</div>

          {/* Floating Lower Subtitle & Storyline Reveal */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6 z-20"
          >
            <div className="max-w-xl space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#A3A3A3]">
                {currentReel.subtitle}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.04em] text-[#FFFFFF]">
                {currentReel.title}
              </h3>
              <p className="text-xs text-[#D4D4D4] leading-relaxed font-light hidden sm:block">
                {currentReel.description}
              </p>
            </div>

            {/* In-Frame Playback & Audio Controls */}
            <div className="flex items-center space-x-3 self-start md:self-end">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="h-11 px-4 bg-black/70 hover:bg-black text-[#FFFFFF] border border-[#404040] hover:border-[#FFFFFF] backdrop-blur-md text-[11px] uppercase font-mono tracking-[0.18em] flex items-center space-x-2 transition-colors cursor-pointer"
                aria-label={isPlaying ? 'Pause film' : 'Play film'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span className="hidden sm:inline">{isPlaying ? 'Freeze' : 'Roll'}</span>
              </button>

              {/* Ambient Sound Drone Synthesizer */}
              <button
                onClick={toggleAmbientSound}
                className={`h-11 px-4 border backdrop-blur-md text-[11px] uppercase font-mono tracking-[0.18em] flex items-center space-x-2 transition-colors cursor-pointer ${
                  isAudioOn
                    ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF]'
                    : 'bg-black/70 hover:bg-black text-[#FFFFFF] border-[#404040] hover:border-[#FFFFFF]'
                }`}
                aria-label="Toggle ambient studio sound"
              >
                {isAudioOn ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    <span>55Hz Drone On</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#737373]" />
                    <span>Sound Drone</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Interactive Film Chapter Selector (3 Reels) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {REELS.map((reel, index) => {
            const isSelected = activeReelIndex === index;
            return (
              <button
                key={reel.id}
                onClick={() => handleSelectReel(index)}
                className={`p-6 text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'border-[#FFFFFF] bg-[#141414] text-[#FFFFFF]'
                    : 'border-[#262626] bg-[#0A0A0A] text-[#737373] hover:border-[#525252] hover:text-[#D4D4D4]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-xs tracking-[0.2em] font-medium text-[#FFFFFF]">
                    [REEL {reel.number}]
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-[#737373]">
                    {reel.duration}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-normal tracking-[0.04em] text-[#FFFFFF]">
                    {reel.title}
                  </h4>
                  <p className="text-[11px] text-[#A3A3A3] line-clamp-2 leading-relaxed">
                    {reel.subtitle}
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-[0.2em] pt-2 text-[#FFFFFF]">
                  <Disc className={`w-3.5 h-3.5 ${isSelected ? 'animate-spin' : ''}`} />
                  <span>{isSelected ? 'Active Reel' : 'Switch Reel'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Gateway: Collection Link */}
        <div className="border-t border-[#262626] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-xs text-[#A3A3A3]">
            <Sparkles className="w-4 h-4 text-[#FFFFFF]" />
            <span>Captured in 35mm monochrome at the Zurich Electroacoustic Atelier.</span>
          </div>

          <Link
            href="/collections/the-monolith"
            className="h-12 px-8 bg-[#FFFFFF] text-[#000000] hover:bg-[#E5E5E5] text-xs uppercase tracking-[0.2em] font-medium transition-colors inline-flex items-center justify-center space-x-2"
          >
            <span>Explore The Monolith Series</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
