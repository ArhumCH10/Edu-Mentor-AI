import styled from "styled-components";

const StyledDesign = styled.div`
  position: absolute;
  display: flex;
  justify-content: left;
  align-items: start;
  left: 0;
  overflow: hidden;
  bottom: -200vh;
  z-index: 999; /* Set a high z-index value to ensure it appears above other components */
`;

const Img = styled.img`
  height: 14.6rem;
  min-width: 90%; /* Ensure the image does not exceed the container's width */
  transform: translateX(-35%);
  overflow: hidden;
`;

export default function FifthTwoDesign() {
  return (
    <StyledDesign>
    <Img src="/fourthPageDesign2.png" alt="Design"/>
  </StyledDesign>
  )
}
