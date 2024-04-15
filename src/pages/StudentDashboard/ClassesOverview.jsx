import { List, ListItem, ListItemText, Divider } from '@mui/material';
import styled from 'styled-components';

const classes = [
  { date: '2024-04-15', title: 'Calculus with Prof. Smith', due: '50' },
  { date: '2024-04-20', title: 'History with Dr. Jones', due: '40' },
];

const StyledListItemText = styled.div`
  .MuiListItemText-secondary {
    color: var(--color-grey-800); // Change secondary text color here
  }
`;

const ClassesOverview = () => (
  <List component="nav" aria-label="mailbox folders">
    <ListItem>
      <ListItemText primary="Upcoming Classes" />
    </ListItem>
    <Divider />
    {classes.map((cls, index) => (
      <ListItem button key={index}>
        <StyledListItemText>
          <ListItemText
            primary={cls.title}
            secondary={`Due $${cls.due} on ${cls.date}`}
          />
        </StyledListItemText>
      </ListItem>
    ))}
  </List>
);

export default ClassesOverview;