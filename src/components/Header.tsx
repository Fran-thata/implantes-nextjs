import React from 'react';
import { Calendar, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenBooking: (preferredClinicId?: 'palma' | 'manacor', preferredTreatmentId?: string) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onOpenBooking, activeSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = React.useState<string | null>(null);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (mobileMenuOpen) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY <= 120) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Empresa', id: 'empresa' },
    {
      label: 'Tratamientos',
      id: 'tratamientos',
      submenu: [
        { label: 'Implantes dentales', action: () => { window.top!.location.href = 'https://odontofamiliapalma.com/tratamientos/implantes-dentales'; } },
        { label: 'Limpieza dental', action: () => { window.top!.location.href = 'https://odontofamiliapalma.com/tratamientos/limpieza-dental'; } },
        { label: 'Estética dental', action: () => { window.top!.location.href = 'https://odontofamiliapalma.com/tratamientos/estetica-dental'; } },
        { label: 'Ortodoncia', action: () => { window.top!.location.href = 'https://odontofamiliapalma.com/tratamientos/ortodoncia'; } },
        { label: 'Ortodoncia invisible', action: () => { window.top!.location.href = 'https://odontofamiliapalma.com/tratamientos/ortodoncia-invisible'; } },
        { label: 'Odontopediatría', action: () => { window.top!.location.href = 'https://odontofamiliapalma.com/tratamientos/odontopediatria'; } },
        { label: 'Endodoncia', action: () => { window.top!.location.href = 'https://odontofamiliapalma.com/tratamientos/endodoncia'; } },
        { label: 'Prótesis dentales', action: () => { window.top!.location.href = 'https://odontofamiliapalma.com/tratamientos/protesis-dentales'; } },
        { label: 'Cirugía oral', action: () => { window.top!.location.href = 'https://odontofamiliapalma.com/tratamientos/cirugia-oral'; } },
      ]
    },
    { label: 'Urgencias', id: 'te-llamamos' },
    { label: 'Servicios', id: 'servicios' },
    { label: 'Testimonios', id: 'testimonios' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-1 cursor-pointer select-none group"
          onClick={() => { window.top!.location.href = 'https://odontofamiliapalma.com'; }}
        >
          <div className="flex items-baseline text-sm sm:text-base md:text-lg font-extrabold tracking-tight">
            <span className="text-blue-900">Odonto</span>
            <span className="text-emerald-500 ml-0.5">Familia</span>
          </div>
        </div>

        {/* Navigation - Tablet and Desktop */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const hasSubmenu = !!item.submenu;

            return (
              <div
                key={item.id}
                className="relative py-2"
                onMouseEnter={() => { if (hasSubmenu) setActiveDropdown(item.id); }}
                onMouseLeave={() => { setActiveDropdown(null); }}
              >
                <button
                  onClick={() => {
                    if (hasSubmenu) {
                      setActiveDropdown(activeDropdown === item.id ? null : item.id);
                    } else {
                      handleItemClick(item.id);
                    }
                  }}
                  className="flex items-center gap-1 font-semibold text-xs lg:text-sm text-slate-600 hover:text-blue-800 transition-colors cursor-pointer relative"
                >
                  <span>{item.label}</span>
                  {hasSubmenu && (
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${activeDropdown === item.id ? 'rotate-180 text-blue-600' : ''}`} />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-2.5 left-0 right-0 h-[3px] bg-blue-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                {hasSubmenu && (
                  <AnimatePresence>
                    {activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl py-2.5 min-w-[200px] z-[110]"
                      >
                        {item.submenu?.map((sub, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              sub.action();
                              setActiveDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2 text-xs lg:text-sm text-slate-700 hover:bg-blue-50/50 hover:text-blue-700 font-bold transition-all duration-150 flex items-center gap-2 group/sub cursor-pointer"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/sub:bg-blue-500 group-hover/sub:scale-125 transition-transform" />
                            <span>{sub.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => onOpenBooking()}
            className="cursor-pointer bg-gradient-to-r from-blue-700 via-sky-600 to-emerald-500 text-white font-semibold text-sm rounded-full py-2.5 px-5 flex items-center gap-2 hover:opacity-95 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Calendar className="w-4 h-4" />
            Pedir cita
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenBooking()}
            className="cursor-pointer bg-gradient-to-r from-blue-700 via-sky-600 to-emerald-500 text-white font-semibold text-xs rounded-full py-2 px-3 flex items-center gap-1.5 hover:opacity-95 shadow-sm active:scale-95 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            Cita
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col p-6 z-40"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const hasSub = !!item.submenu;

                return (
                  <div key={item.id} className="flex flex-col">
                    <button
                      onClick={() => {
                        if (hasSub) {
                          setMobileDropdownOpen(mobileDropdownOpen === item.id ? null : item.id);
                        } else {
                          handleItemClick(item.id);
                        }
                      }}
                      className={`text-left py-2 px-4 rounded-xl font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isActive && !hasSub
                          ? 'bg-blue-50 text-blue-800'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span>{item.label}</span>
                      {hasSub && (
                        <ChevronDown className={`w-4 h-4 text-slate-400 transform transition-transform duration-200 ${mobileDropdownOpen === item.id ? 'rotate-180 text-blue-600' : ''}`} />
                      )}
                    </button>

                    {hasSub && mobileDropdownOpen === item.id && (
                      <div className="pl-6 pr-4 py-1.5 flex flex-col gap-1 border-l-2 border-slate-100 ml-4 mt-1">
                        {item.submenu?.map((sub, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              sub.action();
                              setMobileMenuOpen(false);
                            }}
                            className="text-left py-2 px-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-700 font-bold text-sm flex items-center gap-2 cursor-pointer"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span>{sub.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="h-[1px] bg-slate-100 my-2" />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full justify-center bg-gradient-to-r from-blue-700 via-sky-600 to-emerald-500 text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                Pedir cita gratis
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
