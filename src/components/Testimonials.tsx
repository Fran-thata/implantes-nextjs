import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, MessageSquare, CheckCircle2 } from 'lucide-react';

interface CustomReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  image: string;
}

export default function Testimonials() {
  const initialTestimonials: CustomReview[] = [
    {
      id: 'test_1',
      name: 'Leidy Salcedo',
      rating: 5,
      comment: 'Excelente atención, muy profesional y amable. Me sentí en confianza todo el tiempo. Súper recomendado.',
      image: 'https://res.cloudinary.com/ddpujsrsg/image/upload/v1779545750/ChatGPT_Image_May_23_2026_04_15_35_PM_1_schbgk.png'
    },
    {
      id: 'test_2',
      name: 'Solangel Pérez',
      rating: 5,
      comment: 'Llegué de muerte y salí con ganas de seguir viviendo. Atención excelente e inmediata. Los doctores espectaculares, y un trato muy amable y familiar.',
      image: 'https://res.cloudinary.com/ddpujsrsg/image/upload/v1779545751/ChatGPT_Image_May_23_2026_04_15_35_PM_2_pwt3gu.png'
    },
    {
      id: 'test_3',
      name: 'Edwin',
      rating: 5,
      comment: 'Muy profesionales. Excelente. 100% recomendado.',
      image: 'https://res.cloudinary.com/ddpujsrsg/image/upload/v1779545793/ChatGPT_Image_May_23_2026_04_15_36_PM_3_m9hajx.png'
    }
  ];

  const [testimonials, setTestimonials] = React.useState<CustomReview[]>(() => {
    const cached = (typeof window !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }).getItem('odontofamilia_custom_reviews');
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return initialTestimonials;
  });

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newReviewName, setNewReviewName] = React.useState('');
  const [newReviewComment, setNewReviewComment] = React.useState('');
  const [newReviewRating, setNewReviewRating] = React.useState(5);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    (typeof window !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }).setItem('odontofamilia_custom_reviews', JSON.stringify(testimonials));
  }, [testimonials]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRev: CustomReview = {
      id: 'custom_' + Date.now(),
      name: newReviewName,
      rating: newReviewRating,
      comment: newReviewComment,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300' // Default placeholder icon
    };

    setTestimonials(prev => [...prev, newRev]);
    setIsSuccess(true);

    setTimeout(() => {
      setNewReviewName('');
      setNewReviewComment('');
      setNewReviewRating(5);
      setIsSuccess(false);
      setShowAddForm(false);
    }, 1800);
  };

  return (
    <section id="testimonios" className="relative py-20 bg-[#f8fafc] overflow-hidden scroll-mt-20">
      
      {/* Background Floating Hearts & Dots Decoration exactly matching layout photo */}
      <div className="absolute top-1/4 left-10 md:left-24 text-blue-100 select-none pointer-events-none opacity-40 md:block hidden animate-bounce" style={{ animationDuration: '6s' }}>
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>

      <div className="absolute top-1/4 right-10 md:right-24 text-blue-100 select-none pointer-events-none opacity-40 md:block hidden animate-bounce" style={{ animationDuration: '8s' }}>
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>

      {/* Grid Dots */}
      <div className="absolute top-12 left-6 opacity-20 md:block hidden">
        <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
          {Array.from({ length: 18 }).map((_, i) => (
            <circle key={i} cx={10 + (i % 3) * 20} cy={10 + Math.floor(i / 3) * 20} r="2.5" fill="#3b82f6" />
          ))}
        </svg>
      </div>
      <div className="absolute bottom-12 right-6 opacity-20 md:block hidden">
        <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
          {Array.from({ length: 18 }).map((_, i) => (
            <circle key={i} cx={10 + (i % 3) * 20} cy={10 + Math.floor(i / 3) * 20} r="2.5" fill="#3b82f6" />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Centered Pill Badge */}
        <div className="flex justify-center mb-4 select-none">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-[#eef5ff] border border-blue-200/50 text-[#2563eb] rounded-full font-extrabold text-xs sm:text-[13px] tracking-wide shadow-sm">
            <svg className="w-4 h-4 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Lo que dicen nuestros pacientes
          </span>
        </div>

        {/* Big centered title & subtile */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.2] max-w-4xl mx-auto px-2">
          Lo que dicen nuestros pacientes
        </h2>

        <p className="text-center text-slate-500/90 text-sm sm:text-base font-semibold max-w-2xl mx-auto px-4 mt-3 mb-16 leading-relaxed">
          Lo que dicen quienes vinieron con dolor y salieron sin él
        </p>

        {/* Testimonials 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[32px] p-7 md:p-8 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative"
            >
              <div>
                
                {/* Header Profile Info inside card */}
                <div className="flex items-center gap-4 mb-6 relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-slate-100 shadow-inner">
                    <img 
                      src={test.image} 
                      alt={test.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-[17px] leading-snug">
                      {test.name}
                    </h3>
                    
                    {/* Golden Stars row */}
                    <div className="flex items-center gap-0.5 text-amber-400 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Pale Blue Quotation marks background accent */}
                  <span className="absolute right-0 top-0 text-[64px] font-serif font-extrabold text-blue-100/50 leading-none select-none pointer-events-none">
                    “
                  </span>
                </div>

                {/* Review Message Text */}
                <p className="text-slate-600/95 text-xs sm:text-[13.5px] font-semibold leading-relaxed tracking-wide min-h-[64px]">
                  {test.comment}
                </p>

              </div>

              {/* Little blue heart vector container at the bottom left */}
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-blue-50/70 border border-blue-100 flex items-center justify-center text-[#2563eb]">
                  <Heart className="w-3.5 h-3.5 fill-[#2563eb]" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Center alignment white primary capsule button wrapper */}
        <div className="flex flex-col items-center justify-center mt-12 gap-4">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 border border-blue-100 hover:border-blue-200 text-[#2563eb] font-extrabold text-xs sm:text-sm rounded-full shadow-sm transition-all shadow-blue-500/5"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ver más opiniones →</span>
          </button>

          {/* Collapsible Feedback Review Addition Wizard Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full max-w-lg overflow-hidden mt-4"
              >
                <form 
                  onSubmit={handleSubmit}
                  className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl text-left"
                >
                  <h3 className="font-extrabold text-slate-900 text-lg mb-4.5">
                    Dejar tu reseña
                  </h3>

                  {isSuccess ? (
                    <div className="py-6 flex flex-col items-center justify-center text-center text-emerald-600">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-2 animate-bounce" />
                      <p className="font-extrabold text-slate-950">¡Muchas gracias!</p>
                      <p className="text-xs text-slate-500 mt-1">Tu reseña se ha guardado correctamente.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Nombre</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Tu nombre"
                          value={newReviewName}
                          onChange={(e) => setNewReviewName(e.target.value)}
                          className="w-full text-xs sm:text-sm py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Tu opinión</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Escribe tu comentario sobre tu experiencia con nosotros..."
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          className="w-full text-xs sm:text-sm py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase">Estrellas:</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewReviewRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                            >
                              <Star className={`w-5 h-5 ${(hoverRating ? star <= hoverRating : star <= newReviewRating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="cursor-pointer text-xs font-bold text-slate-400 hover:text-slate-600 px-3"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-2 rounded-full shadow-sm"
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
