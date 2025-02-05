// client/src/components/StarRating.jsx
import React from 'react';
import styles from './StarRating.module.css'; // Create this CSS module

const StarRating = ({ rating }) => {
  const roundedRating = Math.round(Number(rating)); // Ensure numeric type
  
  return (
    <div className={styles.ratingContainer}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`${styles.star} ${
            index < roundedRating ? styles.filled : styles.empty
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;