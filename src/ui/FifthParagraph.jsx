import styled from "styled-components";
import Heading from "./Heading";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 90px;
  padding-left: 130px;
`;

export default function FifthParagraph() {
  return (
   <StyledPage>
    <Heading as="heading4">When it’s lesson time, connect with your Mentor,</Heading>
    <Heading as="heading4">through our comprehensive video platform.</Heading>
   </StyledPage>
  )
}
