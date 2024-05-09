"use client";
import React, { useState } from "react";

interface WeeklyProgressProps {
  data: {
    day: string;
    calories: number;
    carbohydrates: number;
    protein: number;
    fat: number;
  }[];
}

const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ data }) => {
  

  return (
    <div>
      <h2>Weekly Progress</h2>
      <div className="histogram">
        {data.map((dayData, index) => (
          <div key={index} className="histogram-bar">
            <div className="bar-label">{dayData.day}</div>
            <div className="bar" style={{ height: `${dayData.calories}px` }}>
              <span>Calories: {dayData.calories}</span>
            </div>
            <div className="bar" style={{ height: `${dayData.carbohydrates}px` }}>
              <span>Carbohydrates: {dayData.carbohydrates}</span>
            </div>
            <div className="bar" style={{ height: `${dayData.protein}px` }}>
              <span>Protein: {dayData.protein}</span>
            </div>
            <div className="bar" style={{ height: `${dayData.fat}px` }}>
              <span>Fat: {dayData.fat}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyProgress;
