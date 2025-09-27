import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import ContactModal from './ContactModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const phoneNumber = '2097023370';

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo Section */}
        <Link to="/" className={styles.logoLink} aria-label="Home">
          <img 
            src="/big logo.png" 
            alt="Cronkite Electric Logo" 
            className={styles.logo}
            loading="lazy"
          />
        </Link>

        {/* Navigation */}
        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link 
                className={styles.navLink}
                onClick={handlePhoneClick}
                aria-label="Call us"
              >(209) 702-3370</Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/services"
                className={`${styles.navLink} ${
                  location.pathname === '/services' ? styles.active : ''
                }`}
                aria-current={location.pathname === '/services' ? 'page' : undefined}
              >
                Services
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/about"
                className={`${styles.navLink} ${
                  location.pathname === '/about' ? styles.active : ''
                }`}
                aria-current={location.pathname === '/about' ? 'page' : undefined}
              >
                About
              </Link>
            </li>
            <li className={styles.navItem}>
              <button
                className={styles.navButton}
                onClick={() => setIsModalOpen(true)}
                aria-label="Open contact form"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;