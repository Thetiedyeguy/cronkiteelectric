import React, { useState } from 'react';
import ContactModal from '../components/ContactModal';
// import GiveawayBanner from "../components/GiveawayBanner"; // ⬅️ remove
import GiveawayModal from '../components/GiveawayBanner'; // ⬅️ new
import styles from './Home.module.css';
import Reviews from './Reviews';
import api from '../apis/Giveaway';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGiveawayOpen, setIsGiveawayOpen] = useState(false); // ⬅️ new
  const phoneNumber = '2097023370';
  const email = 'sebastian@cronkiteelectric.co';

  const services = [
    { title: 'Additional power', description: '', icon: '⚡' },
    { title: 'Panel Installation', description: 'Expert electrical system upgrades', icon: '🔌' },
    { title: 'Troubleshooting', description: '', icon: '🔧' },
    { title: 'Fixture Installation', description: 'Energy-efficient designs', icon: '💡' }
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
      {/* ⬇️ Giveaway banner removed */}

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
          <h2 id="about-heading" className={styles.sectionHeading}>
            Win a FREE Whole House Outlet Update!
          </h2>
          <div className={styles.aboutContent}>
            <p>
              Get a chance to upgrade your home's safety and value at no cost. We're giving away a complete, <b>whole house outlet update</b> to one <b>lucky winner in the 209!</b> To enter, simply type in your name and phone number. It's completely free to sign up. The winner will have every electrical outlet in their home updated at zero cost. <b>HUGE BONUS:</b> Everyone Who Enters Gets <b>15% OFF</b>! As a thank you for signing up, everyone who enters our giveaway will receive 15% off any other electrical work you have done with us. This offer is valid now until the week prior to Thanksgiving. Don't miss out on your chance to win a major upgrade and save on your next project!
            </p>

            {/* ⬇️ New “Enter Giveaway” button here */}
            <button
              type="button"
              className={styles.contactButton}
              onClick={() => setIsGiveawayOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={isGiveawayOpen}
              aria-controls="giveaway-modal"
            >
              Enter Giveaway
            </button>
          </div>
        </section>

        <section className={styles.servicesSection} aria-labelledby="services-heading">
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

        <section className={styles.contactSection} aria-labelledby="contact-heading">
          <h2 id="contact-heading" className={styles.sectionHeading}>Get in Touch</h2>
          <div className={styles.contactOptions}>
            <button className={styles.contactButton} onClick={handlePhoneClick} aria-label="Call us">
              <span role='img' aria-label='Phone'>📞</span> Call Us
            </button>
            <button className={styles.contactButton} onClick={handleEmailClick} aria-label="Email us">
              <span role='img' aria-label='Email'>✉️</span> Email Us
            </button>
            <button className={styles.contactButton} onClick={() => setIsModalOpen(true)} aria-label="Request a quote">
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

      {/* Existing contact modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* New giveaway modal (same behavior as before) */}
      <div id="giveaway-modal">
        <GiveawayModal
          open={isGiveawayOpen}
          onClose={() => setIsGiveawayOpen(false)}
          onSubmit={submitGiveaway}
        />
      </div>
    </div>
  );
};

export default Home;
