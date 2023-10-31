import styled from "styled-components";
import Heading from "./Heading";
import FourthComponent from "./FourthComponent";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 20px;
`;

export default function FourthContent() {
  return (
   <StyledPage>
    <Heading as="heading2">HOW MENTOR AI WORKS</Heading>
    <Heading as="heading3">Transform the New You Now</Heading>
    <FourthComponent/>
   </StyledPage>
  )
}
