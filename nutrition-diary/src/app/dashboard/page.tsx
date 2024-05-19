"use client"
import React, { useState, useEffect } from "react";

import MealCard from "@/components/MealCard";
import CalorieCounter from "@/components/CalorieCounter";
import AddMealButton from "@/components/AddMealButton";
import { addTarget, fetchTargetGoal, getEatenMeals, getUserId } from "@/app/actions/actions";
import UserProgressHistogram from "@/components/UserProgressHistogram";
import { Nutrients } from "../lib/definitions";

export default function Page() {

    const [loading, setLoading] = useState<boolean>(false);
    const [days, setDays] = useState<number>(1);
    const [meals, setMeals] = useState<{
        calories: number;
        carbs: number;
        protein: number;
        fat: number;
        name: string;
        date: string;
    }[]>([]);
    const [target, setTarget] = useState<Nutrients>({
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0
    });


    const [showHistogram, setShowHistogram] = useState<boolean>(false);
    const [histogramInterval, setHistogramInterval] = useState<string>("");

    async function fetchData() {
        try {

            const fetched_target = await fetchTargetGoal();
            console.log(fetched_target)
            setTarget(fetched_target); 

            setLoading(true);
            console.log("Fetching eaten meals");
            const eatenMeals = await getEatenMeals(days);
            console.log("Eaten meals:", eatenMeals);
            setMeals(eatenMeals);

            setLoading(false);
            console.log(meals)
        } catch (error) {
            console.error("Error fetching eaten meals:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [days]);

    const handleButtonClick = (numberOfDays: number, interval: string) => {
        setDays(numberOfDays);
        setHistogramInterval(interval);
        setShowHistogram(numberOfDays !== 1); // Show histogram if not 'Today'
    };


    return (
        <div className="w-screen flex">
            <div className="w-[93%] h-screen">
                <CalorieCounter target={[target.calories,
                                                target.carbs,
                                                target.protein,
                                                target.fat]} />
                <div className="h-screen flex flex-col">
                    <div className="h-[50%] w-[75vw]">
                        <div>
                            <nav className="w-full h-[15vh] flex justify-around">
                                <div className="w-[20%]"></div>
                                <button
                                    className={`text-[2.5rem] ${
                                        days === 1 ? " underline" : ""
                                    }`}
                                    onClick={() => handleButtonClick(1, "today")}
                                >
                                    Today
                                </button>
                                <button
                                    className={`text-[2.5rem] ${    
                                        days === 7 ? " underline" : ""
                                    }`}
                                    onClick={() => handleButtonClick(7, "weekly")}
                                >
                                    Weekly
                                </button>
                                <button
                                    className={`text-[2.5rem] ${
                                        days === 30 ? " underline" : ""
                                    }`}
                                    onClick={() => handleButtonClick(30, "monthly")}
                                >
                                    Monthly
                                </button>
                                <div className="w-[20%]"></div>
                            </nav>
                        </div>
                        {showHistogram && (
                            <div className="h-[50%] w-full">
                                <div className="flex justify-center items-center">
                                    <UserProgressHistogram interval={histogramInterval} />
                                </div>
                            </div>
                        )}
                        {!showHistogram && (
                            <div className="flex justify-center items-center">
                                {loading && <p>Loading...</p>} 
                                {!loading && meals.length === 0 && <p>No meals found</p>}
                                {!loading && meals.length > 0 && meals.map((meal, index) => (
                                    <MealCard
                                        mealName={meal.name}
                                        eatenDay={meal.date}
                                        isSelected={false}
                                        onClick={() => {}}
                                        key={index}
                                        nutrients={{
                                            consumed: [
                                                meal.calories, // calories
                                                meal.carbs, // carbs
                                                meal.protein, // protein
                                                meal.fat, // fat
                                            ],
                                            target: [
                                                target.calories,
                                                target.carbs,
                                                target.protein,
                                                target.fat
                                            ],
                                        }}                                   />
                                ))}
                                {!loading && <AddMealButton />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
