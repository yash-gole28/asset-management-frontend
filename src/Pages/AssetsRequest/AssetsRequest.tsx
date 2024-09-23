// import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
// import React, { useState } from 'react';
// import data from '../../Data.json';
// import { useNavigate } from 'react-router-dom';
// import CloseIcon from '@mui/icons-material/Close';
// import DoneIcon from '@mui/icons-material/Done';
// import Modal from '@mui/material/Modal';
// import { Height } from '@mui/icons-material';
// import AssetRequestForm from '../../Components/AssetRequestForm';


// const AssetsRequest = () => {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleChangePage = (event: any, newPage: any) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: any) => {
//     setRowsPerPage(parseInt(event.target.value,10));
//     setPage(0);
//   };


//   const style = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width:{xs:'90%',sm:'80%',md:400},
//     height: 'auto'    ,
//     bgcolor: 'background.paper',
//     borderRadius:'10px',
//     boxShadow: 24,
//     p:2,
//   };
//   return (
//     <Box sx={{ width: '95%',margin:'auto'}}>
//       {/* Button to register new assets */}
//       <Box sx={{ display: "flex",flexDirection:{xs:'column',sm:'row',md:'row'}, alignItems:{xs:'start',sm:'center',md:'center'}, justifyContent:'space-between', marginBottom: '10px',mt:'10px' }}>
//       <Typography sx={{ margin: "10px", fontWeight: 'bold', fontSize: '1.2rem' }}>Asset Requests</Typography>
      
//         <Button onClick={handleOpen} size='small' sx={{fontSize:'1rem',color:'white', background:"rgb(108,117,125)"}} variant="outlined">Create Request</Button>
//         <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//        <Box sx={{position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width:{xs:'90%',sm:'80%',md:400},
//     }}>
//             <AssetRequestForm/>
//        </Box>
//       </Modal>
//       </Box>
//       <TableContainer sx={{
//         width: { xs: "100%", sm: "100%", }, 
//         borderRadius: "10px",
//         backgroundColor: "white",
//         boxShadow: 2, 
//         marginBottom: "20px",
//         position: "relative",
//       }}>
       

//         <Table sx={{width:'100%' }} size='small' aria-label="simple table">
//           <TableHead sx={{fontWeight:'500',backgroundColor:'rgb(177, 191, 238)'}}>
//             <TableRow>
//               <TableCell  sx={{ fontWeight: '600' }} align="center">Employee Name</TableCell>
//               <TableCell  sx={{ fontWeight: '600' }} align="center">Assets Name</TableCell>
//               <TableCell  sx={{ fontWeight: '600' }} align="center">Department</TableCell>
//               <TableCell  sx={{ fontWeight: '600' }} align="center">Model Number</TableCell>
//               <TableCell  sx={{ fontWeight: '600' }} align="center">Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.requestData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((v, index) => (
//               <TableRow key={index}>
//                 <TableCell align="center">{v.name}</TableCell>
//                 <TableCell align="center">{v.assets_name}</TableCell>
//                 <TableCell align="center">{v.department}</TableCell>
//                 <TableCell align="center">{v.modal_number}</TableCell>
//                 <TableCell align="center">{v.approved === 'pending' ? <Box sx={{display:'flex',justifyContent:'space-around'}}> 
//                   <Button><DoneIcon sx={{color:'green',fontSize:'15px',minWidth:'0px'}}/> </Button> 
//                  <Button><CloseIcon sx={{color:'red',fontSize:'15px',minWidth:'0px'}}/></Button> </Box>
//                   : <Typography sx={{fontWeight:'500',textTransform:'capitalize'}}>{v.approved}</Typography>}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//             rowsPerPageOptions={[5, 15, 20]}
//             component="div"
//             count={data.requestData.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
       
    
//       </TableContainer>
     
//       {/* Table Container */}
//     </Box>
//   );
// };

// export default AssetsRequest;

import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, TextField } from '@mui/material';
import React, { useState } from 'react';
import data from '../../Data.json';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import AssetRequestForm from '../../Components/AssetRequestForm';

const AssetsRequest = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangePage = (event:any, newPage:any) => setPage(newPage);
  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = data.requestData.filter((request) =>
    request.name.toLowerCase().includes(searchQuery.toLowerCase()),

  );

  

  return (
    <Box sx={{ width: '95%', margin: 'auto' }}>
      <Box sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'start', sm: 'center' }, justifyContent: 'space-between', marginBottom: '10px', mt: '10px' }}>
        <Typography sx={{ margin: "10px", fontWeight: 'bold', fontSize: '1.2rem' }}>Asset Requests</Typography>
        <Button onClick={handleOpen} size='small' sx={{ fontSize: '1rem', color: 'white', background: "rgb(108,117,125)" }} variant="outlined">Create Request</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box  sx={{position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:{xs:'90%',sm:'80%',md:400},
    }}>
            <AssetRequestForm />
          </Box>
        </Modal>
      </Box>
      
      {/* Search Input */}
      <TextField
        variant="outlined"
        placeholder="Search by Employee Name"
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: '20px', width: '100%' }}
      />

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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((v, index) => (
              <TableRow key={index}>
                <TableCell align="center">{v.name}</TableCell>
                <TableCell align="center">{v.assets_name}</TableCell>
                <TableCell align="center">{v.department}</TableCell>
                <TableCell align="center">{v.modal_number}</TableCell>
                <TableCell align="center">{v.approved === 'pending' ? (
                  <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button><DoneIcon sx={{ color: 'green', fontSize: '15px', minWidth: '0px' }} /></Button>
                    <Button><CloseIcon sx={{ color: 'red', fontSize: '15px', minWidth: '0px' }} /></Button>
                  </Box>
                ) : (
                  <Typography sx={{ fontWeight: '500', textTransform: 'capitalize' }}>{v.approved}</Typography>
                )}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 15, 20]}
          component="div"
          count={filteredData.length} // Updated to reflect filtered count
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
