import FirstOneDesign from "../../ui/FirstOneDesign";
import styled, { keyframes } from "styled-components";
import StudentsPicture from "../../ui/StudentsPicture";
import PropTypes from "prop-types";
import Content from '../../ui/Content';

const gradients = [
  ["#3661a0", "#57cbf5"],
  ["#00ff0a", "#009e66"],
  ["black", "#00ff0a"]
];

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const StyledPage = styled.div`
  height: 90vh;
  width: 100%;
  animation: ${fadeIn} 2s ease-in-out;
`;

const PageWrapper = styled.div`
  height: 90vh;
  background: ${(props) => {
    const index = props.currentImageIndex % gradients.length;
    return `linear-gradient(to top, ${gradients[index][0]}, ${gradients[index][1]})`;
  }};
  transition: background 0.5s ease;
  animation: ${bounce} 2s infinite;
`;

export default function FirstOne({ currentImageIndex, images }) {
  return (
    <StyledPage>
      <PageWrapper currentImageIndex={currentImageIndex}>
        <FirstOneDesign />
        <StudentsPicture currentImageIndex={currentImageIndex} images={images} />
        <Content />
      </PageWrapper>
    </StyledPage>
  );
}

FirstOne.propTypes = {
  currentImageIndex: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};