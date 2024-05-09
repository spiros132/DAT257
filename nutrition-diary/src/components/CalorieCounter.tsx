"use client";

import { SavedFoodData } from "@/app/lib/definitions";
import { useEffect, useState } from "react";

export default function CalorieCounter(props: {result: SavedFoodData[] | undefined}){
    const [calories, setCalories] = useState<number>(0);
    const [carbohydrates, setCarbohydrates] = useState<number>(0);
    const [protein, setProtein] = useState<number>(0);
    const [fat, setFat] = useState<number>(0);
    
    useEffect(() => {
        if (props.result) {
            calculateNutrients(props.result);
        }
    }, [props.result]);

    const calculateNutrients = (result: SavedFoodData[]) => {
        if (!result) return;
        let totalCalories = 0;
        let totalCarbohydrates = 0;
        let totalProtein = 0;
        let totalFat = 0;
        result.forEach((food) => {
            totalCalories += food.nf_calories * food.serving_qty;
            totalCarbohydrates += food.nf_carbohydrates * food.serving_qty;
            totalProtein += food.nf_protein * food.serving_qty;
            totalFat += food.nf_fat * food.serving_qty;
        });
        setCalories(totalCalories);
        setCarbohydrates(totalCarbohydrates);
        setProtein(totalProtein);
        setFat(totalFat);
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
                    {calories} Kcal
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
                    {carbohydrates} g
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
                    {protein} g
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
                    {fat} g
                </p>
            </div>

        </div>
      )
} 