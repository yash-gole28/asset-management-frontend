









// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Grid,
//   TablePagination,
//   CircularProgress,
//   Button,
//   Box,
// } from '@mui/material';
// import { apiList } from '../../apiList';
// import { API } from '../../network';
// import AddCategory from '../../Components/AddCategory';

// interface Category {
//   _id: string;
//   category: string;
//   createdAt: string;
//   active: boolean;
//   createdBy: {
//     firstName: string;
//     lastName: string;
//   };
// }

// const CategoryTable = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategories = async () => {
//     setLoading(true);
//     setError(null); // Reset error state before fetching
//     try {
//       const url = `${apiList.getAllCategory}?page=${page + 1}&limit=${rowsPerPage}`;
//       const response = await API.get(url);
//       if (response.data.success) {
//         setCategories(response.data.categories);
//         setTotalCount(response.data.total);
//       } else {
//         setError("Failed to fetch categories.");
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setError("Error fetching categories.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, [page, rowsPerPage]);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const changeActive = async (id: string) => {
//     setLoading(true);
//     try {
//       const url = apiList.changeActiveCategory; // Update to correct API endpoint
//       const response = await API.put(url, { id });
//       if (response?.data.success) {
//         fetchCategories(); // Fetch updated category data
//         console.log(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error changing active status:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <TableContainer 
//       component={Paper}
//       sx={{
//         position: 'relative',
        
//         borderRadius: "10px",
//         backgroundColor: "white",
//         boxShadow: 3,
//         margin: '15px', // Center the container
//       }}
//     >
//       {loading && (
//         <CircularProgress
//           size={24}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             marginTop: '-12px',
//             marginLeft: '-12px',
//           }}
//         />
//       )}
    
//       <Grid container spacing={2} sx={{ padding: '10px' }}>
        
//         <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//         <Typography variant="h6" sx={{ textAlign: 'start' }}>Category List</Typography>
//           <AddCategory />
//         </Grid>
//       </Grid>
      
//       {error && (
//         <Typography variant="body1" color="error" sx={{ padding: '16px', textAlign: 'center' }}>
//           {error}
//         </Typography>
//       )}
      
//       <Box sx={{ width:{md:'95%',xs:'95%',sm:'95%'}, border: '1px solid #dfe0e2', borderRadius: '5px', boxShadow: 1, margin: '15px auto' ,overflow:'scroll' }}>
//         <Table  size='small' aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="center">S.No</TableCell>
//               <TableCell align="center">ID</TableCell>
//               <TableCell align="center">Name</TableCell>
//               <TableCell align="center">Created At</TableCell>
//               <TableCell align="center">Active</TableCell>
//               <TableCell align="center">Created By</TableCell>
//               <TableCell align="center">Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {categories.map((category, index) => (
//               <TableRow key={category._id}>
//                 <TableCell align="center">{index + 1 + page * rowsPerPage}</TableCell>
//                 <TableCell align="center">{category._id}</TableCell>
//                 <TableCell align="center">{category.category}</TableCell>
//                 <TableCell align="center">{new Date(category.createdAt).toLocaleDateString()}</TableCell>
//                 <TableCell align="center">{category.active ? 'Yes' : 'No'}</TableCell>
//                 <TableCell align="center">
//                   {category.createdBy.firstName} {category.createdBy.lastName}
//                 </TableCell>
//                 <TableCell align="center">
//                   <Button
//                     size="small"
//                      variant="outlined"
//                     // color="primary"
//                     onClick={() => changeActive(category._id)}
//                     disabled={loading}
//                   >
//                     Change
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Box>
      
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={totalCount}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </TableContainer>
//   );
// };

// export default CategoryTable;


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
  Grid,
  TablePagination,
  CircularProgress,
  Button,
  Box,
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
    <TableContainer 
      component={Paper}
      sx={{
        position: 'relative',
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: ' 0 0 3px rgb(198, 200, 205)'
 ,
        margin: '20px auto',
        maxWidth: '90%', // Make it responsive
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
    
      <Grid container spacing={2} sx={{ padding: '16px' }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Category List</Typography>
          <AddCategory />
        </Grid>
      </Grid>
      
      {error && (
        <Typography variant="body1" color="error" sx={{ padding: '16px', textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      
      <Box sx={{ width: '95%', border: '1px solid #dfe0e2', borderRadius: '5px', boxShadow: '0 0 3px rgb(198, 200, 205)'
 , margin: '15px auto', overflow: 'auto' }}>
        <Table size='small' aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">S.No</TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="center">Created By</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category._id}>
                <TableCell align="center">{index + 1 + page * rowsPerPage}</TableCell>
                <TableCell align="center">{category._id}</TableCell>
                <TableCell align="center">{category.category}</TableCell>
                <TableCell align="center">{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align="center">{category.active ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">
                  {category.createdBy.firstName} {category.createdBy.lastName}
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => changeActive(category._id)}
                    disabled={loading}
                  >
                    Change
                  </Button>
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
  );
};

export default CategoryTable;
