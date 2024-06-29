import './App.css';
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Link, CssBaseline, Button, Drawer } from '@mui/material';
import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  
  const go = (where) => {
    navigate(where);
  };

  const styleNav = {
    height:'100vh', 
    "zIndex": 100, 
    "backgroundColor":"#eee", 
    width: '100px',
    position: 'fixed',
    right: 0,
  }

  return (
    <div className="navbar" style={styleNav}>
      <Toolbar style={{flexDirection: 'column'}}>
        <Button variant="outlined" color="primary" onClick={() => go('/home')}>
          Home
        </Button>
      </Toolbar>
    </div>
  )
}


function Footer() {
  const styleFooter = {
    height: "50px",
    position:"fixed",
    bottom: 0,
    width: "100vw",
    backgroundColor: "#999",
  }
  return(
    <div style={styleFooter}>

    </div>
  )
}

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

  const styleContent = {
    height: "calc(100vh - 50px)",
    width: "calc(100vw - 100px)",
    position: "fixed",
    top: 0,
    left: 0,
    margin: "auto",
    padding: "auto",
  }

  const styleItems = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }

  return (
    <div>
    <Navbar />
      <div style={styleContent}>
        <div style={styleItems}>
          <Typography style={{color:"blue", size: "2em"}}>
            {getRecipes("chicken", [], [], 50, [])}
            <br></br>
          </Typography>
        </div>
      </div>
    <Footer />
    </div>
  )
}

export default App;
