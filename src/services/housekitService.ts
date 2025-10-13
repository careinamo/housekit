import { UserInfo, Device } from '../types/housekit';

const API_BASE = 'https://68ebf5faeff9ad3b1400f841.mockapi.io';

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

  async getDevices(userDocument: string): Promise<Device[]> {
    //this endpoint is hardcoded to return a list of devices for demo purposes
    const response = await fetch(`${API_BASE}/devices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch devices');
    }
    
    return response.json();
  }
};