import React from 'react';
import { CLINICS, TREATMENTS, TIME_SLOTS } from '../data';
import { ClinicId, Appointment } from '../types';
import { 
  X, 
  MapPin, 
  Activity, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  CalendarCheck,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferredClinicId?: ClinicId;
  preferredTreatmentId?: string;
  onAppointmentBooked: (appointment: Appointment) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  preferredClinicId,
  preferredTreatmentId,
  onAppointmentBooked
}: BookingModalProps) {
  // Wizard state: 1 - Sede, 2 - Tratamiento, 3 - Fecha/Hora, 4 - Datos, 5 - Recibo Éxito
  const [step, setStep] = React.useState(1);
  const [selectedClinicId, setSelectedClinicId] = React.useState<ClinicId>('palma');
  const [selectedTreatmentId, setSelectedTreatmentId] = React.useState('implantologia');
  const [selectedDateStr, setSelectedDateStr] = React.useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState('');
  
  // Data Form fields
  const [patientName, setPatientName] = React.useState('');
  const [patientPhone, setPatientPhone] = React.useState('');
  const [patientEmail, setPatientEmail] = React.useState('');
  const [patientNotes, setPatientNotes] = React.useState('');

  const [completedAppointment, setCompletedAppointment] = React.useState<Appointment | null>(null);

  // Synchronize on parameters received from parent clicks
  React.useEffect(() => {
    if (preferredClinicId) {
      setSelectedClinicId(preferredClinicId);
    }
    if (preferredTreatmentId) {
      setSelectedTreatmentId(preferredTreatmentId);
    }
  }, [preferredClinicId, preferredTreatmentId, isOpen]);

  // Generate next 7 business dates programmatically (excluding Sundays & honoring Manacor Saturday closing)
  const getNextAvailableDates = () => {
    const list = [];
    const date = new Date();
    
    // Day names and month names in Spanish
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    let count = 0;
    while (count < 8) {
      // Offset day
      const checkDate = new Date();
      checkDate.setDate(date.getDate() + count);

      const dayOfWeek = checkDate.getDay(); // 0 is Sunday, 6 is Saturday
      
      let isClosed = false;
      if (dayOfWeek === 0) {
        isClosed = true; // Sunday is closed
      } else if (dayOfWeek === 6 && selectedClinicId === 'manacor') {
        isClosed = true; // Manacor is closed on Saturdays
      }

      if (!isClosed) {
        const dd = String(checkDate.getDate()).padStart(2, '0');
        const mm = String(checkDate.getMonth() + 1).padStart(2, '0');
        const yyyy = checkDate.getFullYear();
        const dateStr = `${yyyy}-${mm}-${dd}`;

        list.push({
          dateStr,
          dayNum: checkDate.getDate(),
          dayName: dayNames[dayOfWeek],
          monthName: monthNames[checkDate.getMonth()]
        });
      }
      count++;
    }
    return list;
  };

  const datesList = getNextAvailableDates();

  // Set default date if empty
  React.useEffect(() => {
    if (datesList.length > 0 && !selectedDateStr) {
      setSelectedDateStr(datesList[0].dateStr);
    }
  }, [selectedClinicId, datesList, selectedDateStr]);

  const chosenClinic = CLINICS.find(c => c.id === selectedClinicId) || CLINICS[0];
  const chosenTreatment = TREATMENTS.find(t => t.id === selectedTreatmentId) || TREATMENTS[0];

  const handleNextStep = () => {
    if (step === 1) {
      const clinic = CLINICS.find(c => c.id === selectedClinicId) || CLINICS[0];
      const targetPhone = clinic.id === 'palma' ? '34673780895' : '34647461382';
      const textMessage = `Hola, me gustaría solicitar mi primera cita gratuita en la Sede de ${clinic.city}.`;
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(textMessage)}`;
      
      window.open(whatsappUrl, '_blank', 'noreferrer,noopener');
      onClose();
      return;
    }
    if (step === 3 && !selectedTimeSlot) {
      alert('Por favor, selecciona una hora de consulta para continuar.');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim() || !patientEmail.trim()) {
      return;
    }

    const appt: Appointment = {
      id: 'ODF-' + Math.floor(100000 + Math.random() * 900000),
      clinicId: selectedClinicId,
      treatmentId: selectedTreatmentId,
      date: selectedDateStr,
      timeSlot: selectedTimeSlot,
      patientName,
      patientPhone,
      patientEmail,
      notes: patientNotes,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    setCompletedAppointment(appt);
    onAppointmentBooked(appt);
    setStep(5);
  };

  const handleResetAndClose = () => {
    // Reset Form
    setStep(1);
    setSelectedTimeSlot('');
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setPatientNotes('');
    setCompletedAppointment(null);
    onClose();
  };

  // Generate simulated ICS download file
  const handleDownloadICS = () => {
    if (!completedAppointment) return;
    try {
      const dateParts = completedAppointment.date.split('-');
      const hourParts = completedAppointment.timeSlot.split(':');
      
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];
      const hour = hourParts[0];
      const min = hourParts[1];

      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `DTSTART:${year}${month}${day}T${hour}${min}00`,
        `DTEND:${year}${month}${day}T${String(Number(hour) + 1).padStart(2, '0')}${min}00`,
        `SUMMARY:Cita Dental - Odonto Familia Sede ${selectedClinicId === 'palma' ? 'Palma' : 'Manacor'}`,
        `DESCRIPTION:Cita confirmada para ${patientName} - Tratamiento: ${chosenTreatment?.name}. Doctor responsable: ${chosenTreatment?.specialist || 'Dentista de guardia'}`,
        `LOCATION:Sede ${chosenClinic.city} - ${chosenClinic.address}`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `cita-odontofamilia-${completedAppointment.id}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      // Fallback
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
      />

      {/* Inside Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative bg-white max-w-xl w-full rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50 my-8"
      >
        {/* Banner header top */}
        <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-emerald-500 py-5 px-6 shrink-0 relative">
          <button 
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-emerald-300" />
            <span className="text-white/85 text-[10px] md:text-xs font-bold uppercase tracking-wider block">
              Asistente de Reservas Online
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
            {step === 5 ? '¡Cita Reservada con Éxito!' : 'Solicita tu Primera Cita Gratis'}
          </h3>


        </div>

        {/* Content Box */}
        <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: SELECT CLINIC BRANCH */}
          {step === 1 && (
            <div>
              <h4 className="font-bold text-slate-800 text-sm md:text-base mb-4 flex items-center gap-2">
                <MapPin className="w-4.5 h-4.5 text-blue-600" />
                1. Selecciona tu Clínica más Cercana
              </h4>

              <div className="space-y-3">
                {CLINICS.map((clinic) => {
                  const isChecked = selectedClinicId === clinic.id;
                  return (
                    <div
                      key={clinic.id}
                      onClick={() => setSelectedClinicId(clinic.id)}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 ${
                        isChecked 
                          ? 'bg-blue-50/50 border-blue-600 ring-1 ring-blue-500/10' 
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="clinic" 
                        value={clinic.id} 
                        checked={isChecked}
                        onChange={() => {}} // Swaps via onClick above
                        className="mt-1 color-blue-600 focus:ring-blue-500 text-blue-600"
                      />
                      <div>
                        <span className="font-bold text-slate-900 text-sm md:text-base">Sede {clinic.city}</span>
                        <p className="text-slate-500 text-xs mt-1 leading-relaxed">{clinic.address}</p>
                        <p className="text-slate-400 text-[10px] uppercase font-bold mt-2">Horas: {clinic.hoursWeekday}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT SPECIALTY */}
          {step === 2 && (
            <div>
              <h4 className="font-bold text-slate-800 text-sm md:text-base mb-4 flex items-center gap-2">
                <Activity className="w-4.5 h-4.5 text-blue-600" />
                2. Elige el Tratamiento o Especialidad
              </h4>

              <div className="space-y-2.5 max-h-[280px] overflow-y-auto rounded-xl border border-slate-100 p-1 bg-slate-50">
                {TREATMENTS.map((treatment) => {
                  const isChecked = selectedTreatmentId === treatment.id;
                  return (
                    <div
                      key={treatment.id}
                      onClick={() => setSelectedTreatmentId(treatment.id)}
                      className={`cursor-pointer p-3 rounded-lg border transition-all flex items-center justify-between ${
                        isChecked 
                          ? 'bg-white border-blue-500 shadow-sm' 
                          : 'bg-white/80 hover:bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input 
                          type="radio" 
                          name="treatment" 
                          value={treatment.id} 
                          checked={isChecked}
                          onChange={() => {}}
                          className="color-blue-600 focus:ring-blue-500 text-blue-600"
                        />
                        <div>
                          <span className="font-bold text-slate-800 text-xs md:text-sm">{treatment.name}</span>
                          <span className="text-slate-400 text-[10px] block font-medium">Médico: {treatment.specialist}</span>
                        </div>
                      </div>

                      {treatment.isPopular && (
                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">
                          Top
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: SELECT DATE & TIME SLOT */}
          {step === 3 && (
            <div>
              {/* Meta Summary of chosen info */}
              <div className="flex items-center justify-between bg-slate-50 p-2 text-[10px] md:text-xs text-slate-500 mb-4 rounded-lg font-medium">
                <span>📍 Sede {chosenClinic.city}</span>
                <span>🦷 {chosenTreatment.name}</span>
              </div>

              <h4 className="font-bold text-slate-800 text-sm md:text-base mb-3 flex items-center gap-2">
                <Calendar className="w-4.5 h-4.5 text-blue-600" />
                3. Elige tu Fecha y Hora Preferida
              </h4>

              {/* Day horizontal cards list */}
              <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider mb-2">Fechas Abiertas</span>
              <div className="flex gap-2.5 overflow-x-auto pb-3 snap-x scrollbar-none scroll-smooth">
                {datesList.map((dt) => {
                  const isChosen = selectedDateStr === dt.dateStr;
                  return (
                    <div
                      key={dt.dateStr}
                      onClick={() => {
                        setSelectedDateStr(dt.dateStr);
                        setSelectedTimeSlot(''); // Reset slot on changing date
                      }}
                      className={`cursor-pointer min-w-[70px] text-center p-2.5 rounded-2xl border-2 transition-all snap-start ${
                        isChosen 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-102 font-bold' 
                          : 'bg-slate-50 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold tracking-wider block opacity-75">{dt.dayName}</span>
                      <span className="text-lg font-extrabold block ">{dt.dayNum}</span>
                      <span className="text-[9px] block uppercase font-bold opacity-75">{dt.monthName}</span>
                    </div>
                  );
                })}
              </div>

              {/* Time Slots grid picker */}
              <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider mt-4 mb-2">Horarios Disponibles</span>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isChecked = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`cursor-pointer py-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        isChecked 
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' 
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT FORM */}
          {step === 4 && (
            <form onSubmit={handleFormSubmit}>
              <h4 className="font-bold text-slate-800 text-sm md:text-base mb-4 flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-blue-600" />
                4. Introduce tus Datos de Contacto
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Nombre Completo</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej. María Antonia Rosselló"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full text-xs md:text-sm py-2.5 pl-10 pr-4 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Teléfono Móvil</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                        <Phone className="w-4 h-4" />
                      </span>
                      <input 
                        type="tel" 
                        required
                        placeholder="Ej. +34 600 123 456"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full text-xs md:text-sm py-2.5 pl-10 pr-4 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Correo Electrónico</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input 
                        type="email" 
                        required
                        placeholder="Ej. maria@correo.com"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        className="w-full text-xs md:text-sm py-2.5 pl-10 pr-4 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">¿Algún síntoma o nota adicional?</label>
                  <textarea 
                    rows={2}
                    placeholder="Ej. Dolor persistente al morder en la corona derecha, o dolor agudo desde anteayer..."
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    className="w-full text-xs md:text-sm py-2.5 px-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl outline-none resize-none transition-all"
                  />
                </div>

                <div className="text-[10px] text-slate-400 leading-normal">
                  De conformidad con la normativa de Protección de Datos (RGPD), consientes que Odonto Familia almacene temporalmente tus datos para la tramitación directa de tu primera cita diagnóstica gratis.
                </div>
              </div>
            </form>
          )}

          {/* STEP 5: BOOKING SUCCESS TICKET */}
          {step === 5 && completedAppointment && (
            <div className="flex flex-col items-center">
              
              {/* SUCCESS ANIMATION ICON */}
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6 border border-emerald-200">
                <CheckCircle2 className="w-9 h-9 animate-bounce" />
              </div>

              {/* BEAUTIFUL GORGEOUS CLINIC TICKET */}
              <div className="w-full bg-slate-50 rounded-2.5xl border border-slate-200 p-5 font-sans shadow-sm relative overflow-hidden">
                {/* Visual strip effect */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-emerald-500" />

                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-4">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="text-blue-900 text-xs md:text-sm">Odonto</span>
                    <span className="text-emerald-500 text-xs md:text-sm">Familia</span>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">CÓDIGO DE CITA</span>
                    <span className="text-xs md:text-sm font-mono font-extrabold text-slate-800">{completedAppointment.id}</span>
                  </div>
                </div>

                {/* Ticket Details Grid */}
                <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Paciente</span>
                    <span className="text-slate-800 font-extrabold">{completedAppointment.patientName}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Sede seleccionada</span>
                    <span className="text-slate-800 font-extrabold">Sede {chosenClinic.city}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Tratamiento</span>
                    <span className="text-slate-800 font-bold">{chosenTreatment.name}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Especialista</span>
                    <span className="text-slate-800 font-semibold">{chosenTreatment.specialist || 'Dentista de guardia'}</span>
                  </div>

                  <div className="col-span-2 pt-2 border-t border-slate-200/50 flex justify-between items-center bg-white/70 p-3 rounded-xl">
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-widest">FECHA Y HORA</span>
                      <span className="text-xs md:text-sm font-black text-blue-900 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {completedAppointment.date} a las {completedAppointment.timeSlot}h
                      </span>
                    </div>

                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black border border-emerald-200 rounded-full py-0.5 px-2 uppercase tracking-wide">
                      Confirmada
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons inside Receipt */}
              <div className="flex gap-3 w-full mt-6">
                <button
                  type="button"
                  onClick={handleDownloadICS}
                  className="cursor-pointer flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-full flex items-center justify-center gap-2 transition-colors border border-slate-200"
                >
                  <Calendar className="w-4 h-4 text-slate-500" />
                  Descargar Pase Calendario
                </button>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-full shadow-sm text-center transition-colors"
                >
                  Entendido, Cerrar
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Wizard Footer - Prev / Next navigation */}
        {step < 5 && (
          <div className="bg-slate-50 border-t border-slate-100 px-6 py-4.5 flex justify-between items-center shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="cursor-pointer text-xs md:text-sm font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 py-1 px-3"
              >
                <ChevronLeft className="w-4 h-4" />
                Atrás
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs md:text-sm py-2 px-5 rounded-full shadow-sm flex items-center gap-1 transition-all"
              >
                Continuar
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFormSubmit}
                disabled={!patientName.trim() || !patientPhone.trim() || !patientEmail.trim()}
                className="cursor-pointer bg-gradient-to-r from-blue-700 via-sky-600 to-emerald-500 text-white font-black text-xs md:text-sm py-2.5 px-6 rounded-full shadow-md transition-all flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Finalizar Reserva Gratis
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </motion.div>
    </div>
  );
}
