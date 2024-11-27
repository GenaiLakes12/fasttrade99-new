import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ColumnSortingIcon from './path/to/column-sorting.svg'; // Adjust the path as needed



const UserTable: React.FC = () => {
  const users = [
    { username: 'Konda Aaryan Goud', apiKey: 'API_KEY_1' },
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

  return (
    <div style={{ overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none' }}>

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
</th>             </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td style={cellStyle}>{user.username}</td>
              <td style={cellStyle}>{user.clientId || `Client-${index + 1}`}</td>
      <td style={cellStyle}>{user.displayName || `User-${index + 1}`}</td>
      <td style={cellStyle}>
  <img 
    loading="lazy" 
    src="https://cdn.builder.io/api/v1/image/assets/TEMP/275f58e6ab26946634776459597ba09fc5bb84aad17fb474f8a510b50978665b?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d" 
    alt="Company Logo"
    className="object-contain shrink-0 self-stretch my-auto aspect-[3.57] w-[90px] mr-2" 
  />
</td>

<td style={cellStyle}>{user.apiKey}</td>
<td style={cellStyle}>0</td>
<td style={cellStyle}>0.00</td>
<td style={cellStyle}>0.00</td>
<td style={cellStyle}>0.00</td>
<td style={cellStyle}>0.00</td>
<td style={cellStyle}>0.00</td>
<td style={cellStyle}>0.00</td>
<td style={cellStyle}>0.00</td>
<td style={cellStyle}>No</td>
<td style={cellStyle}>0.00</td>
<td style={cellStyle}>0.00</td>
<td style={cellStyle}>0:00:00</td>
<td style={cellStyle}>0.00</td>

            </tr>
          ))}
        </tbody>
      </table>
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
