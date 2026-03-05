import React from 'react';
import styles from './Level2Charger.module.css';

const Level2Charger = () => {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Level 2 Charger Installation</h1>
          <p className={styles.tagline}>Convenience and Savings for Your EV</p>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.serviceSection}>
          <h2>Ready to wake up to a full charge!</h2>
          <p>
            Take full advantage of your EV and install convenience and savings directly into your home.
          </p>
        </section>

        <section className={styles.serviceSection}>
          <h2>Charging Options</h2>
          <div className={styles.chargingTable}>
            <div className={styles.chargingOption}>
              <h3>Level 1</h3>
              <p className={styles.power}>~1.9kW</p>
              <p className={styles.cost}>$11.5 cents per hour</p>
              <p className={styles.speed}>3-5 miles per hour</p>
              <p className={styles.time}>40-60 hours full charge</p>
            </div>
            <div className={styles.chargingOption}>
              <h3>Level 2</h3>
              <p className={styles.power}>~19.2kW</p>
              <p className={styles.cost}>$25-45 per hour</p>
              <p className={styles.speed}>25-45 miles per hour</p>
              <p className={styles.time}>6-9 hours full charge</p>
            </div>
          </div>
        </section>

        <section className={styles.contactSection}>
          <h2>Get Your EV Charger Installed Today</h2>
          <p>Contact us for professional Level 2 charger installation services.</p>
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

export default Level2Charger;