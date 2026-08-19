import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Passenger Pages
import { PassengerLogin } from './pages/passenger/PassengerLogin';
import { HomeDashboard } from './pages/passenger/HomeDashboard';
import { AvailableBuses } from './pages/passenger/AvailableBuses';
import { SeatSelection } from './pages/passenger/SeatSelection';
import { SegmentSeatAllocation } from './pages/passenger/SegmentSeatAllocation';
import { OptimalSeatAllocation } from './pages/passenger/OptimalSeatAllocation';
import { PassengerDetails } from './pages/passenger/PassengerDetails';
import { PaymentPage } from './pages/passenger/PaymentPage';
import { BookingConfirmation } from './pages/passenger/BookingConfirmation';
import { BookingHistory } from './pages/passenger/BookingHistory';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageBuses } from './pages/admin/ManageBuses';
import { AddEditBus } from './pages/admin/AddEditBus';
import { ConfigureSeatLayout } from './pages/admin/ConfigureSeatLayout';

const AdminRoute = ({ children }) => {
  const { isAdmin, isLoggedIn } = useAuth();
  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/passenger/dashboard" replace />} />

      {/* Passenger Flow */}
      <Route path="/passenger/login" element={<PassengerLogin />} />
      <Route path="/passenger/dashboard" element={<HomeDashboard />} />
      <Route path="/passenger/buses" element={<AvailableBuses />} />
      <Route path="/passenger/seats" element={<SeatSelection />} />
      <Route path="/passenger/segment-allocation" element={<SegmentSeatAllocation />} />
      <Route path="/passenger/optimal-allocation" element={<OptimalSeatAllocation />} />
      <Route path="/passenger/passenger-details" element={<PassengerDetails />} />
      <Route path="/passenger/payment" element={<PaymentPage />} />
      <Route path="/passenger/confirmation" element={<BookingConfirmation />} />
      <Route path="/passenger/bookings" element={<BookingHistory />} />

      {/* Admin Flow */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/buses" element={<AdminRoute><ManageBuses /></AdminRoute>} />
      <Route path="/admin/buses/add" element={<AdminRoute><AddEditBus /></AdminRoute>} />
      <Route path="/admin/buses/:id/edit" element={<AdminRoute><AddEditBus /></AdminRoute>} />
      <Route path="/admin/buses/:id/seats" element={<AdminRoute><ConfigureSeatLayout /></AdminRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/passenger/dashboard" replace />} />
    </Routes>
  );
};
