"use client";
import React, { useState } from 'react';
import {addTarget, getUserId } from '@/app/actions/actions';

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
    <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px', width: '100%', maxWidth: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src="/NutritionDiary1.png" alt="Nutrition Diary Logo" style={{ width: '250px', marginBottom: '20px' }} />
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '50px' }}>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '130px' }}>USERNAME</span>
            <input type="text" name="username" placeholder="Ex. Spiros" style={{ border: '2px solid black', borderRadius: '5px', padding: '8px', width: '130px', marginLeft: '10px' }} />
          </div>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '130px' }}>PASSWORD</span>
            <input type="password" name="password" placeholder="Ex. 1./234 Rbhjdfbj" style={{ border: '2px solid black', borderRadius: '5px', padding: '8px', width: '130px', marginLeft: '10px' }} />
          </div>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '130px' }}>HEIGHT</span>
            <input type="number" name="height" placeholder="Ex. 189 cm" style={{ border: '2px solid black', borderRadius: '5px', padding: '8px', width: '130px', marginLeft: '10px' }} />
          </div>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '130px' }}>WEIGHT</span>
            <input type="number" name="weight" placeholder="Ex. 70 Kg" style={{ border: '2px solid black', borderRadius: '5px', padding: '8px', width: '130px', marginLeft: '10px' }} />
          </div>
        </div>
        <div style={{ borderLeft: '2px solid black', height: '100%', marginRight: '50px' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '130px' }}>CALORIES</span>
            <input type="number" name="calories" placeholder="Ex. 2000" value={formData.calories} onChange={handleChange} style={{ border: '2px solid black', borderRadius: '5px', padding: '8px', width: '130px', marginLeft: '10px' }} />
          </div>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '130px' }}>CARBOHYDRATES</span>
            <input type="number" name="carbohydrates" placeholder="Ex. 250" value={formData.carbohydrates} onChange={handleChange} style={{ border: '2px solid black', borderRadius: '5px', padding: '8px', width: '130px', marginLeft: '10px' }} />
          </div>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '130px' }}>PROTEIN</span>
            <input type="number" name="protein" placeholder="Ex. 150" value={formData.protein} onChange={handleChange} style={{ border: '2px solid black', borderRadius: '5px', padding: '8px', width: '130px', marginLeft: '10px' }} />
          </div>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '130px' }}>FAT</span>
            <input type="number" name="fat" placeholder="Ex. 70" value={formData.fat} onChange={handleChange} style={{ border: '2px solid black', borderRadius: '5px', padding: '8px', width: '130px', marginLeft: '10px' }} />
          </div>
          <button onClick={handleSave} style={{ backgroundColor: 'green', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', width: '160px', height: '40px', borderRadius: '5px', marginLeft: 'auto', marginRight: '0' }}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
