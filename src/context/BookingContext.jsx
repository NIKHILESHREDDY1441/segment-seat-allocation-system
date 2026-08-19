import React, { createContext, useContext, useState, useEffect } from 'react';
import { getActiveSession, updateActiveSession, clearActiveSession } from '../services/storageService';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState(() => getActiveSession());

  useEffect(() => {
    // Sync state changes with localStorage
    updateActiveSession(bookingData);
  }, [bookingData]);

  const updateSearch = (searchParams) => {
    setBookingData(prev => ({
      ...prev,
      searchParams: { ...prev.searchParams, ...searchParams }
    }));
  };

  const selectBus = (bus) => {
    setBookingData(prev => ({
      ...prev,
      selectedBus: bus,
      // Reset seat selection when bus changes
      selectedSeats: [],
      segmentAllocations: [],
      isSegmentMode: false
    }));
  };

  const updateSeatSelection = (seats, isSegmentMode = false, segmentAllocations = []) => {
    setBookingData(prev => ({
      ...prev,
      selectedSeats: seats,
      isSegmentMode,
      segmentAllocations
    }));
  };

  const updatePassengerDetails = (passengers) => {
    setBookingData(prev => ({
      ...prev,
      passengerDetails: passengers
    }));
  };

  const resetBooking = () => {
    clearActiveSession();
    setBookingData({});
  };

  return (
    <BookingContext.Provider value={{
      bookingData,
      searchParams: bookingData.searchParams || { origin: 'Hyderabad', destination: 'Bangalore', date: '2026-08-20', passengerCount: 1 },
      selectedBus: bookingData.selectedBus || null,
      selectedSeats: bookingData.selectedSeats || [],
      segmentAllocations: bookingData.segmentAllocations || [],
      isSegmentMode: bookingData.isSegmentMode || false,
      passengerDetails: bookingData.passengerDetails || [],
      updateSearch,
      selectBus,
      updateSeatSelection,
      updatePassengerDetails,
      resetBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
