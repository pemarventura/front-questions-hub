import React, { useState, useRef, useEffect } from 'react';
import './MainApp.css';
import Question from './components/question/Question';
import NavigationButtons from './components/navigationButton/NavigationButton';
import { useUser } from './context/UserContext';

const MainApp = ({ signOut, jwtToken }) => {
  const { currentUser } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionRef = useRef(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const questions = [
    {
      id: 10,
      text: 'What is the capital of France?',
      answers: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 2,
      comments: [
        {
          id: 1,
          text: 'Great question!',
          upvotes: 10,
          downvotes: 2,
          userId: 'user1',
          username: 'John',
          subComments: [
            {
              id: 3,
              text: 'I agree!',
              userId: 'user2',
              username: 'Jane',
              upvotes: 5,
              downvotes: 1
            }
          ]
        },
        {
          id: 2,
          text: 'I found this confusing.',
          upvotes: 3,
          downvotes: 5,
          userId: 'user2',
          username: 'Jane',
          subComments: []
        }
      ]
    },
    {
      id: 2,
      text: 'What is 2 + 2?',
      answers: ['3', '4', '5', '6'],
      correctAnswer: 1,
      comments: [
        {
          id: 1,
          text: 'Simple question!',
          upvotes: 8,
          downvotes: 1,
          userId: 'user3',
          username: 'Alice',
          subComments: []
        }
      ]
    }
  ];

  const handleNextQuestion = () => {
    setIsNavigating(true);
    setCurrentQuestionIndex((prevIndex) => 
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousQuestion = () => {
    setIsNavigating(true);
    setCurrentQuestionIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  useEffect(() => {
    if (isNavigating && questionRef.current) {
      console.log('Scrolling to question ref');
      const timer = setTimeout(() => {
        questionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        setIsNavigating(false);
      }, 100); // Adjust delay as needed

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [currentQuestionIndex, isNavigating]);

  return (
    <div className="main-app-container">
      <div className="main-app-header">
        <h2>Welcome, {currentUser.username}!</h2>
        <button className="sign-out-button" onClick={signOut}>
          Sign out
        </button>
      </div>
      <div className="scroll-reference" ref={questionRef}>
      <NavigationButtons 
        className="top-nav"
        onPrevious={handlePreviousQuestion}
        onNext={handleNextQuestion}
        isFirst={currentQuestionIndex === 0}
        isLast={currentQuestionIndex === questions.length - 1}
      />
      <div className="main-app-content">
        <Question question={questions[currentQuestionIndex]} />
      </div>
      <NavigationButtons
        className="bottom-nav"
        onPrevious={handlePreviousQuestion}
        onNext={handleNextQuestion}
        isFirst={currentQuestionIndex === 0}
        isLast={currentQuestionIndex === questions.length - 1}
      />
      </div>
      
    </div>
  );
};

export default MainApp;