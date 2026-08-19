import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bus, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const PassengerLogin = () => {
  const [email, setEmail] = useState('passenger@example.com');
  const [password, setPassword] = useState('passenger123');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginPassenger } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await loginPassenger(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/passenger/dashboard');
    } else {
      setError(res.message);
    }
  };

  const fillDemoCreds = () => {
    setEmail('passenger@example.com');
    setPassword('passenger123');
    setError('');
  };

  return (
    <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '2.25rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div className="navbar-brand-icon" style={{ margin: '0 auto 1rem', width: '48px', height: '48px' }}>
            <Bus size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--navy-900)' }}>Passenger Login</h2>
          <p style={{ color: 'var(--navy-600)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Access Segment Seat Allocation & Reservation
          </p>
        </div>

        {/* Quick Demo Credentials Box */}
        <div style={{ background: 'var(--primary-50)', border: '1px dashed var(--primary-500)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary-800)', textTransform: 'uppercase' }}>Demo Passenger Account</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--navy-700)', fontFamily: 'monospace' }}>passenger@example.com / passenger123</div>
          </div>
          <button type="button" onClick={fillDemoCreds} className="btn btn-sm btn-outline" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
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
            <label className="form-label">Email or Mobile Number</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="input-field"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                className="input-field"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#/passenger/login" style={{ color: 'var(--primary-600)', fontWeight: '600' }}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In to Reserve Seats'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--navy-600)' }}>
          Don't have an account?{' '}
          <a href="#/passenger/login" style={{ color: 'var(--primary-600)', fontWeight: '700' }}>
            Create Account
          </a>
        </div>

        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--slate-200)', textAlign: 'center' }}>
          <Link to="/admin/login" style={{ fontSize: '0.8rem', color: 'var(--slate-500)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <ShieldCheck size={14} /> Are you a bus operator? Switch to Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};
