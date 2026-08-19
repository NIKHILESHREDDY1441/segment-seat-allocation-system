import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { StepIndicator } from '../../components/common/StepIndicator';
import { PassengerForm } from '../../components/passenger/PassengerForm';
import { ArrowRight, UserCheck } from 'lucide-react';

export const PassengerDetails = () => {
  const { selectedBus, searchParams, selectedSeats, segmentAllocations, updatePassengerDetails } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();

  const count = searchParams.passengerCount || 1;

  // Initialize passenger list state
  const [passengers, setPassengers] = useState(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push({
        name: i === 0 ? (user?.name || '') : '',
        age: i === 0 ? '28' : '',
        gender: 'Male',
        phone: user?.phone || '9876543210',
        email: user?.email || 'passenger@example.com',
        idType: 'Aadhaar',
        idNumber: ''
      });
    }
    return list;
  });

  const [errors, setErrors] = useState({});

  if (!selectedBus) {
    return (
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <h3>No Bus Selected</h3>
        <Link to="/passenger/buses" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Buses List
        </Link>
      </div>
    );
  }

  const handlePassengerChange = (index, updatedData) => {
    const updatedList = [...passengers];
    updatedList[index] = updatedData;
    setPassengers(updatedList);
  };

  const validate = () => {
    const errs = {};
    passengers.forEach((p, idx) => {
      if (!p.name?.trim()) errs[`name_${idx}`] = 'Name is required';
      if (!p.age || parseInt(p.age, 10) <= 0) errs[`age_${idx}`] = 'Valid age is required';
      if (!p.phone?.trim()) errs[`phone_${idx}`] = 'Phone number is required';
      if (!p.email?.trim()) errs[`email_${idx}`] = 'Email address is required';
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    updatePassengerDetails(passengers);
    navigate('/passenger/payment');
  };

  return (
    <div className="main-content" style={{ paddingBottom: '3rem' }}>
      <StepIndicator currentStep={4} />

      <div className="container">
        <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(to right, var(--navy-900), var(--navy-800))', color: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', color: '#ffffff' }}>Passenger Information</h2>
              <p style={{ color: 'var(--slate-300)', fontSize: '0.9rem' }}>
                Bus: <strong>{selectedBus.operator}</strong> • Route: <strong>{selectedBus.origin} → {selectedBus.destination}</strong>
              </p>
            </div>
            <div>
              <span className="badge badge-purple" style={{ fontSize: '0.85rem' }}>
                {count} Passenger{count > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {passengers.map((pData, idx) => (
            <PassengerForm
              key={idx}
              passengerIndex={idx}
              data={pData}
              onChange={handlePassengerChange}
              errors={{
                name: errors[`name_${idx}`],
                age: errors[`age_${idx}`],
                phone: errors[`phone_${idx}`],
                email: errors[`email_${idx}`]
              }}
            />
          ))}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary btn-lg">
              <UserCheck size={18} /> Proceed to Payment <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
