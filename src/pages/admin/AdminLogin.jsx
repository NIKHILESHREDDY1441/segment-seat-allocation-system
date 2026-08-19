import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Lock, User, ArrowRight } from 'lucide-react';

export const AdminLogin = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await loginAdmin(username, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message);
    }
  };

  const fillDemoCreds = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '2.25rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div className="navbar-brand-icon" style={{ margin: '0 auto 1rem', width: '48px', height: '48px', background: 'linear-gradient(135deg, var(--navy-800), var(--navy-900))' }}>
            <Shield size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--navy-900)' }}>Operator Admin Portal</h2>
          <p style={{ color: 'var(--navy-600)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Bus Fleet Management & Dynamic Seat Configuration
          </p>
        </div>

        {/* Demo Box */}
        <div style={{ background: 'var(--slate-100)', border: '1px dashed var(--slate-400)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--navy-800)', textTransform: 'uppercase' }}>Demo Admin Credentials</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--navy-700)', fontFamily: 'monospace' }}>admin / admin123</div>
          </div>
          <button type="button" onClick={fillDemoCreds} className="btn btn-sm btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
            Fill Demo
          </button>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username or Email</label>
            <input
              type="text"
              className="input-field"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Admin Password</label>
            <input
              type="password"
              className="input-field"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ background: 'var(--navy-900)' }}>
            {loading ? 'Authenticating...' : 'Access Admin Dashboard'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--slate-200)', textAlign: 'center' }}>
          <Link to="/passenger/login" style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
            ← Switch to Passenger Login
          </Link>
        </div>
      </div>
    </div>
  );
};
