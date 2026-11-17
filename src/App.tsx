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
      <footer className="bg-[#0e1a2f] text-[#a7b4c8] py-16" style={{fontFamily:'"Plus Jakarta Sans", system-ui, sans-serif'}}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

            {/* Col 1: Brand */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-baseline text-lg font-extrabold tracking-tight">
                <span className="text-[#1e3a8a]">Odonto</span>
                <span className="text-[#0faa76] ml-1">Familia</span>
              </div>
              <p className="text-[#a7b4c8] text-sm leading-relaxed">
                Clínica dental familiar en Manacor y Palma de Mallorca. Dos centros propios con más de 12 años cuidando la sonrisa de familias del Llevant de Mallorca. Odontología general, infantil y avanzada para toda la familia.
              </p>
              <div className="text-xs text-[#566477] space-y-1">
                <p>Nº Registro Sanitario: C-07-3532-DF</p>
                <p>© 2026 Odonto Familia S.L. Todos los derechos reservados.</p>
              </div>
            </div>

            {/* Col 2: Tratamientos */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest">Tratamientos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/tratamientos/odontopediatria" className="text-[#8695ae] hover:text-white transition-colors">Odontopediatría — Dentista Infantil</a></li>
                <li><a href="/tratamientos/estetica-dental" className="text-[#8695ae] hover:text-white transition-colors">Estética Dental y Blanqueamiento</a></li>
                <li><a href="/tratamientos/ortodoncia" className="text-[#8695ae] hover:text-white transition-colors">Ortodoncia — Brackets e Invisalign</a></li>
                <li><a href="/tratamientos/implantes-dentales" className="text-[#8695ae] hover:text-white transition-colors">Implantes Dentales</a></li>
                <li><a href="/tratamientos/limpieza-dental" className="text-[#8695ae] hover:text-white transition-colors">Limpieza Dental Profesional</a></li>
                <li><a href="/urgencias-palma" className="text-[#8695ae] hover:text-white transition-colors">Urgencias Dentales — Mismo Día</a></li>
              </ul>
            </div>

            {/* Col 3: Blog */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest">Blog</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/blog/que-es-la-limpieza-dental-profesional" className="text-[#8695ae] hover:text-white transition-colors">¿Qué es la limpieza dental profesional?</a></li>
                <li><a href="/blog/odontopediatria-guia-completa" className="text-[#8695ae] hover:text-white transition-colors">Odontopediatría: guía completa</a></li>
              </ul>
            </div>

            {/* Col 4: Clínica Palma */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest">Clínica Dental Odontofamilia Palma</h4>
              <div className="text-sm space-y-2 text-[#8695ae]">
                <p>C/ de Lluís Martí, 50 — Llevant<br/>07005 Palma de Mallorca, Illes Balears</p>
                <p><span className="text-[#cbd5e1] font-semibold">Tlf:</span> <a href="tel:+34673780895" className="hover:text-white transition-colors">673 780 895</a></p>
                <p><span className="text-[#cbd5e1] font-semibold">Email:</span> <a href="mailto:odontofamiliapalma@gmail.com" className="hover:text-white transition-colors">odontofamiliapalma@gmail.com</a></p>
                <p><span className="text-[#cbd5e1] font-semibold">Horario:</span> Lunes a sábado 9:00–14:00 / 15:00–21:00</p>
                <p><span className="text-[#cbd5e1] font-semibold">Urgencias:</span> cualquier día del año</p>
              </div>
            </div>

            {/* Col 5: Clínica Manacor */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest">Clínica Dental Odontofamilia Manacor</h4>
              <div className="text-sm space-y-2 text-[#8695ae]">
                <p>Avinguda d'es Torrent, 35<br/>07500 Manacor, Illes Balears</p>
                <p><span className="text-[#cbd5e1] font-semibold">Tlf:</span> <a href="tel:+34613914519" className="hover:text-white transition-colors">613 91 45 19</a></p>
                <p><span className="text-[#cbd5e1] font-semibold">Email:</span> <a href="mailto:odontofamiliapalma@gmail.com" className="hover:text-white transition-colors">odontofamiliapalma@gmail.com</a></p>
                <p><span className="text-[#cbd5e1] font-semibold">Horario:</span> Lunes a sábado 9:00–14:00 / 15:00–21:00</p>
                <p><span className="text-[#cbd5e1] font-semibold">Urgencias:</span> cualquier día del año</p>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 mt-12 pt-6 flex flex-wrap gap-6 text-xs text-[#566477]">
            <span>● Colegiados en COEB Baleares</span>
            <span>● Certificación de Calidad ISO 9001</span>
            <span>● Radiodiagnóstico 3D Digital Homologado</span>
            <span>● Especialistas en Odontología Infantil y Familiar</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
