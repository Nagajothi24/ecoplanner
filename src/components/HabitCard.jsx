import React from 'react';
import './HabitCard.css'; // we’ll create this later

function HabitCard({ habit, isChecked, onToggle }) {
  return (
    <div className={`habit-card ${isChecked ? 'checked' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onToggle(habit.id)}
        />
        {habit.name}
      </label>
    </div>
  );
}

export default HabitCard;
