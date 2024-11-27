// pages/index.js
import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow rounded-md overflow-hidden">
        {/* Table Heading */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">BANKNIFTY001</h2>
        </div>

        {/* Main Table */}
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">SNO</th>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">SQOFF</th>
              <th className="p-3 text-left">IDLE</th>
              <th className="p-3 text-left">EXECUTE</th>
              <th className="p-3 text-left">PART ENTRY/EXIT</th>
              <th className="p-3 text-left">EXCHANGE SYMBOL</th>
              <th className="p-3 text-left">TXN</th>
              <th className="p-3 text-left">LOTS</th>
              <th className="p-3 text-left">TARGET TYPR</th>
              <th className="p-3 text-left">TARGET VALUE</th>
              <th className="p-3 text-left">PROFIT/LOSS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3">1</td>
              <td className="p-3">2492</td>
              <td className="p-3">⚙</td>
              <td className="p-3">✅</td>
              <td className="p-3">▶</td>
              <td className="p-3">↔</td>
              <td className="p-3">BANKNIFTY001</td>
              <td className="p-3">BUY</td>
              <td className="p-3">1</td>
              <td className="p-3">NONE</td>
              <td className="p-3">0</td>
              <td className="p-3">0-0-0</td>
            </tr>
            <tr className="border-b">
              <td className="p-3">2</td>
              <td className="p-3">2493</td>
              <td className="p-3">⚙</td>
              <td className="p-3">✅</td>
              <td className="p-3">▶</td>
              <td className="p-3">↔</td>
              <td className="p-3">BANKNIFTY001</td>
              <td className="p-3">BUY</td>
              <td className="p-3">1</td>
              <td className="p-3">NONE</td>
              <td className="p-3">0</td>
              <td className="p-3">0-0-0</td>
            </tr>
          </tbody>
        </table>

        {/* Sub Table */}
        <table className="w-full mt-6 border-t">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">OPTION PORTFOLIO</th>
              <th className="p-3 text-left">USER ID</th>
              <th className="p-3 text-left">USER ALIAS</th>
              <th className="p-3 text-left">SQOFF</th>
              <th className="p-3 text-left">MASK AS COMPLETED</th>
              <th className="p-3 text-left">PART ENTRY/EXIT</th>
              <th className="p-3 text-left">AVG EXECUTION PRICE</th>
              <th className="p-3 text-left">PNL</th>
              <th className="p-3 text-left">CE PNL</th>
              <th className="p-3 text-left">PE PNL</th>
              <th className="p-3 text-left">MAX PNL</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3">BANKNIFTY001</td>
              <td className="p-3">P848865</td>
              <td className="p-3">DEEPTHI</td>
              <td className="p-3">⚙</td>
              <td className="p-3">✅</td>
              <td className="p-3">↔</td>
              <td className="p-3">452.00</td>
              <td className="p-3">550.2</td>
              <td className="p-3">558.0</td>
              <td className="p-3">0.00</td>
              <td className="p-3">1.320</td>
            </tr>
            <tr className="border-b">
              <td className="p-3">BANKNIFTY001</td>
              <td className="p-3">P848866</td>
              <td className="p-3">CSREGNAI</td>
              <td className="p-3">⚙</td>
              <td className="p-3">✅</td>
              <td className="p-3">↔</td>
              <td className="p-3">452.00</td>
              <td className="p-3">550.2</td>
              <td className="p-3">558.0</td>
              <td className="p-3">0.00</td>
              <td className="p-3">1.320</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;