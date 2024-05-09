import React, { useState, useEffect } from "react";

import { SearchListFoodItemCommon } from "@/app/lib/definitions";

export default function ResultDisplay(props: { results: SearchListFoodItemCommon[] | undefined }) {
    useEffect(() => {
        if (props.results) {
            handleResult(props.results);
        }
    }, [props.results]);
    
    function handleResult(results: SearchListFoodItemCommon[] | undefined) {
        if (!results) return;

        const foodDivs = results.map((food, index) => (
            <div key={index} className="items-center mb-4">
                <img src={food.photo.thumb} alt="Food" className="block w-32" />
                <label className="block p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    Food name: {food.food_name}
                </label>
                <label className="block p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    Calories: {food.serving_qty}
                </label>
            </div>
        ));

        return foodDivs;
    }

    return (
        <div className="grid grid-flow-col gap-2">
            {props.results ? (
                <>
                    {handleResult(props.results)}
                </>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}
