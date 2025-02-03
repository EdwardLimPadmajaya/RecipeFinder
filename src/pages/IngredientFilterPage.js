import React from 'react';
import IngredientFilter from '../components/IngredientFilter';
import './IngredientFilterPage.css';

const IngredientFilterPage = ({ onFilter }) => {
  return (
    <div className="container">
      <h2>Search food with your ingredients</h2>
      <IngredientFilter onFilter={onFilter} />
    </div>
  );
};

export default IngredientFilterPage;
