import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { SeatMap } from '../../components/passenger/SeatMap';
import { StepIndicator } from '../../components/common/StepIndicator';
import { computeOptimalSegmentAllocation } from '../../services/segmentAllocationEngine';
import { Zap, AlertTriangle, ArrowRight, Check } from 'lucide-react';

export const SeatSelection = () => {
  const { selectedBus, selectedSeats, updateSeatSelection, searchParams } = useBooking();
  const navigate = useNavigate();

  const [currentSelected, setCurrentSelected] = useState(selectedSeats || []);

  // Run segment allocation analysis memoized to avoid re-computations on render
  const allocationAnalysis = useMemo(() => {
    return selectedBus ? computeOptimalSegmentAllocation(selectedBus) : null;
  }, [selectedBus]);

  const isContinuousAvailable = allocationAnalysis?.type === 'CONTINUOUS';

  const handleSeatClick = (seatNum) => {
    // Single seat selection mode
    if (currentSelected.includes(seatNum)) {
      setCurrentSelected(prev => prev.filter(s => s !== seatNum));
    } else {
      // Limit selection count to passengerCount
      const limit = searchParams.passengerCount || 1;
      if (currentSelected.length < limit) {
        setCurrentSelected(prev => [...prev, seatNum]);
      } else {
        // Replace last choice if count limit reached
        setCurrentSelected([seatNum]);
      }
    }
  };

  const handleProceedDirect = () => {
    if (currentSelected.length === 0) {
      alert('Please select at least 1 seat to proceed.');
      return;
    }
    updateSeatSelection(currentSelected, false, []);
    navigate('/passenger/passenger-details');
  };

  const handleOpenSegmentAllocation = () => {
    navigate('/passenger/segment-allocation');
  };

  const totalFare = (currentSelected.length || 1) * selectedBus.basePrice;

  return (
    <div className="main-content" style={{ paddingBottom: '3rem' }}>
      <StepIndicator currentStep={2} />

      <div className="container">
        {/* Bus Summary Banner */}
        <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--navy-900)' }}>{selectedBus.operator}</h2>
            <p style={{ color: 'var(--navy-600)', fontSize: '0.875rem' }}>
              {selectedBus.origin} → {selectedBus.destination} • {selectedBus.busType}
            </p>
          </div>
          <div>
            <span className="badge badge-primary" style={{ fontSize: '0.85rem' }}>
              Base Fare: ₹{selectedBus.basePrice} / seat
            </span>
          </div>
        </div>

        {/* Continuous Seat Unavailable Alert Banner */}
        {!isContinuousAvailable && (
          <div style={{
            background: '#fff7ed',
            border: '2px solid var(--seat-segment-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.5rem',
            marginBottom: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#ffedd5',
                color: 'var(--seat-segment-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Zap size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--seat-segment-text)', fontSize: '1.05rem', marginBottom: '0.2rem' }}>
                  No continuous single seat available for the full journey!
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--navy-700)' }}>
                  Don't worry! Our intelligent system can stitch intermediate seats across <strong>{selectedBus.stops?.join(' → ')}</strong> so you can complete your entire trip.
                </p>
              </div>
            </div>

            <button onClick={handleOpenSegmentAllocation} className="btn btn-primary btn-lg" style={{ background: 'var(--seat-segment-border)', borderColor: 'var(--seat-segment-border)' }}>
              <Zap size={18} /> Use Segment Seat Allocation
            </button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Interactive Bus Seat Map */}
          <div>
            <SeatMap
              bus={selectedBus}
              selectedSeats={currentSelected}
              onSeatClick={handleSeatClick}
            />
          </div>

          {/* Booking Summary Panel */}
          <div>
            <div className="card" style={{ sticky: true, top: '90px' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', marginBottom: '1rem' }}>
                Seat Selection Summary
              </h3>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginBottom: '0.35rem' }}>
                  Selected Seat(s):
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {currentSelected.length > 0 ? (
                    currentSelected.map(s => (
                      <span key={s} className="badge badge-primary" style={{ fontSize: '0.9rem', padding: '0.35rem 0.65rem' }}>
                        Seat {s}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.85rem', color: 'var(--navy-600)', italic: 'true' }}>
                      No seat selected yet
                    </span>
                  )}
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--slate-200)', margin: '1rem 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--navy-800)' }}>Total Fare:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary-600)' }}>
                  ₹{totalFare}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {isContinuousAvailable && (
                  <button
                    onClick={handleProceedDirect}
                    className="btn btn-primary btn-full"
                    disabled={currentSelected.length === 0}
                  >
                    Proceed with Selected Seat <ArrowRight size={16} />
                  </button>
                )}

                <button
                  onClick={handleOpenSegmentAllocation}
                  className="btn btn-outline btn-full"
                  style={{ borderColor: 'var(--seat-recommended-border)', color: 'var(--seat-recommended-text)' }}
                >
                  <Zap size={16} /> Explore Segment Seat Options
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
