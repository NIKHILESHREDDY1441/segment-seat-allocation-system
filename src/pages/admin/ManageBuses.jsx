import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { busService } from '../../services/busService';
import { AdminTable } from '../../components/admin/AdminTable';
import { Modal } from '../../components/common/Modal';
import { Bus, Plus, Trash2 } from 'lucide-react';

export const ManageBuses = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState(() => busService.getAllBuses());
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteConfirm = () => {
    if (deleteId) {
      busService.deleteBus(deleteId);
      setBuses(busService.getAllBuses());
      setDeleteId(null);
    }
  };

  return (
    <div className="main-content" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ marginTop: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', color: 'var(--navy-900)' }}>Manage Bus Fleet</h1>
            <p style={{ color: 'var(--navy-600)', fontSize: '0.9rem' }}>
              Add, update, delete or configure dynamic seat layouts for your buses.
            </p>
          </div>
          <button onClick={() => navigate('/admin/buses/add')} className="btn btn-primary">
            <Plus size={18} /> Add New Bus
          </button>
        </div>

        {/* Bus Table */}
        <AdminTable
          buses={buses}
          onEdit={(bus) => navigate(`/admin/buses/${bus.id}/edit`)}
          onDelete={(id) => setDeleteId(id)}
          onConfigureSeats={(bus) => navigate(`/admin/buses/${bus.id}/seats`)}
        />

        {/* Delete Modal */}
        <Modal
          isOpen={!!deleteId}
          onClose={() => setDeleteId(null)}
          title="Confirm Bus Deletion"
          footer={(
            <>
              <button onClick={() => setDeleteId(null)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="btn btn-danger btn-sm">
                <Trash2 size={14} /> Delete Bus
              </button>
            </>
          )}
        >
          <p style={{ color: 'var(--navy-700)', fontSize: '0.95rem' }}>
            Are you sure you want to delete this bus from the system? This action cannot be undone.
          </p>
        </Modal>
      </div>
    </div>
  );
};
