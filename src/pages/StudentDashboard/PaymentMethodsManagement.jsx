import { useState } from 'react';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import styled from 'styled-components';


const StyledListItemText = styled.div`
  .MuiListItemText-secondary {
    color: var(--color-grey-800); // Change secondary text color here
  }
`;

const PaymentMethodsManagement = () => {
  const [linkedAccounts, setLinkedAccounts] = useState([
    { id: 1, type: 'Bank Account', institution: 'ABC Bank', last4: '****1234' },
    { id: 2, type: 'Debit Card', institution: 'XYZ Bank', last4: '****5678' },
    // Add more linked accounts as needed
  ]);

  const handleLinkAccount = () => {
    // Logic to link a new bank account or card
    alert('Linking a new bank account or card');
  };

  const handleRemoveAccount = (id) => {
    // Logic to remove a linked account
    setLinkedAccounts(linkedAccounts.filter(account => account.id !== id));
    alert('Removing linked account');
  };

  return (
    <Card sx={{ background: 'var(--color-grey-0)', border: '1px solid #e0e0e0', color: 'var(--color-grey-900)' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Payment Methods Management
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLinkAccount} style={{ marginBottom: '10px' }}>
          Link New Bank Account or Card
        </Button>
        <List>
          {linkedAccounts.map((account) => (
            <div key={account.id}>
                            <StyledListItemText>
              <ListItem>

                <ListItemText
                  primary={`${account.type} - ${account.institution}`}
                  secondary={`Last 4 digits: ${account.last4}`}
                />
                <Button variant="outlined" color="secondary" onClick={() => handleRemoveAccount(account.id)}>Remove</Button>
              </ListItem>
              </StyledListItemText>
              <Divider />
            </div>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodsManagement;
