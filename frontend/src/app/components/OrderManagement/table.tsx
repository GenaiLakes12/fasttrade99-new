import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ColumnSortingIcon from './path/to/column-sorting.svg';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Adjust the path as needed



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
          width: '300%', // Maintain width
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
    Source Symbol
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
  </th>
  <th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
    Request ID
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
  <span style={{ display: 'flex', alignItems: 'center' }}>
Exchange Symbol    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
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
LTP   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
P&L   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Product   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Entry Order Type    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               

<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Entry Order ID   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Entry Time   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Entry Txn    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Entry Qty   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Entry Filled Qty   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Entry Exchange Time   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
LTP#1    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>               
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
LTP#2    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Entry Avg Price   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
LTP#3    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Entry Status    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Exit Order ID  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Exit Time   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Exit Txn   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Exit Qty   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
LTP#4   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Exit Exchange Time    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Exit Avg Price   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Exit Status   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Target   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Sl    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Break Even    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Signal Source    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Strategy   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Order Failed   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th>  
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
User Alias  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Remarks   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
      <i className="bi bi-caret-up-fill" style={{ fontSize: '10px' }}></i>
      <i className="bi bi-caret-down-fill" style={{ fontSize: '10px' }}></i>
    </span>
  </span>
</th> 
<th style={headerStyle}>
  <span style={{ display: 'flex', alignItems: 'center' }}>
Manual Exit   <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', lineHeight: '1' }}>
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
<td style={cellStyle}>{user.symbol || "12345"}</td>
<td style={cellStyle}>{user.requestId || "12345"}</td>
<td style={cellStyle}>{user.exchange || "12345"}</td>
<td style={cellStyle}>{user.exchangeSymbol || "12345"}</td>

              <td style={cellStyle}>
              <div className=" flex "> 
    <button> <PlayArrowIcon/></button>
    <button> <EditIcon/></button>
    <button> <DeleteOutlineIcon/></button>
    </div>
</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>
<td style={cellStyle}>00</td>



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
