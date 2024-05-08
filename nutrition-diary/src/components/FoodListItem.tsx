"use client";
import React, {useState, useEffect} from "react";

function FoodListItem(props: {name: string, amount: number, unit: string}){
    const [foodName, setFoodName] = useState<string>('');
    const [foodAmount, setFoodAmount] = useState<number>(-1);
    const [foodUnit, setFoodUnit] = useState<string>('');

    useEffect(() => {
        populateInfo(props);
    }, [props.name]); 

    function populateInfo(props: {name: string, amount: number, unit: string}){
        setFoodName(props.name);
        setFoodAmount(props.amount);
        setFoodUnit(props.unit);
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFoodAmount(parseInt(e.target.value));
    };

    const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFoodUnit(e.target.value);
    };

    return (
        <div>
            <div className="flex h-20  rounded-lg border border-black bg-green-300">
                <div className="grid h-20 grid-cols-2">
                    <div className="m-auto w-screen">
                        <h5 className="ml-20 text-xl">{foodName}</h5>
                    </div>
                    <div className="m-auto flex space-x-2">
                        <input type="text" id="foodAmount" className="text-md block w-20" placeholder="0" value={foodAmount} onChange={handleAmountChange}/>
                        <input type="text" id="foodUnit" className="text-md block w-14" placeholder="g" value={foodUnit} onChange={handleUnitChange}/>
                        <div></div>
                        <button id="infoButton" className="inline-flex items-center border border-gray-400 bg-gray-200 px-2">
                            More info
                            <svg className="ms-3 h-2.5 w-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FoodListItem;
    

