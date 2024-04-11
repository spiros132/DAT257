"use client";
import SearchBar from "@/components/SearchBar";
import ResultDisplay from "@/components/ResultDisplay";
import React, {useState} from "react";

export default function Home() {

  const onSearch = (searchInput: string) => { fetchData(searchInput); };
  const [result, setResult] = useState<string>('');

  function fetchData(searchInput: string){
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
    .then((result) => setResult(result))
    .catch((error) => console.error(error));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
              <SearchBar onSearch={onSearch} /> 
              <ResultDisplay result = {result}/>
    </main>
  );
}
