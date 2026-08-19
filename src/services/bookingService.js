import { getStoredBookings, addStoredBooking } from './storageService';

export const bookingService = {
  getAllBookings: () => {
    return getStoredBookings();
  },

  getUserBookings: (email) => {
    const bookings = getStoredBookings();
    if (!email) return bookings;
    return bookings.filter(b => 
      b.passengers && b.passengers.some(p => p.email?.toLowerCase() === email.toLowerCase())
    );
  },

  getBookingById: (id) => {
    const bookings = getStoredBookings();
    return bookings.find(b => b.id === id) || null;
  },

  createBooking: (payload) => {
    const id = `SSA${Date.now().toString().slice(-6)}`;
    const newBooking = {
      id,
      bookingDate: new Date().toISOString(),
      status: 'Confirmed',
      ...payload
    };
    return addStoredBooking(newBooking);
  }
};
