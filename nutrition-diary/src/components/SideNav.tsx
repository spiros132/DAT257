"use client";

import Link from "next/link";
import { useState } from "react";
import HamburgerDiv from "./HamburgerDiv";

export default function SideNav(){
  const logoPath = "/NutritionDiary.png";
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div 
    className="absolute top-0 left-0 right-auto bottom-0"    
    >
      <div
      className={open ? "h-full border-r border-black" : ""}
      >
        {/* The side bar that has the hamburger menu */}
        <div
        className="m-4"
        >
          <HamburgerDiv 
          onClick={
            () => {
              setOpen(!open);
            }
          }></HamburgerDiv>
        </div>
        {/* The menu itself that appears and dissapears */}
        { open &&
        <div className="flex flex-col w-full h-full"> 
          <div className="mb-4">
            <img 
            src={logoPath} 
            alt="Nutrition Diary Logo" 
            className="w-52"
            />
          </div>
          <div className="flex flex-col gap-4 items-center w-full">
            <Link
            href={"/dashboard"}
            className="bg-greenTheme text-white w-full font-bold text-center p-4">
              Home
            </Link>
            <Link
            href={"/dashboard/profile"}
            className="bg-greenTheme text-white w-full font-bold text-center p-4">
              Profile
            </Link>
            <Link
            href={"/logout"}
            className="bg-greenTheme text-white w-full font-bold text-center p-4">
              Logout
            </Link>
          </div>
        </div>
        }
      </div>
    </div>
  );
}
