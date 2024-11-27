import React, { useState } from 'react';
import ProfitSettingsForm from './ProfitSettingsForm';

// // interface CheckboxGroupProps {
//   groupName: string;
//   items: CheckboxItem[];
//   onChange: (id: string, value: string) => void;
// }

// interface CheckboxItem {
//   id: string;
//   label: string;
//   showCheckbox: boolean;
//   hasIcons?: boolean;
//   value?: string;
// }
export interface ProfitSettingsFormProps {
  onSubmit: (values: {
    initialValue: number;
    targetValue: number;
    steps: number;
    percentage: number;
  }) => void;
}
const SettingsPanel: React.FC<{ onClose: () => void; onAddUser: (formData: Record<string, unknown>) => void }> = ({  onClose,
  onAddUser,
}) => {
  const [showProfitSettings, setShowProfitSettings] = useState(false);
  const [formData, setFormData] = useState({
    Action: "",
    ClientID: "",
    ManualExit: "",
    MTM: "0",
    AvailableMargin: "",
    UserName: "",
    Broker: "",
    ApiKey: "",
    APISecretKey: "",
    DataAPI: false,
    QRCode: "",
    ExitTime: "",
    AutoLogin: false,
    Pin: "",
    MaxProfit: "",
    MaxLoss: "",
    ProfitLocking: "", // This will store the formatted profit locking string
    QtyByExposure: "",
    QtyOnMaxLossPerTrade: false,
    MaxLossPerTrade: "",
    MaxOpenTrades: "",
    QtyMultiplier: "",
    Mobile: "",
    Email: "",
    Net: "",
    MarketOrders: "",
    EnableNRMLSqoff: "",
    EnableCNCsqOff: false,
    ExitOrdertype: "",
    FA: "",
    TradingAuthoReq: false,
    CommodityMargin: "",
    APIUserDetails: "",
    UtilizedMargin: "",
  }); 
  const [visibleInputs, setVisibleInputs] = useState({}); // State to manage visibility for each input


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddUser(formData);
    onClose();
  };

  const handleProfitLockingClick = () => {
    setShowProfitSettings(true);
  };

  const closePopup = () => {
    setShowProfitSettings(false);
  };
 
  const handleToggleInputVisibility = (e: React.MouseEvent<HTMLButtonElement>, key: string) => {
    e.preventDefault();  // Prevent form submission or any default behavior
    setVisibleInputs((prev: Record<string, boolean>) => ({
      ...prev,
      [key]: !prev[key], // Toggle visibility of the specific input
    }));  };


  // Add this handler to receive values from ProfitSettingsForm
  const handleProfitSettingsSubmit = (values: {
    initialValue: number;
    targetValue: number;
    steps: number;
    percentage: number;
  }) => {
    const formattedValue = `${values.initialValue}-${values.targetValue}-${values.steps}-${values.percentage}`;
    setFormData(prev => ({
      ...prev,
      ProfitLocking: formattedValue,
    }));
    setShowProfitSettings(false);
  };

  return (
    <section style={settingsPanelStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
          <i
            className="fa fa-user"
            style={{
              fontSize: '24px',
              marginRight: '8px',
              padding: '10px',
              borderRadius: '50%',
              backgroundColor: '#5956f1',
              color: '#fff',
              marginBottom: '15px',
              marginLeft: '25px', // Add this line for left margin

            }}
          ></i>
          UserName
        </h2>

        {/* Container for 4 rows in a horizontal layout */}
        <div className="container">
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '1px',
      width: '16%',
      margin: '0 0 0 14px', // 50px left margin
    }}
  >
    <h3
      style={{
        color: '#5956f1',
        textAlign: 'center',
        fontSize: '1.2rem',
        marginLeft: '20px',
      }}
    >
      Profile
    </h3>
    {Object.keys(formData)
      .slice(0, 6)
      .map((key, idx) => (
        <div
          key={key}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
          }}
        >
          <label
            style={{
              flex: '0 0 30%',
              textAlign: 'right',
              marginRight: '10px',
              fontSize: '14px',
              fontWeight: '500',
              minWidth: '120px',
            }}
          >
            {key}
          </label>
          <div
            style={{
              height: '20px',
              width: '1px',
              backgroundColor: '#5956f1',
              marginRight: '10px',
            }}
          ></div>
           {/* Blue Vertical Line */}
          {idx === 0 ? (
            // Render icons for idx === 0
            <div className="flex items-center justify-center space-x-4">
            <i className="bi bi-stop-circle cursor-pointer" style={{ color: 'red' }}></i>
<i className="bi bi-check2-circle cursor-pointer" style={{ color: 'green' }}></i>
<i className="bi bi-trash3 cursor-pointer" style={{ color: 'red' }}></i>

            </div>
          ) : idx === 2 ? (
            // Render additional icon for idx === 2
            <div className="flex items-center">
              <i className="bi bi-box-arrow-right cursor-pointer"style={{ color: 'red' }}></i>
            </div>
          ) : idx === 9 ? (
            // Render checkbox for idx === 9
            <div className="flex items-center">
              <input
                type="checkbox"
                name={key}
                checked={!!formData[key as keyof typeof formData]}
                onChange={handleChange}
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                }}
              />
            </div>
          ) : (
<div style={{ display: 'flex', alignItems: 'start', gap: '0px' }}>
                {/* Show '00' button only when input is not visible */}
                {!visibleInputs[key as keyof typeof visibleInputs] && (

                <button
 onClick={(e) => handleToggleInputVisibility(e, key)} // Pass the event and key to toggle visibility
 type="button"                   
                    style={{
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px', // Smaller font size
                    width: '25px', // Smaller button width
                    height: '25px', // Smaller button height
                    marginLeft: '-10px', // Adjust the left margin
                    backgroundColor: '#4da8e7',
                    padding: '4px 6px',


                  }}
                >
                  00
                </button>
                                )}


                {/* Input box visible based on state */}
                {visibleInputs[key as keyof typeof visibleInputs] && (
                <input
              type="text"
              name={key}
              placeholder={`Enter ${key}`}

              value={formData[key as keyof typeof formData] as string}
              onChange={handleChange}
              style={{
                flex: '1',
                width: '120px',
                padding: '6px 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
          )}
        </div>
         )}
          </div>

      ))  }</div>  {/* Repeat similar adjustments for other sections */}
{['Risk & Reward', 'Exit', 'Authorization', 'Information'].map((section, index) => (
  <div
    key={section}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '30%',
      margin: '0 auto',
      marginLeft: '-3px',
    }}
  >
    <h3
      style={{
        color: '#5956f1',
        textAlign: 'center',
        fontSize: '1.2rem',
        marginLeft: '20px',
      }}
    >
      {section}
    </h3>
    {Object.keys(formData)
      .slice(index * 7 + 6, (index + 1) * 7 + 6)
      .filter(key => !(section === 'Authorization' && ['mobile', 'email', 'net'].includes(key))) // Filter out mobile, email, net for Authorization section
      .map((key, idx) => (
        <div
          key={key}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
          }}
        >
          <label
            style={{
              flex: '0 0 30%',
              textAlign: 'right',
              marginRight: '10px',
              fontSize: '14px',
              fontWeight: '500',
              minWidth: '120px',
              cursor: key === 'ProfitLocking' ? 'pointer' : 'default',
            }}
            onClick={key === 'ProfitLocking' ? handleProfitLockingClick : undefined}
          >
            {key}
          </label>
          <div
            style={{
              height: '20px',
              width: '1px',
              backgroundColor: '#5956f1',
              marginRight: '10px',
            }}
          ></div>
          {key !== 'DataAPI' && key !== 'AutoLogin' && key !== 'QtyOnMaxLossPerTrade' && key !== 'TradingAuthorizationReq' && key !== 'EnableCNCsqOff' && key !== 'TradingAuthoReq' && !visibleInputs[key as keyof typeof visibleInputs] ? (
            <button
              onClick={(e) => handleToggleInputVisibility(e, key)} // Toggle visibility on click
              type="button"
              style={{
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',  fontSize: '12px', // Smaller font size
                width: '25px', // Smaller button width
                height: '20px', // Smaller button height
                marginLeft: '-10px', // Adjust the left margin
                backgroundColor: '#4da8e7',
                padding: '2px 4px',
              }}
            >
              00
            </button>
          ) : (
            // Render the input box when it's visible
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {key === 'Broker' ? (
                <select
                  name={key}
                  value={formData[key as keyof typeof formData]?.toString() || ''}
                  onChange={(e) => handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    zIndex: '10',  // Ensure it appears above other elements
                  }}
                >
                  <option value="">Select Broker</option>
                  <option value="angelone">Angle One</option>
                  <option value="flattrade">FlatTrade</option>
                  <option value="fyers">Fyers</option>
                  <option value="pseudo_account">Pseudo Account</option>
                  <option value="Upstox">Upstox</option>
                  <option value="Zerodha">Zerodha</option>
                </select>
              ) : (key === 'DataAPI' || key === 'AutoLogin' || key === 'QtyOnMaxLossPerTrade' || key === 'TradingAuthorizationReq' || key === 'EnableCNCsqOff' || key === 'TradingAuthoReq') ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginRight: '8px',
                    flex: '0',
                  }}
                >
                  <input
                    type="checkbox"
                    name={key}
                    checked={Boolean(formData[key as keyof typeof formData])}
                    onChange={handleChange}
                    style={{
                      width: '15px',
                      height: '20px',
                      marginRight: '-20px',
                    }}
                  />
                </div>
              ) : key === 'APIUserDetails' ? (
                <input
                  type="text"
                  name={key}
                  placeholder={`Enter ${key}`}
                  value={formData[key as keyof typeof formData]?.toString() || ''}
                  onChange={handleChange}
                  style={{
                    flex: '1',
                    width: '120px',
                    padding: '6px 8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                />
              ) : key === 'UtilizedMargin' ? (
                <input
                  type="text"
                  name={key}
                  placeholder={`Enter ${key}`}
                  value={formData[key as keyof typeof formData]?.toString() || ''}
                  onChange={handleChange}
                  style={{
                    flex: '1',
                    width: '120px',
                    padding: '6px 8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                />
              ) : idx === 9 ? (
                null
              ) : (
                <input
                  type="text"
                  name={key}
                  placeholder={`Enter ${key}`}
                  value={formData[key as keyof typeof formData]?.toString() || ''}
                  onChange={handleChange}
                  style={{
                    flex: '1',
                    width: '120px',
                    padding: '6px 8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                />
              )}
            </div>
          )}
        </div>
      ))}  </div>))}
