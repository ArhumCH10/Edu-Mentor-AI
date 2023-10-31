import styled from "styled-components";

const StyledDesign = styled.div`
  position: absolute;
  display: flex;
  justify-content: right;
  align-items: end;
  right: 325px;
  bottom: -10vh;
  z-index: 999; 
`;

const Img = styled.img`
  height: 15.6rem;
`;

export default function PercentPicture() {
  return (
    <StyledDesign>
    <Img src="percentpicture.png" alt="Percent"/>
</StyledDesign>
  )
}
