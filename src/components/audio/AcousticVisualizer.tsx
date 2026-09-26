'use client';

import React, { useState } from 'react';
import { Volume2, Sliders, Activity } from 'lucide-react';

type Profile = 'reference' | 'chamber' | 'analog';

export function AcousticVisualizer() {
  const [profile, setProfile] = useState<Profile>('reference');
  const [subBass, setSubBass] = useState(0);
  const [mids, setMids] = useState(0);
  const [treble, setTreble] = useState(0);

  const profiles: Record<
    Profile,
    {
      title: string;
      desc: string;
      curve: string;
      thd: string;
      impedance: string;
      dispersion: string;
    }
  > = {
    reference: {
      title: 'Studio Reference (Neutral Beryllium Curve)',
      desc: 'Completely uncolored transfer curve calibrated according to IEC-60318 laboratory standards.',
      curve: 'M 10 75 Q 80 73 150 75 T 290 74 T 430 75 T 570 76 T 700 75',
      thd: '< 0.002% @ 1kHz',
      impedance: '32 Ω Pure Resistive',
      dispersion: 'Diffused Hemispherical',
    },
    chamber: {
      title: 'Acoustic Chamber (Spatial Depth)',
      desc: 'Subtle elevation in 8kHz–12kHz air bands engineered to mimic natural binaural room reflection.',
      curve: 'M 10 75 Q 80 65 150 72 T 290 70 T 430 62 T 570 58 T 700 70',
      thd: '< 0.003% @ 1kHz',
      impedance: '32 Ω Non-reactive',
      dispersion: '360° Point Source',
    },
    analog: {
      title: 'Analog Warmth (Second-Order Harmonics)',
      desc: 'Gentle warmth roll-off tuned to recreate vintage 1970s discrete Class-A transformer iron saturation.',
      curve: 'M 10 60 Q 80 64 150 70 T 290 75 T 430 78 T 570 82 T 700 85',
      thd: '0.015% Even Harmonics',
      impedance: '34 Ω Saturated',
      dispersion: 'Direct Coupled',
    },
  };

  const current = profiles[profile];

  return (
    <div className="w-full bg-[#FAFAFA] border border-[#E5E5E5] p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E5E5] pb-6 space-y-3 sm:space-y-0">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#525252] block mb-1">
            Laboratory Calibration
          </span>
          <h3 className="text-xl sm:text-2xl font-light tracking-[0.06em] text-[#000000]">
            Acoustic Transfer Function &amp; Waveform
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-[#000000]" />
          <span className="text-[11px] font-mono text-[#525252] uppercase tracking-[0.14em]">
            Real-time FFT Measurement
          </span>
        </div>
      </div>

      {/* Profile Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(['reference', 'chamber', 'analog'] as Profile[]).map((key) => {
          const isSelected = profile === key;
          return (
            <button
              key={key}
              onClick={() => setProfile(key)}
              className={`p-4 border text-left transition-colors cursor-pointer ${
                isSelected
                  ? 'border-[#000000] bg-[#FFFFFF] shadow-sm'
                  : 'border-[#E5E5E5] bg-transparent hover:border-[#A3A3A3]'
              }`}
            >
              <span className="text-[10px] uppercase tracking-[0.18em] font-mono block text-[#A3A3A3]">
                {key === 'reference' ? 'Profile 01' : key === 'chamber' ? 'Profile 02' : 'Profile 03'}
              </span>
              <p className="text-xs uppercase tracking-[0.12em] font-medium text-[#000000] mt-1">
                {key === 'reference' ? 'Studio Reference' : key === 'chamber' ? 'Acoustic Chamber' : 'Analog Warmth'}
              </p>
            </button>
          );
        })}
      </div>

      {/* SVG Frequency Canvas */}
      <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-6 space-y-3">
        <div className="flex justify-between items-center text-[10px] uppercase font-mono text-[#A3A3A3] tracking-widest border-b border-[#F5F5F5] pb-2">
          <span>+6 dB</span>
          <span>Target Response Curve (20 Hz — 40,000 Hz)</span>
          <span>-6 dB</span>
        </div>

        <div className="relative h-44 w-full flex items-center justify-center overflow-hidden">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-20 border border-[#E5E5E5]">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="border-r border-b border-[#000000]" />
            ))}
          </div>

          {/* Dynamic Waveform Path */}
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 710 150"
            preserveAspectRatio="none"
          >
            <path
              d={current.curve}
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              className="transition-all duration-300 ease-out"
            />
            {/* Guide Center Line */}
            <line
              x1="0"
              y1="75"
              x2="710"
              y2="75"
              stroke="#E5E5E5"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-[#A3A3A3] pt-2 border-t border-[#F5F5F5]">
          <span>20 Hz (Sub)</span>
          <span>250 Hz</span>
          <span>1,000 Hz (Mid)</span>
          <span>4,000 Hz</span>
          <span>16,000 Hz</span>
          <span>40,000 Hz (Air)</span>
        </div>
      </div>

      {/* Laboratory Benchmark Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#525252] block">
            Harmonic Distortion
          </span>
          <p className="font-mono text-sm text-[#000000]">{current.thd}</p>
        </div>

        <div className="space-y-1 sm:border-x sm:border-[#E5E5E5] sm:px-6">
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#525252] block">
            Coil Impedance
          </span>
          <p className="font-mono text-sm text-[#000000]">{current.impedance}</p>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#525252] block">
            Spatial Dispersion
          </span>
          <p className="font-mono text-sm text-[#000000]">{current.dispersion}</p>
        </div>
      </div>
    </div>
  );
}
