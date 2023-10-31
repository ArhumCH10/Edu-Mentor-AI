import styled from "styled-components";

const StyledDesign = styled.div`
  position: absolute;
  display: flex;
  justify-content: right;
  align-items: end;
  right: 45px;
  bottom: -10vh;
  z-index: 999; 
`;

const Img = styled.img`
  height: 15.6rem;
`;

export default function GraphPicture2() {
  return (
    <StyledDesign>
    <Img src="graphpicture2.png" alt="Graph"/>
</StyledDesign>
  )
}
