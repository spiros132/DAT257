"use client";
import SearchBar from "@/components/SearchBar";
import ResultDisplay from "@/components/ResultDisplay";
import React, {startTransition, useState} from "react";

import { SearchForFood } from "./actions";
import LoginPage from "@/pages/LoginPage";
import CreateAccountPage from "@/pages/CreateAccountPage";
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white text-black">
      <CreateAccountPage/>
    </main>
  );
}
