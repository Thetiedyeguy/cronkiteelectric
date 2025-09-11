import React, { useState } from 'react';
import ContactModal from '../components/ContactModal';
import GiveawayBanner from "../components/GiveawayBanner";
import styles from './Home.module.css';
import Reviews from './Reviews';
import api from '../apis/Giveaway';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const phoneNumber = '2097023370'; // Stored as string to prevent scrapers
  const email = 'sebastian@cronkiteelectric.co';

  // Services data array for better maintainability
  const services = [
    {
      title: 'Additional power',
      description: '',
      icon: '⚡'
    },
    {
      title: 'Panel Installation',
      description: 'Expert electrical system upgrades',
      icon: '🔌'
    },
    {
      title: 'Troubleshooting',
      description: '',
      icon: '🔧'
    },
    {
      title: 'Fixture Installation',
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

  const submitGiveaway = async ({ name, phone }) => {
    const resp = await api.post("/entry", { name, phone });
    return { ok: resp.status >= 200 && resp.status < 300 };
  };

  return (
    <div className={styles.container}>
      <GiveawayBanner
        description="Enter our giveaway for a chance to win a free outlet upgrade."
        onSubmit={submitGiveaway}
      />
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
          <p className={styles.tagline}>Grounded in Quality, Powered by trust</p>
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
              My goal with my company is to provide trustworthy services for all customers so i can afford a lifestyle where i am able to spend quality time with friends and family.
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
              <span role='img' aria-label='Phone'>📞</span> Call Us
            </button>
            <button
              className={styles.contactButton}
              onClick={handleEmailClick}
              aria-label="Email us"
            >
              <span role='img' aria-label='Email'>✉️</span> Email Us
            </button>
            <button 
              className={styles.contactButton}
              onClick={() => setIsModalOpen(true)}
              aria-label="Request a quote"
            >
              <span role='img' aria-label='Clipboard'>📋</span> Get Quote
            </button>
          </div>
        </section>

        <Reviews />
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          &copy; {new Date().getFullYear()} Cronkite Electric. All rights reserved.<br />
          License #113063 | Fully Insured
        </p>
      </footer>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Home;