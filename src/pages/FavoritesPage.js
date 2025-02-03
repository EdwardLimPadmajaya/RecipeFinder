import React from 'react';
import './FavoritesPage.css';

const FavoritesPage = ({ favorites, onSelect, onRemoveFavorite }) => {
  return (
    <div className="favorites-container">
      <h2>Favorite Recipes</h2>
      <div className="recipe-list">
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <div key={recipe.id} className="recipe-card" onClick={() => onSelect(recipe.id)}>
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <button
                className="favorite-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite(recipe.id);
                }}
              >
                ❌
              </button>
            </div>
          ))
        ) : (
          <p>No favorite recipes yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
