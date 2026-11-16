import React from 'react';
import { Appointment } from '../types';
import { CLINICS, TREATMENTS } from '../data';
import { Calendar, Trash2, X, BellDot, Heart, Clock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardProps {
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onOpenBooking: () => void;
}

export default function Dashboard({ appointments, onCancelAppointment, onOpenBooking }: DashboardProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [confirmCancelId, setConfirmCancelId] = React.useState<string | null>(null);

  if (appointments.length === 0) return null;

  const count = appointments.length;

  const getClinicCity = (clinicId: 'palma' | 'manacor') => {
    const c = CLINICS.find(item => item.id === clinicId);
    return c ? `Sede ${c.city}` : 'Odonto Familia';
  };

  const getTreatmentName = (treatmentId: string) => {
    const t = TREATMENTS.find(item => item.id === treatmentId);
    return t ? t.name : 'Primera Cita Gratuita';
  };

  const getSpecialistName = (treatmentId: string) => {
    const t = TREATMENTS.find(item => item.id === treatmentId);
    return t ? t.specialist : 'Dentista de guardia';
  };

  const calculateDaysLeft = (dateStr: string) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const apptDate = new Date(dateStr);
      apptDate.setHours(0, 0, 0, 0);

      const diffMs = apptDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return '¡Hoy!';
      if (diffDays === 1) return 'Mañana';
      if (diffDays < 0) return 'Pasada';
      return `En ${diffDays} días`;
    } catch (e) {
      return '';
    }
  };

  return (
    <>
      {/* Small floating bubble launcher at the bottom corner */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={() => setIsOpen(true)}
          className="cursor-pointer bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-extrabold text-xs py-3 px-5 rounded-full shadow-2xl flex items-center gap-2 transition-all relative"
        >
          <BellDot className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Mis Citas</span>
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] flex items-center justify-center">
            {count}
          </span>
        </motion.button>
      </div>

      {/* Slide-over appointments list board */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* Dark mask backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs"
            />

            {/* Slide-over panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative bg-white w-full max-w-md h-full shadow-2xl border-l border-slate-100 flex flex-col justify-between z-10"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm md:text-base">
                      Tus Citas Programadas
                    </h3>
                    <p className="text-slate-500 text-[11px] font-medium">
                      Control de reservas para {appointments[0]?.patientName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 px-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tickets Area scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {appointments.map((appt) => {
                  const daysLeft = calculateDaysLeft(appt.date);
                  const isConfirming = confirmCancelId === appt.id;

                  return (
                    <div 
                      key={appt.id}
                      className="bg-slate-50 border border-slate-200 rounded-3xl p-5 relative overflow-hidden shadow-sm"
                    >
                      <div className="absolute top-0 inset-x-0 h-1 bg-blue-600" />

                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Tratamiento</span>
                          <span className="text-sm font-black text-slate-900">{getTreatmentName(appt.treatmentId)}</span>
                        </div>

                        <span className="bg-blue-100 text-blue-800 text-[10px] font-bold py-0.5 px-2 rounded-full">
                          {daysLeft}
                        </span>
                      </div>

                      <div className="space-y-2 text-xs md:text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-400">Sede:</span>
                          <span className="text-slate-800 font-medium">{getClinicCity(appt.clinicId)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-400">Médico:</span>
                          <span className="text-slate-800 font-medium">{getSpecialistName(appt.treatmentId)}</span>
                        </div>

                        <div className="flex items-center gap-2 text-blue-900 font-extrabold bg-blue-50/50 p-2 rounded-xl mt-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span>{appt.date} a las {appt.timeSlot}h</span>
                        </div>
                      </div>

                      {/* Cancel Panel inline */}
                      <AnimatePresence mode="wait">
                        {isConfirming ? (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 mt-4 flex items-center justify-between text-xs"
                          >
                            <span className="text-rose-900 font-bold flex items-center gap-1.5 leading-snug">
                              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                              ¿Seguro que deseas <br className="hidden sm:inline" /> cancelar la cita?
                            </span>
                            
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => setConfirmCancelId(null)}
                                className="cursor-pointer bg-white border border-rose-300 text-slate-700 py-1.5 px-3 rounded-lg font-bold"
                              >
                                No
                              </button>
                              <button
                                onClick={() => {
                                  onCancelAppointment(appt.id);
                                  setConfirmCancelId(null);
                                }}
                                className="cursor-pointer bg-rose-600 text-white py-1.5 px-3 rounded-lg font-bold"
                              >
                                Sí, Cancelar
                              </button>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="flex justify-end pt-3 mt-3 border-t border-slate-200/50">
                            <button
                              onClick={() => setConfirmCancelId(appt.id)}
                              className="cursor-pointer text-xs font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-50 py-1.5 px-3.5 rounded-full flex items-center gap-1.5 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Cancelar Reserva
                            </button>
                          </div>
                        )}
                      </AnimatePresence>

                    </div>
                  );
                })}
              </div>

              {/* Patient reassurance banner */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-500">
                  <Heart className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Si necesitas reprogramar de urgencia o cambiar de especialidad médica, también puedes llamarnos directamente a tu clínica de referencia sin coste adicional.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBooking();
                  }}
                  className="cursor-pointer w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs md:text-sm py-3 rounded-xl text-center"
                >
                  Agendar Nueva Cita Adicional
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}
