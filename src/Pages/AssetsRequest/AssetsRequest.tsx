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
  CircularProgress
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
import toast from 'react-hot-toast';

interface AssetRequest {
  _id: string; // Add this line
  employee_Id: { firstName: string; lastName: string; department: string };
  asset_id: { name: string; model_number: string; service_tag: string; _id: string }; // Include _id for asset_id if needed
  status: string;
  createdAt: string;
  updatedAt: string;
}

const AssetsRequest = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<AssetRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const context = useContext(MyContext);
  if (!context) {
    throw new Error('Assets component must be used within a MyProvider');
  }
  const { getitRole, type } = context;

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
    request.employee_Id.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId: string, action: 'approved' | 'rejected', assetId?: string) => {
    try {
      console.log(requestId, action, assetId)
      const url = apiList.updateRequest
      const response = await API.post(url, { requestId, action, assetId })
      if (response.success) {
        toast.success(response.message)
        console.log('updated successfully')
        getRequestData()
      }
    } catch (error) {
      getRequestData()
      console.error(error)
    }
  }
 
  useEffect(() => {
    if (type === 'employee') {
      toast.error('not allowed')
    }
    getitRole()
    getRequestData();

  }, [open]);

  return (
    <Box sx={{ margin: '15px' ,backgroundColor:'#fff',padding:'15px' ,boxShadow:'0 0 3px rgb(198, 200, 205)',borderRadius:'4px'}}>
      
      <Box sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'start', sm: 'center', md: 'center' }, justifyContent: 'space-between', marginBottom: '10px'}}>
      {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
              zIndex:'200'
            }}
          />
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{display:'flex',flexDirection:{xs:'column',sm:'column',md:'row'},justifyContent:{xs:'start',sm:'start',md:'space-between'},alignItems:{xs:'start',sm:'start',md:'end'}}}>
            <Box >
              <Typography sx={{fontWeight:'600',color:'#495057'}}>Asset Requests</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'start', sm: 'start', md: 'end' },flexDirection:{xs:'column',sm:'column',md:'row'} }}>
              <TextField
                variant="standard"
                size='small'
                placeholder="Search "
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{mr:'1rem', width: '30%', minWidth: '200px', backgroundColor: '#ffff', border: '1px solid #cfcece', padding: '2px 10px',pt:'5px',
                   borderRadius: '4px',margin:{xs:'15px 0px',md:'0px 15px'}}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button onClick={handleOpen} size='small' sx={{ height: '35px', fontSize: { xs: '12px', sm: '12px', md: '14px' }, color: 'white', background: "rgb(108,117,125)", textTransform: 'capitalize',width:'fit-content' }} variant="outlined">Add Request</Button>
            </Box>
           
          </Box>
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
        borderRadius: "4px",
        backgroundColor: "white",
        boxShadow:' 0 0 3px rgb(198, 200, 205)',
        position: "relative",
        padding:{xs:'0px',sm:'0px 10px',md:'0px 15px'},
        fontFamily:'Poppins'
      }}>
        
        <Table size='small' aria-label="simple table">
          <TableHead sx={{ fontWeight: '500' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: '600' ,color:'#495057'}} align="left">Employee Name</TableCell>
              <TableCell sx={{ fontWeight: '600' ,color:'#495057' }} align="left">Assets Name</TableCell>
              <TableCell sx={{ fontWeight: '600' ,color:'#495057' }} align="left">Department</TableCell>
              <TableCell sx={{ fontWeight: '600' ,color:'#495057' }} align="left">Model Number</TableCell>
              <TableCell sx={{ fontWeight: '600' ,color:'#495057' }} align="left">Status</TableCell>
              {type === 'admin' && <TableCell sx={{ fontWeight: '600' }} align="left">Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((v: AssetRequest, index: number) => (
              <TableRow key={index}>
                <TableCell sx={{ textWrap: 'nowrap', color:'#495057' }} align="left">{v.employee_Id.firstName} {v.employee_Id.lastName}</TableCell>
                <TableCell sx={{ textWrap: 'nowrap', color:'#495057' }} align="left">{v.asset_id.name}</TableCell>
                <TableCell sx={{ textWrap: 'nowrap', color:'#495057' }} align="left">{v.employee_Id.department}</TableCell>
                <TableCell sx={{ textWrap: 'nowrap', color:'#495057' }} align="left">{v.asset_id.model_number}</TableCell>
                <TableCell sx={{ textWrap: 'nowrap' }} align="left">
                  {v.status === 'approved' && <Typography sx={{backgroundColor:'rgb(218, 244, 235)',color:'rgb(26, 204, 141)',width:'fit-content',padding:'1px 8px',borderRadius:'5px',fontSize:'13px',textTransform:'capitalize'}}>{v.status}</Typography>}
                  {v.status === 'pending' && <Typography sx={{backgroundColor:'rgb(252, 241, 223)',color:'rgb(247, 173, 54)',width:'fit-content',padding:'1px 8px',borderRadius:'5px',fontSize:'13px',textTransform:'capitalize'}}>{v.status}</Typography>}
                  {v.status === 'rejected' && <Typography sx={{backgroundColor:'rgb(253, 228, 228)',color:'rgb(247, 106, 106)',width:'fit-content',padding:'1px 8px',borderRadius:'5px',fontSize:'13px',textTransform:'capitalize'}}>{v.status}</Typography>}
                  {/* <Typography sx={{ fontWeight: '500', textTransform: 'capitalize' }}>{v.status}</Typography> */}
                </TableCell>
                {type === 'admin' &&   <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                    <Button onClick={() => handleRequestAction(v._id, 'approved', v.asset_id._id)} disabled={v.status !== 'pending'} sx={{ opacity: v.status === 'pending' ? 1 : 0.5 }}>
                      <DoneIcon sx={{ color: '#fff', fontSize: '16px', minWidth: '0px',backgroundColor:'#7EBF7E',borderRadius:'20%',width:'fit-content'}} />
                    </Button>
                    <Button onClick={() => handleRequestAction(v._id, 'rejected', v.asset_id._id)} disabled={v.status !== 'pending'} sx={{ opacity: v.status === 'pending' ? 1 : 0.5 }}>
                      <CloseIcon sx={{ color: '#fff', fontSize: '16px', minWidth: '0px' ,backgroundColor:'#FF7E7E',borderRadius:'20%',width:'fit-content'}} />
                    </Button>
                  </Box>
                </TableCell>}
              
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
