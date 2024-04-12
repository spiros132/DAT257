"use client";
import React, {useState, useEffect} from "react";

export default function ResultDisplay(props: {result: any}){
    const [foodName, setFoodName] = useState<string>('');
    const [calories, setCalories] = useState<string>('');
    const [photo, setPhoto] = useState<string>('');

    useEffect(() => {
        if (props.result){handleResult(props.result);}
    }, [props.result]); 

    function handleResult(result: any){
        result.foods.forEach((food: any) => {
            setPhoto(food.photo.thumb);
            setFoodName(food.food_name);
            setCalories(food.nf_calories);
        });
    }

    return (
        <div className="items-center min-h-screen">
        <img src={photo} alt="Food" className="block w-32 h-32"/>
        <label className="block p-2.5 text-sm text-gray-900 bg-gray-50  border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white ">
        Food name: {foodName}
        </label>
        <label className="block p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white ">
        Calories: {calories}
        </label>
        </div>
    );

}
    

