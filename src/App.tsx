import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import MiniDrawer from './Pages/Layout';
import Demo from './Pages/Demo/Demo';


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<MiniDrawer />}>
          <Route index element={<Home />} />
          <Route path='/demo' element={<Demo />} />
        </Route>


      </Routes>

    </BrowserRouter>
    // <div>app</div>
  );
}

export default App;
