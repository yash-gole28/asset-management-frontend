

import { Box, TextField, Typography, Button, MenuItem } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { apiList } from '../../apiList';
import { API } from '../../network';
import { MyContext } from '../../Context/AuthContext';

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  type: Yup.string().required('Type is required'),
  companyName: Yup.string().required('Company Name is required'),
  modelNumber: Yup.string().required('Model Number is required'),
  serviceTag: Yup.string().required('Service Tag is required'),
  description:Yup.string()

});

interface Category {
  _id: number;
  category: string;
}
interface ModalProps {
  popValue:React.Dispatch<React.SetStateAction<boolean>>;
  pop:boolean
}
const MyForm: React.FC<ModalProps> = ({popValue ,pop}) => {
  const [categories , setCategories] = useState<Category[]>([])
  const context = useContext(MyContext)

  if (!context) {
    throw new Error('UserComponent must be used within a MyProvider');
}

  const {value , getCurrentUser} = context

  const handleSubmit = async(values: {
    name: string;
    type: string;
    companyName: string;
    modelNumber: string;
    serviceTag: string;
  }) => {
    try{
      const extendedValues = {
        ...values,
       registeredBy:value
      };
      console.log(extendedValues)
      const url = apiList.registerAsset
      const response = await API.post(url , {data:extendedValues})
      if(response.success){
        popValue(()=>!pop)
      }
    }catch(error){
      console.error(error);
    } 

  };

  const getAssetCategories = async () => {
    try{
      const url = apiList.getCategories
      const response = await API.get(url)
      if(response.data.success){
          setCategories(response.data.categories)
      }
    }catch(error){
      console.log(error)
    }
  }


  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      getCurrentUser()
      getAssetCategories()
    }else{
      toast('session expired')
    }
  },[])
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
            description:''
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
              
                 placeholder={value}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.type && Boolean(errors.type)}
                helperText={<ErrorMessage name="type" />}
              >
              
                  <MenuItem value="">
                  Categorie
              </MenuItem>
                {categories.map((data)=>(
                  <MenuItem key={data._id} value={data._id}>{data.category}</MenuItem>
                ))}
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
                name="description"
                placeholder="Description"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.description && Boolean(errors.description)}
                helperText={<ErrorMessage name="description" />}
              />

              {/* <Field
                as={TextField}
                name="allocation"
                placeholder="Allocation"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.allocation && Boolean(errors.allocation)}
                helperText={<ErrorMessage name="allocation" />}
              /> */}

              {/* <Field
                as={TextField}
                name="registeredBy"
                placeholder="Registered By"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ marginBottom: 2, backgroundColor: "white", borderRadius: 1 }}
                error={touched.registeredBy && Boolean(errors.registeredBy)}
                helperText={<ErrorMessage name="registeredBy" />}
              /> */}

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