</div>
{/* ProfitSettingsForm Popup */}
{showProfitSettings && (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    padding: '20px',
    zIndex: 1000,
    width: '400px',
    height: '300px',
  }}>
    <ProfitSettingsForm />
  </div>
)}
        {showProfitSettings && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={closePopup}
        ></div>
      )}
        <div
  style={{
    display: 'flex', // Arrange buttons in a row
    justifyContent: 'flex-end', // Align buttons to the left
    gap: '1px', // Reduce the space between the buttons
    marginRight: '15px', // Add some space below the buttons
  }}
>
  <button
    type="button"
    style={{
      ...cancelButtonStyle,
      backgroundColor: '#3e3ccf',
      color: 'white',
    }}
    onClick={onClose}
  >
    Cancel
  </button>
  <button
    type="submit"
    style={{
      ...saveButtonStyle,
      backgroundColor: '#3e3ccf',
      color: 'white',
    }}
  >
    Save
  </button>
  
</div>
      </form>
    </section>
  );
};

// const InputField: React.FC<{
//   name: string;
//   placeholder: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }> = ({ name, placeholder, value, onChange }) => (
//   <div style={inputWrapperStyle}>
//     <label htmlFor={name} style={labelStyle}>
//       {placeholder}
//     </label>
//     {/* Vertical blue line */}
//     <div style={verticalLineStyle}></div>
//     <input
//       id={name}
//       name={name}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       style={inputStyle}
//       required
//     />
//   </div>
// );


