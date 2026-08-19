import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { StepIndicator } from '../../components/common/StepIndicator';
import { SegmentTimeline } from '../../components/passenger/SegmentTimeline';
import { SeatMap } from '../../components/passenger/SeatMap';
import {
  computeOptimalSegmentAllocation,
  getRouteSegments,
  getBusSeatNumbers,
  isSeatAvailableForSegment,
  validateManualSegmentSelection
} from '../../services/segmentAllocationEngine';
import { Zap, CheckCircle2, ArrowRight, Sparkles, Sliders, AlertCircle } from 'lucide-react';

export const SegmentSeatAllocation = () => {
  const { selectedBus, updateSeatSelection } = useBooking();
  const navigate = useNavigate();

  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [manualMode, setManualMode] = useState(false);
  const [manualSelections, setManualSelections] = useState({});
  const [validationError, setValidationError] = useState('');

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

  const segments = getRouteSegments(selectedBus.stops);
  const activeSegment = segments[activeSegmentIndex] || segments[0];

  // Run the core allocation algorithm
  const optimalResult = computeOptimalSegmentAllocation(selectedBus);

  // Available seats per segment breakdown
  const seatList = getBusSeatNumbers(selectedBus);
  const segmentAvailabilityMap = {};
  segments.forEach(seg => {
    segmentAvailabilityMap[seg.key] = seatList.filter(st => isSeatAvailableForSegment(selectedBus, st, seg.key));
  });

  // Handle Accept System Recommendation
  const handleAcceptRecommendation = () => {
    if (!optimalResult || optimalResult.type === 'UNAVAILABLE') {
      alert('Unable to generate allocation recommendation.');
      return;
    }

    const assignedSeatList = optimalResult.allocations.map(a => a.seatNumber);
    updateSeatSelection(assignedSeatList, true, optimalResult.allocations);
    navigate('/passenger/passenger-details');
  };

  // Handle View Optimal Comparison Page
  const handleViewOptimalPage = () => {
    navigate('/passenger/optimal-allocation');
  };

  // Handle manual seat click for active segment
  const handleManualSeatClick = (seatNum) => {
    if (!activeSegment) return;
    setValidationError('');
    setManualSelections(prev => ({
      ...prev,
      [activeSegment.key]: seatNum
    }));
  };

  // Confirm manual selections
  const handleConfirmManualSelection = () => {
    const check = validateManualSegmentSelection(selectedBus, manualSelections);
    if (!check.isValid) {
      if (check.missingSegments.length > 0) {
        setValidationError(`Missing seat selection for: ${check.missingSegments.join(', ')}`);
      } else if (check.occupiedSelections.length > 0) {
        setValidationError(`Invalid selection: ${check.occupiedSelections.join(', ')}`);
      }
      return;
    }

    const allocations = segments.map(seg => ({
      segment: `${seg.from} → ${seg.to}`,
      segmentKey: seg.key,
      seatNumber: manualSelections[seg.key]
    }));
    const uniqueSeats = Array.from(new Set(allocations.map(a => a.seatNumber)));

    updateSeatSelection(uniqueSeats, true, allocations);
    navigate('/passenger/passenger-details');
  };

  return (
    <div className="main-content" style={{ paddingBottom: '3rem' }}>
      <StepIndicator currentStep={3} />

      <div className="container">
        {/* Page Title & Innovation Header */}
        <div className="card" style={{ marginBottom: '1.75rem', background: 'linear-gradient(135deg, var(--navy-900), var(--navy-800))', color: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Zap size={22} color="var(--primary-500)" />
                <h1 style={{ fontSize: '1.5rem', color: '#ffffff' }}>Segment Seat Allocation Engine</h1>
              </div>
              <p style={{ color: 'var(--slate-300)', fontSize: '0.9rem' }}>
                Intelligent seat-stitching for multi-stop route: <strong>{selectedBus.stops?.join(' → ')}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setManualMode(false)}
                className={`btn btn-sm ${!manualMode ? 'btn-primary' : 'btn-secondary'}`}
              >
                <Sparkles size={14} /> AI Recommendation
              </button>
              <button
                onClick={() => setManualMode(true)}
                className={`btn btn-sm ${manualMode ? 'btn-primary' : 'btn-secondary'}`}
              >
                <Sliders size={14} /> Choose Seats Manually
              </button>
            </div>
          </div>
        </div>

        {/* Visual Route Timeline Breakdown */}
        <SegmentTimeline
          stops={selectedBus.stops}
          activeSegmentIndex={activeSegmentIndex}
          onSegmentClick={(idx) => setActiveSegmentIndex(idx)}
          segmentSelections={manualSelections}
        />

        {/* Available Seats Per Segment Breakdown Cards */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '0.75rem', color: 'var(--navy-900)' }}>Available Seats per Route Segment</h4>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`, gap: '1rem' }}>
            {segments.map((seg, idx) => {
              const freeSeats = segmentAvailabilityMap[seg.key] || [];
              const isCurrent = activeSegmentIndex === idx;
              return (
                <div
                  key={seg.key}
                  onClick={() => setActiveSegmentIndex(idx)}
                  className="card"
                  style={{
                    border: `2px solid ${isCurrent ? 'var(--primary-600)' : 'var(--slate-200)'}`,
                    background: isCurrent ? 'var(--primary-50)' : '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-700)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Segment {idx + 1}
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
                    {seg.from} → {seg.to}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--success-600)', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {freeSeats.length} Seats Available
                  </div>
                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', maxHeight: '60px', overflowY: 'auto' }}>
                    {freeSeats.slice(0, 8).map(st => (
                      <span key={st} className="badge badge-slate" style={{ fontSize: '0.75rem' }}>
                        {st}
                      </span>
                    ))}
                    {freeSeats.length > 8 && <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>+{freeSeats.length - 8} more</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MODE 1: System Recommended Allocation View */}
        {!manualMode && (
          <div className="card" style={{ background: 'linear-gradient(to bottom, #fcfaff, #ffffff)', border: '2px solid var(--seat-recommended-border)', padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge badge-purple" style={{ marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                  <Sparkles size={12} /> Intelligent Optimal Result
                </span>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-900)' }}>
                  Recommended Segment Seat Allocation
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}>
                  Coverage: 100%
                </span>
                <span className="badge badge-orange" style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}>
                  Seat Changes: {optimalResult?.seatChanges}
                </span>
              </div>
            </div>

            {/* Segment Allocation Mapping Visualizer */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
              {optimalResult?.allocations.map((item, idx) => (
                <div key={idx} style={{ background: '#ffffff', border: '1.5px solid var(--slate-200)', borderRadius: 'var(--radius-md)', padding: '1rem', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Segment {idx + 1}
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
                    {item.segment}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--navy-600)' }}>Allocated Seat:</span>
                    <span className="badge badge-purple" style={{ fontSize: '0.95rem', padding: '0.35rem 0.75rem' }}>
                      Seat {item.seatNumber}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Allocation Advantages List */}
            <div style={{ background: 'var(--slate-50)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', marginBottom: '1.75rem' }}>
              <h5 style={{ color: 'var(--navy-900)', marginBottom: '0.65rem' }}>Why this is recommended?</h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.5rem' }}>
                {optimalResult?.explanations.map((exp, idx) => (
                  <div key={idx} style={{ fontSize: '0.875rem', color: 'var(--navy-800)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--success-600)" /> {exp}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={handleAcceptRecommendation} className="btn btn-primary btn-lg">
                <CheckCircle2 size={18} /> Accept Recommendation & Continue
              </button>
              <button onClick={handleViewOptimalPage} className="btn btn-outline btn-lg">
                Compare All Allocation Options
              </button>
            </div>
          </div>
        )}

        {/* MODE 2: Manual Segment Selection View */}
        {manualMode && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div>
              <div className="card" style={{ marginBottom: '1rem' }}>
                <h4 style={{ color: 'var(--navy-900)', marginBottom: '0.25rem' }}>
                  Selecting Seat for: <strong style={{ color: 'var(--primary-600)' }}>{activeSegment?.from} → {activeSegment?.to}</strong>
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                  Click on an available seat in the map below to assign it to this specific segment.
                </p>
              </div>

              {validationError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle size={18} /> {validationError}
                </div>
              )}

              <SeatMap
                bus={selectedBus}
                activeSegmentKey={activeSegment?.key}
                selectedSeats={manualSelections[activeSegment?.key] ? [manualSelections[activeSegment?.key]] : []}
                onSeatClick={handleManualSeatClick}
              />
            </div>

            <div>
              <div className="card" style={{ position: 'sticky', top: '90px' }}>
                <h4 style={{ color: 'var(--navy-900)', marginBottom: '1rem' }}>Manual Segment Summary</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {segments.map((seg, idx) => {
                    const chosen = manualSelections[seg.key];
                    return (
                      <div key={seg.key} style={{ padding: '0.6rem', background: 'var(--slate-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--slate-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{seg.from} → {seg.to}</span>
                        {chosen ? (
                          <span className="badge badge-orange">Seat {chosen}</span>
                        ) : (
                          <span className="badge badge-slate">Not Selected</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button onClick={handleConfirmManualSelection} className="btn btn-primary btn-full">
                  Confirm Manual Choices <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
