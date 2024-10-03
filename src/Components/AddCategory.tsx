
import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Grid,
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { apiList } from '../apiList';
import { API } from '../network';

const AddCategory = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = Yup.object({
    category: Yup.string()
      .required('Category name is required')
      .min(2, 'Category name must be at least 2 characters long'),
  });

  return (
    <div>
      <Button variant="contained" color="primary" sx={{backgroundColor:'rgb(108,117,125)'}} onClick={handleClickOpen}>
        Add Category
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Category</DialogTitle>
        <Formik
          initialValues={{ category: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const url = apiList.category; // Ensure apiList.category is correctly defined
            try {
              const response = await API.post(url, { name: values.category });
              console.log('Response from API:', response.data);
              resetForm(); // Reset the form after submission
              handleClose(); // Close the modal after successful submission
            } catch (error) {
              console.error('Error adding category:', error);
            }
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoFocus
                        margin="dense"
                        label="Category Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.category && Boolean(errors.category)}
                        helperText={touched.category && errors.category}
                        required
                      />
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default AddCategory;
