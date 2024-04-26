"use client";
import SearchBar from "@/components/SearchBar";
import ResultDisplay from "@/components/ResultDisplay";
import MealCard from "@/components/MealCard";
import CalorieCounter from "@/components/CalorieCounter";

import React, {startTransition, useState} from "react";

import { SearchForFood } from "./server/actions";
import MenuPage from "@/pages/MenuPage";

export default function Home() {

  const onSearch = (searchInput: string) => { fetchData(searchInput); };
  const [result, setResult] = useState<string>('');

  function fetchData(searchInput: string){
    startTransition(() => {
      SearchForFood(searchInput)
      .then((res: string | undefined) => {
        if(res != undefined)
          setResult(res);
      })
      .catch((error: Error) => {
        console.log(error);
      });
    });
  }

  // The main page when you go into the website
  return (
    <div>
      <div className="flex-1 flex items-center justify-center"> {/* Center the image */}
        <img src="/NutritionDiary1.png" alt="Nutrition Diary Logo" className="centered-image" style={{ width: '450px', filter: 'grayscale(3%) brightness(95%)' }} />
      </div>
    </div>
  );
}
