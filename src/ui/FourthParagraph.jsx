import styled from "styled-components";
import Heading from "./Heading";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 90px;
  padding-left: 130px;
`;

export default function FourthParagraph() {
  return (
   <StyledPage>
    <Heading as="heading4">Choose from over 32,000 online Mentor.</Heading>
    <Heading as="heading4">Use filters to narrow your search and find the perfect fit.</Heading>
   </StyledPage>
  )
}
