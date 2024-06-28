import { useState, useEffect } from "react";
import Heading from "./Heading";
import styled, { keyframes, css } from "styled-components";
import { useNavigate } from "react-router-dom";

const wordsList = ["Quickly", "Effortlessly", "Swiftly", "Instantly", "Easily"];
const initialIndex = 0;

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 120px;
  padding-left: 50px;
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const ButtonWrapper = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: #000;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: ${({ isLoading }) => (isLoading ? "not-allowed" : "pointer")};
  font-size: 17px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease-in-out;
  width: 300px;
  overflow: hidden;
  margin: 2rem 7rem;

  &:hover {
    background: linear-gradient(to right, transparent, #00ff00);
    color: #000;
  }

  .icon {
    margin-left: 8px;
    animation: ${({ isLoading }) => (isLoading ? "none" : css`${bounce} 1s infinite`)};
  }

  svg {
    fill: #ffffff;
    height: 25px;
    width: 30px;
    transition: transform 0.2s ease-in-out;
  }

  &:focus svg {
    transform: translateX(150px);
  }
`;

export default function Content() {
  const navigate = useNavigate();
  const [wordIndex, setWordIndex] = useState(initialIndex);
  const [isLoading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      document.activeElement.blur();
      navigate("/get-started");
    }, 2000);
  };

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
      <ButtonWrapper href="#" onClick={handleClick} isLoading={isLoading}>
        {isLoading ? "Loading..." : "Get started"}
        <span className="icon">
          <svg
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M16.086 10.993h-12v2h12l-5.293 5.293 1.414 1.414 7.707-7.707-7.707-7.707L10.793 5.7l5.293 5.293Zm1 1Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </ButtonWrapper>
    </StyledPage>
  );
}