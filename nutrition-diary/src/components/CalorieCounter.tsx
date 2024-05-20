"use client";
import React, {useState, useEffect} from "react";
import { getCalorieCounterInfo } from "@/app/actions/actions";
import { Nutrients } from "@/app/lib/definitions";

export default function CalorieCounter(nutrients: {target: number[]}){

    
    const [targetNutrients, setTargetNutrients] = useState<number[]>([0,0,0,0]);
    const [calorieCounterInfo, setCalorieCounterInfo] = useState<Nutrients>({calories: 0, carbs: 0, protein: 0, fat:0});
    
    function round(number: number){
        return Math.round(number*100)/100;
    }

useEffect(() => {
    getCalorieCounterInfo().then((info) => {
        setCalorieCounterInfo(info);
    });
}, []);

useEffect(() => {
    populateInfo(nutrients);
}, [nutrients]);
 
    function populateInfo(nutrients: {target: number[]}){
    
        setTargetNutrients(nutrients.target);

    }

    return (
        <div className="h-[60vh] w-[18vw] bg-white absolute top-0 right-0 border border-gray-500 border-t-0 border-r-0">
            <div className="h-[33%] flex justify-center items-center flex-col">
                <p className="text-[2em]">
                    Calories
                </p>
                <div className="bg-primary-light h-[20px] w-[80%] m-2">
                    <div className="bg-primary h-full" style={{ width: `${Math.min(100, Math.floor(calorieCounterInfo.calories/targetNutrients[0]*100))}%` }}>
                    </div>
                </div>
                <p className="text-[1.4em]">
                    {Math.floor(calorieCounterInfo.calories)} / {targetNutrients[0]}
                </p>
            </div>

            <div className="h-[20%] flex justify-center items-center flex-col">
                <p className="text-[1.4em]">
                    Carbohydrates
                </p>
                <div className="bg-primary-light h-[15px] w-[60%] m-2">
                    <div className="bg-primary h-full" style={{ width: `${Math.min(100, Math.floor(calorieCounterInfo.carbs/targetNutrients[1]*100))}%` }}>
                    </div>
                </div>
                <p className="text-[1em]">
                    {Math.floor(calorieCounterInfo.carbs)} / {targetNutrients[1]}
                </p>
            </div>
            
            <div className="h-[20%] flex justify-center items-center flex-col">
                <p className="text-[1.4em]">
                    Protein 
                </p>
                <div className="bg-primary-light h-[15px] w-[60%] m-2">
                    <div className="bg-primary h-full" style={{ width: `${Math.min(100,Math.floor(calorieCounterInfo.protein/targetNutrients[2]*100))}%` }}>
                    </div>
                </div>
                <p className="text-[1em]">
                    {Math.floor(calorieCounterInfo.protein)} / {targetNutrients[2]}
                </p>
            </div>

            <div className="h-[20%] flex justify-center items-center flex-col">
                <p className="text-[1.4em]">
                    Fat
                </p>
                <div className="bg-primary-light h-[15px] w-[60%] m-2">
                    <div className="bg-primary h-full" style={{ width: `${Math.min(100, Math.floor(calorieCounterInfo.fat/targetNutrients[3]*100))}%` }}>
                    </div>
                </div>
                <p className="text-[1em]">
                    {Math.floor(calorieCounterInfo.fat)} / {targetNutrients[3]}
                </p>
            </div>

        </div>
      )
} 