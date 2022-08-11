import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

interface Props {
  allowedRoles: string[];
}

const RequireAuth = ({ allowedRoles }: Props) => {
  const { auth } = useAuthContext();
  const location = useLocation();
  return allowedRoles?.includes(auth.user.role) ? (
    <Outlet />
  ) : auth.user.role ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
