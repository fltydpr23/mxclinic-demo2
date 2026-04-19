import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const TermsOfService: React.FC = () => {
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
            Terms of Service
          </motion.h1>
          <p>Effective: January 2026</p>
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
              <h2>1. Consultations & Bookings</h2>
              <p>
                To ensure the highest level of clinical care, all new patients are required to undergo a consultation before proceeding 
                with advanced treatments.
              </p>
              <ul>
                <li>Consultation & Laser Patch Test: £20 (Redeemable against treatment).</li>
                <li>Comprehensive Skincare Consultation: £25 (Redeemable against treatment).</li>
                <li>Virtual Consultations: £18.</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>2. Cancellation Policy</h2>
              <p>
                We value your time and the time of our practitioners. We require a minimum of <strong>48 hours' notice</strong> 
                for any cancellations or rescheduling of appointments.
              </p>
              <p>
                Cancellations made with less than 48 hours' notice, or failure to attend an appointment, will result in the 
                forfeiture of your consultation fee or a late cancellation charge.
              </p>
            </section>

            <section className="legal-section">
              <h2>3. Clinical Suitability & Refusal</h2>
              <p>
                Your safety is our priority. As a clinical facility supervised by an NHS Pharmacist Prescriber, we reserve 
                the right to refuse treatment if:
              </p>
              <ul>
                <li>The requested treatment is medically unsuitable for you.</li>
                <li>You have unrealistic expectations of the clinical outcomes.</li>
                <li>You are under the age of 18 (Proof of ID may be required).</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. Treatment Outcomes & Risks</h2>
              <p>
                While we use medical-grade technology and expert techniques, clinical results vary by individual. 
                Aesthetic treatments involve inherent risks (such as redness, swelling, or bruising). You will be required 
                to sign a specific consent form for every procedure acknowledging these results and risks.
              </p>
            </section>

            <section className="legal-section">
              <h2>5. Pricing & Payments</h2>
              <p>
                All prices listed on our website and social media are "starting from" figures. A final bespoke price will 
                be provided during your consultation. Payment is due in full at the time of treatment.
              </p>
            </section>

            <section className="legal-section">
              <h2>6. Complaints Procedure</h2>
              <p>
                We strive for excellence in every treatment. Should you be unhappy with your experience, please contact us 
                at <strong>hello@mxskinclinic.co.uk</strong>. We aim to resolve all clinical concerns within 14 working days.
              </p>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService
