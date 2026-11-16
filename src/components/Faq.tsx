import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FaqItem[] = [
    {
      question: '¿En qué casos se puede hacer carga inmediata?',
      answer: 'Cuando hay suficiente estabilidad primaria del implante y el hueso es de buena calidad. No todos los casos son candidatos — lo valoramos en la primera visita con la radiografía. Si es posible, sales con el diente fijo ese mismo día.'
    },
    {
      question: '¿Qué pasa si tengo poco hueso?',
      answer: 'La pérdida ósea no siempre impide colocar un implante. En muchos casos se puede hacer regeneración ósea guiada simultánea a la cirugía. En otros se planifica una fase previa. Lo evaluamos con la radiografía panorámica en la primera visita.'
    },
    {
      question: '¿Cuánto cuesta un implante dental?',
      answer: 'Desde 500 €. El precio final depende del número de implantes, si se necesita regeneración ósea y el tipo de corona. En la primera visita gratuita te damos un presupuesto detallado sin sorpresas. Disponemos de financiación flexible para fraccionar el pago.'
    },
    {
      question: '¿Duele la cirugía de implante dental?',
      answer: 'La cirugía se realiza con anestesia local y es indolora durante el procedimiento. Las primeras 48-72 horas pueden aparecer molestias leves que se controlan bien con analgésicos habituales. La mayoría de pacientes retoman su vida normal al día siguiente.'
    },
    {
      question: '¿Es mejor un implante o un puente dental?',
      answer: 'El implante es la opción más conservadora: no toca los dientes vecinos, preserva el hueso y dura más. El puente requiere desgastar las piezas adyacentes y no evita la reabsorción ósea bajo la brecha. Si eres candidato a implante, siempre es la primera opción.'
    },
    {
      question: '¿Cuánto dura un implante dental?',
      answer: 'Con buena higiene y revisiones periódicas, un implante puede durar toda la vida. La clave está en el mantenimiento: igual que un diente natural, necesita cepillado diario, hilo interdental y revisiones anuales para detectar cualquier problema a tiempo.'
    }
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-16 md:py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden scroll-mt-20">
      
      {/* Subtle organic abstract background decor */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-5 w-80 h-80 bg-emerald-50/35 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 w-full">
        
        {/* Centered Small Badge */}
        <div className="flex justify-center mb-4 select-none">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 border border-blue-200/50 text-[#2563eb] rounded-full font-bold text-[11px] tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ implantes dentales
          </span>
        </div>

        {/* Big centered H2 title */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-12 max-w-2xl mx-auto leading-tight">
          Preguntas frecuentes sobre implantes dentales
        </h2>

        {/* List of Accordions */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                className="bg-white border border-slate-200/60 rounded-2xl shadow-xs hover:shadow-sm transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none group select-none"
                >
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base lg:text-[17px] leading-snug group-hover:text-blue-600 transition-colors">
                    {item.question}
                  </h3>
                  
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                    {isOpen ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-slate-50">
                        <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed font-semibold pt-4">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
