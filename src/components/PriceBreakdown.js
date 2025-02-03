import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Import necessary for Chart.js

const PriceBreakdown = ({ ingredients }) => {
  const data = {
    labels: ingredients.map(ingredient => ingredient.name),
    datasets: [
      {
        data: ingredients.map(ingredient => ingredient.price),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#4BC0C0',
          '#9966FF',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40'
        ],
      },
    ],
  };

  const totalCost = ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
  const costPerServing = totalCost / 2; // Assuming 2 servings per recipe

  return (
    <div className="price-breakdown">
      <h3>Price Breakdown</h3>
      <div className="price-breakdown-content">
        <div className="chart-container">
          <Pie data={data} />
        </div>
        <div className="price-list">
          <table>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient) => (
                <tr key={ingredient.id}>
                  <td>{ingredient.original}</td>
                  <td>${ingredient.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-cost">
            <p>Total Recipe Cost: ${totalCost.toFixed(2)}</p>
            <p>Cost Per Serving: ${costPerServing.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
