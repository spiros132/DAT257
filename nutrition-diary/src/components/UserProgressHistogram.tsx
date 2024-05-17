"use client"
import React, { useState, useEffect } from "react";
import { fetchUserProgress } from "@/app/actions/actions";
import { getUserId } from "@/app/actions/actions";

interface UserProgressProps {
  interval: string;
}

const UserProgressHistogram: React.FC<UserProgressProps> = ({ interval }) => {
  const [data, setData] = useState<
    { calories: number; carbohydrates: number; protein: number; fat: number }[]
  >([]);

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
              <div className="bar calories" style={{ height: `${dayData.calories}px` }}>
                <span>{dayData.calories}</span>
              </div>
              <div className="bar carbohydrates" style={{ height: `${dayData.carbohydrates}px` }}>
                <span>{dayData.carbohydrates}</span>
              </div>
              <div className="bar protein" style={{ height: `${dayData.protein}px` }}>
                <span>{dayData.protein}</span>
              </div>
              <div className="bar fat" style={{ height: `${dayData.fat}px` }}>
                <span>{dayData.fat}</span>
              </div>
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
        }

        .histogram-bar {
          width: 100px; /* Adjust width as needed */
          margin-right: 10px; /* Adjust margin between bars */
          margin-bottom: 20px; /* Adjust margin between rows */
        }

        .bar {
          background-color: #007bff; /* Adjust bar color */
          width: 100%;
          text-align: center;
          color: #fff;
          border-radius: 5px;
          margin-bottom: 5px;
          position: relative;
        }

        .bar span {
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Optionally, you can style different bars differently */
        .bar.calories { background-color: #007bff; }
        .bar.carbohydrates { background-color: #28a745; }
        .bar.protein { background-color: #ffc107; }
        .bar.fat { background-color: #dc3545; }
        `}
      </style>
    </div>
  );
};

export default UserProgressHistogram;
