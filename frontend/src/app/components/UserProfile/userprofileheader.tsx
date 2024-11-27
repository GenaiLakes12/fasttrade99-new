// components/UserProfileHeader.js
import React, { useState } from 'react';
import SettingsPanel from './settingspanel'; // Import your setting panel component
// import Table from './table'; // Import your table component
// import MyComponent from './MyComponent'; // Import MyComponent
import UserFormModal from './UserFormModal'; // Import the user form modal
import 'bootstrap-icons/font/bootstrap-icons.css';
// import axios from "axios";
// import { faStop, faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../NavBar';
import { FaPlus } from "react-icons/fa"; // Importing the FontAwesome Plus icon
import '@fortawesome/fontawesome-free/css/all.min.css';


// Icon button component for displaying icons with background color
const IconButtons = () => {
  const iconButtons = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e66681ed3196feb521456ae2f0cf233cf13c7254a8321ceccccaf34bbe71d40a?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d", bgColor: "#e1bcb9" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c25b7b527303f319bcc60738145890934bb0a7231684a45cd38fb7651dfcbde2?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d", bgColor: "#79d3ee" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3c749bb77bf72e38aabb1fa46b64e8c00c05f38d0dfc45217a0c8a86428692c3?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d", bgColor: "#79d3ee" }
  ];

  return (
    <div style={{ display: "flex", gap: "10px" }}>
    {iconButtons.map((icon, index) => (
      <div
        key={index}
        style={{
          backgroundColor: icon.bgColor,
          borderRadius: "50%",
          padding: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "40px",
          height: "40px",
        }}
      >
        <span
          style={{
            width: "20px",
            height: "20px",
            display: "inline-block",
            backgroundImage: `url(${icon.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "50%",
          }}
        ></span>
      </div>
    ))}
  </div>
  );
};

// Button component for adding new users
const AddButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex overflow-hidden gap-2 justify-center items-center px-3 py-2.5 text-sm font-semibold leading-none text-white whitespace-nowrap bg-blue-700 rounded-md"
  >
    <FaPlus className="w-4 h-4" /> {/* Replacing img with icon */}
    <span className="self-stretch">ADD</span>
  </button>
);
const UserProfileHeader: React.FC = () => {
  const [users, setUsers] = useState([]); // Store user data
  const [showModal, setShowModal] = useState(false); // Toggle form modal

  const handleAddUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
    setShowModal(false); // Close the modal after adding a user
  };


  return (
<div style={{ marginTop: '-147px' }}>
  <Navbar users= {users} /> 
{/* Header with the User Profile label, icons, and ADD button */}
      <div className="header-container" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', alignItems: 'center' }}>
        {/* User Profile Text and Counter */}
        <div className="self-stretch my-auto w-[238px]">
        <i className="bi bi-person"></i>
          <span className="text-blue-700">User Profile</span>{" "}
          <span className="text-base font-extrabold">- (</span>
          <span className="text-base font-extrabold text-green-600">0</span>
          <span className="text-base font-extrabold">/</span>
          <span className="text-base font-extrabold text-rose-500">1</span>
          <span className="text-base font-extrabold">)</span>
        </div>

        {/* Icons and Add Button */}
        <div style={{ display: 'flex', gap: '1px', alignItems: 'center', marginRight: '-1px' }}>
  <IconButtons />
  <AddButton onClick={() => setShowModal(true)} />
</div>

      </div>

      {/* User Table */}
      <UserTable users={users} />

      {/* User Form Modal */}
      {showModal && (
        <UserFormModal
          onClose={() => setShowModal(false)}
          onAddUser={handleAddUser}
        />
      )}
    </div>
  );
};

// UserTable component, now accepts users as props
const UserTable = ({ users }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showTbody, setShowTbody] = useState(true); // State to manage tbody visibility

  const handleRowClick = (rowIndex) => {
    // Toggle the selected row or hide the panel if clicked again
    setSelectedRow((prevIndex) => (prevIndex === rowIndex ? null : rowIndex));
  };
  const handleDeleteTbody = () => {
    setShowTbody(false); // Set state to false to hide tbody
  };
  const headerStyle = {
    padding: '8px',
    backgroundColor: '#e2e9ec', // Updated background color
    color: '#5956f1',
    fontSize: '12px',
    textAlign: 'end',
    width: '250px',
    
  };

  const styles = {
    tableRow: {
      backgroundColor: '#fff',
    },
    tableCell: {
      padding: '10px',
      border: '1px solid #ddd',
      textAlign: 'left',
      whiteSpace: 'nowrap', // Prevent text wrapping
      overflow: 'hidden', // Hide overflow content
    },
    overflowContainer: {
      display: 'inline-block',
      maxWidth: '150px', // Adjust cell width as needed
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      position: 'relative',
    },
  };

  return (
    <div className="table-container">
      <style jsx>{`
        .table-container {
          overflow-x: auto;
          width: 100%;
          margin-top: -24px;
          margin-left: -15px;
        }
        .table-container::-webkit-scrollbar {
          display: none; /* Hide scrollbar in WebKit browsers */
        }
        .table-container {
          -ms-overflow-style: none; /* Hide scrollbar in IE and Edge */
          scrollbar-width: none; /* Hide scrollbar in Firefox */
        }
        table {
          width: 500%;
          border-collapse: collapse;
          table-layout: fixed; /* Ensure fixed layout for equal column widths */
        }
        th,
        td {
          padding: 8px;
          border: 1px solid #ccc;
        }
        th {
          white-space: nowrap;
        }
        td .overflow-container {
          max-width: 150px;
          overflow: hidden;
          white-space: nowrap;
        }
        td:hover .overflow-container {
          overflow-x: auto;
        }
        td .overflow-container::-webkit-scrollbar {
          height: 0px;
        }
        td .overflow-container::-webkit-scrollbar-thumb {
          background: #5956f1;
          border-radius: 3px;
        }
        td .overflow-container::-webkit-scrollbar-track {
          background: #f2f2f2;
        }
      `}</style>

      <table>
        <colgroup>
          {[...Array(31)].map((_, index) => (
            <col key={index} style={{ width: '10%' }} />
          ))}
        </colgroup>
        <thead style={{ textAlign: 'center' }}>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={headerStyle}>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Actions
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>


<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    Client ID
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>

<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    Manual Exit
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   MTM(All)
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Available Margin
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   User Name
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Broker
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   API Key
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   API Secret Key
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Data API
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   QR Code
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Exit Time
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Auto Login
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   PIN
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Max Profit
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Max Loss
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Profit Locking
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Qty By Exposure
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Qty on Max Loss Per Trade
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  Max Loss Per Trade
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    Max Open Trade
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Qty Multiplier
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Market Orders
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Enable Nrml Sq Off
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Enable CNC Sq Off
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Exit Order Type
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   2FA
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Trading Authorization Request
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  Commodity Margin
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
Mobile
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
  </th>
  <th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  Email
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Net
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   API User Details
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
   Utilized Margin
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
          </tr>
        </thead>
        {showTbody && (
        <tbody>
          
  {users.map((user, index) => (
    <tr key={index} style={styles.tableRow}>
      {Object.values(user)
        .slice(0, 34) // Ensure only 18 cells are rendered
        .map((value, idx) => (
          <td
            key={idx}
            style={{
              ...styles.tableCell,
              height: '40px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',                
              textAlign: 'center',
              cursor: idx === 1 ? 'pointer' : 'default',
            }}
            onClick={idx === 1 ? () => handleRowClick(index) : undefined}
          >
            {idx === 0 ? (
  <div className="flex items-center justify-start space-x-4">
 <i className="bi bi-stop-circle cursor-pointer" style={{ color: 'red' }}></i>
<i className="bi bi-check2-circle cursor-pointer" style={{ color: 'green' }}></i>
<i
                          className="bi bi-trash3 cursor-pointer"
                          style={{ color: "red" }}
                          onClick={handleDeleteTbody}
                        ></i>  </div>
 
) : idx === 2 ? (
  <div className="flex items-center justify-center">
    <i className="bi bi-box-arrow-right cursor-pointer" style={{ color: 'red' }}></i>
  </div>
) : idx === 9 || idx === 12 || idx === 24 || idx === 27 || idx === 19? (
  <div className="flex items-center">
    <input
      type="checkbox"
      className="form-checkbox h-5 w-5 text-green-500"
      checked={true}
      title={`Checkbox for idx ${idx}`}
      readOnly
    />
  </div>
) : (
  <div className="overflow-container" title={typeof value === 'string' ? value : undefined}>
    {typeof value === 'string' || typeof value === 'number' ? value : String(value)}
  </div>
)}
          </td>
        ))}    </tr>  ))}
</tbody>
        )}
      </table>
      {selectedRow !== null && (
        <div
          style={{
            position: 'absolute',
            top: '42%', // Position below the table
            left: '0',
            width: '100%',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            marginTop: '20px',
            zIndex: 10,
          }}
        >
          <SettingsPanel rowIndex={selectedRow} user={users[selectedRow]} />
        </div>
      )}
    </div> 
  );
};


export default UserProfileHeader;
