import { useEffect, useState } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export const StartedSpinner = ({searchQuery}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('Finding tutor who will Support you');
  const [ani, setAni] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAni(false);
      const timer2 = setTimeout(() => {
        setAni(true);
        setText('Finding tutor who will Motivate you');
        const midtimer = setTimeout(() => {
          setAni(false);
          const timer3 = setTimeout(() => {
            setAni(true);
            setText('Finding tutor who will Inspire you');
            const timer4 = setTimeout(() => {
              setAni(false);
              setLoading(false);
              navigate(`/tutors-search?${searchQuery}`);
            },2000)
            return () => clearTimeout(timer4);
          }, 2000);
          return () => clearTimeout(timer3);
        }, 2000);
        return () => clearTimeout(midtimer);
      }, 2000);
      return () => clearTimeout(timer2);
    }, 6000);

    return () => clearTimeout(timer1);
  }, []);

  return (
    <div className={`started-spinner-container`}>
      {loading && (
        <>
          <CirclesWithBar
            height={150}
            width={150}
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <h1 className={`loading-text ${ani ? 'animate' : ''}`}>
            {text}
          </h1>
        </>
      )}
    </div>
  );
};
StartedSpinner.propTypes = {
  searchQuery: PropTypes.any.isRequired,
};