import React from 'react';
import styles from './FansLighting.module.css';

const FansLighting = () => {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Fans & Lighting Installation</h1>
          <p className={styles.tagline}>Professional Installation with Quality Guarantee</p>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.serviceSection}>
          <h2>Our Guarantee</h2>
          <p className={styles.highlight}>
            We guarantee every fixture is installed properly and up to code.
          </p>
        </section>

        <section className={styles.serviceSection}>
          <h2>Our Services Include:</h2>
          <ul className={styles.servicesList}>
            <li>Fan installations, as well as checking existing installs for rated boxes if needed</li>
            <li>Modern can lights</li>
            <li>LED strip lights</li>
            <li>Under counter lights</li>
            <li>Flood lights & cameras</li>
          </ul>
        </section>

        <section className={styles.contactSection}>
          <h2>Ready to Upgrade Your Lighting?</h2>
          <p>Contact us for professional fan and lighting installation services.</p>
          <div className={styles.contactOptions}>
            <a href="tel:2097023370" className={styles.contactButton}>
              <span role='img' aria-label='Phone'>📞</span> Call Now: (209) 702-3370
            </a>
            <a href="mailto:sebastian@cronkiteelectric.co" className={styles.contactButton}>
              <span role='img' aria-label='Email'>✉️</span> Email Us
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FansLighting;