import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@clerk/clerk-react';
import UserInfoCard from '../components/Housekit/UserInfoCard';
import DeviceCard from '../components/Housekit/DeviceCard';
import { UserInfo, Device } from '../types/housekit';
import { housekitService } from '../services/housekitService';
import PageMeta from '../components/common/PageMeta';
import PageBreadcrumb from '../components/common/PageBreadCrumb';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const Housekit: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Documento del usuario actual - en una app real vendría del contexto/auth
  const currentUserDocument = "ppt5492933";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [userInfoResponse, devicesResponse] = await Promise.all([
          housekitService.getUserInfo(currentUserDocument),
          housekitService.getDevices(currentUserDocument)
        ]);

        if (userInfoResponse.length > 0) {
          setUserInfo(userInfoResponse[0]);
        }
        
        setDevices(devicesResponse);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserDocument]);

  const handleDeviceAction = async (deviceId: string, action: 'request' | 'confirm' | 'cancel') => {
    console.log(`Action ${action} on device ${deviceId}`);
    // Aquí implementarías las llamadas a la API para las acciones
    // Por ahora solo mostramos el log
    
    // Ejemplo de implementación:
    try {
      switch (action) {
        case 'request':
          // Llamar API para solicitar el dispositivo
          alert(t('device.requesting', { id: deviceId }));
          break;
        case 'confirm':
          // Llamar API para confirmar el uso
          alert(t('device.confirming', { id: deviceId }));
          break;
        case 'cancel':
          // Llamar API para cancelar el servicio
          alert(t('device.canceling', { id: deviceId }));
          break;
      }
      
      // Refrescar los datos después de la acción
      // await fetchData();
    } catch (err) {
      console.error('Error performing action:', err);
      setError('Error al realizar la acción');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <PageMeta title={`${t('housekit.title')} - ${t('housekit.subtitle')}`} description={t('housekit.subtitle')} />
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">{t('housekit.loading')}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <PageMeta title={`${t('housekit.title')} - Error`} description="Error page"/>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">{t('housekit.error', { message: error })}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              {t('housekit.retry')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <PageMeta title={`${t('housekit.title')} - ${t('housekit.subtitle')}`} description={t('housekit.subtitle')}/>
        
        <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <PageBreadcrumb 
            pageTitle={t('housekit.title')} 
          />
          
          {/* Selector de idiomas */}
          <div className="flex gap-2">
            <button
              onClick={() => changeLanguage('es')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                i18n.language === 'es' 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
              }`}
            >
              {t('housekit.spanish')}
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                i18n.language === 'en' 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
              }`}
            >
              {t('housekit.english')}
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Información del Usuario */}
          {userInfo && (
            <div className="mb-8">
              <UserInfoCard userInfo={userInfo} />
            </div>
          )}

          {/* Dispositivos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                currentUserDocument={currentUserDocument}
                onAction={handleDeviceAction}
              />
            ))}
          </div>

          {/* Mensaje si no hay dispositivos */}
          {devices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {t('housekit.no_devices')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default Housekit;