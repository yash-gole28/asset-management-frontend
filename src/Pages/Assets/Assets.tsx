import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import data1 from '../../Data1.json';

const Assets = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
        <Typography variant='h5' >Assets....</Typography>
        <Button variant="outlined" size='small' sx={{fontSize:'1.1rem',color:'white', background:"rgb(108,117,125)"}}> Add Asset</Button>
      </Box>
  
   
    
    
      <TableContainer sx={{
        width: { xs: "100%", sm: "100%", }, 
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: 2, 
        marginBottom: "10px",
        position: "relative",
      }}>
        {/* <Typography sx={{ margin: "10px", fontWeight: 'bold', fontSize: '1.2rem' }}>Assets</Typography> */}

        <Table sx={{width:'100%' }} size='small' aria-label="simple table">
          <TableHead sx={{backgroundColor:'rgb(177, 191, 238)'}}>
            <TableRow >
              <TableCell sx={{fontWeight:'600'}} align="center">Asset Id</TableCell>
              {/* <TableCell align="center">Asset Id</TableCell> */}
              <TableCell sx={{fontWeight:'600'}} align="center">Assets Name</TableCell>
              <TableCell sx={{fontWeight:'600'}} align="center">Department</TableCell>
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