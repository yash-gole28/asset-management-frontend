import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import MiniDrawer from './Components/Layout';
import Demo from './Pages/Demo/Demo';
import Login from './Pages/Login/Login';


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<MiniDrawer />}>
          <Route index element={<Home />} />
          <Route path='/demo' element={<Demo />} />
        </Route>
        <Route path='/login' element={<Login/>}/>


      </Routes>

    </BrowserRouter>
    // <div>app</div>
  );
}

export default App;
