

"use client";

export default function MenuPage(){
   const logoPath = "/NutritionDiary.png";
   return (
    <div className="flex items-start justify-start bg-white"> {/*justify-start: to align to the left side of the page */}
      <div className="menu-container flex flex-col items-center justify-center border border-black rounded-lg p-0 mt-0"> 
        <div className="logo-menu-container">
          <div className="logo-container mb-4">
            <img src={logoPath} alt="Nutrition Diary Logo" className="logo" style={{ width: '150px' }} />
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center w-full">
          <button className="menu-item home bg-green-400 text-white rounded-lg h-12 w-full flex items-center justify-center font-bold">
            <h2>Home</h2>
          </button>
          <button className="menu-item search bg-green-400 text-white rounded-lg h-12 w-full flex items-center justify-center font-bold">
            <h2>Search</h2>
          </button>
          <button className="menu-item support bg-green-400 text-white rounded-lg h-12 w-full flex items-center justify-center font-bold">
            <h2>Profile</h2>
          </button>
          <button className="menu-item support bg-green-400 text-white rounded-lg h-12 w-full flex items-center justify-center font-bold">
            <h2>Sign out</h2>
          </button>
          <button className="menu-item support bg-green-400 text-white rounded-lg h-12 w-full flex items-center justify-center font-bold">
            <h2>Support</h2>
          </button>
        </div>
      </div>
    </div>
  );
}
