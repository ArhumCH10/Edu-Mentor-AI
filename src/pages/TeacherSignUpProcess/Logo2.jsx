import styled from "styled-components";

const StyledLogo = styled.div`
  margin-left: 3px;
`;

const Img = styled.img`
  height: 4.6rem;
  width: auto;
  cursor: pointer;
`;

export default function Logo2() {
  return (
    <StyledLogo>
        <Img src="/logo.png" alt="Logo" href="http://localhost:5173/"/>
    </StyledLogo>
  )
}
