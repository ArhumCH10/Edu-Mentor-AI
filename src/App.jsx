import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "../store/store";
import MainLayout from "./ui/MainLayout";
import LoginPage from "./pages/LogInPage/LoginPage";
import { Toaster } from "react-hot-toast";
import SignUpMain from "./pages/SignUpMainPage/SignUpMain";
import TeacherSignUpMain from "./pages/TeacherSignUpProcess/TeacherSignUpMain";
import DashboardLinks from "./pages/Dashboard/DashboardLinks";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
            <Route path="/sign-up" element={<SignUpMain />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboardlinks/*" element={<DashboardLinks />} />
            <Route
              path="/tutor-signup"
              element={<TeacherSignUpMain />} />
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
