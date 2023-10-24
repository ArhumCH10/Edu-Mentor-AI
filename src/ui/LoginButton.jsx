import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';

export default function LoginButton() {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="filled"
        startIcon={<HiArrowRightOnRectangle />}
        sx={{
          fontFamily: "Poppins",
          background: 'linear-gradient(to bottom, #00ff0a, #009e66)',
          color: 'white',
          border: 'none',
          boxShadow: '0 3px 6px rgba(0, 158, 102, 0.16)', // Add a subtle shadow effect
          transition: 'background 0.3s, box-shadow 0.3s, transform 0.3s', // Add transition effects
          '&:hover': {
            background: 'linear-gradient(to bottom, #3661a0, #57cbf5)',
            boxShadow: '0 6px 12px rgba(0, 158, 102, 0.32)', // Increase shadow on hover
            transform: 'scale(1.15)', // Scale up the button on hover (pop-up effect)
          },
        }}
      >
        Login
      </Button>
    </Stack>
  );
}
