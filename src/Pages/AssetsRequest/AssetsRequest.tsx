import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import data from '../../Data.json';


const AssetsRequest = () => {
  return (
    <Box sx={{ width: '95%',margin:'auto'}}>
      {/* Button to register new assets */}
      <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'flex-end', marginBottom: '10px',mt:'2rem' }}>
        <Button variant="outlined">Register New Assets</Button>
      </Box>
  
   
    
    
      <TableContainer sx={{
        width: { xs: "100%", sm: "100%", }, 
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: 2, 
        marginBottom: "20px",
        position: "relative",
      }}>
        <Typography sx={{ margin: "10px", fontWeight: 'bold', fontSize: '1.2rem' }}>Asset Requests</Typography>

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
            {data.map((v, index) => (
              <TableRow key={index}>
                <TableCell align="left">{v.name}</TableCell>
                <TableCell align="left">{v.assets_name}</TableCell>
                <TableCell align="right">{v.department}</TableCell>
                <TableCell align="right">{v.modal_number}</TableCell>
                <TableCell align="right">{v.approved == 'pending' ? <Box> <Button>approve</Button> <Button>reject</Button> </Box> : v.approved}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

    
        <Button variant='contained' sx={{
          position: "absolute",
          top: "10px",
          right: "20px",
          textDecoration: "none",
          color: "white",
          width: "130px"
        }}>
          Action
        </Button>
      </TableContainer>
     
      {/* Table Container */}
    </Box>
  );
};

export default AssetsRequest;
