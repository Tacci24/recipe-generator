import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { useState } from "react";

function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipeShown, setRecipeShown] = useState(false);

  function toggleRecipeShown() {
    setRecipeShown((prevShown) => !prevShown);
  }

  const addIngredient = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newIngredient = formData.get("ingredient").trim();
    if (newIngredient && !ingredients.includes(newIngredient)) {
      setIngredients((prev) => [...prev, newIngredient]);
    }
    e.target.reset();
  };

  const removeIngredient = (name) => {
    setIngredients((prev) => prev.filter((i) => i !== name));
  };

  return (
    <main className="main">
      {ingredients.length === 0 && !recipeShown && (
        <div className="welcome-message">
          👨‍🍳 Welcome! Let's generate your best recipe!
        </div>
      )}
      
      <form className="add-ingredient-form" onSubmit={addIngredient}>
        <input
          type="text"
          placeholder="e.g beef"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button type="submit">Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <button
          onClick={() => setIngredients([])}
          className="clear-all-btn"
          aria-label="Clear all ingredients"
          title="Clear all ingredients"
        >
          Clear All
        </button>
      )}

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          toggleRecipeShown={toggleRecipeShown}
          removeIngredient={removeIngredient}
        />
      )}
      {recipeShown && <ClaudeRecipe ingredients={ingredients} />}
    </main>
  );
}

export default Main;
