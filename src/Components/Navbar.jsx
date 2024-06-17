// src/Navbar.js
import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { CiUnlock, CiLock, CiEraser } from "react-icons/ci";
import { FaRegHandPaper, FaRegSquare, FaRegCircle, FaLongArrowAltRight, FaFont } from "react-icons/fa";
import { PiCursorBold } from "react-icons/pi";
import { BsDiamond, BsBook } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { RiShapesLine } from "react-icons/ri";

const Navbar = ({ setActiveTool }) => {
    const [showLock, setShowLock] = useState(true);
    const [activeButton, setActiveButton] = useState(null);

    const handleToggleLock = () => {
        setShowLock(prevState => !prevState);
    };

    const handleButtonClick = (tool) => {
        setActiveTool(tool);
        setActiveButton(tool);
    };

    return (
        <>
            <div className="flex flex-row mx-auto justify-between items-center bg-transparent p-5 z-10">
                <button className='text-gray-400 p-3 bg-[#232329] rounded-lg'>
                    <IoMenu size={20} />
                </button>
                <div className="flex flex-row justify-between gap-2 ml-32 items-center font-semibold text-gray-400 p-2 bg-[#232329] rounded-lg">
                    {showLock ? (
                        <button className='hover:bg-[#a8a5ff] rounded-lg transition duration-500 hover:text-gray-800 p-2' onClick={handleToggleLock}><CiLock /></button>
                    ) : (
                        <button className='hover:bg-[#a8a5ff] rounded-lg transition duration-500 hover:text-gray-800 p-2' onClick={handleToggleLock}><CiUnlock /></button>
                    )}
                    <div className="w-[1px] h-6 bg-gray-400"></div>
                    <button className={`hover:bg-[#a8a5ff] rounded-lg transition duration-500 hover:text-gray-800 p-2 ${activeButton === 'hand' && 'bg-[#a8a5ff] text-gray-800'}`} onClick={() => handleButtonClick('hand')}><FaRegHandPaper /></button>
                    <button className={`hover:bg-[#a8a5ff] rounded-lg transition duration-500 hover:text-gray-800 p-2 ${activeButton === 'cursor' && 'bg-[#a8a5ff] text-gray-800'}`} onClick={() => handleButtonClick('cursor')}><PiCursorBold /></button>
                    <button className={`hover:bg-[#a8a5ff] rounded-lg transition duration-500 hover:text-gray-800 p-2 ${activeButton === 'rectangle' && 'bg-[#a8a5ff] text-gray-800'}`} onClick={() => handleButtonClick('rectangle')}><FaRegSquare /></button>
                    <button className={`hover:bg-[#a8a5ff] rounded-lg transition duration-500 hover:text-gray-800 p-2 ${activeButton === 'diamond' && 'bg-[#a8a5ff] text-gray-800'}`} onClick={() => handleButtonClick('diamond')}><BsDiamond /></button>
                    <button className={`hover:bg-[#a8a5ff] rounded-lg transition duration-500 hover:text-gray-800 p-2 ${activeButton === 'circle' && 'bg-[#a8a5ff] text-gray-800'}`} onClick={() => handleButtonClick('circle')}><FaRegCircle /></button>
                    <button className={`hover:bg-[#a8a5ff] rounded-lg transition duration-500 hover:text-gray-800 p-2 ${activeButton === 'arrow' && 'bg-[#a8a5ff] text-gray-800'}`} onClick={() => handleButtonClick('arrow')}><FaLongArrowAltRight /></button>
                    <button className={`hover:bg-[#a8a5ff] rounded-lg transition duration-500 hover:text-gray-800 p-2 ${activeButton === 'line' && 'bg-[#a8a5ff] text-gray-800'}`} onClick={() => handleButtonClick('line')}>
                        <div className="w-[14px] h-[2.4px] rounded-lg bg-gray-400"></div>
                    </button>
                    <button className={`hover:bg-[#a8a5ff] rounded-lg transition duration-500 hover:text-gray-800 p-2 ${activeButton === 'text' && 'bg-[#a8a5ff] text-gray-800'}`} onClick={() => handleButtonClick('font')}><FaFont /></button>
                    <button className={`hover:bg-[#a8a5ff] rounded-lg transition duration-500 hover:text-gray-800 p-2 ${activeButton === 'image' && 'bg-[#a8a5ff] text-gray-800'}`} onClick={() => handleButtonClick('image')}><IoImageOutline size={18} /></button>
                    <button className={`hover:bg-[#a8a5ff] rounded-lg transition duration-500 hover:text-gray-800 p-2 ${activeButton === 'eraser' && 'bg-[#a8a5ff] text-gray-800'}`} onClick={() => handleButtonClick('eraser')}><CiEraser /></button>
                    <div className="w-[1px] h-6 bg-gray-400"></div>
                    <button className={`hover:bg-[#a8a5ff] rounded-lg transition duration-500 hover:text-gray-800 p-2 ${activeButton === 'shapes' && 'bg-[#a8a5ff] text-gray-800'}`} onClick={() => handleButtonClick('shapes')}><RiShapesLine /></button>
                </div>
                <div className="flex flex-row gap-3">
                    <button className='p-3 text-xs bg-[#a8a5ff] text-[#232329] rounded-lg'>
                        Share
                    </button>
                    <button className='text-gray-400 p-3 flex flex-row justify-between items-center gap-2 text-xs bg-[#232329] rounded-lg'>
                        <BsBook className='font-semibold' />
                        <p>Library</p>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar;
