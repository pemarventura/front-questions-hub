// src/components/NavigationButtons.js
const NavigationButtons = ({ 
    onPrevious, 
    onNext, 
    isFirst, 
    isLast, 
    className 
  }) => {
    return (
      <div className={`navigation-buttons ${className}`}>
        <button 
          className="nav-button" 
          onClick={onPrevious} 
          disabled={isFirst}
        >
          Previous
        </button>
        <button 
          className="nav-button" 
          onClick={onNext} 
          disabled={isLast}
        >
          Next
        </button>
      </div>
    );
  };

  export default NavigationButtons;