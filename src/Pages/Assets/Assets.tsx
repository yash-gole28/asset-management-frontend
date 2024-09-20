import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import data1 from '../../Data1.json';

const Assets = () => {
  return (
    <Box sx={{ width: '95%',margin:'auto'}}>
      {/* Button to register new assets */}
      <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px',mt:'2rem' }}>
        <Typography variant='h5' sx={{color:"#6087fb"}} >Assets</Typography>
        <Button variant="outlined" sx={{fontSize:'1.1rem', background:"white"}}>Register New Assets</Button>
      </Box>
  
   
    
    
      <TableContainer sx={{
        width: { xs: "100%", sm: "100%", }, 
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: 2, 
        marginBottom: "20px",
        position: "relative",
      }}>
        <Typography sx={{ margin: "10px", fontWeight: 'bold', fontSize: '1.2rem' }}>Assets</Typography>

        <Table sx={{width:'100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Assets Name</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right">Model Number</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data1.map((v, index) => (
              <TableRow key={index}>
                <TableCell align="left">{v.name}</TableCell>
                <TableCell align="left">{v.assets_name}</TableCell>
                <TableCell align="right">{v.department}</TableCell>
                <TableCell align="right">{v.modal_number}</TableCell>
                <TableCell align="right">{v.status?"allocated":"not-allocated"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

    
        
      </TableContainer>
     
      {/* Table Container */}
    </Box>
  )
}

export default Assets