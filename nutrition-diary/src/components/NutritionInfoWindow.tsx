"use client";
import React, {useState, useEffect} from "react";
import { SavedFoodData } from "@/app/lib/definitions";

function NutritionInfoWindow({ food , onAdd, onClose }: {food: SavedFoodData, onAdd: (foodName: SavedFoodData) => void, onClose: (foodName: string) => void}){
    const [calTotal, setCalTotal] = useState<number>(0);
    const [calPer100, setCalPer100] = useState<number>(0);
    const [carTotal, setCarTotal] = useState<number>(0);
    const [carPer100, setCarPer100] = useState<number>(0);
    const [proTotal, setProTotal] = useState<number>(0);
    const [proPer100, setProPer100] = useState<number>(0);
    const [fatTotal, setFatTotal] = useState<number>(0);
    const [fatPer100, setFatPer100] = useState<number>(0);
    const [foodAmount, setFoodAmount] = useState<number>(-1);
    const [foodName, setFoodName] = useState<string>("");
    const [foodImage, setFoodImage] = useState<string>("");
    const [isShown, setIsShown] = useState<boolean>(true);

    useEffect(() => {
        populateInfo(food);
    }, [food]); 

    function populateInfo(food: SavedFoodData){
        setCalTotal(food.nf_calories);
        setCalPer100(Math.round((food.nf_calories / 100) * 100));
        
        setCarTotal(food.nf_carbohydrates);
        setCarPer100(Math.round((food.nf_carbohydrates / 100) * 100));
        
        setProTotal(food.nf_protein);
        setProPer100(Math.round((food.nf_protein / 100) * 100));

        setFatTotal(food.nf_fat);
        setFatPer100(Math.round((food.nf_fat / 100) * 100));

        setFoodName(food.food_name[0].toUpperCase() + food.food_name.slice(1));
        setFoodImage(food.photo);
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFoodAmount(parseInt(e.target.value));
    };

    
    function onImageClick() {
        setIsShown(!isShown);
        return;
    }   

    const onCardClick = (foodName: SavedFoodData) => {
        onAdd(foodName);
    };

    return (
        <div className="flex min-h-screen flex-col justify-center fixed top-0 left-[30%] z-50">
            {isShown &&
            <div className="h-96 bg-white w-11/12 mx-auto border">
                <div className="flex px-4 bg-primary font-bold text-white text-xl py-3">
                    <div className="w-11/12">
                        Nutritional Value
                    </div>
                    <div className="mx-6 my-1" onClick={() => onClose(food.food_name)}>
                        <svg height="20" width="20">
                            <line x1="0" y1="0" x2="20" y2="20" stroke="#fff" strokeWidth={2} />
                            <line x1="0" y1="20" x2="20" y2="0" stroke="#fff" strokeWidth={2} />
                        </svg>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-8/12">
                        <img className="mx-5 my-5 w-8/12" src={foodImage}/>
                    </div>
                    <div className="py-5 w-full pl-14 pr-4">
                        <h1 className="font-semibold text-2xl">{foodName}</h1>
                        <div className="py-5">
                            <table className="table-auto text-center text-sm w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2 border-r">Nutrition</th>
                                        <th className="py-2 border-r">Total</th>
                                        <th className="py-2">Per 100g</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr className="border-b">
                                    <td className="py-2 border-r">Calories</td>
                                    <td className="py-2 border-r">{calTotal} kcal</td>
                                    <td className="py-2">{calPer100} kcal</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 border-r">Carbohydrates</td>
                                    <td className="py-2 border-r">{carTotal} g</td>
                                    <td className="py-2">{carPer100} g</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 border-r">Protein</td>
                                    <td className="py-2 border-r">{proTotal} g</td>
                                    <td className="py-2">{proPer100} g</td>
                                </tr>
                                <tr>
                                    <td className="py-2 border-r">Fat</td>
                                    <td className="py-2 border-r">{fatTotal} g</td>
                                    <td className="py-2">{fatPer100} g</td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="py-7 ml-32">
                                <div className="grid grid-cols-2">
                                    <div className="px-10 w-56">
                                        <button id="infoButton" className="inline-flex items-center border border-black bg-primary px-8 h-8 rounded-md" onClick={e => onCardClick(food)}>
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}
export default NutritionInfoWindow;
    

