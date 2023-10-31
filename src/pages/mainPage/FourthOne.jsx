import styled from "styled-components";
import FourthOneDesign from '../../ui/FourthOneDesign';
import FourthContent from "../../ui/FourthContent";
import FourthTwoDesign from "../../ui/FourthTwoDesign";

const StyledPage = styled.div`
  height: 90vh;
  width: 100%;
`;

export default function FourthOne() {
  return (
     <StyledPage>
      <FourthOneDesign/>
      <FourthContent/>
      <FourthTwoDesign/>
     </StyledPage>
  )
}
