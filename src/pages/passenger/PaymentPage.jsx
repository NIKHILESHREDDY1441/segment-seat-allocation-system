import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { bookingService } from '../../services/bookingService';
import { StepIndicator } from '../../components/common/StepIndicator';
import { PaymentMethod } from '../../components/passenger/PaymentMethod';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export const PaymentPage = () => {
  const { selectedBus, searchParams, selectedSeats, segmentAllocations, isSegmentMode, passengerDetails } = useBooking();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [processing, setProcessing] = useState(false);

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

  const pCount = passengerDetails.length || searchParams.passengerCount || 1;
  const baseFare = selectedBus.basePrice * pCount;
  const taxes = Math.round(baseFare * 0.05); // 5% GST
  const convenienceFee = 25;
  const grandTotal = baseFare + taxes + convenienceFee;

  const handlePay = () => {
    setProcessing(true);

    setTimeout(() => {
      // Create confirmed booking
      const newBooking = bookingService.createBooking({
        busId: selectedBus.id,
        busNumber: selectedBus.busNumber,
        operator: selectedBus.operator,
        busType: selectedBus.busType,
        route: `${selectedBus.origin} → ${selectedBus.destination}`,
        origin: selectedBus.origin,
        destination: selectedBus.destination,
        journeyDate: searchParams.date || '2026-08-20',
        passengers: passengerDetails,
        segmentAllocations: isSegmentMode ? segmentAllocations : (
          [{ segment: `${selectedBus.origin} → ${selectedBus.destination}`, seatNumber: selectedSeats.join(', ') }]
        ),
        totalFare: grandTotal,
        paymentMethod: paymentMethod
      });

      setProcessing(false);
      navigate('/passenger/confirmation', { state: { booking: newBooking } });
    }, 1500);
  };

  return (
    <div className="main-content" style={{ paddingBottom: '3rem' }}>
      <StepIndicator currentStep={5} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Left Column: Payment Form */}
          <div>
            <PaymentMethod
              activeMethod={paymentMethod}
              onSelectMethod={(method) => setPaymentMethod(method)}
            />

            <button
              onClick={handlePay}
              disabled={processing}
              className="btn btn-success btn-lg btn-full"
              style={{ padding: '1rem', fontSize: '1.1rem' }}
            >
              {processing ? 'Processing Payment Securely...' : `Pay ₹${grandTotal} & Confirm Booking`}
            </button>
          </div>

          {/* Right Column: Booking Summary Card */}
          <div>
            <div className="card" style={{ position: 'sticky', top: '90px' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', marginBottom: '1rem' }}>
                Booking Summary
              </h3>

              <div style={{ background: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--navy-900)' }}>
                  {selectedBus.operator}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--navy-600)' }}>
                  {selectedBus.busType} • {selectedBus.busNumber}
                </div>
                <div style={{ fontWeight: '600', color: 'var(--primary-600)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  {selectedBus.origin} → {selectedBus.destination}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                  Date: {searchParams.date || '2026-08-20'}
                </div>
              </div>

              {/* Segment Allocations Summary */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Segment Seat Allocations:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {isSegmentMode && segmentAllocations.length > 0 ? (
                    segmentAllocations.map((a, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.35rem 0.6rem', background: '#fff', borderRadius: '4px', border: '1px solid var(--slate-200)' }}>
                        <span>{a.segment}</span>
                        <span className="badge badge-purple">Seat {a.seatNumber}</span>
                      </div>
                    ))
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.35rem 0.6rem', background: '#fff', borderRadius: '4px', border: '1px solid var(--slate-200)' }}>
                      <span>Continuous Journey</span>
                      <span className="badge badge-primary">Seat {selectedSeats.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--slate-200)', margin: '1rem 0' }} />

              {/* Price Calculation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--navy-600)' }}>Base Fare ({pCount} Passenger)</span>
                  <span>₹{baseFare}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--navy-600)' }}>Taxes & GST (5%)</span>
                  <span>₹{taxes}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--navy-600)' }}>Convenience Fee</span>
                  <span>₹{convenienceFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.15rem', color: 'var(--navy-900)', borderTop: '1px solid var(--slate-200)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                  <span>Total Amount</span>
                  <span style={{ color: 'var(--primary-600)' }}>₹{grandTotal}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--slate-500)', justifyContent: 'center' }}>
                <Lock size={12} /> Instant Mock Payment Confirmation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
