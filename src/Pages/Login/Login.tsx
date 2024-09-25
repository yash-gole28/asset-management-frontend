import { Box, TextField, Typography, Button, InputAdornment, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { apiList } from '../../apiList';
import { API } from '../../network';
import toast from 'react-hot-toast';

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async(values: { email: string; password: string }) => {
   try{
    const url = apiList.login
    const response = await API.post(url ,{data:values})
    console.log(response)
    if(response){
      console.log(response)
      localStorage.setItem('token',JSON.stringify(response.token))
    }else{
      toast.error('Invalid credentials')
    }
   }catch(err){
    console.error(err);
   }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgb(229, 236, 243)",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        padding: { xs: 2, sm: 4 }, // Responsive padding
      }}
    >
      <Box
        sx={{
          width: { xs: '90%', sm: '80%', md: '430px' },
          borderRadius: 2,
          backgroundColor: "white",
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 1, // Adds a shadow effect
        }}
      >
        <Box sx={{ height: 30, width: 30, backgroundColor: 'gray', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
          <img src='icon' alt='logo' style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
        </Box>

        <Typography
          variant='h5'
          sx={{ marginBottom: 2, fontSize: { xs: '1.2rem', sm: '1.3rem' } }}
          color="black"
        >
          Login
        </Typography>
        <Typography
          variant='h6'
          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, color: 'gray', marginBottom: 3 }}
        >
          Enter your email address and password
        </Typography>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              <Field
                as={TextField}
                name="email"
                placeholder="Email.."
                fullWidth
                sx={{
                  marginBottom: 3,
                  backgroundColor: "white",
                  borderRadius: 1,
                }}
                error={touched.email && Boolean(errors.email)}
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                name="password"
                placeholder="Password.."
                type={showPassword ? 'text' : 'password'}
                fullWidth
                sx={{
                  marginBottom: 3,
                  backgroundColor: "white",
                  borderRadius: 1,
                }}
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                sx={{
                  width: '100%',
                  height: 36,
                  marginBottom: 2,
                  borderRadius: 1,
                  textTransform: 'none',
                }}
                variant='contained'
              >
                Login
              </Button>
              <Typography
                sx={{ color: "black", textAlign: 'center' }}
              >
                Don't have an account?{' '}
                <Typography
                  component="span"
                  onClick={() => navigate('/register')}
                  sx={{ color: "blue", cursor: "pointer", fontSize: '0.875rem' }}
                >
                  Register
                </Typography>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
