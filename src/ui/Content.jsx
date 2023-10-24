import { useState, useEffect } from "react";
import Heading from "./Heading";
import styled from "styled-components";
import SearchBar from './SearchBar';
import Options from "./Options";

const wordsList = ["Quickly", "Effortlessly", "Swiftly", "Instantly", "Easily"];
const initialIndex = 0;

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 120px;
  padding-left: 50px;
`;

export default function Content() {
  const [wordIndex, setWordIndex] = useState(initialIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % wordsList.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledPage>
      <Heading as="h2">Discover Your Perfect Mentor</Heading>
      <Heading as="h2">Companion, {wordsList[wordIndex]}</Heading>
      <Heading as="h3">Because we will Transform the new you</Heading>
      <SearchBar />
      <Options/>
    </StyledPage>
  );
}
