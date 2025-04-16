import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/model/store";
import LoginPage from "@/pages/login/ui/LoginPage";
import PrivateRoute from "@/shared/lib/PrivateRoute";

const ProfilePage = () => {
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  return (
    <div className="p-4">
      <h1>Welcome, {user?.email || "Guest"}!</h1>
      <button
        onClick={logout}
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Log Out
      </button>
    </div>
  );
};

const CheckUserToAuth = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to={"/profile"} />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckUserToAuth />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
