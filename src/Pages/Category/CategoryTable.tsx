












// import React, { useEffect, useState } from 'react';
// import Switch from '@mui/material/Switch';
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
//     setError(null);
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
//       const url = apiList.changeActiveCategory;
//       const response = await API.put(url, { id });
//       if (response?.data.success) {
//         fetchCategories();
//       }
//     } catch (error) {
//       console.error('Error changing active status:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{padding:'15px'}}>
//       <TableContainer
//         component={Paper}
//         sx={{
//           position: 'relative',
//           borderRadius: "4px",
//           backgroundColor: "white",
//           boxShadow: ' 0 0 3px rgb(198, 200, 205)',
         
//           // margin: '15px',
//           // Make it responsive
//         }}
//       >
//         {loading && (
//           <CircularProgress
//             size={24}
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               marginTop: '-12px',
//               marginLeft: '-12px',
//             }}
//           />
//         )}

//         <Grid container spacing={2} sx={{ padding: '15px' }}>
//           <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography    variant="h6">Category List</Typography>
//             <AddCategory />
//           </Grid>
//         </Grid>

//         {error && (
//           <Typography variant="body1" color="error" sx={{ padding: '16px', textAlign: 'center' }}>
//             {error}
//           </Typography>
//         )}

//         <Box sx={{
//         border: '1px solid #dfe0e2', borderRadius: '5px', boxShadow: '0 0 3px rgb(198, 200, 205)'
//           , margin: '0px 15px ',padding:'15px',overflow:'auto'
//         }}>
//           <Table size='small' aria-label="simple table">
//             <TableHead sx={{ borderRadius:'14px',fontWeight:'bold'}} >
//               <TableRow>
//                 <TableCell sx={{fontWeight:'bold'}} align="center">S.No</TableCell>
//                 <TableCell  sx={{fontWeight:'bold'}}  align="center">ID</TableCell>
//                 <TableCell  sx={{fontWeight:'bold'}}  align="center">Name</TableCell>
//                 <TableCell  sx={{fontWeight:'bold'}}  align="center">Created At</TableCell>
//                 <TableCell  sx={{fontWeight:'bold'}}  align="center">Active</TableCell>
//                 <TableCell  sx={{fontWeight:'bold'}}  align="center">Created By</TableCell>
//                 <TableCell  sx={{fontWeight:'bold'}}  align="center">Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {categories.map((category, index) => (
//                 <TableRow key={category._id}>
//                   <TableCell align="center">{index + 1 + page * rowsPerPage}</TableCell>
//                   <TableCell align="center">{category._id}</TableCell>
//                   <TableCell align="center">{category.category}</TableCell>
//                   <TableCell align="center">{new Date(category.createdAt).toLocaleDateString()}</TableCell>
//                   <TableCell align="center">{category.active ?  <Typography sx={{fontSize:'13px',backgroundColor:'rgb(218, 244, 235)',color:'rgb(26, 204, 141)',width:'fit-content',margin:'auto',padding:'1px 10px',borderRadius:'5px'}}>Yes</Typography> :
//                      <Typography sx={{fontSize:'13px',backgroundColor:'rgb(253, 228, 228)',color:'rgb(247, 106, 106)',width:'fit-content',margin:'auto',padding:'1px 10px',borderRadius:'5px'}}>No</Typography>
//                   }</TableCell>
//                   <TableCell align="center">
//                     {category.createdBy.firstName} {category.createdBy.lastName}
//                   </TableCell>
//                   <TableCell align="center">
//                     {/* <Button
//                       size="small"
//                       variant="outlined"
//                       onClick={() => changeActive(category._id)}
//                       disabled={loading}
//                     >
//                       gg
//                     </Button> */}
//                     <Switch
             
//              onChange={() => changeActive(category._id)}
//                 inputProps={{ 'aria-label': 'controlled' }}
//                         />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Box>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={totalCount}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </TableContainer>
//     </Box>

//   );
// };

// export default CategoryTable;

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
      const response = await API.put(url, { id});
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
          position: 'relative',
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
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{fontWeight:'600'}}>Category List</Typography>
            <AddCategory />
          </Grid>
        </Grid>

        {error && (
          <Typography variant="body1" color="error" sx={{ padding: '16px', textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        <Box sx={{
          border: '1px solid #dfe0e2', borderRadius: '5px', boxShadow: '0 0 3px rgb(198, 200, 205)',
          margin: '0px 15px', padding: '0px 15px', overflow: 'auto'
        }}>
          <Table size='small' aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold',color:'#495057' }} align="left">Sr. No</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color:'#495057' }} align="left">Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color:'#495057' }} align="left">Created At</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color:'#495057' }} align="left">Active</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color:'#495057' }} align="left">Created By</TableCell>
                <TableCell sx={{ fontWeight: 'bold',color:'#495057' }} align="left">Action</TableCell>
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
                      onChange={() => changeActive(category._id)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
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
