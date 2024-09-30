import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import MiniDrawer from './Components/Layout';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import AssetsRegistretion from './Pages/AssetsRegistretion/AssetsRegistretion';
import AssetsMaintenance from './Pages/AssetsMaintenace/AssetsMaintenance';
import AssetsRequest from './Pages/AssetsRequest/AssetsRequest';
import { Box } from '@mui/material';
import Assets from './Pages/Assets/Assets';
import Profile from './Pages/Profile/Profile';
import PageNotFound from './Pages/pageNotFound/PageNotFound';
import AddCategory from './Components/AddCategory';
import CategoryTable from './Pages/Category/CategoryTable';



function App() {
  return (
    <Box sx={{ fontFamily: '-apple-system' }}>
      <Routes>
        <Route path="/" element={<MiniDrawer />}>
          <Route index element={<Home />} />
          {/* <Route path='/assets-register' element={<AssetsRegistretion />} /> */}
          <Route path='/maintenance' element={<AssetsMaintenance />} />
          <Route path='/assets-request' element={<AssetsRequest />} />
          <Route path='/assets' element={<Assets />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/category" element={<AddCategory />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="category-table" element={<CategoryTable/>}/>


      </Routes>
    </Box>
  );
}

export default App;
