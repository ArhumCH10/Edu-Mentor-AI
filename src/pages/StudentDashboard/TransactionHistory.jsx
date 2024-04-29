import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Button } from '@mui/material';
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { usePaymentStudent } from '../../services/usePaymentStudent';
import StyledSpinner from "../TeacherSignUpProcess/startSpinner";

const TransactionHistory = () => {
  const { data: classes, isLoading } = usePaymentStudent();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  if (isLoading) {
    return <StyledSpinner/>;
  }
  const successfulTransactions = classes?.filter(transaction => transaction.paymentStatus.toLowerCase() === 'success') || [];

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
              <Typography sx={{ fontWeight: 'bold', color: 'var(--color-grey-800)' }}>Mentor Name</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontWeight: 'bold', color: 'var(--color-grey-800)' }}>Class Type</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontWeight: 'bold', color: 'var(--color-grey-800)' }}>Status</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {!successfulTransactions.length ?
<TableRow>
<TableCell colSpan={5} style={{ textAlign: 'center' }}>
<Typography sx={{ color: 'var(--color-grey-800)' }}>No Payment found.</Typography>
</TableCell>
</TableRow>
:
<>
          {successfulTransactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography sx={{ color: 'var(--color-grey-800)' }}>{formatDate(transaction.paymentDate)}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: 'var(--color-grey-800)' }}>${transaction.amountPaid}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: 'var(--color-grey-800)' }}>{transaction.teacherName}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: 'var(--color-grey-800)' }}>{transaction.lessonType} lesson</Typography>
              </TableCell>
              <TableCell>
                {transaction.paymentStatus === 'success' && (
                  <Button variant="contained" sx={{ bgcolor: 'var(--color-green-600)', color: 'white' }}>
                    {transaction.paymentStatus}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          </>
}
        </TableBody>
      </Table>
    </>
  );
};

export default TransactionHistory;