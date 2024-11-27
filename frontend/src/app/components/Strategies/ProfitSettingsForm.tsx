
'use client';
import React from 'react';
import { styles } from './profitSettingsStyles';

interface ProfitSettingsFormProps {
  onSave: (values: { reach: number; lock: number; increase: number; trailBy: number }) => void;
  onClose: () => void;
  initialValues?: {
    reach: number;
    lock: number;
    increase: number;
    trailBy: number;
  };
}

const ProfitSettingsForm: React.FC<ProfitSettingsFormProps> = ({ onSave, onClose, initialValues }) => {
  const [profitLock, setProfitLock] = React.useState({ 
    reach: initialValues?.reach || 10000, 
    lock: initialValues?.lock || 9000 
  });

  const [profitTrail, setProfitTrail] = React.useState({ 
    increase: initialValues?.increase || 5, 
    trailBy: initialValues?.trailBy || 50 
  });

  const handleLockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfitLock({ ...profitLock, [name]: Number(value) });
  };

  const handleTrailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfitTrail({ ...profitTrail, [name]: Number(value) });
  };

  const handleOkClick = () => {
    onSave({ ...profitLock, ...profitTrail });
    onClose();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.heading}>Profit Locking</h3>
        <div style={styles.inputGroup}>
          <div>
            <label style={styles.label}>If Profit Reaches</label>
            <input
              type="number"
              name="reach"
              value={profitLock.reach}
              onChange={handleLockChange}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Lock Minimum Profit At</label>
            <input
              type="number"
              name="lock"
              value={profitLock.lock}
              onChange={handleLockChange}
              style={styles.input}
            />
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.heading}>Profit Trailing</h3>
        <div style={styles.inputGroup}>
          <div>
            <label style={styles.label}>Then Every Increase In Profit By</label>
            <input
              type="number"
              name="increase"
              value={profitTrail.increase}
              onChange={handleTrailChange}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Trail Profit By</label>
            <input
              type="number"
              name="trailBy"
              value={profitTrail.trailBy}
              onChange={handleTrailChange}
              style={styles.input}
            />
          </div>
        </div>
      </div>

      <p style={styles.infoText}>
        VALUES SHOULD BE IN RUPEES ONLY
        <br />
        LOCKING AND TRAILING CAN BE USED INDEPENDENTLY
        <br />
        TGT/ SL ON PER LOT BASIS IF TICKED WILL BE APPLICABLE HERE
      </p>

      <div style={styles.buttonGroup}>
        <button style={styles.okBtn} onClick={handleOkClick}>
          OK
        </button>
        <button style={styles.closeBtn} onClick={onClose}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default ProfitSettingsForm;
