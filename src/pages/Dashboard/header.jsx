import { IoIosNotifications } from 'react-icons/io';
import { VscSignOut } from 'react-icons/vsc';
import { useState,useEffect } from 'react';

const Header = () => {
<<<<<<< HEAD
    const user ='Arhum Ch';
=======
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

    const user ='Ghous King';
>>>>>>> 96da6ed5492b3b42291c01924007150361fb7e94
    const level = 4;
    const money= 32000;
  return (
    <div className={`header ${isScrolled ? 'scrolled' : ''}`} 
    style={{
      background: isScrolled ? 'white' : 'transparent',
      boxShadow: isScrolled ? '0 4px 6px rgba(0, 0, 0, 0.1), 0 6px 15px rgba(0, 0, 0, 0.1)' : 'none',
      transition: 'background 0.3s, box-shadow 0.3s'
     
    }}>
      <div className="left">
        <h4 className="mx-3 my-3">Welcome, {user}</h4>
        <div className="mx-4 btn level-btn">LEVEL {level}</div>
      </div>
      <div className="right" style={{ display: 'flex', alignItems: 'center',marginRight:13 }}>
        <IoIosNotifications style={{ fontSize: '3rem' }} />
        <div className="mx-1 btn earn-btn">US $ {money}</div>
        <VscSignOut style={{ fontSize: '3rem' }} />
      </div>
    </div>
  );
};

export default Header;
