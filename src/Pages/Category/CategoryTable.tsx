


import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Grid,
  TablePagination,
} from '@mui/material';
import { apiList } from '../../apiList';
import { API } from '../../network';

const CategoryTable = () => {
  const [categories, setCategories] = useState([]); // Initialize as an array
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = apiList.getAllCategory;
        const response = await API.get(url);
        console.log(response);

        setCategories(response.data.category); // Assuming the data is in response.data
      } catch (error) {
        console.log("Data not fetched", error);
      }
    };

    fetchCategories(); // Call the async function
  }, []); // Empty dependency array to run once on mount

  const handleAddCategory = () => {
    // Logic to add a new category
    console.log("Add Category button clicked");
  };

  const handleChangePage = (event:any, newPage:any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // Calculate the displayed categories based on current page and rows per page
  const displayedCategories = categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" style={{ padding: '16px' }}>
        Category List
      </Typography>
      <Grid container spacing={2} style={{ padding: '16px' }}>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleAddCategory}>
            Add Category
          </Button>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            {/* <TableCell>Description</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedCategories.map((category:any) => (
            <TableRow key={category._id}>
              <TableCell>{category._id}</TableCell>
              <TableCell>{category.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default CategoryTable;
