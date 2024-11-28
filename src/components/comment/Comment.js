import React, { useState } from 'react';
import './Comment.css';
import CommentForm from '../commentForm/CommentForm';
import SubComment from '../subComment/SubComment';
import { useUser } from '../../context/UserContext';

const Comment = ({ 
  comment, 
  onUpvote, 
  onDownvote, 
  onDelete,
  onAddSubComment 
}) => {
  const { currentUser } = useUser();
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="username">{comment.username}</span>
        {currentUser?.id === comment.userId && (
          <button 
            className="delete-button"
            onClick={() => onDelete(comment.id, false)}
          >
            Delete
          </button>
        )}
      </div>
      <p>{comment.text}</p>
      <div className="comment-actions">
        <button onClick={() => onUpvote(comment.id, false)}>
          Upvote ({comment.upvotes})
        </button>
        <button onClick={() => onDownvote(comment.id, false)}>
          Downvote ({comment.downvotes})
        </button>
        <button onClick={() => setShowReplyForm(!showReplyForm)}>
          Reply
        </button>
      </div>
      
      {showReplyForm && (
        <CommentForm 
          onSubmit={(text) => {
            onAddSubComment(text);
            setShowReplyForm(false);
          }}
          isReply
        />
      )}

      <div className="sub-comments">
        {comment.subComments
          ?.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
          .map(subComment => (
            <SubComment
              key={subComment.id}
              subComment={subComment}
              onUpvote={(id) => onUpvote(id, true)}
              onDownvote={(id) => onDownvote(id, true)}
              onDelete={(id) => onDelete(id, true)}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;