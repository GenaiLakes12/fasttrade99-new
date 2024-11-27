// pages/symbolTrading.tsx
'use client';
import React from 'react';
import Link from 'next/link';

// Define the interface for the symbol data
interface SymbolData {
  name: string;
  icon: string;
  statusIcon: string; // Add statusIcon to the interface
}

// Sample symbol data with more entries
const symbolData: SymbolData[] = [
  {
    name: 'BANKNIFTY001',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d47bd5dca09a2b42f2a93effe0fec5c33230111ffa119246c7d34c81628ee4b5?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
    statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/908ce8cb0edb2eaafeb938fb69da54565ae7c2739e28684734b5ece1571ea29e?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
  },
  {
    name: 'NIFTY002',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d47bd5dca09a2b42f2a93effe0fec5c33230111ffa119246c7d34c81628ee4b5?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
    statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/908ce8cb0edb2eaafeb938fb69da54565ae7c2739e28684734b5ece1571ea29e?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
  },
  {
    name: 'FINNIFT0001',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d47bd5dca09a2b42f2a93effe0fec5c33230111ffa119246c7d34c81628ee4b5?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
    statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0558ff785c9ca029e5096384abd9b74f0f342e5d869493a27c7bf07cc8af6a01?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
  },

  {
    name: 'BANKNIFTY002',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/48f43076184816c38de735bf8b4279341781d81eb0b243362a9a0b32f22fe7d2?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',

    statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0558ff785c9ca029e5096384abd9b74f0f342e5d869493a27c7bf07cc8af6a01?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
  },
  {
    name: 'NIFTY002',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d47bd5dca09a2b42f2a93effe0fec5c33230111ffa119246c7d34c81628ee4b5?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
    statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0558ff785c9ca029e5096384abd9b74f0f342e5d869493a27c7bf07cc8af6a01?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
  },
  {
    name: 'FINNIFT0002',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d47bd5dca09a2b42f2a93effe0fec5c33230111ffa119246c7d34c81628ee4b5?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
    statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0558ff785c9ca029e5096384abd9b74f0f342e5d869493a27c7bf07cc8af6a01?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
  },
];

// SymbolTrading component
const SymbolTrading = ({ onShowError }) => {
  return (
    <div className="flex flex-col w-full max-md:ml-0 max-md:w-[670px]">
      <div className="flex flex-col grow max-md:max-w-full">
        <div className="flex flex-col pb-6 w-full bg-white border border-gray-200 border-solid max-md:max-w-full">
          <div className="flex flex-col justify-center px-4 py-2.5 w-full text-sm font-semibold leading-none text-rose-500 capitalize bg-white border border-gray-200 border-solid max-md:max-w-full">
            <div className="flex gap-10 justify-between items-center w-full">
              <div className="flex gap-2 items-center self-stretch my-auto">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/562db3e1d3aa87626fa6854944bbbd4db6abdd14eea82f241dd71041fc670103?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
                  className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                  alt="Symbol Trading"
                />
                <div className="self-stretch my-auto">
                  <span className="text-blue-700">Symbol Trading</span>{" "}
                </div>
              </div>
              <Link href ="/components/SymbolTrading"passHref>
             <button><img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7791397c2d578afb3454b14b48d0c501c0b8c4473c950721b28c80792a146df0?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                alt=""
              /></button>
             </Link>
            </div>
          </div>
          <div className="flex gap-1.5 self-center mt-2 max-w-full w-[415px]">
            <div className="flex overflow-hidden flex-col w-full h-[242px]">
              {symbolData.map((symbol, index) => (
                <div key={index} className="flex gap-2.5 justify-between items-center px-1 py-1.5 w-full h-10 border-b border-solid border-b-gray-200 min-h-[40px]">
                  <div className="flex gap-6 items-center self-stretch my-auto min-w-[240px]">
                    <div className="flex gap-1 items-center self-stretch my-auto text-sm font-bold leading-none text-cyan-700 whitespace-nowrap">
                      <img
                        loading="lazy"
                        src={symbol.icon}
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                        alt=""
                      />
                      <div className="self-stretch my-auto text-ellipsis w-[114px]">
                        {symbol.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch my-auto w-[111px]">
                    <img
                      loading="lazy"
                      src={symbol.statusIcon}
                      className="object-contain self-stretch my-auto aspect-[4] w-[111px]"
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/381cf94632e4798255318c9d1c1d87cad97303d2905e7cb497f5ea2dfcc4ad5a?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
              className="object-contain shrink-0 self-start mt-10 aspect-[0.1] stroke-[3px] stroke-neutral-300 w-[3px]"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymbolTrading;
