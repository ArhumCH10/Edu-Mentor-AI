import AppBar from '@mui/material/AppBar';
import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from './Logo';
import LoginButton from './LoginButton';
import PropTypes from 'prop-types';

const pages = ['Find a mentor', 'Become a Mentor'];

const gradients = [
  ['#3661a0', '#57cbf5'],
  ['#00ff0a', '#009e66'],
  ['black', '#00ff0a'],
];

function ResponsiveAppBar({ currentImageIndex }) {
  const [backgroundGradient, setBackgroundGradient] = React.useState(gradients[0]);

  React.useEffect(() => {
    setBackgroundGradient(gradients[currentImageIndex % gradients.length]);
  }, [currentImageIndex]);

  return (
    <AppBar position="sticky">
      <Container
        maxWidth="2xl"
        sx={{
          paddingTop: '20px',
          background: `linear-gradient(to bottom, ${backgroundGradient[0]}, ${backgroundGradient[1]})`,
        }}
      >
        <Toolbar disableGutters>
          <Logo />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            EDU MENTOR AI
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              marginLeft: '165px',
            }}
          >
            {pages.map((page) => (
              <Button key={page} sx={{ my: 2, color: 'white', marginLeft: '30px',   fontFamily: "Poppins", }}>
                {page}
              </Button>
            ))}
          </Box>

          <Box>
            <LoginButton/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

ResponsiveAppBar.propTypes = {
  currentImageIndex: PropTypes.number.isRequired,
};
