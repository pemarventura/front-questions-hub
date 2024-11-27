// src/components/Comment.js
import React from 'react';
import './Comment.css';

const Comment = ({ comment, onUpvote, onDownvote }) => {
  return (
    <div className="comment">
      <p>{comment.text}</p>
      <div className="comment-actions">
        <button onClick={onUpvote}>Upvote ({comment.upvotes})</button>
        <button onClick={onDownvote}>Downvote ({comment.downvotes})</button>
      </div>
    </div>
  );
};

export default Comment;