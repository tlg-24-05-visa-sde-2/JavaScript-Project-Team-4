import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import '../assets/css/productReview.css';

interface Review {
  id: string;
  product: string;
  reviewText: string;
}

const ProductReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>('/api/user/reviews'); // Adjust the endpoint as needed
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  if (reviews.length === 0) {
    return <div>No reviews found.</div>;
  }

  return (
    <Carousel interval={null} indicators={false} className="vertical-carousel">
      {reviews.map((review) => (
        <Carousel.Item key={review.id}>
          <div className="review-item">
            <h5>{review.product}</h5>
            <p>{review.reviewText}</p>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductReviews;
