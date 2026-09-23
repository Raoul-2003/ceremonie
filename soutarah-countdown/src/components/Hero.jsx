import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Calendar, ChevronDown } from 'lucide-react'

const EVENT_DATE = new Date('2026-09-24T09:00:00')

function getDaysLeft() {
  const now  = new Date()
  const diff = EVENT_DATE - now
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export default function Hero() {
  const [daysLeft, setDaysLeft] = useState(getDaysLeft())

  useEffect(() => {
    const timer = setInterval(() => setDaysLeft(getDaysLeft()), 60_000)
    return () => clearInterval(timer)
  }, [])

  const label =
    daysLeft === 0
      ? "JOUR J"
      : `J-${daysLeft}`

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-soutarah-dark via-soutarah-green-dark/60 to-soutarah-dark" />

      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-soutarah-green/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-soutarah-gold/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Gold particle lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-soutarah-gold/30 to-transparent"
            style={{
              top: `${15 + i * 15}%`,
              left: '-10%',
              right: '-10%',
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-32 pb-16">

        {/* Subtitle badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-soutarah-gold/40 bg-soutarah-gold/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-soutarah-gold animate-ping" />
          <span className="section-subtitle text-xs">GROUPE SOUTARAH × BNI</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-heading font-black text-4xl md:text-6xl lg:text-7xl leading-tight mb-4"
        >
          <span className="text-white">CÉRÉMONIE OFFICIELLE</span>
          <br />
          <span className="gold-text">DE REMISE DE FINANCEMENT</span>
        </motion.h1>

        <div className="divider-gold" />

        {/* J-X Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
          className="my-10"
        >
          <div className="inline-block relative">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-3xl bg-soutarah-gold/20 blur-xl animate-pulse-gold" />
            <div className="relative glass-card gold-border px-12 py-8 rounded-3xl">
              <p className="text-soutarah-gold/70 uppercase tracking-[0.4em] text-xs font-semibold mb-2">
                Compte à rebours
              </p>
              <motion.p
                key={label}
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0,   opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="font-heading font-black text-7xl md:text-9xl lg:text-[10rem] leading-none animate-glow"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #A07830 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {label}
              </motion.p>
              <p className="text-white/60 uppercase tracking-widest text-sm mt-2">
                La cérémonie approche
              </p>
            </div>
          </div>
        </motion.div>

        {/* Event details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10"
        >
          <div className="flex items-center gap-2 glass-card px-5 py-3 rounded-xl">
            <Calendar size={18} className="text-soutarah-gold" />
            <div className="text-left">
              <p className="text-soutarah-gold font-semibold text-sm">JEUDI 24 SEPTEMBRE 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2 glass-card px-5 py-3 rounded-xl">
            <Clock size={18} className="text-soutarah-gold" />
            <p className="text-soutarah-gold font-semibold text-sm">09H00</p>
          </div>
          <div className="flex items-center gap-2 glass-card px-5 py-3 rounded-xl">
            <MapPin size={18} className="text-soutarah-gold" />
            <div className="text-left">
              <p className="text-white font-semibold text-sm">HÔTEL DES ARMÉES</p>
              <p className="text-white/60 text-xs">Salle Tené Brahima — Plateau</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a href="#programme" className="btn-gold text-sm font-bold shadow-gold hover:shadow-gold-lg">
            Découvrir l'événement
          </a>
          <a href="#compte-a-rebours" className="btn-outline text-sm font-bold">
            Voir le compte à rebours
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-soutarah-gold/50"
      >
        <span className="text-xs tracking-widest uppercase">Défiler</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
