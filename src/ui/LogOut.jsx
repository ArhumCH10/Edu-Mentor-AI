import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();

  const HandleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <ButtonIcon>
      <HiArrowRightOnRectangle onClick={HandleLogout} />
    </ButtonIcon>
  );
}
