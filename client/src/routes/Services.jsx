import React from 'react';
import styles from './Services.module.css';
import ContactModal from '../components/ContactModal';
import { useState } from 'react';

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const services = [
    {
      title: "Electrical Installations",
      description: "",
      icon: "🔌",
      details: [
        "Full home rewiring",
        "Fixture installations",
        "Lighting upgrades"
      ]
    },
    {
      title: "Troubleshooting",
      description: "",
      icon: "🔧",
      details: [
        "Repair non working circuits",
        "Inspect electrical systems",
        "Bring systems up to code"
      ]
    },
    {
      title: "Additional Power",
      description: "",
      icon: "⚡",
      details: [
        "Panel Upgrades",
        "Additional",
        "Convenience outlets",
        "Car charger"
      ]
    }
  ];

  const handleServiceSelect = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  return (
    <section className={styles.servicesSection} aria-labelledby="services-heading">
      <div className={styles.container}>
        <h2 id="services-heading" className={styles.sectionHeading}>
          Our Electrical Services
        </h2>
        
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <article 
              key={index}
              className={styles.serviceCard}
              onClick={() => handleServiceSelect(service.title)}
            >
              <div className={styles.cardHeader}>
                <span className={styles.serviceIcon}>{service.icon}</span>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
              </div>
              <ul className={styles.serviceDetails}>
                {service.details.map((detail, i) => (
                  <li key={i} className={styles.detailItem}>{detail}</li>
                ))}
              </ul>
              <button 
                className={styles.learnMoreButton}
                aria-label={`Learn more about ${service.title}`}
              >
                Request Consultation
              </button>
            </article>
          ))}
        </div>
      </div>

      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialService={selectedService}
      />
    </section>
  );
};

export default Services;