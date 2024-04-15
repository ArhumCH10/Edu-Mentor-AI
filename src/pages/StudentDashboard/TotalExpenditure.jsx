import { useState } from 'react';
import { Card, CardContent, Typography, ButtonGroup, Button } from '@mui/material';

const expenditures = {
  monthly: 300,
  quarterly: 900,
  yearly: 3600,
};

const TotalExpenditure = () => {
  const [period, setPeriod] = useState('monthly');

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Total Expenditure
        </Typography>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={() => setPeriod('monthly')}>Monthly</Button>
          <Button onClick={() => setPeriod('quarterly')}>Quarterly</Button>
          <Button onClick={() => setPeriod('yearly')}>Yearly</Button>
        </ButtonGroup>
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          Total spent {period}: ${expenditures[period]}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TotalExpenditure;
