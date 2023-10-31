import styled from "styled-components";
import Heading from "./Heading";
import FourthParagraph2 from "./FourthParagraph2";

const StyledDesign = styled.div`
  position: absolute;
  display: flex;
  left: 0;
  overflow: hidden;
  bottom: 15vh;
  z-index: 999; 
`;

const Img = styled.img`
  height: 5.6rem;
  padding-top: 45px;
  padding-left: 30px;
`;

const HeadingsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Number2() {
  return (
    <StyledDesign>
      <Img src="/2.png" alt="2" />
      <HeadingsContainer>
        <Heading as="head3">Take lessons anytime</Heading>
        <FourthParagraph2 />
      </HeadingsContainer>
    </StyledDesign>
  );
}
