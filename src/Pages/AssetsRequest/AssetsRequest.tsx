import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import data from '../../Data.json';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';


const AssetsRequest = () => {
  const router = useNavigate()
  return (
    <Box sx={{ width: '95%',margin:'auto'}}>
      {/* Button to register new assets */}
      <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'flex-end', marginBottom: '10px',mt:'2rem' }}>
        <Button onClick={()=>router('/assets-register')} variant="outlined">Register New Assets</Button>
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

        <Table sx={{width:'100%' }} size='small' aria-label="simple table">
          <TableHead sx={{fontWeight:'500'}}>
            <TableRow>
              <TableCell align="left">Employee Name</TableCell>
              <TableCell align="left">Assets Name</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right">Model Number</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.requestData.map((v, index) => (
              <TableRow key={index}>
                <TableCell align="left">{v.name}</TableCell>
                <TableCell align="left">{v.assets_name}</TableCell>
                <TableCell align="right">{v.department}</TableCell>
                <TableCell align="right">{v.modal_number}</TableCell>
                <TableCell align="right">{v.approved === 'pending' ? <Box> <Button><DoneIcon sx={{color:'green',fontSize:'15px'}}/> </Button>  <Button><CloseIcon sx={{color:'red',fontSize:'15px'}}/></Button> </Box> : v.approved}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

    
      </TableContainer>
     
      {/* Table Container */}
    </Box>
  );
};

export default AssetsRequest;
