import styled from 'styled-components';
import { HiCheckCircle, HiOutlineAcademicCap, HiOutlineBeaker, HiOutlineCog } from 'react-icons/hi';
import Button from '../../ui/Button';

const ActivityCard = styled.div`
  background-color: var(--color-red-700);
  border-radius: 20px;
  padding: 20px;
  color: #ffffff;
  max-width: 350px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
`;

const ActivityHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  &:hover,
  &:active,
  &.active {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-800);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active svg {
    color: var(--color-green-500);
  }
`;

const IconWrapper = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start; 
  width: 100%; 
`;

const ActivityStatus = styled.div`
  flex-grow: 1;
  font-size: 1rem;
  font-weight: bold;

  &:hover,
  &:active,
  &.active {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
  }
`;

const ActivityMentor = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-align: right;
  padding-right: 3px;

  &:hover,
  &:active,
  &.active {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
  }
`;

const ActivityTitle = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SubmittedDot = styled(HiCheckCircle)`
  color: #00e676; // Adjust color as needed
  margin-left: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; 
  width: 100%; 
`;

export default function UpcomingClassCard() {
  const activities = [
    { title: 'Math Class', icon: HiOutlineAcademicCap, time: '5 minutes Left', mentor:'Prof. Arhum Ch' },
    { title: 'Science Class', icon: HiOutlineBeaker, time: '1 hour left', mentor:'Prof. Bilal Mumtaz' },
    { title: 'Computer Class', icon: HiOutlineCog, time: '3 hours left', mentor:'Prof. Ghous Ali' },
  ];

  return (
    <ActivityCard>
      <ActivityHeader>Upcoming Classes for today</ActivityHeader>
      {activities.map((activity, index) => (
        <ActivityItem key={index}>
          <IconWrapper>
            <activity.icon size="1.5em" />
          </IconWrapper>
          <div style={{ flex: 1 }}>
            <ActivityTitle>{activity.title} <SubmittedDot size="1em" />  
            </ActivityTitle>
            <Wrapper>
            <ActivityStatus>{activity.time}</ActivityStatus>
            <ActivityMentor> {activity.mentor}</ActivityMentor>
          </Wrapper>

          </div>
        </ActivityItem>
      ))}
      <ButtonWrapper>
        <Button variation='trans' size='extraSmall'>Show All</Button>
        </ButtonWrapper> 
    </ActivityCard>
  );
}