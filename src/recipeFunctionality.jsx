import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import React, { useState } from 'react';
import { Label, LabelImportant } from '@mui/icons-material';
import { FormControl, TextField, Button, Typography } from '@mui/material';

const appId = "92c98664";
const appKey = "38241f816e4c455f1e0dd34dfbaa3aba";

/**
 * @param {string} search // String you wanna search
 * @param {string[]} health
 * @param {number} timeMax 
 * @param {string[]} excluded 
 */
async function GetRecipes({search, timeMax, excluded, updateRecipe}) {
  let url;

  // if (search === "nuthin") {
  //   url =`https://api.edamam.com/api/recipes/v2/?q=${search}&app_id=${appId}&app_key=${appKey}&type=public&random=true`;
  // } else {
  //   url =`https://api.edamam.com/api/recipes/v2/?app_id=${appId}&app_key=${appKey}&type=public&random=true`;
  // }

  // if (timeMax !== "nuthin") {
  //   url += `&time=${timeMax}`;
  // }
  // if (excluded != "nuthin") {
  //   for (const item of excluded.split(" ")) {
  //     url += `&excluded=${item}`;
  //   }
  // }
  
  // const response = await fetch(url);
  // const data = await response.json();

  // const list = data.hits.map(resipee => resipee.recipe);
  return (
    <ImageList sx={{ width: 500, height: 450 }}>
       <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Recipes</ListSubheader>
      </ImageListItem>
       {list.map((recipe) => (
        <ImageListItem key={recipe.images.REGULAR.url} onClick={() => updateRecipe(recipe.uri)} >
          <img
            srcSet={`${recipe.images.REGULAR.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${recipe.images.REGULAR.url}?w=248&fit=crop&auto=format`}
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
  const [isSubmitted, submit] = useState(false);
  const [search, setSearch] = useState("");
  const [time, setTime] = useState("");
  const [excluded, setExcluded] = useState("")


  const handleSubmit = () => {
    if (search.length === 0) {
      console.log("bruh");
      setSearch("nuthin");
    }

    if (time.length === 0) {
      setTime("nuthin");
    }

    if (excluded.length === 0) {
      setExcluded("nuthin");
    }
    console.log(search);
    submit(true);
  }
  const styleContainer = {
    display: "flex",
    flexDirection: "column",
    gap: 10
  }

  return (
    <div>
      {
        isSubmitted ? <GetRecipes search={search} timeMax={time} excluded={excluded} updateRecipe={updateRecipe} /> : 
        <FormControl style={styleContainer}>
          <Typography variant="h4" >Find a yummy HEALTHY recipe</Typography>
          <TextField placeholder="e.g. Chicken, Beef etc." 
          label="Search" 
          onChange={e => setSearch(e.target.value)} 
          value={search}/>
          <TextField placeholder="e.g. 2" 
          label="Max Time to cook, in minutes" 
          onChange={e => setTime(e.target.value)} 
          value={time}/>
          <TextField label="Ingredients to exclude from recipe" 
          placeholder="e.g. anything you can't eat put here (separated by spaces)" 
          onChange={e => setExcluded(e.target.value)} 
          value={excluded}/>
          <Button variant="outlined" color="secondary" type="submit" onClick={handleSubmit}>Submit</Button>
        </FormControl> 
      }
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
