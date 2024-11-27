// app/components/Holding.tsx

import React from 'react';
import Link from 'next/link';

const datasets = [
  { color: "bg-emerald-400", label: "Login" },
  { color: "bg-purple-400", label: "Exchange" },
  { color: "bg-orange-400", label: "Stop" },
  { color: "bg-pink-400", label: "Current Value" },
  { color: "bg-sky-400", label: "Avg Price" },
  { color: "bg-amber-400", label: "Collateral Qty" }
];

const DatasetItem = ({ color, label }) => {
  return (
    <div className="flex gap-2 items-center whitespace-nowrap mt-3.5">
      <div 
        className={`flex shrink-0 self-stretch my-auto ${color} rounded-3xl h-[15px] w-[17px]`}
        role="presentation"
      />
      <p className="self-stretch my-auto">{label}</p>
    </div>
  );
};

const Holding: React.FC = () => {
  return (
    <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-[970px]">
      <div className="flex flex-col grow text-sm max-md:max-w-full">
        <div className="flex flex-col w-full bg-white border border-gray-200 border-solid max-md:max-w-full">
          <div className="flex flex-col justify-center px-4 py-2.5 w-full font-semibold leading-none text-rose-500 capitalize bg-white border border-gray-200 border-solid max-md:max-w-full">
            <div className="flex gap-10 justify-between items-center w-full">
              <div className="flex gap-2 items-center self-stretch my-auto">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a35fd9dbe8bc3761aaa462995517bc5862ac9fe0b6cf9db13380617b47234f20?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
                  className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                  alt="Holding Icon"
                />
                <div className="self-stretch my-auto">
                  <span className="text-blue-700">Holding</span>
                  <span className="text-base font-extrabold"> - ( </span>
                  <span className="text-base font-extrabold text-green-600"> 0 </span>
                  <span className="text-base font-extrabold"> / </span>
                  <span className="text-base font-extrabold text-rose-500"> 1 </span>
                  <span className="text-base font-extrabold"> ) </span>
                </div>
              </div>
              <Link href ="/components/Holding"passHref>
             <button><img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7791397c2d578afb3454b14b48d0c501c0b8c4473c950721b28c80792a146df0?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                alt=""
              /></button>
             </Link>
            </div>
          </div>
        
        {/* Legend section */}
        <section className="flex gap-3 text-sm max-w-[394px] text-zinc-700">
          <div className="flex flex-col justify-center items-start my-auto">
            {datasets.map((dataset) => (
              <DatasetItem
                key={dataset.label}
                color={dataset.color}
                label={dataset.label}
              />
            ))}
          </div>
          <img 
            loading="lazy" 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/675e76754d902ec4bbe94e2ab894b1d8031fb119ba8a22a9d2c223c4ef7bc21d?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d" 
            alt=""
            className="object-contain grow shrink-0 aspect-square basis-0 w-fit" 
          />
        </section>
      </div>
      
    </div>
    </div>
  );
};

export default Holding;
