"use client";

export default function CalorieCounter(){


    return (
        <div className="h-[60vh] w-[18vw] bg-white absolute top-0 right-0 border border-black border-t-0 border-r-0">
            <div className="h-[33%] flex justify-center items-center flex-col">
                <p className="text-[2em]">
                    Calories
                </p>
                <div className="bg-lighterGreen h-[20px] w-[80%] m-2">
                    <div className="bg-greenTheme h-full w-[50%]">
                    </div>
                </div>
                <p className="text-[1.4em]">
                    1500 / 3000
                </p>
            </div>

            <div className="h-[20%] flex justify-center items-center flex-col">
                <p className="text-[1.4em]">
                    Carbohydrates
                </p>
                <div className="bg-lighterGreen h-[15px] w-[60%] m-2">
                    <div className="bg-greenTheme h-full w-[50%]">
                    </div>
                </div>
                <p className="text-[1em]">
                    1500 / 3000
                </p>
            </div>
            
            <div className="h-[20%] flex justify-center items-center flex-col">
                <p className="text-[1.4em]">
                    Protein
                </p>
                <div className="bg-lighterGreen h-[15px] w-[60%] m-2">
                    <div className="bg-greenTheme h-full w-[50%]">
                    </div>
                </div>
                <p className="text-[1em]">
                    1500 / 3000
                </p>
            </div>

            <div className="h-[20%] flex justify-center items-center flex-col">
                <p className="text-[1.4em]">
                    Fat
                </p>
                <div className="bg-lighterGreen h-[15px] w-[60%] m-2">
                    <div className="bg-greenTheme h-full w-[50%]">
                    </div>
                </div>
                <p className="text-[1em]">
                    1500 / 3000
                </p>
            </div>

        </div>
      )
} 