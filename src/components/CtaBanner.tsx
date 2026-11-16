import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar } from 'lucide-react';

interface CtaBannerProps {
  onOpenBooking?: () => void;
}

export default function CtaBanner({ onOpenBooking }: CtaBannerProps) {
  return (
    <section id="banner-visita" className="relative w-full overflow-hidden bg-slate-900 scroll-mt-20">
      
      {/* 1. Full-width cinematic background image of a female dentist (representing Liliana) at work, focused on the right */}
      <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600" 
          alt="Liliana realizando tratamiento dental" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-right md:object-center opacity-75 md:opacity-90"
        />
        
        {/* Absolute dark/blue marine elegant gradients for high readability of white overlay text on the left */}
        {/* On desktop: thick gradient on the left blending into transparent on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent md:block hidden" />
        {/* On mobile: full overlay to ensure high-contrast legibility */}
        <div className="absolute inset-0 bg-slate-950/75 md:hidden block" />
      </div>

      {/* Decorative premium accent glow lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-transparent" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16 relative z-10 w-full py-16 md:py-20 flex items-center min-h-[360px] md:min-h-[400px]">
        
        {/* Content Box aligned to the left */}
        <div className="max-w-2xl text-left md:text-left flex flex-col items-start">
          
          {/* Subtle elegant glowing pill badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-400/30 pl-2 pr-4.5 py-1.5 rounded-full mb-5 select-none"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
            <span className="text-xs sm:text-[13px] font-extrabold text-white tracking-widest uppercase">
              Primera Consulta Gratuita
            </span>
          </motion.div>

          {/* Large, strong white Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight leading-[1.15]"
          >
            Agenda tu primera visita gratuita
          </motion.h2>

          {/* Custom emerald horizontal highlight separator */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 62 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-emerald-400 to-[#2563eb] rounded-full mt-3.5 mb-5"
          />

          {/* Description copy exactly as requested, styled beautifully in white with readable contrast */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-200/95 text-sm sm:text-[15.5px] leading-[1.6] font-medium tracking-normal mb-8 max-w-xl"
          >
            En Odontofamilia realizamos tu primera consulta odontológica gratuita de 30 min en Palma o Manacor, con exploración inicial, diagnóstico explicado, presupuesto sin compromiso y opciones de financiación.
          </motion.p>

          {/* Big custom gradient button matching the site parameters */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenBooking && onOpenBooking()}
              className="cursor-pointer inline-flex items-center justify-center gap-2.5 px-8.5 py-4 bg-gradient-to-r from-[#2563eb] to-[#00b999] hover:from-[#1d4ed8] hover:to-[#00a88b] text-white font-extrabold text-sm sm:text-base rounded-full shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all group"
            >
              <Calendar className="w-5 h-5 text-emerald-300 group-hover:rotate-6 transition-transform" />
              <span>Reservar cita hoy mismo</span>
            </motion.button>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
