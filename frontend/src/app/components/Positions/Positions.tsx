// app/positions/positions.tsx
import * as React from "react";
import Link from 'next/link';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; 

export function LegendItem({ color, label }) {
  return (
    <div className="flex gap-1.5 justify-center items-center self-stretch my-auto">
      <div className="flex flex-col self-stretch my-auto w-2.5 rounded-3xl">
        <div className={`flex shrink-0 w-2.5 h-2.5 rounded-3xl ${color}`} />
      </div>
      <div className="self-stretch my-auto text-xs text-neutral-500">
        {label}
      </div>
    </div>
  );
}

export function BarGraph({ height, color }) {
  return (
    <div 
      className={`flex shrink-0 w-1.5 ${color} rounded-sm`} 
      style={{ height: `${height}px` }}
    />
  );
}

const barData = [
  { height: 70, color: "bg-slate-900" },
  { height: 87, color: "bg-cyan-900" },
  { height: 37, color: "bg-cyan-700" },
  { height: 87, color: "bg-yellow-400" },
  { height: 57, color: "bg-sky-400" },
  { height: 38, color: "bg-blue-400" },
  { height: 87, color: "bg-sky-300" },
  { height: 87, color: "bg-red-500" },
  { height: 87, color: "bg-blue-100" },
  { height: 57, color: "bg-green-600" },
  { height: 45, color: "bg-green-500" },
  { height: 74, color: "bg-green-400" },
  { height: 74, color: "bg-green-300" },
  { height: 45, color: "bg-blue-600" }
];

const legendData = [
  [
    { color: "bg-yellow-400", label: "User ID" },
    { color: "bg-green-600", label: "Login" },
    { color: "bg-red-500", label: "Stop" },
    { color: "bg-slate-900", label: "Product" },
    { color: "bg-slate-600", label: "Exchange" }
  ],
  [
    { color: "bg-slate-500", label: "Symbol" },
    { color: "bg-sky-400", label: "Buy Qty" },
    { color: "bg-blue-400", label: "Buy Avg Price" },
    { color: "bg-sky-300", label: "Sell Qty" },
    { color: "bg-blue-100", label: "Sell Value" }
  ],
  [
    { color: "bg-green-400", label: "Carry FWD Qty" },
    { color: "bg-green-500", label: "Realized Profit" },
    { color: "bg-green-300", label: "Unrealized profit" },
    { color: "bg-blue-600", label: "User Alias" }
  ]
];

export default function PositionsCard() {
  return (
    <main className="flex flex-col max-w-[640px]">
      <header className="flex flex-col items-center pb-11 w-full bg-white border border-gray-200 border-solid">
        <div className="flex flex-col justify-center self-stretch px-4 py-2.5 w-full text-sm font-semibold leading-none text-rose-500 capitalize bg-white border border-gray-200 border-solid">
          <div className="flex gap-10 justify-between items-center w-full">
            <div className="flex gap-2 items-center self-stretch my-auto">
              {/* <img 
                loading="lazy" 
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb24603beeb13d9d7b653c4efd57e4141a314809729a1bafb4d871112c4fba40?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d" 
                alt="Positions Icon"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" 
              /> */}
              <PlayArrowIcon/>
              <div className="self-stretch my-auto">
                <span className="text-blue-700">Positions</span>
                <span className="text-base font-extrabold">- (</span>
                <span className="text-base font-extrabold text-green-600"> 0 </span>
                <span className="text-base font-extrabold">/</span>
                <span className="text-base font-extrabold text-rose-500"> 1 </span>
                <span className="text-base font-extrabold">)</span>
              </div>
            </div>
            <Link href ="/components/Positions"passHref>
             <button>
              <PlayArrowIcon/>
             </button>
             </Link>
          </div>
        </div>

        <section className="flex gap-5 items-end mt-12">
          {barData.map((bar, index) => (
            <BarGraph key={index} height={bar.height} color={bar.color} />
          ))}
        </section>

        <div className="shrink-0 mt-3 max-w-full h-0 border border-solid border-zinc-400 w-[340px]" />

        <section className="flex flex-col mt-5 w-full max-w-[410px]">
          {legendData.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 justify-center items-center w-full mt-1.5">
              {row.map((item, itemIndex) => (
                <LegendItem key={itemIndex} color={item.color} label={item.label} />
              ))}
            </div>
          ))}
        </section>
      </header>
    </main>
  );
}
