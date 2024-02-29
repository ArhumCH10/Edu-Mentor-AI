import { NavLink } from "react-router-dom"; // Import the Link component from React Router
import styled from "styled-components";
import { HiOutlineHome,HiOutlineAcademicCap,HiOutlineBookOpen, HiOutlineCalendarDays, HiOutlineUser, HiOutlineCog6Tooth } from 'react-icons/hi2'
import { HiOutlineChat, HiOutlineBriefcase, HiOutlineChartBar, HiOutlineCreditCard } from 'react-icons/hi';

// Define your styled components
const NavList = styled.ul`
 display: flex;
  flex-direction: column;
  gap: 0.2rem;
  list-style-type: none;
  text-decoration: none;
`;

const StyledLink = styled(NavLink)` // Use the styled(Link) component for routing
  display: flex;
  gap: 1.5rem;
  color: var(--color-grey-600);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;
  text-decoration: none;
  font-family: "Poppins", sans-serif;

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-800);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active svg {
    color: var(--color-brand-600);
  }
`;

export default function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledLink to="/studentdashboard/dashboard">
            <HiOutlineHome/>
            <span>
            Dashboard
            </span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to="/studentdashboard/profile">
          <HiOutlineUser />
            <span>
            Profile
            </span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to="/studentdashboard/timetable">
          <HiOutlineCalendarDays />
            <span>
           Time Table
            </span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to="/studentdashboard/classroom">
            <HiOutlineAcademicCap />
            <span>
           Classroom
            </span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to="/studentdashboard/lessons">
            <HiOutlineBookOpen />
            <span>
           Lessons
            </span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to="/studentdashboard/chat">
         < HiOutlineChat/>
            <span>
          Have a Chat
            </span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to="/studentdashboard/hirementor">
            <HiOutlineBriefcase />
            <span>
          Hire a Mentor
            </span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to="/studentdashboard/statistics">
            <HiOutlineChartBar />
            <span>
            Statistics
            </span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to="/studentdashboard/payment">
            <HiOutlineCreditCard />
            <span>
            Payments
            </span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to="/studentdashboard/settings">
            <HiOutlineCog6Tooth />
            <span>
            Settings
            </span>
          </StyledLink>
        </li>
      </NavList>
    </nav>
  );
}