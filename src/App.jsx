import './App.css';
import React from 'react';
import { CssBaseline, Paper, Grid, Button, TextField, Stack } from '@mui/material'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <CssBaseline />
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<StartPage />}/>
              <Route path="/home" element={<StartPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

function StartPage() {
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
              <TextField style={{ width: 500 }}variant='outlined' label="Name" onChange={e => setName(e.target.value)} value={name} type={'name'}></TextField>
            </Grid>
            <Grid item xl>
              <TextField style={{ width: 500 }}variant='outlined' label="Age" onChange={e => setAge(e.target.value)} value={age} type={'age'}></TextField>
            </Grid>
            <Grid item xl>
              <Button color='primary' variant='contained' style={{ width: 500, fontWeight: 'bold', fontSize: 30 }}> Enter </Button>
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
