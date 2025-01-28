import React from 'react';
import styles from './Services.module.css';

const Services = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Our Services</h1>
        <p className={styles.subtitle}>
          Reliable electrical solutions for your home and business.
        </p>
      </header>
      <main className={styles.main}>
        <section className={styles.service}>
          <h2 className={styles.serviceTitle}>Wiring and Rewiring</h2>
          <p className={styles.serviceDescription}>
            Ensure your property is up to code and equipped with safe and efficient wiring. 
            We handle everything from full rewiring to minor repairs.
          </p>
        </section>
        <section className={styles.service}>
          <h2 className={styles.serviceTitle}>Electrical Installations</h2>
          <p className={styles.serviceDescription}>
            From lighting fixtures to full-scale electrical systems, we provide expert 
            installation services tailored to your needs.
          </p>
        </section>
        <section className={styles.service}>
          <h2 className={styles.serviceTitle}>Maintenance and Repairs</h2>
          <p className={styles.serviceDescription}>
            Avoid unexpected outages and costly repairs. Our maintenance services keep 
            your systems running smoothly and efficiently.
          </p>
        </section>
        <section className={styles.service}>
          <h2 className={styles.serviceTitle}>Lighting Solutions</h2>
          <p className={styles.serviceDescription}>
            Enhance your space with energy-efficient and aesthetically pleasing lighting. 
            We offer a wide range of options for residential and commercial properties.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Services;
