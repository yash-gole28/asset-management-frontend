import React from 'react'
import KPIs from '../../Components/KPIs'
import data from './../../Data.json'
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const Home = () => {


  return (
    <>
      <KPIs />
      <Box>
        <Box sx={{ width: '95%', margin: 'auto' }}>
          {/* Button to register new assets */}
          {/* <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'flex-end', marginBottom: '10px', mt: '2rem' }}>
            <Button variant="outlined">Register New Assets</Button>
          </Box> */}




          <TableContainer sx={{
            width: { xs: "100%", sm: "100%", },
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: 2,
            marginBottom: "20px",
            position: "relative",
          }}>
            <Typography sx={{ margin: "10px", fontWeight: 'bold', fontSize: '1.2rem' }}>Asset Requests</Typography>

            <Table sx={{ width: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Total Assets Count</TableCell>
                  <TableCell align="center">Allocated Assets</TableCell>
                  <TableCell align="center">Assets under Maintenance</TableCell>
                  <TableCell align="center">Non Allocated Assets</TableCell>
                  {/* <TableCell align="right">Status</TableCell> */}
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
                    {/* <TableCell align="right">{v.approved == 'pending' ? <Box> <Button>approve</Button> <Button>reject</Button> </Box> : v.approved}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>


            
          </TableContainer>

          {/* Table Container */}
        </Box>
      </Box>
    </>
  )
}

export default Home