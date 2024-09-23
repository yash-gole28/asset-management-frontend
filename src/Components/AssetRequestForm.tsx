import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, TextField, Typography, Button } from '@mui/material';




const validationSchema = Yup.object({
    name: Yup.string()
      .required('Employee name is required'),
    asset: Yup.string()
      .required('Asset name is required'),
  });

const AssetRequestForm = () => {


    const handleSubmit = (values: { name: string; asset: string })=>{
        console.log(values);
    }
  return (
    <Box
    sx={{
      width: { xs: '90%', sm: '80%', md: '430px' },
      margin:'auto',
      borderRadius: 2,
      backgroundColor: "white",
      padding: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: 1, // Adds a shadow effect
    }}
  >
    

    <Typography
      variant='h5'
      sx={{ marginBottom: 2, fontSize: { xs: '1.2rem', sm: '1.3rem' } }}
      color="black"
    >
      Request Asset
    </Typography>
    

    <Formik
      initialValues={{ name: '', asset: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors }) => (
        <Form>
          <Field
            as={TextField}
            name="name"
            placeholder="Employee Name"
            fullWidth
            sx={{
              marginBottom: 3,
              backgroundColor: "white",
              borderRadius: 1,
            }}
            error={touched.name && Boolean(errors.name)}
            helperText={<ErrorMessage name="name" />}
          />
          <Field
            as={TextField}
            name="asset"
            placeholder="Asset Name"
            type='text'
            fullWidth
            sx={{
              marginBottom: 3,
              backgroundColor: "white",
              borderRadius: 1,
            }}
            error={touched.asset && Boolean(errors.asset)}
            helperText={<ErrorMessage name="asset" />}
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
            Submit
          </Button>
          
        </Form>
      )}
    </Formik>
  </Box>
  )
}

export default AssetRequestForm