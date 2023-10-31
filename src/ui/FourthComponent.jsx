import styled from "styled-components";
import Numbers from "./Numbers";
import TeacherPic from "./TeacherPic";
import FourthParagraph from "./FourthParagraph";
import Number2 from "./Number2";
import LaptopPicture from "./LaptopPicture";

const StyledPage = styled.div`
  height: 50vh;
  width: 100%;
  margin-top: 15px;
`;

const PageWrapper = styled.div`
  height: 60vh;
  background: linear-gradient(to bottom, #00ff0a, #009e66);
  position: relative; /* Add this to position the gradient line */
`;

export default function FourthComponent() {
  return (
    <StyledPage>
      <PageWrapper>
        <Numbers/>
        <TeacherPic/>
        <FourthParagraph/>
        <Number2/>
        <LaptopPicture/>
      </PageWrapper>
    </StyledPage>
  );
}
