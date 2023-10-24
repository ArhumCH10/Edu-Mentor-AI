import FirstOneDesign from "../../ui/FirstOneDesign";
import styled from "styled-components";
import StudentsPicture from "../../ui/StudentsPicture";
import PropTypes from "prop-types";
import Content from '../../ui/Content';

const gradients = [
  ["#3661a0", "#57cbf5"],
  ["#00ff0a", "#009e66"],
  ["black", "#00ff0a"]
];

const StyledPage = styled.div`
  height: 90vh;
  width: 100%;
`;

const PageWrapper = styled.div`
  height: 90vh;
  background: ${(props) => {
    const index = props.currentImageIndex % gradients.length;
    return `linear-gradient(to top, ${gradients[index][0]}, ${gradients[index][1]})`;
  }};
  transition: background 0.5s ease;
`;

export default function FirstOne({currentImageIndex, images}) {

  return (
    <StyledPage>
      <PageWrapper currentImageIndex={currentImageIndex}>
        <FirstOneDesign />
        <StudentsPicture currentImageIndex={currentImageIndex} images={images} />
        <Content/>
      </PageWrapper>
    </StyledPage>
  );
}

FirstOne.propTypes = {
    currentImageIndex: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
