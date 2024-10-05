import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './Review.css';

const Review = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/api/reviews?review=${encodeURIComponent(review)}&rating=${rating}`);

      if (response.status === 201) {
        alert('Review submitted successfully!');
        navigate('/studentdashboard/dashboard');
      } else {
        throw new Error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error.response?.data || error.message);
      alert('Failed to submit review');
    }
  };

  return (
    <div className="review-container">
      <h2>Submit Your Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="5"
            className="form-control"
            placeholder="Write your review here..."
            required
          />
        </div>
        <div className="form-group rating-group">
          <div className="rating-label">Rating:</div>
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  className="rating-input"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <FaStar
                  size={30}
                  className="star"
                  color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
        <button type="submit" className="submit-button">Submit Review</button>
      </form>
    </div>
  );
};

export default Review;