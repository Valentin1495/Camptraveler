import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function RequireAuth() {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to='/signin' state={{ from: location }} replace />
  );
}
