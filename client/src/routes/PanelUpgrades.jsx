import React from 'react';
import styles from './PanelUpgrades.module.css';

const PanelUpgrades = () => {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Panel Upgrades</h1>
          <p className={styles.tagline}>Safer Power, More Space & Available Amps</p>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.serviceSection}>
          <h2>Upgrade to a Safer Panel</h2>
          <p>
            An outdated electrical panel is a safety hazard and a limitation on your home's power capabilities. Our panel upgrades provide more space, available amps, and peace of mind.
          </p>
        </section>

        <section className={styles.serviceSection}>
          <h2>What's Included</h2>
          <ul className={styles.servicesList}>
            <li>Professional panel inspection and assessment</li>
            <li>Safe, code-compliant installation</li>
            <li><strong>2 year free warranty</strong> included</li>
            <li><strong>2 free outlet updates</strong> with every job</li>
          </ul>
        </section>

        <section className={styles.serviceSection}>
          <h2>Why Upgrade Your Panel?</h2>
          <ul className={styles.servicesList}>
            <li>Accommodate modern electrical demands (appliances, EV chargers, etc.)</li>
            <li>Improve safety and reduce fire risk</li>
            <li>Increase property value</li>
            <li>Enable future electrical upgrades</li>
          </ul>
        </section>

        <section className={styles.contactSection}>
          <h2>Ready for a Panel Upgrade?</h2>
          <p>Contact us for a professional assessment and upfront pricing.</p>
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

export default PanelUpgrades;