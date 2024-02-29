import styled from "styled-components"
import Logo1 from './Logo1';
import MainNav from './MainNav';

const StyledSideBar = styled.aside`
  background-color: var(--color-blue-500);
  padding: 1.2rem 0.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export default function SideBar() {
  return (
    <StyledSideBar>
       <Logo1/>
       <MainNav/>
    </StyledSideBar>
  )
}
