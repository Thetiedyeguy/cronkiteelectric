import React, {useState} from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import styles from './Header.module.css';
import ContactModal from './ContactModal';

const Header = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logoLink}>
            <img src="/big logo.png" alt="Cronkite Electric Logo" className={styles.logo} />
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link to="/services" className={styles.navLink}>Services</Link>
            </li>
            <li>
              <Link to="/about" className={styles.navLink}>About Us</Link>
            </li>
            <li>
              <Link onClick={openModal} className={styles.navLink}>Contact Us</Link>
            </li>
          </ul>
        </nav>
      </header>
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Header;