// Styles
const settingsPanelStyle = {
  width: '90%', // Adjust the width percentage or use a fixed value like '800px'
  maxWidth: '1200px', // Optional: Set a maximum width for better responsiveness
  margin: '0 auto', // Center the section horizontally
  marginTop: '-50px', // Add a margin at the top
  padding: '20px',
  borderRadius: '8px',
};


const formStyle = {
  width: '140%', // Updated width to 120%
  maxWidth: '1584px', // Updated maxWidth based on 120% of 1320px
  marginLeft: '-220px', // Adjusted marginLeft to maintain alignment (optional)
  padding: '20px', // Optional: Add padding for better spacing
  backgroundColor: '#fff', // Optional: Add a background color
  borderRadius: '8px', // Optional: Add rounded corners
};

// const verticalLineStyle = {
//   width: '2px', // Thickness of the vertical line
//   height: '30px', // Height of the line (adjust as needed)
//   backgroundColor: '#5956f1', // Blue color for the line
//   margin: '0 0px', // Spacing between the line, label, and input
// };



// const checkboxGroupContainerStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '20px',
// };

// const buttonContainerStyle = {
//   display: 'flex',
//   justifyContent: 'space-between',
//   marginTop: '20px',
// };

const cancelButtonStyle = {
  backgroundColor: '#ff4d4d',
  padding: '10px 20px',
  border: 'none',
  color: 'white',
  borderRadius: '5px',
};

const saveButtonStyle = {
  backgroundColor: '#4caf50',
  padding: '10px 20px',
  border: 'none',
  color: 'white',
  borderRadius: '5px',
};


// const inputWrapperStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   width: '100%',
// };

// const labelStyle = {
//   display: 'inline-block',
//   width: '120px',
//   textAlign: 'right',
//   marginRight: '10px',
//   fontSize: '1rem',
//   whiteSpace: 'nowrap',
// };

// const inputStyle = {
//   padding: '8px',
//   width: '100%',
//   borderRadius: '5px',
//   border: '1px solid #ccc',
//   fontSize: '1rem',
// };

// const checkboxGroupStyle = {
//   marginBottom: '20px',
// };

// const checkboxItemStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   gap: '10px',
//   marginBottom: '10px',
// };

// const checkboxStyle = {
//   transform: 'scale(1.5)',
// };



export default SettingsPanel;
