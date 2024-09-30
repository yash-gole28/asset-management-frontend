import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TextField,
  InputAdornment,
  Modal,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import AssetRequestForm from '../../Components/AssetRequestForm';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid2';
import { MyContext } from '../../Context/AuthContext';
import { API } from '../../network';
import { apiList } from '../../apiList';

interface AssetRequest {
  employee_Id: { firstName: string; lastName: string; department: string };
  asset_id: { name: string; model_number: string };
  status: string;
}

const AssetsRequest = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<AssetRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const context = useContext(MyContext);
  if (!context) {
    throw new Error('Assets component must be used within a MyProvider');
  }
  const { getCurrentUser } = context;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangePage = (event: any, newPage: any) => setPage(newPage);
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = data.filter((request) =>
    request.employee_Id.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.employee_Id.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.asset_id.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.employee_Id.department.toLowerCase().includes(searchQuery.toLowerCase())||
    request.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRequestData = async () => {
    try {
      setLoading(true);
      const url = apiList.assetRequests;
      const response = await API.get(url);
      if (response.data.success) {
        setData(response.data.requests);
      } else {
        setError('Failed to fetch requests');
      }
    } catch (error) {
      setError('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
    getRequestData();
  }, [open]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ margin: '15px' }}>
      <Box sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'start', sm: 'center', md: 'center' }, justifyContent: 'space-between', marginBottom: '10px', mt: '10px' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: '0px', sm: '0px', md: '15px' }}>
            <Grid size={{ xs: 12, sm: 3, md: 3 }}>
              <Typography sx={{ margin: "10px", fontWeight: 'bold', fontSize: '1.2rem', textWrap: 'nowrap' }}>Asset Requests</Typography>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: { xs: 'start', sm: 'end', md: 'end' } }} size={{ xs: 12, sm: 6, md: 6 }}>
              <TextField
                variant="standard"
                placeholder="Search Employee"
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ marginBottom: '10px', marginTop: "8px", width: '30%', minWidth: '240px', backgroundColor: '#ffff', border: '1px solid #fff', padding: '2px 10px', borderRadius: '4px', boxShadow: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: { xs: 'start', sm: 'end', md: 'end' }, alignItems: 'center' }} size={{ xs: 12, sm: 3, md: 3 }}>
              <Button onClick={handleOpen} size='small' sx={{ height: '40px', fontSize: { xs: '12px', sm: '12px', md: '14px' }, color: 'white', background: "rgb(108,117,125)", textTransform: 'capitalize' }} variant="outlined">Create Request</Button>
            </Grid>
          </Grid>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%', md: 400 },
          }}>
            <AssetRequestForm popValue={setOpen} pop={open} />
          </Box>
        </Modal>
      </Box>

      <TableContainer sx={{
        width: { xs: "100%", sm: "100%" },
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: 2,
        marginBottom: "20px",
        position: "relative",
      }}>
        <Table sx={{ width: '100%' }} size='small' aria-label="simple table">
          <TableHead sx={{ fontWeight: '500', backgroundColor: 'rgb(177, 191, 238)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: '600' }} align="center">Employee Name</TableCell>
              <TableCell sx={{ fontWeight: '600' }} align="center">Assets Name</TableCell>
              <TableCell sx={{ fontWeight: '600' }} align="center">Department</TableCell>
              <TableCell sx={{ fontWeight: '600' }} align="center">Model Number</TableCell>
              <TableCell sx={{ fontWeight: '600' }} align="center">Status</TableCell>
              <TableCell sx={{ fontWeight: '600' }} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((v: AssetRequest, index: number) => (
              <TableRow key={index}>
                <TableCell sx={{ textWrap: 'nowrap' }} align="center">{v.employee_Id.firstName} {v.employee_Id.lastName}</TableCell>
                <TableCell sx={{ textWrap: 'nowrap' }} align="center">{v.asset_id.name}</TableCell>
                <TableCell sx={{ textWrap: 'nowrap' }} align="center">{v.employee_Id.department}</TableCell>
                <TableCell sx={{ textWrap: 'nowrap' }} align="center">{v.asset_id.model_number}</TableCell>
                <TableCell sx={{ textWrap: 'nowrap' }} align="center">
                  <Typography sx={{ fontWeight: '500', textTransform: 'capitalize' }}>{v.status}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button disabled={v.status !== 'pending'} sx={{ opacity: v.status === 'pending' ? 1 : 0.5 }}>
                      <DoneIcon sx={{ color: 'green', fontSize: '15px', minWidth: '0px' }} />
                    </Button>
                    <Button disabled={v.status !== 'pending'} sx={{ opacity: v.status === 'pending' ? 1 : 0.5 }}>
                      <CloseIcon sx={{ color: 'red', fontSize: '15px', minWidth: '0px' }} />
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default AssetsRequest;
