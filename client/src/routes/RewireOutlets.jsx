import React from 'react';
import styles from './RewireOutlets.module.css';

const RewireOutlets = () => {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Rewire & Outlet Updates</h1>
          <p className={styles.tagline}>Modernize Your Home's Electrical System</p>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.serviceSection}>
          <h2>Stop Living with Old Outlets & Old Wire</h2>
          <p className={styles.focus}>
            Old systems weren't made to keep up with modern loads. Overloaded circuits generate heat and pose a fire risk.
          </p>
        </section>

        <section className={styles.serviceSection}>
          <h2>The Problem with Outdated Wiring & Outlets</h2>
          <ul className={styles.servicesList}>
            <li>Old, mismatched & painted-over outlets make a house look dated</li>
            <li>Outdated wiring causes inefficiency and wasted power</li>
            <li>Overloaded circuits generate dangerous heat</li>
            <li>Modern devices and appliances require more power than old systems can safely provide</li>
          </ul>
        </section>

        <section className={styles.serviceSection}>
          <h2>Our Solution</h2>
          <p>
            We provide complete rewiring and outlet updates to bring your home into the modern era. From updating outlets and switches to full home rewires, we handle it all with professional expertise and code compliance.
          </p>
        </section>

        <section className={styles.contactSection}>
          <h2>Ready to Modernize Your Home?</h2>
          <p>Contact us for a detailed assessment and upfront pricing on your rewire or outlet update project.</p>
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

export default RewireOutlets;