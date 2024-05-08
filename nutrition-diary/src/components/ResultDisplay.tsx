import React, { useState, useEffect } from "react";
import { SavedFoodData } from "@/app/lib/definitions";

export default function ResultDisplay(props: { results: SavedFoodData[] | undefined }) {
    useEffect(() => {
        if (props.results) {
            handleResult(props.results);
        }
    }, [props.results]);

    function handleResult(results: SavedFoodData[] | undefined) {
        if (!results) return;
        const foodDivs = results.map((food, index) => (
            <div key={index} className="items-center mb-4 border bg-gray-50 border-black">
                <img src={food.photo} alt="Food" className="block w-32 h-32" />
                <label className="block p-2.5 text-sm">
                    Food name: {food.food_name[0].toUpperCase() + food.food_name.slice(1)}
                </label>
                <label className="block p-2.5 text-sm">Calories: {food.nf_calories}</label>
    
                <label className="block p-2.5 text-sm">Protein: {food.nf_protein}</label>
                    
                <label className="block p-2.5 text-sm"> Fat: {food.nf_fat}</label>

                <label className="block p-2.5 text-sm">Carbohydrates: {food.nf_carbohydrates}</label>

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
