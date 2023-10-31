import styled from "styled-components";
import Heading from "./Heading";

const StyledPage = styled.div`
   display: flex;
  flex-direction: column;
  padding-top: 5px;
  padding-left: 8px;
`;

export default function FourthParagraph2() {
  return (
    <StyledPage>
      <Heading as="heading4">Find the perfect time for your busy schedule.</Heading>
      <Heading as="heading4">Book lessons in seconds via desktop or mobile.</Heading>
    </StyledPage>
  )
}
