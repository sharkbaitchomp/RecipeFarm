import './App.css';
import React from 'react';
import { CssBaseline, Paper, Grid, Button, TextField, Stack, Box, Typography, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Menu } from '@mui/icons-material';

// let items = [wheat, chicken, rice, cow, corn, pig, carrot, sheep, lettuce, duck, tomato];

function App() {
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  

  const setNameAbstract = (name) => {
    setName(name);
    localStorage.setItem('name', name);
  };

  const setAgeAbstract = (age) => {
    setAge(age);
    localStorage.setItem('age', age);
  };

  return (
    <div>
      <CssBaseline />
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<StartPage name={name} setNameAbstract={setNameAbstract} age={age} setAgeAbstract={setAgeAbstract} />}/>
              <Route path="/home" element={<StartPage name={name} setNameAbstract={setNameAbstract} age={age} setAgeAbstract={setAgeAbstract} />}/>
              <Route path="/main" element={<MainPage />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

function StartPage({ name, setNameAbstract, age, setAgeAbstract }) {
  setNameAbstract(name);
  setAgeAbstract(age);
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      enter();
    }
  };

  const enter = () => {
    if (localStorage.getItem('name') === '' || localStorage.getItem('age') === '') {
      alert('Please fill in all the forms');
    } else {
      navigate('/main');
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor:'pink' }} onKeyDown={handleKeyPress}>
      <Stack spacing={2}>
        <Paper elevation={5} style={{ padding: 30, width: 600 }}>
          <Grid
            container
            spacing={3}
            direction={'column'}
            justify={'center'}
            alignItems={'center'}
            textAlign={'center'}
          >
            <Grid item xl>
              <h1>⋅˚₊‧ ୨𝓯𝓻𝓮𝓪𝓴𝔂୧ ‧₊˚ ⋅</h1>
              <h1>Welcome to your Recipe Farm! <br/>
              Start farming today!</h1>
            </Grid>
            <Grid item xl>
              <TextField 
              style={{ width: 500 }}variant='outlined' label="Name" onChange={e => setNameAbstract(e.target.value)} value={name} type={'name'}></TextField>
            </Grid>
            <Grid item xl>
              <TextField style={{ width: 500 }}variant='outlined' label="Age" onChange={e => setAgeAbstract(e.target.value)} value={age} type={'age'}></TextField>
            </Grid>
            <Grid item xl>
              <Button onClick={enter} color='primary' variant='contained' style={{ width: 500, fontWeight: 'bold', fontSize: 20, backgroundColor:'pink' }}> Enter </Button>
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </div>
  )
}

function SidebarMenu({ open, onClose }) {
  const [renderDrawer, setRenderDrawer] = React.useState(open);
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const [storedName, setStoredName] = React.useState('');
  const [storedAge, setStoredAge] = React.useState('');

  const [galleryModalOpen, setGalleryModalOpen] = React.useState(false);

  React.useEffect(() => {
    setStoredName(localStorage.getItem('name') || '');
  }, []);

  React.useEffect(() => {
    setStoredAge(localStorage.getItem('age') || '');
  }, []);

  const handleGalleryModalOpen = () => {
    setGalleryModalOpen(true);
  };

  const handleGalleryModalClose = () => {
    setGalleryModalOpen(false);
  };

  React.useEffect(() => {
    if (open) {
      setRenderDrawer(true);
    } else {

      setRenderDrawer(false);
    }
  }, [open]);
  

  return renderDrawer ? (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: open ? 0 : '-250px',
        height: '100%',
        width: '250px',
        backgroundColor: '#ffffff',
        boxShadow: 3,
        zIndex: 1200,
        display: open ? 'block' : 'none',
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6">Menu ☜(ˆ▿ˆc)</Typography>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 8 }}>
          <Menu />
        </IconButton>
      </Box>
      <List>
        <ListItem>
          <ListItemText primary="How to farm:" />
          
        </ListItem>
        <ListItem>
          <ListItemText primary="1. Select a recipe" />
        </ListItem>

        <ListItem>
          <ListItemText primary="2. Follow recipe to make food" />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Take a pic of food" />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Upload the pic into My Gallery (Image has to be 2.5mb or less)" />
        </ListItem> 
        <ListItem>
          <ListItemText primary="5. Grow ur farm! :D" />
        </ListItem>          
        
        <Divider/>
        <ListItem onClick={handleModalOpen}>
          <ListItemText primary="My Details ʕ•́ᴥ•̀ʔっ♡" />
        </ListItem>

        <Dialog open={modalOpen} onClose={handleModalClose}>
          <DialogTitle>Details</DialogTitle>
          <DialogContent>
            <p>Name: {storedName}</p>
            <p>Age: {storedAge}</p>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Divider/>
        <ListItem onClick={handleGalleryModalOpen}>
          <ListItemText primary="My Gallery ᕙ(`▿´)ᕗ" />
        </ListItem>

        <Dialog open={galleryModalOpen} onClose={handleGalleryModalClose}>
          <DialogTitle>Gallery</DialogTitle>
          <DialogContent>
            <p>Gallery content goes here...</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleGalleryModalClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
          
      </List>
    </Box>
  ) : null;
}

function MainPage() {
  const [storedName, setStoredName] = React.useState('');
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    setStoredName(localStorage.getItem('name') || '');
  }, []);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor:'pink' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Stack spacing={2}>
          <Paper elevation={5} style={{ padding: '30px', width: '1000px', height: '600px', position: 'relative' }}>
            <Grid
              container
              spacing={3}
              direction="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              style={{ height: '100%' }}
            >
              <Grid item xs={12}>
                <h1>{storedName} farm</h1>
              </Grid>
              <Grid item xs={12} style={{ position: 'absolute', top: 16, left: 16 }}>
                <IconButton onClick={handleDrawerOpen} style={{ fontSize: 'large', color: 'black' }}>
                  <Menu />
                </IconButton>
              </Grid>
            </Grid>
            <SidebarMenu open={drawerOpen} onClose={handleDrawerClose} />
          </Paper>
        </Stack>
      </div>
    </div>
  );
}

function getItem() {

  // Code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function getRandomIntInclusive(min, max) { 
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }


  let numItems = localStorage.getItem('numItems')

  const number = getRandomIntInclusive(0, numItems - 1);
  const item = items.splice(number, 1); 

  localStorage.setItem('numItems', numItems - 1);
  console.log(numItems, item);

}

export default App;
