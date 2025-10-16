import { useAuth } from '@clerk/clerk-react';
import { ReactNode } from 'react';
import PageMeta from '../common/PageMeta';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isSignedIn, isLoaded } = useAuth();

  // Mientras carga la autenticación
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <PageMeta title="Cargando..." description="Verificando autenticación" />
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Cargando...</span>
        </div>
      </div>
    );
  }

  // Si no está autenticado
  if (!isSignedIn) {
    return fallback || (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <PageMeta title="Acceso Denegado" description="Necesitas iniciar sesión" />
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Acceso Restringido
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Necesitas iniciar sesión para acceder a esta página.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Por favor, dirígete al menú principal e inicia sesión para continuar.
              </p>
              <a 
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Ir al Inicio
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si está autenticado, mostrar el contenido
  return <>{children}</>;
}