import styled from "styled-components";

const StyledDesign = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  overflow: hidden; /* Hide overflow content */
  height: 84vh;
  top: auto; /* Reset top positioning */
  bottom: -7vh; /* Position at the bottom and hide 10% of its height */
  right: 0; /* Adjust right positioning as needed */
  margin-bottom: -5vh; /* Offset the bottom margin to compensate for the hidden part */
  overflow: hidden;
`;

const Img = styled.img`
  height: 30.6rem;
  width: auto;
  min-width: 90%; /* Ensure the image does not exceed the container's width */
  transform: translateX(20%);
  overflow: hidden;
`;

export default function FirstOneDesign() {
  return (
    <StyledDesign>
       <Img src="/FirstPageDesign.png" alt="Design"/>
    </StyledDesign>
  );
}
