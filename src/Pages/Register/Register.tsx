import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Button, Typography, Container, Grid, Select, InputLabel, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Define the validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  firstName: Yup.string().required('Required'),
  middleName: Yup.string().optional(),
  lastName: Yup.string().required('Required'),
  role: Yup.string().oneOf(['admin', 'it', 'employee'], 'Invalid role').required('Required'),
  department: Yup.string().oneOf(['HR', 'IT', 'Finance', 'Marketing', 'Sales'], 'Invalid department').required('Required'),
});

// Define the initial values for the form
const initialValues = {
  email: '',
  password: '',
  firstName: '',
  middleName: '',
  lastName: '',
  role: '',
  department: '', // Single department
};

const departments = ['HR', 'IT', 'Finance', 'Marketing', 'Sales'];

const Register: React.FC = () => {
  // State to store form values
  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = (values: typeof initialValues) => {
    // Add additional fields to the form values
    const userId = localStorage.getItem('token')
    const user = userId ? JSON.parse(userId) : null;
    const extendedValues = {
      ...values,
      additionalField1: user,
      additionalField2: 'value2',
    };

    // Update state with form values
    setFormValues(extendedValues);

    // Simulate sending data to the backend
    console.log('Form Data to be sent to the backend:', extendedValues);
    // Here you would typically send `extendedValues` to your backend API
  };

  useEffect(()=>{
    localStorage.setItem('token',JSON.stringify("66e81825007b2dd5546e023f"))
  },[])
  return (
    <Box sx={{ backgroundColor: 'rgb(242, 244, 247)', pt: '2rem' }}>
      <Container maxWidth="sm" sx={{ backgroundColor: 'white' }}>
        <Typography variant="h4" textAlign='center' gutterBottom>
          Registration Form
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="middleName"
                    label="Middle Name"
                    variant="outlined"
                    fullWidth
                    error={touched.middleName && Boolean(errors.middleName)}
                    helperText={touched.middleName && errors.middleName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="role"
                    label="Role"
                    select
                    variant="outlined"
                    fullWidth
                    error={touched.role && Boolean(errors.role)}
                    helperText={touched.role && errors.role}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="it">IT</MenuItem>
                    <MenuItem value="employee">Employee</MenuItem>
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="department-label">Department</InputLabel>
                  <Select
                    labelId="department-label"
                    name="department"
                    value={values.department}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.department && Boolean(errors.department)}
                    fullWidth
                    variant="outlined"
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.department && errors.department && (
                    <Typography color="error" variant="caption">{errors.department}</Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Register;
