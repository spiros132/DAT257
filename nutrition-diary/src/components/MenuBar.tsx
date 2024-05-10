"use client";

import Link from "next/link";


export default function MenuBar(){

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
          <Link
          href={"/"}
          className="menu-item home bg-green-400 text-white rounded-lg h-12 w-full flex items-center justify-center font-bold">
            <h2>Home</h2>
          </Link>
          <Link
          href={"/"}
          className="menu-item search bg-green-400 text-white rounded-lg h-12 w-full flex items-center justify-center font-bold">
            <h2>Search</h2>
          </Link>
          <Link
          href={"/"}
          className="menu-item search bg-green-400 text-white rounded-lg h-12 w-full flex items-center justify-center font-bold">
            <h2>Search</h2>
          </Link>
          <Link
          href={"/logout"}
          className="menu-item search bg-green-400 text-white rounded-lg h-12 w-full flex items-center justify-center font-bold">
            <h2>Logout</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
