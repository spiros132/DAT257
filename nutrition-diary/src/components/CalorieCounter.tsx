"use client";
import React, {useState, useEffect} from "react";

export default function CalorieCounter(nutrients: {consumed: number[], target: number[]}){

    const [consumedNutrients, setConsumedNutrients] = useState<number[]>([0,0,0,0]);
    const [targetNutrients, setTargetNutrients] = useState<number[]>([0,0,0,0]);


    useEffect(() => {
        populateInfo(nutrients);
    }, [nutrients.consumed, nutrients.target]); 

    function populateInfo(nutrients: {consumed: number[], target: number[]}){
    
        setConsumedNutrients(nutrients.consumed);
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
                    {consumedNutrients[0]} / {targetNutrients[0]}
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
                    {consumedNutrients[1]} / {targetNutrients[1]}
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
                    {consumedNutrients[2]} / {targetNutrients[2]}
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
                    {consumedNutrients[3]} / {targetNutrients[3]}
                </p>
            </div>

        </div>
      )
} 