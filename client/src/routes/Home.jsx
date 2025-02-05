import React, { useState } from 'react';
import ContactModal from '../components/ContactModal';
import styles from './Home.module.css';
import Reviews from './Reviews';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const phoneNumber = '2097023370'; // Stored as string to prevent scrapers
  const email = 'sebastian@cronkiteelectric.co';

  // Services data array for better maintainability
  const services = [
    {
      title: 'Wiring & Rewiring',
      description: 'Comprehensive solutions for homes and businesses',
      icon: '⚡'
    },
    {
      title: 'Panel Installation',
      description: 'Expert electrical system upgrades',
      icon: '🔌'
    },
    {
      title: 'Maintenance',
      description: 'Preventative system care',
      icon: '🔧'
    },
    {
      title: 'Lighting Solutions',
      description: 'Energy-efficient designs',
      icon: '💡'
    }
  ];

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className={styles.container}>
      {/* Schema markup for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Electrician",
          "name": "Cronkite Electric",
          "telephone": `+1-${phoneNumber}`,
          "email": email,
          "image": "/logo.webp",
          "areaServed": "California",
          "description": "Reliable professional electrical services"
        })}
      </script>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Cronkite Electric</h1>
          <p className={styles.tagline}>Reliable, Professional Electrical Services</p>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section 
          className={styles.aboutSection}
          aria-labelledby="about-heading"
        >
          <h2 id="about-heading" className={styles.sectionHeading}>About Us</h2>
          <div className={styles.aboutContent}>
            <p>
              Licensed and insured, Cronkite Electric delivers top-tier electrical solutions 
              with a focus on safety and customer satisfaction. Serving both residential 
              and commercial clients.
            </p>
          </div>
        </section>

        <section 
          className={styles.servicesSection}
          aria-labelledby="services-heading"
        >
          <h2 id="services-heading" className={styles.sectionHeading}>Our Services</h2>
          <ul className={styles.servicesGrid}>
            {services.map((service, index) => (
              <li key={index} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section 
          className={styles.contactSection}
          aria-labelledby="contact-heading"
        >
          <h2 id="contact-heading" className={styles.sectionHeading}>Get in Touch</h2>
          <div className={styles.contactOptions}>
            <button 
              className={styles.contactButton}
              onClick={handlePhoneClick}
              aria-label="Call us"
            >
              📞 Call Us
            </button>
            <button
              className={styles.contactButton}
              onClick={handleEmailClick}
              aria-label="Email us"
            >
              ✉️ Email Us
            </button>
            <button 
              className={styles.contactButton}
              onClick={() => setIsModalOpen(true)}
              aria-label="Request a quote"
            >
              📋 Get Quote
            </button>
          </div>
        </section>

        <Reviews />
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          &copy; {new Date().getFullYear()} Cronkite Electric. All rights reserved.<br />
          License #123456 | Fully Insured
        </p>
      </footer>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Home;