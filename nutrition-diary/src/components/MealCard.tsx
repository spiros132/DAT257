"use client";

export default function MealCard(){


    return (
        <div className="h-[35vh] w-[12vw] bg-white">
            <div className="bg-greenTheme h-[20%] w-[100%] rounded-t-[20px] flex">
                <p className="text-white text-[20px] m-auto">
                  Meal Name  
                </p>
            </div>
            <div className="h-[80%] border border-black border-t-0 flex-col justify-between p-4">
                <div className="h-[25%] flex items-center justify-center flex-col">
                    <p>
                        Calories
                    </p>
                    <p className="text-[0.8em]">
                        780 (26%)
                    </p>                    
                </div>
                <div className="h-[25%] flex items-center justify-center flex-col">
                    <p>
                        Carbohydrates
                    </p>   
                    <p className="text-[0.8em]">
                        780 (26%)
                    </p>                   
                </div>
                <div className="h-[25%] flex items-center justify-center flex-col">
                    <p>
                        Protein
                    </p>   
                    <p className="text-[0.8em]">
                        780 (26%)
                    </p>                   
                </div>
                <div className="h-[25%] flex items-center justify-center flex-col">
                    <p>
                        Fat
                    </p>   
                    <p className="text-[0.8em]">
                        780 (26%)
                    </p>                   
                </div>
            </div>
        </div>
      )
} 