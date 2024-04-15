import { List, ListItem, ListItemText } from '@mui/material';

const notifications = [
  { message: 'Your payment for Calculus class has been processed.' },
  { message: 'Reminder: History class payment is due in 3 days.' },
];

const Notifications = () => (
  <List>
    {notifications.map((note, index) => (
      <ListItem key={index}>
        <ListItemText primary={note.message} />
      </ListItem>
    ))}
  </List>
);

export default Notifications;
