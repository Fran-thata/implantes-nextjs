import React from 'react';
import { motion } from 'motion/react';
import { 
  ClipboardCheck, 
  Stethoscope, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Smile, 
  Heart, 
  Clock, 
  Coins 
} from 'lucide-react';

export default function ImplantsProcess() {
  const steps = [
    {
      num: '1',
      title: 'Primera visita gratuita: diagnóstico y planificación',
      desc: 'Exploración completa con radiografía panorámica. Evaluamos el volumen óseo, el estado de las encías y la oclusión. Te explicamos qué necesitas, cuántas visitas implica y cuánto cuesta — sin compromiso.',
      icon: ClipboardCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-100',
    },
    {
      num: '2',
      title: 'Preparación',
      desc: 'Si hay infección activa, caries pendientes o periodontitis, se tratan antes de implantar. En casos con pérdida ósea, valoramos la regeneración ósea previa o simultánea a la cirugía.',
      icon: Stethoscope,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 border-indigo-100',
    },
    {
      num: '3',
      title: 'Cirugía de colocación',
      desc: 'Con anestesia local, sin dolor. Insertamos el implante de titanio de alta calidad con precisión milimétrica. En casos de carga inmediata, colocamos la corona provisional en la misma sesión.',
      icon: Compass,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 border-pink-100',
    },
    {
      num: '4',
      title: 'Osteointegración',
      desc: 'Durante 2 a 4 meses el hueso crece alrededor del implante y lo fija de forma permanente. En este período llevas la provisional — tienes el diente, pero sin carga masticatoria completa.',
      icon: Clock,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-100',
    },
    {
      num: '5',
      title: 'Corona definitiva',
      desc: 'Tomamos las medidas y fabricamos la corona a medida. Se ajusta en color, forma y mordida. A partir de ahí funciona como un diente natural — cepíllalo igual.',
      icon: Smile,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-100',
    }
  ];

  const benefits = [
    {
      title: 'Implantes de alta calidad',
      desc: 'Usamos implantes de titanio de la más alta calidad, con la mayor tasa de éxito y durabilidad demostrada. Un implante bien colocado, con el material adecuado y un seguimiento correcto, dura toda la vida.',
      icon: ShieldCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50/50'
    },
    {
      title: 'Especialistas con trayectoria',
      desc: 'Somos odontólogos colegiados con más de 12 años de experiencia clínica, especializados en implantología y rehabilitación oral. Tenemos clínicas en Palma y Manacor para que puedas hacer el tratamiento completo sin cambiar de equipo ni de protocolo.',
      icon: Heart,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50/50'
    },
    {
      title: 'Financiación a tu medida',
      desc: 'Ofrecemos financiación flexible para que el coste no sea una barrera. Y la primera visita es gratuita — sin compromiso, con diagnóstico incluido.',
      icon: Coins,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50/50'
    }
  ];

  return (
    <section id="proceso" className="relative py-16 md:py-24 bg-white border-b border-slate-100 overflow-hidden scroll-mt-20">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-slate-50/60 rounded-full blur-[100px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-20 md:space-y-28">
        
        {/* SECTION 1: CÓMO ES EL PROCESO DE COLOCACIÓN DE LA IMPLANTOLOGÍA DENTAL */}
        <div>
          <div className="text-left md:text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-750 border border-blue-150 rounded-full font-bold text-[10px] tracking-wider uppercase mb-3 leading-none select-none">
              Fase por fase
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-4">
              Cómo es el proceso de colocación de la implantología dental
            </h2>
          </div>

          {/* Steppes Vertical-Horizontal Hybrid Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              const lineColors: Record<string, string> = {
                '1': 'from-blue-500 to-sky-400',
                '2': 'from-indigo-500 to-blue-500',
                '3': 'from-pink-500 to-rose-400',
                '4': 'from-emerald-500 to-teal-400',
                '5': 'from-purple-500 to-indigo-500',
              };

              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 32, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 90,
                    damping: 14,
                    delay: idx * 0.12 
                  }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between h-full relative hover:bg-white hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-2 hover:border-slate-250 transition-all duration-300 ease-out group overflow-hidden"
                >
                  {/* Glowing Top Color Accent */}
                  <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${lineColors[step.num]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      {/* Header step number */}
                      <div className="flex items-center justify-between mb-6 select-none">
                        <div className={`w-11 h-11 rounded-xl ${step.bgColor} ${step.color} flex items-center justify-center border shadow-xs transform group-hover:rotate-3 group-hover:scale-105 transition-all duration-300`}>
                          <IconComp className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        
                        {/* Outstanding High-Contrast Step Number */}
                        <div className="flex items-baseline gap-1 pt-1">
                          <span className="text-[9px] font-extrabold tracking-widest text-slate-400 group-hover:text-slate-500 transition-colors uppercase mr-0.5">
                            PASO
                          </span>
                          <span className={`font-sans text-4xl sm:text-5xl font-extrabold bg-gradient-to-br ${lineColors[step.num]} bg-clip-text text-transparent leading-none tracking-tighter transform group-hover:scale-108 transition-all duration-300`}>
                            0{step.num}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-extrabold text-[#0f172a] text-sm sm:text-[15px] mb-2 leading-snug tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-slate-650 text-xs sm:text-[13px] leading-relaxed font-semibold">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Connecting Line effect for larger devices */}
                  {idx < 4 && (
                    <div className="hidden lg:block absolute top-[28px] -right-3.5 w-[15px] h-[2px] bg-slate-200 z-10 group-hover:bg-blue-300/60 transition-colors duration-300" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: POR QUÉ ELEGIR ODONTOFAMILIA PARA TUS IMPLANTES DENTALES */}
        <div id="por-que-elegir" className="scroll-mt-24">
          <div className="text-left md:text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fef3c7] text-[#b45309] border border-[#fde68a] rounded-full font-bold text-[10px] tracking-wider uppercase mb-3 leading-none select-none">
              Garantía y Seguridad
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-4">
              Por qué elegir Odontofamilia para tus implantes dentales
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Beautiful Professional Photo */}
            <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-start">
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50 aspect-[4/5] w-full max-w-[280px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-full transition-transform duration-350 hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800&h=1000"
                  alt="Instalaciones modernas de la clínica Odontofamilia"
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/50 via-slate-900/0 p-5 flex flex-col justify-end">
                  <div className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400">Instalaciones Médicas</div>
                  <div className="text-white text-xs font-extrabold">Tecnología de vanguardia y máxima seguridad</div>
                </div>
              </div>
            </div>

            {/* Right Column: Benefits Column stacked vertically */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {benefits.map((benefit, idx) => {
                const IconComp = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-7 flex gap-4 items-start hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`w-11 h-11 rounded-xl ${benefit.bgColor} ${benefit.color} flex items-center justify-center border border-white shrink-0 mt-0.5 shadow-sm`}>
                      <IconComp className="w-5.5 h-5.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight mb-1.5">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-650 text-xs sm:text-[13.5px] leading-relaxed font-semibold">
                        {benefit.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
