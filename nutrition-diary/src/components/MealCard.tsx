"use client";

import React, {useState, useEffect} from "react";
import styles from './MealCard.module.css'; // Import the CSS module
import { Nutrients } from "@/app/lib/definitions";

export default function MealCard(props: { mealName: string, eatenDay: string, nutrients: { consumed: number[], target: number[] }, isSelected: boolean, onClick: () => void }) {
    if (!props.nutrients) { return null }
    const [mealNutrients, setMealNutrients] = useState<number[]>([0, 0, 0, 0]);
    const [dailyTargetNutrients, setDailyTargetNutrients] = useState<number[]>([0, 0, 0, 0]);

    useEffect(() => {
        console.log(props.nutrients);
        populateInfo(props.nutrients);
    }, [props.nutrients.consumed, props.nutrients.target]);

    function populateInfo(nutrients: { consumed: number[], target: number[] }) {
        if (nutrients.consumed) { setMealNutrients(nutrients.consumed); }
        if (nutrients.target) { setDailyTargetNutrients(nutrients.target); }
    }

    return (
        <div className="h-[35vh] w-[12vw] bg-white m-10">
            <div className="bg-primary h-[20%] w-[100%] rounded-t-[20px] flex flex-col">
                <p className="text-white text-[20px] m-auto">
                    {props.mealName}
                </p>
                <p className="text-sm text-white m-auto">
                    {props.eatenDay}
                </p>
            </div>
            <div className="h-[80%] border border-gray-500 border-t-0 flex-col justify-between p-4 rounded-b-[20px]">
                <div className="h-[25%] flex items-center justify-center flex-col">
                    <p>
                        Calories
                    </p>
                    <p className="text-[0.8em]">
                        {Math.floor(mealNutrients[0])} ({Math.floor(mealNutrients[0] / dailyTargetNutrients[0] * 100)}%)
                    </p>
                </div>
                <div className="h-[25%] flex items-center justify-center flex-col">
                    <p>
                        Carbohydrates
                    </p>
                    <p className="text-[0.8em]">
                        {Math.floor(mealNutrients[1])} ({Math.floor(mealNutrients[1] / dailyTargetNutrients[1] * 100)}%)
                    </p>
                </div>
                <div className="h-[25%] flex items-center justify-center flex-col">
                    <p>
                        Protein
                    </p>
                    <p className="text-[0.8em]">
                        {Math.floor(mealNutrients[2])} ({Math.floor(mealNutrients[2] / dailyTargetNutrients[2] * 100)}%)
                    </p>
                </div>
                <div className="h-[25%] flex items-center justify-center flex-col">
                    <p>
                        Fat
                    </p>
                    <p className="text-[0.8em]">
                        {Math.floor(mealNutrients[3])} ({Math.floor(mealNutrients[3] / dailyTargetNutrients[3] * 100)}%)
                    </p>
                </div>
            </div>
        </div>
    )
}
