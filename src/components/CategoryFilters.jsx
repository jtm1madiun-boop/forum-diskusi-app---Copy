import React from 'react';
import PropTypes from 'prop-types';

function CategoryFilters({ categories, currentCategory, onCategoryChange }) {
  return (
    <div className="thread-filters">
      <h4>Kategori Populer</h4>
      <button
        type="button"
        className={`btn btn-category ${currentCategory === '' ? 'active' : ''}`}
        onClick={() => onCategoryChange('')}
      >
        #all
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`btn btn-category ${category === currentCategory ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          #{category}
        </button>
      ))}
    </div>
  );
}

CategoryFilters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryFilters;