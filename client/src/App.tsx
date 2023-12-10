import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Link,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
} from 'react-router-dom'
import './App.css';
import NavigationBar from './components/NavigationBar';
import Login from './components/Login';
import Home from './components/Home';


const App = () => {

  return (
    <div className='App'>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Login' element={<Login />}></Route>
      </Routes>
    </div>

  );
}


export default App;
