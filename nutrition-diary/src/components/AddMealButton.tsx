"use client";

export default function AddMealButton(){


    return (
        <div className="flex flex-col items-center">
            <button className="w-[50px] h-[50px] rounded-full bg-greenTheme relative">
                <div className="bg-white w-[5px] h-[30px] absolute left-[22.5px] top-[10px]"></div>
                <div className="bg-white w-[30px] h-[5px] absolute left-[10px] top-[22.5px]"></div>
            </button>
            <p>Add Meal</p>
        </div>
      )
} 