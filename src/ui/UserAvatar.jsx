import styled from "styled-components";
//import {useUser} from './useUser';
import Button from './Button';

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: start;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

// const Avatar = styled.img`
//   display: block;
//   width: 4rem;
//   width: 3.6rem;
//   aspect-ratio: 1;
//   object-fit: cover;
//   object-position: center;
//   border-radius: 50%;
//   outline: 2px solid var(--color-grey-100);
// `;

const Heading = styled.h3`
      font-size: 1.7rem;
      font-weight: 600;
      color: var(--color-grey-900);
      margin-top: 3px;
`;


export default function UserAvatar() {

  //const {user} = useUser();

//   const {fullName, avatar} = user.user_metadata;
//   console.log(avatar);


  return (
    <StyledUserAvatar>
      {/* <Avatar src={avatar || "default-user.jpg"} alt={`Avatar of ${fullName}`}/> */}
      <Heading>Welcome, Arhum Naveed</Heading>
      <Button  variation="light" size="small">Level 0</Button>
    </StyledUserAvatar>
  )
}