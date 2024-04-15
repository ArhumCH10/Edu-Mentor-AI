import { Outlet } from "react-router-dom";
import Header from "../../ui/Header";
import SideBar from "../../ui/SideBar";
import styled from "styled-components";
import GlobalStyle from "../../styles/GlobalStyle";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const StyledBar = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  overflow: hidden;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 1rem 2rem 2.4rem;
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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the user object exists in local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      // Navigate to the login page if user object doesn't exist
      navigate("/login", { replace: true }); // Navigate to login page and replace current history entry
    }
  }, []);

  const isMessagePage = () => {
    return location.pathname.includes("/studentdashboard/chat");
  };

  return (
    <StyledBar>
      <GlobalStyle />
      <Header />
      <SideBar />

      <Main style={{ overflow: isMessagePage() ? 'hidden' : 'auto' }}>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledBar>
  );
}
