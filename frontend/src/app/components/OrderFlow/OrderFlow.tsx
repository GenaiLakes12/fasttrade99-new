// /components/OrderFlow.tsx
import React from 'react';
import Link from 'next/link';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


const OrderFlow: React.FC = () => {
  return (
    <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-[970px]">
      <div className="flex flex-col items-center pb-12 mx-auto w-full bg-white border border-gray-200 border-solid max-md:max-w-full">
        <div className="flex flex-col justify-center self-stretch px-4 py-2.5 w-full text-sm font-semibold leading-none text-rose-500 capitalize bg-white border border-gray-200 border-solid max-md:max-w-full">
          <div className="flex gap-1 justify-between items-center w-full">
            <div className="flex gap-1 items-center self-stretch my-auto">
              {/* <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4912bbcfed46fa72637e9d4369cc9dec38dd7fd8474b60928734ed3e0ee425ea?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                alt=""
              /> */}
              <PlayArrowIcon/>
              <div className="self-stretch my-auto">
                <span className="text-blue-700">Order Flow</span>{" "}
                <span className="text-base font-extrabold"> - ( </span>
                <span className="text-base font-extrabold text-green-600"> 0 </span>
                <span className="text-base font-extrabold"> / </span>
                <span className="text-base font-extrabold text-rose-500"> 1 </span>
                <span className="text-base font-extrabold"> ) </span>
              </div>
            </div>
            <Link href ="/components/OrderFlow"passHref>
             <button >
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
        <div className="flex relative flex-col px-14 py-16 mt-9 max-w-full text-2xl font-bold whitespace-nowrap rounded-none aspect-square text-zinc-800 w-[170px] max-md:px-5">
          {/* <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/466a4a0c36363ee950fa06888a7b278fccc9394d682fe2ae78f7a0fa9e354ea3?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
            className="object-cover absolute inset-0 size-full"
            alt=""
          /> */}
          <PlayArrowIcon/>
          50%
        </div>
        <div className="flex gap-4 items-start">
          <div className="flex gap-1.5 justify-center items-center">
            <div className="flex flex-col self-stretch my-auto w-3.5 rounded-3xl">
              <div className="flex shrink-0 w-3.5 h-3.5 bg-yellow-400 rounded-3xl" />
            </div>
            <div className="self-stretch my-auto text-xs text-neutral-500"> User ID </div>
          </div>
          <div className="flex gap-1.5 justify-center items-center">
            <div className="flex flex-col self-stretch my-auto w-3.5 rounded-3xl">
              <div className="flex shrink-0 h-3.5 bg-green-600 rounded-3xl" />
            </div>
            <div className="self-stretch my-auto text-xs text-neutral-500"> Login </div>
          </div>
          <div className="flex gap-1.5 justify-center items-center">
            <div className="flex flex-col justify-center self-stretch px-0.5 py-px my-auto w-4 rounded-none">
              <div className="flex shrink-0 h-3.5 bg-red-300 rounded-3xl" />
            </div>
            <div className="self-stretch my-auto text-xs text-neutral-500"> Stop </div>
          </div>
          <div className="flex gap-1.5 justify-center items-center">
            <div className="flex flex-col self-stretch my-auto w-3.5 rounded-3xl">
              <div className="flex shrink-0 w-3.5 h-3.5 bg-blue-600 rounded-3xl" />
            </div>
            <div className="self-stretch my-auto text-xs text-neutral-500"> Net Qty </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFlow;
