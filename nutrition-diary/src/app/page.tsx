"use client";
import SearchBar from "@/components/SearchBar";
import ResultDisplay from "@/components/ResultDisplay";
import MealCard from "@/components/MealCard";
import CalorieCounter from "@/components/CalorieCounter";

import React, {startTransition, useState} from "react";
import { SearchForFood } from "./server/actions";
import LoginPage from "@/app/login/page";
import CreateAccountPage from "@/app/register/page";
import MenuPage from "@/app/menu/page";
import MainPage from "@/app/dashboard/page";
import AddMealButton from "@/components/AddMealButton";
import CreateEditMealPage from "@/app/mealpage/page";


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

  return (
    <>
    </>
  );
}
