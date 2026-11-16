import React, { useState } from 'react';
import { ShieldCheck, Clock, Sparkles, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreTreatments: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  // Video URL provided by the user
  const videoUrl = 'https://res.cloudinary.com/ddpujsrsg/video/upload/v1780907534/download_6_yrssp0.mp4';

  const highlights = [
    'Implantes de titanio de alta calidad',
    'Carga inmediata disponible',
    'Desde 500 € º'
  ];

  return (
    <section id="empresa" className="relative min-h-[95vh] md:min-h-screen flex items-center pt-16 md:pt-12 overflow-hidden bg-slate-100">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none overflow-hidden">
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Advanced Aesthetic Fading Overlay */}
      {/* Desktop overlay: softer white coverage to let the background clinic reception be beautifully visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/45 via-white/20 to-transparent z-10 hidden md:block" />
      {/* Mobile overlay: softer white coverage to let the background be visible on smaller screens */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/20 to-white/5 z-10 md:hidden" />

      {/* Main Container */}
      <div className="relative w-full z-20 max-w-7xl mx-auto px-4 md:px-8 mt-4 md:mt-0 pb-16 md:pb-12 flex flex-col justify-between">
        
        {/* Left Column Content - Main Title and CTAs */}
        <div className="max-w-2xl lg:max-w-3xl pt-14 md:pt-[72px] lg:pt-[84px]">
          
          {/* Headline with custom high-contrast styling */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Implantes Dentales en <br className="hidden sm:inline" />Palma de Mallorca y Manacor
          </h1>

          {/* Core description representing the exact copy requested */}
          <p className="text-slate-800 text-sm md:text-base max-w-2xl leading-relaxed mt-4 md:mt-5 font-semibold">
            Recupera tu diente de forma definitiva. En Odontofamilia colocamos implantes dentales de titanio de alta calidad — el estándar de referencia mundial en durabilidad y estética — tanto en nuestra clínica de Palma como en la de Manacor.
          </p>

          {/* Highlight Cards based on the specified badges - stacked vertically, transparent and clean */}
          <div className="flex flex-col gap-2 mt-6 md:mt-8 mb-6 md:mb-8 items-start">
            {highlights.map((text, idx) => {
              return (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="flex items-center gap-3.5 py-1.5 px-0 bg-transparent border-transparent shadow-none select-none w-fit"
                >
                  <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="w-3.5 h-3.5">
                      <path d="M20 6L9 17L4 12" />
                    </svg>
                  </div>
                  <div className="text-slate-950 font-extrabold text-sm sm:text-base tracking-tight">
                    {text}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Buttons side-by-side with beautiful spacing and EXACT text mapping */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8">
            {/* Primary CTA: Llama ahora */}
            <a
              href="tel:+34647461382"
              className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm md:text-base rounded-full py-4 px-8 flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all transform active:scale-98 text-center"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-current text-white animate-pulse shrink-0">
                <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.28 1.11z" />
              </svg>
              <span>Llama ahora</span>
            </a>

            {/* Secondary CTA: Pedir cita */}
            <button
              onClick={onOpenBooking}
              className="cursor-pointer bg-slate-900/90 backdrop-blur-sm border border-slate-800 text-white font-extrabold text-sm md:text-base rounded-full py-4 px-8 flex items-center justify-center gap-2.5 hover:bg-slate-900 shadow-md hover:shadow-lg active:scale-98 transition-all"
            >
              <Calendar className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Pedir cita</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
