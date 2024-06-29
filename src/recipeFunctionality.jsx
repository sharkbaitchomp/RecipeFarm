import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import React, { useState } from 'react';
import { Label } from '@mui/icons-material';
import { FormControl, TextField } from '@mui/material';

const appId = "92c98664";
const appKey = "38241f816e4c455f1e0dd34dfbaa3aba";

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
async function getRecipes(search, timeMax, excluded) {
  
  let url =`https://api.edamam.com/api/recipes/v2/?q=${search}&app_id=${appId}&app_key=${appKey}&type=public&random=true`;

  url += `&time=${timeMax}`;

  for (const item of excluded.split(" ")) {
    url += `&excluded=${item}`;
  }
  
  const response = await fetch(url);
  const data = await response.json();

  const list = data.hits.map(resipee => resipee.recipe);

  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Recipes</ListSubheader>
      </ImageListItem>
      {list.map((recipe) => (
        <ImageListItem key={recipe.images.REGULAR}>
          <img
            srcSet={`${recipe.images.REGULAR}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${recipe.images.REGULAR}?w=248&fit=crop&auto=format`}
            alt={recipe.name}
            loading="lazy"
          />
          <ImageListItemBar title={recipe.name} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

function ViewRecipe({uri}) {

  return (
    <div>viewing da reesipee</div>
  )
}

// {search, health, timeMax, excluded}

function FindRecipeForm({updateRecipe}) {

  
  return (
    <div>
      <FormControl defaultValue="" required>
        <TextField placeholder="e.g. Chicken, Beef etc." label="Search"/>
        <TextField placeholder="e.g. 2" label="Max Time to cook, in minutes"/>
        <TextField label="Ingredients to exclude from recipe" placeholder="e.g. anything you're allergic to or can't eat, put here (separated by spaces)" />
      </FormControl>
    </div>
  )
}

export default function RecipePage() {
  const [recipe, setRecipe] = useState(null);
  const [isRecipeThere, setIsRecipeThere] = useState(false);

  const updateRecipe = (recipeURI) => {
    setRecipe(recipeURI);
    setIsRecipeThere(true);
  }

  const style = {
    display: "flex",
    alignItems: "center"
  }

  return (
    <div style={style}>
      {isRecipeThere ? <ViewRecipe uri={recipe}/> : <FindRecipeForm updateRecipe={updateRecipe}/>}
    </div>
  )
}
