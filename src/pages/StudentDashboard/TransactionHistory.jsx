import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Button } from '@mui/material';
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

const TransactionHistory = () => {
  const transactions = [
    { date: '2024-04-01', amount: 50, description: 'Trial Class with John Doe', status: 'Paid' },
  ];

  return (
    <>
      <Row type="horizontal">
        <Heading as="head1">All Transactions</Heading>
      </Row>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography sx={{ fontWeight: 'bold', color: 'var(--color-grey-800)' }}>Date</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontWeight: 'bold', color: 'var(--color-grey-800)' }}>Amount</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontWeight: 'bold', color: 'var(--color-grey-800)' }}>Description</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontWeight: 'bold', color: 'var(--color-grey-800)' }}>Status</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography sx={{ color: 'var(--color-grey-800)' }}>{transaction.date}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: 'var(--color-grey-800)' }}>${transaction.amount}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: 'var(--color-grey-800)' }}>{transaction.description}</Typography>
              </TableCell>
              <TableCell>
                {transaction.status === 'Paid' && (
                  <Button variant="contained" sx={{ bgcolor: 'var(--color-green-600)', color: 'white' }}>
                    {transaction.status}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TransactionHistory;