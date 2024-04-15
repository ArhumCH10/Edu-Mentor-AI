import { Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoneyIcon from '@mui/icons-material/Money';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const FinancialOverview = () => {
  const currentBalance = 5000; // Example balance
  const monthlyIncome = 2000; // Example income
  const monthlyExpenses = 1500; // Example expenses
  const totalSavings = currentBalance - monthlyExpenses;

  return (
    <Card sx={{ background: 'var(--color-grey-0)', border: '1px solid #e0e0e0', color: 'var(--color-grey-900)', marginTop: '15px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Financial Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
              <AccountBalanceIcon />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              Current Balance
            </Typography>
            <Typography variant="h4">${currentBalance}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56 }}>
              <MoneyIcon />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              Monthly Expenses
            </Typography>
            <Typography variant="h4">${monthlyIncome}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Avatar sx={{ bgcolor: 'info.main', width: 56, height: 56 }}>
              <CreditCardIcon />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              Total Savings
            </Typography>
            <Typography variant="h4">${totalSavings}</Typography>
          </Grid>
        </Grid>
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          Your total monthly expenses: ${monthlyExpenses}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FinancialOverview;
