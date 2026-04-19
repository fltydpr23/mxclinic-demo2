import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Phone, MapPin, Star, Clock, ChevronDown, Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

// ── DATA ────────────────────────────────────────────────

interface Treatment { id: number; title: string; price: string; description: string; image: string }

const landingTreatments: Treatment[] = [
  {
    id: 1,
    title: 'Hydrafacial™ Detox',
    price: 'From £95',
    description: 'Cleanse, extract, and hydrate for an instant glow. Zero downtime.',
    // Hydrafacial wand treatment on face — clinical facial device
    image: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 2,
    title: 'Laser Hair Removal',
    price: 'From £39',
    description: 'Medical-grade precision for all skin tones. Permanent, painless, proven.',
    // Real clinic photo of laser treatment
    image: '/pictures/laserhairremoval.jpg',
  },
  {
    id: 3,
    title: 'Dark Eye Treatment',
    price: 'From £110',
    description: 'Clinical precision for dark circles, puffiness and under-eye fatigue.',
    // Real clinic photo of dark eye treatment
    image: '/pictures/darkeyetreatment.jpg',
  },
  {
    id: 4,
    title: 'Acne Mastery',
    price: 'Bespoke',
    description: 'Clear active breakouts and reveal radiant skin beneath with targeted programs.',
    // Real clinic photo of acne treatment
    image: '/pictures/acne1.jpg',
  },
]

const reviews = [
  { id: 1, name: 'Maxine Williams', location: 'Verified Patient', text: "The dermatologist is very professional, friendly and accommodating. I'm doing laser hair removal with her and she always makes you feel comfortable. I can see a difference already. Definitely would recommend!", rating: 5 },
  { id: 2, name: 'Mariana Ferreira', location: 'Verified Patient', text: 'Ladies are amazing both professionally and as a person. Laser Therapist was always super accommodating and made sure I would feedback her the progress of my hair growth so that she could focus more in those areas. Definitely recommend for people looking for excellent results! Big thanks xxx', rating: 5 },
  { id: 3, name: 'Raghad Hafidh', location: 'Verified Patient', text: 'Facialist girl is very professional and so friendly. I was very relaxed when she was doing HydraFacial treatment and she explained all treatment stages and benefits. I have already seen the result and Highly recommended for everyone.', rating: 5 },
]

// Team ordered: Emilia → Malgorzata → Samera → Stephanie (per clinic preference)
const team = [
  { id: 1, name: 'Emilia Alijeva', role: 'Advanced Aesthetician & Senior Therapist', credential: 'Acne & Skin Specialist · Advanced Practitioner', bio: 'With expertise in acne management and advanced skin treatments, Emilia combines clinical knowledge with a deeply personal approach to transform challenging skin conditions.', image: '/pictures/emilia.png' },
  { id: 2, name: 'Malgorzata Krajewska', role: 'Skin & Laser Therapist', credential: 'Laser Safety Certified · Skin Specialist', bio: 'A highly skilled laser and skin therapist, Malgorzata specialises in laser hair removal and skin resurfacing — delivering precise, consistent, and trusted results.', image: '/pictures/malgorzata.png' },
  { id: 3, name: 'Samera Mughal', role: 'Pharmacist Prescriber & Aesthetic Practitioner', credential: 'NHS Pharmacist · GPhC Registered', bio: 'Our clinical lead and NHS-qualified pharmacist prescriber, Samera ensures every treatment at MX is delivered under rigorous medical oversight. Your safety is her standard.', image: '/pictures/samera.jpg' },
  { id: 4, name: 'Stephanie Harrison', role: 'Laser & Skin Therapist', credential: 'Aesthetic Therapist · Laser Specialist', bio: 'Stephanie brings warmth and clinical precision to every session. She has a particular passion for skin health transformations and building lasting client relationships.', image: '/pictures/stephanie.jpg' },
]

const hours = [
  { day: 'Monday', time: '10am – 6pm' },
  { day: 'Tuesday', time: 'Closed' },
  { day: 'Wednesday', time: '2pm – 7pm' },
  { day: 'Thursday', time: '10am – 6pm' },
  { day: 'Friday', time: '10am – 6pm' },
  { day: 'Saturday', time: '10:30am – 3:30pm' },
  { day: 'Sunday', time: 'Closed' },
]

