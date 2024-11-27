'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const MarketDataItem: React.FC<MarketDataProps> = ({ name, value, change, percentageChange }) => {
  return (
    <div className="flex gap-2 items-center px-2.5 py-2.5 rounded-md">
      <p className="uppercase text-neutral-600">{name} {value}</p>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/abe460ecdc488558cdd5f49343e5eb4dfb6ad25de00eb0ba40073ba4152a4103"
        alt=""
        className="object-contain w-3 aspect-[1.33] fill-green-500"
      />
      <p className="text-green-500">
        {change}(+{percentageChange}%)
      </p>
    </div>
  );
};

const marketData: MarketDataProps[] = [
  { name: 'SenSex', value: 71714.0, change: 377.6, percentageChange: 0.53 },
  { name: 'NIFTY50', value: 0, change: 377.6, percentageChange: 0.53 },
  { name: 'BANKNIFTY', value: 0, change: 377.6, percentageChange: 0.53 },
  { name: 'FINNIFTY', value: 0, change: 377.6, percentageChange: 0.53 }
];

const MarketHeader: React.FC = () => {
  return (
    <header className="flex flex-wrap gap-10 justify-between items-center self-stretch py-2 pr-16 pl-16 w-full bg-white border-b border-solid border-b-gray-200 max-md:px-5 max-md:max-w-full">
      <h1 className="self-stretch my-auto text-3xl font-black leading-none text-gray-800">
        FT99
      </h1>
      <nav className="flex flex-wrap gap-10 justify-between items-center self-stretch my-auto text-sm font-semibold leading-none min-w-[240px] w-[1070px] max-md:max-w-full">
        {marketData.map((item, index) => (
          <MarketDataItem key={index} {...item} />
        ))}
      </nav>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a36bfefc94ed4baa2df6632ec0496ba50bf548f6e0239e87964ca7b26478e7f0?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
        alt="User profile"
        className="object-contain shrink-0 self-stretch my-auto w-8 rounded-3xl aspect-square"
      />
    </header>
  );
};

