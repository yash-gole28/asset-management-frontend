import React, { useEffect, useState } from 'react'
import KPIs from '../../Components/KPIs'
import data from './../../Data.json'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API } from '../../network';
import { apiList } from '../../apiList';


const Home = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [user , setUser] = useState('')
  const router = useNavigate()
  


  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getCurrentUser = async () => {
    try{
      const url = apiList.getCurrentUser
      const response = await API.get(url)
      if(response){
        toast(response.data.user.firstName)
        // setUser(response.user.firstName)
      }else{
        toast.error('user not found')
      }
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      getCurrentUser()
    }else{
      toast('session expired')
      router('/login')
    }
  },[])

  return (
    <Box>
      <Box sx={{margin:{xs:'10px',sm:'15px',md:'15px'}}}>
      <KPIs />
      </Box>

        <Box sx={{ flexGrow: 1 ,margin:{xs:'10px',sm:'15px',md:'15px'}}}>
          <Grid container spacing={{xs:'10px',sm:'15px',md:'15px'}}>
            <Grid size={12}>
              <Typography sx={{ margin: "20px 0px", fontWeight: 'bold', fontSize: '1.2rem' }}>Categories wise assets Data</Typography>
              <TableContainer sx={{
                borderRadius: "5px",
                backgroundColor: "white",
                boxShadow:1,
                marginBottom: "20px",
              }}>


                <Table aria-label="simple table" size='small'>
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
                  rowsPerPageOptions={[5, 10,15, 20]}
                  component="div"
                  count={data.requestData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </Grid>
          </Grid>


        </Box>
        
    
    </Box>
  )
}

export default Home