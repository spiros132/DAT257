"use client"; 
import React, { useState } from "react";
import MealCard from "@/components/MealCard";
import CalorieCounter from "@/components/CalorieCounter";
import AddMealButton from "@/components/AddMealButton";
import HamburgerDiv from "@/components/HamburgerDiv";
import UserProgress from "@/components/UserProgressHistogram";

export default function Home() {
  const [activeButton, setActiveButton] = useState("Today");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };


  return (
    <>
      <div className="w-screen flex">
        <HamburgerDiv />
        <div className="w-[93%] h-screen">
          <CalorieCounter />
          <div className="h-screen flex flex-col">
            <div className="h-[50%] w-[75vw] flex">
              <nav className="w-full h-[15vh] flex justify-around">
                <div className="w-[20%]"></div>
                <button
                  className="text-[2.5rem]"
                  style={{
                    textDecoration: activeButton === "Today" ? "underline" : "none"
                  }}
                  onClick={() => handleButtonClick("Today")}
                >
                  Today
                </button>
                <button
                  className="text-[2.5rem]"
                  style={{
                    textDecoration: activeButton === "Weekly" ? "underline" : "none"}}
                  onClick={() => handleButtonClick("Weekly")}
                >
                  Weekly
                </button>
                <button
                  className="text-[2.5rem]"
                  style={{
                    textDecoration: activeButton === "Monthly" ? "underline" : "none"}}
                  onClick={() => handleButtonClick("Monthly")}
                >
                  Monthly
                </button>
                <div className="w-[20%]"></div>
              </nav>
              <div></div>
            </div>

            <div className="h-[50%] w-full">
              {activeButton === "Weekly" ? (
                <UserProgress interval={"weekly"}  />
              ) : (
                <div className="flex justify-center items-center">
                  <MealCard />
                  <MealCard />
                  <MealCard />
                  <AddMealButton />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
