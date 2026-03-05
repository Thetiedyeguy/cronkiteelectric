import React from 'react';
import styles from './EmergencyRepair.module.css';

const EmergencyRepair = () => {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Emergency Repair & Troubleshooting</h1>
          <p className={styles.tagline}>Fast, Reliable Electrical Problem Solving</p>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.serviceSection}>
          <h2>No Fix, No Fee</h2>
          <p className={styles.highlight}>
            If we cannot identify the source of your electrical issue & provide a clear solution, you pay nothing. You Lose $0 for calling us.
          </p>
        </section>

        <section className={styles.serviceSection}>
          <h2>Quick Diagnosis</h2>
          <p>
            90% of our emergency repair/troubleshooting jobs are identified within 60 minutes.
          </p>
        </section>

        <section className={styles.contactSection}>
          <h2>Need Emergency Help?</h2>
          <p>Contact us immediately for fast electrical troubleshooting and repair services.</p>
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

export default EmergencyRepair;