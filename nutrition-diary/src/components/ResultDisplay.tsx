import React, { useState, useEffect } from "react";
import { SavedFoodData } from "@/app/lib/definitions";

export default function ResultDisplay({ onAdd, results }: { onAdd: (foodName: SavedFoodData) => void, results: SavedFoodData[] | undefined }) {
    useEffect(() => {
        if (results) {
            handleResult(results);
        }
    }, [results]);

    const onCardClick = (foodName: SavedFoodData) => {
        onAdd(foodName);
    };
    function handleResult(results: SavedFoodData[] | undefined) {
        if (!results) return;
        const foodDivs = results.map((food, index) => (
        <div key={index} className="items-center mb-4 border bg-gray-50 border-black">
            <img src={food.photo} alt="Food" className="block w-32 h-32" />
            <label className="block p-2.5 text-sm">
                Food name: {food.food_name[0].toUpperCase() + food.food_name.slice(1)}
            </label>
            <label className="block p-2.5 text-sm">Calories: {food.nf_calories} Kcal</label>

            <label className="block p-2.5 text-sm">Protein: {food.nf_protein} g</label>
                
            <label className="block p-2.5 text-sm"> Fat: {food.nf_fat} g </label>

            <label className="block p-2.5 text-sm">Carbohydrates: {food.nf_carbohydrates} g</label>

            <button onClick={e => onCardClick(food)} className="relative left-3 border border-black">
                Add
            </button>
        </div>
        ));

        return foodDivs;
    }


    return (
        <div className="grid grid-flow-col gap-2">
            {results ? (
                <>
                    {handleResult(results)}
                </>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}
