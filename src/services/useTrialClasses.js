import { useState, useEffect } from 'react';
import axios from 'axios';

const useTrialClasses = () => {
  const [trialClasses, setTrialClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrialClasses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/trial-classes'); 
        setTrialClasses(response.data);
      } catch (error) {
        setError('Error fetching trial classes');
        console.error('Error fetching trial classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrialClasses();
  }, []);

  return { trialClasses, loading, error };
};

export default useTrialClasses;