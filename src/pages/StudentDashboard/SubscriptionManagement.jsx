import { Card, CardContent, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

const SubscriptionManagement = () => {
  // Dummy data representing teacher subscriptions
  const subscriptions = [
    { id: 1, name: 'John Doe', subject: 'Mathematics', amount: 50, lastUpgrade: '2024-04-01' },
    { id: 2, name: 'Jane Smith', subject: 'Science', amount: 60, lastUpgrade: '2024-03-20' },
    // Add more subscriptions as needed
  ];

  return (
    <Card sx={{ background: 'var(--color-grey-0)', border: '1px solid #e0e0e0' }}>
      <CardContent>
      <Row type="horizontal">
        <Heading style={{color: 'var(--color-grey-900)'}} as="head1">Manage your Subscriptions</Heading>
      </Row>
        {/* Table for teacher subscriptions */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'var(--color-grey-800)' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'var(--color-grey-800)' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'var(--color-grey-800)' }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'var(--color-grey-800)' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'var(--color-grey-800)' }}>Last Upgrade</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'var(--color-grey-800)' }}>Action</TableCell> {/* Added new column for action buttons */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mapping through subscriptions data */}
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell sx={{ color: 'var(--color-grey-800)' }}>{subscription.id}</TableCell>
                <TableCell sx={{ color: 'var(--color-grey-800)' }}>{subscription.name}</TableCell>
                <TableCell sx={{ color: 'var(--color-grey-800)' }}>{subscription.subject}</TableCell>
                <TableCell sx={{ color: 'var(--color-grey-800)' }}>${subscription.amount}</TableCell>
                <TableCell sx={{ color: 'var(--color-grey-800)' }}>{subscription.lastUpgrade}</TableCell>
                {/* Action buttons for each row */}
                <TableCell>
                  <Button variant="contained" color="primary" style={{ marginRight: '5px' }}>Upgrade</Button>
                  <Button variant="outlined" color="secondary">Cancel</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SubscriptionManagement;
