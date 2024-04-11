"use client";
import SearchBar from "@/components/SearchBar";
import React, {useState} from "react";

export default function Home() {
  const onSearch = (searchInput: string) => { fetchData(searchInput); };
  const [foodName, setFoodName] = useState<string>('');
  const [calories, setCalories] = useState<string>('');

  function handleResult(result: any){
    result.foods.forEach((food: any) => {
      setFoodName(food.food_name);
      setCalories(food.nf_calories);});
  }

  function fetchData(searchInput: string){
    console.log(searchInput);
    const myHeaders = new Headers();
    myHeaders.append("x-app-id", "12e033fb");
    myHeaders.append("x-app-key", "039977dee92c04ad730011a5f77c3855	");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
    const urlencoded = new URLSearchParams();
    urlencoded.append("query", searchInput);
  
    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow"
    };
  
    fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", requestOptions)
    .then((response) => response.json())
    .then((result) => handleResult(result))
    .catch((error) => console.error(error));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
              <SearchBar onSearch={onSearch} /> 
              <div className="items-center min-h-screen">
              <label className="block p-2.5 text-sm text-gray-900 bg-gray-50  border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white ">
              Food name: {foodName}
              </label>
              <label className="block p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white ">
              Calories: {calories}
              </label>
            </div>
    </main>
  );
}
