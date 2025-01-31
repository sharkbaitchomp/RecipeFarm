import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import React, { useState, useEffect } from 'react';
import { FormControl, TextField, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';


const appId = "92c98664";
const appKey = "38241f816e4c455f1e0dd34dfbaa3aba";

/**
 * @param {string} search // String you wanna search
 * @param {string[]} health
 * @param {number} timeMax 
 * @param {string[]} excluded 
 */
const GetRecipes = ({ search, timeMax, excluded, updateRecipe }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let url;
      if (search !== "nuthin") {
        url = `https://api.edamam.com/api/recipes/v2/?q=${search}&app_id=${appId}&app_key=${appKey}&type=public&random=true`;
      } else {
        url = `https://api.edamam.com/api/recipes/v2/?app_id=${appId}&app_key=${appKey}&type=public&random=true`;
      }

      if (timeMax !== "nuthin") {
        url += `&time=${timeMax}`;
      }
      if (excluded !== "nuthin") {
        for (const item of excluded.split(" ")) {
          url += `&excluded=${item}`;
        }
      }

      try {
        const res = await axios.get(url);
        const data = res.data;
        console.log(data.hits.map(resipee => resipee.recipe)[0].images.REGULAR.url);
        setRecipes(data.hits.map(resipee => resipee.recipe));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search, timeMax, excluded]);

  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Recipes</ListSubheader>
      </ImageListItem>
      {recipes.map((recipe) => (
        <ImageListItem key={recipe.uri} onClick={() => updateRecipe(recipe.uri)}>
          <img
            src={`${recipe.images.REGULAR.url}?w=248&fit=crop&auto=format`}
            alt={recipe.label}
            loading="lazy"
          />
          <ImageListItemBar title={recipe.label} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

GetRecipes.propTypes = {
  search: PropTypes.string.isRequired,
  timeMax: PropTypes.string.isRequired,
  excluded: PropTypes.string.isRequired,
  updateRecipe: PropTypes.func.isRequired,
};

const ViewRecipe = ({ uri }) => {
  return (
    <div>Viewing the recipe: {uri}</div>
  );
};

ViewRecipe.propTypes = {
  uri: PropTypes.string.isRequired,
};

const FindRecipeForm = ({ updateRecipe }) => {
  const [isSubmitted, submit] = useState(false);
  const [search, setSearch] = useState("");
  const [time, setTime] = useState("");
  const [excluded, setExcluded] = useState("");

  const handleSubmit = () => {
    if (search === "") setSearch("nuthin");
    if (time === "") setTime("nuthin");
    if (excluded === "") setExcluded("nuthin");
    submit(true);
  };

  const styleContainer = {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  };

  return (
    <div>
      {isSubmitted ? (
        <GetRecipes search={search} timeMax={time} excluded={excluded} updateRecipe={updateRecipe} />
      ) : (
        <FormControl style={styleContainer}>
          <Typography variant="h4">Find a yummy HEALTHY recipe</Typography>
          <TextField
            placeholder="e.g. Chicken, Beef etc."
            label="Search"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
          <TextField
            placeholder="e.g. 2"
            label="Max Time to cook, in minutes"
            onChange={e => setTime(e.target.value)}
            value={time}
          />
          <TextField
            label="Ingredients to exclude from recipe"
            placeholder="e.g. anything you can't eat put here (separated by spaces)"
            onChange={e => setExcluded(e.target.value)}
            value={excluded}
          />
          <Button variant="outlined" color="secondary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </FormControl>
      )}
    </div>
  );
};

FindRecipeForm.propTypes = {
  updateRecipe: PropTypes.func.isRequired,
};

export default function RecipePage() {
  const [recipe, setRecipe] = useState(null);
  const [isRecipeThere, setIsRecipeThere] = useState(false);

  const updateRecipe = (recipeURI) => {
    setRecipe(recipeURI);
    setIsRecipeThere(true);
  };

  const style = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <div style={style}>
      {isRecipeThere ? <ViewRecipe uri={recipe} /> : <FindRecipeForm updateRecipe={updateRecipe} />}
    </div>
  );
}