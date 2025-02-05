import axios from 'axios';
const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const fetchRecipes = async (query) => {
  const response = await axios.get(`${BASE_URL}/complexSearch`, {
    params: {
      query,
      apiKey: API_KEY,
      number: 10
    }
  });
  return response.data.results;
};

export const fetchRecipeDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}/information`, {
    params: {
      apiKey: API_KEY,
      includeNutrition: true
    }
  });
  return response.data;
};

export const fetchIngredients = async (query) => {
  const response = await axios.get('https://api.spoonacular.com/food/ingredients/search', {
    params: {
      query,
      apiKey: API_KEY
    }
  });
  return response.data.results;
};
