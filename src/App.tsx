import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import MiniDrawer from './Components/Layout';
import Demo from './Pages/Demo/Demo';
<<<<<<< Updated upstream
import Login from './Pages/Login/Login';
=======
import Register from './Pages/Register/Register';
>>>>>>> Stashed changes


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<MiniDrawer />}>
          <Route index element={<Home />} />
          <Route path='/demo' element={<Demo />} />
        </Route>
<<<<<<< Updated upstream
        <Route path='/login' element={<Login/>}/>
=======
        <Route path='/register' element={<Register/>} />
>>>>>>> Stashed changes


      </Routes>

    </BrowserRouter>
    // <div>app</div>
  );
}

export default App;
