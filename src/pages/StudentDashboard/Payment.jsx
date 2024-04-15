import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import TransactionHistory from './TransactionHistory';
import FinancialOverview from './FinancialOverview';
import SpendingChart from './SpendingChart';
import PaymentMethod from './PaymentMethodsManagement';
import ClassesOverview from './ClassesOverview';
import SubscriptionManagement from './SubscriptionManagement';
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
         <Grid item xs={12} md={6}>
          <SpendingChart />
          <FinancialOverview />
        </Grid>
        <Grid item xs={12} md={6}>
           <PaymentMethod/>
          <div className="classes-overview">
          <ClassesOverview />
          </div>
        </Grid>
       <Grid item xs={12}>
          <SubscriptionManagement />
        </Grid>

        <div className="payment-card">
        <Grid item xs={12}>
          <TransactionHistory />
        </Grid>
        </div>
      </Grid>
    </Container>
    
    </>
  );
}

export default Payment;
