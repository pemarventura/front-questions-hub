// src/components/CommentSection.js
import React, { useState, useEffect } from 'react';
import './CommentSection.css';
import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';
import { useUser } from '../../context/UserContext';

const CommentSection = ({ questionId, comments: initialComments }) => {
  const { currentUser } = useUser();
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleUpvote = (id, isSubComment, parentId) => {
    if (isSubComment) {
      setComments(comments.map(comment => 
        comment.id === parentId ? {
          ...comment,
          subComments: comment.subComments.map(subComment =>
            subComment.id === id ? { ...subComment, upvotes: subComment.upvotes + 1 } : subComment
          )
        } : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === id ? { ...comment, upvotes: comment.upvotes + 1 } : comment
      ));
    }
  };

  const handleDownvote = (id, isSubComment, parentId) => {
    if (isSubComment) {
      setComments(comments.map(comment => 
        comment.id === parentId ? {
          ...comment,
          subComments: comment.subComments.map(subComment =>
            subComment.id === id ? { ...subComment, downvotes: subComment.downvotes + 1 } : subComment
          )
        } : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === id ? { ...comment, downvotes: comment.downvotes + 1 } : comment
      ));
    }
  };

  const handleAddComment = (text) => {
    const newComment = {
      id: Date.now(),
      text,
      upvotes: 0,
      downvotes: 0,
      userId: currentUser.id,
      username: currentUser.username,
      subComments: []
    };
    setComments([...comments, newComment]);
  };

  const handleAddSubComment = (parentId, text) => {
    const newSubComment = {
      id: Date.now(),
      text,
      upvotes: 0,
      downvotes: 0,
      userId: currentUser.id,
      username: currentUser.username
    };
    
    setComments(comments.map(comment =>
      comment.id === parentId
        ? { ...comment, subComments: [...comment.subComments, newSubComment] }
        : comment
    ));
  };

  const handleDelete = (id, isSubComment, parentId) => {
    if (isSubComment) {
      setComments(comments.map(comment =>
        comment.id === parentId
          ? { ...comment, subComments: comment.subComments.filter(sub => sub.id !== id) }
          : comment
      ));
    } else {
      setComments(comments.filter(comment => comment.id !== id));
    }
  };

  return (
    <div className="comment-section">
      <h4>Comments</h4>
      <CommentForm onSubmit={handleAddComment} />
      {comments
        .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
        .map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser} // Pass currentUser to Comment
            onUpvote={(id, isSubComment) => handleUpvote(id, isSubComment, comment.id)}
            onDownvote={(id, isSubComment) => handleDownvote(id, isSubComment, comment.id)}
            onDelete={(id, isSubComment) => handleDelete(id, isSubComment, comment.id)}
            onAddSubComment={(text) => handleAddSubComment(comment.id, text)}
          />
        ))}
    </div>
  );
};

export default CommentSection;