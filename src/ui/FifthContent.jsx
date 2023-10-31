import styled from "styled-components";
import Heading from "./Heading";
import FifthComponent from "./FifthComponent";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 20px;
`;

export default function FifthContent() {
  return (
   <StyledPage>
    <Heading as="heading2">JUST FEW STEPS MORE TO</Heading>
    <Heading as="heading3">Transform the New You Now</Heading>
    <FifthComponent/>
   </StyledPage>
  )
}
