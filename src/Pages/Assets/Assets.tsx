import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import data1 from '../../Data1.json';
import MyForm from '../AssetsRegistretion/AssetsRegistretion';
import { apiList } from '../../apiList';
import { API } from '../../network';
import toast from 'react-hot-toast';
import { MyContext } from '../../Context/AuthContext';

const Assets = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [assets , setAssets] = useState<any[]>([])
  const context = useContext(MyContext)

  
  if (!context) {
    throw new Error('Assets component must be used within a MyProvider');
  }
  const {getCurrentUser} = context


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event:any, newPage:any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getAssets = async () => {
    try{
      const url = apiList.getAssets
      const response = await API.get(url)
      if(response.data.success){
        setAssets(response.data.assets)
        console.log(response.data)
      }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      getCurrentUser()
     getAssets()
    }else{
      toast('session expired')
    }
  },[open])
  return (
    <Box sx={{ width: '95%',margin:'auto'}}>
      {/* Button to register new assets */}
      <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px',marginTop:'10px' }}>
        <Typography variant='h5' >Assets</Typography>
        <Button onClick={handleOpen} variant="outlined" size='small' sx={{ fontSize:{xs:'12px',sm:'12px',md:'14px'}, color: 'white', background: "rgb(108,117,125)",textTransform:'capitalize' }}> Add Asset</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%', md: 500 },
          }}>
          <MyForm popValue={setOpen} pop={open}/>
          </Box>
        </Modal>
      </Box>
  
   
    
    
      <TableContainer sx={{
        width: { xs: "100%", sm: "100%", }, 
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: 2, 
        marginBottom: "10px",
        position: "relative",
      }}>


        <Table sx={{width:'100%' }} size='small' aria-label="simple table">
          <TableHead sx={{backgroundColor:'rgb(177, 191, 238)'}}>
            <TableRow >
              <TableCell sx={{fontWeight:'600',textWrap:'nowrap'}} align="center">Asset Id</TableCell>
              <TableCell sx={{fontWeight:'600',textWrap:'nowrap'}} align="center">Assets Name</TableCell>
              <TableCell sx={{fontWeight:'600',textWrap:'nowrap'}} align="center">Description</TableCell>
              <TableCell sx={{fontWeight:'600',textWrap:'nowrap'}} align="center">Serial Number</TableCell>
              <TableCell sx={{fontWeight:'600',textWrap:'nowrap'}} align="center">Model Number</TableCell>
              <TableCell sx={{fontWeight:'600',textWrap:'nowrap'}} align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((v, index) => (
              <TableRow  key={index}>
                <TableCell sx={{textWrap:'nowrap'}} align="center">{v._id}</TableCell>
                <TableCell sx={{textWrap:'nowrap'}} align="center">{v.name}</TableCell>
                <TableCell sx={{textWrap:'nowrap'}} align="center">{v.description}</TableCell>
                <TableCell sx={{textWrap:'nowrap'}} align="center">{v.service_tag}</TableCell>
                <TableCell sx={{textWrap:'nowrap'}} align="center">{v.model_number}</TableCell>
                <TableCell sx={{textWrap:'nowrap'}} align="center">{v.status?"Allocated":"Not-Allocated"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[ 10,15, 25]}
          component="div"
          count={data1.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> 

    
        
      </TableContainer>
     
      {/* Table Container */}
    </Box>
  )
}

export default Assets