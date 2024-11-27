// src/components/Question.js
import React, { useState } from 'react';
import './Question.css';
import Answer from '../answer/Answer';

const Question = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(2); // Example correct answer index
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerClick = (index) => {
    if (isSubmitted) {
      setIsSubmitted(false);
    }
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="question-container">
      <h3>What is the capital of France?</h3>
      <div className="answers-container">
        {['Berlin', 'Madrid', 'Paris', 'Rome'].map((answer, index) => (
          <Answer
            key={index}
            index={index}
            answer={answer}
            selectedAnswer={selectedAnswer}
            correctAnswer={correctAnswer}
            onClick={handleAnswerClick}
            isSubmitted={isSubmitted}
          />
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Question;