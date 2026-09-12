import { motion } from 'framer-motion'
import { TrendingUp, Cpu, Handshake, BarChart3 } from 'lucide-react'

const objectives = [
  {
    icon: TrendingUp,
    title: 'Financement Stratégique',
    description:
      'Accompagnement ciblé du développement des projets d\'envergure du Groupe Soutarah, avec un accès aux ressources financières adaptées à chaque phase.',
    tag: '01',
    color: 'from-soutarah-green-dark to-soutarah-green',
  },
  {
    icon: Cpu,
    title: 'Modernisation',
    description:
      'Déploiement de solutions innovantes pour la mobilité urbaine, les infrastructures et les systèmes logistiques de nouvelle génération.',
    tag: '02',
    color: 'from-soutarah-gold-dark to-soutarah-gold',
  },
  {
    icon: Handshake,
    title: 'Partenariat',
    description:
      'Une collaboration forte et durable entre institutions financières et entreprises privées, créant un écosystème de confiance et de performance.',
    tag: '03',
    color: 'from-soutarah-green to-soutarah-green-light',
  },
  {
    icon: BarChart3,
    title: 'Développement',
    description:
      'Contribution directe à la croissance économique nationale par l\'investissement productif, la création d\'emplois et le renforcement des capacités locales.',
    tag: '04',
    color: 'from-soutarah-gold to-soutarah-gold-light',
  },
]

function ObjectiveCard({ obj, index }) {
  const Icon = obj.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="glass-card gold-border rounded-3xl p-8 relative overflow-hidden group cursor-default"
    >
      {/* Number badge */}
      <div className="absolute top-4 right-6 font-heading font-black text-6xl text-white/5 group-hover:text-white/10 transition-all duration-500">
        {obj.tag}
      </div>

      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${obj.color} flex items-center justify-center mb-6 shadow-gold group-hover:shadow-gold-lg transition-all duration-300 group-hover:scale-110`}>
        <Icon size={24} className="text-white" />
      </div>

      {/* Gold accent bar */}
      <div className="w-10 h-0.5 mb-4" style={{ background: 'linear-gradient(90deg, #C9A84C, #E8C96A)' }} />

      {/* Title */}
      <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-soutarah-gold transition-colors duration-300">
        {obj.title}
      </h3>

      {/* Description */}
      <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">
        {obj.description}
      </p>

      {/* Bottom glow on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ background: `linear-gradient(90deg, transparent, #C9A84C, transparent)` }} />
    </motion.div>
  )
}

export default function Objectives() {
  return (
    <section id="objectifs" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-soutarah-dark via-soutarah-green-dark/20 to-soutarah-dark" />

      {/* Decorative circles */}
      <div className="absolute -left-32 top-1/2 w-64 h-64 rounded-full border border-soutarah-gold/10" />
      <div className="absolute -right-32 top-1/2 w-64 h-64 rounded-full border border-soutarah-gold/10" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-3">Notre vision</p>
          <h2 className="section-title">
            <span className="text-white">Nos </span>
            <span className="gold-text">Objectifs</span>
          </h2>
          <div className="divider-gold mt-4" />
          <p className="text-white/50 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Une cérémonie qui marque le début d'une nouvelle ère pour le développement
            économique et l'innovation en Côte d'Ivoire.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {objectives.map((obj, i) => (
            <ObjectiveCard key={obj.title} obj={obj} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
