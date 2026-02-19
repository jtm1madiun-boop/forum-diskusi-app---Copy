import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewThreadInput({ addThread }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const handleAddThread = (event) => {
    event.preventDefault();
    if (body.trim()) {
      addThread({ title, body, category });
      setTitle('');
      setCategory('');
      setBody('');
    }
  };

  return (
    <div className="new-thread-form card">
      <h3><i className="fa-solid fa-plus" /> Buat Diskusi Baru</h3>
      <form onSubmit={handleAddThread}>
        <input
          type="text"
          placeholder="Apa judul diskusimu?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Kategori (opsional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <textarea
          rows="4"
          placeholder="Tuliskan isi diskusimu di sini..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Buat Thread</button>
      </form>
    </div>
  );
}

NewThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default NewThreadInput;