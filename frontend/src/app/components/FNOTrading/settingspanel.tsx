import React, { useState } from 'react';

const AddNewBankNifty = ({ onCancel }) => {
  const initialFormData = {
    exchange: 'NIFTY',
    expiry: '22/12/2024', // Corrected date field
    defaultLots: 2,
    predefinedStrategy: 'Custom',
    strikeSelection: 'Relative',
    underlying: 'Spot',
    priceType: 'LTP',
    strikeStep: 50,
    cepe: 'CE',
    lots: 2,
    entryExpiry: '28/05/2024', // Entry expiry added
    strike: 'ATM',
    target: 'Premium',
    tgValue: 4,
    trailTgt: '0-0-0-0', // Added missing field from trail target
    stoploss: 'Premium',
    trailSl: 0,
    slValue: 4,
    slWait: 4,
    product: 'NRML',
    strategyTag: 'NIFTYS',
    qtyByExposure: 0,
    maxLots: 0,
    premiumGap: 0,
    runOnDays: 'Monday', // Days option included
    startTime: '09:20:00',
    endTime: '16:15:00',
    sqOffTime: '15:10:00',
    portfolioExecutionMode: 'Manual', // Added new field
    entryOrderType: 'NRML',
    optionPortfolioName: 'S_NIFTY_CE',
    remarks: ''
  };

  const initialLegs = [
    {
      cepe: 'CE',
      lots: 2,
      entryExpiry: '28/05/2024',
      strike: 'ATM',
      target: 'Premium',
      tgValue: 4,
      trailTgt: '0-0-0-0',
      stoploss: 'Premium',
      trailSl: 0,
      slValue: 4,
      slWait: 4,
    },
  ];

  const [formData, setFormData] = useState(initialFormData);
  const [legs, setLegs] = useState(initialLegs);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLegChange = (index, e) => {
    const newLegs = [...legs];
    newLegs[index][e.target.name] = e.target.value;
    setLegs(newLegs);
  };

  const handleAddLeg = () => {
    setLegs([
      ...legs,
      {
        cepe: 'CE',
        lots: 2,
        entryExpiry: '28/05/2024',
        strike: 'ATM',
        target: 'Premium',
        tgValue: 4,
        trailTgt: '0-0-0-0',
        stoploss: 'Premium',
        trailSl: 0,
        slValue: 4,
        slWait: 4,
      },
    ]);
  };

  const removeLeg = (index) => {
    const updatedLegs = legs.filter((_, i) => i !== index);
    setLegs(updatedLegs);
  };

  const handleSave = () => {
    console.log(formData); // Save action (you can replace with actual logic)
  };

  // New function to handle cancel action
  const handleCancel = () => {
    setFormData(initialFormData); // Reset form data to initial state
    setLegs(initialLegs); // Reset legs to initial state
    onCancel(); // Call the onCancel prop function if provided
  };

  return (
    <div className="add-bank-nifty">
<div className="header" style={{ backgroundColor: '#d6e0df', height: '80px', padding: '5px 15px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <h3 style={{ margin: '0', fontSize: '16px', display: 'flex', alignItems: 'center' }}>
        <span className="icon-container" style={{ marginRight: '5px' }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="skyblue"
                strokeWidth="2"
            >
                <line x1="4" y1="18" x2="4" y2="12" /> {/* Short line */}
                <line x1="12" y1="18" x2="12" y2="8" /> {/* Medium line */}
                <line x1="20" y1="18" x2="20" y2="4" /> {/* Tall line */}
            </svg>
        </span>
        ADD NEW BANKNIFTY001
    </h3>
    <div className="premium-info" style={{ marginTop: '2px', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
        <span>NIFTY 50: 21329.40</span>
        <span style={{ marginLeft: '10px' }}>Pay Premium: 1234.00</span>
        <span style={{ marginLeft: '10px' }}>Lot Size: 50</span>
    </div>
    <button className="add-leg" onClick={handleAddLeg} style={{ marginTop: '2px', padding: '4px 8px', fontSize: '12px', height: '28px' }}>
        + ADD LOG
    </button>
</div>

      <div className="form-section">
        {/* Portfolio Settings */}
       <div className="row" style={{ padding: '10px 0', marginBottom: '10px' }}>
    <div className="form-box" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {/** Each column should take up space flexibly */}
        <div className="col" style={{ flex: '1 1 150px', marginRight: '10px' }}>
            <label style={{ fontSize: '12px' }}>Exchg</label>
            <select name="exchange" value={formData.exchange} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px', fontSize: '12px', height: '30px' }}>
                <option value="NIFTY">NIFTY</option>
            </select>
        </div>
        <div className="col" style={{ flex: '1 1 150px', marginRight: '10px' }}>
            <label style={{ fontSize: '12px' }}>Expiry</label>
            <input type="date" name="expiry" value={formData.expiry} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px', fontSize: '12px', height: '30px' }} />
        </div>
        <div className="col" style={{ flex: '1 1 150px', marginRight: '10px' }}>
            <label style={{ fontSize: '12px' }}>Default Lots</label>
            <input type="number" name="defaultLots" value={formData.defaultLots} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px', fontSize: '12px', height: '30px' }} />
        </div>
        <div className="col" style={{ flex: '1 1 150px', marginRight: '10px' }}>
            <label style={{ fontSize: '12px' }}>Predefined Strategies</label>
            <select name="predefinedStrategy" value={formData.predefinedStrategy} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px', fontSize: '12px', height: '30px' }}>
                <option value="Custom">Custom</option>
            </select>
        </div>
        <div className="col" style={{ flex: '1 1 150px', marginRight: '10px' }}>
            <label style={{ fontSize: '12px' }}>Strike Selection</label>
            <select name="strikeSelection" value={formData.strikeSelection} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px', fontSize: '12px', height: '30px' }}>
                <option value="Relative">Relative</option>
            </select>
        </div>
        <div className="col" style={{ flex: '1 1 150px', marginRight: '10px' }}>
            <label style={{ fontSize: '12px' }}>Underlying</label>
            <select name="underlying" value={formData.underlying} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px', fontSize: '12px', height: '30px' }}>
                <option value="Spot">Spot</option>
            </select>
        </div>
        <div className="col" style={{ flex: '1 1 150px', marginRight: '10px' }}>
            <label style={{ fontSize: '12px' }}>Price Type</label>
            <select name="priceType" value={formData.priceType} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px', fontSize: '12px', height: '30px' }}>
                <option value="LTP">LTP</option>
            </select>
        </div>
        <div className="col" style={{ flex: '1 1 150px' }}>
            <label style={{ fontSize: '12px' }}>Strike Step</label>
            <input type="number" name="strikeStep" value={formData.strikeStep} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px', fontSize: '12px', height: '30px' }} />
        </div>
    </div>
</div>

        {/* Options Leg Section */}
        <div className="row">
        <div className="form-box">
          <div className="col">
            <label>CE/PE</label>
            <select name="cepe" value={formData.cepe} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}>
              <option value="CE">CE</option>
              <option value="PE">PE</option>
            </select>
          </div>
          <div className="col">
            <label>Lots</label>
            <input type="number" name="lots" value={formData.lots} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }} />
          </div>
          <div className="col">
            <label>Entry Expiry</label>
            <input type="date" name="entryExpiry" value={formData.entryExpiry} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }} />
          </div>
          <div className="col">
            <label>Strike</label>
            <select name="strike" value={formData.strike} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}>
              <option value="ATM">ATM</option>
            </select>
          </div>
          <div className="col">
            <label>Target</label>
            <select name="target" value={formData.target} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <div className="col">
            <label>TG Value</label>
            <input type="number" name="tgValue" value={formData.tgValue} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }} />
          </div>
          <div className="col">
    <label>Trail Tgt</label>
    <input type="text" name="trailTgt" value={formData.trailTgt} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }} />
  </div>
  <div className="col">
    <label>Stoploss</label>
    <select name="stoploss" value={formData.stoploss} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}>
      <option value="Premium">Premium</option>
    </select>
  </div>
  <div className="col">
    <label>Trail SL</label>
    <input type="number" name="trailSl" value={formData.trailSl} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }} />
  </div>
  <div className="col">
    <label>SL Value</label>
    <input type="number" name="slValue" value={formData.slValue} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }} />
  </div>
  <div className="col">
    <label>SL Wait</label>
    <input type="number" name="slWait" value={formData.slWait} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}/>
  </div>
  </div>
        </div>


        {/* Render Options Leg Sections */}
        {legs.map((leg, index) => (
         <div
  key={index}
  className="options-leg"
  style={{ border: '2px solid #b4c1c0', borderRadius: '5px',padding: '10px', paddingLeft: '20px'  }} // Added styling
>
<div className="options-leg-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h4 style={{ margin: 0 }}>Options Log {index + 1}</h4>
    <button className="remove-leg" onClick={() => removeLeg(index)}>X</button>
    </div>
            <div className="row">
              <div className="col">
                <label>CE/PE</label>
                <select
                  name="cepe"
                  value={leg.cepe}
                  onChange={(e) => handleLegChange(index, e)}
                  style={{  border: '2px solid #b4c1c0', borderRadius: '5px' }}
                >
                  <option value="CE">CE</option>
                  <option value="PE">PE</option>
                </select>
              </div>
              <div className="col">
                <label>Lots</label>
                <input
                  type="number"
                  name="lots"
                  value={leg.lots}
                  onChange={(e) => handleLegChange(index, e)}
                  style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}
                />
              </div>
              <div className="col">
                <label>Entry Expiry</label>
                <input
                  type="date"
                  name="entryExpiry"
                  value={leg.entryExpiry}
                  onChange={(e) => handleLegChange(index, e)}
                  style={{ border: '2px solid #b4c1c0', borderRadius: '5px'  }}
                />
              </div>
              <div className="col">
                <label>Strike</label>
                <select
                  name="strike"
                  value={leg.strike}
                  onChange={(e) => handleLegChange(index, e)}
                  style={{  border: '2px solid #b4c1c0', borderRadius: '5px'  }}
                >
                  <option value="ATM">ATM</option>
                </select>
              </div>
              <div className="col">
                <label>Target</label>
                <select
                  name="target"
                  value={leg.target}
                  onChange={(e) => handleLegChange(index, e)}
                  style={{ border: '2px solid #b4c1c0', borderRadius: '5px'  }}
                >
                  <option value="Premium">Premium</option>
                </select>
              </div>
              <div className="col">
                <label>TG Value</label>
                <input
                  type="number"
                  name="tgValue"
                  value={leg.tgValue}
                  onChange={(e) => handleLegChange(index, e)}
                  style={{  border: '2px solid #b4c1c0', borderRadius: '5px'  }}
                />
              </div>
              <div className="col">
                <label>Trail Tgt</label>
                <input
                  type="text"
                  name="trailTgt"
                  value={leg.trailTgt}
                  onChange={(e) => handleLegChange(index, e)}
                  style={{  border: '2px solid #b4c1c0', borderRadius: '5px'  }}
                />
              </div>
              <div className="col">
                <label>Stoploss</label>
                <select
                  name="stoploss"
                  value={leg.stoploss}
                  onChange={(e) => handleLegChange(index, e)}
                  style={{ border: '2px solid #b4c1c0', borderRadius: '5px'  }}
                >
                  <option value="Premium">Premium</option>
                </select>
              </div>
              <div className="col">
                <label>Trail SL</label>
                <input
                  type="number"
                  name="trailSl"
                  value={leg.trailSl}
                  onChange={(e) => handleLegChange(index, e)}
                  style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}
                />
              </div>
              <div className="col">
                <label>SL Value</label>
                <input
                  type="number"
                  name="slValue"
                  value={leg.slValue}
                  onChange={(e) => handleLegChange(index, e)}
                  style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}
                />
              </div>
              <div className="col">
                <label>SL Wait</label>
                <input
                  type="number"
                  name="slWait"
                  value={leg.slWait}
                  onChange={(e) => handleLegChange(index, e)}
                  style={{  border: '2px solid #b4c1c0', borderRadius: '5px'  }}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Execution Parameters */}
        {/* Execution Parameters */}
