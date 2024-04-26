"use client";

export default function HamburgerDiv(){


    return (
        <div className="w-27 h-screen border-r border-gray-500" style={{ borderTop: 'none' }}>
        <button className="w-[50px] h-[50px] flex flex-col justify-center items-center m-auto mt-[5vh]">
            <div className="w-[60px] h-[4px] bg-black m-1"></div>
            <div className="w-[60px] h-[4px] bg-black m-1"></div>
            <div className="w-[60px] h-[4px] bg-black m-1"></div>
        </button>
    </div>
      )
} 