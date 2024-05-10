"use client";
import MealCard from "@/components/MealCard";
import CalorieCounter from "@/components/CalorieCounter";
import AddMealButton from "@/components/AddMealButton";
import HamburgerDiv from "@/components/HamburgerDiv";


export default function Page(){
    return (
        <div className="w-screen flex">
            <div className="w-[93%] h-screen">
                <CalorieCounter/>
                <div className="h-screen flex flex-col">
                    <div className="h-[50%] w-[75vw] flex">
                        <nav className="w-full h-[15vh] flex justify-around">
                            <div className="w-[20%]"></div>
                            <button className="text-[2.5rem]">
                                Today
                            </button>
                            <button className="text-[2.5rem]">
                                Weekly
                            </button>
                            <button className="text-[2.5rem]">
                                Monthly
                            </button>
                            <div className="w-[20%]"></div>
                        </nav>
                        <div></div>
                    </div> 

                    <div className="h-[50%] w-full">
                        <div className="flex justify-center items-center">
                            <MealCard/>
                            <MealCard/>
                            <MealCard/>   
                            <AddMealButton/>
                        </div>                
                    </div>                
                </div>
            </div>            
        </div>
      )
} 