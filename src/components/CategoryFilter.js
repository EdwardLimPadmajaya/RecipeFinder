import React from 'react';
import './CategoryFilter.css';

const categories = [
  { name: 'Healthy', icon: '💙', key: 'healthy' },
  { name: 'Vegetarian', icon: '🥗', key: 'vegetarian' },
  { name: 'Vegan', icon: '🌱', key: 'vegan' },
  { name: 'Gluten Free', icon: '🌾', key: 'glutenFree' },
  { name: 'Dairy Free', icon: '🥛', key: 'dairyFree' },
  { name: 'Paleo', icon: '🍖', key: 'paleo' },
  { name: 'Keto', icon: '🥓', key: 'keto' },
  { name: 'Mediterranean', icon: '🍅', key: 'mediterranean' },
  { name: 'More', icon: '➕', key: 'more' }
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <div
          key={category.key}
          className={`category-item ${selectedCategory === category.key ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.key)}
        >
          <div className="category-icon">{category.icon}</div>
          <div className="category-name">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
