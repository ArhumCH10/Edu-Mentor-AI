import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "../store/store";
import MainLayout from "./ui/MainLayout";
import GetStartedMain  from "./pages/mainPage/get-started-page/getStartedMain";
import  TutorsSearch  from "./pages/mainPage/Tutor-Search/TutorsSearch";
import LoginPage from "./pages/LogInPage/LoginPage";
import { Toaster } from "react-hot-toast";
import SignUpMain from "./pages/SignUpMainPage/SignUpMain";
import TeacherSignUpMain from "./pages/TeacherSignUpProcess/TeacherSignUpMain";
import DashboardLinks from "./pages/Dashboard/DashboardLinks";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AdminLogin from "../src/pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { PrivateRoute } from "./AuthDashboardRoutes";
import ForgetPasswordPage from "./pages/LogInPage/forgetPasswordPage";


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
      <Provider store={store}>
        <Router>
          <Routes>
            <Route index element={<MainLayout />} />
            <Route path="/get-started/*" element={<GetStartedMain />} />
            <Route path="/tutors-search/*" element={<TutorsSearch />} />
            <Route path="/sign-up" element={<SignUpMain />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboardlinks/*"
              element={
                <PrivateRoute
                  element={<DashboardLinks />}
                  path="/dashboardlinks/*"
                />
              }
            />
            <Route path="/admin" element={<AdminLogin />} />

            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            <Route path="/tutor-signup" element={<TeacherSignUpMain />} />
            <Route path="/forget-password" element={<ForgetPasswordPage />} />
          </Routes>
        </Router>

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
      </Provider>
    </QueryClientProvider>
  );
}
