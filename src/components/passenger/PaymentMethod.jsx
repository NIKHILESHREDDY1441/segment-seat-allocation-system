import React, { useState } from 'react';
import { CreditCard, Smartphone, Building, ShieldCheck } from 'lucide-react';

export const PaymentMethod = ({ onSelectMethod, activeMethod }) => {
  const [upiId, setUpiId] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const methods = [
    { id: 'UPI', label: 'UPI (GPay / PhonePe / Paytm)', icon: Smartphone },
    { id: 'Credit Card', label: 'Credit Card', icon: CreditCard },
    { id: 'Debit Card', label: 'Debit Card', icon: CreditCard },
    { id: 'Net Banking', label: 'Net Banking', icon: Building }
  ];

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-900)', marginBottom: '1.25rem' }}>
        Select Payment Method
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {methods.map((item) => {
          const Icon = item.icon;
          const isSelected = activeMethod === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onSelectMethod(item.id)}
              style={{
                border: `2px solid ${isSelected ? 'var(--primary-600)' : 'var(--slate-200)'}`,
                background: isSelected ? 'var(--primary-50)' : '#ffffff',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icon size={20} color={isSelected ? 'var(--primary-600)' : 'var(--navy-600)'} />
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: isSelected ? 'var(--primary-700)' : 'var(--navy-800)' }}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Method Input Details */}
      <div style={{ background: 'var(--slate-50)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
        {activeMethod === 'UPI' && (
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Virtual Payment Address (VPA / UPI ID)</label>
            <input
              type="text"
              className="input-field"
              placeholder="username@upi or 9876543210@paytm"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        {(activeMethod === 'Credit Card' || activeMethod === 'Debit Card') && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Card Number</label>
              <input
                type="text"
                className="input-field"
                placeholder="4532 •••• •••• 8901"
                value={cardNo}
                onChange={(e) => setCardNo(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Expiry (MM/YY)</label>
              <input
                type="text"
                className="input-field"
                placeholder="08/28"
                value={cardExp}
                onChange={(e) => setCardExp(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">CVV</label>
              <input
                type="password"
                maxLength={3}
                className="input-field"
                placeholder="•••"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
              />
            </div>
          </div>
        )}

        {activeMethod === 'Net Banking' && (
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Select Bank</label>
            <select className="input-field">
              <option>HDFC Bank</option>
              <option>State Bank of India (SBI)</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
              <option>Kotak Mahindra Bank</option>
            </select>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--slate-500)' }}>
          <ShieldCheck size={16} color="var(--success-600)" />
          256-Bit SSL Encrypted Mock Gateway. Safe & Secure.
        </div>
      </div>
    </div>
  );
};