const faqs = [
  { q: 'Is the clinic medically supervised?', a: 'Yes. Every treatment at MX Skin & Laser Clinic is carried out under the supervision of Samera Mughal, a GPhC-registered NHS Pharmacist Prescriber. Medical oversight is not optional at MX — it is our standard.' },
  { q: 'How many laser hair removal sessions will I need?', a: 'Most clients see optimal results after 6–8 sessions, spaced 4–6 weeks apart. The exact number depends on your skin tone, hair colour, and target area. We recommend a patch test consultation (£20, redeemable) before starting any laser programme.' },
  { q: 'Can I claim my consultation fee back?', a: 'Absolutely. Our £20 consultation fee is fully redeemable against any treatment booked at the clinic. It\'s our way of ensuring you receive expert guidance before committing to any procedure.' },
  { q: 'Are your treatments suitable for all skin tones?', a: 'Yes. Our team has extensive experience treating diverse skin tones, and we use medical-grade technology calibrated for each individual. We particularly pride ourselves on safe, effective laser treatments for melanin-rich skin.' },
  { q: 'What is the recovery time after treatments like microneedling or chemical peels?', a: 'It varies by treatment. Hydrafacial and LED therapy have zero downtime. Microneedling typically involves 24–48 hours of redness. Medical-grade chemical peels (TCA, for example) may require 3–5 days of peeling. Your practitioner will walk you through exactly what to expect at your consultation.' },
  { q: 'Do you offer payment plans or finance?', a: 'Yes — we offer 0% interest aesthetic financing to make your treatments accessible. Ask us about payment plan options during your consultation.' },
  { q: 'Where exactly is the clinic located?', a: 'We are at 146 Cardigan Road, Headingley, Leeds LS6 1LU — conveniently located with street parking available nearby and excellent bus links to the city centre and university area.' },
  { q: 'Can I book a virtual consultation first?', a: 'Yes. We offer 15-minute virtual consultations at £18, fully redeemable against treatment. This is ideal if you\'d like to discuss your skin concerns with a practitioner before visiting in person.' },
]

// ── ICONS ────────────────────────────────────────────────

const WhatsAppIcon = ({ size = 26, color = 'white' }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)

// ── FAQ ITEM ─────────────────────────────────────────────

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      className="faq-item"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <button className={`faq-trigger${open ? ' faq-trigger--open' : ''}`} onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <ChevronDown size={18} strokeWidth={1.5} className="faq-chevron" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── ENQUIRY FORM ──────────────────────────────────────────

function EnquiryForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', treatment: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const buildWhatsAppMsg = () => {
    const lines = [
      `Hi MX Skin & Laser Clinic,`,
      ``,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : '',
      form.treatment ? `Treatment of interest: ${form.treatment}` : '',
      form.message ? `Message: ${form.message}` : '',
    ].filter(Boolean).join('\n')
    return `https://wa.me/447727118885?text=${encodeURIComponent(lines)}`
  }

  const handleWhatsApp = () => {
    if (!form.name || !form.email) return
    window.open(buildWhatsAppMsg(), '_blank')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Email capture — replace with your CRM/Mailchimp endpoint if available
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="form-success">
        <CheckCircle size={40} strokeWidth={1.5} color="#C4A08E" />
        <h3>Thank you, {form.name}.</h3>
        <p>We'll be in touch within 24 hours. For faster response, chat with us on WhatsApp.</p>
        <button className="btn btn-dark" onClick={() => window.open(buildWhatsAppMsg(), '_blank')}>
          <WhatsAppIcon size={18} />
          Continue on WhatsApp
        </button>
      </div>
    )
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Full Name <span>*</span></label>
          <div className="input-wrap">
            <User size={15} strokeWidth={1.5} />
            <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="email">Email Address <span>*</span></label>
          <div className="input-wrap">
            <Mail size={15} strokeWidth={1.5} />
            <input id="email" name="email" type="email" placeholder="Your email" value={form.email} onChange={handleChange} required />
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="phone">Phone (optional)</label>
          <div className="input-wrap">
            <Phone size={15} strokeWidth={1.5} />
            <input id="phone" name="phone" type="tel" placeholder="07xxx xxxxxx" value={form.phone} onChange={handleChange} />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="treatment">Treatment of Interest</label>
          <div className="input-wrap input-wrap--select">
            <select id="treatment" name="treatment" value={form.treatment} onChange={handleChange}>
              <option value="">Select a treatment…</option>
              <option>Hydrafacial™</option>
              <option>Laser Hair Removal</option>
              <option>Chemical Peel</option>
              <option>Microneedling</option>
              <option>Dark Eye Treatment</option>
              <option>Acne Treatment</option>
              <option>Skin Consultation</option>
              <option>Other / Not sure yet</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-field form-field--full">
        <label htmlFor="message">Message</label>
        <div className="input-wrap input-wrap--textarea">
          <MessageSquare size={15} strokeWidth={1.5} />
          <textarea id="message" name="message" rows={4} placeholder="Tell us about your skin concerns or any questions…" value={form.message} onChange={handleChange} />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-dark form-btn">
          <Send size={16} strokeWidth={1.5} />
          Send Enquiry
        </button>
        <button type="button" className="btn btn-wa form-btn" onClick={handleWhatsApp}>
          <WhatsAppIcon size={18} />
          Send via WhatsApp
        </button>
      </div>
      <p className="form-note">We reply within 24 hours. Your details are never shared.</p>
    </form>
  )
}

// ── HOME PAGE ─────────────────────────────────────────────

