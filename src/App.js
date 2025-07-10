import React, { useState, useEffect } from 'react';
import './App.css';
import habits from './data/habits';
import HabitCard from './components/HabitCard';
import Dashboard from './components/Dashboard';
import StreakTracker from './components/StreakTracker';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const today = new Date().toISOString().split("T")[0];

  const [checkedHabits, setCheckedHabits] = useState(() => {
    const saved = localStorage.getItem('ecoHabits');
    return saved ? JSON.parse(saved) : {};
  });

  const [theme, setTheme] = useState('light');
  const [streak, setStreak] = useState(() => {
    const savedStreak = localStorage.getItem('ecoStreak');
    return savedStreak ? parseInt(savedStreak, 10) : 0;
  });

  const [lastDate, setLastDate] = useState(() => {
    return localStorage.getItem('lastDate') || today;
  });

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ecoHabits', JSON.stringify(checkedHabits));
  }, [checkedHabits]);

  useEffect(() => {
    if (lastDate !== today) {
      const allHabitsDone = habits.every(habit => checkedHabits[habit.id]);

      const newStreak = allHabitsDone ? streak + 1 : 0;
      setStreak(newStreak);
      localStorage.setItem('ecoStreak', newStreak.toString());

      // Reset checkboxes
      setCheckedHabits({});
      localStorage.setItem('lastDate', today);
      setLastDate(today);
    }
  }, [today, lastDate, checkedHabits, streak]);

  const toggleHabit = (id) => {
    setCheckedHabits(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="App">
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <h1>🌿 EcoPlanner</h1>
      <p>Track your zero-waste habits daily!</p>
      <Dashboard habits={habits} checkedHabits={checkedHabits} />
      <StreakTracker checkedHabits={checkedHabits} streak={streak} />
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          isChecked={checkedHabits[habit.id] || false}
          onToggle={toggleHabit}
        />
      ))}
    </div>
  );
}

export default App;
