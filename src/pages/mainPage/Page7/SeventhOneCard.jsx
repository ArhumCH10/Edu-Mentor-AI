// SixthOneCard.jsx
import PropTypes from "prop-types"; 

function SeventhOneCard({ name, role, text }) {
  return (
    <div className="setCard">
      <div className="row">
        <div className="col-lg-3">
          <img className="img mt-2" src="profilepicture.png" alt="profilePic" />
        </div>
        <div className="col-lg-8">
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <h2 style={{ marginBottom: "0px" }}>{name}</h2>
          <p style={{ marginTop: "-9px" }}>{role}</p>
          <img className="img1" src="css/images/img2.png" alt="flag" />
        </div>
      </div>
      <div className="row">
        <p>{text}</p>
      </div>
    </div>
  );
}

SeventhOneCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SeventhOneCard;
