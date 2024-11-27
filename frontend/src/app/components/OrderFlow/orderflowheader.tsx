// import React, { useState } from 'react';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import EditIcon from '@mui/icons-material/Edit'; 
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; 
// const IconButton = ({ src, bgColor }) => {
//     return (
//         <div className="flex justify-center items-center w-10 h-10 rounded-md border border-gray-300" style={{ backgroundColor: bgColor }}>
//            <PlayArrowIcon/>
//             {/* <img loading="lazy" src={src} alt="" className="object-contain w-5 aspect-square text-white" /> */}
//         </div>
//     );
// };

// const AddButton = ({ onClick }) => {
//     return (
//         <button onClick={onClick} className="flex overflow-hidden gap-2 justify-center items-center px-3 py-2.5 text-sm font-semibold leading-none text-white whitespace-nowrap bg-blue-700 rounded-md">
//            <PlayArrowIcon/>
//             {/* <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/22d5b8695c3f6508d15325e94ef3060b9ff8333d4da0dac804ea304be9d412f4?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d" alt="" className="object-contain w-4 aspect-square" /> */}
//             <span className="self-stretch">ADD</span>
//         </button>
//     );
// };

// const OrderFlowHeader = () => {
//     const [isSettingPanelOpen, setSettingPanelOpen] = useState(false);

//     const iconButtons = [
//         { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e66681ed3196feb521456ae2f0cf233cf13c7254a8321ceccccaf34bbe71d40a?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d", bgColor: "#e1bcb9" },
//         { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c25b7b527303f319bcc60738145890934bb0a7231684a45cd38fb7651dfcbde2?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d", bgColor: "#79d3ee" },
//         { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3c749bb77bf72e38aabb1fa46b64e8c00c05f38d0dfc45217a0c8a86428692c3?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d", bgColor: "#79d3ee" }
//     ];

//     return (
//         <header className="w-full flex flex-col rounded-none">
//             <div className="flex justify-between px-4 py-1 w-full bg-white rounded-md border border-gray-200 border-solid">
//                 <div className="flex flex-1 gap-2 items-center my-auto text-sm font-semibold leading-none text-rose-500 capitalize">
//                 {/* <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/4912bbcfed46fa72637e9d4369cc9dec38dd7fd8474b60928734ed3e0ee425ea?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
//                 className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
//                 alt=""
//               />                */}
//               <PlayArrowIcon/>
//                   <div className="self-stretch my-auto w-[228px]">
//                         <span className="text-blue-700">OrderFlow</span>
//                         <span className="text-base font-extrabold">- (</span>
//                         <span className="text-base font-extrabold text-green-600">0</span>
//                         <span className="text-base font-extrabold">/</span>
//                         <span className="text-base font-extrabold text-rose-500">1</span>
//                         <span className="text-base font-extrabold">)</span>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <div className="flex gap-1 items-center">
//                         {iconButtons.map((button, index) => (
//                             <IconButton key={index} src={button.src} bgColor={button.bgColor} />
//                         ))}
//                     </div>
//                     {/* <img
//                         loading="lazy"
//                         src="https://cdn.builder.io/api/v1/image/assets/TEMP/312665476feaafbbb699af37859829ba55b6d4b037c299dab01df6d1d938392e?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d"
//                         alt=""
//                         className="object-contain shrink-0 my-auto w-6 aspect-square cursor-pointer"
//                         onClick={() => window.history.back()} // Navigate back on image click
//                     />               */}
//                     <PlayArrowIcon/>
//                      </div>
//             </div>

//             {isSettingPanelOpen && <SettingPanel onClose={() => setSettingPanelOpen(false)} />}
//         </header>
//     );
// };

// export default OrderFlowHeader;



// import React, { useState } from 'react';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// const IconButton = ({ src, bgColor, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="flex justify-center items-center w-10 h-10 rounded-md border border-gray-300 cursor-pointer hover:shadow-md"
//       style={{ backgroundColor: bgColor }}
//     >
//       <img
//         loading="lazy"
//         src={src}
//         alt="icon"
//         className="object-contain w-5 aspect-square"
//       />
//     </button>
//   );
// };

// const AddButton = ({ onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className="flex overflow-hidden gap-2 justify-center items-center px-3 py-2.5 text-sm font-semibold leading-none text-white whitespace-nowrap bg-blue-700 rounded-md hover:bg-blue-800"
//     >
//       <PlayArrowIcon />
//       <span className="self-stretch">ADD</span>
//     </button>
//   );
// };

// const IconButtons = () => {
//   const iconButtons = [
//     {
//       src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e66681ed3196feb521456ae2f0cf233cf13c7254a8321ceccccaf34bbe71d40a?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
//       bgColor: '#e1bcb9',
//     },
//     {
//       src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c25b7b527303f319bcc60738145890934bb0a7231684a45cd38fb7651dfcbde2?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
//       bgColor: '#79d3ee',
//     },
//     {
//       src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3c749bb77bf72e38aabb1fa46b64e8c00c05f38d0dfc45217a0c8a86428692c3?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
//       bgColor: '#79d3ee',
//     },
//   ];

