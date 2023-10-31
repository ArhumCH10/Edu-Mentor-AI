import styled from "styled-components";
import FifthOneDesign from "../../ui/FifthOneDesign";
import FifthContent from "../../ui/FifthContent";
import FifthTwoDesign from "../../ui/FifthTwoDesign";

const StyledPage = styled.div`
  height: 90vh;
  width: 100%;
`;

export default function FifthOne() {
  return (
    <StyledPage>
        <FifthOneDesign/>
        <FifthContent/>
        <FifthTwoDesign/>
    </StyledPage>
  )
}
