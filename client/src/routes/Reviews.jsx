import React, { useEffect, useState, useCallback } from 'react';
import styles from './Reviews.module.css';
import ReviewFinder from '../apis/ReviewFinder';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBanner from '../components/ErrorBanner';
import StarRating from '../utils/StarRating';

const Reviews = ({label = 'Warning'}) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await ReviewFinder.get('/');
      setReviews(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <section className={styles.reviewsSection} aria-labelledby="reviews-heading">
      <div className={styles.container}>
        <h2 id="reviews-heading" className={styles.sectionHeading}>
          Customer Reviews
        </h2>

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorBanner message={error} onRetry={fetchReviews} />
        ) : reviews.length > 0 ? (
          <div className={styles.reviewsGrid}>
            {reviews.map((review, index) => (
              <article key={index} className={styles.reviewCard}>
                <div className={styles.authorSection}>
                  <div className={styles.avatarContainer}>
                    {review.authorAttribution?.photoUri ? (
                      <img
                        src={review.authorAttribution.photoUri}
                        alt={`${review.authorAttribution.displayName}'s avatar`}
                        className={styles.avatar}
                        loading="lazy"
                      />
                    ) : (
                      <span className={styles.defaultAvatar} role="img" aria-label={label}>👤</span>
                    )}
                  </div>
                  <div className={styles.authorInfo}>
                    <h3 className={styles.authorName}>
                      {review.authorAttribution?.displayName || 'Anonymous'}
                    </h3>
                    <p className={styles.reviewDate}>
                      {review.relativePublishTimeDescription}
                    </p>
                  </div>
                </div>
                <div className={styles.ratingContainer}>
                  <StarRating rating={review.rating} />
                  <span className={styles.ratingValue}>({review.rating}/5)</span>
                </div>
                <p className={styles.reviewText}>
                  {review.text?.text || 'No review text provided.'}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.noReviews}>No reviews available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default Reviews;