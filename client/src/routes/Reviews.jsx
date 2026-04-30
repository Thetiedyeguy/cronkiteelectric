import React from 'react';
import styles from './Reviews.module.css';

const Reviews = () => {
  return (
    <section className={styles.reviewsSection} aria-labelledby="reviews-heading">
      <div className={styles.container}>
        <h2 id="reviews-heading" className={styles.sectionHeading}>
          Customer Reviews
        </h2>
        <div className={styles.iframeWrapper}>
          <iframe
            src="https://client.housecallpro.com/reviews/widget/debd6e42-59c9-4978-9254-a26abd62587d"
            height="1000"
            width="100%"
            title="Customer Reviews"
            style={{ border: 'none', display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
