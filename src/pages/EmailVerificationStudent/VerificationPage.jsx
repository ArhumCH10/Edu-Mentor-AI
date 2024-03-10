import ValidationBox from "./ValidationBox";
import VerificationPageNavbar from "./VerificationPageNavbar";

function VerificationPage() {
  return (
    <>
      <VerificationPageNavbar currentImageIndex={0} />
      <ValidationBox />
    </>
  );
}

export default VerificationPage;
