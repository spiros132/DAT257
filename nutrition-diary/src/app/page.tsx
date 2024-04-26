"use client";

export default function Home() {
  // The main page when you go into the website
  return (
    <div>
      <div className="flex-1 flex items-center justify-center"> {/* Center the image */}
        <img src="/NutritionDiary1.png" alt="Nutrition Diary Logo" className="centered-image" style={{ width: '450px', filter: 'grayscale(3%) brightness(95%)' }} />
      </div>
    </div>
  );
}
