import { Card, CardContent, Button, Typography } from '@mui/material';

const SubscriptionManagement = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Manage Your Subscriptions
      </Typography>
      <Button variant="contained" color="primary">Upgrade Plan</Button>
      <Button variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>Cancel Plan</Button>
    </CardContent>
  </Card>
);

export default SubscriptionManagement;
