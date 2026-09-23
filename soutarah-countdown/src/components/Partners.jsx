import { motion } from 'framer-motion'

const partners = [
  { id: 1,  name: 'Soutarah Group',  abbr: 'SG',  desc: 'Groupe Principal' },
  { id: 2,  name: 'BNI',             abbr: 'BNI', desc: 'Banque Nationale' },
  { id: 3,  name: 'Partenaire 3',    abbr: 'P3',  desc: 'Partenaire stratégique' },
  { id: 4,  name: 'Partenaire 4',    abbr: 'P4',  desc: 'Partenaire financier' },
  { id: 5,  name: 'Partenaire 5',    abbr: 'P5',  desc: 'Partenaire institutionnel' },
  { id: 6,  name: 'Partenaire 6',    abbr: 'P6',  desc: 'Partenaire technique' },
]

// Duplicate for seamless infinite scroll
const scrollItems = [...partners, ...partners]

function PartnerCard({ partner }) {
  return (
    <div className="flex-shrink-0 mx-4 glass-card gold-border px-8 py-5 rounded-2xl flex items-center gap-4 min-w-[220px] hover:border-soutarah-gold/70 transition-all duration-300 group">
      <div className="w-12 h-12 rounded-full bg-green-gradient flex items-center justify-center border border-soutarah-gold/40 shadow-gold group-hover:shadow-gold-lg transition-all duration-300 flex-shrink-0">
        <span className="font-heading font-black text-soutarah-gold text-sm">{partner.abbr}</span>
      </div>
      <div>
        <p className="text-white font-semibold text-sm leading-tight">{partner.name}</p>
        <p className="text-soutarah-gold/60 text-xs">{partner.desc}</p>
      </div>
    </div>
  )
}

export default function Partners() {
  return (
    <section id="partenaires" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-soutarah-green-dark/20 via-soutarah-dark to-soutarah-dark" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 px-4"
        >
          <p className="section-subtitle mb-3">Ils nous accompagnent</p>
          <h2 className="section-title">
            <span className="text-white">Nos </span>
            <span className="gold-text">Partenaires</span>
          </h2>
          <div className="divider-gold mt-4" />
        </motion.div>

        {/* Scrolling strip — row 1 (left to right) */}
        <div className="relative overflow-hidden mb-6">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
               style={{ background: 'linear-gradient(to right, #1A1A1A, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
               style={{ background: 'linear-gradient(to left, #1A1A1A, transparent)' }} />

          <div className="flex animate-scroll" style={{ width: 'max-content' }}>
            {scrollItems.map((p, i) => (
              <PartnerCard key={`${p.id}-${i}`} partner={p} />
            ))}
          </div>
        </div>

        {/* Scrolling strip — row 2 (right to left) */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
               style={{ background: 'linear-gradient(to right, #1A1A1A, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
               style={{ background: 'linear-gradient(to left, #1A1A1A, transparent)' }} />

          <div
            className="flex"
            style={{
              width: 'max-content',
              animation: 'scroll 25s linear infinite reverse',
            }}
          >
            {[...scrollItems].reverse().map((p, i) => (
              <PartnerCard key={`rev-${p.id}-${i}`} partner={p} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 px-4"
        >
          <p className="text-white/50 text-sm">
            Vous souhaitez devenir partenaire ?{' '}
            <a href="#contact" className="text-soutarah-gold hover:underline">
              Contactez-nous
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
