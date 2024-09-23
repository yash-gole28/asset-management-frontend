import React, { useState } from 'react'
import KPIs from '../../Components/KPIs'
import data from './../../Data.json'
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';

const Home = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(13);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value,10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <KPIs />
      <Box sx={{ width: '95%', margin: 'auto' }}>
        <Typography sx={{ margin: "10px 0px", fontWeight: 'bold', fontSize: '1.2rem' }}>Categories wise assets Data...</Typography>
        <TableContainer sx={{
          width: { xs: "100%", sm: "100%", },
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: 2,
          marginBottom: "20px",
          position: "relative",
        }}>


          <Table sx={{ width: '100%' }} aria-label="simple table" size='small'>
            <TableHead sx={{ backgroundColor: 'rgb(177, 191, 238)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: '600' }} align="center">Category</TableCell>
                <TableCell sx={{ fontWeight: '600' }} align="center">Total Assets Count</TableCell>
                <TableCell sx={{ fontWeight: '600' }} align="center">Allocated Assets</TableCell>
                <TableCell sx={{ fontWeight: '600' }} align="center">Assets under Maintenance</TableCell>
                <TableCell sx={{ fontWeight: '600' }} align="center">Non Allocated Assets</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data.CategoryData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((v, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{v.category}</TableCell>
                  <TableCell align="center">{v.count}</TableCell>
                  <TableCell align="center">{v.allocated}</TableCell>
                  <TableCell align="center">{v.underMaintenance}</TableCell>
                  <TableCell align="center">{Number(v.count) - (Number(v.allocated) + Number(v.underMaintenance))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 15, 20]}
            component="div"
            count={data.requestData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

      </Box>
    </Box>
  )
}

export default Home