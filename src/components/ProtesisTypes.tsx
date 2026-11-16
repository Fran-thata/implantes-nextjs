import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Smile, 
  Activity, 
  ShieldCheck, 
  Layers,
  Heart
} from 'lucide-react';

interface ProtesisTypesProps {
  onOpenBooking: () => void;
}

export default function ProtesisTypes({ onOpenBooking }: ProtesisTypesProps) {
  const categories = [
    {
      title: 'Implante unitario',
      desc: 'Sustituye un solo diente perdido sin tocar los dientes vecinos. El implante actúa como raíz y la corona de zirconio como diente — el resultado es indistinguible del natural.',
      icon: Layers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-slate-100'
    },
    {
      title: 'Carga inmediata',
      desc: 'En casos seleccionados, implante y corona provisional en la misma sesión. Sales con el diente fijo ese mismo día. Lo valoramos con TAC 3D en la primera visita.',
      icon: Zap,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-slate-100'
    },
    {
      title: 'Implante en zona estética',
      desc: 'Los dientes anteriores exigen precisión milimétrica. Trabajamos con guía quirúrgica digital para que la posición, el perfil de emergencia y el tono de la corona sean naturales desde el primer día.',
      icon: Smile,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-slate-100'
    },
    {
      title: 'Implantes con poco hueso',
      desc: 'La pérdida ósea no siempre impide implantar. Con técnicas de regeneración ósea guiada resolvemos la mayoría de casos que otros descartan.',
      icon: Activity,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-slate-100'
    },
    {
      title: 'Rehabilitación oral completa sobre implantes',
      desc: 'Cuando la pérdida dental es múltiple o total, rehabilitamos la boca completa con implantes como soporte. Una solución fija, estable y definitiva para recuperar la función masticatoria real y la estética de la sonrisa.',
      icon: ShieldCheck,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-50'
    }
  ];

  return (
    <section id="protesis-realizadas" className="relative py-16 md:py-24 bg-slate-50 border-y border-slate-100 overflow-hidden scroll-mt-20">
      
      {/* Absolute Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-blue-100/30 rounded-full blur-[110px] pointer-events-none select-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-emerald-100/30 rounded-full blur-[110px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        
        {/* Headline */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0f172a] max-w-3xl mx-auto mb-4 leading-tight">
          Tipos de prótesis dentales que realizamos
        </h2>
        
        <p className="text-center text-slate-500 text-sm md:text-base max-w-xl mx-auto font-semibold mb-12">
          Ofrecemos todas las alternativas en implantología avanzada con la tecnología más moderna
        </p>

        {/* Elegant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 lg:gap-8 justify-center">
          {categories.map((item, idx) => {
            const IconComponent = item.icon;
            
            // Layout alignment matching:
            // Top row: Card 1 (cols 1-2), Card 2 (cols 3-4), Card 3 (cols 5-6)
            // Bottom row: Empty (col 1), Card 4 (cols 2-3), Card 5 (cols 4-5), Empty (col 6)
            let alignmentClasses = "col-span-1 md:col-span-2 md:col-start-auto";
            if (idx === 3) {
              alignmentClasses = "col-span-1 md:col-span-2 md:col-start-2";
            } else if (idx === 4) {
              alignmentClasses = "col-span-1 md:col-span-2 md:col-start-4";
            }

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`bg-white border ${item.borderColor} p-6 sm:p-8 rounded-2xl flex flex-col items-center text-center justify-between h-full transition-all duration-300 shadow-xs hover:shadow-md ${alignmentClasses}`}
              >
                <div className="flex flex-col items-center">
                  {/* Icon Frame */}
                  <div className={`w-11 h-11 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center mb-5 shrink-0 border border-white mx-auto`}>
                    <IconComponent className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  {/* Title and Body */}
                  <h3 className="font-extrabold text-lg text-slate-900 tracking-tight mb-3 text-center">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-[13.5px] sm:text-sm leading-relaxed font-semibold text-center">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between w-full">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                    Tratamiento Clínico
                  </span>
                  
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-50 leading-none py-1 px-2.5 rounded-full select-none">
                    Especialidad {idx + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clinical Diagnostics Call-to-Action banner */}
        <div className="mt-16 relative w-full overflow-hidden bg-slate-950 rounded-2xl shadow-xl select-none">
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600" 
              alt="Instalaciones de Odontofamilia" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative z-10 w-full py-10 px-6 sm:px-10 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl text-left">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-500/10 border border-blue-400/30 rounded-full mb-3 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                  Primera Visita Gratuita
                </span>
              </span>
              <h2 className="text-white text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
                Deja de vivir con un hueco en la boca
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold mt-2.5 max-w-2xl">
                Un implante de titanio que se funde con tu hueso y aguanta toda la vida. Comes normal, sonríes normal, te olvidas de que lo tienes. Eso es lo que hace un buen implante.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <a 
                href="tel:+34647461382"
                className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all text-center"
              >
                <span>Llamar ahora</span>
              </a>
              
              <button
                onClick={onOpenBooking}
                className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs sm:text-sm rounded-full border border-white/10 shadow-sm transition-all text-center"
              >
                <span>Pedir cita gratis</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
