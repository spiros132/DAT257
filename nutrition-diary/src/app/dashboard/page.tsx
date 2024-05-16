"use client";
import React, {useState, useEffect} from "react";

import MealCard from "@/components/MealCard";
import CalorieCounter from "@/components/CalorieCounter";
import AddMealButton from "@/components/AddMealButton";
import HamburgerDiv from "@/components/HamburgerDiv";
import { getEatenMeals } from "@/app/actions/actions";


export default function Page(){
    const [days, setDays] = useState<number>(1);
    const [meals, setMeals] = useState<any[]>([]);

    async function fetchData() {
        try {
            console.log("Fetching eaten meals")
            const eatenMeals = await getEatenMeals(days);
            console.log("Eaten meals:", eatenMeals)
            setMeals(eatenMeals);
        } catch (error) {
            console.error("Error fetching eaten meals:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [days]);

    

    return (
        <div className="w-screen flex">
            <div className="w-[93%] h-screen">
                <CalorieCounter target = {[0,0,0,0]}/>
                <div className="h-screen flex flex-col">
                    <div className="h-[50%] w-[75vw] flex">
                        <nav className="w-full h-[15vh] flex justify-around">
                            <div className="w-[20%]"></div>
                            <button className={`text-[2.5rem] ${days == 1 ? ' underline' : ''}`} onClick={() => setDays(1)}>
                                Today
                            </button>
                            <button className={`text-[2.5rem] ${days == 7 ? ' underline' : ''}`} onClick={() => setDays(7)}>
                                Weekly
                            </button>
                            <button className={`text-[2.5rem] ${days == 30 ? ' underline' : ''}`} onClick={() => setDays(30)}>
                                Monthly
                            </button>
                            <div className="w-[20%]"></div>
                        </nav>
                        <div></div>
                    </div> 

                    <div className="h-[50%] w-full">
                        <div className="flex justify-center items-center">
                            {meals.map((meal, index) => (
                                <MealCard
                                    mealName={meal[4]}
                                    eatenDay={meal[5]}
                                    key={index}
                                    nutrients={{consumed: [
                                        meal[0], // calories
                                        meal[1], // carbs
                                        meal[2], // protein
                                        meal[3], // fat
                                    ], target: [0, 0, 0, 0]}} // Need to sort some stuff out in the db
                                />
                            ))}
                            <AddMealButton/>
                        </div>                
                    </div>                
                </div>
            </div>            
        </div>
      )
} 