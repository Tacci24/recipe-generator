import React, { useEffect, useState } from "react";
import { generateRecipeFromSpoonacular } from "../api/generateRecipe";

function ClaudeRecipe({ ingredients }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ingredients || ingredients.length === 0) {
      setRecipe(null); 
      setError("");
      setLoading(false);
      return;
    }

    async function fetchRecipe() {
      try {
        setLoading(true);
        const result = await generateRecipeFromSpoonacular(ingredients);
        setRecipe(result);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch recipe.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [ingredients]);

  if (loading) return <p>Generating your recipe...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return null;

  return (
    <div className="recipe-card">
      <h2>{recipe.title}</h2>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{
            maxWidth: "100%",
            borderRadius: "12px",
            marginBottom: "1rem",
          }}
        />
      )}

      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>

      <h3>Instructions:</h3>
      {recipe.instructions.length > 0 ? (
        <ol>
          {recipe.instructions.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      ) : (
        <p>No instructions provided. Visit the source for more info.</p>
      )}

      <a
        href={recipe.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: "1rem", color: "#007bff" }}
      >
        View Full Recipe ↗
      </a>
    </div>
  );
}

export default ClaudeRecipe;
