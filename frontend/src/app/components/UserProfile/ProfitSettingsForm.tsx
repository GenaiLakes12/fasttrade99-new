"use client";
import React, { useState } from "react";

const ProfitSettingsForm = () => {
  const [profitLock, setProfitLock] = useState({ reach: 10000, lock: 9000 });
  const [profitTrail, setProfitTrail] = useState({ increase: 5, trailBy: 50 });

  const handleLockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfitLock({ ...profitLock, [name]: value });
  };

  const handleTrailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfitTrail({ ...profitTrail, [name]: value });
  };

  const handleOkClick = () => alert("Settings saved!");
  const handleDeleteClick = () => alert("Settings deleted!");
  const handleCloseClick = () => alert("Form closed!");

  return (
    <div style={styles.container}>
      {/* Profit Locking Section */}
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

      {/* Profit Trailing Section */}
      <div style={styles.card}>
        <h3 style={styles.heading}>Profit Trailing</h3>
        <div style={styles.inputGroup}>
          <div>
            <label style={styles.label}>Increase In Profit By</label>
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

      {/* Information Text */}
      <p style={styles.infoText}>
        VALUES SHOULD BE IN RUPEES ONLY
        <br />
        LOCKING AND TRAILING CAN BE USED INDEPENDENTLY
        <br />
        TGT/ SL ON PER LOT BASIS IF TICKED WILL BE APPLICABLE HERE
      </p>

      {/* Action Buttons */}
      <div style={styles.buttonGroup}>
        <button style={styles.okBtn} onClick={handleOkClick}>
          OK
        </button>
        <button style={styles.deleteBtn} onClick={handleDeleteClick}>
          DELETE
        </button>
        <button style={styles.closeBtn} onClick={handleCloseClick}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default ProfitSettingsForm;

// Inline Styles
const styles = {
  container: {
    width: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  card: {
    padding: "15px",
    marginBottom: "15px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  heading: {
    fontWeight: "bold" as const,
    color: "#000",
    marginBottom: "10px",
  },
  inputGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  label: {
    display: "block",
    color: "#1a73e8",
    fontSize: "14px",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  infoText: {
    color: "#ff6600",
    fontSize: "12px",
    margin: "10px 0",
    textAlign: "center" as const,
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  },
  okBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  closeBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
