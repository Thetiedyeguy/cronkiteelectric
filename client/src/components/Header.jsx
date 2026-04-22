import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import styles from './Header.module.css';
import ContactModal from './ContactModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);

  const services = [
    { title: 'Emergency Repair & Troubleshooting', path: '/emergency-repair' },
    { title: 'Fan & Lighting Installation', path: '/fans-lighting' },
    { title: 'Panel Updates', path: '/panel-upgrades' },
    { title: 'Level Two Charger Installation', path: '/level-2-charger' },
    { title: 'Rewire & Outlet Updates', path: '/rewire-outlets' }
  ];


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
            <div
                className={styles.dropdown}
              >
                <p
                  className={styles.hamburger}
                  onMouseDown={() => setOpen(!open)}
                >
                  {open ? '✗' : '☰'}
                </p>

                {open && (
                  <div className={styles.dropdownMenu}>
                      <Link
                        key="home"
                        to="/"
                        className={styles.dropdownItem}
                        onClick={() => setOpen(false)}
                      >
                        Home
                      </Link>
                      <div 
                        className={styles.servicesContainer}
                        onMouseEnter={() => setServicesHover(true)}
                        onMouseLeave={() => setServicesHover(false)}
                      >
                        <Link
                          key="services"
                          to="/services"
                          className={styles.dropdownItem}
                          onClick={() => setOpen(false)}
                        >
                          Services
                        </Link>
                        {servicesHover && (
                          <div className={styles.servicesSubmenu}>
                            {services.map((service, index) => (
                              <Link
                                key={index}
                                to={service.path}
                                className={styles.submenuItem}
                                onClick={() => {
                                  setOpen(false);
                                  setServicesHover(false);
                                }}
                              >
                                {service.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                      <Link
                        key="about"
                        to="/about"
                        className={styles.dropdownItem}
                        onClick={() => setOpen(false)}
                      >
                        About
                      </Link>
                  </div>
                )}
              </div>
          </ul>
        </nav>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;