import Heading from "./Heading";
import styled from "styled-components";

const StyledList = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const Button = styled.button`
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  font-size: 0.9rem;
font-weight: bold;
font-family: "Poppins", sans-serif;
background-color: transparent;
margin-left: 20px;
padding: 6px;
cursor: pointer;

&:hover {
    background-color: white;
    color: black;
  }
`;

export default function Options() {
  return (
    <StyledList>
    <Heading as="h4">Popular:</Heading>
    <Button>
        Mathematics
    </Button>

    <Button>
       Web Development
    </Button>

    <Button>
        Quran
    </Button>
    </StyledList>
  )
}
