"use client";
import React, {useState, useEffect} from "react";

import { SearchFoodItemNutrientsData, SearchFoodItemNutrients, SearchListFoodItemCommon } from '@/app/lib/definitions';

export default function ResultDisplay(props: {readonly result: SearchListFoodItemCommon | undefined}){
    const [foodName, setFoodName] = useState<string>('');
    const [calories, setCalories] = useState<number>(-1);
    const [photo, setPhoto] = useState<string>('');

    useEffect(() => {
        if (props.result){handleResult(props.result);}
    }, [props.result]); 


    function handleResult(result: SearchListFoodItemCommon | undefined) {
        try {
                if(result != undefined) {  
                setPhoto(result.photo.thumb);
                setFoodName(result.food_name);
                setCalories(result.serving_qty);
                }
        } catch (error) {
            console.error('Error parsing result:', error);
            // Handle non-JSON data gracefully here
        }
    }
    

    if(photo != "" && foodName != "" && calories != -1)
        return (
            <div className="items-center min-h-screen">
                <img src={photo} alt="Food" className="block w-32"/>
                <label className="block p-2.5 text-sm text-gray-900 bg-gray-50  border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white ">
                    Food name: {foodName}
                </label>
                <label className="block p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white ">
                    Calories: {calories}
                </label>
            </div>
        );
    else
        return (
            <>
            </>
        );

}
    

