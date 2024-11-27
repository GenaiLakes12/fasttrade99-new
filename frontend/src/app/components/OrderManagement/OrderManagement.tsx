// components/OrderManagement.tsx

import React from 'react';
import Link from 'next/link';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; 

const OrderManagement: React.FC = () => {
  return (
    <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-[970px]">
      <div className="flex flex-col grow max-md:max-w-full">
        <div className="flex flex-col pb-8 bg-white border border-gray-200 border-solid max-md:max-w-full">
          <div className="flex flex-col justify-center px-4 py-2.5 w-full text-sm font-semibold leading-none text-rose-500 capitalize bg-white border border-gray-200 border-solid max-md:max-w-full">
            <div className="flex gap-10 justify-between items-center w-full">
              <div className="flex gap-2 items-center self-stretch my-auto">
                {/* <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5203bfc4a0a1e58e6a9fbadef5a62b5b25f990c365edf62ef4b5e51c27bfd9c6?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
                  className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                  alt=""
                /> */}
                <PlayArrowIcon/>
                <div className="self-stretch my-auto">
                  <span className="text-blue-700"> Order Management </span>
                  <span className="text-base font-extrabold"> - ( </span>
                  <span className="text-base font-extrabold text-green-600"> 0 </span>
                  <span className="text-base font-extrabold"> / </span>
                  <span className="text-base font-extrabold text-rose-500"> 1 </span>
                  <span className="text-base font-extrabold"> ) </span>
                </div>
              </div>
              <Link href ="/components/OrderManagement"passHref>
             <button>
              {/* <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7791397c2d578afb3454b14b48d0c501c0b8c4473c950721b28c80792a146df0?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                alt=""
              /> */}
<PlayArrowIcon/>
</button>
             </Link>
            </div>
          </div>
          <div className="flex flex-col self-center mt-7 max-w-full w-[408px]">
            <div className="flex flex-col self-center max-w-full rounded-xl w-[341px]">
              <div className="flex gap-5 items-end max-md:mx-2">
                <div className="flex shrink-0 mt-20 w-4 bg-yellow-400 rounded-xl h-[68px] max-md:mt-10" />
                <div className="flex shrink-0 mt-6 w-4 bg-green-600 rounded-xl h-[116px]" />
                <div className="flex shrink-0 mt-24 w-4 bg-red-300 rounded-xl h-[41px] max-md:mt-10" />
                <div className="flex shrink-0 self-stretch w-4 bg-blue-600 rounded-xl h-[140px]" />
                <div className="flex shrink-0 mt-10 w-4 bg-orange-400 rounded-xl h-[101px]" />
                <div className="flex shrink-0 mt-10 w-4 bg-sky-400 rounded-xl h-[101px]" />
                <div className="flex shrink-0 mt-10 w-4 bg-emerald-400 rounded-xl h-[101px]" />
                <div className="flex shrink-0 mt-16 w-4 bg-purple-500 rounded-xl h-[79px] max-md:mt-10" />
                <div className="flex shrink-0 mt-10 w-4 bg-violet-600 rounded-xl h-[101px]" />
                <div className="flex shrink-0 mt-20 w-4 bg-red-500 rounded-xl h-[55px] max-md:mt-10" />
              </div>
              <div className="shrink-0 mt-4 h-0 border border-solid border-zinc-400" />
            </div>
            <div className="flex flex-col mt-3.5 w-full">
              <div className="flex gap-3 justify-center items-start w-full">
                <div className="flex gap-1.5 justify-center items-center">
                  <div className="flex flex-col self-stretch my-auto rounded-3xl w-[13px]">
                    <div className="flex shrink-0 h-3 bg-yellow-400 rounded-3xl" />
                  </div>
                  <div className="self-stretch my-auto text-xs text-neutral-500"> User ID </div>
                </div>
                <div className="flex gap-1.5 justify-center items-center">
                  <div className="flex flex-col self-stretch my-auto w-3 rounded-3xl">
                    <div className="flex shrink-0 w-3 h-3 bg-green-600 rounded-3xl" />
                  </div>
                  <div className="self-stretch my-auto text-xs text-neutral-500"> Login </div>
                </div>
                <div className="flex gap-1.5 justify-center items-center">
                  <div className="flex flex-col justify-center items-start self-stretch p-0.5 my-auto w-4 rounded-none">
                    <div className="flex shrink-0 w-3 h-3 bg-red-500 rounded-3xl" />
                  </div>
                  <div className="self-stretch my-auto text-xs text-neutral-500"> Stop </div>
                </div>
                <div className="flex gap-1.5 justify-center items-center">
                  <div className="flex flex-col self-stretch my-auto w-3 rounded-3xl">
                    <div className="flex shrink-0 w-3 h-3 bg-blue-600 rounded-3xl" />
                  </div>
                  <div className="self-stretch my-auto text-xs text-neutral-500"> User ID </div>
                </div>
                <div className="flex gap-1.5 justify-center items-center">
                  <div className="flex flex-col self-stretch my-auto w-3 rounded-3xl">
                    <div className="flex shrink-0 w-3 h-3 bg-sky-400 rounded-3xl" />
                  </div>
                  <div className="self-stretch my-auto text-xs text-neutral-500"> Net Qty </div>
                </div>
              </div>
              <div className="flex gap-3 justify-center items-start self-center mt-3">
                <div className="flex gap-1.5 justify-center items-center">
                  <div className="flex flex-col self-stretch my-auto w-3 rounded-3xl">
                    <div className="flex shrink-0 w-3 h-3 bg-emerald-400 rounded-3xl" />
                  </div>
                  <div className="self-stretch my-auto text-xs text-neutral-500"> Request ID </div>
                </div>
                <div className="flex gap-1.5 justify-center items-center">
                  <div className="flex flex-col self-stretch my-auto w-3 rounded-3xl">
                    <div className="flex shrink-0 w-3 h-3 bg-purple-500 rounded-3xl" />
                  </div>
                  <div className="self-stretch my-auto text-xs text-neutral-500"> Exchange </div>
                </div>
                <div className="flex gap-1.5 justify-center items-center">
                  <div className="flex flex-col self-stretch my-auto w-3 rounded-3xl">
                    <div className="flex shrink-0 w-3 h-3 bg-red-300 rounded-3xl" />
                  </div>
                  <div className="self-stretch my-auto text-xs text-neutral-500"> Source Symbol </div>
                </div>
                <div className="flex gap-1.5 justify-center items-center">
                  <div className="flex flex-col justify-center items-start self-stretch p-0.5 my-auto w-4 rounded-none">
                    <div className="flex shrink-0 w-3 h-3 bg-violet-600 rounded-3xl" />
                  </div>
                  <div className="self-stretch my-auto text-xs text-neutral-500"> LTP </div>
                </div>
                <div className="flex gap-1.5 justify-center items-center">
                  <div className="flex flex-col self-stretch my-auto w-3 rounded-3xl">
                    <div className="flex shrink-0 w-3 h-3 bg-orange-400 rounded-3xl" />
                  </div>
                  <div className="self-stretch my-auto text-xs text-neutral-500"> Status </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;

