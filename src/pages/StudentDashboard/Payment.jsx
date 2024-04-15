import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import TransactionHistory from './TransactionHistory';
import TotalExpenditure from './TotalExpenditure';
import SpendingChart from './SpendingChart';
import BudgetTool from './BudgetTool';
import ClassesOverview from './ClassesOverview';
import SubscriptionManagement from './SubscriptionManagement';
import Notifications from './Notifications';
import { Container, Grid } from '@mui/material';
import './Payment.css';

function Payment() {
  return (
    <>
    <Row type="horizontal">
      <Heading as="head1">My Payments</Heading>
    </Row>
    <Container maxWidth="lg">
      <Grid container spacing={4}>
      <div className="payment-card">
        <Grid item xs={12}>
          <TransactionHistory />
        </Grid>
        </div>
         <Grid item xs={12} md={6}>
          <TotalExpenditure />
          <SpendingChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <BudgetTool />
          <ClassesOverview />
        </Grid>
       <Grid item xs={12}>
          <SubscriptionManagement />
        </Grid>
         <Grid item xs={12}>
          <Notifications />
        </Grid>
      </Grid>
    </Container>
    
    </>
  );
}

export default Payment;
