import React, { useState, useEffect } from "react";
import { fetchUserProgress} from "@/app/actions/actions"; 
import { verifySession } from "@/app/lib/session";

interface UserProgressProps {
  interval: string;
}

const UserProgress: React.FC<UserProgressProps> = ({ interval }) => {
  const [data, setData] = useState<{ day: string; calories: number; carbohydrates: number; protein: number; fat: number; }[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const checkSessionAndGetProgress = async () => {
      const session = await verifySession();
      if (typeof session.userId === 'number') {
        setUserId(session.userId);
        const progressData = await fetchUserProgress(session.userId, interval);
        setData(progressData);
      } else {
        console.error('No valid session found');
        setData([]); 
      }
    };

    checkSessionAndGetProgress();
  }, [interval]); 

  const getIntervalDisplay = (interval: string) => {
    switch (interval) {
      case 'weekly':
        return "Weekly Progress";
      case 'monthly':
        return "Monthly Progress";
      default:
        return "Progress"; // Handle unexpected interval values
    }
  };

  return (
    <div>
      <h2>{getIntervalDisplay(interval)}</h2>
      <div className="histogram">
        {data.length > 0 ? data.map((dayData, index) => (
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
        )) : <p>Loading or No Data Available</p>}
      </div>
    </div>
  );
};

export default UserProgress;
