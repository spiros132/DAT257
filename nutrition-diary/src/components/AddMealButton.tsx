"use client";

import Link from "next/link";

export default function AddMealButton(){


    return (
        <div className="flex flex-col items-center">
            <Link href={"/mealpage"} 
            className="w-[50px] h-[50px] rounded-full bg-primary relative">
                <div className="bg-white w-[5px] h-[30px] absolute left-[22.5px] top-[10px]"></div>
                <div className="bg-white w-[30px] h-[5px] absolute left-[10px] top-[22.5px]"></div>
            </Link>
            <p>Add Meal</p>
        </div>
      )
} 