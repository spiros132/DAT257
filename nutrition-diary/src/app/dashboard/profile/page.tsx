
"use client";
import React, { useState } from 'react';
import { addTarget, getUserId } from '@/app/actions/actions';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    calories: '',
    carbohydrates: '',
    protein: '',
    fat: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    let userId = await getUserId();
    if(userId != null){
    console.error(formData)
    addTarget(userId, Number(formData.calories), Number(formData.carbohydrates), Number(formData.protein), Number(formData.fat));
    }
    else {
        throw new Error("User ID is null");
      }
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '2px', width: '100%', maxWidth: '100vw' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src="/NutritionDiary1.png" alt="Nutrition Diary Logo" style={{ width: '250px', margin: '0 auto', marginBottom: '10px' }} />
        <div style={{ position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Profile Section */}
          <div style={{ marginBottom: '130px' }}></div>
          <h2 style={{ color: 'black', fontSize: '24px', marginBottom: '10px', textAlign: 'left', marginLeft: '-120px' }}>Profile</h2>
          
          {/* Username Input */}
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', marginLeft: '-140px' }}>
            <span style={{ width: '130px', marginLeft: '10px' }}>USERNAME</span>
            <div style={{ backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px', border: '2px solid black', marginLeft: '10px' }}>
              <input type="text" name="username" placeholder="Ex. Spiros" style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '130px', marginLeft: '10px' }}/>
            </div>
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', marginLeft: '-140px' }}>
            <span style={{ width: '130px', marginLeft: '10px' }}>PASSWORD</span>
            <div style={{ backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px', border: '2px solid black', marginLeft: '10px' }}>
              <input type="password" name="password" placeholder="Ex. 1./234 Rbhjdfbj" style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '130px', marginLeft: '10px' }}/>
            </div>
          </div>

          {/* Height Input */}
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', marginLeft: '-140px' }}>
            <span style={{ width: '130px', marginLeft: '10px' }}>HEIGHT</span>
            <div style={{ backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px', border: '2px solid black', marginLeft: '10px' }}>
              <input type="number" name="height" placeholder="Ex. 189 cm" style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '130px', marginLeft: '10px' }}/>
            </div>
          </div>

          {/* Weight Input */}
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', marginLeft: '-140px' }}>
            <span style={{ width: '130px', marginLeft: '10px' }}>WEIGHT</span>
            <div style={{ backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px', border: '2px solid black', marginLeft: '10px' }}>
              <input type="number" name="weight" placeholder="Ex. 70 Kg"  style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '130px', marginLeft: '10px' }}/>
            </div>
          </div>

          {/* Calories Input */}
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', marginLeft: '-140px' }}>
            <span style={{ width: '130px', marginLeft: '10px' }}>CALORIES</span>
            <div style={{ backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px', border: '2px solid black', marginLeft: '10px' }}>
              <input type="number" name="calories" placeholder="Ex. 2000" value={formData.calories} onChange={handleChange} style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '130px', marginLeft: '10px' }}/>
            </div>
          </div>

          {/* Carbohydrates Input */}
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', marginLeft: '-140px' }}>
            <span style={{ width: '130px', marginLeft: '10px' }}>CARBOHYDRATES</span>
            <div style={{ backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px', border: '2px solid black', marginLeft: '10px' }}>
              <input type="number" name="carbohydrates" placeholder="Ex. 250" value={formData.carbohydrates} onChange={handleChange} style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '130px', marginLeft: '10px' }}/>
            </div>
          </div>

          {/* Protein Input */}
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', marginLeft: '-140px' }}>
            <span style={{ width: '130px', marginLeft: '10px' }}>PROTEIN</span>
            <div style={{ backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px', border: '2px solid black', marginLeft: '10px' }}>
              <input type="number" name="protein" placeholder="Ex. 150" value={formData.protein} onChange={handleChange} style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '130px', marginLeft: '10px' }}/>
            </div>
          </div>

          {/* Fat Input */}
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', marginLeft: '-140px' }}>
            <span style={{ width: '130px', marginLeft: '10px' }}>FAT</span>
            <div style={{ backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px', border: '2px solid black', marginLeft: '10px' }}>
              <input type="number" name="fat" placeholder="Ex. 70" value={formData.fat} onChange={handleChange} style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '130px', marginLeft: '10px' }}/>
            </div>
          </div>

          {/* Save Button */}
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', marginLeft: '-140px' }}>
            <button onClick={handleSave} style={{ backgroundColor: 'green', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', width: '160px', height: '40px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
