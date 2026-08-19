import { MOCK_BUSES, MOCK_ROUTES } from '../data/mockData';

const KEYS = {
  BUSES: 'ssa_buses',
  ROUTES: 'ssa_routes',
  BOOKINGS: 'ssa_bookings',
  CURRENT_USER: 'ssa_current_user',
  ACTIVE_SESSION: 'ssa_active_booking_session'
};

// Initialize LocalStorage with mock defaults if empty
export const initStorage = () => {
  if (!localStorage.getItem(KEYS.BUSES)) {
    localStorage.setItem(KEYS.BUSES, JSON.stringify(MOCK_BUSES));
  }
  if (!localStorage.getItem(KEYS.ROUTES)) {
    localStorage.setItem(KEYS.ROUTES, JSON.stringify(MOCK_ROUTES));
  }
  if (!localStorage.getItem(KEYS.BOOKINGS)) {
    // Initial sample booking for history view
    const initialBooking = {
      id: 'SSA20260001',
      busId: 'bus-101',
      busNumber: 'AP 29 Z 1234',
      operator: 'ABC Travels (Express)',
      busType: 'AC Sleeper (2+1)',
      route: 'Hyderabad → Bangalore',
      origin: 'Hyderabad',
      destination: 'Bangalore',
      journeyDate: '2026-08-20',
      passengers: [
        { name: 'Rahul Sharma', age: 28, gender: 'Male', phone: '9876543210', email: 'passenger@example.com', idType: 'Aadhaar', idNumber: '1234-5678-9012' }
      ],
      segmentAllocations: [
        { segment: 'Hyderabad → Kurnool', seatNumber: '10' },
        { segment: 'Kurnool → Anantapur', seatNumber: '10' },
        { segment: 'Anantapur → Bangalore', seatNumber: '15' }
      ],
      totalFare: 850,
      paymentMethod: 'UPI (GPay)',
      bookingDate: '2026-08-16T14:30:00Z',
      status: 'Confirmed'
    };
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify([initialBooking]));
  }
};

// Storage helper functions
export const getStoredBuses = () => {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(KEYS.BUSES)) || [];
  } catch (e) {
    return MOCK_BUSES;
  }
};

export const saveStoredBuses = (buses) => {
  localStorage.setItem(KEYS.BUSES, JSON.stringify(buses));
};

export const getStoredRoutes = () => {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(KEYS.ROUTES)) || [];
  } catch (e) {
    return MOCK_ROUTES;
  }
};

export const saveStoredRoutes = (routes) => {
  localStorage.setItem(KEYS.ROUTES, JSON.stringify(routes));
};

export const getStoredBookings = () => {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(KEYS.BOOKINGS)) || [];
  } catch (e) {
    return [];
  }
};

export const addStoredBooking = (booking) => {
  const bookings = getStoredBookings();
  const updated = [booking, ...bookings];
  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updated));
  return booking;
};

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.CURRENT_USER));
  } catch (e) {
    return null;
  }
};

export const saveStoredUser = (user) => {
  if (user) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
};

export const getActiveSession = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.ACTIVE_SESSION)) || {};
  } catch (e) {
    return {};
  }
};

export const updateActiveSession = (data) => {
  const current = getActiveSession();
  const updated = { ...current, ...data };
  localStorage.setItem(KEYS.ACTIVE_SESSION, JSON.stringify(updated));
  return updated;
};

export const clearActiveSession = () => {
  localStorage.removeItem(KEYS.ACTIVE_SESSION);
};
