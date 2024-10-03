import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from '@mui/material';
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
  const {getitRole} = context


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
        console.log(response.data)
        setAssets(response.data.assets)
      }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
     getitRole()
     getAssets()
    }else{
      toast('session expired')
    }
  },[open])
  return (
    <Box sx={{margin:{xs:'10px',sm:'15px',md:'15px'},backgroundColor:'#fff',p:'15px',borderRadius:'4px',boxShadow:'0 0 3px rgb(198, 200, 205)'}}>
     
      <Box sx={{ display: "flex", alignItems: 'end', justifyContent: 'space-between', marginBottom: '10px' }}>
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
        borderRadius: "4px",
        backgroundColor: "white",
        boxShadow:'0 0 3px rgb(198, 200, 205)', 
        marginBottom: "10px",
        position: "relative",
        p:'15px'
      }}>


        <Table size='small' aria-label="simple table">
          <TableHead sx={{backgroundColor:''}}>
            <TableRow >
              {/* <TableCell sx={{fontWeight:'600',textWrap:'nowrap'}} align="center">Asset Id</TableCell> */}
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
                {/* <TableCell sx={{textWrap:'nowrap'}} align="center">{v._id}</TableCell> */}
                <TableCell sx={{textWrap:'nowrap'}} align="center">{v.name}</TableCell>
                <TableCell sx={{textWrap:'nowrap'}} align="center">{v.description}</TableCell>
                <TableCell sx={{textWrap:'nowrap'}} align="center">{v.service_tag}</TableCell>
                <TableCell sx={{textWrap:'nowrap'}} align="center">{v.model_number}</TableCell>
                <TableCell sx={{textWrap:'nowrap'}} align="center">{v.allocation ? <Typography sx={{fontSize:'13px',color:'#1ed897',backgroundColor:'rgb(218, 244, 235)',width:'fit-content',margin:'auto',padding:'1px 8px',borderRadius:'5px'}}>Allocated</Typography>:<Typography sx={{fontSize:'13px',color:'rgb(255, 187, 79)',backgroundColor:'rgb(255, 241, 218)',width:'fit-content',margin:'auto',padding:'1px 8px',borderRadius:'5px'}}>Not-Allocated</Typography>}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
       
        <TablePagination
          rowsPerPageOptions={[ 10,15, 25]}
          component="div"
          count={assets.length}
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