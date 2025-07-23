export async function generateRecipeFromSpoonacular(ingredients) {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  if (!apiKey) {
    throw new Error("Spoonacular API key is missing. Check your .env file.");
  }

  const query = ingredients.join(",");
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=1&ranking=2&ignorePantry=true&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch recipe");

    const data = await response.json();
    if (data.length === 0) throw new Error("No recipe found");

    const recipeId = data[0].id;

    const detailUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`;
    const detailRes = await fetch(detailUrl);
    if (!detailRes.ok) throw new Error("Failed to fetch recipe details");

    const recipe = await detailRes.json();

    return {
      title: recipe.title,
      image: recipe.image,
      ingredients: recipe.extendedIngredients.map((i) => i.original),
      instructions: recipe.analyzedInstructions?.[0]?.steps.map((step) => step.step) || [],
      sourceUrl: recipe.sourceUrl,
    };
  } catch (err) {
    console.error("Error fetching recipe:", err);
    throw err;
  }
}
