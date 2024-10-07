import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  TablePagination,
  CircularProgress,
  Box,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { apiList } from '../../apiList';
import { API } from '../../network';
import AddCategory from '../../Components/AddCategory';

interface Category {
  _id: string;
  category: string;
  createdAt: string;
  active: boolean;
  createdBy: {
    firstName: string;
    lastName: string;
  };
}

const CategoryTable = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleConfirm = () => {
    if (pendingId) {
      changeActive(pendingId);
    }
    setDialogOpen(false);
    setPendingId(null);
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setPendingId(null);
  };

  const handleSwitchChange = (id: string) => {
    setPendingId(id);
    setDialogOpen(true);
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `${apiList.getAllCategory}?page=${page + 1}&limit=${rowsPerPage}`;
      const response = await API.get(url);
      if (response.data.success) {
        setCategories(response.data.categories);
        setTotalCount(response.data.total);
      } else {
        setError("Failed to fetch categories.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Error fetching categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const changeActive = async (id: string) => {
    setLoading(true);
    try {
      const url = apiList.changeActiveCategory;
      const response = await API.put(url, { id });
      if (response?.data.success) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error changing active status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: '15px' }}>
      <TableContainer
        component={Paper}
        sx={{
          // position: 'relative',
          borderRadius: "4px",
          backgroundColor: "white",
          boxShadow: '0 0 3px rgb(198, 200, 205)',
        }}
      >
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
          
        <Grid container spacing={2} sx={{ padding: '15px' }}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
            <Typography sx={{fontWeight:'600',color:'#495057'}}>Categories</Typography>
            <AddCategory />
          </Grid>
        </Grid>

        {error && (
          <Typography variant="body1" color="error" sx={{ padding: '16px', textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        <Box sx={{
         borderRadius: '5px', boxShadow: '0 0 3px rgb(198, 200, 205)',
          margin: '0px 15px', padding: '0px 15px', overflow: 'auto'
        }}>
          <Table size='small' aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#495057' }} align="left">Sr. No</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#495057' }} align="left">Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#495057' }} align="left">Created At</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#495057' }} align="left">Active</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#495057' }} align="left">Created By</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#495057' }} align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={category._id}>
                  <TableCell align="left">{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell align="left">{category.category}</TableCell>
                  <TableCell align="left">{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="left">
                    {category.active ? (
                      <Typography sx={{ fontSize: '13px', backgroundColor: 'rgb(218, 244, 235)', color: 'rgb(26, 204, 141)', width: 'fit-content', padding: '1px 10px', borderRadius: '5px' }}>Yes</Typography>
                    ) : (
                      <Typography sx={{ fontSize: '13px', backgroundColor: 'rgb(253, 228, 228)', color: 'rgb(247, 106, 106)', width: 'fit-content', padding: '1px 10px', borderRadius: '5px' }}>No</Typography>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {category.createdBy.firstName} {category.createdBy.lastName}
                  </TableCell>
                  <TableCell align="left">
                    <Switch
                      size='small'
                      checked={category.active}
                      onChange={() => handleSwitchChange(category._id)}
                      inputProps={{ 'aria-label': 'ant design' }}
                      sx={{
                        '&.MuiSwitch-root': {
                          width: '35px',
                          height: '20px',
                          padding: 0,
                          borderRadius: 26 / 2,
                        },
                        '& .MuiSwitch-thumb': {
                          width: "11px",
                          height: "11px",
                          backgroundColor: category.active ? '#4caf50' : '#f44336',
                        },
                        '& .MuiSwitch-track': {
                          backgroundColor: category.active ? '#a5d6a7' : '#ef9a9a',
                        },
                        '&.Mui-checked': {
                          transform: 'translateX(18px)',
                        },
                      }}
                    />
                    <Dialog open={dialogOpen} onClose={handleCancel} PaperProps={{
                      sx: {
                        backgroundColor: 'white', // Set dialog background to white
                        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // Optional: Add shadow to the dialog
                      },
                    }}>
                      <DialogTitle>Confirm Action</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Are you sure you want to change the status of this category?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCancel} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleConfirm} color="primary">
                          Confirm
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default CategoryTable;
