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

export default function Number3() {
  return (
    <StyledDesign>
    <Img src="/3.png" alt="3"/>
    <Heading as="head3">Enter virtual classroom</Heading>
    </StyledDesign>
  )
}
