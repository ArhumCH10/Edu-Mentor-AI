import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom"; 

export default function SignUpButton() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/sign-up"); 
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="filled"
        startIcon={<HiArrowRightOnRectangle />}
        sx={{
          fontFamily: "Poppins",
          background: "linear-gradient(to bottom, #00ff0a, #009e66)",
          color: "white",
          border: "none",
          boxShadow: "0 3px 6px rgba(0, 158, 102, 0.16)",
          transition: "background 0.3s, box-shadow 0.3s, transform 0.3s",
          "&:hover": {
            background: "linear-gradient(to bottom, #3661a0, #57cbf5)",
            boxShadow: "0 6px 12px rgba(0, 158, 102, 0.32)",
            transform: "scale(1.15)",
          },
        }}
        onClick={handleSignUpClick} 
      >
        SignUp
      </Button>
    </Stack>
  );
}
