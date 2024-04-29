import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LogOut() {
  const navigate = useNavigate();

  const HandleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("verified");
    localStorage.removeItem("isDarkMode");
    toast.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <ButtonIcon>
      <HiArrowRightOnRectangle onClick={HandleLogout} />
    </ButtonIcon>
  );
}
