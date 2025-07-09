import React, { useState, useEffect } from 'react';
import './App.css';
import habits from './data/habits';
import HabitCard from './components/HabitCard';
import Dashboard from './components/Dashboard';
import StreakTracker from './components/StreakTracker';
import ThemeToggle from './components/ThemeToggle';
function App() {
  const today = new Date().toISOString().split("T")[0]; // e.g., '2025-07-08'
  const lastDate = localStorage.getItem('lastDate');

  if (lastDate !== today) {
    localStorage.removeItem('ecoHabits'); // Reset checked habits
    localStorage.setItem('lastDate', today); // Update to today
  }

  
  const [checkedHabits, setCheckedHabits] = useState(() => {
    const saved = localStorage.getItem('ecoHabits');
    return saved ? JSON.parse(saved) : {};
  });
  const [theme, setTheme] = useState('light');

useEffect(() => {
  document.body.className = theme;
}, [theme]);


  useEffect(() => {
    localStorage.setItem('ecoHabits', JSON.stringify(checkedHabits));
  }, [checkedHabits]);

  const toggleHabit = (id) => {
    setCheckedHabits((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="App">
      <ThemeToggle theme={theme} setTheme={setTheme} />

      <h1>🌿 EcoPlanner</h1>
      <p>Track your zero-waste habits daily!</p>
       {/* Dashboard component */}
    <Dashboard habits={habits} checkedHabits={checkedHabits} />
    <StreakTracker checkedHabits={checkedHabits} />
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          isChecked={checkedHabits[habit.id]}
          onToggle={toggleHabit}
        />
      ))}
    </div>
  );
}

export default App;

