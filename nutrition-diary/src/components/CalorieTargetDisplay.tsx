"use client";
import React, {useState} from "react";

function CalorieTargetDisplay(){
    return (
        <div className="absolute right-10 top-10"> 
            <div className="flex flex-col items-center justify-center mt-1"> 
                <div className="flex flex-col items-center"> 
                    <h2 className="text-4xl mb-2">Calories</h2>
                    <div className="flex flex-col items-center w-52">
                        <div className="w-full bg-green-300 rounded-sm h-5">
                          <div className="bg-green-500 h-5 rounded-sm w1/2"></div>
                        </div>
                        <h3 className="text-2xl">1500/3000</h3>
                        
                        <div className="h-5"></div>
                        <h4 className="text-l">Carbohydrates</h4>
                        <div className="w-8/12 bg-green-300 rounded-sm h-4">
                            <div className="bg-green-500 h-4 rounded-sm w1/2"></div>
                        </div>
                        <h5 className="text-l">Eaten/Target</h5>
                        
                        <div className="h-5"></div>
                        <h4 className="text-l">Protein</h4>
                        <div className="w-8/12 bg-green-300 rounded-sm h-4">
                            <div className="bg-green-500 h-4 rounded-sm w1/2"></div>
                        </div>
                        <h5 className="text-l">Eaten/Target</h5>
                        
                        <div className="h-5"></div>
                        <h4 className="text-l">Fat</h4>
                            <div className="w-8/12 bg-green-300 rounded-sm h-4">
                        <div className="bg-green-500 h-4 rounded-sm w1/2"></div>
                        </div>
                        <h5 className="text-l">Eaten/Target</h5>
                        
                        <div className="h-5"></div>
                        
                        <label className="inline-flex items-center">
                            <span className="me-2 text-sm">Meal</span>
                            <input type="checkbox" value="" className="sr-only peer"/>
                            <div className="relative w-11 h-6 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            <span className="ms-2 text-sm">Daily</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CalorieTargetDisplay;
    

