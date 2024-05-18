"use client";
import React, { useState, useEffect } from "react";
import { fetchUserProgress } from "@/app/actions/actions";
import { getUserId } from "@/app/actions/actions";

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

  useEffect(() => {
    const checkSessionAndGetProgress = async () => {
      const userId = await getUserId();

      if (userId != null) {
        const progressData = await fetchUserProgress(userId, interval);
        setData(progressData);
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
      <h2>{getIntervalDisplay(interval)}</h2>
      <div className="histogram">
        {data.length > 0 ? (
          data.map((dayData, index) => (
            <div key={index} className="histogram-bar">
              <div className="bar-container">
              <span>{dayData.calories}g Cal </span>
                <div className="bar calories" style={{ height: `${dayData.calories / 10}px` }}>
                </div>
                <span>{dayData.carbohydrates}g Carbs</span>
                <div className="bar carbohydrates" style={{ height: `${dayData.carbohydrates / 10}px` }}>
                  
                </div>
                <span>{dayData.protein}g Protein</span>
                <div className="bar protein" style={{ height: `${dayData.protein /10}px` }}>
                  
                </div>
                <span>{dayData.fat }g fat </span>
                <div className="bar fat" style={{ height: `${dayData.fat / 10}px` }}>
                  
                </div>
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
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .bar-container {
          display: flex;
          flex-direction: column;
          align-items: left;
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

        .bar span {
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
        }

        .bar.calories { background-color: #007bff; }
        .bar.carbohydrates { background-color: #28a745; }
        .bar.protein { background-color: #ffc107; }
        .bar.fat { background-color: #dc3545; }

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
