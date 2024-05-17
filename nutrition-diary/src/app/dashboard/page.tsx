"use client"
import React, { useState, useEffect } from "react";

import MealCard from "@/components/MealCard";
import CalorieCounter from "@/components/CalorieCounter";
import AddMealButton from "@/components/AddMealButton";
import { getEatenMeals } from "@/app/actions/actions";
import UserProgressHistogram from "@/components/UserProgressHistogram";

export default function Page() {
    const [days, setDays] = useState<number>(1);
    const [meals, setMeals] = useState<any[]>([]);
    const [showHistogram, setShowHistogram] = useState<boolean>(false);
    const [histogramInterval, setHistogramInterval] = useState<string>("");

    async function fetchData() {
        try {
            console.log("Fetching eaten meals");
            const eatenMeals = await getEatenMeals(days);
            console.log("Eaten meals:", eatenMeals);
            setMeals(eatenMeals);
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
                <CalorieCounter target={[0, 0, 0, 0]} />
                <div className="h-screen flex flex-col">
                    <div className="h-[50%] w-[75vw]">
                        <div>
                            <nav className="w-full h-[15vh] flex justify-around">
                                <div className="w-[20%]"></div>
                                <button
                                    className={`text-[2.5rem] ${
                                        days === 1 ? " underline" : ""
                                    }`}
                                    onClick={() => handleButtonClick(1, "")}
                                >
                                    Today
                                </button>
                                <button
                                    className={`text-[2.5rem] ${
                                        days === 7 ? " underline" : ""
                                    }`}
                                    onClick={() => handleButtonClick(7, "Weekly")}
                                >
                                    Weekly
                                </button>
                                <button
                                    className={`text-[2.5rem] ${
                                        days === 30 ? " underline" : ""
                                    }`}
                                    onClick={() => handleButtonClick(30, "Monthly")}
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
                                {meals.map((meal, index) => (
                                    <MealCard
                                        mealName={meal[4]}
                                        key={index}
                                        nutrients={{
                                            consumed: [
                                                meal[0], // calories
                                                meal[1], // carbs
                                                meal[2], // protein
                                                meal[3], // fat
                                            ],
                                            target: [0, 0, 0, 0],
                                        }}
                                    />
                                ))}
                                <AddMealButton />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
