import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-feather'; // Import eye icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopCircle, faSignInAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const SettingsPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const checkboxGroups = [
    {
      groupName: 'EQUITY TRADING',
      items: [
        { id: 'Source Symbol', label: 'Source Symbol', showCheckbox: false , inputBox: true },
        { id: 'Data Provider', label: 'Data Provider', showCheckbox: false },
        { id: 'Mapping', label: 'Mapping', showCheckbox: false },
        { id: 'Exchange', label: 'Exchange', showCheckbox: false },
        { id: 'Exhg Symbol', label: 'Exhg Symbol', showCheckbox: false },
        { id: 'Multi Target Exit', label: 'Multi Target Exit', showCheckbox: false },
      ],
    },
    {
      groupName: 'RISK & REWARD',
      items: [
        { id: 'Product', label: 'Product', showCheckbox: false },
        { id: 'Entry Order', label: 'Entry Order ', showCheckbox: false },
        { id: 'Exit Order', label: 'Exit Order ', showCheckbox: false },
        { id: 'Strategies', label: 'Strategies', showCheckbox: false },
        { id: 'QTY Value', label: 'QTY Value', showCheckbox: false },
        { id: 'Max Loss', label: 'Max Loss', showCheckbox: false },
        { id: 'Option Type', label: 'Option Type', showCheckbox: false },
        { id: 'Option Entry', label: 'Option Entry', showCheckbox: false },


      ],
    },
    {
      groupName: 'EXIT',
      items: [
        { id: 'Max Open POS', label: 'Max Open POS', showCheckbox: true },
        { id: 'Max Open Trade', label: 'Max Open Trade', showCheckbox: false },
        { id: 'Max Trades', label: 'Max Trades', showCheckbox: false },
        { id: 'Max Profit Per Trade', label: 'Max Profit Per Trade', showCheckbox: false },
        { id: 'Max Loss Per Trade', label: 'Max Loss Per Trade', showCheckbox: false },
        { id: 'Max Signal Per Minute', label: 'Max Signal Per Minute', showCheckbox: false },
      ],
    },
    {
      groupName: 'AUTHORIZATION',
      items: [
        { id: 'No Signal For Second', label: 'No Signal For Second', showCheckbox: false },
        { id: 'Stop Loss', label: 'Stop Loss', showCheckbox: false },
        { id: 'Per Minute', label: 'Per Minute', showCheckbox: false },
        { id: 'No Signal For Seconds', label: 'No Signal For Seconds', showCheckbox: false },
        { id: 'Stop Loss', label: 'Stop Loss', showCheckbox: false },
        { id: 'SL Trading', label: 'SL Trading', showCheckbox: false },
        { id: 'SL Trailing', label: 'SL Trailing', showCheckbox: false },
      ],
    },
    {
      groupName: 'INFORMATION',
      items: [
        { id: 'Target', label: 'Target', showCheckbox: false },
        { id: 'TGT Trailing', label: 'TGT Trailing', showCheckbox: false },
        { id: 'Break Even', label: 'Break Even', showCheckbox: false },
        { id: 'Price Spread', label: 'Price Spread', showCheckbox: false },
        { id: 'Cancel If Not Complete', label: 'Cancel If Not Complete', showCheckbox: false },
      ],
    },
  ];

  return (
    <section style={settingsPanelStyle}>
      {checkboxGroups.map((group, index) => (
        <div key={index} style={columnStyle}>
          <CheckboxGroup items={group.items} groupName={group.groupName} />
        </div>
      ))}
      <div style={buttonContainerStyle}>
      <button style={cancelButtonStyle} onClick={onClose}>Cancel</button>
      <button style={saveButtonStyle}>Save</button>
      </div>
    </section>
  );
};

