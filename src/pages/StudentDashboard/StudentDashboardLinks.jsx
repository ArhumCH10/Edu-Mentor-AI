import { Outlet } from "react-router-dom";
import Header from '../../ui/Header';
import SideBar from '../../ui/SideBar'
import styled from "styled-components";
import GlobalStyle from "../../styles/GlobalStyle";

const StyledBar = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
    overflow: hidden;
`

const Main =  styled.main`
  background-color: var(--color-grey-50);
  padding: 1rem 4rem 2.4rem;
    overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export default function AppLayout() {
  return (
    <StyledBar>
    <GlobalStyle/>
      <Header />
      <SideBar />

      <Main>
        <Container>
        <Outlet/>
        </Container>
      </Main>
    </StyledBar>
  )
}