import styled from "styled-components";
import Number3 from "./Number3";
import OnlineTeachingPic from "./OnlineTeachingPic";
import FifthParagraph from "./FifthParagraph";
import Number4 from "./Number4";
import GraphPicture2 from "./GraphPicture2";
import PercentPicture from "./PercentPicture";

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
export default function FifthComponent() {
  return (
    <StyledPage>
        <PageWrapper>
            <Number3/>
            <OnlineTeachingPic/>
            <FifthParagraph/>
            <Number4/>
            <GraphPicture2/>
            <PercentPicture/>
        </PageWrapper>
    </StyledPage>
  )
}
