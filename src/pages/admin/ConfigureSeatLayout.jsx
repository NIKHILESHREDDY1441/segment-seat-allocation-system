import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { busService } from '../../services/busService';
import { SeatLayoutEditor } from '../../components/admin/SeatLayoutEditor';
import { ArrowLeft, Save, CheckCircle2 } from 'lucide-react';

export const ConfigureSeatLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bus, setBus] = useState(null);
  const [layoutType, setLayoutType] = useState('2+2');
  const [totalSeats, setTotalSeats] = useState(40);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const fetched = busService.getBusById(id);
    if (fetched) {
      setBus(fetched);
      setLayoutType(fetched.layoutType || '2+2');
      setTotalSeats(fetched.totalSeats || 40);
    }
  }, [id]);

  if (!bus) {
    return (
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <h3>Bus Not Found</h3>
        <button onClick={() => navigate('/admin/buses')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Fleet List
        </button>
      </div>
    );
  }

  const handleSave = () => {
    busService.updateBusSeatLayout(id, {
      layoutType,
      totalSeats: parseInt(totalSeats, 10) || 40
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="main-content" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ marginTop: '2rem' }}>
        <button onClick={() => navigate('/admin/buses')} className="btn btn-sm btn-secondary" style={{ marginBottom: '1.25rem' }}>
          <ArrowLeft size={16} /> Back to Fleet List
        </button>

        <div className="card" style={{ marginBottom: '2rem', background: 'linear-gradient(to right, var(--navy-900), var(--navy-800))', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', color: '#ffffff' }}>
              Dynamic Seat Layout Configurator
            </h1>
            <p style={{ color: 'var(--slate-300)', fontSize: '0.9rem' }}>
              Bus: <strong>{bus.busNumber} ({bus.operator})</strong> • Route: <strong>{bus.origin} → {bus.destination}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {savedSuccess && (
              <span className="badge badge-success" style={{ fontSize: '0.9rem', padding: '0.4rem 0.85rem' }}>
                <CheckCircle2 size={16} /> Layout Saved & Synced!
              </span>
            )}
            <button onClick={handleSave} className="btn btn-primary btn-lg">
              <Save size={18} /> Save Layout Configuration
            </button>
          </div>
        </div>

        {/* Dynamic Seat Configurator & Live Preview */}
        <SeatLayoutEditor
          bus={bus}
          layoutType={layoutType}
          totalSeats={totalSeats}
          onChangeLayout={(type) => setLayoutType(type)}
          onChangeTotalSeats={(seats) => setTotalSeats(seats)}
        />
      </div>
    </div>
  );
};
