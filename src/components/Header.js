import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="header-container">
      <h1>Recipe Finder</h1>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/filter-by-ingredients">Filter by Ingredients</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/meal-planning">Meal Planning</Link>
      </nav>
    </div>
  </header>
);

export default Header;