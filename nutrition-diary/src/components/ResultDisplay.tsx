import React, { useState, useEffect } from "react";
import { SearchForFoodList } from "@/app/actions/actions";
import { SearchListFoodItemCommon } from "@/app/lib/definitions";
import { SearchListFoodItemData } from "@/app/lib/definitions";
import { SearchFoodItemNutrientsData } from "@/app/lib/definitions";
import { SearchFoodItemNutrients } from "@/app/lib/definitions";
import { SearchForFood } from "@/app/actions/actions";
export default function ResultDisplay(props: { results: SearchListFoodItemCommon[] | undefined }) {
    useEffect(() => {
        if (props.results) {
            handleResult(props.results);
        }
    }, [props.results]);

    function handleResult(results: SearchListFoodItemCommon[] | undefined) {
        if (!results) return;

        const foodDivs = results.map((food, index) => (
            <div key={index} className="items-center mb-4 border bg-gray-50 border-black">
                <img src={food.photo.thumb} alt="Food" className="block w-32 h-32" />
                <label className="block p-2.5 text-sm">
                    Food name: {food.food_name}
                </label>
                <label className="block p-2.5 text-sm">
                    Calories: {food.serving_qty}
                </label>
                <button className="relative left-3 border border-black">
                    Add
                </button>
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
