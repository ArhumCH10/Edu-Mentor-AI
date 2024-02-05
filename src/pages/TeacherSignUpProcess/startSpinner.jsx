import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: 6px solid rgba(0, 0, 0, 0.1); /* Adjust the color and opacity */
  border-top: 6px solid #333; /* Adjust the color */
  border-radius: 50%;
  animation: ${spinAnimation} 0.8s linear infinite;
  background: transparent; /* Set background to transparent */
`;

const StyledSpinner = () => {
  return (
    <SpinnerWrapper />
  );
};

export default StyledSpinner;
