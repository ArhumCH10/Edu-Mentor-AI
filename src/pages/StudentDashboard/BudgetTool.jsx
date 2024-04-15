import { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';

const BudgetTool = () => {
  const [budget, setBudget] = useState('');
  const handleSetBudget = () => {
    // Set budget logic here
    alert(`Budget set at $${budget}`);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Set Your Budget
        </Typography>
        <TextField
          label="Enter Your Monthly Budget"
          variant="outlined"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          type="number"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSetBudget} style={{ marginTop: '20px' }}>
          Set Budget
        </Button>
      </CardContent>
    </Card>
  );
};

export default BudgetTool;
