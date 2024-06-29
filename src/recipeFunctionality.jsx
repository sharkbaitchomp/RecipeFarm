
const BASE_URL = "api.edamam.com/";
const appId = "64f065c0";
const appKey = "38e83f8244e4639d678b7d2f70d265e1";

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
 * @param {string[]} diet // Available values : balanced, high-fiber, high-protein, low-carb, low-fat, low-sodium
 * @param {string[]} health
 * @param {number} timeMin
 * @param {number} timeMax 
 * @param {string[]} excluded 
 */
async function getRecipes(search, diet, health, timeMax, excluded) {
  const response = await fetch("api.edamam.com/api/recipes/v2");
  console.log(response);

  // const response = await fetch("api.edamam.com/api/recipes/v2", {
  //   method: "GET",
  //   qs: JSON.stringify({
  //     type: "public",
  //     q: search,
  //     app_id: appId,
  //     app_key: appKey,
  //     random: true,
  //     diet: diet,
  //     health: health,
  //     excluded: excluded,
  //     time: timeMax,
  //     field: ["uri", "image", "url", "yield", "dietLabels", "healthLabels", "ingredientLines", "calories", "totalTime", "mealType"],
  //   })
  // });
  // const responseParsed = await response.json();
  // console.log(responseParsed);
}

// field
// array[string]
// (query)
// Recipe fields to be included in the response.

// Available values : uri, label, image, images, source, url, shareAs, yield, dietLabels, healthLabels, cautions, 
// ingredientLines, ingredients, calories, totalTime, mealType, dishType, 



