import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "./context/ContextProvider";


const ProtectedRoute = () => {
  const { isLogIn } = useStateContext();

  return isLogIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
