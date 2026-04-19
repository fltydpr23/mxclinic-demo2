import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, ArrowUp } from 'lucide-react'

const menuData = [
  {
    category: 'Consultations',
    items: [
      { name: 'Consultation & Laser Patch Test', note: 'Fee redeemable against treatment', time: '15 min', price: '£20' },
      { name: 'Skincare Consultation', note: 'One-to-one professional diagnosis', time: '30 min', price: '£25' },
      { name: 'Virtual Consultation', note: 'Quick virtual with practitioner', time: '15 min', price: '£18' },
      { name: 'Review Session', note: 'Progress assessment', time: '30 min', price: 'Complimentary' },
    ],
  },
  {
    category: 'Facials & Skin Treatments',
    items: [
      { name: 'Microdermabrasion', note: 'Gentle mechanical exfoliation', time: '45 min', price: '£58' },
      { name: 'Classic Facial', note: 'Refreshing facial with massage', time: '45 min', price: '£50' },
      { name: 'Carboxytherapy Facial', note: 'CO₂ infusion treatment', time: '1 hr', price: 'From £70' },
      { name: 'Hydrafacial™ Treatment', note: 'Multi-purpose skin treatment', time: '1 hr', price: 'From £95' },
      { name: 'Ultrasonic Skin Tightening', note: '', time: '1 hr', price: '£68' },
      { name: 'Photo Facial (LED Light Therapy)', note: 'Photobiomodulation therapy', time: '30 min', price: '£35' },
      { name: 'Microdermabrasion + LED Therapy', note: '', time: '45 min', price: '£90' },
    ],
  },
  {
    category: 'Chemical Peels & Advanced',
    items: [
      { name: 'Mask Peel Express', note: 'Purifying chemical peel', time: '30 min', price: '£85' },
      { name: 'Chemical Peels (Epidermis Only)', note: 'Skin resurfacing with massage', time: '1 hr', price: 'From £68' },
      { name: 'TCA Peel', note: '', time: '45 min', price: '£160' },
      { name: 'TCA Peel (Anti-Ageing)', note: 'For fine lines & wrinkles', time: '45 min', price: '£160' },
      { name: 'Chemical Peel (Salicylic Acid 20%)', note: 'For pigmentation & texture', time: '45 min', price: '£85–£90' },
      { name: 'Chemical Peel (40%)', note: 'Sebum & oil control', time: '45 min', price: '£80–£85' },
      { name: 'Glycolic Acid Peel Facial', note: '', time: '45 min', price: '£65' },
      { name: 'Biorepeel', note: 'No-downtime biphasic peel', time: '45 min', price: '£80' },
      { name: 'Advanced Chemical Peels', note: 'Medical-grade (Vitality Institute)', time: '45 min', price: 'From £250' },
    ],
  },
  {
    category: 'Acne & Extraction',
    items: [
      { name: 'Blackhead Extractions (Small Area)', note: '', time: '30 min', price: '£50' },
      { name: 'Full Face Extractions', note: 'Includes ultrasound & lancing', time: '1 hr', price: '£89' },
      { name: 'Acne Busting Facial', note: 'High-frequency + enzyme peel', time: '45 min', price: '£75' },
      { name: 'Crystal Peel (Acne & PIH)', note: '', time: '45 min', price: '£99–£105' },
      { name: 'Crystal Peel (Back Acne)', note: '', time: '45 min', price: '£150–£160' },
    ],
  },
  {
    category: 'Microneedling & Skin Boosters',
    items: [
      { name: 'Microneedling Treatment', note: 'Collagen induction', time: '1 hr', price: 'From £155' },
      { name: 'Microneedling Full Face', note: '', time: '1 hr', price: 'From £155' },
      { name: 'Microneedling + Glow Peel', note: '', time: '1 hr', price: 'From £195' },
      { name: 'Microneedling + Biorepeel Duo', note: '', time: '1 hr', price: '£170' },
      { name: 'Radio Frequency Microneedling', note: 'Morpheus equivalent', time: '1 hr', price: 'From £199' },
      { name: 'Microneedling Around Eyes', note: '', time: '30 min', price: '£70' },
      { name: 'Microneedling for Fuller Lips', note: '', time: '35 min', price: '£65' },
    ],
  },
  {
    category: 'Specialised Treatments',
    items: [
      { name: 'Dark Pigmented Undereye Treatment', note: 'Global Eyecon', time: '1 hr', price: 'From £110' },
      { name: 'Stretch Mark Treatment (RF Microneedling)', note: '', time: '1 hr', price: 'From £199' },
      { name: 'Radio Frequency Skin Tightening', note: 'Face / Neck', time: '45 min', price: '£78' },
      { name: 'Seventy Hyal 2000 Skin Booster', note: '', time: '45 min', price: '£130' },
    ],
  },
  {
    category: 'Laser Hair Removal — Small Areas',
    items: [
      { name: 'Upper Lip', note: '', time: '15 min', price: 'From £29' },
      { name: 'Chin', note: '', time: '15 min', price: 'From £39' },
      { name: 'Sideburns', note: '', time: '15 min', price: 'From £29' },
      { name: 'Cheeks', note: '', time: '15 min', price: 'From £39' },
      { name: 'Back of Neck / Lower Neck', note: '', time: '15 min', price: 'From £29–£39' },
      { name: 'Nipples', note: '', time: '15 min', price: 'From £29' },
      { name: 'Hands & Fingers', note: '', time: '15 min', price: 'From £29' },
      { name: 'Feet & Toes', note: '', time: '15 min', price: 'From £29' },
      { name: 'Earlobes & Eyebrows', note: '', time: '15 min', price: '£29' },
    ],
  },
  {
    category: 'Laser Hair Removal — Medium & Large',
    items: [
      { name: 'Underarms', note: '', time: '30 min', price: 'From £49' },
      { name: 'Bikini Classic', note: '', time: '30 min', price: 'From £39' },
      { name: 'Bikini Hollywood', note: '', time: '30 min', price: 'From £59' },
      { name: 'Half Arms', note: '', time: '30 min', price: 'From £49' },
      { name: 'Chest (Male)', note: '', time: '30 min', price: 'From £60' },
      { name: 'Full Arms', note: '', time: '45 min', price: 'From £69' },
      { name: 'Lower or Upper Legs', note: '', time: '45 min', price: 'From £69' },
      { name: 'Full Back', note: '', time: '45 min', price: 'From £89' },
      { name: 'Full Legs', note: '', time: '45 min', price: 'From £89' },
      { name: 'Full Body (Excl. Face)', note: '', time: '~2 hrs', price: 'From £201' },
      { name: 'Full Body (Incl. Face)', note: '', time: '~2.5 hrs', price: 'From £229' },
    ],
  },
  {
    category: 'Massage & Body',
    items: [
      { name: 'Deep Tissue Back Massage', note: '', time: '45 min', price: '£55' },
      { name: 'Swedish Back Massage', note: 'Female Only', time: '40 min', price: '£50' },
      { name: 'Indian Head Massage', note: 'Neck, shoulders & head', time: '30 min', price: '£38' },
      { name: 'Face Lifting Massage', note: '', time: '20 min', price: '£35' },
      { name: 'Cavitation Body Contouring', note: '', time: '45 min', price: 'From £60' },
    ],
  },
]

