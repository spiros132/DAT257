"use client";
import React, {useState, useEffect} from "react";

function NutritionInfoWindow(foodInfo: {name: string, image: string, weightInGrams: number, calories: number, carbs: number, protein: number, fat: number}){
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

    useEffect(() => {
        populateInfo(foodInfo);
    }, [foodInfo.name]); 

    function populateInfo(foodInfo: {name: string, image: string, weightInGrams: number, calories: number, carbs: number, protein: number, fat: number}){
        setCalTotal(foodInfo.calories);
        setCalPer100(Math.round((foodInfo.calories / foodInfo.weightInGrams) * 100));
        
        setCarTotal(foodInfo.carbs);
        setCarPer100(Math.round((foodInfo.carbs / foodInfo.weightInGrams) * 100));
        
        setProTotal(foodInfo.protein);
        setProPer100(Math.round((foodInfo.protein / foodInfo.weightInGrams) * 100));

        setFatTotal(foodInfo.fat);
        setFatPer100(Math.round((foodInfo.fat / foodInfo.weightInGrams) * 100));

        setFoodName(foodInfo.name);
        setFoodImage(foodInfo.image);
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFoodAmount(parseInt(e.target.value));
    };

    return (
        <div className="flex min-h-screen flex-col justify-center">
            <div className="h-96 bg-white w-2/5 mx-auto border">
                <div className="flex px-4 bg-primary font-bold text-white text-xl py-3">
                    <div className="w-11/12">
                        Nutritional Value
                    </div>
                    <div className="mx-6 my-1">
                        <svg height="20" width="20">
                            <line x1="0" y1="0" x2="20" y2="20" style={{stroke:'#fff;', strokeWidth:'2;'}} />
                            <line x1="0" y1="20" x2="20" y2="0" style={{stroke:'#fff;', strokeWidth:'2;'}} />
                        </svg>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-8/12">
                        <img className="mx-5 my-5" src={foodImage}/>
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
                                    <input type="text" id="foodAmount" className="text-md block w-40 h-8 border border-black rounded-md px-2" placeholder="Quantity input" value={foodAmount} onChange={handleAmountChange}/>
                                    <div className="px-10 w-56">
                                        <button id="infoButton" className="inline-flex items-center border border-black bg-primary px-8 h-8 rounded-md">
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NutritionInfoWindow;
    

