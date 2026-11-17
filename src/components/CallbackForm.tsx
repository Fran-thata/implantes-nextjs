import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, CheckCircle2, Building2, MessageSquarePlus, User, PhoneCall, Mail } from 'lucide-react';

export default function CallbackForm() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [clinica, setClinica] = useState('Clínica Palma (C/ de Lluís Martí 50)');
  const [motivo, setMotivo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sending form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);

      // Save submission to local history
      const savedSubmissions = (typeof window !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }).getItem('odontofamilia_callback_leads');
      const leads = savedSubmissions ? JSON.parse(savedSubmissions) : [];
      leads.push({
        nombre,
        telefono,
        email,
        clinica,
        motivo: motivo || 'No especificado',
        mensaje,
        date: new Date().toISOString()
      });
      (typeof window !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }).setItem('odontofamilia_callback_leads', JSON.stringify(leads));

      // Reset
      setNombre('');
      setTelefono('');
      setEmail('');
      setClinica('Clínica Palma (C/ de Lluís Martí 50)');
      setMotivo('');
      setMensaje('');
    }, 1200);
  };

  return (
    <section id="te-llamamos" className="relative py-20 bg-gradient-to-b from-white via-[#f0f7ff]/20 to-[#f8fafc] overflow-hidden scroll-mt-20">
      
      {/* Absolute decorative details and glows */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-72 h-72 bg-blue-50/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-emerald-50/40 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Dot Layout Pattern for tech aesthetics */}
      <div className="absolute left-6 bottom-16 opacity-[0.15] md:block hidden select-none pointer-events-none">
        <svg width="100" height="150" viewBox="0 0 100 150" fill="none">
          {Array.from({ length: 35 }).map((_, i) => (
            <circle key={i} cx={10 + (i % 5) * 20} cy={10 + Math.floor(i / 5) * 20} r="2.5" fill="#2563eb" />
          ))}
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full">
        
        {/* Main Card/Container with soft borders and light shadow resembling premium feedback card */}
        <div className="bg-white border border-blue-100 rounded-[32px] shadow-xl shadow-blue-900/5 p-6 sm:p-10 md:p-12">
          
          <div className="text-center md:text-left max-w-3xl mb-10">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#eef5ff] border border-blue-200/40 text-[#2563eb] rounded-full font-extrabold text-xs sm:text-[12.5px] tracking-wide shadow-sm mb-4">
              <Phone className="w-3.5 h-3.5 animate-bounce text-[#2563eb]" />
              Contacto Telefónico
            </div>

            {/* Custom big requested title */}
            <h2 className="text-2xl sm:text-3xl md:text-[36px] font-extrabold text-slate-900 tracking-tight leading-[1.2]">
              Te llamamos para ayudarte con tu tratamiento odontológico
            </h2>

            {/* Description exactly as provided */}
            <p className="text-slate-500/95 text-xs sm:text-sm md:text-[15px] font-medium leading-relaxed mt-4">
              Déjanos tus datos y el equipo de Odontofamilia contactará contigo para resolver tus dudas y ayudarte a pedir cita en Palma o Manacor. Realizamos valoración y diagnóstico inicial sin coste.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center text-center max-w-lg mx-auto"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 mb-6 shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  ¡Solicitud recibida correctamente!
                </h3>
                <p className="text-slate-500 font-medium text-xs sm:text-sm mt-3 leading-relaxed">
                  Muchas gracias por tu confianza. Un asesor especialista de Odontofamilia te llamará muy pronto para asesorarte y agendar tu primera consulta gratuita sin coste.
                </p>
                
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 cursor-pointer text-xs sm:text-sm font-extrabold text-[#2563eb] hover:text-blue-700 hover:underline inline-flex items-center gap-1"
                >
                  Pedir otra llamada distinta →
                </button>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 md:space-y-7"
              >
                {/* Horizontal inputs: Name, Phone & Email */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                  {/* Name field */}
                  <div className="flex flex-col">
                    <label className="text-xs sm:text-[13px] font-bold text-slate-700 mb-2 flex items-center gap-1.5 label-nombre">
                      <User className="w-3.5 h-3.5 text-blue-500" />
                      Nombre
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="Ej. María García"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full text-xs sm:text-sm py-3 px-4 bg-slate-50/70 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col">
                    <label className="text-xs sm:text-[13px] font-bold text-slate-700 mb-2 flex items-center gap-1.5 label-telefono">
                      <PhoneCall className="w-3.5 h-3.5 text-blue-500" />
                      Teléfono
                    </label>
                    <input 
                      type="tel"
                      required
                      placeholder="Ej. 600 000 000"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="w-full text-xs sm:text-sm py-3 px-4 bg-slate-50/70 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col">
                    <label className="text-xs sm:text-[13px] font-bold text-slate-700 mb-2 flex items-center gap-1.5 label-email">
                      <Mail className="w-3.5 h-3.5 text-blue-500" />
                      Email
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="Ej. maria@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs sm:text-sm py-3 px-4 bg-slate-50/70 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Sede Selector and Treatment Selector */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  
                  {/* Clinic field */}
                  <div className="flex flex-col">
                    <label className="text-xs sm:text-[13px] font-bold text-slate-700 mb-2 flex items-center gap-1.5 label-clinica">
                      <Building2 className="w-3.5 h-3.5 text-blue-500" />
                      Clínica
                    </label>
                    <select
                      value={clinica}
                      onChange={(e) => setClinica(e.target.value)}
                      className="w-full text-xs sm:text-sm py-3 px-4 bg-slate-50/70 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all font-semibold text-slate-800"
                    >
                      <option value="Clínica Palma (C/ de Lluís Martí 50)">Clínica Palma (C/ de Lluís Martí 50)</option>
                      <option value="Clínica Manacor (Avinguda d'es Torrent 35)">Clínica Manacor (Avinguda d'es Torrent 35)</option>
                    </select>
                  </div>

                  {/* Motivo field */}
                  <div className="flex flex-col">
                    <label className="text-xs sm:text-[13px] font-bold text-slate-700 mb-2 flex items-center gap-1.5 label-motivo">
                      <MessageSquarePlus className="w-3.5 h-3.5 text-blue-500" />
                      Motivo de consulta
                    </label>
                    <select
                      required
                      value={motivo}
                      onChange={(e) => setMotivo(e.target.value)}
                      className="w-full text-xs sm:text-sm py-3 px-4 bg-slate-50/70 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all font-semibold text-slate-800"
                    >
                      <option value="">-- Selecciona el tratamiento/motivo --</option>
                      <option value="Odontología general">Odontología general</option>
                      <option value="Implantes dentales">Implantes dentales</option>
                      <option value="Ortodoncia">Ortodoncia</option>
                      <option value="Prótesis dental">Prótesis dental</option>
                      <option value="Estética dental">Estética dental</option>
                      <option value="Urgencias dentales">Urgencias dentales</option>
                      <option value="Otro motivo">Otro motivo</option>
                    </select>
                  </div>

                </div>

                {/* Optional Custom Message */}
                <div className="flex flex-col">
                  <label className="text-xs sm:text-[13px] font-bold text-slate-700 mb-2 label-mensaje">
                    Mensaje (Opcional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Escribe aquí cualquier detalle o pregunta adicional..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    className="w-full text-xs sm:text-sm py-3 px-4 bg-slate-50/70 border border-slate-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all font-medium resize-none"
                  />
                </div>

                {/* Button Action Block */}
                <div className="pt-2 flex flex-col items-center justify-center">
                  
                  {/* Custom design requested button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    type="submit"
                    className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-gradient-to-r from-[#2563eb] to-[#00b999] hover:from-[#1d4ed8] hover:to-[#00a88b] text-white font-extrabold text-sm sm:text-base rounded-full shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 disabled:opacity-50"
                  >
                    <Phone className="w-5 h-5 text-emerald-300 shrink-0" />
                    <span>{isLoading ? 'Registrando...' : 'Quiero que me llamen'}</span>
                  </motion.button>

                  {/* Subtext required under button */}
                  <p className="text-center text-slate-400 text-[11px] sm:text-xs font-medium mt-3.5 leading-relaxed">
                    Te contactaremos para confirmar disponibilidad y orientarte antes de empezar.
                  </p>

                </div>

              </motion.form>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
