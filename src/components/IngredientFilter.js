import React, { useState, useEffect } from 'react';
import { fetchRecipesByIngredients, fetchIngredients } from '../services/api';
import './IngredientFilter.css';

const predefinedIngredients = [
  'Rice', 'Pasta', 'Flour', 'Chicken', 'Beef', 'Tomatoes', 'Onions', 'Garlic', 
  'Bell Peppers', 'Olive Oil', 'Soy Sauce', 'Ginger', 'Broccoli', 'Eggs', 'Milk',
  'Sugar', 'Butter', 'Bacon', 'Cheese', 'Spinach', 'Mushrooms', 'Bread', 'Lettuce',
  'Ham', 'Avocado', 'Cucumber', 'Steak', 'Potatoes', 'Green Beans', 'Salmon',
  'Carrots', 'Chocolate', 'Vanilla', 'Cocoa Powder', 'Cinnamon', 'Nutmeg', 'Cream Cheese',
  'Nuts', 'Fruit', 'Yogurt', 'Crackers', 'Hummus', 'Veggies'
];

const IngredientFilter = ({ onFilter }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchedIngredients, setSearchedIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState(predefinedIngredients);

  useEffect(() => {
    const savedIngredients = JSON.parse(localStorage.getItem('ingredients')) || predefinedIngredients;
    setIngredients(savedIngredients);
  }, []);

  const handleCheckboxChange = (ingredient) => {
    setSelectedIngredients((prevSelected) => 
      prevSelected.includes(ingredient) 
        ? prevSelected.filter(item => item !== ingredient) 
        : [...prevSelected, ingredient]
    );
  };

  const handleFilter = async () => {
    setLoading(true);
    const results = await fetchRecipesByIngredients(selectedIngredients);
    onFilter(results);
    setLoading(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    setLoading(true);
    const results = await fetchIngredients(searchInput);
    setSearchedIngredients(results);
    setLoading(false);
  };

  const handleAddSearchedIngredient = (ingredient) => {
    if (!ingredients.includes(ingredient)) {
      const newIngredients = [...ingredients, ingredient];
      setIngredients(newIngredients);
      localStorage.setItem('ingredients', JSON.stringify(newIngredients));
    }
    setSelectedIngredients([...selectedIngredients, ingredient]);
    setSearchedIngredients([]);
    setSearchInput('');
  };

  return (
    <div className="ingredient-filter box">
      <h3>Filter by Ingredients</h3>
      <div className="ingredients-list">
        {ingredients.map(ingredient => (
          <div key={ingredient} className="ingredient-item">
            <input
              type="checkbox"
              id={ingredient}
              value={ingredient}
              checked={selectedIngredients.includes(ingredient)}
              onChange={() => handleCheckboxChange(ingredient)}
            />
            <label htmlFor={ingredient}>{ingredient}</label>
          </div>
        ))}
      </div>
      <div className="search-ingredient-container">
        <input
          type="text"
          placeholder="Search for more ingredients"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="searched-ingredients">
        {searchedIngredients.map(ingredient => (
          <div key={ingredient.id} className="searched-ingredient-item">
            <span>{ingredient.name}</span>
            <button onClick={() => handleAddSearchedIngredient(ingredient.name)}>Add</button>
          </div>
        ))}
      </div>
      <button onClick={handleFilter} disabled={loading}>
        {loading ? 'Filtering...' : 'Filter Recipes'}
      </button>
    </div>
  );
};

export default IngredientFilter;
