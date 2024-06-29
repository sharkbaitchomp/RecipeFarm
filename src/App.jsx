import './App.css';
import React from 'react';
import { CssBaseline, Paper, Grid, Button, TextField, Stack, Box, Typography, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import { IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Menu, Edit } from '@mui/icons-material';

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

const ImageGallery = () => {
  const [images, setImages] = React.useState([]);
  const MAX_IMAGE_SIZE = 2.5 * 1024 * 1024; // 2.5 MB

  React.useEffect(() => {
    loadImages();
  }, []);

  const handleImageInput = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > MAX_IMAGE_SIZE) {
        alert('Image size exceeds 2.5 MB. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = function(e) {
        const dataUrl = e.target.result;
        addImageToGallery(dataUrl);
        saveImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const addImageToGallery = (dataUrl) => {
    setImages(prevImages => [...prevImages, dataUrl]);
  };

  const saveImage = (dataUrl) => {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    images.push(dataUrl);
    try {
      localStorage.setItem('images', JSON.stringify(images));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  };

  const loadImages = () => {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    setImages(images);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageInput} />
      <div id="gallery" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((dataUrl, index) => (
          <div key={index} className="gallery-item" style={{ margin: '10px' }}>
            <img src={dataUrl} alt={`Gallery item ${index}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

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
          <DialogTitle>My Details ʕ•́ᴥ•̀ʔっ♡</DialogTitle>
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
          <DialogTitle>My Gallery ᕙ(`▿´)ᕗ</DialogTitle>
          <DialogContent>
            <ImageGallery />
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
                <h1>{storedName}'s farm</h1>
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

export default App;
