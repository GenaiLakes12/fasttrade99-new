import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ColumnSortingIcon from './path/to/column-sorting.svg'; // Adjust the path as needed



const UserTable: React.FC = () => {
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

  return (
    <div style={{ overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none' }}>

      <table
        style={{
          width: '150%', // Maintain width
          borderCollapse: 'collapse',
          margin: '20px auto', // Center the table
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
    UserID
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
  </th>
  <th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
   Exchange
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
  </th>
  <th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
    Symbol
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
  </th>
  <th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
    Avg Price
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
  </th>
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Actions   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>        
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Buy Value  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
LTP   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Current Value   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
P&L%   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Collateral Qty   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               

<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
T1 QTY    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
CNS Sell Quantity    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Trigger Price   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
User Alias    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
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
  <td style={cellStyle}>
        <input type="checkbox" style={{ marginRight: '8px' }} />
        {user.username}
      </td>
      <td style={cellStyle}>{user.exchange || "12345"}</td>
<td style={cellStyle}>{user.symbol || "12345"}</td>

      <td style={cellStyle}>{user.avgPrice || '0.00'}</td>
              <td style={cellStyle}>
  <img 
    loading="lazy" 
    src="https://cdn.builder.io/api/v1/image/assets/TEMP/275f58e6ab26946634776459597ba09fc5bb84aad17fb474f8a510b50978665b?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d" 
    alt="Company Logo"
    className="object-contain shrink-0 self-stretch my-auto aspect-[3.57] w-[90px] mr-2" 
  />
</td>
<td style={cellStyle}>{user.buyValue || '0.00'}</td>
      <td style={cellStyle}>{user.ltp || '0.00'}</td>
      <td style={cellStyle}>{user.currentValue || '0.00'}</td>
      <td style={cellStyle}>{user.plPercentage || '0%'}</td>
      <td style={cellStyle}>{user.collateralQty || '0'}</td>
      <td style={cellStyle}>{user.t1Qty || '0'}</td>
      <td style={cellStyle}>{user.cnsSellQty || '0'}</td>
      <td style={cellStyle}>{user.triggerPrice || '0.00'}</td>
      <td style={cellStyle}>{user.userAlias || 'Alias'}</td>

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
