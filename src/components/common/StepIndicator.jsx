import React from 'react';
import { Check } from 'lucide-react';

export const StepIndicator = ({ currentStep = 1 }) => {
  const steps = [
    { number: 1, label: 'Select Bus' },
    { number: 2, label: 'Seat Selection' },
    { number: 3, label: 'Segment Allocation' },
    { number: 4, label: 'Passenger Details' },
    { number: 5, label: 'Payment' }
  ];

  return (
    <div className="container" style={{ padding: '0 1rem' }}>
      <div className="step-indicator">
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;
          return (
            <div
              key={step.number}
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="step-number">
                {isCompleted ? <Check size={18} /> : step.number}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
