import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Crosshair, Sparkles } from 'lucide-react';

export default function WhatAreImplants() {
  const imageUrl = 'https://res.cloudinary.com/ddpujsrsg/image/upload/v1779525492/ChatGPT_Image_May_23_2026_10_37_56_AM_djc8w4.png';

  return (
    <section id="que-son" className="relative py-16 md:py-24 bg-white overflow-hidden scroll-mt-20">
      
      {/* Subtle organic background decoration */}
      <div className="absolute top-1/3 -left-36 w-[350px] h-[350px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none select-none" />
      <div className="absolute bottom-1/4 -right-36 w-[350px] h-[350px] bg-emerald-50/40 rounded-full blur-[100px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Visual Representation */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            <div className="relative w-full h-[360px] md:h-[440px] rounded-[24px] overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
              <img 
                src={imageUrl} 
                alt="Instalaciones de Odontofamilia" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Copy text block exactly as requested */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center">
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight leading-tight mb-6">
              ¿Qué son los implantes dentales?
            </h2>

            <div className="space-y-6 text-slate-650 text-base md:text-[17px] leading-relaxed font-semibold">
              <p>
                Un implante dental es una raíz de titanio que se coloca en el hueso maxilar o mandibular para sustituir un diente perdido. Una vez integrado al hueso — en un proceso llamado <strong className="text-blue-900 font-extrabold">osteointegración</strong> — actúa exactamente igual que una raíz natural: absorbe la carga masticatoria, estimula el hueso e impide que se reabsorba.
              </p>
              
              <p>
                Sobre esa raíz se fija una <strong className="font-extrabold text-blue-900">corona de zirconio a medida</strong>. El resultado es fijo, estable y permanente — y visualmente indistinguible del diente original.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
