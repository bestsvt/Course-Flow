import './App.css'
import AuthenticatedAdminApp from './pages/admin/AuthenticatedAdminApp'
import { useAuth } from './contexts/authentication';

function AppAdmin() {
  return <AuthenticatedAdminApp />
  // Using this after done login function
  const { isAdminAuthenticated } = useAuth();
  return isAdminAuthenticated ? <AuthenticatedAdminApp /> : <UnauthenticatedAdminApp />;
}

export default AppAdmin
