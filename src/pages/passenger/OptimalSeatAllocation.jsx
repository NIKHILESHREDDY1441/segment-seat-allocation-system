import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { StepIndicator } from '../../components/common/StepIndicator';
import { AllocationCard } from '../../components/passenger/AllocationCard';
import { computeOptimalSegmentAllocation } from '../../services/segmentAllocationEngine';
import { Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';

export const OptimalSeatAllocation = () => {
  const { selectedBus, updateSeatSelection } = useBooking();
  const navigate = useNavigate();

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

  // Compute optimal allocation ranking
  const result = computeOptimalSegmentAllocation(selectedBus);

  const handleSelectOption = (option) => {
    const assignedSeats = option.allocations.map(a => a.seatNumber);
    updateSeatSelection(assignedSeats, true, option.allocations);
    navigate('/passenger/passenger-details');
  };

  return (
    <div className="main-content" style={{ paddingBottom: '3rem' }}>
      <StepIndicator currentStep={3} />

      <div className="container">
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => navigate('/passenger/segment-allocation')} className="btn btn-sm btn-secondary">
            <ArrowLeft size={16} /> Back to Segment Timeline
          </button>
          <span className="badge badge-purple" style={{ fontSize: '0.85rem' }}>
            <Sparkles size={14} /> AI Optimization Engine Active
          </span>
        </div>

        {/* Page Title */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
            Optimal Seat Allocation Options
          </h1>
          <p style={{ color: 'var(--navy-600)', fontSize: '0.95rem' }}>
            Comparing available multi-segment seat combinations for <strong>{selectedBus.origin} → {selectedBus.destination}</strong> to provide the best travel experience.
          </p>
        </div>

        {/* Allocation Options Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          {/* Main Recommended Option */}
          {result && (
            <AllocationCard
              title="Recommended Option 1"
              allocation={result}
              isRecommended={true}
              onSelect={handleSelectOption}
            />
          )}

          {/* Alternatives */}
          {result?.alternatives && result.alternatives.map((alt, idx) => (
            <AllocationCard
              key={idx}
              title={`Alternative Option ${idx + 2}`}
              allocation={alt}
              isRecommended={false}
              onSelect={handleSelectOption}
            />
          ))}
        </div>

        {/* Detailed Explanation Box */}
        <div className="card" style={{ background: 'var(--navy-900)', color: '#ffffff', padding: '1.75rem' }}>
          <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck color="var(--primary-500)" size={22} /> Understanding the Optimization Algorithm
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-300)', lineHeight: '1.6', marginBottom: '1rem' }}>
            Our segment allocation algorithm uses continuous seat graph traversal across intermediate route stops ({selectedBus.stops?.join(' → ')}).
            Option 1 is selected as the <strong>Recommended Choice</strong> because it minimizes seat changes while ensuring 100% route completion.
          </p>
        </div>
      </div>
    </div>
  );
};
