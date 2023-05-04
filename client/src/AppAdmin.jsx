import './App.css'
import AuthenticatedAdminApp from './pages/admin/AuthenticatedAdminApp'
import UnauthenticatedAdminApp from './pages/admin/UnauthenticatedAdminApp'
import { useAuth } from './contexts/authentication';

function AppAdmin() {
  const { isAdminAuthenticated } = useAuth();
  return isAdminAuthenticated ? <AuthenticatedAdminApp /> : <UnauthenticatedAdminApp />;
}

export default AppAdmin
