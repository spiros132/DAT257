"use client";
import SearchBar from "@/components/SearchBar";
import ResultDisplay from "@/components/ResultDisplay";
import React, {startTransition, useState} from "react";

import SearchForFood from "./actions";

export default function Home() {

  const onSearch = (searchInput: string) => { fetchData(searchInput); };
  const [result, setResult] = useState<string>('');

  function fetchData(searchInput: string){
    startTransition(() => {
      SearchForFood(searchInput)
      .then((res) => {
        if(res != undefined)
          setResult(res);
      })
      .catch((error) => {
        console.log(error);
      });
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
              <SearchBar onSearch={onSearch} /> 
              <ResultDisplay result = {result}/>
    </main>
  );
}
