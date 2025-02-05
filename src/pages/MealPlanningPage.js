import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MealPlanningPage.css';

const MealPlanningPage = () => {
  const [meals, setMeals] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });

  useEffect(() => {
    const savedMeals = JSON.parse(localStorage.getItem('meals')) || {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    };
    setMeals(savedMeals);
  }, []);

  const removeMeal = (day, index) => {
    const updatedMeals = { ...meals };
    updatedMeals[day].splice(index, 1);
    setMeals(updatedMeals);
    localStorage.setItem('meals', JSON.stringify(updatedMeals));
  };

  return (
    <div className="meal-planning">
      <h2>Meal Planning</h2>
      {Object.values(meals).every(dayMeals => dayMeals.length === 0) && (
        <p>Tap into our databases to offer customized meal plans or build your own interactive meal planning tool.</p>
      )}
      <div className="meal-grid">
        {Object.keys(meals).map((day) => (
          <div key={day} className="meal-card">
            <div className="meal-day">{day}</div>
            {meals[day].length === 0 ? (
              <p>No meals planned for this day.</p>
            ) : (
              meals[day].map((meal, index) => (
                <div key={index} className="meal-item">
                  <img src={meal.image} alt={meal.title} className="meal-image" />
                  <Link to={`/recipe/${meal.id}`} className="meal-link">
                    <h3>{meal.title}</h3>
                  </Link>
                  <button className="remove-button" onClick={() => removeMeal(day, index)}>Remove</button>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanningPage;
