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
          <div className={styles.aboutContent}>
            <h2 id="about-heading" className={styles.sectionHeading}>
              Stop living with old Outlets
            </h2>
            <h3 className={styles.sectionSubheading}>
              $2500 Value
            </h3>
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
            <p>
              Let's modernize your home with brand-new outlets. We're giving away a chance to win a <b>free</b> whole-house outlet update to a <b>lucky winner in the 209!</b> To enter, simply type in your name and phone number. <b>HUGE BONUS:</b> anyone who enters gets <b>15% off</b> other work. Don't miss out on your chance to win a major upgrade and save on your next project! Have family sign up on our behalf!
            </p>

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
