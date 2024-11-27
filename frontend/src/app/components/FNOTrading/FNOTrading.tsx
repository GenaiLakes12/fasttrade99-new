// /components/FNOTrading.tsx
import React from 'react';
import Link from 'next/link';

interface FOData {
  name: string;
  icon: string;
  statusIcon: string;
}

const foData: FOData[] = [
  { name: 'BANKNIFTY001', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0d3a4c1048c64f7c6537ae5d9cb6f2e2026968898dd67a701aef80c1e26a05ac?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d', statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/51e423c01595bb2834fe64e3d68e5679b757cfd5af088abd3c7bfc937f2480df?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d' },
  { name: 'NIFTY001', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0cdf3898b13471bfcff7541a7d39aa046356ea5172dfd1dce9d54cdfa02ff407?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d', statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cdba7fbab147acdd1234c1fc42d94a310ebba972e1fa33f55b66919d587f8bea?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d' },
  { name: 'BANKNIFTY001', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0d3a4c1048c64f7c6537ae5d9cb6f2e2026968898dd67a701aef80c1e26a05ac?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d', statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9e75521b065cf938fa1b3a24dcbee6fc90158678f2f868601d74467ea881aaa8?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d' },
  { name: 'FINNIFT0001', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d609f516ba3cf915fb1c17912620ebdd143f79ce63b1da3ca5208e6148c1ca05?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d', statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0558ff785c9ca029e5096384abd9b74f0f342e5d869493a27c7bf07cc8af6a01?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d' },
  { name: 'BANKNIFTY001', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0d3a4c1048c64f7c6537ae5d9cb6f2e2026968898dd67a701aef80c1e26a05ac?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d', statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/518a3e8b2b9a1c7f525580d4618ee221093e7a33fec53202ab0f8b0893be33ff?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d' },
  { name: 'BANKNIFTY001', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0d3a4c1048c64f7c6537ae5d9cb6f2e2026968898dd67a701aef80c1e26a05ac?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d', statusIcon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f283df6481e2cbb48d4c77f2bcf165b41fa9f1fe597b24aaea1b99ec7ae0232d?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d' },
];

const FNOTrading: React.FC = () => {
  return (
    <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-[970px]">
      <div className="flex z-10 flex-col grow max-md:max-w-full">
        <div className="flex flex-col pb-1 w-full bg-white border border-gray-200 border-solid max-md:max-w-full">
          <div className="flex flex-col justify-center px-4 py-2.5 w-full text-sm font-semibold leading-none text-rose-500 capitalize bg-white border border-gray-200 border-solid max-md:max-w-full">
            <div className="flex gap-10 justify-between items-center w-full">
              <div className="flex gap-2 items-center self-stretch my-auto">
              <div className="flex items-center gap-3">
  {/* Coin Icon */}
  <i className="bi bi-coin text-2xl text-black"></i>
</div>

                <div className="self-stretch my-auto">
                  <span className="text-blue-700"> F&O Trading </span>{" "}
                  <span className="text-base font-extrabold"> - ( </span>
                  <span className="text-base font-extrabold text-green-600"> 0 </span>
                  <span className="text-base font-extrabold"> / </span>
                  <span className="text-base font-extrabold text-rose-500"> 1 </span>
                  <span className="text-base font-extrabold"> ) </span>
                </div>
              </div>
              <Link href="/components/FNOTrading" passHref>
              <button 
  className="flex items-center justify-center pr-3 text-xl bg-white rounded-full text-blue focus:outline-none"
  aria-label="Arrow Up Right Button"
>
<i className="bi bi-box-arrow-up-right w-6 h-6" style={{ color: '#3d69ea' }}></i>
</button>
              </Link>
            </div>
          </div>
          <div className="flex gap-1 self-center mt-2 max-w-full w-[414px]">
            <div className="flex overflow-hidden flex-col grow shrink-0 basis-0 min-h-[240px] w-fit">
              {foData.map((item, index) => (
                <div key={index} className="flex gap-10 justify-between items-center px-1 py-1.5 w-full h-10 border-b border-solid border-b-gray-200 min-h-[40px]">
                  <div className="flex gap-6 items-center self-stretch my-auto text-sm font-bold leading-none text-cyan-700 whitespace-nowrap">
                    <div className="flex gap-1 items-center self-stretch my-auto">
                    <div className="flex items-center gap-3">
  {/* Bitcoin Icon */}
  <i className="bi bi-currency-bitcoin text-xl text-black"></i>
</div>

                      <div className="self-stretch my-auto text-ellipsis w-[114px]">{item.name}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
  {/* Red Circle Icon */}
  <i className="bi bi-play cursor-pointer" style={{ color: 'black', fontSize: '30px' }}></i>
  <i 
  className="bi bi-pen cursor-pointer" 
  style={{ fontSize: '18px', color: 'black',marginTop: '7px' }}
></i>
  <i
    className="bi bi-trash3 cursor-pointer"
    style={{ color: "red", fontSize: '20px',marginTop: '6px' }}
  ></i>
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

export default FNOTrading;
