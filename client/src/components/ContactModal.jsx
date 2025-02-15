import React, { useState } from 'react';
import styles from './ContactModal.module.css';
import Contact from '../apis/Contact';

const ContactModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    
    try {
      await Contact.post(`/`, {
        name,
        message,
      });
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setName('');
        setContact('');
        setMessage('');
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        
        <h2>Contact Us</h2>
        
        {success ? (
          <div className={styles.success}>Message sent successfully!</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Contact (email or phone number) </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength="1000"
                required
              />
              <small>{1000 - message.length} characters remaining</small>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button 
              type="submit" 
              disabled={isSending}
              className={styles.submitButton}
            >
              {isSending ? 'Sending...' : 'Send Text'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;