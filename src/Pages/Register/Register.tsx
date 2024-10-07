import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import UserRegistrationForm from '../../Components/UserRegistrationForm';
import UsersTable from '../../Components/UsersTable';
import { MyContext } from '../../Context/AuthContext';


// Define the validation schema using Yup


const Register: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const context = useContext(MyContext)

  
  if (!context) {
    throw new Error('Assets component must be used within a MyProvider');
  }
  const { getAdmin} = context

  useEffect(()=>{
    // getCurrentUser()
    getAdmin()
  },[])
  return (
    <Box sx={{margin:'15px',backgroundColor:'#fff',padding:'15px',borderRadius:'4px',boxShadow:'0 0 3px rgb(198, 200, 205)' }}>
      <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'end',mb:'15px'}}>
        <Typography sx={{fontWeight:'600',color:'#495057'}}>Users</Typography>
        <Button onClick={handleOpen} size='small' sx={{ height: '35px', fontSize: { xs: '12px', sm: '12px', md: '14px' }, color: 'white', background: "rgb(108,117,125)", textTransform: 'capitalize' }} variant="outlined">Add User</Button>
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
          <UserRegistrationForm />
        </Box>
      </Modal>
        <UsersTable/>
    </Box>
  );
};

export default Register;
