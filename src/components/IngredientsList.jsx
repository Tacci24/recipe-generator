import React from "react";

function IngredientsList({ ingredients, toggleRecipeShown, removeIngredient }) {
  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite" role="list">
        {ingredients.map((ingredient, index) => (
          <li key={`${ingredient}-${index}`} role="listitem">
            {ingredient}
            <button
              onClick={() => removeIngredient(ingredient)}
              className="remove-btn"
              aria-label={`Remove ${ingredient}`}
              title={`Remove ${ingredient}`}
            >
              remove
            </button>
          </li>
        ))}
      </ul>

      {ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={toggleRecipeShown}>Get a recipe</button>
        </div>
      )}
    </section>
  );
}

export default IngredientsList;