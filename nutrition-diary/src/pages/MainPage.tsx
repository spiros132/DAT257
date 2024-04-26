// MainPage.jsx

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function MainPage() {
  const [caloriesGoal, setCaloriesGoal] = useState(0);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);

  useEffect(() => {
    // Fetch data from Profile Page
    fetch('/api/profile') // Example API endpoint to fetch profile data
      .then(response => response.json())
      .then(data => setCaloriesGoal(data.caloriesGoal));

    // Fetch data from Edit Meal Page
    fetch('/api/edit-meal') // Example API endpoint to fetch meal data
      .then(response => response.json())
      .then(data => setCaloriesConsumed(data.caloriesConsumed));
  }, []);

  // Calculate the percentage of calories consumed
  const percentage = (caloriesConsumed / caloriesGoal) * 100;

  return (
    <div className="container" style={{ backgroundColor: 'white', position: 'relative', height: '100vh' }}>
  {/* Menu Button */}
  <div className="menu-btn" style={{ position: 'absolute', top: '20px', left: '20px', width: '30px', height: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
    <div className="line" style={{ width: '100%', height: '3px', backgroundColor: 'black' }}></div>
    <div className="line" style={{ width: '100%', height: '3px', backgroundColor: 'black' }}></div>
    <div className="line" style={{ width: '100%', height: '3px', backgroundColor: 'black' }}></div>
  </div>
  {/* Vertical Line */} 
  <div className="vertical-line" style={{ position: 'absolute', top: '20px', left: '70px', width: '1px', height: 'calc(100% - 40px)', backgroundColor: 'black' }}></div>
  {/* Text "Today" */}
  <div className="today-text" style={{ position: 'absolute', top: '20px', left: '95px', color: '#333', textDecoration: 'underline' }}>Today</div>
  {/* Frame */}
  <div className="frame" style={{ position: 'absolute', top: '0', right: '0', width: '20%', height: '60%', border: '1px solid black', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ color: 'black', fontSize: '1.5em', top: '2%' }}>Calories</div>
    <div style={{ width: '80%', height: '20px', border: '1px solid black', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '70%', height: '100%', backgroundColor: 'green' }}></div>
      <div style={{ width: '30%', height: '100%', backgroundColor: 'white' }}></div>
    </div>
  </div>
</div>
  );
}
