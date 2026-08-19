import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { busService } from '../../services/busService';
import { BusCard } from '../../components/passenger/BusCard';
import { StepIndicator } from '../../components/common/StepIndicator';
import { EmptyState } from '../../components/common/EmptyState';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const AvailableBuses = () => {
  const { searchParams, selectBus } = useBooking();
  const navigate = useNavigate();

  const [busTypeFilter, setBusTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('cheapest'); // cheapest, earliest, seats

  const allBuses = busService.searchBuses(searchParams);

  // Filter logic
  let filteredBuses = allBuses.filter(bus => {
    if (busTypeFilter !== 'All' && !bus.busType.toLowerCase().includes(busTypeFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Sort logic
  filteredBuses.sort((a, b) => {
    if (sortBy === 'cheapest') return a.basePrice - b.basePrice;
    if (sortBy === 'earliest') return a.departureTime.localeCompare(b.departureTime);
    if (sortBy === 'seats') return (b.totalSeats || 40) - (a.totalSeats || 40);
    return 0;
  });

  const handleSelectBus = (bus) => {
    selectBus(bus);
    navigate('/passenger/seats');
  };

  return (
    <div className="main-content" style={{ paddingBottom: '3rem' }}>
      <StepIndicator currentStep={1} />

      <div className="container">
        {/* Route Title & Summary Header */}
        <div className="card" style={{ marginBottom: '1.75rem', background: 'linear-gradient(to right, var(--navy-900), var(--navy-800))', color: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', color: '#ffffff' }}>
                {searchParams.origin || 'Hyderabad'} → {searchParams.destination || 'Bangalore'}
              </h2>
              <p style={{ color: 'var(--slate-300)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Date: <strong>{searchParams.date || '2026-08-20'}</strong> • Passengers: <strong>{searchParams.passengerCount || 1}</strong>
              </p>
            </div>
            <div>
              <span className="badge badge-purple" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
                {filteredBuses.length} Buses Available
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Sort Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--navy-800)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Filter size={16} /> Bus Type:
            </span>
            {['All', 'Sleeper', 'Seater', 'AC'].map(type => (
              <button
                key={type}
                onClick={() => setBusTypeFilter(type)}
                className={`btn btn-sm ${busTypeFilter === type ? 'btn-primary' : 'btn-secondary'}`}
              >
                {type}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--navy-800)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ArrowUpDown size={16} /> Sort By:
            </span>
            <select
              className="input-field"
              style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="cheapest">Cheapest Fare</option>
              <option value="earliest">Earliest Departure</option>
              <option value="seats">Most Available Seats</option>
            </select>
          </div>
        </div>

        {/* Bus List */}
        {filteredBuses.length > 0 ? (
          filteredBuses.map(bus => (
            <BusCard
              key={bus.id}
              bus={bus}
              onSelect={handleSelectBus}
            />
          ))
        ) : (
          <EmptyState
            title="No Buses Found"
            message={`We couldn't find any buses matching ${searchParams.origin} → ${searchParams.destination} on ${searchParams.date}. Try searching another date or popular route.`}
            actionText="Change Search Criteria"
            onAction={() => navigate('/passenger/dashboard')}
          />
        )}
      </div>
    </div>
  );
};
