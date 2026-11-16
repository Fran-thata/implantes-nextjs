import React from 'react';
import { motion } from 'motion/react';
import { User } from 'lucide-react';

export default function Dentists() {
  const team = [
    {
      name: 'Yamilet',
      specialty: 'Dentista principal',
      desc: 'Especialista en salud oral, diagnóstico dental y tratamientos personalizados.',
      image: 'https://res.cloudinary.com/ddpujsrsg/image/upload/v1779544440/ChatGPT_Image_May_23_2026_03_53_46_PM_foeala.png',
      color: 'text-[#2563eb]',
      bgAccent: 'bg-blue-50/60'
    },
    {
      name: 'Alfredo Muñoz',
      specialty: 'Odontología general',
      desc: 'Diagnóstico, prevención y tratamientos conservadores para toda la familia.',
      image: 'https://res.cloudinary.com/ddpujsrsg/image/upload/v1779794374/ChatGPT_Image_May_24_2026_01_26_23_PM_l0x05m.png',
      color: 'text-emerald-600',
      bgAccent: 'bg-emerald-50/60',
      imagePosition: 'center 30%'
    },
    {
      name: 'Liliana Flores',
      specialty: 'Dentista especializada',
      desc: 'Tratamientos avanzados y planificación personalizada para cada paciente.',
      image: 'https://res.cloudinary.com/ddpujsrsg/image/upload/v1779544353/ChatGPT_Image_May_23_2026_03_52_13_PM_wgpxzc.png',
      color: 'text-purple-600',
      bgAccent: 'bg-purple-50/60'
    }
  ];

  return (
    <section id="equipo" className="relative py-20 bg-white overflow-hidden scroll-mt-20">
      
      {/* Absolute decorative background dot patterns from the reference photo */}
      <div className="absolute top-1/2 -right-6 -translate-y-1/2 md:block hidden opacity-30 select-none pointer-events-none">
        <svg width="60" height="200" viewBox="0 0 60 200" fill="none">
          <circle cx="10" cy="10" r="3" fill="#3b82f6" />
          <circle cx="30" cy="10" r="3" fill="#3b82f6" />
          <circle cx="50" cy="10" r="3" fill="#3b82f6" />
          <circle cx="10" cy="30" r="3" fill="#3b82f6" />
          <circle cx="30" cy="30" r="3" fill="#3b82f6" />
          <circle cx="50" cy="30" r="3" fill="#3b82f6" />
          <circle cx="10" cy="50" r="3" fill="#3b82f6" />
          <circle cx="30" cy="50" r="3" fill="#3b82f6" />
          <circle cx="50" cy="50" r="3" fill="#3b82f6" />
          <circle cx="10" cy="70" r="3" fill="#3b82f6" />
          <circle cx="30" cy="70" r="3" fill="#3b82f6" />
          <circle cx="50" cy="70" r="3" fill="#3b82f6" />
          <circle cx="10" cy="90" r="3" fill="#3b82f6" />
          <circle cx="30" cy="90" r="3" fill="#3b82f6" />
          <circle cx="50" cy="90" r="3" fill="#3b82f6" />
          <circle cx="10" cy="110" r="3" fill="#3b82f6" />
          <circle cx="30" cy="110" r="3" fill="#3b82f6" />
          <circle cx="50" cy="110" r="3" fill="#3b82f6" />
          <circle cx="10" cy="130" r="3" fill="#3b82f6" />
          <circle cx="30" cy="130" r="3" fill="#3b82f6" />
          <circle cx="50" cy="130" r="3" fill="#3b82f6" />
          <circle cx="10" cy="150" r="3" fill="#3b82f6" />
          <circle cx="30" cy="150" r="3" fill="#3b82f6" />
          <circle cx="50" cy="150" r="3" fill="#3b82f6" />
          <circle cx="10" cy="170" r="3" fill="#3b82f6" />
          <circle cx="30" cy="170" r="3" fill="#3b82f6" />
          <circle cx="50" cy="170" r="3" fill="#3b82f6" />
          <circle cx="10" cy="190" r="3" fill="#3b82f6" />
          <circle cx="30" cy="190" r="3" fill="#3b82f6" />
          <circle cx="50" cy="190" r="3" fill="#3b82f6" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Upper Pill Section Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-[#eef5ff] border border-blue-200/50 text-[#2563eb] rounded-full font-bold text-xs sm:text-[13px] tracking-wide select-none shadow-sm">
            <User className="w-4 h-4 text-[#2563eb]" />
            Nuestro equipo
          </span>
        </div>

        {/* Display Big Center Title exact as shown in photo */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto px-2">
          Dentistas especializados para<br />
          cada <span className="text-[#2563eb] font-extrabold">tratamiento dental</span>
        </h2>

        {/* Subtitle text */}
        <p className="text-center text-slate-500/90 text-sm sm:text-base font-medium max-w-3xl mx-auto px-4 mt-4 mb-16 leading-relaxed">
          Un equipo formado por odontólogos especializados en diferentes áreas para ofrecerte un diagnóstico claro y el tratamiento más adecuado en cada caso.
        </p>

        {/* Grid System for Dentist Members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[28px] overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
            >
              
              {/* Profile Image container */}
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-100">
                <img 
                  src={member.image} 
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: member.imagePosition || 'center' }}
                />
              </div>

              {/* Text content details */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {member.name}
                  </h3>
                  
                  <span className={`inline-block text-xs sm:text-[13px] font-bold ${member.color} tracking-wide mt-1.5`}>
                    {member.specialty}
                  </span>
                  
                  <p className="text-slate-500/95 text-xs sm:text-sm font-medium leading-relaxed mt-3.5">
                    {member.desc}
                  </p>
                </div>

                {/* Arrow Action element */}
                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center">
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13.5px] font-bold text-[#2563eb] group-hover:underline">
                    Ver perfil
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
