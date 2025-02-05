import React, { useEffect, useState } from 'react';
import styles from './Reviews.module.css';
import ReviewFinder from '../apis/ReviewFinder';
import StarRating from '../utils/StarRating';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBanner from '../components/ErrorBanner';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await ReviewFinder.get('/');
        setReviews(response.data || []);
      } catch (err) {
        setError('Failed to load reviews. Please try again later.');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  console.log(reviews); // Log to confirm data is received correctly

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Customer Reviews</h2>
      {isLoading ? (
        <LoadingSpinner /> // Create this component
      ) : error ? (
        <ErrorBanner 
        message={error}
        />
      ) : reviews.length > 0 ? (
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
            <div className={styles.rating}>
              <StarRating rating={review.rating} />
              <span>({review.rating}/5)</span>
            </div>
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
