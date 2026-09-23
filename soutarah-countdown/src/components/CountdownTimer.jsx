import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EVENT_DATE = new Date('2026-09-24T09:00:00')

function getTimeLeft() {
  const total = EVENT_DATE - new Date()
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(total / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / 1000 / 60) % 60),
    seconds: Math.floor((total / 1000) % 60),
  }
}

function pad(n) { return String(n).padStart(2, '0') }

function FlipUnit({ value, label }) {
  const prevRef = useRef(value)
  const [flip,   setFlip]   = useState(false)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (prevRef.current !== value) {
      setFlip(true)
      const t = setTimeout(() => {
        setDisplay(value)
        setFlip(false)
        prevRef.current = value
      }, 300)
      return () => clearTimeout(t)
    }
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-3"
    >
      {/* Card */}
      <div className="relative w-24 h-28 sm:w-32 sm:h-36 md:w-40 md:h-44">
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl bg-soutarah-gold/10 blur-lg" />

        {/* Top half */}
        <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #1e2d24 0%, #162318 100%)' }}>
          <div className="flex items-end justify-center h-full pb-1">
            <span className="font-heading font-black text-5xl sm:text-6xl md:text-7xl leading-none"
                  style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {pad(display)}
            </span>
          </div>
        </div>

        {/* Middle separator */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/60 z-10" />
        <div className="absolute top-1/2 left-4 right-4 h-px bg-soutarah-gold/20 z-10 -translate-y-px" />

        {/* Bottom half */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-2xl overflow-hidden"
             style={{ background: 'linear-gradient(180deg, #0f1a13 0%, #0a1109 100%)' }}>
          <div className="flex items-start justify-center h-full pt-1">
            <span className="font-heading font-black text-5xl sm:text-6xl md:text-7xl leading-none"
                  style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {pad(display)}
            </span>
          </div>
        </div>

        {/* Flip animation overlay */}
        <AnimatePresence>
          {flip && (
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, originY: 1 }}
              transition={{ duration: 0.3, ease: 'easeIn' }}
              className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl z-20 flex items-end justify-center pb-1"
              style={{ background: 'linear-gradient(180deg, #2a3f2e 0%, #1e2d24 100%)' }}
            >
              <span className="font-heading font-black text-5xl sm:text-6xl md:text-7xl leading-none"
                    style={{ background: 'linear-gradient(135deg, #E8C96A, #C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {pad(value)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Border */}
        <div className="absolute inset-0 rounded-2xl border border-soutarah-gold/30 pointer-events-none shadow-gold" />
        {/* Corner screws */}
        {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-1.5 h-1.5 rounded-full bg-soutarah-gold/40`} />
        ))}
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="text-soutarah-gold uppercase tracking-[0.3em] text-xs font-bold">{label}</p>
      </div>
    </motion.div>
  )
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  const units = [
    { value: time.days,    label: 'JOURS' },
    { value: time.hours,   label: 'HEURES' },
    { value: time.minutes, label: 'MINUTES' },
    { value: time.seconds, label: 'SECONDES' },
  ]

  return (
    <section id="compte-a-rebours" className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-soutarah-dark via-soutarah-green-dark/30 to-soutarah-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-soutarah-gold/5 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-3">Compte à rebours officiel</p>
          <h2 className="section-title">
            <span className="text-white">Le grand rendez-vous</span>
            <br />
            <span className="gold-text">approche</span>
          </h2>
          <div className="divider-gold mt-4" />
          <p className="text-white/60 mt-4 text-sm">
            Jeudi 24 Septembre 2026 · 09H00 · Hôtel des Armées, Plateau
          </p>
        </motion.div>

        {/* Flip units */}
        <div className="glass-card gold-border p-8 md:p-12 rounded-3xl">
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {units.map((u, i) => (
              <div key={u.label} className="flex items-center gap-4 md:gap-8">
                <FlipUnit value={u.value} label={u.label} />
                {i < units.length - 1 && (
                  <div className="flex flex-col gap-3 mb-8">
                    <div className="w-2 h-2 rounded-full bg-soutarah-gold animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-soutarah-gold animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Date badge bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-soutarah-gold/30 bg-soutarah-gold/5">
              <span className="w-1.5 h-1.5 rounded-full bg-soutarah-gold animate-ping" />
              <span className="text-soutarah-gold/80 uppercase tracking-[0.3em] text-xs font-semibold">
                24 · 09 · 2026
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-soutarah-gold animate-ping" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
