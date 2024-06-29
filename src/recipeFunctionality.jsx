const appId = "92c98664";
const appKey = "38241f816e4c455f1e0dd34dfbaa3aba";

// Health (String array)
// Available values : alcohol-cocktail, alcohol-free, celery-free, crustacean-free, 
// dairy-free, DASH, egg-free, fish-free, fodmap-free, gluten-free, immuno-supportive, 
// keto-friendly, kidney-friendly, kosher, low-fat-abs, low-potassium, low-sugar, lupine-free, 
// Mediterranean, mollusk-free, mustard-free, no-oil-added, paleo, peanut-free, pescatarian, pork-free, 
// red-meat-free, sesame-free, shellfish-free, soy-free, sugar-conscious, sulfite-free, tree-nut-free, 
// vegan, vegetarian, wheat-free

// excluded (string array)
// Excluding recipes with certain ingredients. The format is excluded=FOOD where FOOD is replaced by the name of 
// the specific food you don’t want to be present in the recipe results. More than one food can be excluded at the 
// same time. Example: excluded=vinegar&excluded=pretzel will exclude any recipes which contain vinegar or pretzels 
// in their ingredient list

/**
 * @param {string} search // String you wanna search
 * @param {string[]} health
 * @param {number} timeMax 
 * @param {string[]} excluded 
 */
export async function getRecipes(search, health, timeMax, excluded) {
  let url =`https://api.edamam.com/api/recipes/v2/?q=${search}&app_id=${appId}&app_key=${appKey}&type=public`;

  if (health.length) {
    const healthString = health.join(",");
    url += `&health=${encodeURIComponent(healthString)}`;
  }

  url += `&time=${timeMax}`;

  for (const item of excluded) {
    url += `&excluded=${item}`;
  }
  
  const response = await fetch(url);
  const data = await response.json();

  const list = data.hits.map(resipee => resipee.recipe);
  const array = [];

  for (const recipe of list) {
    array.push({
      images: recipe.images,
      ingredients: recipe.ingredients,
      name: recipe.label,
      uri: recipe.uri,
      url: recipe.url
    })
  }
  
  return array;
}

// field
// array[string]
// (query)
// Recipe fields to be included in the response.

// Available values : uri, label, image, images, source, url, shareAs, yield, dietLabels, healthLabels, cautions, 
// ingredientLines, ingredients, calories, totalTime, mealType, dishType, 



