

import { Box, TextField, Typography, Button, MenuItem } from '@mui/material';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { apiList } from '../../apiList';
import { API } from '../../network';

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  type: Yup.string().required('Type is required'),
  companyName: Yup.string().required('Company Name is required'),
  modelNumber: Yup.string().required('Model Number is required'),
  serviceTag: Yup.string().required('Service Tag is required'),
  allocation: Yup.string().required('Allocation is required'),
  registeredBy: Yup.string().required('Registered By is required'),
});

const MyForm = () => {
  const handleSubmit = async(values: {
    name: string;
    type: string;
    companyName: string;
    modelNumber: string;
    serviceTag: string;
    allocation: string;
    registeredBy: string;
  }) => {
    console.log(values);
    try {
      const url = apiList.assetRegister
      console.log(url)
      const response = await API.post(url, {values} )

    } catch (error) {
      console.error('Error:', error);
      console.log("not save in data");

    }
  };

  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        backgroundColor: "rgb(242, 244, 247)",
        display: "flex",
        alignItems:{xs:'top',md:'center'},
        justifyContent: 'center',
        borderRadius:'10px'
        // Responsive padding
      }}
    >
      <Box
        sx={{
          width: '100%',
          borderRadius: 2,
          backgroundColor: "white",
          padding:{xs:2 , sm:2 , md:3},
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
         Assets Registration Form
        </Typography>

        <Formik
          initialValues={{
            name: '',
            type: '',
            companyName: '',
            modelNumber: '',
            serviceTag: '',
            allocation: '',
            registeredBy: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              <Field
                as={TextField}
                name="name"
                placeholder="Name"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.name && Boolean(errors.name)}
                helperText={<ErrorMessage name="name" />}
              />

              <Field
                as={TextField}
                name="type"
                select
                placeholder="Type1"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.type && Boolean(errors.type)}
                helperText={<ErrorMessage name="type" />}
              >
                <MenuItem value="Type1">Laptop</MenuItem>
                <MenuItem value="Type2">Type2</MenuItem>
                <MenuItem value="Type3">Type3</MenuItem>
              </Field>

              <Field
                as={TextField}
                name="companyName"
                placeholder="Company Name"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.companyName && Boolean(errors.companyName)}
                helperText={<ErrorMessage name="companyName" />}
              />

              <Field
                as={TextField}
                name="modelNumber"
                placeholder="Model Number"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.modelNumber && Boolean(errors.modelNumber)}
                helperText={<ErrorMessage name="modelNumber" />}
              />

              <Field
                as={TextField}
                name="serviceTag"
                placeholder="Service Tag"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.serviceTag && Boolean(errors.serviceTag)}
                helperText={<ErrorMessage name="serviceTag" />}
              />

              <Field
                as={TextField}
                name="allocation"
                placeholder="Allocation"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.allocation && Boolean(errors.allocation)}
                helperText={<ErrorMessage name="allocation" />}
              />

              <Field
                as={TextField}
                name="registeredBy"
                placeholder="Registered By"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.registeredBy && Boolean(errors.registeredBy)}
                helperText={<ErrorMessage name="registeredBy" />}
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
    </Box>
  );
};

export default MyForm;
