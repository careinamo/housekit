import { UserInfo, Device } from '../types/housekit';

const API_BASE = 'https://68ebf5faeff9ad3b1400f841.mockapi.io';
const AWS_API_BASE = 'https://dq65aioiv7.execute-api.us-east-1.amazonaws.com';

interface DeviceResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      PK: string;
      createdAt: string;
      dateCut: number;
      document: string;
      name: string;
      penalties: {
        dryer_machine: number;
        washing_machine: number;
      };
      quotes: {
        dryer_machine: number;
        washing_machine: number;
      };
      SK: string;
    };
    devices: Array<{
      userUsing: any;
      available: boolean;
      createdAt: string;
      PK: string;
      name: string;
      clientId: string;
      serviceType: 'dryer_machine' | 'washing_machine';
      SK: string;
      quotasUser: number;
      coolKitDeviceId?: string;
    }>;
  };
}

export const housekitService = {
  async getUserInfo(userDocument: string): Promise<UserInfo[]> {
    //this endpoint is hardcoded to return a single user for demo purposes
    const response = await fetch(`${API_BASE}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }
    
    return response.json();
  },

  async getDevices(userDocument: string): Promise<{ user: UserInfo; devices: Device[] }> {
    const response = await fetch(`${AWS_API_BASE}/getDevicesByUser`, {
      method: 'POST',
      headers: {
        'x-api-key': 'AIzaSyAYIWRC7ATpF6mkbFEKrY8EH_Vk4oMGtrY',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        house: "house#7ce41ced-e8c1-4123-a12e-37fd3f430095",
        user: `user#${userDocument}`
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch devices');
    }
    
    const data: DeviceResponse = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch devices');
    }

    // Transformar la respuesta AWS al formato esperado por la aplicación
    const transformedUser: UserInfo = {
      createdAt: data.data.user.createdAt,
      name: data.data.user.name,
      avatar: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/83.jpg", // Avatar por defecto
      quotes: {
        washing_machine: data.data.user.quotes.washing_machine,
        dryer_slots: data.data.user.quotes.dryer_machine // Mapear dryer_machine a dryer_slots
      },
      dateCut: data.data.user.dateCut,
      penalties: {
        washing_machine: data.data.user.penalties.washing_machine,
        dryer_slots: data.data.user.penalties.dryer_machine // Mapear dryer_machine a dryer_slots
      },
      document: data.data.user.document,
      id: data.data.user.SK.replace('user#', ''),
      docuemnt: data.data.user.document // Mantener el typo por compatibilidad
    };

    const transformedDevices: Device[] = data.data.devices.map((device) => ({
      createdAt: device.createdAt,
      name: device.name,
      available: device.available,
      userUsing: device.userUsing || {},
      houseId: device.PK.replace('house#', ''),
      serviceType: device.serviceType === 'dryer_machine' ? 'dryer_slots' : device.serviceType as 'washing_machine' | 'dryer_slots',
      quotas: {},
      id: device.SK.replace('device#', ''),
      quotes: device.serviceType === 'dryer_machine' 
        ? { dryer_slots: device.quotasUser }
        : { washing_machine: device.quotasUser }
    }));

    return {
      user: transformedUser,
      devices: transformedDevices
    };
  }
};