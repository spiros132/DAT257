"use client";

import HamburgerDiv from "@/components/HamburgerDiv";
import SearchBar from "@/components/SearchBar";
import ResultDisplay from "@/components/ResultDisplay";
import ScrollPanel from "@/components/ResultScrollBar";
import FoodListItem from "@/components/FoodListItem";
import React, { useState } from "react"; 
import { SearchForFoodList,  handleBrandedResult,  handleCommonResult, saveMealAction, testMealDB} from "@/app/actions/actions";
import { SavedFoodData, SearchListFoodItemData } from "@/app/lib/definitions";
import CalorieCounterCreateMeal from "@/components/CalorieCounterCreateMeal";

export default function CreateEditMealPage() {
    const [results, setResults] = useState<SavedFoodData[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [mealName, setMealName] = useState<string>("");
    const [activeButton, setActiveButton] = useState<"search" | "favorites">("search");
    const [currentFoods, setCurrentFoods] = useState<SavedFoodData[]>([]);

    const listItemChanged = (name: string, amount: number, unit: string) => {
        currentFoods.find((food) => food.food_name === name)!.serving_qty = amount;
        setCurrentFoods([...currentFoods]);
    }    

    const onSearch = (searchInput: string) => {
        fetchData(searchInput);
        //testMealDB();
    };

    const onAdd = (foodName: SavedFoodData) => {
        setCurrentFoods([...currentFoods, foodName]);
    }
    const calcNutrients = (result: SavedFoodData[]) => {
        if (!result) return;
        let totalCalories = 0;
        let totalCarbohydrates = 0;
        let totalProtein = 0;
        let totalFat = 0;
        result.forEach((food) => {
            totalCalories += food.nf_calories * food.serving_qty;
            totalCarbohydrates += food.nf_carbohydrates * food.serving_qty;
            totalProtein += food.nf_protein * food.serving_qty;
            totalFat += food.nf_fat * food.serving_qty;
        });
        return {
            totalCalories: totalCalories,
            totalCarbohydrates: totalCarbohydrates,
            totalProtein: totalProtein,
            totalFat: totalFat
        }
    }
    const saveMealButton = () => {

        if (currentFoods.length == 0) return;
        if (currentFoods.find((food) => food.serving_qty == 0)) return;
        if (mealName == "") return;        
        let userId = 1;
        let nutrients = calcNutrients(currentFoods);
        let items = currentFoods.map((food) => {
            return {
                food: food.food_name,
                quantity: food.serving_qty,
            }
        });
        if (!nutrients) return;
        saveMealAction(mealName, "No description", nutrients?.totalCalories, nutrients?.totalProtein, nutrients?.totalCarbohydrates, nutrients?.totalFat, items);
    }

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

    const makeFoodListItems = (foods: SavedFoodData[]) => {
        if(!foods || foods.length == 0) return (
            <div className="flex justify-center items-center h-20">
                <p>No foods added yet.</p>
            </div>
        );
        
        
        let items = foods.map((food, index) => (
            <FoodListItem key={index} name={food.food_name} amount={food.serving_qty} unit={food.serving_unit} valueChanged={listItemChanged} />
        ));

        return(
        <div className="overflow-y-scroll flex whitespace-nowrap bg-gray-200 h-60 py-2 px-4">
            <div className="" style={{ minWidth: "100%" }}>
                {items}
            </div>
        </div>
        );
    }

    return (
        <div className="grid grid-cols-3 p-4 min-h-screen">
            <div className="absolute left-0 top-0 border-t-0" style={{ width: '10%', borderTop: 'none' }}>
                HamburgerDiv
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
                                 <ResultDisplay results={results} onAdd={onAdd}  />)}
                        </ScrollPanel>
                    </div>
                    <div className="h-20">

                    </div>
                    <input className="block flex-auto px-3 w-28 bg-white text-black justify-self-start font-bold"
                        type="text"
                        id="DishName"
                        placeholder="Dish Name"
                        aria-label="Dish Name"
                        onChange={(e) => setMealName(e.target.value)}
                        >
                        </input>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <h2 className="text-lg font-semibold">
                            Current Foods
                        </h2>
                        {makeFoodListItems(currentFoods)}
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={saveMealButton}
                    >
                        Save Meal
                    </button>
                </div>
            </div>
            {/* Third column: CalorieCounter */}
            <div>
                <CalorieCounterCreateMeal result={currentFoods}/>
            </div>
        </div>
    );
}