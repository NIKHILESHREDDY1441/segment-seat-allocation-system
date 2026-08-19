import { MOCK_PASSENGER_USER, MOCK_ADMIN_USER } from '../data/mockData';
import { getStoredUser, saveStoredUser } from './storageService';

export const authService = {
  getCurrentUser: () => {
    return getStoredUser();
  },

  loginPassenger: async (email, password) => {
    // Frontend mock validation
    if (email === 'passenger@example.com' && password === 'passenger123') {
      saveStoredUser(MOCK_PASSENGER_USER);
      return { success: true, user: MOCK_PASSENGER_USER };
    }
    // Allow any demo passenger login for flexibility
    if (email && password && !email.includes('admin')) {
      const customUser = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        phone: '+91 98765 43210',
        role: 'passenger'
      };
      saveStoredUser(customUser);
      return { success: true, user: customUser };
    }
    return { success: false, message: 'Invalid passenger credentials. Use passenger@example.com / passenger123' };
  },

  loginAdmin: async (username, password) => {
    if ((username === 'admin' || username === 'admin@example.com') && password === 'admin123') {
      saveStoredUser(MOCK_ADMIN_USER);
      return { success: true, user: MOCK_ADMIN_USER };
    }
    return { success: false, message: 'Invalid admin credentials. Use admin / admin123' };
  },

  logout: () => {
    saveStoredUser(null);
  }
};
