import { Box, Button, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserRegistrationForm from '../../Components/UserRegistrationForm';


// Define the validation schema using Yup


const Register: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
   <Box>
    <Button onClick={handleOpen} size='small' sx={{ height: '40px', fontSize: { xs: '12px', sm: '12px', md: '14px' }, color: 'white', background: "rgb(108,117,125)", textTransform: 'capitalize' }} variant="outlined">Create Request</Button>
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
          <UserRegistrationForm/>
          </Box>
        </Modal>
    
   </Box>
  );
};

export default Register;
