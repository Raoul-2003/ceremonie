import { motion } from 'framer-motion'
import { MapPin, Clock, Calendar, MessageCircle, Mail, Phone } from 'lucide-react'

// Social SVG icons (Facebook & LinkedIn removed from lucide-react)
function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}
function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Top divider */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />

      <div className="relative bg-gradient-to-b from-soutarah-green-dark/30 to-soutarah-dark">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-soutarah-green/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-8">
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-soutarah-gold/70 shadow-gold bg-soutarah-green-dark">
                  <span className="font-heading font-black text-soutarah-gold text-xl">SG</span>
                </div>
                <div>
                  <p className="font-heading font-black text-white text-xl">SOUTARAH GROUP</p>
                  <p className="text-soutarah-gold/70 text-sm tracking-widest uppercase">Excellence & Innovation</p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
                Un engagement pour l'avenir. Le Groupe Soutarah s'engage à transformer le paysage
                économique et industriel à travers des partenariats stratégiques de haut niveau.
              </p>
              {/* Social links */}
              <div className="flex items-center gap-3">
                {[
                  { icon: IconFacebook,  href: '#', label: 'Facebook' },
                  { icon: IconLinkedin,  href: '#', label: 'LinkedIn' },
                  { icon: MessageCircle, href: '#', label: 'WhatsApp' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-full glass-card border border-soutarah-gold/30 flex items-center justify-center text-soutarah-gold hover:bg-soutarah-gold hover:text-soutarah-dark transition-all duration-300 hover:scale-110 hover:shadow-gold"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Event info */}
            <div>
              <h4 className="font-heading font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-6 h-0.5 inline-block" style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
                L'Événement
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-soutarah-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80 text-sm font-medium">Date</p>
                    <p className="text-white/50 text-sm">Jeudi 24 Septembre 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-soutarah-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80 text-sm font-medium">Heure</p>
                    <p className="text-white/50 text-sm">09H00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-soutarah-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80 text-sm font-medium">Lieu</p>
                    <p className="text-white/50 text-sm">Hôtel des Armées</p>
                    <p className="text-white/40 text-xs">Salle Tené Brahima — Plateau</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-6 h-0.5 inline-block" style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
                Contact
              </h4>
              <div className="space-y-4">
                <a href="mailto:contact@soutarah.com" className="flex items-center gap-3 text-white/60 hover:text-soutarah-gold transition-colors duration-300">
                  <Mail size={16} className="text-soutarah-gold" />
                  <span className="text-sm">contact@soutarah.com</span>
                </a>
                <a href="tel:+2250000000000" className="flex items-center gap-3 text-white/60 hover:text-soutarah-gold transition-colors duration-300">
                  <Phone size={16} className="text-soutarah-gold" />
                  <span className="text-sm">+225 00 00 00 00 00</span>
                </a>
                <div className="flex items-center gap-3 text-white/60">
                  <MapPin size={16} className="text-soutarah-gold flex-shrink-0" />
                  <span className="text-sm">Abidjan, Côte d'Ivoire</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }} />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs text-center sm:text-left">
              © {year} Groupe Soutarah. Tous droits réservés.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-soutarah-green animate-pulse" />
              <p className="text-white/30 text-xs">Cérémonie Officielle — 24.09.2026</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white/20 text-xs">Propulsé par</span>
              <span className="text-soutarah-gold/60 text-xs font-semibold">BNI × Soutarah</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
