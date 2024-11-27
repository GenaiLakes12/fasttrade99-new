

import React, { useState,useEffect } from 'react';
import Modal from 'react-modal';
//import { styles } from './marketOrdersStyles';

interface MarketOrdersFormProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (values: any) => void;
}

const MarketOrdersForm: React.FC<MarketOrdersFormProps> = ({ isOpen, onRequestClose, onSave }) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [selectedOrderType, setSelectedOrderType] = useState('');
  const [formValues, setFormValues] = useState({
    limitPriceAdjust: '',
    maxModifications: '',
    modificationTime: '',
    maxChaseLimit: ''
  });
  
  
  const [forceExecute, setForceExecute] = useState(false);

  const getOrderTypeDescription = () => {
    switch (selectedOrderType) {
      case 'BidAsk':
        return 'Limit Price will be derived using the current Bid & Ask data by applying some buffer. If Bid/Ask is not avalable with Broker Feed then LTP will be used with some higher buffer. Limit Price Adjust can also be applied';
      case 'PriceSpread':
        return 'Limit Price will be derived using the Current LTP by applying the "Limit Price Adjust" Mentioned above.Price Adjust can be in Point/%/Negative. Eg If LTP is 500 and adjust was mentioned as 10% then for Buy Limit Price would be 550.';
      case 'BidAskAgressive':
        return 'Limit Price will be derived using the best Bid & Ask data by applying some nominal buffer If Bid/Ask is not available from Feed then LTP will be used with slightly higher buffer "Limit Price Adjust" can also be applied.';
      case 'BidAskkeepOnTop':
        return 'In this MTI will try to keep you on the Top of the Bid for Buy and Ask for the Sell However you can use Limit Price Adjust to adjust the price further';
      default:
        return '';
    }
  };

  const handleMarketOrdersCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setIsCheckboxChecked(newValue);
    setForceExecute(newValue); // Sync with Market Orders checkbox
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          width: "600px", //initially 530px
          maxWidth: "100%",
          height: "auto",
          margin: "20px auto",
          display: "flex",
          flexDirection: "column",
          background: "white",
          borderRadius: "10px",
          padding: "0px",
          position: "relative",
          transform: "translateY(-5%)",
        },
      }}    >
      
      <div style={{
        color: "white",
        backgroundColor: "#32406D",
        width: "100%",
        padding: "10px",
        textAlign: "center",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
      }}>
        MTI BRIDGE
      </div>
        <div style={{ padding: "15px" }}>
          <h5 style={{ fontSize: "14px", color: "orange", marginBottom: "15px" }}>
            SET IF "MARKET" ORDERS ARE NOT ALLOWED FOR THE STRATEGY
          </h5>

          <div style={{ marginBottom: "15px" }}>
            If this is set then MTI will Internally change all MARKET orders to the LIMIT orders as per the below settings for the Selected Strategy
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <input
              type="checkbox"
              checked={isCheckboxChecked}
              onChange={handleMarketOrdersCheck}
              style={{ marginRight: "10px", accentColor: "green" }}
            />
            <span>Market Orders are not Allowed</span>
          </div>

          {isCheckboxChecked && (
            <>
              <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
                <div style={{ flex: 2 }}>
                  <label style={{ color: "#32406D", fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                    Limit Price Selection Based on Order Type:
                  </label>
                  <select
                    value={selectedOrderType}
                    onChange={(e) => setSelectedOrderType(e.target.value)}
                    style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid gray" }}
                  >
                    <option value="" disabled>Select</option>
                    <option value="BidAsk">BidAsk</option>
                    <option value="PriceSpread">PriceSpread</option>
                    <option value="BidAskAgressive">BidAskAgressive</option>
                    <option value="BidAskkeepOnTop">BidAsk_keepOnTop</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ color: "#32406D", fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                    Limit Price Adjust:
                  </label>
                  <input
                    type="text"
                    value={formValues.limitPriceAdjust}
                    onChange={(e) => setFormValues({ ...formValues, limitPriceAdjust: e.target.value })}
                    style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid gray" }}
                  />
                </div>
              </div>

              <div style={{ color: "purple", fontWeight: "bold", textAlign: "center", marginBottom: "15px" }}>
                (Limit Price can be Negative, In Points or % Eg 1,0.2%,-0.10 etc)
              </div>

              {selectedOrderType && (
                <div style={{ marginBottom: "15px" }}>
                  {getOrderTypeDescription()}
                </div>
              )}

              <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
                <div>
                  <label style={{ color: "#32406D", fontWeight: "bold", marginRight: "10px" }}>
                    Max Modifications
                  </label>
                  <input
                    type="number"
                    value={formValues.maxModifications}
                    onChange={(e) => setFormValues({ ...formValues, maxModifications: e.target.value })}
                    style={{ width: "60px", padding: "5px", borderRadius: "5px", border: "1px solid gray" }}
                  />
                </div>
                <div>
                  <label style={{ color: "#32406D", fontWeight: "bold", marginRight: "10px" }}>
                    Modification time in seconds
                  </label>
                  <input
                    type="number"
                    value={formValues.modificationTime}
                    onChange={(e) => setFormValues({ ...formValues, modificationTime: e.target.value })}
                    style={{ width: "60px", padding: "5px", borderRadius: "5px", border: "1px solid gray" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <input
                  type="checkbox"
                  checked={forceExecute}
                  onChange={(e) => setForceExecute(e.target.checked)}
                  style={{ marginRight: "10px", accentColor: "green" }}
                />
                <span>Force Execute On that Last Attempt</span>
              </div>

              <div style={{ marginBottom: "15px" }}>
                After specified time, MTI will check for the Order and if that is still not filled then it will re-modify the order as per above selection. If you don't want modifications then set Max Modifications as 0
              </div>

              <div style={{ display: "flex", gap: "20px", marginBottom: "15px", alignItems: "center" }}>
                <div>
                  <label style={{ color: "#32406D", fontWeight: "bold", marginRight: "10px" }}>
                    Max Chase Limit
                  </label>
                  <input
                    type="number"
                    value={formValues.maxChaseLimit}
                    onChange={(e) => setFormValues({ ...formValues, maxChaseLimit: e.target.value })}
                    style={{ width: "60px", padding: "5px", borderRadius: "5px", border: "1px solid gray" }}
                  />
                </div>
                <div style={{ color: "purple", fontWeight: "bold" }}>
                  (Can be in Points or % Eg 1,0.2% etc)
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                If Specified then MTI will stop modifying the Order if the price is moved beyond the chasing limit specified can be very helpful where the market moves very sharply and continuous modification can give fill at the worst
              </div>

              <div style={{ color: "orange", textAlign: "center", marginBottom: "15px" }}>
                These all Settings will be applicable only when Original Order was MARKET and MTI converts that to LIMIT.
              </div>
            </>
          )}

          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "20px",
            marginTop: "10px",
            marginBottom: "10px" 
          }}>
            <button
              onClick={() => onSave({ ...formValues, isCheckboxChecked, selectedOrderType, forceExecute })}
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "8px 20px",
                cursor: "pointer"
              }}
            >
              OK
            </button>
            <button
              onClick={onRequestClose}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "8px 20px",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
  );
};

export default MarketOrdersForm;