"use client";
import SearchBar from "@/components/SearchBar";
import ResultDisplay from "@/components/ResultDisplay";
import MealCard from "@/components/MealCard";
import CalorieCounter from "@/components/CalorieCounter";

import React, {startTransition, useState} from "react";
import { SearchForFood } from "./actions";
import LoginPage from "@/pages/LoginPage";
import CreateAccountPage from "@/pages/CreateAccountPage";
import MenuPage from "@/pages/MenuPage";
import MainPage from "@/pages/MainPage";
import AddMealButton from "@/components/AddMealButton";
import CreateEditMealPage from "@/pages/CreateEditMealPage";


export default function App() { {/** Home */}
  const App: React.FC = () => { {/** added */}
    return <AppRouter />;
  };

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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat&display=swap"></link>
  
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white text-black">

    </main>
  );
}
