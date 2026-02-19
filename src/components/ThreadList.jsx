import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({ threads }) {
  // Jika tidak ada thread, tampilkan pesan khusus
  if (threads.length === 0) {
    return (
      // <-- PERUBAHAN: Kelas CSS dan teks diubah untuk tampilan 'empty state'
      <div className="card empty-state">
        <p>Belum ada diskusi. Jadilah yang pertama memulai!</p>
      </div>
    );
  }

  // Jika ada thread, tampilkan daftar thread
  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ThreadList;