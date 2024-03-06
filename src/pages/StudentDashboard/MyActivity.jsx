import  { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatDistanceToNow } from 'date-fns';
import Button from '../../ui/Button';
import { HiCheckCircle, HiOutlineAcademicCap, HiOutlineBeaker, HiOutlineCog } from 'react-icons/hi';

const ActivityCard = styled.div`
  background-color: var(--color-blue-500);
  border-radius: 20px;
  padding: 20px;
  color: #ffffff;
  max-width: 560px;
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
  cursor: pointer;

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

const ActivityTitle = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
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
 color: ${props => props.isSubmitted ? 'var(--color-brand-100)' : '#ff1744'}; // Changes color based on submission status
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start; 
  width: 100%; 
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


export default function MyActivity() {

    const calculateTimeLeft = (dueDate) => {
        const difference = +new Date(dueDate) - +new Date();
        let timeLeft = {};
      
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
          };
        }
      
        return timeLeft;
      };      

      const [activities, setActivities] = useState([
        { title: 'Calculus Homework', icon: HiOutlineAcademicCap, dueDate: '2024-03-01T23:59:00', mentor: 'Dr. Euler' },
        { title: 'Science Homework', icon: HiOutlineBeaker, submitted: true, submitDate: '2024-02-25T15:00:00', mentor: 'Marie Curie' },
        { title: 'Algorithm Homework', icon: HiOutlineCog, submitted: true, submitDate: '2024-02-26T12:00:00', mentor: 'Ada Lovelace' },
        // Add more activities here
      ]);
    
      useEffect(() => {
        const timer = setInterval(() => {
          setActivities(currentActivities =>
            currentActivities.map(activity => {
              if (!activity.submitted && activity.dueDate) {
                const timeLeft = calculateTimeLeft(activity.dueDate);
                return { ...activity, timeLeft };
              }
              return activity;
            }),
          );
        }, 1000);
    
        return () => clearInterval(timer);
      }, [activities]);
    
      return (
        <ActivityCard>
          <ActivityHeader>My Activities</ActivityHeader>
          {activities.map((activity, index) => (
            <ActivityItem key={index}>
              <IconWrapper>
                <activity.icon size="1.5em" />
              </IconWrapper>
              <div style={{ flex: 1 }}>
                <ActivityTitle>
                  {activity.title}
                  {activity.submitted && <SubmittedDot size="1em" />}

                </ActivityTitle>
                <Wrapper>
                <ActivityStatus isSubmitted={activity.submitted}>
                  {activity.submitted ? 
                    `Submitted ${formatDistanceToNow(new Date(activity.submitDate))}` : 
                    activity.timeLeft ? 
                    `${activity.timeLeft.days}d ${activity.timeLeft.hours}h ${activity.timeLeft.minutes}m left` : 
                    'Due Date Passed'}
                </ActivityStatus>
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