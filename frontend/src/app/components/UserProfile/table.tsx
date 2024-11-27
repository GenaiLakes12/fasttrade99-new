'use client';
// components/UserTable.js
import React, { useState } from "react";
// import axios from "axios";
import UserFormModal from "./UserFormModal";
import 'bootstrap-icons/font/bootstrap-icons.css';
import SettingsPanel from './settingspanel';


const UserTable = () => {
  const [users, setUsers] = useState([]); // Store user data
  const [showModal, setShowModal] = useState(false); // Toggle form modal
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);

  const handleAddUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
    console.log("User added:", formData);

  };

  // const handleConfirmLogin = async () => {
  //   try {
  //     // Send the users data directly to FastAPI backend
  //     const response = await axios.post("http://127.0.0.1:8001/api/broker/validate_account", { users });
  //     alert(response.data.message);
  //   } catch (error) {
  //     console.error("Error confirming login:", error);
  //     alert("Failed to confirm login.");
  //   }
  // };

  const headerStyle = {
    padding: '10px 20px',
    textAlign: 'left',
    fontWeight: 'bold',
    border: '1px solid #ddd',
    backgroundColor: '#f2f2f2',
  };
  
  const styles = {
    tableRow: {
      border: '1px solid #ddd',
    },
    tableCell: {
      padding: '10px 20px',
      textAlign: 'left',
      border: '1px solid #ddd',
    },
    imageCell: {
      textAlign: 'center',
      padding: '10px',
    },
    image: {
      maxWidth: '100px',
      height: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      tableLayout: 'auto',
    },
  };


  return (
    <div className="table-container">
      <style jsx>{`
        .table-container {
          overflow-x: scroll;
          width: 100%;
        }
        .table-container::-webkit-scrollbar {
          display: none; /* Hide scrollbar in WebKit browsers */
        }
        .table-container {
          -ms-overflow-style: none; /* Hide scrollbar in IE and Edge */
          scrollbar-width: none; /* Hide scrollbar in Firefox */
        }
        table {
          width: 200%;
          border-collapse: collapse;
        }
        th, td {
          padding: 8px;
          border: 1px solid #ccc;
          text-align: left;
        }
      `}</style>

<table style={styles.table}>
    <thead>
      <tr>
        <th style={headerStyle}>Username</th>
        <th style={headerStyle}>Client ID</th>
        <th style={headerStyle}>Display Name</th>
        <th style={headerStyle}>Actions</th>
        <th style={headerStyle}>API Secret Key</th>
        <th style={headerStyle}>PIN</th>
        <th style={headerStyle}>MTM</th>
        <th style={headerStyle}>Available Margin</th>
        <th style={headerStyle}>Max Profit</th>
        <th style={headerStyle}>Max Loss</th>
        <th style={headerStyle}>Profit Locking</th>
        <th style={headerStyle}>Max Loss Per Trade</th>
        <th style={headerStyle}>Multiplier</th>
        <th style={headerStyle}>Manual Exit</th>
        <th style={headerStyle}>Commodity Margin</th>
        <th style={headerStyle}>Utilized Margin</th>
        <th style={headerStyle}>Exit Time</th>
        <th style={headerStyle}>QTY by Exposure</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
        <tr key={index} style={styles.tableRow}>
          <td style={styles.tableCell}>{user.userName}</td>
          <td style={styles.tableCell}>{user.clientId}</td>
          <td style={styles.tableCell}>{user.displayName}</td>
          <td style={styles.imageCell}>
          <i className="bi bi-stop-circle cursor-pointer" style={{ color: 'red' }}></i>
<i className="bi bi-check2-circle cursor-pointer" style={{ color: 'green' }}></i>
<i
                          className="bi bi-trash3 cursor-pointer"
                          style={{ color: "red" }}
                           // Delete tbody on click
                        ></i>
          </td>
          <td style={styles.tableCell}>{user.apiKey}</td>
          <td style={styles.tableCell}>{user.apiSecretKey}</td>
          <td style={styles.tableCell}>{user.mtm}</td>
          <td style={styles.tableCell}>{user.availableMargin}</td>
          <td style={styles.tableCell}>{user.maxProfit}</td>
          <td style={styles.tableCell}>{user.maxLoss}</td>
          <td style={styles.tableCell}>{user.profitLocking}</td>
          <td style={styles.tableCell}>{user.maxLossPerTrade}</td>
          <td style={styles.tableCell}>{user.multiplier}</td>
          <td style={styles.tableCell}>{user.manualExit}</td>
          <td style={styles.tableCell}>{user.commodityMargin}</td>
          <td style={styles.tableCell}>{user.utilizedMargin}</td>
          <td style={styles.tableCell}>{user.exitTime}</td>
          <td style={styles.tableCell}>{user.qtyByExposure}</td>
        </tr>
      ))}
    </tbody>
  </table>


      {showModal && (
        <UserFormModal
          onClose={() => setShowModal(false)}
          onAddUser={handleAddUser}
        />
      )}
      {showSettingsPanel && (
        <SettingsPanel
          onClose={() => setShowSettingsPanel(false)}
          onAddUser={handleAddUser}
        />
      )}
    </div>
  );
};

export default UserTable;
