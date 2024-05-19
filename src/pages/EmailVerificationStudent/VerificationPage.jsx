import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ValidationBox from "./ValidationBox";
import VerificationPageNavbar from "./VerificationPageNavbar";

function VerificationPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <VerificationPageNavbar currentImageIndex={0} />
      <ValidationBox />
    </>
  );
}

export default VerificationPage;
