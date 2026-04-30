import React, { useState } from 'react';
import styles from './AboutUs.module.css';
import ContactModal from '../components/ContactModal';

const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={styles.aboutSection} aria-labelledby="about-heading">

      {/* Hero banner */}
      <div className={styles.heroBanner} style={{ backgroundImage: "url('/company car.jpg')" }}>
        <div className={styles.heroBannerOverlay} />
        <h1 id="about-heading" className={styles.heroBannerText}>About Cronkite Electric</h1>
      </div>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>7+</span>
          <span className={styles.statLabel}>Years Experience</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>C-10</span>
          <span className={styles.statLabel}>Licensed Contractor</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>2 yr</span>
          <span className={styles.statLabel}>Warranty on Every Job</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>2</span>
          <span className={styles.statLabel}>Regions Served</span>
        </div>
      </div>

      {/* Intro + photo */}
      <div className={styles.introSection}>
        <div className={styles.introText}>
          <h2 className={styles.subheading}>Experience You Can Trust</h2>
          <p>
            Founded in 2023 and based in Modesto, we are a locally owned and operated electrical contracting business dedicated to providing the Central Valley and the Bay Area with elite technical expertise and a "customer-first" philosophy.
          </p>
          <p>
            When you hire an electrician, you aren't just paying for a service — you're investing in the safety of your property. Our founder is a C-10 licensed electrical contractor with over 7 years of hands-on experience in the field.
          </p>
          <p>
            We understand that electrical issues can be stressful. That's why we've built Cronkite Electric on a foundation of transparency, clear communication, and high-quality craftsmanship. Whether it's a complex panel upgrade or a simple outlet repair, we treat every project with the same level of precision and respect.
          </p>
        </div>
        <div className={styles.introImage}>
          <img src="/panel.jpg" alt="Electrical panel work by Cronkite Electric" />
        </div>
      </div>

      {/* Why Choose Us */}
      <div className={styles.whySection}>
        <h2 className={styles.whySectionHeading}>Why Choose Us?</h2>
        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🏅</span>
            <h3>Licensed &amp; Professional</h3>
            <p>We carry a full C-10 license, ensuring every job meets California's strict building codes and safety standards.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>📍</span>
            <h3>Local Expertise</h3>
            <p>Serving both the Central Valley and the Bay Area, we know the specific needs of homeowners in our community — from Modesto to the coast.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🤝</span>
            <h3>Direct Accountability</h3>
            <p>As an owner-operated business, you work directly with the expert. No middleman, no big-box overhead — just honest service.</p>
          </div>
        </div>
      </div>

      {/* Mission band */}
      <div className={styles.missionBand}>
        <div className={styles.missionContent}>
          <h2 className={styles.missionHeading}>Our Mission</h2>
          <p className={styles.missionText}>
            Our goal is simple: to provide high-value electrical solutions that stand the test of time. We don't just fix wires — we build long-term relationships with our clients through reliable work and "Grand Slam" service that exceeds expectations.
          </p>
          <button
            className={styles.ctaButton}
            onClick={() => setIsModalOpen(true)}
          >
            Get in Touch
          </button>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default AboutUs;
