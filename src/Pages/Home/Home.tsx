import React, { useContext, useEffect, useState } from 'react'
import KPIs from '../../Components/KPIs'
import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API } from '../../network';
import { apiList } from '../../apiList';
import { MyContext } from '../../Context/AuthContext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface AssetRequest {
  _id: string; // Add this line
  employee_Id: { firstName: string; lastName: string; department: string };
  asset_id: { name: string; model_number: string; service_tag: string; _id: string }; // Include _id for asset_id if needed
  status: string;
  createdAt: string;
  updatedAt: string;
}

const Home = () => {
  const router = useNavigate()
  const context = useContext(MyContext)
  const [data, setData] = useState<AssetRequest[]>([]);
  const [loading, setLoading] = useState(true);

  if (!context) {
    throw new Error('UserComponent must be used within a MyProvider');
  }
  const { getCurrentUser, type } = context

  const getlimitedRequestData = async () => {
    try {
      setLoading(true);
      const url = apiList.assetTopRequests;
      const response = await API.get(url);
      if (response.data.success) {
        setData(response.data.requests);
      } else {
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getCurrentUser()
      // getAdmin()
      getlimitedRequestData()
    } else {
      toast('session expired')
      router('/login')
    }
  }, [])

  return (
    <Box>

      <Box sx={{ margin: { xs: '10px', sm: '15px', md: '15px' } }}>
        <KPIs />
      </Box>

      <Box sx={{ margin: { xs: '10px', sm: '15px', md: '15px' } }}>

        <TableContainer sx={{
          width: { xs: "100%", sm: "100%" },
          borderRadius: "4px",
          backgroundColor: "white",
          boxShadow: ' 0 0 3px rgb(198, 200, 205)',
          // position: "relative",
          padding: { xs: '0px', sm: '0px 10px', md: '0px 15px' },
          fontFamily: 'Poppins'
        }}>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
                zIndex: '200'
              }}
            />
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', mb: '15px' }}>
            <Typography sx={{ fontWeight: '600', color: '#495057' }}>Requests</Typography>
            {/* <Button variant="contained" onClick={} sx={{textTransform:'capitalize'}}>All Requests -</Button> */}
            <Button onClick={() => router('/asset-requests')} size='small' sx={{ mt: '15px', height: '35px', fontSize: { xs: '12px', sm: '12px', md: '14px' }, color: 'white', background: "rgb(108,117,125)", textTransform: 'capitalize', width: 'fit-content' }} variant="outlined">All Requests <ArrowForwardIcon sx={{ fontSize: '14px' }} /></Button>
          </Box>
          <Table sx={{ boxShadow: ' 0 0 3px rgb(198, 200, 205)', mb: '15px' }} size='small' aria-label="simple table">
            <TableHead sx={{ fontWeight: '500' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: '600', color: '#495057' }} align="left">Employee Name</TableCell>
                <TableCell sx={{ fontWeight: '600', color: '#495057' }} align="left">Assets Name</TableCell>
                <TableCell sx={{ fontWeight: '600', color: '#495057' }} align="left">Department</TableCell>
                <TableCell sx={{ fontWeight: '600', color: '#495057' }} align="left">Model Number</TableCell>
                <TableCell sx={{ fontWeight: '600', color: '#495057' }} align="left">Status</TableCell>
                {/* {type === 'admin' && <TableCell sx={{ fontWeight: '600' }} align="left">Action</TableCell>} */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((v: AssetRequest, index: number) => (
                <TableRow key={index}>
                  <TableCell sx={{ textWrap: 'nowrap', color: '#495057' }} align="left">{v.employee_Id.firstName} {v.employee_Id.lastName}</TableCell>
                  <TableCell sx={{ textWrap: 'nowrap', color: '#495057' }} align="left">{v.asset_id.name}</TableCell>
                  <TableCell sx={{ textWrap: 'nowrap', color: '#495057' }} align="left">{v.employee_Id.department}</TableCell>
                  <TableCell sx={{ textWrap: 'nowrap', color: '#495057' }} align="left">{v.asset_id.model_number}</TableCell>
                  <TableCell sx={{ textWrap: 'nowrap' }} align="left">
                    {v.status === 'approved' && <Typography sx={{ backgroundColor: 'rgb(218, 244, 235)', color: 'rgb(26, 204, 141)', width: 'fit-content', padding: '1px 8px', borderRadius: '5px', fontSize: '13px', textTransform: 'capitalize' }}>{v.status}</Typography>}
                    {v.status === 'pending' && <Typography sx={{ backgroundColor: 'rgb(252, 241, 223)', color: 'rgb(247, 173, 54)', width: 'fit-content', padding: '1px 8px', borderRadius: '5px', fontSize: '13px', textTransform: 'capitalize' }}>{v.status}</Typography>}
                    {v.status === 'rejected' && <Typography sx={{ backgroundColor: 'rgb(253, 228, 228)', color: 'rgb(247, 106, 106)', width: 'fit-content', padding: '1px 8px', borderRadius: '5px', fontSize: '13px', textTransform: 'capitalize' }}>{v.status}</Typography>}
                    {/* <Typography sx={{ fontWeight: '500', textTransform: 'capitalize' }}>{v.status}</Typography> */}
                  </TableCell>


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