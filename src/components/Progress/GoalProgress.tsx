// src/components/Progress/GoalProgress.tsx
import React from 'react';

interface GoalProgressProps {
  title: string;
  current: number;
  target: number;
  color: string;
}

const GoalProgress = ({ title, current, target, color }: GoalProgressProps) => {
  const percentage = Math.min(100, Math.round((current / target) * 100));
  
  return (
    <div className="goal-progress">
      <div className="goal-progress-header">
        <span className="font-medium">{title}</span>
        <span className="text-sm">{percentage}%</span>
      </div>
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color
          }}
        ></div>
      </div>
      <div className="goal-progress-footer">
        <span>{current.toLocaleString()}</span>
        <span>Goal: {target.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default GoalProgress;