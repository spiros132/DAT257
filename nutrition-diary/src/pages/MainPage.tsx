"use client";
import MealCard from "@/components/MealCard";
import CalorieCounter from "@/components/CalorieCounter";


export default function MainPage(){


    return (
        <div>
            <CalorieCounter/>   
            <div className="flex">
                <MealCard />
                <MealCard/>
                <MealCard/>       
            </div>
  
        </div>

      )
} 