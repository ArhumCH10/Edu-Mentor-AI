import { useState } from 'react';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
const LoginButton = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };
  return (
    <button
      style={{
        fontFamily: 'Poppins',
        background: isHovered
          ? 'linear-gradient(to bottom, #3661a0, #57cbf5)'
          : 'linear-gradient(to bottom, #00ff0a, #009e66)',
        color: 'white',
        border: 'none',
        boxShadow: isHovered
          ? '0 6px 12px rgba(0, 158, 102, 0.32)'
          : '0 3px 6px rgba(0, 158, 102, 0.16)',
        transition: 'background 0.3s, box-shadow 0.3s, transform 0.3s',
        cursor: 'pointer',
        padding: '5px 15px',
        borderRadius: '10px',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        transform: isHovered ? 'scale(1.15)' : 'scale(1)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleLoginClick}
    >
      <HiArrowRightOnRectangle style={{ marginRight: '8px' }} />
      Login
    </button>
  );
};

export default LoginButton;
