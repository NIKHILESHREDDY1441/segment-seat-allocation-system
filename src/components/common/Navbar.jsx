import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bus, User, LogOut, Shield, Calendar, Search, Home, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/passenger/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to={isAdmin ? "/admin/dashboard" : "/passenger/dashboard"} className="navbar-brand">
          <div className="navbar-brand-icon">
            <Bus size={22} />
          </div>
          <span>SegmentSeat<span style={{ color: 'var(--primary-500)' }}>Reserve</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="navbar-nav">
            {isLoggedIn ? (
              isAdmin ? (
                <>
                  <li>
                    <Link to="/admin/dashboard" className={`nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`}>
                      <Home size={18} /> Admin Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/buses" className={`nav-link ${isActive('/admin/buses') ? 'active' : ''}`}>
                      <Bus size={18} /> Manage Buses
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/passenger/dashboard" className={`nav-link ${isActive('/passenger/dashboard') ? 'active' : ''}`}>
                      <Home size={18} /> Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/passenger/buses" className={`nav-link ${isActive('/passenger/buses') ? 'active' : ''}`}>
                      <Search size={18} /> Search Buses
                    </Link>
                  </li>
                  <li>
                    <Link to="/passenger/bookings" className={`nav-link ${isActive('/passenger/bookings') ? 'active' : ''}`}>
                      <Calendar size={18} /> My Bookings
                    </Link>
                  </li>
                </>
              )
            ) : (
              <>
                <li>
                  <Link to="/passenger/login" className={`nav-link ${isActive('/passenger/login') ? 'active' : ''}`}>
                    Passenger Login
                  </Link>
                </li>
                <li>
                  <Link to="/admin/login" className={`nav-link ${isActive('/admin/login') ? 'active' : ''}`}>
                    <Shield size={16} /> Admin Portal
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {isLoggedIn && (
          <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="user-avatar" title={user?.name || user?.email}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div style={{ fontSize: '0.85rem' }} className="user-info-text">
              <div style={{ fontWeight: '700', color: '#fff' }}>{user?.name || 'User'}</div>
              <div style={{ color: 'var(--slate-400)', fontSize: '0.75rem' }}>{isAdmin ? 'Administrator' : 'Passenger'}</div>
            </div>
            <button onClick={handleLogout} className="btn btn-sm btn-secondary" title="Logout" style={{ padding: '0.4rem 0.6rem' }}>
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
