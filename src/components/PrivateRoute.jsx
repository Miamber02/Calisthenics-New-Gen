import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth-context';

const PrivateRoute = ({ element, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.rol !== requiredRole) {
    alert("Acceso denegado");
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
