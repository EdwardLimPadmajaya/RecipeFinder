import React from 'react';

const RecipePage = ({ recipe, onFavorite }) => {
  const handleFavoriteClick = () => {
    onFavorite(recipe);
  };

  return (
    <div className="recipe-page">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.instructions}</p>
      <button onClick={handleFavoriteClick}>Favorite</button>
    </div>
  );
};

export default RecipePage;
