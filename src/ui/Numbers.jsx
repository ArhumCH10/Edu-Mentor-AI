import styled from "styled-components";
import Heading from "./Heading";

const StyledDesign = styled.div`
  position: absolute;
  display: flex;
  left: 0;
  overflow: hidden;
  bottom: 10;
  z-index: 999; 
`;

const Img = styled.img`
  height: 5.6rem;
  padding-top: 30px;
  padding-left: 30px;
`;

export default function Numbers() {
  return (
    <StyledDesign>
        <Img src="/1.png" alt="1"/>
        <Heading as="head3">Find the best mentor</Heading>
    </StyledDesign>
  )
}
