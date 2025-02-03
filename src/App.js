import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import IngredientFilterPage from './pages/IngredientFilterPage';
import IndexPage from './pages/IndexPage';
import FavoritesPage from './pages/FavoritesPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import MealPlanningPage from './pages/MealPlanningPage';
import { fetchRecipesByIngredients } from './services/api';
import './index.css';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleIngredientSearch = async (ingredients) => {
    const results = await fetchRecipesByIngredients(ingredients);
    setRecipes(results);
  };

  const handleFavorite = (recipe) => {
    const updatedFavorites = [...favorites, recipe];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <IndexPage
              favorites={favorites}
              setFavorites={setFavorites}
              handleFavorite={handleFavorite}
              handleFavoriteRemove={handleRemoveFavorite}
              recipes={recipes}
              handleRecipeSelect={(id) => window.location.href = `/recipe/${id}`}
            />
          } />
          <Route path="/filter-by-ingredients" element={<IngredientFilterPage onFilter={handleIngredientSearch} />} />
          <Route path="/favorites" element={
            <FavoritesPage
              favorites={favorites}
              onSelect={(id) => window.location.href = `/recipe/${id}`}
              onRemoveFavorite={handleRemoveFavorite}
            />
          } />
          <Route path="/recipe/:id" element={<RecipeDetailsPage recipes={recipes} onFavorite={handleFavorite} />} />
          <Route path="/meal-planning" element={<MealPlanningPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
