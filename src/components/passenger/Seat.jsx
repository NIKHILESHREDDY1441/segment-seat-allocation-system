import React from 'react';

export const Seat = ({
  seatNumber,
  state = 'available', // available, selected, occupied, segment-selected, recommended
  isSleeper = false,
  onClick,
  tooltip
}) => {
  let stateClass = 'seat-available';
  if (state === 'selected') stateClass = 'seat-selected';
  if (state === 'occupied') stateClass = 'seat-occupied';
  if (state === 'segment-selected') stateClass = 'seat-segment-selected';
  if (state === 'recommended') stateClass = 'seat-recommended';

  return (
    <button
      type="button"
      className={`seat-btn ${stateClass} ${isSleeper ? 'seat-sleeper' : ''}`}
      onClick={() => state !== 'occupied' && onClick && onClick(seatNumber)}
      disabled={state === 'occupied'}
      title={tooltip || `Seat ${seatNumber} (${state})`}
    >
      <span>{seatNumber}</span>
    </button>
  );
};
