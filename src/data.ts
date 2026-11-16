import { Clinic, Treatment, Review } from './types';

export const CLINICS: Clinic[] = [
  {
    id: 'palma',
    name: 'Clínica Dental Odontofamilia (Palma)',
    city: 'Palma',
    address: 'C/ de Lluís Martí, 50, Llevant, 07005 Palma, Illes Balears',
    phone: '+34673780895',
    phoneFormatted: '673 78 08 95',
    email: 'odontofamiliapalma@gmail.com',
    hoursWeekday: '09:00 - 20:00',
    hoursSaturday: 'Cerrado',
    googleMapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3076.223847551066!2d2.6617260539121!3d39.5714343111222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1297926e8ad1c4f7%3A0x6e76cf0a2fbd72a6!2sCarrer+de+Llu%C3%ADs+Mart%C3%AD%2C+50%2C+07005+Palma%2C+Illes+Balears!5e0!3m2!1ses!2ses!4v1684823100000!5m2!1ses!2ses',
    rating: 5.0,
    ratingCount: 10
  },
  {
    id: 'manacor',
    name: 'Clínica dental odontofamilia Manacor Palma',
    city: 'Manacor',
    address: 'Avinguda d\'es Torrent, 35, 07500 Manacor, Illes Balears',
    phone: '+34647461382',
    phoneFormatted: '647 46 13 82',
    email: 'odontofamiliapalma@gmail.com',
    hoursWeekday: '09:00 - 20:00',
    hoursSaturday: 'Cerrado',
    googleMapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3076.6022378877546!2d3.204595!3d39.5714343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1297cccaffffffff%3A0xe54e3f169af1fe3a!2sAv.+del+Torrent%2C+35%2C+07500+Manacor%2C+Illes+Balears%2C+Spain!5e0!3m2!1ses!2ses!4v1684824200000!5m2!1ses!2ses',
    rating: 4.9,
    ratingCount: 39
  }
];

export const TREATMENTS: Treatment[] = [
  {
    id: 'implantologia',
    name: 'Implantología Avanzada',
    shortDescription: 'Sustitución permanente de piezas con implantes de titanio de última generación y carga inmediata.',
    fullDescription: 'Recupera la estética y funcionalidad de tu boca en un solo día. Utilizamos técnicas de cirugía guiada por ordenador mínimamente invasiva y materiales biocompatibles de la marca líder mundial, garantizando una excelente osteointegración y durabilidad de por vida.',
    iconName: 'ShieldAlert', // We'll map this dynamically to beautiful visual UI or Lucide icons
    durationMin: 60,
    specialist: 'Dra. Elena Gomila (Cirujana e Implantóloga)',
    isPopular: true
  },
  {
    id: 'ortodoncia',
    name: 'Ortodoncia Invisible (Invisalign)',
    shortDescription: 'Alinea tus dientes de forma cómoda, discreta y totalmente estética con férulas transparentes.',
    fullDescription: 'Consigue la sonrisa de tus sueños sin que nadie lo note. Diseñamos un plan digital en 3D (ClinCheck) donde verás el resultado final antes de empezar. Férulas removibles de alta tecnología, higiénicas y adaptables al ritmo de tu vida.',
    iconName: 'Award',
    durationMin: 45,
    specialist: 'Dr. Marc Serra (Ortodoncista exclusivo)',
    isPopular: true
  },
  {
    id: 'estetica',
    name: 'Estética Dental & Carillas',
    shortDescription: 'Diseño de sonrisa personalizado mediante carillas de porcelana o composite y blanqueamientos.',
    fullDescription: 'Dile adiós a las manchas, fracturas o desalineaciones leves. Realizamos blanqueamientos dentales LED en clínica, carillas ultrafinas de porcelana Lumineers o de composite de alta resistencia estético-funcional para rejuvenecer tu sonrisa de forma rápida.',
    iconName: 'Sparkles',
    durationMin: 50,
    specialist: 'Dra. Sofía Nadal (Rehabilitadora Estética)'
  },
  {
    id: 'odontopediatria',
    name: 'Odontopediatría Integral',
    shortDescription: 'Atención odontológica lúdica y sin dolor adaptada especialmente para los más pequeños.',
    fullDescription: 'Cuidamos la sonrisa de tus hijos desde sus primeros años. Creamos una atmósfera de confianza y cero dolor con técnicas psicológicas lúdicas, selladores de fisuras, fluorizaciones y educación preventiva para evitar el miedo al dentista.',
    iconName: 'Heart',
    durationMin: 30,
    specialist: 'Dra. Clara Font (Especialista Infantil)'
  },
  {
    id: 'periodoncia',
    name: 'Periodoncia y Cuidado de Encías',
    shortDescription: 'Tratamiento y prevención de la gingivitis y periodontitis para salvar tu soporte dental.',
    fullDescription: 'Un soporte sano es vital para tus dientes. Realizamos raspados, alisados radiculares meticulosos bajo anestesia local o sedación consciente, terapia de mantenimiento periodontal y regeneraciones tisulares asistidas.',
    iconName: 'Activity',
    durationMin: 40,
    specialist: 'Dra. Elena Gomila (Periodoncista Colegiada)'
  },
  {
    id: 'urgencias',
    name: 'Urgencias Odontológicas 24h/12h',
    shortDescription: 'Alivio del dolor inmediato, traumatismos, roturas y tratamiento de infecciones el mismo día.',
    fullDescription: 'Si te duele, no esperes. Atendemos casos urgentes el mismo día sin cita previa programada para resolver dolores intensos, flemones, roturas de prótesis o piezas dentales dañadas accidentalmente. Dispones de atención rápida.',
    iconName: 'Clock',
    durationMin: 30,
    specialist: 'Equipo de Guardia Odonto Familia'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'María Antonia Rosselló',
    rating: 5,
    comment: 'Instalaciones impecables y el trato por parte de todo el equipo de Palma es increíble. Me hice el tratamiento de Ortodoncia Invisible y no podría estar más contenta con el resultado 3D.',
    clinicId: 'palma',
    date: '2026-04-12'
  },
  {
    id: 'r2',
    name: 'Miquel Àngel Barceló',
    rating: 5,
    comment: 'Excelente atención de urgencia en la clínica de Manacor. Iba con mucho dolor por una muela y me lo solucionaron con total delicadeza y rapidez en la misma tarde. Recomendables al 100%.',
    clinicId: 'manacor',
    date: '2026-05-18'
  },
  {
    id: 'r3',
    name: 'Francisca Gomila',
    rating: 5,
    comment: 'Llevé a mi hijo de 6 años que siempre le ha tenido pánico a los dentistas. La odontopediatra Clara fue un amor absoluto; el niño estuvo riéndose durante la revisión oficial. ¡Muchas gracias!',
    clinicId: 'palma',
    date: '2026-05-02'
  },
  {
    id: 'r4',
    name: 'Toni Riera',
    rating: 5,
    comment: 'Me colocaron dos implantes de carga inmediata en Manacor y el mismo día salí comiendo blando sin ningún dolor. Son unos cirujanos de primera categoría.',
    clinicId: 'manacor',
    date: '2026-03-29'
  }
];

export const TIME_SLOTS = [
  '09:00', '09:45', '10:30', '11:15', '12:00', '12:45', 
  '16:00', '16:45', '17:30', '18:15', '19:00', '19:45'
];
