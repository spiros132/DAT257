"use client"; 
import React, { useState } from "react";
import Page from "./dashboard/page";

export default function Home() {
  const [activeButton, setActiveButton] = useState("Today");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };


  return (
    <>
      <div className="w-screen flex">
        <Page></Page>
        </div>
      </>
  );
}
