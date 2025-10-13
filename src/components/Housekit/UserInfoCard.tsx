import React from 'react';
import { UserInfo } from '../../types/housekit';

interface UserInfoCardProps {
  userInfo: UserInfo;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ userInfo }) => {
  return (
    <div className="bg-white rounded-lg border-2 border-dashed border-green-300 p-4 mb-6">
      <div className="text-center">
        <div className="inline-block px-4 py-2 bg-green-50 border border-green-300 border-dashed rounded-md mb-4">
          <h1 className="text-green-700 font-medium">Housekit</h1>
        </div>
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <img 
            src={userInfo.avatar} 
            alt={userInfo.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <h2 className="text-lg font-medium text-gray-900">
            Bienvenido {userInfo.name}
          </h2>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          <strong>{userInfo.quotes.washing_machine + userInfo.quotes.dryer_slots}</strong> cupos disponibles. 
          tus cupos se acumulan los <strong>{userInfo.dateCut}</strong> de cada mes
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-left">
            <p className="text-gray-600">
              <strong>Lavadoras:</strong> {userInfo.quotes.washing_machine} cupos
            </p>
            <p className="text-gray-600">
              <strong>Secadoras:</strong> {userInfo.quotes.dryer_slots} cupos
            </p>
          </div>
          <div className="text-left">
            <p className="text-gray-600">
              <strong>Penalizaciones L:</strong> {userInfo.penalties.washing_machine}
            </p>
            <p className="text-gray-600">
              <strong>Penalizaciones S:</strong> {userInfo.penalties.dryer_slots}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;