"use client";

import SearchBar from "@/components/SearchBar";
import ResultDisplay from "@/components/ResultDisplay";
import React, {startTransition, useState} from "react";
import { SearchForFood } from "@/app/actions";

export default function CreateEditMealPage() {

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
        <div className="grid grid-cols-1 gap-4 p-4 min-h-screen">
            <SearchBar onSearch={onSearch} />
            <div className="grid grid-cols-2 gap-2">
                {/* Search Results button */}
                <button
                    className="text-lg font-semibold mb-2 underline bg-transparent text-black"
                    onClick={() => {}}
                >
                    Search Result
                </button>
                {/* Favorites Button */}
                <button
                    className="text-lg font-semibold mb-2 underline bg-transparent text-black"
                    onClick={() => {}}
                >
                    Favorites
                </button>
            </div>
            {/* Display Result component */}
            <div>
            
                <ResultDisplay result={result} />
            </div>

            
        </div>
    );
}