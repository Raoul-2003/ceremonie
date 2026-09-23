import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

// Gallery items — replace src with real image paths when available
const galleryItems = [
  { id: 1, title: 'Cérémonie 2024',        category: 'Cérémonie', src: null, color: 'from-soutarah-green-dark to-soutarah-green',            size: 'col-span-2 row-span-2' },
  { id: 2, title: 'Véhicule Premium',       category: 'Flotte',    src: null, color: 'from-soutarah-gold-dark to-soutarah-gold',              size: '' },
  { id: 3, title: 'Siège Social',           category: 'Immobilier',src: null, color: 'from-soutarah-green to-soutarah-green-light',           size: '' },
  { id: 4, title: 'Équipe Dirigeante',      category: 'Équipe',    src: null, color: 'from-soutarah-dark to-soutarah-green-dark',             size: '' },
  { id: 5, title: 'Flotte Soutarah',        category: 'Flotte',    src: null, color: 'from-soutarah-gold to-soutarah-gold-light',             size: '' },
  { id: 6, title: 'Partenariat BNI',        category: 'Partenariat',src: null,color: 'from-soutarah-green-dark to-soutarah-gold-dark',        size: '' },
  { id: 7, title: 'Infrastructure Moderne', category: 'Immobilier',src: null, color: 'from-soutarah-green to-soutarah-dark',                  size: 'col-span-2' },
]

const categories = ['Tout', 'Cérémonie', 'Flotte', 'Immobilier', 'Équipe', 'Partenariat']

function GalleryCard({ item, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      onClick={() => onClick(item)}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${item.size}`}
      style={{ minHeight: '180px' }}
    >
      {item.src ? (
        <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${item.color} min-h-[180px]`} />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-400" />

      {/* Hover content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="w-10 h-10 rounded-full bg-soutarah-gold/90 flex items-center justify-center mb-3">
          <ZoomIn size={18} className="text-soutarah-dark" />
        </div>
        <p className="text-white font-semibold text-sm text-center px-4">{item.title}</p>
        <span className="text-soutarah-gold/80 text-xs mt-1">{item.category}</span>
      </div>

      {/* Category badge */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/50 border border-soutarah-gold/30 backdrop-blur-sm">
        <span className="text-soutarah-gold text-xs font-semibold">{item.category}</span>
      </div>
    </motion.div>
  )
}

function Lightbox({ item, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="relative max-w-3xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-soutarah-gold/20 border border-soutarah-gold/40 flex items-center justify-center text-soutarah-gold hover:bg-soutarah-gold hover:text-soutarah-dark transition-all duration-300"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        <div className={`rounded-3xl overflow-hidden bg-gradient-to-br ${item.color} min-h-[400px] flex items-center justify-center relative`}>
          {item.src ? (
            <img src={item.src} alt={item.title} className="w-full h-full object-contain max-h-[600px]" />
          ) : (
            <div className="text-center p-12">
              <p className="font-heading font-bold text-white text-3xl mb-2">{item.title}</p>
              <p className="text-white/70">{item.category}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Tout')
  const [lightboxItem,   setLightboxItem]   = useState(null)

  const filtered = activeCategory === 'Tout'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <section id="galerie" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-soutarah-dark to-soutarah-green-dark/15" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-subtitle mb-3">Moments & réalisations</p>
          <h2 className="section-title">
            <span className="text-white">Notre </span>
            <span className="gold-text">Galerie</span>
          </h2>
          <div className="divider-gold mt-4" />
        </motion.div>

        {/* Category filter */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-soutarah-gold text-soutarah-dark shadow-gold font-bold'
                  : 'glass-card text-white/70 hover:text-white border border-white/10 hover:border-soutarah-gold/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]"
        >
          <AnimatePresence>
            {filtered.map(item => (
              <GalleryCard key={item.id} item={item} onClick={setLightboxItem} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
