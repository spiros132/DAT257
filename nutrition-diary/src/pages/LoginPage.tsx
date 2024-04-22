"use client";
import logo from "/NutritionDiary1.png";
export default function LoginPage(){


  return(
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
            placeholder="Username"
            className="border border-green-300 rounded-md p-2 mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-green-300 rounded-md p-2 mb-4"
          />
          
          <button className="bg-green-400 text-white font-semibold py-2 px-4 rounded-md mb-2">
            SIGN IN
          </button>
          <div className="mb-6"></div> {/* Empty div for spacing */}
          <p className="text-sm text-black">Don't have an account?</p>
          <button className="bg-green-400 text-white font-semibold py-2 px-4 rounded-md mt-2">
            CREATE ACCOUNT
          </button>
        </form>
      </div>
    </div>
  </div>
  )
} 
