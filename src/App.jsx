import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import MainLayout from "./ui/MainLayout";
import LoginPage from "./pages/LogInPage/LoginPage";
import { Toaster } from "react-hot-toast";
import SignUpMain from "./pages/SignUpMainPage/SignUpMain";
import TeacherSignUpMain from "./pages/TeacherSignUpProcess/TeacherSignUpMain";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainLayout />} />
          <Route path="/sign-up" element={<SignUpMain />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/tutor-signup" element={<TeacherSignUpMain />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          },
        }}
      />
    </QueryClientProvider>
  );
}
