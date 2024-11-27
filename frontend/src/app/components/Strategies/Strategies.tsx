// pages/strategies.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKnight } from '@fortawesome/free-solid-svg-icons';

// Define the interface for the strategy data
interface StrategyData {
  name: string;
  icon: string;
  btcLoss: number;
  btcGain: number;
  statusIcon: string;
}

// Sample strategy data with more entries
const strategyData: StrategyData[] = [
  {
    name: 'BANKNIFTY001',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0f30360fd2a92513dc0dffff6bfbe2a17d669243079d1c2d40f1ae09729d6f70?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
    btcLoss: 0.091,
    btcGain: 0.091,
    statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/908ce8cb0edb2eaafeb938fb69da54565ae7c2739e28684734b5ece1571ea29e?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
  },
  {
    name: 'NIFTY002',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0f30360fd2a92513dc0dffff6bfbe2a17d669243079d1c2d40f1ae09729d6f70?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
    btcLoss: 0.075,
    btcGain: 0.080,
    statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/908ce8cb0edb2eaafeb938fb69da54565ae7c2739e28684734b5ece1571ea29e?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
  },
  {
    name: 'BANKNIFTY003',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0f30360fd2a92513dc0dffff6bfbe2a17d669243079d1c2d40f1ae09729d6f70?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
    btcLoss: 0.120,
    btcGain: 0.100,
    statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/908ce8cb0edb2eaafeb938fb69da54565ae7c2739e28684734b5ece1571ea29e?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
  },
  {
    name: 'NIFTY004',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0f30360fd2a92513dc0dffff6bfbe2a17d669243079d1c2d40f1ae09729d6f70?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
    btcLoss: 0.040,
    btcGain: 0.060,
    statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/908ce8cb0edb2eaafeb938fb69da54565ae7c2739e28684734b5ece1571ea29e?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
  },
  {
    name: 'BANKNIFTY005',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0f30360fd2a92513dc0dffff6bfbe2a17d669243079d1c2d40f1ae09729d6f70?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
    btcLoss: 0.050,
    btcGain: 0.070,
    statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/908ce8cb0edb2eaafeb938fb69da54565ae7c2739e28684734b5ece1571ea29e?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
  },
  {
    name: 'NIFTY006',
    icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0f30360fd2a92513dc0dffff6bfbe2a17d669243079d1c2d40f1ae09729d6f70?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
    btcLoss: 0.020,
    btcGain: 0.030,
    statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/908ce8cb0edb2eaafeb938fb69da54565ae7c2739e28684734b5ece1571ea29e?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
  },
];


// Strategies component
const Strategies = ({ onShowError }) => {
  return (
<div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-[670px]">
<div className="flex flex-col grow max-md:max-w-full">
        <div className="flex flex-col pb-6 w-full bg-white border border-gray-200 border-solid max-md:max-w-full">
          <div className="flex flex-col justify-center px-4 py-2.5 w-full text-sm font-semibold leading-none text-rose-500 capitalize bg-white border border-gray-200 border-solid max-md:max-w-full">
            <div className="flex gap-10 justify-between items-center w-full">
              <div className="flex gap-2 items-center self-stretch my-auto">
              <div className="flex">
  {/* Chess Icon */}
    <i 
    className="fa fa-chess-knight object-contain shrink-0 self-stretch my-auto text-black text-xl" 
    aria-hidden="true"
    ></i>
</div>


                <div className="self-stretch my-auto">
                  <span className="text-blue-700">Strategies</span>{" "}
                  <span className="text-base font-extrabold">- (</span>
                  <span className="text-base font-extrabold text-green-600"> 0 </span>
                  <span className="text-base font-extrabold">/</span>
                  <span className="text-base font-extrabold text-rose-500"> 1 </span>
                  <span className="text-base font-extrabold">)</span>
                </div>
              </div>

              <Link href ="/components/Strategies"passHref>
              <button 
  className="flex items-center justify-center pr-3 text-xl bg-white rounded-full text-blue focus:outline-none"
  aria-label="Arrow Up Right Button"
>
<i className="bi bi-box-arrow-up-right w-6 h-6" style={{ color: '#3d69ea' }}></i>
</button>
             </Link>
            </div>
          </div>
          <div className="flex gap-1.5 self-center mt-2 max-w-full w-[415px]">
            <div className="flex overflow-hidden flex-col w-full h-[242px]">
              {strategyData.map((strategy, index) => (
                <div key={index} className="flex gap-2.5 justify-between items-center px-1 py-1.5 w-full h-10 border-b border-solid border-b-gray-200 min-h-[40px]">
                  <div className="flex gap-6 items-center self-stretch my-auto min-w-[240px]">
                    <div className="flex gap-1 items-center self-stretch my-auto text-sm font-bold leading-none text-cyan-700 whitespace-nowrap">
                    <div className="flex justify-center items-center">
  {/* Single Black Chess Piece (King) */}
  <i 
    className="fa fa-chess-king text-black text-2xl" 
    aria-hidden="true"
  ></i>
</div>


                      <div className="self-stretch my-auto text-ellipsis w-[114px]">
                        {strategy.name}
                      </div>
                    </div>
                    <div className="flex gap-1.5 items-center self-stretch my-auto text-xs font-medium leading-none w-[113px]">
                      <div className="flex flex-col justify-center self-stretch my-auto w-12 text-red-400 h-[30px]">
                        <div className="flex flex-col w-full">
                          <div className="flex flex-col justify-center items-end w-full min-h-[35px]">
                            <div>-{strategy.btcLoss} BTC </div>
                            <div className="flex mt-2 w-3 bg-red-400 rounded-sm min-h-[7px]" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center self-stretch my-auto w-12 text-green-600 h-[30px]">
                        <div className="flex flex-col justify-center w-[51px]">
                          <div className="flex flex-col justify-center w-full min-h-[35px]">
                            <div>+{strategy.btcGain} BTC </div>
                            <div className="flex mt-2 bg-green-600 rounded-sm min-h-[7px] w-[26px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch my-auto w-[111px]">
                  <div className="flex gap-2">
  {/* Red Circle Icon */}
  <i className="bi bi-stop-circle cursor-pointer" style={{ color: 'red', fontSize: '20px' }}></i>
  <i 
  className="bi bi-download cursor-pointer" 
  style={{ fontSize: '20px', color: 'black', transform: 'rotate(270deg)' }}
></i>
  <i
    className="bi bi-trash3 cursor-pointer"
    style={{ color: "red", fontSize: '20px' }}
  ></i>
</div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Strategies;