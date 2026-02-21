import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

// <-- PERUBAHAN: Tambahkan onVote sebagai parameter
function ThreadList({ threads, onVote }) {
  if (threads.length === 0) {
    return (
      <div className="card empty-state">
        <p>Belum ada diskusi. Jadilah yang pertama memulai!</p>
      </div>
    );
  }

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        // <-- PERUBAHAN: Teruskan onVote ke ThreadItem
        <ThreadItem key={thread.id} {...thread} onVote={onVote} />
      ))}
    </div>
  );
}

// <-- PERUBAHAN: Tambahkan onVote pada PropTypes
ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onVote: PropTypes.func.isRequired, 
};

export default ThreadList;