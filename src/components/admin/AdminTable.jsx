import React from 'react';
import { Edit3, Trash2, Settings, Eye } from 'lucide-react';

export const AdminTable = ({ buses = [], onEdit, onDelete, onConfigureSeats }) => {
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Bus Number</th>
            <th>Operator</th>
            <th>Bus Type</th>
            <th>Route</th>
            <th>Schedule</th>
            <th>Total Seats</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td>
                <strong style={{ color: 'var(--navy-900)' }}>{bus.busNumber}</strong>
              </td>
              <td>{bus.operator}</td>
              <td>
                <span className="badge badge-slate">{bus.busType}</span>
              </td>
              <td>
                {bus.origin} → {bus.destination}
              </td>
              <td>
                {bus.departureTime} - {bus.arrivalTime}
              </td>
              <td>
                <span className="badge badge-primary">{bus.totalSeats} Seats</span>
              </td>
              <td>
                <span className="badge badge-success">Active</span>
              </td>
              <td>
                <div style={{ display: 'flex', items: 'center', gap: '0.4rem' }}>
                  <button
                    onClick={() => onConfigureSeats(bus)}
                    className="btn btn-sm btn-outline"
                    title="Configure Seat Layout"
                    style={{ padding: '0.3rem 0.5rem' }}
                  >
                    <Settings size={14} /> Seats
                  </button>
                  <button
                    onClick={() => onEdit(bus)}
                    className="btn btn-sm btn-secondary"
                    title="Edit Bus"
                    style={{ padding: '0.3rem 0.5rem' }}
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(bus.id)}
                    className="btn btn-sm btn-danger"
                    title="Delete Bus"
                    style={{ padding: '0.3rem 0.5rem' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
