import React from 'react';

const ProfilePage = () => {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '2px', width: '100%', maxWidth: '100vw' }}>
      <h1 style={{ color: 'grey', fontSize: '14px', marginBottom: '2px' }}>Profile</h1> 
      
      {/** The menu button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ width: '40px', height: '40px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </div>
        </div>

      {/** NutritionDiary.png */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src="/NutritionDiary1.png" alt="Nutrition Diary Logo" style={{ width: '220px', margin: '0 auto', marginBottom: '10px' }} />
        <div style={{ position: 'absolute', top: '140px', left: '41%', transform: 'translateX(-40%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/** Increased space */}
         
    {/** Left side of the vertical line */}
    <div style={{ marginBottom: '130px' }}></div> {/** add an empty line */}
          
        {/** Profile */}
        <h2 style={{ color: 'black', fontSize: '24px', marginBottom: '10px', textAlign: 'left', marginLeft: '-120px' }}>Profile</h2> 
        <div style={{ position: 'relative', marginBottom: '10px', marginLeft: '-50px' }}>
    
    {/** Input 1 left section */}
    <div style={{ position: 'relative', marginBottom: '10px', display: 'flex', alignItems: 'center', marginLeft: '-140px' }}> 
    <span style={{ width: '130px', marginLeft: '10px' }}>USERNAME</span> 
    <div style={{ backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px', border: '2px solid black', position: 'relative', marginLeft: '10px' }}>
        <input type="text" placeholder="Ex. Spiros" style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '130px', marginLeft: '10px' }}/>
    </div>            
    <button style={{ backgroundColor: 'bg-greenTheme h-full w-[50%]', border: 'none', cursor: 'pointer', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '70%', height: '70%', fill: 'white' }}>
            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
        </svg>
    </button>
</div>

    {/** Input 2 left section */}
    <div style={{  marginBottom: '10px', display: 'flex', alignItems: 'center', marginLeft: '-140px' }}>
        <span style={{ width: '130px', marginLeft: '10px' }}>PASSWORD</span> {/** Positioning of the describing text */}
        <div style={{ backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px', border: '2px solid black', position: 'relative', marginLeft: '10px' }}>
            <input type="password" placeholder='EX. 1./234 Rbhjdfbj' style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '130px', marginLeft: '10px' }}/>
        </div>            
        <button style={{ backgroundColor: 'bg-greenTheme h-full w-[50%]', border: 'none', cursor: 'pointer', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '70%', height: '70%', fill: 'white' }}>
                <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
            </svg>
        </button>
    </div>

    {/** Input 3 left section */}
    <div style={{  marginBottom: '10px', display: 'flex', alignItems: 'center', marginLeft: '-140px' }}>
        <span style={{ width: '130px', marginLeft: '10px' }}>HEIGHT</span> {/** Positioning of the describing text */}
        <div style={{ backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px', border: '2px solid black', position: 'relative', marginLeft: '10px' }}>
            <input type="number" placeholder="Ex. 189 m" style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '130px', marginLeft: '10px' }}/>
        </div>            
        <button style={{ backgroundColor: 'bg-greenTheme h-full w-[50%]', border: 'none', cursor: 'pointer', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '70%', height: '70%', fill: 'white' }}>
                <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
            </svg>
        </button>
    </div>

    {/** Input 4 left section */}
    <div style={{  marginBottom: '10px', display: 'flex', alignItems: 'center', marginLeft: '-140px' }}>
        <span style={{ width: '130px', marginLeft: '10px' }}>WEIGHT</span> {/** Positioning of the describing text */}
        <div style={{ backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px', border: '2px solid black', position: 'relative', marginLeft: '10px' }}>
            <input type="number" placeholder="Ex. 70 Kg" style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '130px', marginLeft: '10px' }}/>
        </div>            
        <button style={{ backgroundColor: 'bg-greenTheme h-full w-[50%]', border: 'none', cursor: 'pointer', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '70%', height: '70%', fill: 'white' }}>
                <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
            </svg>
        </button>
    </div>

    {/** Input 5 left section */}
    <div style={{  marginBottom: '10px', display: 'flex', alignItems: 'center', marginLeft: '-140px' }}>
        <span style={{ width: '130px', marginLeft: '10px' }}>AGE</span> {/** Positioning of the describing text */}
        <div style={{ backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px', border: '2px solid black', position: 'relative', marginLeft: '10px' }}>
            <input type="number" placeholder="Ex. 30" style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '130px', marginLeft: '10px' }}/>
        </div>            
        <button style={{ backgroundColor: 'bg-greenTheme h-full w-[50%]', border: 'none', cursor: 'pointer', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '70%', height: '70%', fill: 'white' }}>
                <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
            </svg>
        </button>
    </div>
    {/** Input 6 left section */}
        
    <div style={{ marginLeft: '6px', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
    <div style={{ position: 'relative', marginBottom: '10px' }}>
        <div style={{ backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px', border: '2px solid black', position: 'relative' }}>
            <label htmlFor="gender"></label>
            <div style={{ padding: '2px', borderRadius: '1px', border: '1px solid white', display: 'inline-block' }}>
                <select id="gender" name="gender" style={{ padding: '2px', borderRadius: '2px', border: 'none', fontSize: '12px', width: '130px', marginLeft: '10px' }}>
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="No-answer">Prefer not to answer</option>
                </select>
            </div>
            <span style={{ width: '350px', position: 'absolute', top: '50%', left: '-85%', transform: 'translateY(-50%)' }}>GENDER</span>
        </div>
    </div>
    <button style={{ backgroundColor: 'bg-greenTheme h-full w-[50%]', border: 'none', cursor: 'pointer', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '70%', height: '70%', fill: 'white' }}>
            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
        </svg>
    </button>
</div>



</div>         

 {/** ////////////////////RIGHT SECTION////MIRROR//////////////// */}         
        </div>
        <div style={{ position: 'absolute', top: '120px', left: '63%', transform: 'translateX(-40%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
        <div style={{ position: 'relative',marginBottom: '150px', marginLeft: '-90px' }}></div>
        <h2 style={{ color: 'black', fontSize: '24px', marginBottom: '10px' }}>Target</h2> 
        
        {/* Calories */}
        <div style={{ position: 'relative', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: '130px', marginRight: '20px' }}>Calories</span>
        <input type="number" placeholder="kcal" style={{ border: '2px solid black', borderRadius: '5px', padding: '8px', width: '130px', marginRight: '10px' }}/> {/* TDEE= BMR X PAL = total daily calorie requirement */}
        <button style={{ backgroundColor: 'bg-greenTheme h-full w-[50%]', border: 'none', cursor: 'pointer', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '70%', height: '70%', fill: 'white' }}>
            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
            </svg>
        </button>
        </div>

        {/* Carbohydrates */}
        <div style={{ position: 'relative', marginBottom: '20px', display: 'flex', alignItems: 'center' }}> 
        <span style={{ width: '130px', marginRight: '20px' }}>Carbohydrates</span>
        <input type="number" placeholder="gram" style={{ border: '2px solid black', borderRadius: '5px', backgroundColor: 'transparent', width: '130px', padding: '8px', marginRight: '10px' }}/>
        <button style={{ backgroundColor: 'bg-greenTheme h-full w-[50%]', border: 'none', cursor: 'pointer', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '70%', height: '70%', fill: 'white' }}>
            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
            </svg>
        </button>
        </div>

        {/* Protein */}
        <div style={{ position: 'relative', marginBottom: '20px', display: 'flex', alignItems: 'center' }}> 
        <span style={{ width: '130px', marginRight: '20px' }}>Protein</span>
        <input type="number" placeholder="gram" style={{ border: '2px solid black', borderRadius: '5px', backgroundColor: 'transparent', width: '130px', padding: '8px', marginRight: '10px' }}/>
        <button style={{ backgroundColor: 'bg-greenTheme h-full w-[50%]', border: 'none', cursor: 'pointer', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '70%', height: '70%', fill: 'white' }}>
            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
            </svg>
        </button>
        </div>

        {/* Fat */}
        <div style={{ position: 'relative', marginBottom: '20px', display: 'flex', alignItems: 'center' }}> 
        <span style={{ width: '130px', marginRight: '20px' }}>Fat</span>
        <input type="number" placeholder="gram" style={{ border: '2px solid black', borderRadius: '5px', backgroundColor: 'transparent', width: '130px', padding: '8px', marginRight: '10px' }}/>
        <button style={{ backgroundColor: 'bg-greenTheme h-full w-[50%]', border: 'none', cursor: 'pointer', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '70%', height: '70%', fill: 'white' }}>
            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
            </svg>
        </button>
        </div>

        </div> 

        {/** vertical line */}
        <div style={{ position: 'absolute', top: '290px', left: '50%', width: '1px', height: '50%', backgroundColor: 'grey' }}></div> 
      </div>
    </div>
  );
};

export default ProfilePage;