<div className="execution-parameters">
<button style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: '20px' }}> Execution Parameters</button>
  <button style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: '20px' }}>Target Settings</button>
  <button style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: '20px' }}>Stopless Settings</button>
  <button style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: '20px' }}>Exit Settings</button>


  <div className="row">
  <div className="form-box">
    <div className="col">
      <label>Product</label>
      <select name="product" value={formData.product} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}>
        <option value="NRML">NRML</option>
      </select>
    </div>
    <div className="col">
      <label>Strategy Tag</label>
      <select name="strategyTag" value={formData.strategyTag} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0' , borderRadius: '5px'}}>
        <option value="NIFTYS">NIFTYS</option>
      </select>
    </div>
    <div className="col">
      <label>Qty By Exposure</label>
      <input type="number" name="qtyByExposure" value={formData.qtyByExposure} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }} />
    </div>
    <div className="col">
      <label>Max Lots</label>
      <input type="number" name="maxLots" value={formData.maxLots} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}/>
    </div>
    <div className="col">
      <label>Premium Gap</label>
      <input type="number" name="premiumGap" value={formData.premiumGap} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }} />
    </div>
    <div className="col">
      <label>Run On Days</label>
      <select name="runOnDays" value={formData.runOnDays} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        {/* Add more days */}
      </select>
    </div>
    <div className="col">
      <label>Start Time</label>
      <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}/>
    </div>
    <div className="col">
      <label>End Time</label>
      <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0' , borderRadius: '5px'}}/>
    </div>
    <div className="col">
      <label>SqOff Time</label>
      <input type="time" name="sqOffTime" value={formData.sqOffTime} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}/>
    </div>
    <div className="col">
      <label>Portfolio Execution Mode</label>
      <select name="portfolioExecutionMode" value={formData.portfolioExecutionMode} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0' , borderRadius: '5px'}}>
        <option value="Manual">Manual</option>
        <option value="Automated">Automated</option>
      </select>
    </div>
    <div className="col">
      <label>Entry Order Type</label>
      <select name="entryOrderType" value={formData.entryOrderType} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}>
        <option value="NRML">NRML</option>
      </select>
    </div>
  </div>
  </div>
