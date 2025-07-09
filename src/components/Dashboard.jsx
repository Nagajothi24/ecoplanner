import React from 'react';
import './Dashboard.css';

function Dashboard({ habits, checkedHabits }) {
  const total = habits.length;
  const completed = Object.values(checkedHabits).filter(Boolean).length;
  const percentage = (completed / total) * 100;

  return (
    <div className="dashboard">
      <h2>📊 Progress</h2>
      <div className="progress-bar">
        <div style={{ width: `${percentage}%` }}></div>
      </div>
      <p>{completed} of {total} habits completed today</p>
    </div>
  );
}

export default Dashboard;
