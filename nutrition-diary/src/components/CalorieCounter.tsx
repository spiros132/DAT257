"use client";
import React, {useState, useEffect} from "react";
import { getCalorieCounterInfo } from "@/app/actions/actions";


export default function CalorieCounter(nutrients: {target: number[]}){


    const [targetNutrients, setTargetNutrients] = useState<number[]>([0,0,0,0]);
    const [calorieCounterInfo, setCalorieCounterInfo] = useState<number[]>([0,0,0,0]);
    

    useEffect(() => {
        async function fetchData() {
            const info = await getCalorieCounterInfo();
            setCalorieCounterInfo(info);
        }
        fetchData();
    }, []); 
 
    function populateInfo(nutrients: {consumed: number[], target: number[]}){
    
        setTargetNutrients(nutrients.target);

    }

    return (
        <div className="h-[60vh] w-[18vw] bg-white absolute top-0 right-0 border border-gray-500 border-t-0 border-r-0">
            <div className="h-[33%] flex justify-center items-center flex-col">
                <p className="text-[2em]">
                    Calories
                </p>
                <div className="bg-lighterGreen h-[20px] w-[80%] m-2">
                    <div className="bg-greenTheme h-full w-[50%]">
                    </div>
                </div>
                <p className="text-[1.4em]">
                    {calorieCounterInfo[0]} / {targetNutrients[0]}
                </p>
            </div>

            <div className="h-[20%] flex justify-center items-center flex-col">
                <p className="text-[1.4em]">
                    Carbohydrates
                </p>
                <div className="bg-lighterGreen h-[15px] w-[60%] m-2">
                    <div className="bg-greenTheme h-full w-[50%]">
                    </div>
                </div>
                <p className="text-[1em]">
                    {calorieCounterInfo[1]} / {targetNutrients[1]}
                </p>
            </div>
            
            <div className="h-[20%] flex justify-center items-center flex-col">
                <p className="text-[1.4em]">
                    Protein
                </p>
                <div className="bg-lighterGreen h-[15px] w-[60%] m-2">
                    <div className="bg-greenTheme h-full w-[50%]">
                    </div>
                </div>
                <p className="text-[1em]">
                    {calorieCounterInfo[2]} / {targetNutrients[2]}
                </p>
            </div>

            <div className="h-[20%] flex justify-center items-center flex-col">
                <p className="text-[1.4em]">
                    Fat
                </p>
                <div className="bg-lighterGreen h-[15px] w-[60%] m-2">
                    <div className="bg-greenTheme h-full w-[50%]">
                    </div>
                </div>
                <p className="text-[1em]">
                    {calorieCounterInfo[3]} / {targetNutrients[3]}
                </p>
            </div>

        </div>
      )
} 