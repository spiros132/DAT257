import CalorieCounter from "@/components/CalorieCounter";
import HamburgerDiv from "@/components/HamburgerDiv";
import SearchBar from "@/components/SearchBar";
import ResultDisplay from "@/components/ResultDisplay";
import ScrollPanel from "@/components/ResultScrollBar";
import React, { useState } from "react"; 
import { SearchForFoodList } from "@/app/server/actions";
import { SearchListFoodItemCommon, SearchListFoodItemData } from "@/app/interfaces";

export default function CreateEditMealPage() {
    const [results, setResults] = useState<string[]>([]);
    const [result, setResult] = useState<SearchListFoodItemCommon | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeButton, setActiveButton] = useState<"search" | "favorites">("search");

    const onSearch = (searchInput: string) => {
        fetchData(searchInput);
    };

    const fetchData = (searchInput: string) => {
        setLoading(true);
        SearchForFoodList(searchInput)
            .then((res: string | undefined) => {
                if (res != undefined) {
                    const data: SearchListFoodItemData = JSON.parse(res);
                    if (data && data.common) {
                                        
                        setResult(data.common[0])            
                    }
                }
            })
            .catch((error: Error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
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
            <div className="absolute top-0 left-0 right-0 flex flex-col justify-center items-center gap-4 p-4">
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
                                 <ResultDisplay result={result} />)}
                        </ScrollPanel>
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
