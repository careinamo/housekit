import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router';
import AppLayout from './AppLayout';
import PageMeta from '../components/common/PageMeta';

export default function ProtectedLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Mientras carga la autenticación
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <PageMeta title="Cargando..." description="Verificando autenticación" />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <span className="text-gray-600 dark:text-gray-400">Verificando autenticación...</span>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir a welcome
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  // Si está autenticado, mostrar el layout normal con las rutas hijas
  return <AppLayout />;
}