import React from 'react';
import styles from './AboutUs.module.css';
import ContactModal from '../components/ContactModal';
import { useState } from 'react';

const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={styles.aboutSection} aria-labelledby="about-heading">
      <div className={styles.heroBanner} style={{ backgroundImage: "url('/company car.jpg')" }}>
        <div className={styles.heroBannerOverlay} />
        <h2 className={styles.heroBannerText}>About Cronkite Electric</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 id="about-heading" className={styles.sectionHeading}>
            At Cronkite Electric, we believe that reliable power is the backbone of a safe and functional home.
          </h1>

          <p className={styles.intro}>
            Founded in 2023 and based in Modesto, we are a locally owned and operated electrical contracting business dedicated to providing the Central Valley and the Bay Area with elite technical expertise and a "customer-first" philosophy.
          </p>

          <h2 className={styles.subheading}>Experience You Can Trust</h2>
          <p>
            When you hire an electrician, you aren't just paying for a service—you're investing in the safety of your property. Our founder is a C-10 licensed electrical contractor with over 7 years of hands-on experience in the field.
          </p>
          <p>
            We understand that electrical issues can be stressful. That's why we've built Cronkite Electric on a foundation of transparency, clear communication, and high-quality craftsmanship. Whether it's a complex panel upgrade or a simple outlet repair, we treat every project with the same level of precision and respect.
          </p>

          <h2 className={styles.subheading}>Why Choose Us?</h2>
          <ul className={styles.featuresList}>
            <li>
              <strong>Licensed & Professional:</strong> We carry a full C-10 license, ensuring that every job meets California's strict building codes and safety standards.
            </li>
            <li>
              <strong>Local Expertise:</strong> Serving both the Central Valley and the Bay Area, we are familiar with the specific needs of homeowners in our community—from Modesto to the coast.
            </li>
            <li>
              <strong>Direct Accountability:</strong> As a focused, owner-operated business, you get the benefit of working directly with the expert. No middleman, no "big-box" overhead—just direct, honest service.
            </li>
          </ul>

          <h2 className={styles.subheading}>Our Mission</h2>
          <p>
            Our goal is simple: to provide high-value electrical solutions that stand the test of time. We don't just fix wires; we build long-term relationships with our clients through reliable work and "Grand Slam" service that exceeds expectations.
          </p>
          <p className={styles.finalCta}>
            Ready to power up your next project? Whether you're looking for a whole-house update or need a quick repair, we're here to help.
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