import styled from "styled-components";

const StyledDesign = styled.div`
  position: absolute;
  display: flex;
  justify-content: right;
  align-items: end;
  right: 45px;
  bottom: 30vh;
  z-index: 999; 
`;

const Img = styled.img`
  height: 15.6rem;
`;

export default function TeacherPic() {
  return (
    <StyledDesign>
        <Img src="teachingpicture.png" alt="teaching"/>
    </StyledDesign>
  )
}
