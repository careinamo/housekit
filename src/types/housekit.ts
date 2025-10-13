export interface UserInfo {
  createdAt: string;
  name: string;
  avatar: string;
  quotes: {
    washing_machine: number;
    dryer_slots: number;
  };
  dateCut: number;
  penalties: {
    washing_machine: number;
    dryer_slots: number;
  };
  document: string;
  id: string;
  docuemnt: string;
}

export interface Device {
  createdAt: string;
  name: string;
  available: boolean;
  userUsing: {
    document?: string;
    name?: string;
  };
  houseId: string;
  serviceType: 'washing_machine' | 'dryer_slots';
  quotas: any;
  id: string;
  quotes: {
    washing_machine?: number;
    dryer_slots?: number;
  };
}

export type DeviceStatus = 'available' | 'occupied' | 'my_service';