import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "../store/store";
import MainLayout from "./ui/MainLayout";
import GetStartedMain from "./pages/mainPage/get-started-page/getStartedMain";
import TutorsSearch from "./pages/mainPage/Tutor-Search/TutorsSearch";
import LoginPage from "./pages/LogInPage/LoginPage";
import { Toaster } from "react-hot-toast";
import SignUpMain from "./pages/SignUpMainPage/SignUpMain";
import TeacherSignUpMain from "./pages/TeacherSignUpProcess/TeacherSignUpMain";
import DashboardLinks from "./pages/Dashboard/DashboardLinks";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AdminLogin from "../src/pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { PrivateRoute } from "./AuthDashboardRoutes";
import ForgetPasswordPage from "./pages/LogInPage/ForgetPasswordPage";
import StudentDashboardLinks from "./pages/StudentDashboard/StudentDashboardLinks";
import { DarkModeProvider } from "./DarkModeChanger";
import Dashboard from "./pages/StudentDashboard/Dashboard";
import Profile from "./pages/StudentDashboard/Profile";
import TimeTable from "./pages/StudentDashboard/TimeTable";
import Classroom from "./pages/StudentDashboard/Classroom";
import Lessons from "./pages/StudentDashboard/Lessons";
import Message from "./pages/StudentDashboard/Message";
import HireMentor from "./pages/StudentDashboard/HireMentor";
import Statistics from "./pages/StudentDashboard/Statistics";
import Payment from "./pages/StudentDashboard/Payment";
import Settings from "./pages/StudentDashboard/Settings";
import TutorProfile from "./pages/mainPage/Tutor-Search/Tutor-Profile/TutorProfile";
import VerificationPage from "./pages/EmailVerificationStudent/VerificationPage";
import CheckoutPageStudent from "./pages/CheckoutPage/CheckoutPageStudent";
import Quiz from "./pages/StudentDashboard/Quiz";
import Calling from "./pages/Dashboard/Calling"
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
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route index element={<MainLayout />} />
              <Route path="/get-started/*" element={<GetStartedMain />} />
              <Route path="/tutors-search/*" element={<TutorsSearch />} />
              <Route path="/tutor" element={<TutorProfile />} />

              <Route path="/sign-up" element={<SignUpMain />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verify" element={<VerificationPage />} />
              <Route path="/checkout-page/*" element={<CheckoutPageStudent />} /> 
              <Route path="/quiz/*" element={<Quiz />} /> 
              <Route path="/meet/*" element={<Calling />} /> 

             


              <Route
                path="/dashboardlinks/*"
                element={
                  <PrivateRoute
                    element={<DashboardLinks />}
                    path="/dashboardlinks/*"
                  />
                }
              />

              <Route
                path="/studentdashboard"
                element={<StudentDashboardLinks />}
              >
                <Route path="dashboard" index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="timetable" element={<TimeTable />} />
                <Route path="classroom" element={<Classroom />} />
                <Route path="lessons" element={<Lessons />} />
                <Route path="chat/*" element={<Message />} />
                <Route path="hirementor" element={<HireMentor />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="payment" element={<Payment />} />
                <Route path="settings" element={<Settings />} />
              </Route>

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
    </DarkModeProvider>
  );
}
