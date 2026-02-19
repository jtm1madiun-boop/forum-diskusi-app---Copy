import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ addComment }) {
  const [content, setContent] = useState('');

  const handleAddComment = () => {
    if (content.trim()) {
      addComment(content);
      setContent('');
    }
  };

  return (
    <div className="comments-section card">
      <h3>Beri Komentar</h3>
      <form
        className="comment-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddComment();
        }}
      >
        <textarea
          rows="4"
          placeholder="Tulis komentarmu..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Kirim Komentar
        </button>
      </form>
    </div>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;