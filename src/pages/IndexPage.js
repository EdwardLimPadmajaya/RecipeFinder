import React, { useState, useEffect } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import RecipeList from '../components/RecipeList';
import RecipePage from '../components/RecipePage';
import { fetchRecipes } from '../services/api';
import './IndexPage.css';

const IndexPage = ({ selectedRecipe, handleFavorite, handleRecipeSelect, favorites, setFavorites }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('healthy');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchRecipes(selectedCategory, itemsPerPage);
      setRecipes(results);
      setCurrentPage(1);
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const loadMoreRecipes = async () => {
    const newPage = currentPage + 1;
    const results = await fetchRecipes(selectedCategory, itemsPerPage, (newPage - 1) * itemsPerPage);
    setRecipes([...recipes, ...results]);
    setCurrentPage(newPage);
  };

  const handleFavoriteToggle = (recipe, isFavorited) => {
    if (isFavorited) {
      handleFavoriteRemove(recipe.id);
    } else {
      handleFavorite(recipe);
    }
  };

  const handleFavoriteRemove = (id) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container">
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      {selectedRecipe ? (
        <RecipePage recipe={selectedRecipe} onFavorite={handleFavorite} />
      ) : (
        <>
          <RecipeList
            recipes={recipes}
            onSelect={handleRecipeSelect}
            onFavorite={handleFavoriteToggle}
            favorites={favorites}
          />
          <button className="load-more-button" onClick={loadMoreRecipes}>Load More</button>
        </>
      )}
    </div>
  );
};

export default IndexPage;
