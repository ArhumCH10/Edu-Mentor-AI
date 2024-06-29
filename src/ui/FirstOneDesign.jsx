import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const StyledDesign = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  overflow: hidden;
  height: 84vh;
  top: auto;
  bottom: -10vh;
  right: 0;
  margin-bottom: -5vh;
  overflow: hidden;
  animation: ${slideIn} 1.5s ease-out;
`;

const Img = styled.img`
  height: 30.6rem;
  width: auto;
  min-width: 70%;
  transform: translateX(20%);
  overflow: hidden;
`;

export default function FirstOneDesign() {
  return (
    <StyledDesign>
      <Img src="/FirstPageDesign.png" alt="Design" />
    </StyledDesign>
  );
}