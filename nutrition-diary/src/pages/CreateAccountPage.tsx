import { Link } from 'react-router-dom';

"use client";

export default function CreateAccountPage(){


    return (
        <>
      <div className="flex min-h-screen"> 
        <div className="flex-1 flex items-center justify-center"> {/* Center the image */}
          <img src="/NutritionDiary1.png" alt="Nutrition Diary Logo" className="centered-image" style={{ width: '450px', filter: 'grayscale(3%) brightness(95%)' }} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center mt-1"> 
          <div className="flex flex-col items-center"> 
            <h2 className="text-2xl font-semibold mb-4">Welcome to Nutrition Diary</h2>
            <form className="flex flex-col items-center">
              <input
                type="text"
                placeholder="CREATE USERNAME"
                className="border border-gray-300 rounded-md p-2 mb-2"
              />
              <input
                type="password"
                placeholder="CREATE PASSWORD"
                className="border border-gray-300 rounded-md p-2 mb-4"
              />
              <input
                type="text"
                placeholder="CONFIRM PASSWORD"
                className="border border-gray-300 rounded-md p-2 mb-2"
              />
              <button 
                className="bg-green-400 text-white font-semibold py-2 px-4 rounded-md"
              >
                CONFIRM REGISTRATION
              </button>
              
              <div className="mb-6"></div> {/* Empty div for spacing */}
              <p className="text-sm text-black">Already have an account?</p>

              <button 
                className="bg-green-400 text-white font-semibold py-2 px-4 rounded-md"
              >
                TO LOGIN SCREEN
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
      )
} 