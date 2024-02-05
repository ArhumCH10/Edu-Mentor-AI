import { IoIosNotifications } from 'react-icons/io';
import { VscSignOut } from 'react-icons/vsc';
import { useState, useEffect } from 'react';
import { useLogout } from "../TeacherSignUpProcess/useLogout";
import { useAuth } from '../../AuthContext';
import toast from "react-hot-toast";
import {useUser} from '../../UserContext';


const Header = () => {
  const userData = useUser();
  const { mutate: logoutMutate } = useLogout();
  const { logoutFrontend } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = () => {
    const scrolled = window.scrollY > 0;
    setIsScrolled(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const [fullUsername, setFullUsername] = useState('');

  
  
  useEffect(()=>{
    if (userData?.userData?.userData) {
      const { firstName, lastName } = userData.userData.userData;
      const username = `${firstName} ${lastName}`;
      setFullUsername(username);
    }

  },[userData?.userData?.userData]);
  
  const level = 0;
  const money = 0;

  const handleLogout = async () => {
    try {
      logoutMutate();
      logoutFrontend();
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };
  return (
    <div className={`header ${isScrolled ? 'scrolled' : ''}`}
      style={{
        background: isScrolled ? 'white' : 'transparent',
        boxShadow: isScrolled ? '0 4px 6px rgba(0, 0, 0, 0.1), 0 6px 15px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'background 0.3s, box-shadow 0.3s'

      }}>
      <div className="left">
        <h4 className="mx-3 my-3">Welcome, {fullUsername} </h4>
        <div className="mx-4 btn level-btn">LEVEL {level}</div>
      </div>
      <div className="right" style={{ display: 'flex', alignItems: 'center',width:'20%', marginRight: 5}}>
        <IoIosNotifications style={{ fontSize: '2.5rem' }} />
        <div className="mx-1 btn earn-btn">US $ {money}</div>
        <VscSignOut className='logout' style={{ fontSize: '2.5rem' }} onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Header;
