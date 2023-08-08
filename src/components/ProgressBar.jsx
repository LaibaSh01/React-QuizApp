import React from 'react';
import "./main.css";

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="progress-barr">
      <div className="progresss" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
