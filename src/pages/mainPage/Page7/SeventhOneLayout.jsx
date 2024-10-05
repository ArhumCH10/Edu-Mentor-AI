import { useEffect, useState } from 'react';
import SeventhOneCard from "./SeventhOneCard";
import axios from 'axios';

function SixthOneLayout() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get('http://localhost:8080/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }
    
    fetchReviews();
  }, []);

  return (
    <div className="SeventhOneLayout">
      <div className="corner seven-top-left"></div>
      <div className="corner seven-top-right"></div>
      <div className="corner seven-bottom-left"></div>
      <div className="corner seven-bottom-right"></div>
      <div className="container text-center mt-5">
        <h1 className="headingPage7">What Clients Say About Us?</h1>
      </div>
      <div className="container-fluid">
        <div className="row mt-4">
          {reviews.map((review, index) => (
            <div key={index} className="col-md-4" style={{zIndex: 2}}>
              <SeventhOneCard
                name={review.name || 'Arhum Naveed'}
                role={review.role || 'Student'}
                text={`${review.review} - Rating: ${review.rating}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SixthOneLayout;