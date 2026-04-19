import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Lock, Eye } from 'lucide-react'

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="menu-page">
      <header className="menu-page-header">
        <div className="container">
          <Link to="/" className="back-link">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            Privacy Policy
          </motion.h1>
          <p>Updated: January 2026 · UK GDPR Compliant</p>
        </div>
      </header>

      <div className="menu-body">
        <div className="container" style={{ maxWidth: '800px' }}>
          <motion.div 
            className="legal-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <section className="legal-section">
              <h2>1. Introduction</h2>
              <p>
                At MX Skin & Laser Clinic ("we", "us", "our"), we are committed to protecting and respecting your privacy. 
                This policy explains how we collect, use, and protect your personal and medical data in compliance with the 
                UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. Information We Collect</h2>
              <p>As a specialized aesthetic and clinical facility, we collect the following categories of information:</p>
              <ul>
                <li><strong>Personal Identity:</strong> Name, date of birth, and contact details.</li>
                <li><strong>Medical Information:</strong> Health history, current medications, allergies, and prior aesthetic treatments.</li>
                <li><strong>Clinical Records:</strong> Treatment plans, progress notes, and "before and after" photography.</li>
                <li><strong>Technical Data:</strong> IP address and cookie data when you interact with our website.</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>3. Why We Process Your Data</h2>
              <p>We process your data under the following legal bases:</p>
              <ul>
                <li><strong>Contractual Necessity:</strong> To provide the clinical treatments you have requested.</li>
                <li><strong>Consent:</strong> For marketing communications and the use of your photographs for promotional purposes (which can be withdrawn at any time).</li>
                <li><strong>Legal Obligation:</strong> To maintain accurate medical and financial records as required by UK law.</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. Special Category Data</h2>
              <p>
                Because we handle health-related information, we apply enhanced security measures. This data is only 
                accessed by our qualified practitioners (including our GPhC Registered Pharmacist) to ensure your treatment 
                safety and clinical efficacy.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Data Retention</h2>
              <p>
                In accordance with UK clinical guidelines, we retain adult patient records for a minimum of 7 years 
                following your last treatment. Financial records are retained for 6 years for tax purposes.
              </p>
            </section>

            <section className="legal-section">
              <h2>6. Your Rights</h2>
              <p>Under UK GDPR, you have the right to:</p>
              <ul>
                <li>Access a copy of your personal data (Subject Access Request).</li>
                <li>Request the correction of inaccurate information.</li>
                <li>Request the erasure of your data (subject to legal retention requirements for medical records).</li>
                <li>Withdraw consent for marketing at any time.</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>7. Contact Us</h2>
              <p>
                If you have any questions regarding this policy or wish to exercise your rights, please contact our 
                Data Protection Lead at: <strong>hello@mxskinclinic.co.uk</strong>
              </p>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
