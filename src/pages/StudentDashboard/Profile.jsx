import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import styled from 'styled-components';

function Profile() {

  const StyledProfileLayout = styled.div`
  display: grid;
  grid-template-columns: 40% auto; 
  grid-template-rows: auto auto;   
  gap: 0.4rem;                     
`;

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">My Profile</Heading>
    </Row>

    <StyledProfileLayout>
      <div className="profile-container">
          <div className="Profile-Top">
          <div className='row' style={{ padding: 0 }}>

            </div>
          </div>
      </div>
    </StyledProfileLayout>
    </>
  );
}

export default Profile;