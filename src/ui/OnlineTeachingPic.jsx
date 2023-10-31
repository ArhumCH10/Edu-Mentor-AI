import styled from "styled-components";

const StyledDesign = styled.div`
  position: absolute;
  display: flex;
  justify-content: right;
  align-items: end;
  right: 35px;
  bottom: 28vh;
  z-index: 999; 
`;

const Img = styled.img`
  height: 17.6rem;
`;

export default function OnlineTeachingPic() {
  return (
   <StyledDesign>
    <Img src="onlineteachingpicture.png" alt="teaching"/>
   </StyledDesign>
  )
}
