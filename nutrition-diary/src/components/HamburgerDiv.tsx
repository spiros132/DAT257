"use client";

export default function HamburgerDiv(props: {readonly onClick: () => void}){
    return (
        <button
        className="flex flex-col gap-2 items-center"
        onClick={props.onClick}
        >
            <div className="w-[50px] h-[4px] rounded-xl bg-black"></div>
            <div className="w-[50px] h-[4px] rounded-xl bg-black"></div>
            <div className="w-[50px] h-[4px] rounded-xl bg-black"></div>
        </button>
    );
} 