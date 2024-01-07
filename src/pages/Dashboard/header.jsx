import { IoIosNotifications } from 'react-icons/io';
import { VscSignOut } from 'react-icons/vsc';

const Header = () => {
    const user ='Ghous King';
    const level = 4;
    const money= 32000;
  return (
    <div className="header">
      <div className="left">
        <h4 className="mx-3 my-3">Welcome, {user}</h4>
        <div className="mx-4 btn level-btn">LEVEL {level}</div>
      </div>
      <div className="right" style={{ display: 'flex', alignItems: 'center' }}>
        <IoIosNotifications style={{ fontSize: '3rem' }} />
        <div className="mx-1 btn earn-btn">US $ {money}</div>
        <VscSignOut style={{ fontSize: '3rem' }} />
      </div>
    </div>
  );
};

export default Header;
