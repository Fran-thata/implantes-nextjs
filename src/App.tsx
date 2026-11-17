import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhatAreImplants from './components/WhatAreImplants';
import ProtesisTypes from './components/ProtesisTypes';
import ForWhoImplants from './components/ForWhoImplants';
import ImplantsProcess from './components/ImplantsProcess';
import Dentists from './components/Dentists';
import Testimonials from './components/Testimonials';
import CtaBanner from './components/CtaBanner';
import Faq from './components/Faq';
import CallbackForm from './components/CallbackForm';
import Locations from './components/Locations';
import BookingModal from './components/BookingModal';
import Dashboard from './components/Dashboard';
import { Appointment, ClinicId } from './types';
import { 
  Building2, 
  Sparkles, 
  MapPin, 
  PhoneCall, 
  CheckCircle2, 
  Heart,
  ExternalLink,
  LocateFixed
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = React.useState('empresa');
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [preferredClinic, setPreferredClinic] = React.useState<ClinicId | undefined>(undefined);
  const [preferredTreatment, setPreferredTreatment] = React.useState<string | undefined>(undefined);
  
  // Local appointments tracker
  const [appointments, setAppointments] = React.useState<Appointment[]>(() => {
    const cached = (typeof window !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }).getItem('odontofamilia_appointments');
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return [];
  });

  React.useEffect(() => {
    (typeof window !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }).setItem('odontofamilia_appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Handle smooth scroll navigation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 90; // account for floating nav header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Set active section on scroll tracking
  React.useEffect(() => {
    const sections = ['empresa', 'protesis-realizadas', 'servicios', 'proceso', 'testimonios'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBookingWizard = (prefClinic?: ClinicId, prefTreatment?: string) => {
    setPreferredClinic(prefClinic);
    setPreferredTreatment(prefTreatment);
    setIsBookingOpen(true);
  };

  const handleAddNewAppointment = (newAppt: Appointment) => {
    setAppointments(prev => [newAppt, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.filter(appt => appt.id !== id));
  };

  return (
    <div className="relative font-sans antialiased text-neutral-900 bg-neutral-50 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Floating capsule navigation bar */}
      <Header 
        onOpenBooking={openBookingWizard}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Sections */}
      <main>
        
        {/* Full screen video Hero */}
        <Hero 
          onOpenBooking={() => openBookingWizard()} 
          onExploreTreatments={() => handleNavigate('protesis-realizadas')}
        />

        {/* �Qu� son los implantes dentales? */}
        <WhatAreImplants />

        {/* Tipos de pr�tesis dentales que realizamos */}
        <ProtesisTypes onOpenBooking={() => openBookingWizard()} />

        {/* �Para qui�n son los implantes dentales? */}
        <ForWhoImplants />

        {/* Step-by-step Surgical Process and Trust Pillars */}
        <ImplantsProcess />

        {/* Patient reviews and comment panel */}
        <Testimonials />

        {/* Dentists profiles/team section */}
        <Dentists />

        {/* FAQ - Preguntas frecuentes segment */}
        <Faq />

        {/* Cinematic full-width horizontal call to action for scheduling visits */}
        <CtaBanner onOpenBooking={() => openBookingWizard()} />

        {/* Clinic branches location guides (Sede Palma & Sede Manacor maps) */}
        <Locations 
          onOpenBooking={openBookingWizard}
        />

        {/* Callback Request Contact Form section */}
        <CallbackForm />

      </main>

      {/* Booking scheduling interactive wizard modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preferredClinicId={preferredClinic}
        preferredTreatmentId={preferredTreatment}
        onAppointmentBooked={handleAddNewAppointment}
      />

      {/* Appointments Management Dashboard overlay */}
      <Dashboard 
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onOpenBooking={() => openBookingWizard()}
      />

      {/* Styled Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Clinician Brand details - 4 Cols */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-baseline text-lg md:text-xl font-extrabold tracking-tight">
                <span className="text-white">Odonto</span>
                <span className="text-emerald-400 ml-0.5">Familia</span>
              </div>

              <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-sm">
                Odontolog�a avanzada y especialistas titulados con dedicaci�n absoluta. Tu cl�nica dental de total confianza en Mallorca.
              </p>

              <div className="text-[10px] text-slate-500">
                N� Registro Sanitario: C-07-3532-DF <br />
                � {new Date().getFullYear()} Odonto Familia S.L. Todos los derechos reservados.
              </div>
            </div>

            {/* Quick Sede Palma info - 4 Cols */}
            <div className="md:col-span-4 space-y-3 text-xs md:text-sm">
              <h4 className="font-bold text-slate-200 uppercase tracking-widest text-[11px]">Cl�nica Dental Odontofamilia (Palma)</h4>
              <p className="text-slate-400 leading-relaxed">
                C/ de Llu�s Mart�, 50, Llevant<br />
                07005 Palma, Illes Balears
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-350">
                  <span className="font-semibold text-slate-300">Tlf:</span>
                  <a href="tel:+34673780895" className="hover:text-blue-400 hover:underline">673 78 08 95</a>
                </div>
                <div className="flex items-center gap-1.5 text-slate-350">
                  <span className="font-semibold text-slate-300">Email:</span>
                  <a href="mailto:odontofamiliapalma@gmail.com" className="hover:text-blue-400 hover:underline">odontofamiliapalma@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Quick Sede Manacor info - 4 Cols */}
            <div className="md:col-span-4 space-y-3 text-xs md:text-sm">
              <h4 className="font-bold text-slate-200 uppercase tracking-widest text-[11px]">Cl�nica dental odontofamilia Manacor Palma</h4>
              <p className="text-slate-400 leading-relaxed">
                Avinguda d'es Torrent, 35<br />
                07500 Manacor, Illes Balears
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-350">
                  <span className="font-semibold text-slate-300">Tlf:</span>
                  <a href="tel:+34647461382" className="hover:text-blue-400 hover:underline">647 46 13 82</a>
                </div>
                <div className="flex items-center gap-1.5 text-slate-350">
                  <span className="font-semibold text-slate-300">Email:</span>
                  <a href="mailto:odontofamiliapalma@gmail.com" className="hover:text-blue-400 hover:underline">odontofamiliapalma@gmail.com</a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom line certifications */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
              <span>� Colegiados en COEB Baleares</span>
              <span>� Certificaciones de Calidad ISO 9001</span>
              <span>� Radiodiagn�stico 3D Digital Homologado</span>
            </div>
            
            <span className="text-slate-500 flex items-center gap-1">
              Dise�o de Interfaz conforme al est�ndar Odonto Familia Palma.
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
