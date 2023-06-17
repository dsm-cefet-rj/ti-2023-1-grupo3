import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectLoggedUser } from "../../store/slices/userSlice";

function ProtectedRoute({ redirectPath = "/login", children }) {
  const loggedUser = useSelector(selectLoggedUser);

  if (!loggedUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
