import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactModal from '../components/ContactModal';
import styles from './Home.module.css';
import Reviews from './Reviews';

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const phoneNumber = '2097023370';
  const email = 'sebastian@cronkiteelectric.co';

  const services = [
    {
      title: 'Emergency Repair & Troubleshooting',
      image: '/troubleshooting.jpg'
    },
    {
      title: 'Fan & Lighting Installation',
      image: '/fan_with_light.jpg'
    },
    {
      title: 'Panel Updates',
      image: '/panel.jpg'
    },
    {
      title: 'Level Two Charger Installation',
      image: '/tesla_charger.jpg'
    },
    {
      title: 'Rewire & Outlet Updates',
      image: '/outlet_after.jpg'
    }
  ];

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handleServiceSelect = (serviceTitle) => {
    if (serviceTitle === 'Emergency Repair & Troubleshooting') {
      navigate('/emergency-repair');
    } else if (serviceTitle === 'Fan & Lighting Installation') {
      navigate('/fans-lighting');
    } else if (serviceTitle === 'Level Two Charger Installation') {
      navigate('/level-2-charger');
    } else {
      setSelectedService(serviceTitle);
      setIsModalOpen(true);
    }
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
          <p className={styles.tagline}>Grounded in Quality, Powered by trust</p>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.aboutSection} aria-labelledby="about-heading">
          <div className={styles.aboutContent}>
            <h2 id="about-heading" className={styles.sectionHeading}>
              Professional Electrical Services
            </h2>
            <p>
              Cronkite Electric provides reliable, professional electrical services for residential and commercial properties. From emergency repairs to complete installations, we ensure your electrical systems are safe and up to code.
            </p>
          </div>
        </section>

        <section className={styles.servicesSection} aria-labelledby="services-heading">
          <h2 id="services-heading" className={styles.sectionHeading}>Our Services</h2>
          <ul className={styles.servicesGrid}>
            {services.map((service, index) => (
              <li
                key={index}
                className={styles.serviceCard}
                style={{ backgroundImage: `url(${service.image})` }}
                onClick={() => handleServiceSelect(service.title)}
                role="button"
                tabIndex={0}
                aria-label={`Request consultation for ${service.title}`}
                onKeyDown={(e) => e.key === 'Enter' && handleServiceSelect(service.title)}
              >
                <div className={styles.serviceOverlay} />
                <div className={styles.serviceCardContent}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <span className={styles.serviceCardCta}>Request Consultation →</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.contactSection} aria-labelledby="contact-heading">
          <h2 id="contact-heading" className={styles.sectionHeading}>Get in Touch</h2>
          <div className={styles.contactOptions}>
            <button className={styles.contactButtons} onClick={handlePhoneClick} aria-label="Call us">
              <span role='img' aria-label='Phone'>📞</span> Call Us
            </button>
            <button className={styles.contactButtons} onClick={handleEmailClick} aria-label="Email us">
              <span role='img' aria-label='Email'>✉️</span> Email Us
            </button>
            <button className={styles.contactButtons} onClick={() => setIsModalOpen(true)} aria-label="Request a quote">
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

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
};

export default Home;