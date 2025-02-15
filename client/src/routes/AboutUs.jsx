import React from 'react';
import styles from './AboutUs.module.css';
import ContactModal from '../components/ContactModal';
import { useState } from 'react';

const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const strengths = [
    { 
      icon: '⚡', 
      title: 'Direct Owner Involvement', 
      text: 'Every job receives my personal attention from estimate to completion'
    },
    { 
      icon: '📅', 
      title: 'Flexible Scheduling', 
      text: 'Available for emergency calls and after-hours service'
    },
    { 
      icon: '🎓', 
      title: 'Latest Training', 
      text: '2023 Certified Electrical Safety Professional (CESCP)'
    },
    { 
      icon: '🏡', 
      title: 'Community Focused', 
      text: 'Serving Central Valley residents with local expertise'
    }
  ];

  return (
    <section className={styles.aboutSection} aria-labelledby="about-heading">
      <div className={styles.container}>
        <h2 id="about-heading" className={styles.sectionHeading}>
          Personal Service, Modern Expertise
        </h2>

        <div className={styles.profileSection}>
          <img 
            src="/fixing a fan.jpg" 
            alt="Sebastian Cronkite - Owner & Master Electrician" 
            className={styles.profileImage}
          />
          <div className={styles.profileContent}>
            <h3 className={styles.tagline}>
              Hi, I'm Sebastian - Your Trusted Local Electrician
            </h3>
            <p className={styles.bio}>
              Founded in 2023, Cronkite Electric brings fresh expertise to California's Central Valley. 
              As a solo practitioner, I combine up-to-date electrical certifications with old-fashioned 
              personal service. When you call Cronkite Electric, you're getting:
            </p>
            
            <ul className={styles.commitmentList}>
              <li>Direct communication with the business owner</li>
              <li>Same-day quotes for urgent needs</li>
              <li>No subcontractors or crew delays</li>
              <li>100% attention to your project</li>
            </ul>
          </div>
        </div>

        <div className={styles.strengthsGrid}>
          {strengths.map((item, index) => (
            <div key={index} className={styles.strengthCard}>
              <div className={styles.strengthIcon}>{item.icon}</div>
              <h4 className={styles.strengthTitle}>{item.title}</h4>
              <p className={styles.strengthText}>{item.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>
            Why work with a big company when you can get personal service from a 
            licensed professional? Let's discuss your electrical needs.
          </p>
          <button 
            className={styles.ctaButton}
            onClick={() => setIsModalOpen(true)}
          >
            Get Free Same-Day Estimate
          </button>
        </div>
      </div>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default AboutUs;