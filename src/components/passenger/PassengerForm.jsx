import React from 'react';
import { User, Phone, Mail, FileText } from 'lucide-react';

export const PassengerForm = ({ passengerIndex, data, onChange, errors = {} }) => {
  const handleChange = (field, value) => {
    onChange(passengerIndex, { ...data, [field]: value });
  };

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.75rem' }}>
        <div className="user-avatar" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
          {passengerIndex + 1}
        </div>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)' }}>
          Passenger {passengerIndex + 1} Details
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Rahul Sharma"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <span style={{ color: 'var(--danger-500)', fontSize: '0.75rem' }}>{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Age *</label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g. 28"
            value={data.age || ''}
            onChange={(e) => handleChange('age', e.target.value)}
          />
          {errors.age && <span style={{ color: 'var(--danger-500)', fontSize: '0.75rem' }}>{errors.age}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Gender *</label>
          <select
            className="input-field"
            value={data.gender || 'Male'}
            onChange={(e) => handleChange('gender', e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Mobile Phone *</label>
          <input
            type="tel"
            className="input-field"
            placeholder="e.g. 9876543210"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          {errors.phone && <span style={{ color: 'var(--danger-500)', fontSize: '0.75rem' }}>{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <input
            type="email"
            className="input-field"
            placeholder="e.g. passenger@example.com"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {errors.email && <span style={{ color: 'var(--danger-500)', fontSize: '0.75rem' }}>{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Government ID Type</label>
          <select
            className="input-field"
            value={data.idType || 'Aadhaar'}
            onChange={(e) => handleChange('idType', e.target.value)}
          >
            <option value="Aadhaar">Aadhaar Card</option>
            <option value="PAN">PAN Card</option>
            <option value="Passport">Passport</option>
            <option value="Driving License">Driving License</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">ID Number</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. XXXX-XXXX-1234"
            value={data.idNumber || ''}
            onChange={(e) => handleChange('idNumber', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
