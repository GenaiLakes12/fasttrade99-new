import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SettingsPanel from './fnoextension';


const UserTable: React.FC = () => {
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);

  const handleCellClick = () => {
    setShowSettingsPanel(true);
  };
  const closeSettingsPanel = () => {
    setShowSettingsPanel(false);
  };
  const users = [
    { username: 'User1', apiKey: 'API_KEY_1' },
    { username: 'User2', apiKey: 'API_KEY_2' },
    { username: 'User3', apiKey: 'API_KEY_3' },
    { username: 'User4', apiKey: 'API_KEY_4' },
    { username: 'User5', apiKey: 'API_KEY_5' },
    { username: 'User6', apiKey: 'API_KEY_6' },
    { username: 'User7', apiKey: 'API_KEY_7' },
    { username: 'User8', apiKey: 'API_KEY_8' },
    { username: 'User9', apiKey: 'API_KEY_9' },
    { username: 'User10', apiKey: 'API_KEY_10' },
  ];
  const headerStyle = {
    color: '#3d8ae7', // Set the header text color
    border: 'none',   // Remove the solid border
    fontSize: '14px', // Decrease the font size
    paddingRight: '10px',  // Add padding for spacing between headings
    padding: '10px', // Adjust the padding value as needed
  };
  const cellStyle: React.CSSProperties = {
    padding: '4px 8px',
    fontSize: '14px',
    borderBottom: '1px solid #ddd',
    textAlign: 'center',
  };
  return (
    <div style={{ overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none' }}>
      {!showSettingsPanel ? (
      <table
        style={{
          width: '200%', // Maintain width
          borderCollapse: 'collapse',
          margin: '20px auto', // Center the table
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
    Username
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
  </th>
  <th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
    Client ID
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
  </th>
  <th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
    Display Name
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
  </th>
  <th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
    Actions
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
  </th>
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
API Secret Key    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>        
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
PIN    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
MTM    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Available Margin   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Max Profit    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Max Loss    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               

<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Profit Locking    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Max Loss Per Trade    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Multiplier    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Manual Exit    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Commodity Margin   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Utilized Margin    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Exit Time    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
QTY by Exposure    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>             
</tr>
</thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
             <td style={cellStyle} onClick={handleCellClick}>{user.username}</td>
             <td style={cellStyle}>{user.apiKey}</td>     
                <td style={cellStyle}>{user.displayName || `User-${index + 1}`}</td>
      <td style={cellStyle}>
      <div className="flex gap-2">
  {/* Red Circle Icon */}
  <i className="bi bi-play cursor-pointer" style={{ color: 'black', fontSize: '30px' }}></i>
  <i 
  className="bi bi-pen cursor-pointer" 
  style={{ fontSize: '18px', color: 'black',marginTop: '7px' }}
></i>
  <i
    className="bi bi-trash3 cursor-pointer"
    style={{ color: "red", fontSize: '20px',marginTop: '6px' }}
  ></i>
</div>

</td>

              <td style={cellStyle}>{user.apiKey}</td>
              <td style={cellStyle}>{Math.floor(Math.random() * 100)}</td>
              <td style={cellStyle}>{(Math.random() * 1000).toFixed(2)}</td>
              <td style={cellStyle}>{(Math.random() * 5000).toFixed(2)}</td>
              <td style={cellStyle}>{(Math.random() * 1000).toFixed(2)}</td>
              <td style={cellStyle}>{(Math.random() * 1000).toFixed(2)}</td>
              <td style={cellStyle}>{(Math.random() * 1000).toFixed(2)}</td>
              <td style={cellStyle}>{(Math.random() * 1000).toFixed(2)}</td>
              <td style={cellStyle}>{(Math.random() * 10).toFixed(2)}</td>
              <td style={cellStyle}>{Math.random() > 0.5 ? 'Yes' : 'No'}</td>
              <td style={cellStyle}>{(Math.random() * 500).toFixed(2)}</td>
              <td style={cellStyle}>{(Math.random() * 1000).toFixed(2)}</td>
              <td style={cellStyle}>{new Date().toLocaleTimeString()}</td>
              <td style={cellStyle}>{(Math.random() * 100).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : (
        <SettingsPanel closePanel={closeSettingsPanel} />
      )}
    </div>
  );
};

// Styles for the table header and cells
const headerStyle: React.CSSProperties = {
  padding: '4px 8px', // Reduced padding for header to decrease vertical size
  fontSize: '14px', // Reduced font size for header
  textAlign: 'left',
  borderBottom: '2px solid #ddd',
};

const cellStyle: React.CSSProperties = {
  padding: '4px 8px', // Reduced padding for cells to decrease vertical size
  fontSize: '14px', // Reduced font size for cells
  borderBottom: '1px solid #ddd',
  textAlign: 'center',  
};

export default UserTable;
