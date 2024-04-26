import { Link } from 'react-router-dom';

"use client";


export default function MenuPage(){
   const logoPath = "/NutritionDiary.png"
   return (
    <div className="flex items-start justify-center bg-gradient-to-r from-yellow-200 to-green-200">
      <div className="menu-container flex flex-col items-center justify-center border-4 border-yellow-400 rounded-lg p-0 mt-0">
        <div className="logo-menu-container">
          <div className="logo-container mb-4">
            <img src="/NutritionDiary.png" alt="Nutrition Diary Logo" className="logo" style={{ width: '150px' }} />
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <button className="menu-item home bg-yellow-300 rounded-lg h-12 w-16 flex items-center justify-center">
            <h2>Home</h2>
          </button>
          <button className="menu-item search bg-yellow-300 rounded-lg h-12 w-16 flex items-center justify-center">
            <h2>Search</h2>
          </button>
          <button className="menu-item support bg-yellow-300 rounded-lg h-12 w-16 flex items-center justify-center">
            <h2>Profile</h2>
          </button>
          <button className="menu-item support bg-yellow-300 rounded-lg h-12 w-16 flex items-center justify-center">
            <h2>Sign out</h2>
          </button>
          <button className="menu-item support bg-yellow-300 rounded-lg h-12 w-16 flex items-center justify-center">
            <h2>Support</h2>
          </button>
        </div>
      </div>
    </div>
  );
  
}
  
 

