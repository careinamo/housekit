import React from 'react';
import { Device, DeviceStatus } from '../../types/housekit';

interface DeviceCardProps {
  device: Device;
  currentUserDocument: string;
  onAction: (deviceId: string, action: 'request' | 'confirm' | 'cancel') => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ 
  device, 
  currentUserDocument, 
  onAction 
}) => {
  const getDeviceStatus = (): DeviceStatus => {
    if (device.available) return 'available';
    if (device.userUsing?.document === currentUserDocument) return 'my_service';
    return 'occupied';
  };

  const getCardClasses = () => {
    const status = getDeviceStatus();
    const baseClasses = "rounded-lg border-2 border-dashed p-4 transition-all duration-200";
    
    switch (status) {
      case 'available':
        return `${baseClasses} border-gray-300 bg-white hover:border-gray-400`;
      case 'occupied':
        return `${baseClasses} border-gray-400 bg-gray-100`;
      case 'my_service':
        return `${baseClasses} border-green-400 bg-green-50`;
      default:
        return baseClasses;
    }
  };

  const getIcon = () => {
    return device.serviceType === 'washing_machine' ? '🧺' : '🌪️';
  };

  const renderButton = () => {
    const status = getDeviceStatus();
    
    if (status === 'available') {
      return (
        <button
          onClick={() => onAction(device.id, 'request')}
          className="w-full mt-3 px-4 py-2 bg-green-100 text-green-700 border border-green-300 border-dashed rounded-md hover:bg-green-150 transition-colors text-sm font-medium"
        >
          solicitar
        </button>
      );
    }
    
    if (status === 'my_service') {
      return (
        <div className="space-y-2 mt-3">
          <button
            onClick={() => onAction(device.id, 'confirm')}
            className="w-full px-4 py-2 bg-green-100 text-green-700 border border-green-300 border-dashed rounded-md hover:bg-green-150 transition-colors text-sm font-medium"
          >
            confirmar
          </button>
          <button
            onClick={() => onAction(device.id, 'cancel')}
            className="w-full px-4 py-2 bg-red-100 text-red-700 border border-red-300 border-dashed rounded-md hover:bg-red-150 transition-colors text-sm font-medium"
          >
            Cancelar Servicio
          </button>
        </div>
      );
    }
    
    return null;
  };

  const status = getDeviceStatus();
  const quotes = device.serviceType === 'washing_machine' 
    ? device.quotes.washing_machine 
    : device.quotes.dryer_slots;

  return (
    <div className={getCardClasses()}>
      <div className="flex items-center gap-3 mb-3">
        <div className="text-2xl">{getIcon()}</div>
        <div>
          <h3 className="font-medium text-gray-900 capitalize">
            {device.name}
          </h3>
          <p className={`text-sm ${
            status === 'available' ? 'text-green-600' : 
            status === 'my_service' ? 'text-green-700' : 'text-gray-500'
          }`}>
            {status === 'available' ? 'Disponible' : 
             status === 'my_service' ? 'Servicio inicia de luego de confirmar' : 
             `Ocupado por ${device.userUsing.name}`}
          </p>
        </div>
      </div>

      {status === 'occupied' && device.userUsing?.name && (
        <div className="mb-3 text-sm text-gray-600">
          <p><strong>Tiempo faltante:</strong> 47 minutos</p>
        </div>
      )}

      {status === 'my_service' && (
        <div className="mb-3 text-sm text-green-700">
          <p><strong>Tiempo faltante:</strong> 49 minutos</p>
        </div>
      )}

      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>{quotes}</strong> cupos disponibles</p>
        <p><strong>1</strong> penalizaciones</p>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        <span className="underline cursor-pointer hover:text-gray-700">
          historial
        </span>
      </div>

      {renderButton()}
    </div>
  );
};

export default DeviceCard;