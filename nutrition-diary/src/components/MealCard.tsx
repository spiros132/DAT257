"use client";

import React, {useState, useEffect} from "react";
import { Nutrients } from "@/app/lib/definitions";


export default function MealCard(nutrients: {consumed: number[], target: number[]}){

    const [mealNutrients, setMealNutrients] = useState<number[]>([0,0,0,0]);
    const [dailyTargetNutrients, setDailyTargetNutrients] = useState<number[]>([0,0,0,0]);

    useEffect(() => {
        populateInfo(nutrients);
    }, [nutrients.consumed, nutrients.target]); 

    function populateInfo(nutrients: {consumed: number[], target: number[]}){
        if (nutrients.consumed){setMealNutrients(nutrients.consumed);}
        if (nutrients.target){setDailyTargetNutrients(nutrients.target);}

    }

    return (
        <div className="h-[35vh] w-[12vw] bg-white m-10">
            <div className="bg-primary h-[20%] w-[100%] rounded-t-[20px] flex">
                <p className="text-white text-[20px] m-auto">
                  Meal Name  
                </p>
            </div>
            <div className="h-[80%] border border-gray-500 border-t-0 flex-col justify-between p-4 rounded-b-[20px]">
                <div className="h-[25%] flex items-center justify-center flex-col">
                    <p>
                        Calories
                    </p>
                    <p className="text-[0.8em]">
                        {mealNutrients[0]} ({mealNutrients[0]/dailyTargetNutrients[0] * 100}%)
                    </p>                    
                </div>
                <div className="h-[25%] flex items-center justify-center flex-col">
                    <p>
                        Carbohydrates
                    </p>   
                    <p className="text-[0.8em]">
                        {mealNutrients[1]} ({mealNutrients[1]/dailyTargetNutrients[1] * 100}%)
                    </p>                   
                </div>
                <div className="h-[25%] flex items-center justify-center flex-col">
                    <p>
                        Protein
                    </p>   
                    <p className="text-[0.8em]">
                        {mealNutrients[2]} ({mealNutrients[2]/dailyTargetNutrients[2] * 100}%)
                    </p>                   
                </div>
                <div className="h-[25%] flex items-center justify-center flex-col">
                    <p>
                        Fat
                    </p>   
                    <p className="text-[0.8em]">
                        {mealNutrients[3]} ({mealNutrients[3]/dailyTargetNutrients[3] * 100}%)
                    </p>                   
                </div>
            </div>
        </div>
      )
}