const Navbar: React.FC<{ users: any }> = ({ users }) => {
  const [currentDateTime, setCurrentDateTime] = useState({
    date: '',
    time: '',
  });
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { day: 'numeric', month: 'short', year: 'numeric', weekday: 'short' };
      const date = now.toLocaleDateString('en-US', options);
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) + ' IST';

      setCurrentDateTime({ date, time });
    };

    updateDateTime(); // Initialize immediately
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);
  const handleConfirmLogin = async () => {
    console.log("Users data:", users);
    console.log("Confirming login...");
    try {
      const lastUser = users[users.length - 1]; // Retrieve the last user added
      if (!lastUser) {
        alert("No users to confirm.");
        return;
      }
      const newUser = {
        mainUser: lastUser.UserName,
        userId: lastUser.ClientID,
        password: lastUser.Pin,
        apiKey: lastUser.ApiKey,
        qrCode: lastUser.QRCode,
        broker: lastUser.Broker,
        display_name: lastUser.UserName,
        max_profit: lastUser.MaxProfit,
        max_loss: lastUser.MaxLoss,
        secretKey: lastUser.APISecretKey || '',
        imei: lastUser.imei || '',
        vendor_code: lastUser.VendorCode || '',
        cliend_id: lastUser.ClientID || '',
      }
      // Send the lastUser data to the FastAPI backend
      const response = await axios.post("http://127.0.0.1:8001/api/broker/validate_account", { users: [newUser] }, {
        headers: { 'Content-Type': 'application/json' }
      });

      alert(response.data.message);
    } catch (error) {
      console.error("Error confirming login:", error);
      alert("Failed to confirm login.");
    }
  };

  return (
    <nav className="flex flex-col items-center justify-between w-full lg:max-w-full">
      <MarketHeader /> {/* Include MarketHeader here */}
      <div className="flex flex-wrap gap-5 justify-between mt-1 max-w-full text-sm leading-none rounded-none w-[100%]">
        <div className="flex gap-1 items-center my-auto font-medium text-blue-700 capitalize whitespace-nowrap">
          <div className="flex gap-1 items-center self-stretch my-auto">
            <div className="flex justify-start">
              <div className="overflow-hidden gap-2 self-stretch px-1.5 py-2 my-auto bg-gray-100 rounded">
                Dashboard
              </div>
            </div>

          </div>
        </div>


        <div className="flex gap-4">
          <div className="grow my-auto font-semibold text-neutral-600">
            <span>{currentDateTime.date} </span>
            <span className="text-xl font-black">{currentDateTime.time}</span>
          </div>

          <button onClick={handleConfirmLogin} className="flex overflow-hidden gap-2 justify-end items-center px-2.5 py-1.5 font-medium text-right text-white rounded-md bg-blue-600 border border-blue-700 border-solid shadow-[0px_1px_4px_rgba(0,0,0,0.25)]">
            <div className="flex gap-2 items-center self-stretch my-auto">
              <div className="self-stretch my-auto">Confirm Broker Login</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e3d18166363dec1e112db203e880010969feb1bed853bb91aa0bc249895b594?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                alt="Broker Login Icon"
              />
            </div>
          </button>

        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 items-center mt-1 w-[100%]">
        <div className="flex overflow-hidden gap-2 items-center self-stretch px-3 py-2 my-auto text-sm font-light leading-none whitespace-nowrap bg-white rounded-md border border-solid border-neutral-300 min-w-[240px] text-slate-500 w-[252px]">
          <div className="flex gap-2 items-center self-stretch my-auto">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c2a047da4243058e9c00dbcea844b62a887455dfbcd6f4dcb7899eab5f4b439?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              alt="Search Icon"
            />
            <div className="self-stretch my-auto w-[119px]">Search</div>
          </div>
        </div>
        <button className="flex overflow-hidden gap-2 items-center self-stretch py-2 pr-2.5 pl-3 my-auto text-sm font-medium leading-none whitespace-nowrap bg-white rounded-md border border-solid border-neutral-300 text-neutral-700 w-[132px]">
          <div className="flex gap-2 items-center self-stretch my-auto w-[110px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7302ec9c1b0fcd7cf178677c1cd3cdf62795dcad112c16130e6ded5e524c5a9e?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              alt="Widgets Icon"
            />
            <div className="self-stretch my-auto w-[119px]">Widgets</div>
          </div>
        </button>
        <div className="flex flex-wrap gap-1 items-start self-stretch my-auto text-sm font-medium leading-none min-w-[240px] text-neutral-700 max-md:max-w-full">
          <button className="flex overflow-hidden gap-2 items-center py-2 pr-3 pl-1.5 w-48 bg-white rounded-md border border-solid border-neutral-300">
            <div className="flex gap-2 items-center self-stretch my-auto">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc5344b6de7ad7d0d2cc3f2cb2d5657a4b6447cbc359a06b4f300e26ac2afe31?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                alt="Option Trading Icon"
              />
              <div className="self-stretch my-auto w-[119px]">Option Trading</div>
            </div>
          </button>
          <nav className="flex overflow-hidden gap-2 items-center py-2 pr-3 pl-1.5 w-48 bg-white rounded-md border border-solid border-neutral-300">
            <div className="flex gap-2 items-center self-stretch my-auto">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/78f6ed21087b4770e8c316c40bbd2ce68e85c13c23fec552cef363dc0480d944?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
                alt="Trading tools icon"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
              <h2 className="self-stretch my-auto w-[119px]">Trading Tools</h2>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5fe34f71862e847e67f70c2de7bde876a819f93d6f952de326cc9ad22b3717f9?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
              alt="Tools icon"
              className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
            />
          </nav>
          <button
            className="flex overflow-hidden gap-2 items-center py-2 pr-3 pl-1.5 w-48 whitespace-nowrap bg-white rounded-md border border-solid border-neutral-300"
            aria-label="Settings"
          >
            <div className="flex gap-2 items-center self-stretch my-auto">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/745f72a78bce25ff3a26c41d636dad92a5dfde7156bf743f49bff0a7b5270623?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
                alt="Settings icon"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
              <span className="self-stretch my-auto w-[119px]">Settings</span>
            </div>
          </button>
        </div>
        {/* Action Buttons Section */}
        <section className="flex overflow-hidden gap-0 justify-center items-center self-stretch px-2 my-auto w-10 h-10 bg-blue-100 rounded-md border border-sky-300 border-solid min-h-[40px] ml-80">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a69afdb830d5693eb446009f4e9a1e9e66cc8eaeddf2f6a61ea126108bd3773f?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
            alt="Icon"
            className="object-contain self-stretch my-auto w-6 aspect-square"
          />
        </section>
        <section className="flex overflow-hidden gap-0 justify-center items-center self-stretch px-2 my-auto w-10 h-10 bg-blue-100 rounded-md border border-sky-300 border-solid min-h-[40px] ml-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fbb49d39d82b96c3ca64d0c913b84a0ed45a7ce39345c87641b17e1dae02580d?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
            alt="Icon"
            className="object-contain self-stretch my-auto w-6 aspect-square"
          />
        </section>
        <section className="flex overflow-hidden gap-0 justify-center items-center self-stretch px-2 my-auto w-10 h-10 bg-blue-100 rounded-md border border-sky-300 border-solid min-h-[40px] ml-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c71f6939c85c628a8a8a8b6f21892928be25532d17d48463f06c981377d53a3e?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
            alt="Icon"
            className="object-contain self-stretch my-auto w-6 aspect-square"
          />
        </section>



        {/* start button stop button */}
        <div className="flex gap-1 items-center self-stretch my-auto" style={{ marginLeft: 'auto', marginRight: '1px' }}>
          <button
            className="flex overflow-hidden gap-2 justify-center items-center px-3 py-2 text-sm font-medium leading-none text-white whitespace-nowrap rounded-md bg-green-600 border border-green-700 border-solid max-w-[94px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)]"
            aria-label="Start button"
          >
            <div className="flex gap-2 items-center self-stretch my-auto">
              <span className="self-stretch my-auto w-[38px]">START</span>
              <button
                aria-label="Pause"
                tabIndex={0}
                className="flex overflow-hidden gap-0.5 self-stretch px-1.5 py-1 my-auto w-6"
              >
                <span
                  className="flex shrink-0 w-1.5 border-2 border-white border-solid h-[18px] stroke-white"
                  aria-hidden="true"
                />
                <span
                  className="flex shrink-0 w-1.5 border-2 border-white border-solid h-[18px] stroke-white"
                  aria-hidden="true"
                />
              </button>
            </div>
          </button>
          <button
            className="flex overflow-hidden gap-2 justify-center items-center px-3 py-2 text-sm font-medium leading-none text-white whitespace-nowrap rounded-md bg-red-600 border border-red-700 border-solid max-w-[94px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)]"
            aria-label="Stop button"
          >
            <div className="flex gap-2 items-center self-stretch my-auto">
              <span className="self-stretch my-auto w-[38px]">STOP</span>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c8fa7142b91259c2db9218901d2f5f5be6e6502926cad4793081153219d68a8?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
            </div>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;