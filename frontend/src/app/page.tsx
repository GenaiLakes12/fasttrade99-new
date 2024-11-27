'use client';
import React from 'react';
import UserProfile from './components/UserProfile/UserPro'; // Adjust path if necessary
import Strategies from './components/Strategies/Strategies';
import SymbolTrading from './components/SymbolTrading/SymbolTrading';
import FNOTrading from './components/FNOTrading/FNOTrading'; // Adjust path if necessary
import OrderFlow from './components/OrderFlow/OrderFlow'; // Adjust path if necessary
import Positions from './components/Positions/Positions'; // Adjust path if necessary
import Holding from './components/Holding/Holding'; // Adjust path if necessary
import OrderManagement from './components/OrderManagement/OrderManagement'; // Adjust path if necessary

import Card from './components/Card'; // Adjust path if necessary

const DashboardPage = () => {
  return (
    <div>
      {/* Main content section */}
      <main className="main-content w-100%">
        {/* First Row */}
        <div className="inner flex gap-0 w-100%">
          <Card>
            <UserProfile />
          </Card>
          <Card>
            <Strategies />
          </Card>
          <Card>
            <SymbolTrading />
          </Card>
        </div>

        {/* Second Row */}
        <div className="inner flex gap-0 w-100%">
        <Card>
            <FNOTrading />
          </Card>
          <Card>
            <OrderFlow />
          </Card>
          <Card>
            <Positions />
          </Card>
         
        </div>

        {/* Third Row */}
        <div className="inner flex gap-0 w-100%">
          <Card>
            <Holding />
          </Card>
          <Card>
            <OrderManagement />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