//   const handleButtonClick = (index) => {
//     alert(`Button ${index + 1} clicked!`);
//   };

//   return (
//     <div className="flex gap-2">
//       {iconButtons.map((button, index) => (
//         <IconButton
//           key={index}
//           src={button.src}
//           bgColor={button.bgColor}
//           onClick={() => handleButtonClick(index)}
//         />
//       ))}
//     </div>
//   );
// };

// const OrderFlowHeader = () => {
//   const [isSettingPanelOpen, setSettingPanelOpen] = useState(false);

//   return (
//     <header className="w-full flex flex-col rounded-none">
//       <div className="flex justify-between px-4 py-1 w-full bg-white rounded-md border border-gray-200 border-solid">
//         <div className="flex flex-1 gap-2 items-center my-auto text-sm font-semibold leading-none text-rose-500 capitalize">
//           <PlayArrowIcon />
//           <div className="self-stretch my-auto w-[228px]">
//             <span className="text-blue-700">OrderFlow</span>
//             <span className="text-base font-extrabold">- (</span>
//             <span className="text-base font-extrabold text-green-600">0</span>
//             <span className="text-base font-extrabold">/</span>
//             <span className="text-base font-extrabold text-rose-500">1</span>
//             <span className="text-base font-extrabold">)</span>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           {/* Render the IconButtons component here */}
//           <IconButtons />
//           <AddButton onClick={() => alert('Add Button Clicked')} />
//         </div>
//       </div>

//       {isSettingPanelOpen && (
//         <div>
//           {/* Your Setting Panel Code */}
//           <button onClick={() => setSettingPanelOpen(false)}>Close Panel</button>
//         </div>
//       )}
//     </header>
//   );
// };

// export default OrderFlowHeader;


import React, { useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // MUI icon
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// IconButton Component to render icon as background image
const IconButton = ({ src, bgColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center w-12 h-12 rounded-full cursor-pointer hover:shadow-md"
      style={{
        backgroundColor: bgColor,
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover', // Ensure the image covers the button area
        backgroundPosition: 'center', // Center the image within the button
      }}
    />
  );
};

// AddButton Component to render the add button
const AddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex overflow-hidden gap-2 justify-center items-center px-3 py-2.5 text-sm font-semibold leading-none text-white whitespace-nowrap bg-blue-700 rounded-md hover:bg-blue-800"
    >
      <PlayArrowIcon />
      <span className="self-stretch">ADD</span>
    </button>
  );
};

// IconButtons Component with background images for each button
const IconButtons = () => {
  const iconButtons = [
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e66681ed3196feb521456ae2f0cf233cf13c7254a8321ceccccaf34bbe71d40a?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
      bgColor: '#e1bcb9',
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c25b7b527303f319bcc60738145890934bb0a7231684a45cd38fb7651dfcbde2?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
      bgColor: '#79d3ee',
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3c749bb77bf72e38aabb1fa46b64e8c00c05f38d0dfc45217a0c8a86428692c3?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d',
      bgColor: '#79d3ee',
    },
  ];

  const handleButtonClick = (index) => {
    alert(`Button ${index + 1} clicked!`);
  };

  return (
    <div className="flex gap-2">
      {iconButtons.map((button, index) => (
        <IconButton
          key={index}
          src={button.src}
          bgColor={button.bgColor}
          onClick={() => handleButtonClick(index)} // Pass the click handler
        />
      ))}
    </div>
  );
};

// OrderFlowHeader Component that uses the IconButtons and AddButton
const OrderFlowHeader = () => {
  const [isSettingPanelOpen, setSettingPanelOpen] = useState(false);

  return (
    <header className="w-full flex flex-col rounded-none">
      <div className="flex justify-between px-4 py-1 w-full bg-white rounded-md border border-gray-200 border-solid">
        <div className="flex flex-1 gap-2 items-center my-auto text-sm font-semibold leading-none text-rose-500 capitalize">
          <PlayArrowIcon />
          <div className="self-stretch my-auto w-[228px]">
            <span className="text-blue-700">OrderFlow</span>
            <span className="text-base font-extrabold">- (</span>
            <span className="text-base font-extrabold text-green-600">0</span>
            <span className="text-base font-extrabold">/</span>
            <span className="text-base font-extrabold text-rose-500">1</span>
            <span className="text-base font-extrabold">)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Render the IconButtons component here */}
          <IconButtons />
          <AddButton onClick={() => alert('Add Button Clicked')} />
        </div>
      </div>

      {isSettingPanelOpen && (
        <div>
          {/* Your Setting Panel Code */}
          <button onClick={() => setSettingPanelOpen(false)}>Close Panel</button>
        </div>
      )}
    </header>
  );
};

export default OrderFlowHeader;
