import React from 'react';
import './Filter.css';

const Filter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    'All',
    'Main Dishes',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Desserts',
    'Snacks'
  ];

  return (
    <div className="filter-container">
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filter;
