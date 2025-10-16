import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import PageMeta from '../components/common/PageMeta';
import UserDropdown from '../components/header/UserDropdown';
import AuthHeader from '../components/auth/AuthHeader';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <PageMeta title="Bienvenido | Housekit" description="Sistema de gestión de lavandería" />

      <div className="container mx-auto px-4 py-16">
        <AuthHeader />
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Bienvenido a <span className="text-blue-600">Housekit</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Sistema inteligente de gestión de lavandería para edificios y residencias.
              Gestiona tus cupos, reserva equipos y optimiza tu tiempo.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">🧺</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Gestión de Cupos
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Administra tus cupos mensuales de lavandería de forma inteligente
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Reservas en Tiempo Real
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ve el estado de las máquinas y reserva tu turno fácilmente
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Control Total
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Historial completo de uso y estadísticas personalizadas
              </p>
            </div>
          </div>

          {/* Auth Section */}
          <SignedOut>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Comienza ahora
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Inicia sesión para acceder a tu panel de control personalizado
              </p>
              <SignInButton
                mode="modal"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    button: "w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-lg"
                  }
                }}
              >
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-lg">
                  Iniciar Sesión
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                ¡Ya estás conectado!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Accede a tu dashboard para gestionar tus servicios de lavandería
              </p>
              <a
                href="/housekit"
                className="inline-block w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-lg"
              >
                Ir a Housekit
              </a>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}