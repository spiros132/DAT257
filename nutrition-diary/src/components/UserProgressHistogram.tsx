"use client";
import React, { useState, useEffect } from "react";
import { fetchUserProgress, fetchTargetGoal, getUserId } from "@/app/actions/actions";

interface UserProgressProps {
  interval: string;
}

const UserProgressHistogram: React.FC<UserProgressProps> = ({ interval }) => {
  const [data, setData] = useState<{
    calories: number;
    carbohydrates: number;
    protein: number;
    fat: number;
    date: string;
  }[]>([]);
  const [targetGoal, setTargetGoal] = useState<{
    calories: number;
    carbohydrates: number;
    protein: number;
    fat: number;
  }>({
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0
  });

  useEffect(() => {
    const checkSessionAndGetProgress = async () => {
      const userId = await getUserId();

      if (userId != null) {
        const [progressData, goalData] = await Promise.all([
          fetchUserProgress(userId, interval),
          fetchTargetGoal(userId)
        ]);
        setData(progressData);
        setTargetGoal(goalData);
      } else {
        throw new Error("User ID is null");
      }
    };

    checkSessionAndGetProgress();
  }, [interval]);

  const getIntervalDisplay = (interval: string) => {
    switch (interval) {
      case "weekly":
        return "Weekly Progress";
      case "monthly":
        return "Monthly Progress";
      default:
        return "Progress"; // Handle unexpected interval values
    }
  };

  return (
    <div>
      <h2><strong>{getIntervalDisplay(interval)}:</strong></h2>
      <div className="h-2"></div>
      <div className="histogram">
        {data.length > 0 ? (
          data.map((dayData, index) => (
            <div key={index} className="histogram-bar">
              <div className="bar-container">
                <div className="goal-line" style={{ top: `${targetGoal.calories / 10}px` }}>
                  <div className="goal-label">Target</div>
                </div>
                <span className="small-text">{dayData.calories}g cal</span>
                <div className="bar calories" style={{ height: `${dayData.calories / 10}px` }}></div>

                <div className="goal-line" style={{ top: `${targetGoal.carbohydrates / 10}px` }}>
                  <div className="goal-label">Target</div>
                </div>
                <span className="small-text">{dayData.carbohydrates}g carbs</span>
                <div className="bar carbohydrates" style={{ height: `${dayData.carbohydrates / 10}px` }}></div>

                <div className="goal-line" style={{ top: `${targetGoal.protein / 10}px` }}>
                  <div className="goal-label">Target</div>
                </div>
                <span className="small-text">{dayData.protein}g protein</span>
                <div className="bar protein" style={{ height: `${dayData.protein / 10}px` }}></div>

                <div className="goal-line" style={{ top: `${targetGoal.fat / 10}px` }}>
                  <div className="goal-label">Target</div>
                </div>
                <span className="small-text">{dayData.fat}g fat</span>
                <div className="bar fat" style={{ height: `${dayData.fat / 10}px` }}></div>
              </div>
              <div className="bar-date">{new Date(dayData.date).toLocaleDateString()}</div>
            </div>
          ))
        ) : (
          <p>Loading or No Data Available</p>
        )}
      </div>

      {/* CSS Styles */}
      <style>
        {`
        .histogram {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .histogram-bar {
          width: calc(100% / 7 - 10px);
          margin-bottom: 30px;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .bar-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          height: 500px;
        }

        .bar {
          width: 70px;
          margin: 2px 0;
          text-align: center;
          color: #fff;
          border-radius: 5px;
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .goal-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background-color: red;
        }

        .goal-label {
          position: absolute;
          top: -20px; /* Adjust the position as needed */
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px; /* Adjust the font size as needed */
          color: red; /* Match the goal line color */
        }

        .bar.calories { background-color: #007bff; }
        .bar.carbohydrates { background-color: #28a745; }
        .bar.protein { background-color: #ffc107; }
        .bar.fat { background-color: #dc3545; }

        .small-text {
          font-size: 12px; /* Adjust the font size as needed */
        }

        .bar-date {
          text-align: center;
          margin-top: 5px;
          font-size: 0.9em;
        }

        @media (min-width: 768px) {
          .histogram-bar {
            width: calc(100% / 30 - 5px); /* Adjust for monthly display */
          }
        }
        `}
      </style>
    </div>
  );
};

export default UserProgressHistogram;
