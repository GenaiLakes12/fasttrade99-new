import React from "react";
import Link from "next/link";

const IconButton = ({ src, bgColor, tooltip }) => {
    return (
        <div className="relative flex justify-center items-center w-10 h-10 rounded-md border border-gray-300" style={{ backgroundColor: bgColor }}>
            <i
                className="object-contain w-5 aspect-square text-white"
                aria-label="icon"
            />

            {/* Tooltip */}
            <span className="absolute bottom-full mb-1 px-2 py-1 text-xs text-white bg-black rounded shadow-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                {tooltip}
            </span>
        </div>
    );
};

const AddButton = () => {
    return (
        <Link href="/components/Strategies/StrategiesForm">
            <button className="flex overflow-hidden gap-2 justify-center items-center px-3 py-2.5 text-sm font-semibold leading-none text-white whitespace-nowrap bg-blue-700 rounded-md">
                <i
                    className="object-contain w-4 aspect-square"
                    aria-label="icon"
                />

                <span className="self-stretch">ADD</span>
            </button>
        </Link>
    );
};

const StrategiesHeader = () => {
    const iconButtons = [
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e66681ed3196feb521456ae2f0cf233cf13c7254a8321ceccccaf34bbe71d40a?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d", bgColor: "#e1bcb9", tooltip: "Manual Square Off" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3c749bb77bf72e38aabb1fa46b64e8c00c05f38d0dfc45217a0c8a86428692c3?placeholderIfAbsent=true&apiKey=c20b4089c62f47e3b73547d56c34685d", bgColor: "#79d3ee", tooltip: "Help" },
    ];

    return (
        <header className="w-full flex flex-col rounded-none">
            <div className="flex justify-between px-4 py-2 w-full bg-white rounded-md border border-gray-200">
                <div className="flex flex-1 gap-2 items-center text-sm font-semibold text-rose-500 capitalize">
                    <i
                        className="w-6 aspect-square"
                        aria-label="icon"
                    />

                    <div>
                        <span className="text-blue-700">Strategies</span>{" "}
                        <span className="text-base font-extrabold">- (</span>
                        <span className="text-base font-extrabold text-green-600">0</span>
                        <span className="text-base font-extrabold">/</span>
                        <span className="text-base font-extrabold text-rose-500">1</span>
                        <span className="text-base font-extrabold">)</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {iconButtons.map((button, index) => (
                        <IconButton key={index} src={button.src} bgColor={button.bgColor} tooltip={button.tooltip} />
                    ))}
                    <AddButton />
                    <Link href="/">
                        <i
                            className="w-6 aspect-square cursor-pointer"
                            aria-label="icon"
                        />

                    </Link>
                </div>
            </div>
        </header>
    );
};

export default StrategiesHeader;
