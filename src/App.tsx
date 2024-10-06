import React from 'react';
import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import MiniDrawer from './Components/Layout';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register'
import AssetsMaintenance from './Pages/AssetsMaintenace/AssetsMaintenance';
import AssetsRequest from './Pages/AssetsRequest/AssetsRequest';
import { Box } from '@mui/material';
import Assets from './Pages/Assets/Assets';
import Profile from './Pages/Profile/Profile';
import PageNotFound from './Pages/pageNotFound/PageNotFound';
import CategoryTable from './Pages/Category/CategoryTable';



function App() {
  return (
    <Box sx={{ fontFamily: 'Poppins' ,backgroundColor:'rgb(242, 244, 247)'}}>
      <Routes>
        <Route path="/" element={<MiniDrawer />}>
          <Route index element={<Home />} />
          <Route path='/maintenance' element={<AssetsMaintenance />} />
          <Route path='/asset-requests' element={<AssetsRequest />} />
          <Route path='/assets' element={<Assets />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/register' element={<Register />} />
          <Route path="/category" element={<CategoryTable />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<PageNotFound />} />


      </Routes>
    </Box>
  );
}

export default App;