function Treatments() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="menu-page">
      <header className="menu-page-header">
        <div className="container">
          <Link to="/" className="back-link">
            <ChevronLeft size={16} strokeWidth={1.5} />
            Back to Home
          </Link>
          <span className="eyebrow">MX Skin & Laser Clinic</span>
          <h1>Full Treatment Menu</h1>
          <p>Clinical excellence · Transparent, honest pricing</p>
        </div>
      </header>

      <div className="menu-body">
        <div className="container">
          <motion.div 
            className="menu-banner-img"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="/pictures/women%20collage%201.jpg" alt="Beautiful diverse women representing every shade of beauty" />
          </motion.div>

          <div className="menu-categories-grid">
            {menuData.map((cat, i) => (
              <motion.div
                key={cat.category}
                className="menu-category"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              >
                <h2>{cat.category}</h2>
                <div className="menu-items-list">
                  {cat.items.map((item, j) => (
                    <div key={j} className="menu-item">
                      <div className="item-name-row">
                        <span className="item-name">{item.name}</span>
                        <span className="item-price">{item.price}</span>
                      </div>
                      <div className="item-meta">
                        {item.note && <span className="item-note">{item.note}</span>}
                        {item.time && <span className="item-time">{item.time}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="menu-page-footer">
        <div className="container">
          <p>Consultation fees (£20) are fully redeemable against any treatment.</p>
          <button
            className="btn btn-dark"
            onClick={() => window.open('https://wa.me/447727118885?text=Hi%20MX%20Clinic%2C%20I%27d%20like%20to%20book%20a%20consultation.', '_blank')}
          >
            Book via WhatsApp
          </button>
          
          <button 
            className="btn-btt"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUp size={16} strokeWidth={1.5} />
            Back to Top
          </button>
        </div>
      </div>
    </div>
  )
}

export default Treatments
