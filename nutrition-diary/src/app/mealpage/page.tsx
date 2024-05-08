"use client";

import CalorieCounter from "@/components/CalorieCounter";
import HamburgerDiv from "@/components/HamburgerDiv";
import SearchBar from "@/components/SearchBar";
import ResultDisplay from "@/components/ResultDisplay";
import ScrollPanel from "@/components/ResultScrollBar";
import FoodListItem from "@/components/FoodListItem";
import React, { useState } from "react"; 
import { SearchForFoodList,  handleBrandedResult,  handleCommonResult} from "@/app/actions/actions";
import { SavedFoodData, SearchListFoodItemData } from "@/app/lib/definitions";

export default function CreateEditMealPage() {
    const [results, setResults] = useState<SavedFoodData[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeButton, setActiveButton] = useState<"search" | "favorites">("search");

    const onSearch = (searchInput: string) => {
        fetchData(searchInput);
    };


    const fetchData = async (searchInput: string) => {
        let nutrientData: SavedFoodData[] = [];
        setLoading(true);
        let res = await SearchForFoodList(searchInput)
        if (res != undefined) {
            const data: SearchListFoodItemData = JSON.parse(res);  
            if (data) {
                if (data.common) {
                    nutrientData = await handleCommonResult(data.common, nutrientData);
                }
                if (data.branded) {
                    nutrientData = await handleBrandedResult(data.branded, nutrientData);
                } 
            }
        }
        setResults(nutrientData);
        setLoading(false);
    };

    const handleSearchButtonClick = () => {
        setActiveButton("search");
    };

    const handleFavoritesButtonClick = () => {
        setActiveButton("favorites");
    };

    return (
        <div className="grid grid-cols-3 p-4 min-h-screen">
            <div className="absolute left-0 top-0 border-t-0" style={{ width: '10%', borderTop: 'none' }}>
                <HamburgerDiv />
            </div>
            {/* Second column: SearchBar and ResultDisplay */}
            <div className="absolute top-0 left-0 right-0 flex flex-col justify-center items-center gap-5 p-4">
                <div className="w-1000" style={{ width: '60%', borderTop: 'none' }}> 
                    <SearchBar onSearch={onSearch} />
                    <div className="relative mb-4 gap-20 flex justify-start">
                        {/* Search Results button */}
                        <button
                            className={`text-lg font-semibold mb-2 bg-transparent text-black justify-self-start text-xl ${activeButton === "search" ? "text-black underline" : "text-gray-500"}`}
                            onClick={handleSearchButtonClick}
                        >
                            Search Results
                        </button>
                        {/* Favorites Button */}
                        <button
                            className={`text-lg font-semibold mb-2 bg-transparent text-black justify-self-start text-xl ${activeButton === "favorites" ? "text-black underline" : "text-gray-500"}`}
                            onClick={handleFavoritesButtonClick}
                        >
                            Favorites
                        </button>
                    </div>
                    {/* Display Result component */}
                    <div>
                        <ScrollPanel>
                            {loading ? (<p>Loading...</p>) : (
                                 <ResultDisplay results={results} />)}
                        </ScrollPanel>
                    </div>
                    <div className="h-20">

                    </div>
                    <input className="block flex-auto px-3 w-28 bg-white text-black justify-self-start font-bold"
                        type="text"
                        id="DishName"
                        placeholder="Dish Name"
                        aria-label="Dish Name">
                
                        </input>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <h2 className="text-lg font-semibold">
                            Current Foods
                        </h2>
                        <div className="overflow-y-scroll flex whitespace-nowrap bg-gray-200 h-60 py-2 px-4">
                            <div className="inline-flex" style={{ minWidth: "100%" }}>
                                    <FoodListItem name={""} amount={0} unit={""}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Third column: CalorieCounter */}
            <div>
                <CalorieCounter />
            </div>
        </div>
    );
}