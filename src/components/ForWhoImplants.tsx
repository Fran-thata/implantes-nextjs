import React from 'react';
import { HeartPulse } from 'lucide-react';

export default function ForWhoImplants() {
  return (
    <section id="para-quien" className="relative py-16 md:py-24 bg-white overflow-hidden scroll-mt-20">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-8 flex flex-col items-start justify-center">

            <h2 className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              ¿Para quién son los implantes dentales?
            </h2>

            <div className="space-y-6 text-slate-600 text-base md:text-[17px] leading-relaxed font-semibold max-w-2xl">
              <p>
                Los implantes son la solución indicada si has perdido uno o varios dientes y quieres <strong className="text-slate-900 font-extrabold">una solución fija</strong> — no una prótesis que se quita y se pone.
              </p>

              <p>
                Son especialmente adecuados si llevas tiempo con una brecha dental y el hueso empieza a reabsorberse, si tienes una prótesis removible que no te encaja bien, o si perdiste un diente por caries profunda, traumatismo, avulsión o periodontitis y quieres recuperar la función masticatoria real sin tocar los dientes sanos de al lado.
              </p>

              <div className="flex gap-4 mt-8">
                <div className="w-1.5 bg-emerald-500 rounded-full shrink-0" />
                <div className="pl-1">
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 mb-1.5">La edad no es un límite</div>
                  <p className="text-sm md:text-base text-slate-500 font-semibold leading-relaxed">
                    Se pueden colocar implantes <strong className="text-slate-900 font-extrabold">desde los 18 años</strong> — cuando el desarrollo óseo está completo — sin límite superior. Lo que determina si eres candidato es el estado de tu hueso, tus encías y tu salud general, no los años que tienes.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Beautiful Photo */}
          <div className="lg:col-span-4 relative w-full flex justify-center lg:justify-end">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-md border border-slate-100 bg-slate-50 aspect-[4/5] w-full max-w-[280px] sm:max-w-[320px] transition-transform duration-350 hover:scale-[1.02]">
              <img
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800&h=1000"
                alt="Paciente de clínica dental sonriendo con confianza"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/40 via-slate-900/0 p-5 flex flex-col justify-end">
                <div className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-400">Tratamiento de Confianza</div>
                <div className="text-white text-xs font-extrabold">Sonrisa natural y duradera</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
