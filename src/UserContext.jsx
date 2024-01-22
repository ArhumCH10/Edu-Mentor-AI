import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserData } from './services/teacherDataApi';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const fetchedUserData = await getUserData();
      setUserData(fetchedUserData);
      localStorage.setItem("userData", JSON.stringify(fetchedUserData));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Include userData in the dependency array if needed

  return (
    <UserContext.Provider value={{ userData, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => {
  return useContext(UserContext);
};
