import React, { useEffect} from 'react';
import { TextField, MenuItem, Button, Typography, Box, Select, InputLabel } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { apiList } from '../apiList';
import { API } from '../network';
import Grid from '@mui/material/Grid2';

// Define the validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
  firstName: Yup.string().min(2, 'First name should be at least 2 letters').max(30, 'First name should not exceed 30 letters').required('Required'),
  middleName: Yup.string().optional(),
  lastName: Yup.string().required('Required'),
  role: Yup.string().oneOf(['admin', 'it', 'employee'], 'Invalid role').required('Required'),
  department: Yup.string().oneOf(['HR', 'IT', 'Finance', 'Marketing', 'Sales'], 'Invalid department').required('Required'),
});

// Define the initial values for the form
const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  middleName: '',
  lastName: '',
  role: '',
  department: '',
};

const departments = ['HR', 'IT', 'Finance', 'Marketing', 'Sales'];

const UserRegistrationForm: React.FC = () => {
  const router = useNavigate();

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const user = '66e817a74d92c09dd3213f7f';
      const extendedValues = {
        ...values,
        createdBy: user,
        updatedBy: user,
      };
      const url = apiList.register;
      const response = await API.post(url, { data: extendedValues });
      if (response) {
        router('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    localStorage.getItem('token');
  }, []);

  return (
    <Box sx={{ backgroundColor: '#fff', borderRadius: '4px' }}>
      <Typography variant="h6" textAlign='center' gutterBottom>
        Register New User
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
              <div className='scrollbar register'>
            <Grid sx={{ maxHeight: "500px" }} container spacing={2}>

              <Grid sx={{ margin: 'auto',mt:'1rem', backgroundColor: 'white' }} size={10}>
                <Field
                  as={TextField}
                  size='small'
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid sx={{ margin: 'auto', backgroundColor: 'white' }} size={10}>
                <Field
                  as={TextField}
                  size='small'
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid sx={{ margin: 'auto', backgroundColor: 'white' }} size={10}>
                <Field
                  as={TextField}
                  size='small'
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </Grid>
              <Grid sx={{ margin: 'auto', backgroundColor: 'white' }} size={10}>
                <Field
                  as={TextField}
                  size='small'
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid sx={{ margin: 'auto', backgroundColor: 'white' }} size={10}>
                <Field
                  as={TextField}
                  size='small'
                  name="middleName"
                  label="Middle Name"
                  variant="outlined"
                  fullWidth
                  error={touched.middleName && Boolean(errors.middleName)}
                  helperText={touched.middleName && errors.middleName}
                />
              </Grid>
              <Grid sx={{ margin: 'auto', backgroundColor: 'white' }} size={10}>
                <Field
                  as={TextField}
                  size='small'
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid sx={{ margin: 'auto', backgroundColor: 'white' }} size={10}>
                <Field
                  as={TextField}
                  size='small'
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
              <Grid sx={{ margin: 'auto', backgroundColor: 'white' }} size={10}>
                {/* <InputLabel id="department-label">Department</InputLabel> */}
                <Field
                  as={TextField}
                  size='small'
                  name="department"
                  label="department"
                  select
                  variant="outlined"
                  fullWidth
                  error={touched.department && Boolean(errors.department)}
                  helperText={touched.department && errors.department}
                >
                   {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Field>
                {/* <Select
                  labelId="department-label"
                  size='small'
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
                </Select> */}
              </Grid>
              <Grid sx={{ margin: 'auto', backgroundColor: 'white' }} size={{ xs: 6, sm: 6, md: 10 }}>
                <Button type="submit" variant="contained" color="primary" sx={{ mb: '1rem' }} fullWidth>
                  Register
                </Button>
              </Grid>
            </Grid>
              </div>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UserRegistrationForm;
