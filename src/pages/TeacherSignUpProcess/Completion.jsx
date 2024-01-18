import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectUser } from "../../../store/userSlice";

function Completion() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    // Get userData from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Dispatch action to update Redux store
    if (userData) {
      dispatch(updateUser(userData));

      // Remove userData from local storage
      localStorage.removeItem("userData");
    }
  }, [dispatch]);

  // Log the user from the Redux store
  useEffect(() => {
    console.log("User from Redux store:", user);
  }, [user]);

  return (
    <div className="container mt-4" style={{ padding: "0 350px" }}>
      <div className="bg-light text-black p-0">
        <h1 style={{ fontWeight: "bold" }}>
          Thank you for completing registration
        </h1>
        <p>
          We have received your application and are currently reviewing it. You
          will receive an email with the status of your application within 5
          business days.
        </p>
      </div>
    </div>
  );
}

export default Completion;
