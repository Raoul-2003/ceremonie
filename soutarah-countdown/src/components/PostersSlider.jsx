import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Poster data — replace src with real image paths when available
const posters = [
  {
    id: 1,
    title: 'Annonce de la Cérémonie',
    subtitle: 'Cérémonie officielle de remise de financement',
    tag: 'Officiel',
    color: 'from-soutarah-green-dark to-soutarah-green',
    src: null, // replace with: '/images/affiche-annonce.jpg'
  },
  {
    id: 2,
    title: 'J-30',
    subtitle: '30 jours avant la grande cérémonie',
    tag: 'J-30',
    color: 'from-soutarah-green to-soutarah-green-light',
    src: null,
  },
  {
    id: 3,
    title: 'J-15',
    subtitle: 'Plus que 15 jours — préparez-vous',
    tag: 'J-15',
    color: 'from-soutarah-green-dark via-soutarah-green to-soutarah-gold-dark',
    src: null,
  },
  {
    id: 4,
    title: 'J-7',
    subtitle: 'La dernière semaine avant l\'événement',
    tag: 'J-7',
    color: 'from-soutarah-gold-dark to-soutarah-gold',
    src: null,
  },
  {
    id: 5,
    title: 'Jour J',
    subtitle: '24 Septembre 2026 — C\'est aujourd\'hui !',
    tag: 'JOUR J',
    color: 'from-soutarah-gold via-soutarah-gold-light to-soutarah-gold-dark',
    src: null,
  },
]

function PosterCard({ poster, isActive }) {
  return (
    <div className="relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-card flex flex-col items-center justify-center">
      {poster.src ? (
        <img
          src={poster.src}
          alt={poster.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${poster.color}`} />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Decorative lines */}
      <div className="absolute inset-6 border border-white/20 rounded-2xl pointer-events-none" />
      <div className="absolute inset-8 border border-white/10 rounded-xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-8">
        <div className="inline-block px-4 py-1.5 rounded-full border border-soutarah-gold/60 bg-soutarah-gold/20 mb-4">
          <span className="text-soutarah-gold font-bold text-xs tracking-widest uppercase">
            {poster.tag}
          </span>
        </div>
        <h3 className="font-heading text-white font-black text-3xl md:text-5xl mb-3">
          {poster.title}
        </h3>
        <p className="text-white/70 text-sm md:text-base">{poster.subtitle}</p>

        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-8 h-px bg-soutarah-gold/50" />
          <span className="text-soutarah-gold/60 text-xs uppercase tracking-widest">Soutarah Group</span>
          <div className="w-8 h-px bg-soutarah-gold/50" />
        </div>
      </div>

      {/* Corner badges */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-soutarah-gold/60 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-soutarah-gold/60 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-soutarah-gold/60 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-soutarah-gold/60 rounded-br-lg" />
    </div>
  )
}

export default function PostersSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent(c => (c + 1) % posters.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent(c => (c - 1 + posters.length) % posters.length)
  }, [])

  // Auto-advance every 4 seconds
  useEffect(() => {
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [next])

  const variants = {
    enter:  (d) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:   (d) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.9 }),
  }

  return (
    <section id="programme" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-soutarah-dark to-soutarah-green-dark/20" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-subtitle mb-3">Communications officielles</p>
          <h2 className="section-title">
            <span className="text-white">Nos </span>
            <span className="gold-text">Affiches</span>
          </h2>
          <div className="divider-gold mt-4" />
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <PosterCard poster={posters[current]} isActive />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-soutarah-gold/40 flex items-center justify-center text-soutarah-gold hover:bg-soutarah-gold hover:text-soutarah-dark transition-all duration-300 hover:scale-110"
            aria-label="Précédent"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-soutarah-gold/40 flex items-center justify-center text-soutarah-gold hover:bg-soutarah-gold hover:text-soutarah-dark transition-all duration-300 hover:scale-110"
            aria-label="Suivant"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {posters.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-8 h-2 bg-soutarah-gold'
                  : 'w-2 h-2 bg-white/30 hover:bg-soutarah-gold/50'
              }`}
              aria-label={`Affiche ${i + 1}`}
            />
          ))}
        </div>

        {/* Poster count */}
        <p className="text-center text-white/40 text-xs mt-4 uppercase tracking-widest">
          {current + 1} / {posters.length}
        </p>
      </div>
    </section>
  )
}
