import React from 'react';

const RecipeCard = ({ recipe, onSelect, onFavorite }) => {
  const handleClick = () => {
    onSelect(recipe.id);
  };

  const handleFavoriteClick = () => {
    onFavorite(recipe);
  };

  return (
    <div className="recipe-card" onClick={handleClick}>
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <button onClick={handleFavoriteClick}>Favorite</button>
    </div>
  );
};

export default RecipeCard;
