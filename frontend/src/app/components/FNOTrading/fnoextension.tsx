import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-feather'; // Import eye icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus, faTrash,faCopy,faCheckCircle,faUndo,faMoneyBill,faSignal,faCog,faSignOutAlt,faPen } from '@fortawesome/free-solid-svg-icons';

const SettingsPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true); // State to control panel visibility

  const checkboxGroups = [
    {
      groupName: 'PROFILE',
      items: [
        { id: 'Enable', label: 'Enable', showCheckbox: true, hasIcons: true, icon: faPlus }, // Added plus icon
        { id: 'Status', label: 'Status id', showCheckbox: false },
        { id: 'PortFolio Name', label: 'PF.Name', showCheckbox: false },
        { id: 'PNL', label: 'PNL Name', showCheckbox: false },
        { id: 'Symbol', label: 'Symbol', showCheckbox: false },
        { id: 'Execute/SQ OFF', label: 'E/SQ OFF', showCheckbox: false, hasIcons: true, icon: faPlay }, // Added play icon
      ],
    },
    {
      groupName: 'RISK & REWARD',
      items: [
        { id: 'Edit', label: 'Edit', showCheckbox: true, hasIcons: true, icon: faPen }, // Updated icon to pen
        { id: 'Delete', label: 'Delete', showCheckbox: false, hasIcons: true, icon: faTrash },
        { id: 'MakeCopy', label: 'Make Copy', showCheckbox: false, hasIcons: true, icon: faCopy }, // Added icon for Make Copy
        { id: 'Mark as Completed', label: 'Profit Locking', showCheckbox: false, hasIcons: true, icon: faCheckCircle }, // Added icon here
        { id: 'Reset', label: 'Reset', showCheckbox: false, hasIcons: true, icon: faUndo }, // Added icon for Reset
        { id: 'Payoff', label: 'PayOff', showCheckbox: false, hasIcons: true, icon: faMoneyBill }, // Added icon for PayOff
      
      ],
    },
    {
      groupName: 'EXIT',
      items: [
        { id: 'Chat', label: 'Chat', showCheckbox: true, hasIcons: true, icon: faSignal }, // Added signal icon for Chat
        { id: 'Re Execute', label: 'Re Execute', showCheckbox: false, hasIcons: true, icon: faCog }, // Changed to cog icon for Re Execute
        { id: 'Part Entry/Exit', label: 'Part Entry/Exit', showCheckbox: false, hasIcons: true, icon: faSignOutAlt }, // Added exit icon for Part Entry/Exit
        { id: 'Current Value', label: 'Current Value', showCheckbox: false },
        { id: 'Value Per Unit', label: 'Value Per Unit', showCheckbox: false },
        { id: 'UnderLying LTP', label: 'UnderLying LTP', showCheckbox: false },
        { id: 'Positiional PortFolio', label: 'Positiional PortFolio', showCheckbox: false },
      ],
    },
    {
      groupName: 'AUTHORIZATION',
      items: [
        { id: 'Product', label: 'Production', showCheckbox: true },
        { id: 'Strategy', label: 'Strategy', showCheckbox: false },
        { id: 'Entry Price', label: 'Entry Price', showCheckbox: true },
        { id: 'Combined Premuim', label: 'Combined Premuim', showCheckbox: false },
        { id: 'Per Lot Premuium', label: 'Per Lot Premuium', showCheckbox: true },
        { id: 'Start Time', label: 'Start Time', showCheckbox: true },
        { id: 'EndTime', label: 'End Time', showCheckbox: true },
      ],
    },
    {
      groupName: 'INFORMATION',
      items: [
        { id: 'SQOFF time', label: 'SQOFF Time', showCheckbox: false },
        { id: 'Range End Time', label: 'Range End Time', showCheckbox: false },
        { id: 'Delta ', label: 'Delta', showCheckbox: false },
        { id: 'Theta', label: 'Theta', showCheckbox: false },
        { id: 'Vega', label: 'Vega', showCheckbox: false },
      ],
    },
  ];
  const handleCancelClick = () => {
    setIsVisible(false); // Close the settings panel when "Cancel" is clicked
  };

  return isVisible ? (
    <section style={settingsPanelStyle}>
      {checkboxGroups.map((group, index) => (
        <div key={index} style={columnStyle}>
          <CheckboxGroup items={group.items} groupName={group.groupName} />
        </div>
      ))}
      <div style={buttonContainerStyle}>
      <button style={cancelButtonStyle} onClick={handleCancelClick}>Cancel</button>
        <button style={saveButtonStyle}>Save</button>
      </div>
    </section>
  ): null; // Render null when the panel is closed
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button className="action-btn" title={item.label}>
                <FontAwesomeIcon icon={item.icon} /> {/* Display the associated icon */}
              </button>
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
  overflowX: 'auto',
  position: 'relative',
  height: '100%',
};
const iconStyle: React.CSSProperties = {
  width: '24px',   // Adjust the size as needed
  height: '24px',  // Adjust the size as needed
  marginLeft: '10px',
};

const columnStyle: React.CSSProperties = {
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  margin: '0 8px',
};

const checkboxGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
};

const checkboxItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
};

// Styles for headings and labels
const headingStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  marginBottom: '8px',
  color: '#596ea2',
  fontWeight: 'bold',
  fontFamily: 'Arial, sans-serif',
};

const labelStyle: React.CSSProperties = {
  fontSize: '1rem',
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
  padding: '8px 16px',
  fontSize: '1rem',
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
  fontSize: '0.875rem', // Smaller font size
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
