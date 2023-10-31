import styled from "styled-components";
import Heading from "./Heading";
import FifthParagraph2 from "./FifthParagraph2";

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


export default function Number4() {
  return (
    <StyledDesign>
      <Img src="/4.png" alt="4" />
      <HeadingsContainer>
        <Heading as="head3">Enjoy Graphical learning</Heading>
        <FifthParagraph2/>
      </HeadingsContainer>
    </StyledDesign>
  )
}
