import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Modal } from '@mui/material';
import data1 from '../../Data1.json';
import MyForm from '../AssetsRegistretion/AssetsRegistretion';

const Assets = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event:any, newPage:any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          <MyForm/>
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
              <TableCell sx={{fontWeight:'600'}} align="center">Asset Id</TableCell>
              {/* <TableCell align="center">Asset Id</TableCell> */}
              <TableCell sx={{fontWeight:'600'}} align="center">Assets Name</TableCell>
              <TableCell sx={{fontWeight:'600'}} align="center">Description</TableCell>
              <TableCell sx={{fontWeight:'600'}} align="center">Serial Number</TableCell>
              <TableCell sx={{fontWeight:'600'}} align="center">Model Number</TableCell>
              <TableCell sx={{fontWeight:'600'}} align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data1.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((v, index) => (
              <TableRow  key={index}>
                <TableCell align="center">{v.name}</TableCell>
                {/*      */}
                <TableCell align="center">{v.assets_name}</TableCell>
                <TableCell align="center">{v.department}</TableCell>
                <TableCell align="center">_</TableCell>
                <TableCell align="center">{v.modal_number}</TableCell>
                <TableCell align="center">{v.status?"Allocated":"Not-Allocated"}</TableCell>
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