import React from 'react'
import KPIs from '../../Components/KPIs'
import data from './../../Data.json'
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const Home = () => {


  return (
    <Box sx={{width:'100%'}}>
      <KPIs />
        <Box sx={{ width: '95%', margin: 'auto' }}>

          <TableContainer sx={{
            width: { xs: "100%", sm: "100%", },
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: 2,
            marginBottom: "20px",
            position: "relative",
          }}>
            <Typography sx={{ margin: "10px", fontWeight: 'bold', fontSize: '1.2rem' }}>Categories wise assets Data</Typography>

            <Table sx={{ width: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Total Assets Count</TableCell>
                  <TableCell align="center">Allocated Assets</TableCell>
                  <TableCell align="center">Assets under Maintenance</TableCell>
                  <TableCell align="center">Non Allocated Assets</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {data.CategoryData.map((v, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{v.category}</TableCell>
                    <TableCell align="center">{v.count}</TableCell>
                    <TableCell align="center">{v.allocated}</TableCell>
                    <TableCell align="center">{v.underMaintenance}</TableCell>
                    <TableCell align="center">{Number(v.count)-(Number(v.allocated) + Number(v.underMaintenance))}</TableCell>
                                 </TableRow>
                ))}
              </TableBody>
            </Table>


            
          </TableContainer>

        </Box>
    </Box>
  )
}

export default Home