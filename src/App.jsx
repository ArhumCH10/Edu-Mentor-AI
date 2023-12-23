import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./ui/MainLayout";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LogInPage/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainLayout />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