function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const { scrollY } = useScroll()

  const heroSlides = [
    {
      id: 1,
      video: '/videos/hero-main.mp4',
      eyebrow: 'Leeds · Advanced Aesthetic Clinic',
      title: <>Your skin,<br /><em>beautifully</em><br />transformed.</>,
      sub: <>NHS-standard clinical expertise. Medical-grade technology.<br />Results that speak for themselves.</>
    },
    {
      id: 2,
      video: '/videos/hero-2.mp4',
      eyebrow: 'Signature Treatments',
      title: <>The Ultimate<br /><em>Glow.</em></>,
      sub: <>Experience our clinical HydraFacial treatment.<br />Cleanse, extract, and intensely hydrate with zero downtime.</>
    }
  ]

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const heroTextY = useTransform(scrollY, [0, 500], [0, 80])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  // Get today's hours
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long' })
  const todayHours = hours.find(h => h.day === today)

  return (
    <div className="app">

      {/* ── NAV ── */}
      <nav className={`nav${isScrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">MX SKIN & LASER</Link>
          <div className="nav-links">
            <button className="nav-link" onClick={() => scrollTo('treatments')}>Treatments</button>
            <button className="nav-link" onClick={() => scrollTo('reviews')}>Reviews</button>
            <button className="nav-link" onClick={() => scrollTo('faq')}>FAQ</button>
            <button className="nav-link" onClick={() => scrollTo('contact')}>Contact</button>
            <a href="tel:01132988087" className="nav-phone">
              <Phone size={14} strokeWidth={1.5} />
              <span>0113 298 8087</span>
            </a>
          </div>
          <button className={`hamburger${isMenuOpen ? ' hamburger--open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <motion.div className="mobile-menu" initial={false} animate={isMenuOpen ? { opacity: 1, pointerEvents: 'all' } : { opacity: 0, pointerEvents: 'none' }} transition={{ duration: 0.4 }}>
        <button className="mobile-link" onClick={() => scrollTo('treatments')}>Treatments</button>
        <button className="mobile-link" onClick={() => scrollTo('reviews')}>Client Stories</button>
        <button className="mobile-link" onClick={() => scrollTo('team')}>Our Team</button>
        <button className="mobile-link" onClick={() => scrollTo('faq')}>FAQ</button>
        <Link className="mobile-link" to="/treatments" onClick={() => setIsMenuOpen(false)}>Full Menu</Link>
        <button className="btn btn-hero-primary" onClick={() => scrollTo('enquiry')}>Book a Consultation</button>
      </motion.div>

      {/* ── HERO CAROUSEL ── */}
      <header className="hero">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`media-${currentSlide}`}
            className="hero-media"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="hero-overlay" />
            <video autoPlay muted loop playsInline className="hero-video" src={heroSlides[currentSlide].video} />
          </motion.div>
        </AnimatePresence>

        <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="hero-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <span className="hero-eyebrow">{heroSlides[currentSlide].eyebrow}</span>
              <h1 className="hero-title">{heroSlides[currentSlide].title}</h1>
              <p className="hero-sub">{heroSlides[currentSlide].sub}</p>
            </motion.div>
          </AnimatePresence>
          
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}>
            <button className="btn btn-hero-primary" onClick={() => scrollTo('enquiry')}>Book a Consultation</button>
            <button className="btn btn-hero-ghost" onClick={() => scrollTo('treatments')}>Explore Treatments</button>
          </motion.div>
        </motion.div>

        {/* Carousel Progress Lines */}
        <div className="hero-carousel-nav">
          {heroSlides.map((_, idx) => (
            <button key={idx} className="carousel-line-btn" onClick={() => setCurrentSlide(idx)}>
              <div className={`carousel-line ${idx === currentSlide ? 'carousel-line--active' : ''}`}>
                <div className="carousel-line-fill" />
              </div>
            </button>
          ))}
        </div>

        <motion.div className="hero-badge" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 1.2 }}>
          <span className="hero-badge-score">4.9</span>
          <div className="hero-badge-stars">{[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#C4A08E" color="#C4A08E" />)}</div>
          <span className="hero-badge-label">125+ Reviews</span>
        </motion.div>
      </header>

      {/* ── TRUST STRIP ── */}
      <div className="trust-strip">
        {[
          { label: 'NHS Supervised', value: 'Medical Oversight' },
          { label: '4.9 ★ Rating', value: '125+ Verified Reviews' },
          { label: '£20 Consultations', value: 'Fully Redeemable' },
          { label: '0% Interest', value: 'Aesthetic Financing' },
        ].map(item => (
          <div key={item.label} className="trust-item">
            <span className="trust-label">{item.label}</span>
            <span className="trust-value">{item.value}</span>
          </div>
        ))}
      </div>

      {/* ── GPhC / NHS BADGE BAR ── */}
      <div className="badge-bar">
        <div className="badge-bar-inner">
          <div className="cred-badge">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#C4A08E" strokeWidth="1.5"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"/></svg>
            <span>GPhC Registered Pharmacist</span>
          </div>
          <div className="badge-divider" />
          <div className="cred-badge">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#C4A08E" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/></svg>
            <span>NHS Pharmacist Prescriber Supervised</span>
          </div>
          <div className="badge-divider" />
          <div className="cred-badge">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#C4A08E" strokeWidth="1.5"><path d="M9 12l2 2 4-4"/><rect x="3" y="3" width="18" height="18" rx="3"/></svg>
            <span>Medical-Grade Technology</span>
          </div>
          <div className="badge-divider" />
          <div className="cred-badge">
            <Clock size={20} strokeWidth={1.5} color="#C4A08E" />
            <span>Open Today: {todayHours ? todayHours.time : 'See Hours'}</span>
          </div>
        </div>
      </div>

      {/* ── TREATMENTS ── */}
      <section id="treatments" className="section">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="eyebrow">Bespoke Rituals</span>
            <h2 className="section-title">Signature Treatments</h2>
          </motion.div>
          <div className="treatment-grid">
            {landingTreatments.map((t, i) => (
              <motion.div key={t.id} className={`treatment-card${i % 2 !== 0 ? ' treatment-card--offset' : ''}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}>
                <div className="treatment-img-wrap">
                  <img src={t.image} alt={t.title} className="treatment-img" loading="lazy" />
                  <span className="treatment-price">{t.price}</span>
                </div>
                <div className="treatment-body">
                  <h3 className="treatment-name">{t.title}</h3>
                  <p className="treatment-desc">{t.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="menu-cta">
            <Link to="/treatments" className="btn-outline-dark">View Full Treatment Menu</Link>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="section section--tinted">

        {/* Editorial banner: full-bleed split with the pink diversity image */}
        <div className="reviews-editorial">
          <div className="reviews-editorial-img">
            <img src="/pictures/pexels-rocketmann.jpg" alt="Diverse skin tones at MX Skin & Laser Clinic" />
          </div>
          <motion.div
            className="reviews-editorial-copy"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <span className="eyebrow">For Every Skin</span>
            <blockquote className="reviews-pull-quote">
              “Skin that is seen,<br />understood,<br /><em>and celebrated.”</em>
            </blockquote>
            <p className="reviews-editorial-sub">
              Our specialists are trained across every skin tone, texture, and concern.
              NHS-supervised, medically precise, deeply personal.
            </p>
            <div className="reviews-editorial-stat">
              <span className="stat-num">125+</span>
              <span className="stat-label">5★ verified patient reviews</span>
            </div>
          </motion.div>
        </div>

        <div className="container" style={{ marginTop: '80px' }}>
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="eyebrow">Client Stories</span>
            <h2 className="section-title">Patient Reviews</h2>
          </motion.div>
          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <motion.div key={r.id} className="review-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}>
                <div className="review-stars">{[...Array(r.rating)].map((_, j) => <Star key={j} size={15} fill="#C4A08E" color="#C4A08E" />)}</div>
                <p className="review-quote">“{r.text}”</p>
                <div className="review-author">
                  <span className="review-name">{r.name}</span>
                  <span className="review-location">{r.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="section">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="eyebrow">The Practitioners</span>
            <h2 className="section-title">Meet the Team</h2>
            <p className="section-subtitle">Every treatment is delivered by a qualified specialist — never delegated, never rushed.</p>
          </motion.div>
          <div className="team-grid">
            {team.map((member, i) => (
              <motion.div key={member.id} className="team-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}>
                <div className="team-img-wrap">
                  <img src={member.image} alt={member.name} className="team-img" loading="lazy" />
                </div>
                <div className="team-body">
                  <span className="team-credential">{member.credential}</span>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section section--tinted">
        <div className="container faq-layout">
          <motion.div className="faq-header" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="eyebrow">Common Questions</span>
            <h2 className="section-title">FAQ</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', marginLeft: 0 }}>
              Everything you need to know before booking your first visit.
            </p>
            <button className="btn btn-dark faq-cta" onClick={() => scrollTo('enquiry')}>
              Still have questions? Ask us
            </button>
          </motion.div>
          <div className="faq-list">
            {faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT + HOURS ── */}
      <section id="contact" className="section">
        <div className="container contact-layout">
          <motion.div className="contact-info" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="eyebrow">Get in Touch</span>
            <h2 className="section-title">Visit the Clinic</h2>
            <div className="contact-detail"><MapPin size={18} strokeWidth={1.5} color="#C4A08E" /><span>146 Cardigan Road, Headingley, Leeds LS6 1LU</span></div>
            <div className="contact-detail"><Phone size={18} strokeWidth={1.5} color="#C4A08E" /><a href="tel:01132988087">0113 298 8087</a></div>

            {/* Opening Hours */}
            <div className="hours-block">
              <div className="hours-title">
                <Clock size={16} strokeWidth={1.5} color="#C4A08E" />
                <span>Opening Hours</span>
              </div>
              <ul className="hours-list">
                {hours.map(h => (
                  <li key={h.day} className={`hours-row${h.day === today ? ' hours-row--today' : ''}${h.time === 'Closed' ? ' hours-row--closed' : ''}`}>
                    <span className="hours-day">{h.day}</span>
                    <span className="hours-time">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div className="contact-map" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2355.795920549723!2d-1.578161322823755!3d53.8109150398614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48795de4cb04a02b%3A0x4f392f857f9edd14!2sMX%20Skin%20%26%20Laser%20Clinic!5e0!3m2!1sen!2sin!4v1776511674251!5m2!1sen!2sin"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="MX Skin & Laser Clinic location"
            />
          </motion.div>
        </div>
      </section>

      {/* ── ENQUIRY FORM ── */}
      <section id="enquiry" className="section section--enquiry-bg">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="eyebrow">Start Your Journey</span>
            <h2 className="section-title">Book a Consultation</h2>
            <p className="section-subtitle">Tell us about your skin goals. We'll be in touch within 24 hours — or connect instantly via WhatsApp.</p>
          </motion.div>
          <motion.div className="enquiry-wrap" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
            <EnquiryForm />
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">MX SKIN & LASER</span>
            <p className="footer-tagline">Leeds' refined destination for clinical aesthetics.<br />Led by NHS-supervised experts since 2019.</p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/mxskinandlaserclinic/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><InstagramIcon /></a>
              <a href="https://wa.me/447727118885" target="_blank" rel="noopener noreferrer" className="social-icon social-icon--wa" aria-label="WhatsApp"><WhatsAppIcon size={18} color="#3C3230" /></a>
            </div>
          </div>

          <div className="footer-col">
            <h5 className="footer-heading">Treatments</h5>
            <ul className="footer-list">
              <li><Link to="/treatments">Hydrafacial™</Link></li>
              <li><Link to="/treatments">Laser Hair Removal</Link></li>
              <li><Link to="/treatments">Chemical Peels</Link></li>
              <li><Link to="/treatments">Microneedling</Link></li>
              <li><Link to="/treatments">Full Menu →</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-heading">Clinic & Legal</h5>
            <ul className="footer-list">
              <li><button onClick={() => scrollTo('team')}>Our Team</button></li>
              <li><button onClick={() => scrollTo('reviews')}>Stories</button></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Cookies</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-heading">Contact & Hours</h5>
            <ul className="footer-list">
              <li>146 Cardigan Road, Leeds LS6 1LU</li>
              <li><a href="tel:01132988087">0113 298 8087</a></li>
              <li style={{ marginTop: '10px' }}>Mon, Thu, Fri: 10am–6pm</li>
              <li>Wed: 2pm–7pm</li>
              <li>Sat: 10:30am–3:30pm</li>
              <li>Tue & Sun: Closed</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 MX Skin & Laser Clinic · NHS Pharmacist Supervised · GPhC Registered</span>
          <span>Headingley, Leeds</span>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ── */}
      <div className="wa-fab-wrapper">
        {/* Hover popup — WhatsApp chat preview */}
        <div className="wa-popup">
          <div className="wa-popup-header">
            <div className="wa-popup-avatar">
              <WhatsAppIcon size={20} />
            </div>
            <div>
              <p className="wa-popup-name">MX Skin & Laser Clinic</p>
              <p className="wa-popup-online">Typically replies within an hour</p>
            </div>
          </div>
          <div className="wa-popup-bubble">
            Hi 👋 Welcome to MX Skin & Laser! How can we help you today? Book a consultation or ask us anything about our treatments.
          </div>
          <a
            href="https://wa.me/447727118885?text=Hi%20MX%20Skin%20%26%20Laser%20Clinic%2C%20I%27d%20like%20to%20find%20out%20more%20about%20your%20treatments%20and%20book%20a%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="wa-popup-cta"
          >
            Start a conversation
          </a>
        </div>

        <a
          href="https://wa.me/447727118885?text=Hi%20MX%20Skin%20%26%20Laser%20Clinic%2C%20I%27d%20like%20to%20find%20out%20more%20about%20your%20treatments%20and%20book%20a%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="wa-fab"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon />
        </a>
      </div>

      {/* ── MOBILE STICKY BAR ── */}
      <div className="mobile-bar">
        <a href="tel:01132988087" className="mobile-bar-call"><Phone size={16} strokeWidth={1.5} /><span>Call</span></a>
        <button className="mobile-bar-book" onClick={() => scrollTo('enquiry')}>Book a Consultation</button>
        <a href="https://wa.me/447727118885" target="_blank" rel="noopener noreferrer" className="mobile-bar-wa" aria-label="WhatsApp"><WhatsAppIcon /></a>
      </div>

    </div>
  )
}

export default Home
