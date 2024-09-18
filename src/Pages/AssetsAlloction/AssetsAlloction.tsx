import { Box, TextField, Typography, Button, MenuItem } from '@mui/material';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Ensure you have this package installed

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  employeeId: Yup.string().required('Employee ID is required'),
  approvedById: Yup.string().required('Approved By ID is required'),
  deviceName: Yup.string().required('Device Name is required'),
  specification: Yup.string().required('Specification is required'),
  issueDate: Yup.date().required('Issue Date is required').nullable(),
  userType: Yup.string().required('User Type is required'),
});

const AllocationForm = () => {
  const handleSubmit = (values: {
    name: string;
    employeeId: string;
    approvedById: string;
    deviceName: string;
    specification: string;
    issueDate: Date | null;
    userType: string;
  }) => {
    // Handle form submission, e.g., call an API
    console.log(values);
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
          width: { xs: '90%', sm: '80%', md: '600px' },
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
          Allocation Form
        </Typography>

        <Formik
          initialValues={{
            name: '',
            employeeId: '',
            approvedById: '',
            deviceName: '',
            specification: '',
            issueDate: null,
            userType: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, setFieldValue, values }) => (
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
                name="employeeId"
                placeholder="Employee ID"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.employeeId && Boolean(errors.employeeId)}
                helperText={<ErrorMessage name="employeeId" />}
              />

              <Field
                as={TextField}
                name="approvedById"
                placeholder="Approved By ID"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.approvedById && Boolean(errors.approvedById)}
                helperText={<ErrorMessage name="approvedById" />}
              />

              <Field
                as={TextField}
                name="deviceName"
                placeholder="Device Name"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.deviceName && Boolean(errors.deviceName)}
                helperText={<ErrorMessage name="deviceName" />}
              />

              <Field
                as={TextField}
                name="specification"
                placeholder="Specification"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.specification && Boolean(errors.specification)}
                helperText={<ErrorMessage name="specification" />}
              />

              {/* <Field name="issueDate">
                {({ field }: any) => (
                  <DatePicker
                    label="Issue Date"
                    value={values.issueDate}
                    onChange={(date) => setFieldValue("issueDate", date)}
                    renderInput={(params:any) => (
                      <TextField
                        {...params}
                        {...field}
                        fullWidth
                        variant="outlined"
                        size="small"
                        sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                        error={touched.issueDate && Boolean(errors.issueDate)}
                        helperText={<ErrorMessage name="issueDate" />}
                      />
                    )}
                  />
                )}
              </Field> */}

              <Field
                as={TextField}
                name="userType"
                select
                placeholder="User Type"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.userType && Boolean(errors.userType)}
                helperText={<ErrorMessage name="userType" />}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Guest">Guest</MenuItem>
              </Field>

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

export default AllocationForm;
