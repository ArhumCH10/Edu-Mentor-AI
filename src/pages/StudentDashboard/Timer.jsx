import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Classroom.css';

const Timer = ({ startTime }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const currentTime = new Date();
      const difference = startTime - currentTime;
      if (difference <= 0) {
        setTimeLeft('Class is starting!');
      } else {
        let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((difference / (1000 * 60)) % 60);
        let seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s until class starts`);
      }
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  return <div className="timer">{timeLeft}</div>;
};

Timer.propTypes = {
  startTime: PropTypes.instanceOf(Date).isRequired
};

export default Timer;
