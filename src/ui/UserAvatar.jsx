import styled from "styled-components";
import { useState, useEffect } from "react";
import Button from "./Button";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: start;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Heading = styled.h3`
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--color-grey-900);
  margin-top: 3px;
`;

export default function UserAvatar() {
  const [userName, setUserName] = useState("");
  const [userLevel, setUserLevel] = useState(4); // State to store the user level

  useEffect(() => {
    // Get the user object from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      // Update the user name and level in state
      setUserName(storedUser.name);
      setUserLevel(storedUser.levels); // Assuming levels are stored as a number
    }
  }, []);

  return (
    <StyledUserAvatar>
      {/* Display the user name and level */}
      <Heading>Welcome, {userName || "Guest"}</Heading>
      <Button variation="light" size="small">
        Level {userLevel}
      </Button>
    </StyledUserAvatar>
  );
}
