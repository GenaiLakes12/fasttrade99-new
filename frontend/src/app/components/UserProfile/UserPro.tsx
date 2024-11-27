// components/userprofile/UserProfile.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons CSS

interface UserData {
  name: string;
  avatar: string;
  btcLoss: number;
  btcGain: number;
}

const userData: UserData[] = [
  { name: 'Jane Cooper', avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b95f22204c95e05ffdbfc464461eafbf352774f98208f0141f87bfbe593e38be?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d', btcLoss: 0.091, btcGain: 0.091 },
  { name: 'Eleanor Pena', avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/551c134176e08fa0725c2525d54b60648dfc54e8ae8d5f7baaa75fb7acd3dc1f?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d', btcLoss: 0.091, btcGain: 0.091 },
  { name: 'Cameron Williamson', avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/45b534be36c626625e18f38f3ac77af4e1a40c50c77487d28491e3cfdbf7ada9?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d', btcLoss: 0.091, btcGain: 0.091 },
  { name: 'Kristin Watson', avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b95f22204c95e05ffdbfc464461eafbf352774f98208f0141f87bfbe593e38be?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d', btcLoss: 0.091, btcGain: 0.091 },
  { name: 'Annette Black', avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/59c1b8a5847ce398d14aaf68d84fa7a5f86ffb0d97fe8dc2c1f89975a7a06928?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d', btcLoss: 0.091, btcGain: 0.091 },
  { name: 'Courtney Henry', avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7c8b76d67dd4374e18e75106327034c816c2cf84cc41d09def2ee1a4ae50d593?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d', btcLoss: 0.091, btcGain: 0.091 },
];

const UserProfile: React.FC = () => {

    return (
    <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-[970px]">
      <div className="flex z-10 flex-col grow max-md:max-w-full">
        <div className="flex flex-col  w-full bg-white border border-gray-200 border-solid max-md:max-w-82">
          <div className="flex flex-col justify-center py-2.5 w-full text-sm font-semibold leading-none text-black capitalize bg-white border border-gray-200 border-solid max-md:max-w-full">
            <div className="flex gap-10 justify-between items-center w-full">
              <div className="flex gap-2 items-center self-stretch my-auto">
              <FontAwesomeIcon 
    icon={faUser} // Use your desired icon
    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
  />
                <div className="self-stretch my-auto">
                  <span className="text-blue-700">User Profile</span>
                  <span className="text-base font-extrabold"> - (</span>
                  <span className="text-base font-extrabold text-green-600"> 0 </span>
                  <span className="text-base font-extrabold">/</span>
                  <span className="text-base font-extrabold text-rose-500"> 1 </span>
                  <span className="text-base font-extrabold">)</span>
                </div>
              </div>
              <Link href="/components/UserProfile" passHref>
              <button 
  className="flex items-center justify-center pr-3 text-xl bg-white rounded-full text-blue focus:outline-none"
  aria-label="Arrow Up Right Button"
>
<i className="bi bi-box-arrow-up-right w-6 h-6" style={{ color: '#3d69ea' }}></i>
</button>

  </Link>

            </div>
          </div>
          <div className="flex gap-2 self-center mt-2.5 max-w-full w-[414px]">
  <div className="flex overflow-hidden flex-col grow shrink-0 basis-0 min-h-[240px] w-fit">
    {userData.map((user, index) => (
      <div key={index} className="flex gap-1.5 justify-between items-center px-1 py-1.5 w-full h-10 border-b border-solid border-b-gray-200 min-h-[40px]">
        <div className="flex gap-2 items-center self-stretch my-auto min-w-[240px] w-[293px]">
          <FontAwesomeIcon
            icon={faUser}
            className="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square w-[30px]"
          />
          <div className="self-stretch my-auto text-sm leading-none text-ellipsis text-neutral-700 w-[133px]">
            {user.name}
          </div>
          <div className="flex gap-1.5 items-center self-stretch my-auto text-xs font-medium leading-none w-[113px]">
            <div className="flex flex-col justify-center self-stretch my-auto w-12 text-red-400 h-[30px]">
              <div className="flex flex-col w-full">
                <div className="flex flex-col justify-center items-end w-full min-h-[4px]">
                  <div>-{user.btcLoss} BTC </div>
                  <div className="flex mt-2 w-3 bg-red-400 rounded-sm min-h-[7px]" />
                </div>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faUser}
              className="object-contain shrink-0 self-stretch my-auto w-0 stroke-[1px] stroke-gray-400"
            />
            <div className="flex flex-col justify-center self-stretch my-auto w-12 text-green-600 h-[30px]">
              <div className="flex flex-col justify-center w-[51px]">
                <div className="flex flex-col justify-center w-full min-h-[35px]">
                  <div>+{user.btcGain} BTC </div>
                  <div className="flex mt-2 bg-green-600 rounded-sm min-h-[7px] w-[26px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
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
    ))}
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
