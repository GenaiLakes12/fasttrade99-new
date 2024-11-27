'use client';
import React, { useState } from "react";
import { FaTrash, FaBan, FaPencilAlt,FaToggleOn, FaCheck } from 'react-icons/fa';
import TableHeader from "./TableHeader";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './tableStyle.css';
import { useRouter } from 'next/navigation';


const StrategiesTable = () => {
  const router = useRouter();
  const [strategies, setStrategies] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedStrategies = localStorage.getItem('strategies');
      return savedStrategies ? JSON.parse(savedStrategies) : [];
    }
    return [];
  });

 // const [editingStrategy, setEditingStrategy] = useState(null);

 

  

  // const handleDelete = async (strategy_tag: string, broker_user_id: string) => {
  //   try {
  //     alert(`${broker_user_id} ${strategy_tag}`);
  //     const response = await fetch(`http://127.0.0.1:8000/api/strategies/delete_strategy/${broker_user_id}/${strategy_tag}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });

  //     if (response.ok) {
  //       console.log('Strategy deleted successfully');
  //       alert('Strategy deleted successfully');
  //       const updatedStrategies = strategies.filter((_, i) => i !== strategy_tag);
  //       setStrategies(updatedStrategies);
  //       localStorage.setItem('strategies', JSON.stringify(updatedStrategies));
  //     }
  //   } catch (error) {
  //     console.error('Error deleting strategy:', error);
  //   }
  // };

  const handleDelete = (index: number) => {
    const updatedStrategies = strategies.filter((_, i) => i !== index);
    setStrategies(updatedStrategies);
    localStorage.setItem('strategies', JSON.stringify(updatedStrategies));
  };


  

  const handleRowClick = (strategy, index) => {
    console.log('Clicked on row:', strategy);
    const strategyWithIndex = { ...strategy, index }; // Attach the index
    router.push(
      `/components/Strategies/StrategiesForm?editMode=true&strategyData=${encodeURIComponent(
        JSON.stringify(strategyWithIndex)
      )}`
    );
  };
  

  // const handleEdit = (strategy, index) => {
  //   const strategyData = { ...strategy, index };
  //   router.push(
  //     `/components/Strategies/StrategiesForm?editMode=true&strategyData=${encodeURIComponent(
  //       JSON.stringify(strategyData)
  //     )}`
  //   );
  // };

  // const handleToggle = (index: number) => {
  //   const updatedStrategies = strategies.map((strategy, i) => {
  //     if (i === index) {
  //       return { ...strategy, isEnabled: !strategy.isEnabled };
  //     }
  //     return strategy;
  //   });
  //   setStrategies(updatedStrategies);
  //   localStorage.setItem('strategies', JSON.stringify(updatedStrategies));
  // };

  // const handleComplete = (index: number) => {
  //   const updatedStrategies = strategies.map((strategy, i) => {
  //     if (i === index) {
  //       return { ...strategy, isCompleted: true };
  //     }
  //     return strategy;
  //   });
  //   setStrategies(updatedStrategies);
  //   localStorage.setItem('strategies', JSON.stringify(updatedStrategies));
  // };

  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <TableHeader label="Strategy Label" />
            <TableHeader label="Trading Account" />
            {/* <TableHeader label="Broker User Id" /> */}
            <TableHeader label="Max Profit" />
            <TableHeader label="Max Loss" />
            <TableHeader label="Profit Locking" />
            <TableHeader label="Market Orders" />
            <TableHeader label="Actions" />
            {/* <TableHeader label="Strategy Label" /> */}
            <TableHeader label="P & L" />
            <TableHeader label="Trade Size" />
            <TableHeader label="Duplicate Signal Prevention" />
            <TableHeader label="Open Time" />
            <TableHeader label="Close Time" />
            <TableHeader label="SQ OFF Time" />
            <TableHeader label="Max Loss Wait Time" />
            <TableHeader label="Delay Between Users" />
            <TableHeader label="Unique ID REQ For Order" />
            <TableHeader label="Cancel Previous Open Signal" />
            <TableHeader label="Stop & Reverse" />
            <TableHeader label="Part / Multi Exits" />
            <TableHeader label="Hold Sell Seconds" />
            <TableHeader label="Allowed Trades" />
            <TableHeader label="Entry Order Retry" />
            <TableHeader label="Entry Retry Count" />
            <TableHeader label="Entry Retry Wait (Seconds)" />
            <TableHeader label="Exit Order Retry" />
            <TableHeader label="Exit Retry Count" />
            <TableHeader label="Exit Retry Wait (Seconds)" />
            <TableHeader label="Exit Max Wait (Seconds)" />
            <TableHeader label="SQ OFF Done" />
            <TableHeader label="Delta" />
            <TableHeader label="Theta" />
            <TableHeader label="Vega" />
          </tr>
        </thead>
        <tbody>
          {strategies.map((strategy, index) => (
            <tr key={index} onClick={() => handleRowClick(strategy, index)} style={{ cursor: 'pointer' }}>

            
              <td>{strategy.strategy_tag}</td>
              <td>{strategy.tradingAccount}</td>
              {/* <td>{strategy.broker_user_id}</td> */}
              <td>{strategy.maxProfit}</td>
              <td>{strategy.maxLoss}</td>
              <td>{strategy.profitLocking}</td>

              <td>
                {strategy.marketOrders ?
                  `${strategy.marketOrders.limitPriceAdjust}-${strategy.marketOrders.maxModifications}-${strategy.marketOrders.modificationTime}-${strategy.marketOrders.maxChaseLimit}`
                  : ''}
              </td>

              <td onClick={(e)=>e.stopPropagation()}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {/* <button 
                    onClick={() => handleEdit(strategy,index)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#4CAF50'
                    }}
                  >
                    <FaPencilAlt />
                  </button> */}
                  <button
                    //onClick={() => handleToggle(index)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#2196F3'  // Blue color for toggle
                    }}
                  >
                    <FaToggleOn />
                  </button>
                  <button
                    //onClick={() => handleComplete(index)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#4CAF50'  // Green color for complete
                    }}
                  >
                    <FaCheck />
                  </button>
                  <button
                    // onClick={() => handleDelete( strategy.strategy_tag,strategy.broker_user_id)}
                    onClick={() => handleDelete(index)}

                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#ff4444'
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
              {/* <td>{strategy.strategy_tag}</td> */}
              <td>{strategy.pAndL}</td>
              <td>{strategy.tradeSize}</td>
              <td>{strategy.duplicateSignalPrevention}</td>
              <td>{strategy.openTime}</td>
              <td>{strategy.closeTime}</td>
              <td>{strategy.sqOffTime}</td>
              <td>{strategy.maxLossWaitTime}</td>
              <td>{strategy.delayBetweenUsers}</td>
              <td>{strategy.uniqueIdReqForOrder ? 'Yes' : 'No'}</td>
              <td>{strategy.cancelPreviousOpenSignal ? 'Yes' : 'No'}</td>
              <td>{strategy.stopAndReverse ? 'Yes' : 'No'}</td>
              <td>{strategy.partMultiExists ? 'Yes' : 'No'}</td>
              <td>{strategy.holdSellSeconds}</td>
              <td>{strategy.allowedTrades}</td>
              <td>{strategy.entryOrderRetry ? 'Yes' : 'No'}</td>
              <td>{strategy.entryRetryCount}</td>
              <td>{strategy.entryRetryWaitSeconds}</td>
              <td>{strategy.exitOrderRetry ? 'Yes' : 'No'}</td>
              <td>{strategy.exitRetryCount}</td>
              <td>{strategy.exitRetryWaitSeconds}</td>
              <td>{strategy.exitMaxWaitSeconds}</td>
              <td>{strategy.sqOffDone ? 'Yes' : 'No'}</td>
              <td>{strategy.delta}</td>
              <td>{strategy.theta}</td>
              <td>{strategy.vega}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StrategiesTable;