</div>


        {/* Time Management */}
        <div className="time-management">
          <h4>Time Management</h4>
          <div className="row">
          <div className="form-box">
            <div className="col">
              <label>Run On Days</label>
              <select name="runOnDays" value={formData.runOnDays} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                {/* Add more days */}
              </select>
            </div>
            <div className="col">
              <label>Start Time</label>
              <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }} />
            </div>
            <div className="col">
              <label>End Time</label>
              <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }}/>
            </div>
            <div className="col">
              <label>SqOff Time</label>
              <input type="time" name="sqOffTime" value={formData.sqOffTime} onChange={handleInputChange}style={{ border: '2px solid #b4c1c0', borderRadius: '5px' }} />
            </div>
          </div>
          </div>
        </div>
        <div className="row">
        <div className="form-box">
    <div className="col">
      <label>Remarks</label>
      <textarea
        name="remarks"
        value={formData.remarks}
        onChange={handleInputChange}
        rows="3"
        placeholder="Add your remarks here..."
      />
    </div>
  </div>
  </div>

  {/* Option Portfolio Name Field */}
  <div className="row">
  <div className="form-box">
    <div className="col">
      <label>Option Portfolio Name</label>
      <input
        type="text"
        name="optionPortfolioName"
        value={formData.optionPortfolioName}
        onChange={handleInputChange}
        placeholder="Enter option portfolio name"
      />
    </div>
  </div>
  </div>
        {/* Footer Section */}
        <div className="footer">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
          </div>
      </div>

      {/* CSS Styling */}
      <style jsx>{`
        .add-bank-nifty {
          padding: 10px;
          background-color: white;
          border-radius: 5px;
        }
         .header h3 {
  font-weight: bold; /* Makes the heading bold */
  font-size: 24px; /* Increased font size */
  display: flex;
  align-items: center;
  
}
}
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background-color: black;
          padding: 10px;
        }
        .premium-info span {
          margin-right: 15px;
        }
       .add-leg {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  position: absolute;
  top:230px;  /* Adjust as needed */
  right: 30px; /* Adjust as needed */
}

        .form-section {
          margin-top: 20px;
        }
          .premium-info {
  margin-top: 10px; /* Add margin to create space below the heading */
        }
        .row {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 15px;
        }
          .icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px; /* Adjust as needed */
  height: 40px; /* Adjust as needed */
  border-radius: 50%; /* Circular shape */
  background-color: white; /* Circle background color */
  border: 2px solid #91cde1; /* Border color */
  margin-right: 8px; /* Space between icon and heading */
}
          .execution-parameters button {
  font-size: 1rem; /* Adjust font size */
  padding: 0; /* Remove padding */
  color: inherit; /* Inherit text color */
}
          .form-box {
  border: 1px solid #8ff4f1; /* Box border */
  border-radius: 5px; /* Rounded corners (optional) */
  padding: 10px; /* Padding inside the box */
  display: flex; /* Use flexbox for layout */
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  gap: 10px; /* Space between items */
  width: 100%; /* Set the width to 100% */
}

       .col {
  flex: 1 1 auto; /* Allows columns to shrink and grow */
  min-width: 120px; /* Minimum width for each item */
}
        .col label {
          display: block;
          margin-bottom: 5px;
        }
        .col select,
        .col input {
          width: 150px;
          padding: 5px;
        }
        .execution-parameters {
          margin-top: 20px;
        }
        .footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }
        .footer button {
          margin-left: 10px;
          padding: 8px 15px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default AddNewBankNifty;
