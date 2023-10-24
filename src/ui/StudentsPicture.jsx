import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDesign = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  overflow: hidden; /* Hide overflow content */
  height: 90vh;
  top: auto; /* Reset top positioning */
  bottom: 0vh; /* Position at the bottom and hide 10% of its height */
  right: 0; /* Adjust right positioning as needed */
  margin-bottom: 0; /* Offset the bottom margin to compensate for the hidden part */
  overflow: hidden;
  margin-left: 3px;
`;

const Img = styled.img`
  height: 30.6rem;
  width: auto;
  min-width: 100%; /* Ensure the image does not exceed the container's width */
  transform: translateX(10%);
  overflow: hidden;
  margin-top: 150px; /* Adjust this value to move the pictures down */
`;

export default function StudentsPicture({ currentImageIndex, images }) {
  return (
    <StyledDesign>
      <Img src={images[currentImageIndex]} alt="Student" />
    </StyledDesign>
  );
}

StudentsPicture.propTypes = {
  currentImageIndex: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
