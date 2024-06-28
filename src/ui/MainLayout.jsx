import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Element } from "react-scroll";
import NavBar from "./NavBar";
import AlternativeNavbar from "./AlternativeNavbar";
import FirstOne from "../pages/mainPage/FirstOne";
import SecondOne from "../pages/mainPage/SecondOne";
import ThirdOne from "../pages/mainPage/ThirdOne";
import FourthOne from "../pages/mainPage/FourthOne";
import FifthOne from "../pages/mainPage/FifthOne";
import SixthOne from "../pages/mainPage/SixthOne";
import SeventhOne from "../pages/mainPage/SeventhOne";
import EightOne from "../pages/mainPage/EightOne";
import styled, { keyframes } from "styled-components";

const images = [
  "/firstpagepicturesStudents.png",
  "/firstpagepicturesStudents4.png",
  "/firstpagepicturesStudents6.png",
  "/firstpagepicturesStudents3.png",
];
const totalImages = images.length;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedSection = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
`;

export default function MainLayout() {
  const location = useLocation();
  const verified = JSON.parse(localStorage.getItem("verified"));
  const [toastShown, setToastShown] = useState(false);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isVerified = searchParams.get("isVerified");

    if (isVerified === "true" && !toastShown) {
      setTimeout(() => {
        toast.success("Email Verified Successfully");
        navigate("/", { replace: true });
        setToastShown(true);
      }, 0);
    } else if (isVerified === "false" && !toastShown) {
      setTimeout(() => {
        toast.error("Email verification pending");
        setToastShown(true);
      }, 0);
    }
  }, [location.search, navigate, toastShown]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="CovertNavStatic">
        {verified && verified !== "null" ? (
          <AlternativeNavbar currentImageIndex={currentImageIndex} />
        ) : (
          <NavBar currentImageIndex={currentImageIndex} />
        )}
      </div>
      <Element name="firstOne">
        <AnimatedSection>
          <FirstOne currentImageIndex={currentImageIndex} images={images} />
        </AnimatedSection>
      </Element>
      <Element name="secondOne">
        <AnimatedSection>
          <SecondOne />
        </AnimatedSection>
      </Element>
      <Element name="thirdOne">
        <AnimatedSection>
          <ThirdOne />
        </AnimatedSection>
      </Element>
      <Element name="fourthOne">
        <AnimatedSection>
          <FourthOne />
        </AnimatedSection>
      </Element>
      <Element name="fifthOne">
        <AnimatedSection>
          <FifthOne />
        </AnimatedSection>
      </Element>
      <Element name="sixthOne">
        <AnimatedSection>
          <SixthOne />
        </AnimatedSection>
      </Element>
      <Element name="seventhOne">
        <AnimatedSection>
          <SeventhOne />
        </AnimatedSection>
      </Element>
      <Element name="eighthOne">
        <AnimatedSection>
          <EightOne />
        </AnimatedSection>
      </Element>
    </>
  );
}