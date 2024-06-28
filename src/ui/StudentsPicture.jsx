import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledDesign = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  overflow: hidden;
  height: 90vh;
  top: auto;
  bottom: -6.5vh;
  right: 0;
  margin-bottom: 0;
  overflow: hidden;
  margin-left: 3px;
  animation: ${fadeIn} 2s ease-in-out;
`;

const Img = styled.img`
  height: 30.6rem;
  width: auto;
  min-width: 100%;
  transform: translateX(10%);
  overflow: hidden;
  margin-top: 200px;
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