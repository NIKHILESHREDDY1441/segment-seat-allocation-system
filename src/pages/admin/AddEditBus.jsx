import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { busService } from '../../services/busService';
import { RouteEditor } from '../../components/admin/RouteEditor';
import { ArrowLeft, Save, Bus } from 'lucide-react';

export const AddEditBus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    busNumber: 'AP 29 Z 9999',
    operator: 'Express Lines',
    busType: 'AC Seater (2+2)',
    layoutType: '2+2',
    departureTime: '08:00 PM',
    arrivalTime: '06:00 AM',
    duration: '10h 00m',
    basePrice: 800,
    totalSeats: 40,
    stops: ['Hyderabad', 'Kurnool', 'Anantapur', 'Bangalore']
  });

  useEffect(() => {
    if (isEdit) {
      const existing = busService.getBusById(id);
      if (existing) {
        setFormData(existing);
      }
    }
  }, [id, isEdit]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.stops || formData.stops.length < 2) {
      alert('Please specify at least 2 stops for the route.');
      return;
    }

    const payload = {
      ...formData,
      origin: formData.stops[0],
      destination: formData.stops[formData.stops.length - 1],
      totalSeats: parseInt(formData.totalSeats, 10) || 40,
      basePrice: parseInt(formData.basePrice, 10) || 800
    };

    if (isEdit) {
      busService.updateBus(id, payload);
    } else {
      busService.addBus(payload);
    }
    navigate('/admin/buses');
  };

  return (
    <div className="main-content" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ marginTop: '2rem', maxWidth: '800px' }}>
        <button onClick={() => navigate('/admin/buses')} className="btn btn-sm btn-secondary" style={{ marginBottom: '1.25rem' }}>
          <ArrowLeft size={16} /> Back to Fleet List
        </button>

        <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(to right, var(--navy-900), var(--navy-800))', color: '#ffffff' }}>
          <h1 style={{ fontSize: '1.5rem', color: '#ffffff' }}>
            {isEdit ? 'Edit Bus Configuration' : 'Add New Bus to Fleet'}
          </h1>
          <p style={{ color: 'var(--slate-300)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Configure operator information, route stops, and schedule timings.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-900)', marginBottom: '1.25rem' }}>
              Bus Details & Info
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Bus Number *</label>
                <input
                  type="text"
                  className="input-field"
                  required
                  value={formData.busNumber}
                  onChange={(e) => handleChange('busNumber', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Operator Name *</label>
                <input
                  type="text"
                  className="input-field"
                  required
                  value={formData.operator}
                  onChange={(e) => handleChange('operator', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bus Type</label>
                <select
                  className="input-field"
                  value={formData.busType}
                  onChange={(e) => {
                    const val = e.target.value;
                    let layout = '2+2';
                    let seats = 40;
                    if (val.includes('2+1')) { layout = '2+1'; seats = 30; }
                    if (val.includes('Sleeper')) { layout = 'Sleeper'; seats = 30; }
                    setFormData(prev => ({ ...prev, busType: val, layoutType: layout, totalSeats: seats }));
                  }}
                >
                  <option value="AC Seater (2+2)">AC Seater (2+2)</option>
                  <option value="AC Sleeper (2+1)">AC Sleeper (2+1)</option>
                  <option value="Luxury Sleeper (2+1)">Luxury Sleeper (2+1)</option>
                  <option value="Non-AC Seater (2+2)">Non-AC Seater (2+2)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Base Ticket Price (₹) *</label>
                <input
                  type="number"
                  className="input-field"
                  required
                  value={formData.basePrice}
                  onChange={(e) => handleChange('basePrice', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Departure Time *</label>
                <input
                  type="text"
                  className="input-field"
                  required
                  placeholder="e.g. 08:00 PM"
                  value={formData.departureTime}
                  onChange={(e) => handleChange('departureTime', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Arrival Time *</label>
                <input
                  type="text"
                  className="input-field"
                  required
                  placeholder="e.g. 06:30 AM"
                  value={formData.arrivalTime}
                  onChange={(e) => handleChange('arrivalTime', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Route Stops Configuration */}
          <RouteEditor
            stops={formData.stops}
            onChange={(updatedStops) => handleChange('stops', updatedStops)}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" onClick={() => navigate('/admin/buses')} className="btn btn-secondary btn-lg">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-lg">
              <Save size={18} /> {isEdit ? 'Save Changes' : 'Create Bus'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
