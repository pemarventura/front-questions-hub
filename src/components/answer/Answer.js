// src/components/Answer.js
import React from 'react';
import './Answer.css';

const Answer = ({ 
  index, 
  answer, 
  selectedAnswer, 
  correctAnswer, 
  onClick, 
  isSubmitted 
}) => {
  const getClassName = () => {
    const baseClass = 'answer';
    if (!isSubmitted) {
      return selectedAnswer === index ? `${baseClass} selected` : baseClass;
    }
    if (index === correctAnswer) return `${baseClass} correct`;
    if (index === selectedAnswer) return `${baseClass} incorrect`;
    return baseClass;
  };

  return (
    <div 
      className={getClassName()} 
      onClick={() => onClick(index)}
    >
      {answer}
    </div>
  );
};

export default Answer;