import React from 'react';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.subtitle}>
          Learn more about Cronkite Electric and our commitment to powering your future.
        </p>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <p className={styles.sectionContent}>
            Cronkite Electric was founded with a simple mission: to provide reliable, 
            high-quality electrical services to our community. Over the years, we’ve built 
            a reputation for excellence by putting our customers first and staying at the 
            forefront of industry innovation.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.sectionContent}>
            Our mission is to deliver safe, efficient, and affordable electrical solutions 
            while maintaining the highest standards of integrity and professionalism. We are 
            dedicated to empowering our clients and creating lasting partnerships.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Meet Our Team</h2>
          <p className={styles.sectionContent}>
            At Cronkite Electric, our team is our greatest asset. Each member brings a wealth 
            of experience, technical expertise, and a passion for service. Together, we work 
            to ensure every project exceeds expectations.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
