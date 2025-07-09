import React, { useEffect, useState } from 'react';

function StreakTracker({ checkedHabits }) {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('streak');
    return saved ? parseInt(saved) : 0;
  });
// const [streak, setStreak] = useState(14);

  useEffect(() => {
    const lastDate = localStorage.getItem('lastDate');

    if (Object.values(checkedHabits).includes(true)) {
      if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yStr = yesterday.toISOString().split("T")[0];

        if (lastDate === yStr) {
          setStreak((prev) => {
            localStorage.setItem('streak', prev + 1);
            return prev + 1;
          });
        } else {
          setStreak(1);
          localStorage.setItem('streak', 1);
        }

        localStorage.setItem('lastDate', today);
      }
    }
  }, [checkedHabits, today]);

  const getBadge = (streak) => {
  if (streak >= 7) {
    const level = Math.floor(streak / 7);
    return `🏅 ${level * 7}-Day Streak Badge!`;
  }
  return null;
};


  return (
  <div style={{ margin: "10px 0", fontWeight: "bold" }}>
    🔥 Streak: {streak} {streak === 1 ? "day" : "days"}
    
    {/* Show badge if streak is 7 or more */}
    {getBadge(streak) && (
      <div className="badge">
        {getBadge(streak)}
      </div>
    )}
  </div>
);
}

export default StreakTracker;
