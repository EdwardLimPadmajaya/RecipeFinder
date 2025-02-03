import React, { useState } from 'react';

const SearchBar = ({ onSearch, onIngredientSearch }) => {
  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleIngredientSearch = () => {
    onIngredientSearch(ingredients);
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for recipes..."
      />
      <button onClick={handleSearch}>Search</button>
      <br />
      <input 
        type="text" 
        value={ingredients} 
        onChange={(e) => setIngredients(e.target.value)} 
        placeholder="Enter ingredients..."
      />
      <button onClick={handleIngredientSearch}>Search by Ingredients</button>
    </div>
  );
};

export default SearchBar;
