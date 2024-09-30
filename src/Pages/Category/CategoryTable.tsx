




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
import AddCategory from '../../Components/AddCategory';

const CategoryTable = () => {
  const [categories, setCategories] = useState([]); // Initialize as an array
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
  const [totalCount, setTotalCount] = useState(0); // Total number of categories

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = `${apiList.getAllCategory}?page=${page + 1}&limit=${rowsPerPage}`; // Adjust for API
        const response = await API.get(url);
        console.log(response);

        setCategories(response.data.categories); // Assuming the data is in response.data
        setTotalCount(response.data.total); // Get total categories count
      } catch (error) {
        console.log("Data not fetched", error);
      }
    };

    fetchCategories(); // Call the async function
  }, [page, rowsPerPage]); // Add dependencies

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

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" style={{ padding: '16px' }}>
        Category List
      </Typography>
      <Grid container spacing={2} style={{ padding: '16px' }}>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <AddCategory/>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.map((category:any) => (
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
        count={totalCount} // Total count from response
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default CategoryTable;

