// src/components/CommentForm.js
import React, { useState } from 'react';
import './CommentForm.css';

const CommentForm = ({ onSubmit, isReply = false }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <form className={`comment-form ${isReply ? 'reply-form' : ''}`} onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={isReply ? "Write a reply..." : "Write a comment..."}
        required
      />
      <button type="submit">{isReply ? "Reply" : "Comment"}</button>
    </form>
  );
};

export default CommentForm;