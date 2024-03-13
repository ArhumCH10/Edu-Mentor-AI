import Heading from "../../ui/Heading";
import AssignmentChart from "./AssignmentChart";
import DashboardGraph from "./DashboardGraph";
import MyActivity from "./MyActivity";
import styled from "styled-components";
import UpcomingClassCard from "./UpcomingClassCard";


const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 63% auto; // Two columns, first is 60% of the width, second is the remaining space
  grid-template-rows: auto auto; // Now two rows, each row will size to fit its content
  gap: 0.4rem; // Space between rows and columns
`;

function Dashboard() {
 
  return (
    <>
      <StyledDashboardLayout>
        <Heading ng as="head1" style={{ gridColumn: "1 / -1" }}>
          Dashboard
        </Heading>
        <DashboardGraph />
        <AssignmentChart />
      </StyledDashboardLayout>

      <StyledDashboardLayout>
        <MyActivity />
        <UpcomingClassCard />
      </StyledDashboardLayout>
    </>
  );
}

export default Dashboard;
