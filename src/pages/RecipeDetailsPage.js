import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetailsPage.css';
import { fetchRecipeDetails } from '../services/api';
import PriceBreakdown from '../components/PriceBreakdown';

import '../components/PriceBreakdown.css';

const RecipeDetailsPage = ({ recipes, onFavorite }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [mealPlan, setMealPlan] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });
  const [ingredientsWithPrice, setIngredientsWithPrice] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const existingRecipe = recipes.find((recipe) => recipe.id.toString() === id);
      if (existingRecipe) {
        setRecipe(existingRecipe);
        setIsFavorited(localStorage.getItem('favorites')?.includes(existingRecipe.id.toString()));
        setIngredientsWithPrice(existingRecipe.extendedIngredients.map(ingredient => ({
          ...ingredient,
          price: parseFloat((Math.random() * 2).toFixed(2)) // Mock price as a number
        })));
      } else {
        const fetchedRecipe = await fetchRecipeDetails(id);
        setRecipe(fetchedRecipe);
        setIsFavorited(localStorage.getItem('favorites')?.includes(fetchedRecipe.id.toString()));
        setIngredientsWithPrice(fetchedRecipe.extendedIngredients.map(ingredient => ({
          ...ingredient,
          price: parseFloat((Math.random() * 2).toFixed(2)) // Mock price as a number
        })));
      }
    };

    const loadMealPlan = () => {
      const savedMeals = JSON.parse(localStorage.getItem('meals')) || {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
      };
      setMealPlan(savedMeals);
    };

    fetchRecipe();
    loadMealPlan();
  }, [id, recipes]);

  const handleFavoriteClick = () => {
    onFavorite(recipe);
    setIsFavorited(true);
  };

  const handleAddToMealPlan = () => {
    if (!selectedDay) return;

    const updatedMeals = { ...mealPlan };
    updatedMeals[selectedDay].push({
      id: recipe.id,
      title: recipe.title,
      description: recipe.summary,
      image: recipe.image
    });

    setMealPlan(updatedMeals);
    localStorage.setItem('meals', JSON.stringify(updatedMeals));
    alert(`Added to ${selectedDay}`);
  };

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="recipe-details">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <div className="ingredients-section">
        <h3>Ingredients</h3>
        <div className="ingredients-list">
          {recipe.extendedIngredients.map((ingredient) => (
            <div key={ingredient.id} className="ingredient-item">
              <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} alt={ingredient.name} />
              <span>{ingredient.original}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="instructions-section">
        <h3>Instructions</h3>
        <div className="recipe-description" dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
      </div>
      <PriceBreakdown ingredients={ingredientsWithPrice} />
      <div className="meal-plan-section">
        <h3>Add to Meal Plan</h3>
        <div className="meal-plan-controls">
          <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
            <option value="">Select a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <button onClick={handleAddToMealPlan}>Add to Meal Plan</button>
        </div>
      </div>
      <div className="favorite-container" onClick={handleFavoriteClick}>
        <div className={`favorite-content ${isFavorited ? 'favorited' : ''}`}>
          <button className="favorite-button">
            {isFavorited ? '❤️' : '🤍'}
          </button>
          <span className="favorite-text">{isFavorited ? 'Added to Favorites' : 'Add to Favorites'}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
