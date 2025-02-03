import React from 'react';
import './RecipeList.css';

const RecipeList = ({ recipes = [], onSelect, onFavorite, favorites }) => (
  <div className="recipe-list">
    {recipes.length > 0 ? (
      recipes.map((recipe) => {
        const isFavorited = favorites.some(fav => fav.id === recipe.id);
        return (
          <div key={recipe.id} className="recipe-card" onClick={() => onSelect(recipe.id)}>
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <div className="favorite-container" onClick={(e) => { e.stopPropagation(); onFavorite(recipe, isFavorited); }}>
              <button className={`favorite-button ${isFavorited ? 'favorited' : ''}`}>
                {isFavorited ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        );
      })
    ) : (
      <p>No recipes available.</p>
    )}
  </div>
);

export default RecipeList;
