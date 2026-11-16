import React from 'react';
import { CLINICS } from '../data';
import { Clock, Phone, MapPin, ExternalLink, Calendar } from 'lucide-react';

interface LocationsProps {
  onOpenBooking: (preferredClinicId?: 'palma' | 'manacor', preferredTreatmentId?: string) => void;
}

export default function Locations({ onOpenBooking }: LocationsProps) {
  const palmaClinic = CLINICS.find(c => c.id === 'palma') || CLINICS[0];
  const manacorClinic = CLINICS.find(c => c.id === 'manacor') || CLINICS[1] || CLINICS[0];

  return (
    <section id="servicios" className="py-24 bg-white border-t border-slate-100 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16">
          <span className="text-blue-600 font-extrabold text-xs sm:text-[13px] tracking-wider uppercase block mb-2">
            Nuestros Centros de Urgencia
          </span>
          <h2 className="text-3xl md:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Clínicas de urgencias dentales en Manacor y Palma de Mallorca
          </h2>
          <p className="text-slate-500 font-medium text-xs sm:text-sm md:text-base mt-2">
            Encuéntranos en Manacor (Llevant) o Palma de Mallorca, con fácil acceso y atención prioritaria gratuita.
          </p>
        </div>

        {/* Side by side locations layout following the exact user reference design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Column left: Palma de Mallorca */}
          <div id="sede-palma" className="scroll-mt-28 flex flex-col bg-slate-50/55 p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-100 text-blue-700 font-extrabold text-[10px] sm:text-[11px] tracking-widest uppercase rounded-full mb-5 w-fit leading-none">
              Sede Principal Palma
            </span>

            {/* Embedded map card with elegant rounded corner layout */}
            <div className="relative w-full h-[260px] sm:h-[320px] rounded-2xl overflow-hidden border border-slate-200 bg-white">
              <iframe
                src={palmaClinic.googleMapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Clínica dental Odonto Familia Palma de Mallorca"
              />
            </div>

            {/* Typography and info block matching screenshot */}
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">
                  Clínica Palma Centro
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  C/ de Lluís Martí 50, Palma de Mallorca (frente a Parque de las Estaciones)
                </p>
              </div>

              {/* Precise icons and contact properties styled like reference */}
              <div className="space-y-3.5 pt-2">
                
                {/* Hours row */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 shrink-0 border border-blue-100">
                    <Clock className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-slate-700 font-semibold text-xs sm:text-sm">
                    Lunes a viernes: 9:00-13:00 / 16:00-20:00 (Urgencias en el acto)
                  </span>
                </div>

                {/* Telephone row */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 shrink-0 border border-red-100 animate-pulse">
                    <Phone className="w-4 h-4 stroke-[2.2] fill-red-600/10" />
                  </div>
                  <a 
                    href="tel:+34673780895"
                    className="text-red-600 font-extrabold text-xs sm:text-sm md:text-base hover:underline transition-all"
                  >
                    Tel. urgencias: +34 673 780 895
                  </a>
                </div>

              </div>

              {/* Call to action buttons styled cleanly */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+34673780895"
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl py-3.5 px-5 shadow-md flex items-center justify-center gap-2 transition-all text-center flex-1"
                >
                  <Phone className="w-4 h-4" />
                  <span>Llamar ahora</span>
                </a>
                
                <button
                  onClick={() => onOpenBooking('palma')}
                  className="cursor-pointer border border-neutral-300 hover:border-slate-800 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl py-3.5 px-4 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-slate-600" />
                  <span>Pedir cita de urgencia online</span>
                </button>
              </div>

            </div>

          </div>

          {/* Column right: Manacor */}
          <div id="sede-manacor" className="scroll-mt-28 flex flex-col bg-slate-50/55 p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-100 text-emerald-700 font-extrabold text-[10px] sm:text-[11px] tracking-widest uppercase rounded-full mb-5 w-fit leading-none">
              Sede Manacor Llevant
            </span>

            {/* Embedded map card with elegant rounded corner layout */}
            <div className="relative w-full h-[260px] sm:h-[320px] rounded-2xl overflow-hidden border border-slate-200 bg-white">
              <iframe
                src={manacorClinic.googleMapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Clínica dental Odonto Familia Manacor"
              />
            </div>

            {/* Typography and info block matching screenshot */}
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">
                  Clínica Manacor
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  Avinguda d'es Torrent 35, Manacor (zona de Llevant y la Part Forana)
                </p>
              </div>

              {/* Precise icons and contact properties styled like reference */}
              <div className="space-y-3.5 pt-2">
                
                {/* Hours row */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 shrink-0 border border-blue-100">
                    <Clock className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-slate-700 font-semibold text-xs sm:text-sm">
                    Lunes a viernes: 9:00-13:00 / 16:00-20:00 (Urgencias en el acto)
                  </span>
                </div>

                {/* Telephone row */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-100">
                    <Phone className="w-4 h-4 stroke-[2.2] fill-emerald-600/10" />
                  </div>
                  <a 
                    href="tel:+34647461382"
                    className="text-emerald-700 font-extrabold text-xs sm:text-sm md:text-base hover:underline transition-all"
                  >
                    Tel. urgencias: +34 647 461 382
                  </a>
                </div>

              </div>

              {/* Call to action buttons styled cleanly */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+34647461382"
                  className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl py-3.5 px-5 shadow-md flex items-center justify-center gap-2 transition-all text-center flex-1"
                >
                  <Phone className="w-4 h-4" />
                  <span>Llamar ahora</span>
                </a>
                
                <button
                  onClick={() => onOpenBooking('manacor')}
                  className="cursor-pointer border border-neutral-300 hover:border-slate-800 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl py-3.5 px-4 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-slate-600" />
                  <span>Pedir cita de urgencia online</span>
                </button>
              </div>

            </div>

          </div>

        </div>



      </div>
    </section>
  );
}
