import styled from "styled-components";
import Heading from "./Heading";

const StyledPage = styled.div`
   display: flex;
  flex-direction: column;
  padding-top: 5px;
  padding-left: 8px;
`;

export default function FifthParagraph2() {
  return (
    <StyledPage>
    <Heading as="heading4">Keep track of your learning progress.</Heading>
    <Heading as="heading4">Improve yourself with our AI insights.</Heading>
  </StyledPage>
  )
}
