import React, { useState } from 'react';
import SettingPanel from './settingspanel'; // Import your setting panel component
import { FaUser } from 'react-icons/fa';
import 'font-awesome/css/font-awesome.min.css';

const IconButton = ({ src, bgColor }) => {
    return (
        <div className="flex justify-center items-center w-10 h-10 rounded-md border border-gray-300" style={{ backgroundColor: bgColor }}>
<i className="fa fa-user w-5 text-white"></i>
</div>
    );
};

const AddButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="flex overflow-hidden gap-2 justify-center items-center px-3 py-2.5 text-sm font-semibold leading-none text-white whitespace-nowrap bg-blue-700 rounded-md">
<i className="fa fa-plus object-contain w-4 aspect-square text-white"></i>
<span className="self-stretch">ADD</span>
        </button>
    );
};

const FNOTradingHeader = () => {
    const [isSettingPanelOpen, setSettingPanelOpen] = useState(false);

    const iconButtons = [
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e66681ed3196feb521456ae2f0cf233cf13c7254a8321ceccccaf34bbe71d40a?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d", bgColor: "#e1bcb9" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c25b7b527303f319bcc60738145890934bb0a7231684a45cd38fb7651dfcbde2?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d", bgColor: "#79d3ee" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3c749bb77bf72e38aabb1fa46b64e8c00c05f38d0dfc45217a0c8a86428692c3?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d", bgColor: "#79d3ee" }
    ];

    return (
        <header className="w-full flex flex-col rounded-none">
            <div className="flex justify-between px-4 py-1 w-full bg-white rounded-md border border-gray-200 border-solid">
                <div className="flex flex-1 gap-2 items-center my-auto text-sm font-semibold leading-none text-rose-500 capitalize">
                <i className="bi bi-coin text-2xl text-black"></i>
                <div className="self-stretch my-auto w-[228px]">
<span className="text-blue-700">FNO Trading</span>
                  <span className="text-base font-extrabold"> - (</span>
                  <span className="text-base font-extrabold text-green-600"> 0 </span>
                  <span className="text-base font-extrabold">/</span>
                  <span className="text-base font-extrabold text-rose-500"> 1 </span>
                  <span className="text-base font-extrabold">)</span>                    </div>
                </div>
                <div className="flex items-center gap-2">
                <div
    className="w-9 h-9 rounded-full flex items-center justify-center"
    style={{ backgroundColor: "#e1bcb9" }}
  >
    <i className="bi bi-power text-red-600 text-2xl"></i>
  </div>

  {/* Question Circle Icon */}
  <div
    className="w-9 h-9 rounded-full flex items-center justify-center"
    style={{ backgroundColor: "#79d3ee" }}
  >
    <i className="bi bi-question-circle text-blue-800 text-2xl"></i>
  </div>
                    <AddButton onClick={() => setSettingPanelOpen(true)} />
                    <i
  className="fa fa-times object-contain shrink-0 my-auto w-6 aspect-square cursor-pointer text-3xl"
  onClick={() => window.history.back()} // Navigate back on icon click
></i>
              </div>
            </div>

            {isSettingPanelOpen && <SettingPanel onClose={() => setSettingPanelOpen(false)} />}
        </header>
    );
};

export default FNOTradingHeader;
