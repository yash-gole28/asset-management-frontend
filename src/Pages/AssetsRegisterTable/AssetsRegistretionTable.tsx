import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination, Paper } from '@mui/material';
import React, { useState } from 'react';
import data1 from '../../Data1.json';

const AssetsRegistrationTable = () => {
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
    <Box>
      {/* Button to register new assets */}
      <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px', mt: '2rem' }}>
        <Typography variant='h5' sx={{ color: "#6087fb" }}>Assets Registration Table....</Typography>
        <Button variant="outlined" sx={{ fontSize: '1.1rem', background: "white" }}>Register New Assets</Button>
      </Box>

      <TableContainer component={Paper} sx={{
        width: { xs: "100%", sm: "100%" },
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
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Assets Name</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right">Model Number</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data1.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((v, index) => (
              <TableRow key={index}>
                <TableCell align="left">{v.name}</TableCell>
                <TableCell align="left">{v.assets_name}</TableCell>
                <TableCell align="right">{v.department}</TableCell>
                <TableCell align="right">{v.modal_number}</TableCell>
                <TableCell align="right">{v.status ? "Allocated" : "Not Allocated"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Component */}
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
    </Box>
  );
};

export default AssetsRegistrationTable;
