import { useAuth } from "@/features/auth/model/store"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}: { children: React.ReactNode }) => {
  const user = useAuth((s) => s.user);
  return user ? children : <Navigate to={"/login"} replace/>
}

export default PrivateRoute