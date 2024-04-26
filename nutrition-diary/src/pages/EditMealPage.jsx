// EditMealPage.jsx

import React from 'react';

export default function EditMealPage() {
  // Example data for the meal
  const mealData = {
    caloriesConsumed: 800, // Example calories consumed for the meal
    caloriesGoal: 2000, // Example calories goal
  };

  return (
    <div>
      <h2>Edit Meal Page</h2>
      <p>Calories Consumed for the Meal: {mealData.caloriesConsumed}</p>
      <p>Calories Goal: {mealData.caloriesGoal}</p>
    </div>
  );
}
