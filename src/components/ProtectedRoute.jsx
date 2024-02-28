
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const getToken = () => localStorage.getItem('token');

  if(!getToken()) return <Navigate to="/login" />
  return <>{children}</>;

}

export default ProtectedRoute