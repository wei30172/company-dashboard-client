import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { useAuthContext } from "../../contexts/AuthContext";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../../features/auth/authSlice";

interface Props {
  allowedRoles: string[];
}

const RequireAuth = ({ allowedRoles }: Props) => {
  // const { auth } = useAuthContext();
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  const location = useLocation();
  return allowedRoles?.includes(user.role) ? <Outlet /> : token ? <Navigate to="/unauthorized" state={{ from: location }} replace /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
