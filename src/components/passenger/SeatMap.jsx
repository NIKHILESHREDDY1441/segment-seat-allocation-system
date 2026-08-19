import React, { useState } from 'react';
import { Seat } from './Seat';
import { Compass } from 'lucide-react';
import { getBusSeatNumbers, isSeatAvailableForSegment } from '../../services/segmentAllocationEngine';

export const SeatMap = ({
  bus,
  selectedSeats = [],
  segmentAllocations = [],
  recommendedSeats = [],
  activeSegmentKey = null,
  onSeatClick
}) => {
  const [sleeperTab, setSleeperTab] = useState('lower'); // 'lower' or 'upper'
  const isSleeper = bus?.layoutType === 'Sleeper';

  // Determine state of each seat
  const getSeatState = (seatNum) => {
    if (selectedSeats.includes(seatNum)) return 'selected';
    if (segmentAllocations.some(a => a.seatNumber === seatNum)) return 'segment-selected';
    if (recommendedSeats.includes(seatNum)) return 'recommended';

    // If activeSegmentKey is provided, check if occupied for that segment
    if (activeSegmentKey && bus.segmentSeatAvailability?.[activeSegmentKey]) {
      const isAvail = bus.segmentSeatAvailability[activeSegmentKey][seatNum] !== false;
      if (!isAvail) return 'occupied';
    } else if (bus.segmentSeatAvailability) {
      // General check: if occupied across all segments
      const allSegs = Object.keys(bus.segmentSeatAvailability);
      if (allSegs.length > 0) {
        const isOccupiedAny = allSegs.some(seg => bus.segmentSeatAvailability[seg][seatNum] === false);
        if (isOccupiedAny) return 'occupied';
      }
    }
    return 'available';
  };

  // Render Seater Grid (2+2 or 2+1)
  const renderSeaterGrid = () => {
    const is2Plus1 = bus.layoutType === '2+1';
    const totalSeats = bus.totalSeats || (is2Plus1 ? 30 : 40);
    const seatsPerRow = is2Plus1 ? 3 : 4;
    const rowsCount = Math.ceil(totalSeats / seatsPerRow);

    const rows = [];
    for (let r = 0; r < rowsCount; r++) {
      const rowSeats = [];
      for (let s = 1; s <= seatsPerRow; s++) {
        const seatNum = `${r * seatsPerRow + s}`;
        if (parseInt(seatNum, 10) <= totalSeats) {
          rowSeats.push(seatNum);
        }
      }
      rows.push({ rowIdx: r, seats: rowSeats });
    }

    return (
      <div className="bus-cabin">
        <div className="bus-steering-area">
          <div className="steering-wheel-badge">
            <Compass size={16} /> Driver Cabinet
          </div>
        </div>

        {rows.map(({ rowIdx, seats }) => {
          if (is2Plus1) {
            const leftPair = seats.slice(0, 2);
            const rightSingle = seats.slice(2, 3);
            return (
              <div key={rowIdx} className="seat-grid-row">
                <div className="seat-pair">
                  {leftPair.map(sn => (
                    <Seat
                      key={sn}
                      seatNumber={sn}
                      state={getSeatState(sn)}
                      onClick={onSeatClick}
                    />
                  ))}
                </div>
                <div className="aisle-gap"></div>
                <div className="seat-pair">
                  {rightSingle.map(sn => (
                    <Seat
                      key={sn}
                      seatNumber={sn}
                      state={getSeatState(sn)}
                      onClick={onSeatClick}
                    />
                  ))}
                </div>
              </div>
            );
          } else {
            // 2+2 layout
            const leftPair = seats.slice(0, 2);
            const rightPair = seats.slice(2, 4);
            return (
              <div key={rowIdx} className="seat-grid-row">
                <div className="seat-pair">
                  {leftPair.map(sn => (
                    <Seat
                      key={sn}
                      seatNumber={sn}
                      state={getSeatState(sn)}
                      onClick={onSeatClick}
                    />
                  ))}
                </div>
                <div className="aisle-gap"></div>
                <div className="seat-pair">
                  {rightPair.map(sn => (
                    <Seat
                      key={sn}
                      seatNumber={sn}
                      state={getSeatState(sn)}
                      onClick={onSeatClick}
                    />
                  ))}
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  };

  // Render Sleeper Berth Grid
  const renderSleeperGrid = () => {
    const prefix = sleeperTab === 'lower' ? 'L' : 'U';
    const berths = [];
    for (let i = 1; i <= 15; i++) berths.push(`${prefix}${i}`);

    const rows = [];
    for (let r = 0; r < 5; r++) {
      rows.push({
        rowIdx: r,
        leftPair: berths.slice(r * 3, r * 3 + 2),
        rightSingle: berths.slice(r * 3 + 2, r * 3 + 3)
      });
    }

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <button
            type="button"
            className={`btn btn-sm ${sleeperTab === 'lower' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSleeperTab('lower')}
          >
            Lower Deck
          </button>
          <button
            type="button"
            className={`btn btn-sm ${sleeperTab === 'upper' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSleeperTab('upper')}
          >
            Upper Deck
          </button>
        </div>

        <div className="bus-cabin">
          <div className="bus-steering-area">
            <div className="steering-wheel-badge">
              <Compass size={16} /> Driver Cabinet ({sleeperTab.toUpperCase()})
            </div>
          </div>

          {rows.map(({ rowIdx, leftPair, rightSingle }) => (
            <div key={rowIdx} className="seat-grid-row">
              <div className="seat-pair">
                {leftPair.map(sn => (
                  <Seat
                    key={sn}
                    seatNumber={sn}
                    state={getSeatState(sn)}
                    isSleeper={true}
                    onClick={onSeatClick}
                  />
                ))}
              </div>
              <div className="aisle-gap"></div>
              <div className="seat-pair">
                {rightSingle.map(sn => (
                  <Seat
                    key={sn}
                    seatNumber={sn}
                    state={getSeatState(sn)}
                    isSleeper={true}
                    onClick={onSeatClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bus-layout-container">
      <h4 style={{ marginBottom: '1.25rem', color: 'var(--navy-900)' }}>
        Bus Layout ({bus.busType})
      </h4>

      {isSleeper ? renderSleeperGrid() : renderSeaterGrid()}

      {/* Seat Legend */}
      <div className="seat-legend">
        <div className="legend-item">
          <div className="legend-dot" style={{ background: 'var(--seat-available-bg)', borderColor: 'var(--seat-available-border)' }}></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: 'var(--seat-selected-bg)', borderColor: 'var(--seat-selected-border)' }}></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: 'var(--seat-occupied-bg)', borderColor: 'var(--seat-occupied-border)' }}></div>
          <span>Occupied</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: 'var(--seat-segment-bg)', borderColor: 'var(--seat-segment-border)' }}></div>
          <span>Segment Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: 'var(--seat-recommended-bg)', borderColor: 'var(--seat-recommended-border)' }}></div>
          <span>Recommended</span>
        </div>
      </div>
    </div>
  );
};
