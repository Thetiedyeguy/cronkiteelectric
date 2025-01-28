import React, { useEffect, useState } from 'react';
import styles from './Reviews.module.css';
import ReviewFinder from '../apis/ReviewFinder';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await ReviewFinder.get('/');
        // Ensure the data format is consistent
        setReviews(response.data || []); // Assuming response.data contains the reviews array
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  console.log(reviews); // Log to confirm data is received correctly

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Customer Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className={styles.review}>
            <div className={styles.authorSection}>
              {review.authorAttribution?.photoUri && (<img
                src={review.authorAttribution?.photoUri || '/default-avatar.png'}
                alt={`${review.authorAttribution?.displayName}'s avatar`}
                className={styles.avatar}
              />)}
              <a
                href={review.authorAttribution?.uri}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.author}
              >
                {review.authorAttribution?.displayName || 'Anonymous'}
              </a>
            </div>
            <p className={styles.rating}>Rating: {review.rating} / 5</p>
            <p className={styles.text}>{review.text?.text || 'No review text provided.'}</p>
            <p className={styles.time}>{review.relativePublishTimeDescription}</p>
          </div>
        ))
      ) : (
        <p>No reviews available at the moment.</p>
      )}
    </div>
  );
};

export default Reviews;
