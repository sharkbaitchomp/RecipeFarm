import './App.css';
import React from 'react';
import { CssBaseline, Paper, Grid, Button, TextField, Stack } from '@mui/material'

import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} onKeyDown={handleKeyPress}>
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
              <h1>Welcome to your Recipie Farm! <br/>
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
              <Button onClick={enter} color='primary' variant='contained' style={{ width: 500, fontWeight: 'bold', fontSize: 20 }}> Enter </Button>
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </div>
  )
}

function MainPage() {

  return (
    <div>
    hello
    </div>
  )
}

export default App;
