import React, {useState} from 'react';
import ContactModal from '../components/ContactModal';
import styles from './Home.module.css';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="/company car.jpg" alt="Cronkite Electric Company Car" className={styles.logo} />
        <h1 className={styles.title}>Cronkite Electric</h1>
        <p className={styles.tagline}>
          Reliable, professional, and powering your future.
        </p>
      </header>
      <main className={styles.main}>
        <section className={styles.about}>
          <h2>About Us</h2>
          <p>
            At Cronkite Electric, we pride ourselves on delivering top-notch electrical services with unmatched 
            professionalism. Whether it's a small repair or a large installation, we bring the power to your 
            home or business.
          </p>
          <p>
            Our team is led by highly skilled electricians dedicated to safety, quality, and efficiency. Let us 
            light up your world with our expertise.
          </p>
        </section>
        <section className={styles.services}>
          <h2>Our Services</h2>
          <ul>
            <li>Comprehensive wiring and rewiring for homes and businesses</li>
            <li>Expert installation of electrical panels and systems</li>
            <li>Regular maintenance to keep your systems running smoothly</li>
            <li>Energy-efficient lighting solutions tailored to your needs</li>
          </ul>
        </section>
        <section className={styles.contact}>
        <h2>Contact Us</h2>
        <p>Phone: (209) 702-3370</p>
        <p>Email: sebastian@cronkiteelectric.co</p>
        <button className={styles.contactButton} onClick={openModal}>
          Get a Quote
        </button>
      </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Cronkite Electric. All rights reserved.</p>
      </footer>
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Home;