const CheckboxGroup: React.FC<{ groupName: string; items: { id: string; label: string; showCheckbox: boolean }[] }> = ({ groupName, items }) => {
  const [state, setState] = useState(
    items.map(item => ({ ...item, isInputVisible: false }))
  );

  const handleButtonClick = (index: number) => {
    const updatedItems = state.map((item, idx) => {
      if (idx === index) {
        return { ...item, isInputVisible: true }; // Set input visible to true
      }
      return item;
    });
    setState(updatedItems);
  };

  return (
    <div style={checkboxGroupStyle}>
      <h3 style={headingStyle}>{groupName}</h3>
      {state.map((item, index) => (
        <div key={item.id} style={checkboxItemStyle}>
          <div style={labelWrapperStyle}>
            <label style={labelStyle}>{item.label}</label>
          </div>

          <div style={verticalLineStyle}></div>

          <div style={inputWrapperStyle}>
            {item.hasIcons ? (
               <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'flex-start' }}>
               <img
                 loading="lazy"
                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/275f58e6ab26946634776459597ba09fc5bb84aad17fb474f8a510b50978665b?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
                 alt="Company Logo"
                 className="object-contain shrink-0 self-stretch my-auto aspect-[3.57] w-[100px]"  style={{ marginLeft: '0px' }}
               />
             </div>
            ) : item.showCheckbox ? (
              <input
                type="checkbox"
                id={item.id}
                name={item.id}
                style={{ ...checkboxStyle, transform: 'scale(1.2)' }} // Increase checkbox size
              />
              
            ) : (
              !item.isInputVisible && (
                <button
                  style={addButtonStyle}
                  onClick={() => handleButtonClick(index)}
                >
                  00
                </button>
              )
            )}

{item.isInputVisible && (
              <div style={{ position: 'relative', flex: '2' }}>
                <input
                  type={item.isPasswordVisible ? 'text' : 'password'}
                  style={inputStyle}
                  placeholder={`Enter ${item.label}`}
                />
                {/* Eye icon for toggling password visibility */}
                {['API Key', 'Pin', 'QR Code'].includes(item.label) && (
                  <span
                    onClick={() => togglePasswordVisibility(index)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                  >
                    {item.isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Inline styles (CSS) for the component
const settingsPanelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  borderRadius: '0 0 6px 6px',
  border: '1px solid #e4e7e9',
  backgroundColor: '#fff',
  padding: '16px',
  position: 'relative',
  height: '350px',
  boxSizing: 'border-box',
};
const iconStyle: React.CSSProperties = {
  width: '24px',   // Adjust the size as needed
  height: '24px',  // Adjust the size as needed
  marginLeft: '10px',
};

const columnStyle: React.CSSProperties = {
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  margin: '0 4px',
};

const checkboxGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginBottom: '8px',

};

const checkboxItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '4px',
};

// Styles for headings and labels
const headingStyle: React.CSSProperties = {
  fontSize: '1rem',
  marginBottom: '4px',
  color: '#596ea2',
  fontWeight: 'bold',
  fontFamily: 'Arial, sans-serif',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  margin: '0', // Ensure label sticks to the vertical line
  flex: '1',
  marginRight: '5px',
  wordWrap: 'break-word',  // Allow breaking long words
  whiteSpace: 'normal',    // Wrap text to the next line if too long
  textAlign: 'right',
};

const checkboxStyle: React.CSSProperties = {
  marginRight: '4px',
  paddingRight: '1px',
  paddingLeft: '1px',
  transform: 'scale(1.5)',
};

const inputStyle: React.CSSProperties = {
  marginLeft: '6px', // Space between checkbox and input
  padding: '5px',
  fontSize: '0.875rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  flex: '2',
};

// Styles for buttons
const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  bottom: '16px',         // Distance from bottom
  right: '16px',  
  position: 'absolute',         // Distance from right
};

const buttonStyle: React.CSSProperties = {
  padding: '6px 12px',
  fontSize: '0.875rem',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
  marginLeft: '8px',
};

const cancelButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#ccc',
};

const saveButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#8F00FF',
  color: '#fff',
};

// Styles for the '00' button
const addButtonStyle: React.CSSProperties = {
  padding: '2px 4px', // Decreased size of the button
  fontSize: '0.75rem', // Smaller font size
  borderRadius: '0px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#7fdef1',
  color: '#fff',
  paddingLeft: '3px', // Remove extra spacing to keep it next to the line
};

// Additional styles for layout
const labelWrapperStyle: React.CSSProperties = {
  flex: '1',
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: '0', // Remove extra spacing to keep it next to the line
  paddingRight: '0', // Remove extra spacing to keep it next to the line
};

const verticalLineStyle: React.CSSProperties = {
  width: '3px',
  height: '25px',
  backgroundColor: '#3566df', // Light gray for the vertical line
  marginRight: '0',
  paddingRight: '0', // Remove extra spacing to keep it next to the line
};

const inputWrapperStyle: React.CSSProperties = {
  flex: '2',
  display: 'flex',
  justifyContent: 'flex-start',
  marginLeft: '5px', // Remove extra spacing to keep input closer to the line
  paddingLeft: '0', // Remove extra spacing to keep input closer to the line
};

export default SettingsPanel;
