import { useLocation, Navigate, Outlet } from "react-router-dom";
import { PropsFromRedux, authConnector } from "../../store/auth/connector";

interface Props extends PropsFromRedux {
  allowedRoles: string[];
}

const RequireAuth = ({ allowedRoles, user }: Props) => {
  const role = user.role;
  const location = useLocation();
  return allowedRoles?.includes(role) ? <Outlet /> : role ? <Navigate to="/unauthorized" state={{ from: location }} replace /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default authConnector(RequireAuth);
