import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Classroom.css';

const Timer = ({ startTime }) => {
  const [timeLeft, setTimeLeft] = useState('');
  
  useEffect(() => {
    const updateTimer = () => {
      const currentTime = new Date();
      const eventTime = new Date(startTime);  // Ensure startTime is a Date object
      const difference = eventTime - currentTime;
      
      if (difference <= 0) {
        setTimeLeft('Class has started!');
      } else {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s until class starts`);
      }
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);  // Dependency array to re-run effect when startTime changes

  return <div className="timer">{timeLeft}</div>;
};

Timer.propTypes = {
  startTime: PropTypes.string.isRequired  // Changed to string to reflect typical use case
};

export default Timer;
