'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { FaTrash, FaBan, FaPencilAlt, FaSignOutAlt } from 'react-icons/fa';
import ProfitSettingsForm from '../ProfitSettingsForm';
import MarketOrdersForm from '../MarketOrdersForm';
import axios from 'axios';
export default function AddStrategyForm() {
  const router = useRouter();
  const [activeInput, setActiveInput] = useState('');
  const [showProfitSettings, setShowProfitSettings] = useState(false);
  const [showMarketOrders, setShowMarketOrders] = useState(false);
  const [showTradingAccountPopup, setShowTradingAccountPopup] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState('');

  const searchParams = new URLSearchParams(window.location.search);
  const strategyToEdit = useMemo(() => {
    if (typeof window !== 'undefined') {
      const strategyData = new URLSearchParams(window.location.search).get('strategyData');
      if (strategyData) {
        const parsedData = JSON.parse(decodeURIComponent(strategyData));
        console.log('Parsed Strategy Data:', parsedData);
        return parsedData;
      }
    }
    return null;
  }, []);



  const tradingAccounts = [
    { id: '1', userId: 'USER123', alias: 'John Doe', multiplier: '1x', broker: 'AngelOne', margin: '₹50,000' },
    { id: '2', userId: 'USER456', alias: 'Jane Smith', multiplier: '2x', broker: 'FlatTrade', margin: '₹75,000' },
    { id: '3', userId: 'USER789', alias: 'Mike Johnson', multiplier: '3x', broker: 'Finvasia', margin: '₹100,000' },
  ];



  const [formData, setFormData] = useState({
    // Strategies
    action: '0',  //change and check
    manualSquareOff: '0', //change and check
    strategy_tag: '0',
    pAndL: '0',
    tradeSize: '0',
    duplicateSignalPrevention: '0', //input fields if empty it takes value 0

    // Risk & Reward
    openTime: '00:00:00',
    closeTime: '00:00:00',
    sqOffTime: '00:00:00',
    tradingAccount: '',  //dropdown should change as a popup with values coming from UserProfile 
    // broker_user_id: '0',
    maxProfit: '0',
    maxLoss: '0',
    maxLossWaitTime: '00:00:00',

    // Exit
    profitLocking: '0',
    // marketOrders: '0',
    delayBetweenUsers: '0',
    uniqueIdReqForOrder: false, //checkboxes
    cancelPreviousOpenSignal: false,
    stopAndReverse: false,
    partMultiExists: false,
    holdSellSeconds: '0',

    // Authorization
    allowedTrades: 'both', //dropdown
    entryOrderRetry: false,
    entryRetryCount: '0',
    entryRetryWaitSeconds: '0',
    exitOrderRetry: false,
    exitRetryCount: '0',

    // Information
    exitRetryWaitSeconds: '0',
    exitMaxWaitSeconds: '0',
    sqOffDone: false,
    delta: '0',
    theta: '0',
    vega: '0'
  });

  const handleInputFocus = (field) => {
    setActiveInput(field);
    if (formData[field] === '0') {
      setFormData({ ...formData, [field]: '' });  //If the input is 0, set it to an empty string
    }
  };

  const handleInputBlur = (field) => {
    setActiveInput('');
    if (formData[field] === '') {
      setFormData({ ...formData, [field]: '0' }); //If the input is empty, set it to 0
    }
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const [initialData, setInitialData] = useState(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const editMode = params.get('editMode') === 'true';
      setIsEditMode(editMode);

      const strategyData = params.get('strategyData');
      if (strategyData) {
        const parsedData = JSON.parse(decodeURIComponent(strategyData));
        setFormData(parsedData);
        setInitialData(parsedData); // Store the original data for comparison
      }
    }
  }, []);

  // const handleConfirmStrategy = async () => {  //backend call
  //   try {
  //     // Send the form data to the backend API endpoint to store the strategy information with broker and user information
  //     const response = await axios.post("http://127.0.0.1:8000/api/strategies/store_broker_and_strategy_info", { formData });
  //     alert(response.data.message);
  //   } catch (error) {
  //     console.error("Error confirming strategy:", error);
  //     alert("Failed to confirm adding strategy. Please try again.");
  //   }
  // };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //After submitting the form data, confirm the strategy and navigate to the Strategies page
    //await handleConfirmStrategy(); 

    const existingStrategies = JSON.parse(localStorage.getItem('strategies') || '[]');

    if (isEditMode && initialData?.index !== undefined) {
      // Update existing strategy by index
      existingStrategies[initialData.index] = { ...formData, index: initialData.index };
    }

    else {
      // Add new strategy
      existingStrategies.push({ ...formData, index: existingStrategies.length });
    }

    localStorage.setItem('strategies', JSON.stringify(existingStrategies));
    router.push('/components/Strategies');
  };

  const formatTime = (timeString: string) => {
    if (timeString === '0' || !timeString) return '00:00:00';
    return timeString;
  };


  const renderActionButtons = () => (
    <div className={styles.formGroup}>
      <label>ACTION</label>
      <div className={styles.input}>
        <div className={styles.actionButtons}>
          <button type="button" style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#ff4444',
            padding: '8px 15px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#ddd',
            borderRadius: '4px'
          }} >
            <FaBan />
          </button>
          <button type="button" style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#4d4b47',
            padding: '8px 15px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#ddd',
            borderRadius: '4px'
          }}>
            <FaSignOutAlt />
          </button>
          <button type="button" style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#ff4444',
            padding: '8px 15px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#ddd',
            borderRadius: '4px'
          }}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );

  const renderManualSquareOff = () => (
    <div className={styles.formGroup}>
      <label>MANUAL SQUARE OFF</label>
      <div className={styles.input}>
        <button type="button" style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#4d4b47',
          padding: '8px 15px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#ddd',
          borderRadius: '4px'
        }} >
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );

  const renderTradingAccountField = () => (
    <div className={styles.formGroup}>
      <label>TRADING ACCOUNT</label>
      <div
        className={styles.clickableValue}
        onClick={() => setShowTradingAccountPopup(true)}
      >
        {/* {selectedAccount || 'Select Trading Account'} */}
        {selectedAccounts.length > 0 ? `${selectedAccounts.length} accounts selected` : ''}
      </div>

      {showTradingAccountPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <div className={styles.popupHeader}>
              <h3>Select User(s) for Strategies - {formData.strategy_tag}</h3>
              <button
                onClick={() => setShowTradingAccountPopup(false)}
                className={styles.closeButton}
              >
                ×
              </button>
            </div>

            <div className={styles.accountsGrid}>
              <div className={styles.gridHeader}>
                <div>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const allUserIds = tradingAccounts.map(account => account.userId);
                      setSelectedAccounts(e.target.checked ? allUserIds : []);
                    }}
                    checked={selectedAccounts.length === tradingAccounts.length}
                  />
                </div>
                <div>USER ID</div>
                <div>ALIAS</div>
                <div>MULTIPLIER</div>
                <div>BROKER</div>
                <div>MARGIN</div>
                
              </div>
              {tradingAccounts.map((account) => (
                <div key={account.id} className={styles.gridRow}>
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedAccounts.includes(account.userId)}
                      onChange={(e) => {
                        setSelectedAccounts(prev =>
                          e.target.checked
                            ? [...prev, account.userId]
                            : prev.filter(id => id !== account.userId)
                        );
                      }}
                    />
                  </div>
                  <div>{account.userId}</div>
                  <div>{account.alias}</div>
                  <div>{account.multiplier}</div>
                  <div>{account.broker}</div>
                  <div>{account.margin}</div>


                </div>
              ))}

            </div>
            <div className={styles.popupFooter}>
              <button
                className={styles.closeBtn}
                onClick={() => setShowTradingAccountPopup(false)}
              >
                Close
              </button>
              <button
                className={styles.confirmBtn}
                onClick={() => {
                  setFormData({ ...formData, tradingAccount: selectedAccounts.join(',') });
                  setShowTradingAccountPopup(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderClickableInput = (field: string, label: string) => {
    const isTimeField = ['openTime', 'closeTime', 'sqOffTime', 'maxLossWaitTime'].includes(field);
    if (isTimeField) {
      return (
        <div className={styles.formGroup}>
          <label>{label}</label>
          {activeInput === field ? (
            <input
              type="time"
              step="1" // Enables seconds input
              value={formatTime(formData[field as keyof typeof formData])}
              onChange={(e) => {
                const timeValue = e.target.value || '00:00:00';
                setFormData({ ...formData, [field]: timeValue });
              }}
              onBlur={() => handleInputBlur(field)}
              autoFocus
              className={styles.in}
            />
          ) : (
            <div
              className={styles.clickableValue}
              onClick={() => handleInputFocus(field)}
            >
              {formatTime(formData[field as keyof typeof formData])}
            </div>
          )}
        </div>
      );
    }
    if (field === 'profitLocking') {
      return (
        <div className={styles.formGroup}>
          <label>{label}</label>
          <div
            className={styles.clickableValue}
            onClick={() => setShowProfitSettings(true)}
          >
            {formData[field] === '0' ? '' : formData[field]}
          </div>
          {showProfitSettings && (
            <ProfitSettingsForm
              onSave={(values) => {
                setFormData({
                  ...formData,
                  profitLocking: `${values.reach}-${values.lock}-${values.increase}-${values.trailBy}`
                });
              }}
              onClose={() => setShowProfitSettings(false)}
              initialValues={parseProfitLockingValues(formData.profitLocking)}
            />
          )}
        </div>
      );
    }
    if (field === 'marketOrders') {
      return (
        <div className={styles.formGroup}>
          <label>{label}</label>
          <div
            className={styles.clickableValue}
            onClick={() => setShowMarketOrders(true)}
          >
            {formData[field] ? `${formData[field].limitPriceAdjust}-${formData[field].maxModifications}-${formData[field].modificationTime}-${formData[field].maxChaseLimit}` : ''}
          </div>
          <MarketOrdersForm
            isOpen={showMarketOrders}
            onRequestClose={() => setShowMarketOrders(false)}
            onSave={(values) => {
              const displayValues = {
                ...values,
                displayString: `${values.limitPriceAdjust}-${values.maxModifications}-${values.modificationTime}-${values.maxChaseLimit}`
              };
              setFormData({
                ...formData,
                marketOrders: displayValues
              });
              setShowMarketOrders(false);
            }}
          />
        </div>
      );
    }


    return (
      <div className={styles.formGroup}>
        <label>{label}</label>
        {activeInput === field ? (
          <input
            type={isTimeField ? "time" : "text"}
            value={formData[field as keyof typeof formData]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            onBlur={() => handleInputBlur(field)}
            autoFocus
            className={styles.in}
          />
        ) : (
          <div
            className={styles.clickableValue}
            onClick={() => handleInputFocus(field)}
          >
            {isTimeField ? formatTime(formData[field as keyof typeof formData]) : formData[field as keyof typeof formData]}
          </div>
        )}
      </div>
    );
  };
  const parseProfitLockingValues = (value: string) => {
    if (value === '0') {
      return {
        reach: 10000,
        lock: 9000,
        increase: 5,
        trailBy: 50
      };
    }

    <input
      type="checkbox"
      className={styles.checkbox}
      checked={selectedAccounts.includes(account.userId)}
      onChange={(e) => {
        setSelectedAccounts(prev =>
          e.target.checked
            ? [...prev, account.userId]
            : prev.filter(id => id !== account.userId)
        );
      }}
    />
    const [reach, lock, increase, trailBy] = value.split('-').map(Number);
    return { reach, lock, increase, trailBy };
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Strategies Section */}
          <div className={styles.forminner}>
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>STRATEGIES</h3>
              <div className={styles.sectionGrid}>
                {renderActionButtons()}
                {renderManualSquareOff()}
                {renderClickableInput('strategy_tag', 'STRATEGY LABEL')}
                {renderClickableInput('pAndL', 'P&L')}
                {renderClickableInput('tradeSize', 'TRADE SIZE')}
                {renderClickableInput('duplicateSignalPrevention', 'DUPLICATE SIGNAL PREVENTION')}
              </div>
            </div>

            {/* Risk & Reward Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>RISK & REWARD</h3>
              <div className={styles.sectionGrid}>
                {renderClickableInput('openTime', 'OPEN TIME')}
                {renderClickableInput('closeTime', 'CLOSE TIME')}
                {renderClickableInput('sqOffTime', 'SQ OFF TIME')}
                {/* <div className={styles.formGroup}>
                  <label>TRADING ACCOUNT</label>
                  <div className={styles.input}>
                    <select
                      value={formData.tradingAccount}
                      onChange={(e) => setFormData({ ...formData, tradingAccount: e.target.value })}
                      className={styles.select}
                    >
                      <option value="">Select Account</option>
                      <option value="angelone">AngelOne</option>
                      <option value="flattrade">FlatTrade</option>
                      <option value="finvasia">Finvasia</option>
                    </select>
                  </div>
                </div> */}
                {/* {renderClickableInput('broker_user_id', 'BROKER USER ID')} */}
                {renderTradingAccountField()}
                {renderClickableInput('maxProfit', 'MAX PROFIT')}
                {renderClickableInput('maxLoss', 'MAX LOSS')}
                {renderClickableInput('maxLossWaitTime', 'MAX LOSS WAIT TIME')}
              </div>
            </div>

            {/* Exit Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>EXIT</h3>
              <div className={styles.sectionGrid}>
                {renderClickableInput('profitLocking', 'PROFIT LOCKING')}
                {renderClickableInput('marketOrders', 'MARKET ORDERS')}

                {renderClickableInput('delayBetweenUsers', 'DELAY BETWEEN USERS')}
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <span>UNIQUE ID REQ FOR ORDER</span>
                  </label>
                  <div className={styles.input}>
                    <input
                      type="checkbox"
                      checked={formData.uniqueIdReqForOrder}
                      onChange={(e) => setFormData({ ...formData, uniqueIdReqForOrder: e.target.checked })}
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <span>CANCEL PREVIOUS OPEN SIGNAL</span>
                  </label>
                  <div className={styles.input}>
                    <input
                      type="checkbox"
                      checked={formData.cancelPreviousOpenSignal}
                      onChange={(e) => setFormData({ ...formData, cancelPreviousOpenSignal: e.target.checked })}
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <span>STOP & REVERSE</span>
                  </label>
                  <div className={styles.input}>
                    <input
                      type="checkbox"
                      checked={formData.stopAndReverse}
                      onChange={(e) => setFormData({ ...formData, stopAndReverse: e.target.checked })}
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <span>PART/MULTI EXISTS</span>
                  </label>
                  <div className={styles.input}>
                    <input
                      type="checkbox"
                      checked={formData.partMultiExists}
                      onChange={(e) => setFormData({ ...formData, partMultiExists: e.target.checked })}
                    />
                  </div>
                </div>
                {renderClickableInput('holdSellSeconds', 'HOLD SELL SECONDS')}
              </div>
            </div>

            {/* Authorization Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>AUTHORIZATION</h3>
              <div className={styles.sectionGrid}>
                <div className={styles.formGroup}>
                  <label>ALLOWED TRADES</label>
                  <div className={styles.input}>
                    <select
                      value={formData.allowedTrades}
                      onChange={(e) => setFormData({ ...formData, allowedTrades: e.target.value })}
                      className={styles.select}
                    >
                      <option value="both">Both</option>
                      <option value="long">Long</option>
                      <option value="short">Short</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <span>ENTRY ORDER RETRY</span>
                  </label>
                  <div className={styles.input}>
                    <input
                      type="checkbox"
                      checked={formData.entryOrderRetry}
                      onChange={(e) => setFormData({ ...formData, entryOrderRetry: e.target.checked })}
                    />
                  </div>
                </div>
                {renderClickableInput('entryRetryCount', 'ENTRY RETRY COUNT')}
                {renderClickableInput('entryRetryWaitSeconds', 'ENTRY RETRY WAIT(SECONDS)')}
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <span>EXIT ORDER RETRY</span>
                  </label>
                  <div className={styles.input}>
                    <input
                      type="checkbox"
                      checked={formData.exitOrderRetry}
                      onChange={(e) => setFormData({ ...formData, exitOrderRetry: e.target.checked })}
                    />
                  </div>
                </div>
                {renderClickableInput('exitRetryCount', 'EXIT RETRY COUNT')}
              </div>
            </div>
            {/* Information Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>INFORMATION</h3>
              <div className={styles.sectionGrid}>
                {renderClickableInput('exitRetryWaitSeconds', 'EXIT RETRY WAIT (SECONDS)')}
                {renderClickableInput('exitMaxWaitSeconds', 'EXIT MAX WAIT (SECONDS)')}
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <span>SQ OFF DONE</span>
                  </label>
                  <div className={styles.input}>
                    <input
                      type="checkbox"
                      checked={formData.sqOffDone}
                      onChange={(e) => setFormData({ ...formData, sqOffDone: e.target.checked })}
                    />
                  </div>

                </div>
                {renderClickableInput('delta', 'DELTA')}
                {renderClickableInput('theta', 'THETA')}
                {renderClickableInput('vega', 'VEGA')}
              </div>
            </div>
          </div>
          <div className={styles.buttonGroup}>

            <button type="button" onClick={() => router.push('/components/Strategies')} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}



