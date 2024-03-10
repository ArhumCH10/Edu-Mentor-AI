import './NewRequest.css'; 
import PropTypes from 'prop-types';

const StarRating = ({ rating }) => {
  const totalStars = 5;
  let stars = [];
  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating) {
      // full star
      stars.push(<i className="fas fa-star" key={i}></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      // half star
      stars.push(<i className="fas fa-star-half-alt" key={i}></i>);
    } else {
      // empty star
      stars.push(<i className="far fa-star" key={i}></i>);
    }
  }

  return <div className="tutor-rating">{stars}</div>;
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired
};

function NewRequest({ tutor }) {
  return (
    <>
      <div className="card-container">
        <div className="tutor-card">
          <div className="tutor-image">
            <img src={tutor.imageUrl} alt={tutor.name} />
          </div>
          <div className="tutor-info">
            <h4>{tutor.name}</h4>
            <p><span className="education-icon">🎓</span> {tutor.language}</p><br/>
             <p className="from-text"><strong>From:</strong> {tutor.country}</p>
            <div className="tutor-certification">
              <span role="img" aria-label="sparkles">🏫</span> {tutor.grade}
            </div>
            <p className="tutor-bio">
              {tutor.bio} <button className="read-more">Read more</button>
            </p>
            <div className="tutor-rating">
          <StarRating rating={3.1} />
          <span className="rating-number">3.1 (29)</span>
          </div>
     </div>
          <div className="tutor-session-info">
            <div className="tutor-new">{tutor.status}</div>
            <div className="tutor-price">{tutor.price}</div>
            <div className="tutor-duration">{tutor.duration}</div>
            <div className="tutor-favorite">
              {/* Heart icon placeholder */}
            </div>
            <button className="book-trial">Accept Request</button>
            <button className="send-message">Cancel Request</button>
          </div>
        </div>
      </div>
      </>
  );
}

  NewRequest.propTypes = {
    tutor: PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      students: PropTypes.number.isRequired,
      grade: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
    }).isRequired,
  };

  StarRating.propTypes = {
    rating: PropTypes.number.isRequired
  };
  
  export default NewRequest  