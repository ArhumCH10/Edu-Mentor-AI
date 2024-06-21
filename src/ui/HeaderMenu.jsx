import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';
import { HiOutlineUser, HiOutlineBell } from 'react-icons/hi';
import LogOut from './LogOut';
import DarkModeToggle from './DarkModeToggle';
import NotificationModal from '../pages/StudentDashboard/NotificationModal';
import { io } from 'socket.io-client';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  text-decoration: none;
  list-style: none;
`;

const socket = io('http://localhost:8000'); 

export default function HeaderMenu() {
  const [showModal, setShowModal] = useState(false);
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    socket.on('connect', () => {
      console.log("Connected to socket server");
    });

    socket.on('notifyStudent', (data) => {
      if (data.studentName === storedUser.name) {
        setClassDetails(data.classDetails);
        setShowModal(true);
      }
    });

    return () => {
      socket.off('notifyStudent');
    };
  }, []);

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon>
          <HiOutlineBell />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <LogOut />
      </li>
      <NotificationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        classDetails={classDetails}
      />
    </StyledHeaderMenu>
  );
}
