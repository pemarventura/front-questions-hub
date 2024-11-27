// src/components/SubComment.js
import React from 'react';
import './SubComment.css';

const SubComment = ({ 
  subComment, 
  currentUser, 
  onUpvote, 
  onDownvote, 
  onDelete 
}) => {
  return (
    <div className="sub-comment">
      <div className="comment-header">
        <span className="username">{subComment.username}</span>
        {currentUser.id === subComment.userId && (
          <button 
            className="delete-button"
            onClick={() => onDelete(subComment.id)}
          >
            Delete
          </button>
        )}
      </div>
      <p>{subComment.text}</p>
      <div className="comment-actions">
        <button onClick={() => onUpvote(subComment.id)}>
          Upvote ({subComment.upvotes})
        </button>
        <button onClick={() => onDownvote(subComment.id)}>
          Downvote ({subComment.downvotes})
        </button>
      </div>
    </div>
  );
};

export default SubComment;