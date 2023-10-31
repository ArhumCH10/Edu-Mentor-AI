import styled from "styled-components";

const StyledDesign = styled.div`
  position: absolute;
  display: flex;
  justify-content: right;
  align-items: end;
  right: 0;
  overflow: hidden;
  bottom: -47vh;
  z-index: 999; /* Set a high z-index value to ensure it appears above other components */
`;

const Img = styled.img`
  height: 14.6rem;
  min-width: 90%; /* Ensure the image does not exceed the container's width */
  transform: translateX(30%);
  overflow: hidden;
`;

export default function FirstOneDesign() {
  return (
    <StyledDesign>
      <Img src="/fourthPageDesign1.png" alt="Design"/>
    </StyledDesign>
  );
}
