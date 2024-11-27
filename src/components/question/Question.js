// src/components/Question.js
import React, { useState } from 'react';
import './Question.css';
import Answer from '../answer/Answer';
import CommentSection from '../commentSection/CommentSection';

const Question = ({ question }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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
      <h3>{question.text}</h3>
      <div className="answers-container">
        {question.answers.map((answer, index) => (
          <Answer
            key={index}
            index={index}
            answer={answer}
            selectedAnswer={selectedAnswer}
            correctAnswer={question.correctAnswer}
            onClick={handleAnswerClick}
            isSubmitted={isSubmitted}
          />
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
      <CommentSection questionId={question.id} comments={question.comments} />
    </div>
  );
};

export default Question;