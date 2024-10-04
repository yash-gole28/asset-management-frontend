import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Select, MenuItem, Typography, Button, FormHelperText } from '@mui/material';
import { apiList } from '../apiList';
import { API } from '../network';
import { MyContext } from '../Context/AuthContext';

// Define validation schema
const validationSchema = Yup.object({
    employee: Yup.string().required('Employee name is required'),
    assetCategory: Yup.string().required('Asset category is required'),
    asset: Yup.string().required('Asset name is required'),
});
interface ModalProps {
    popValue:React.Dispatch<React.SetStateAction<boolean>>;
    pop:boolean
  }
const AssetRequestForm: React.FC<ModalProps> = ({popValue ,pop})  => {
    const [availableAssets, setAvailableAssets] = useState<any[]>([]);
    const [employees, setEmployees] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const context = useContext(MyContext);

    if (!context) {
        throw new Error('AssetRequestForm must be used within a MyProvider');
    }

    const { getCurrentUser } = context;

    const fetchData = async () => {
        try {
            await getCurrentUser(); // Call the current user API
            const url =apiList.getAllActiveUsers
            const userResponse = await API.get(url);
            if (userResponse.data.success) {
                setEmployees(userResponse.data.users);
            }

            const categoryResponse = await API.get(apiList.getActiveCategories);
            if (categoryResponse.data.success) {
                console.log(categoryResponse.data)
                setCategories(categoryResponse.data.category);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAssetsByCategory = async (categoryId: string) => {
        try {
            const url = `${apiList.getAssetsByCategoryName}/${categoryId}`; // Adjust as needed
            const response = await API.get(url);
            if (response.data.success) {
                setAvailableAssets(response.data.assets); // Assuming assets are returned in the response
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (values: { employee: string; assetCategory: string; asset: string }) => {
        try {
            const response = await API.post(apiList.createRequest, values); 
            if (response.success) {
                console.log('Request submitted successfully:', response.data);
                popValue(()=>!pop)
            }
            console.log(values);
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box
            sx={{
                width: { xs: '90%', sm: '80%', md: '430px' },
                margin: 'auto',
                borderRadius: 2,
                backgroundColor: "white",
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 1,
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
                initialValues={{ employee: '', assetCategory: '', asset: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ touched, errors, setFieldValue, values }) => (
                    <Form>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box>
                                <Typography>Employee Name</Typography>
                                <Select
                                size='small'
                                    name="employee"
                                    fullWidth
                                    value={values.employee}
                                    onChange={(e) => {
                                        setFieldValue('employee', e.target.value);
                                    }}
                                    sx={{ backgroundColor: "white", borderRadius: 1 }}
                                >
                                    <MenuItem value="">
                                        <em>Select Employee</em>
                                    </MenuItem>
                                    {employees.map((employee) => (
                                        <MenuItem key={employee._id} value={employee._id}>
                                            {employee.firstName} {employee.lastName}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.employee && errors.employee && (
                                    <FormHelperText error>{errors.employee}</FormHelperText>
                                )}
                            </Box>
                            

                            <Typography sx={{ marginTop: 2 }}>Asset Category</Typography>
                            <Select
                            size='small'
                                name="assetCategory"
                                fullWidth
                                value={values.assetCategory}
                                onChange={async (e) => {
                                    const categoryId = e.target.value as string;
                                    setFieldValue('assetCategory', categoryId);
                                    await fetchAssetsByCategory(categoryId); // Fetch assets for the selected category
                                }}
                                sx={{ backgroundColor: "white", borderRadius: 1 }}
                            >
                                <MenuItem value="">
                                    <em>Select Asset Category</em>
                                </MenuItem>
                                {categories?.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>
                                        {category.category} {/* Assuming the category has a name property */}
                                    </MenuItem>
                                ))}
                            </Select>
                            {touched.assetCategory && errors.assetCategory && (
                                <FormHelperText error>{errors.assetCategory}</FormHelperText>
                            )}

                            <Typography sx={{ marginTop: 2 }}>Asset</Typography>
                            <Select
                            size='small'
                                name="asset"
                                fullWidth
                                value={values.asset}
                                onChange={(e) => setFieldValue('asset', e.target.value)}
                                disabled={!values.assetCategory} // Disable if no category is selected
                                sx={{ backgroundColor: "white", borderRadius: 1 }}
                            >
                                <MenuItem value="">
                                    <em>Select Asset</em>
                                </MenuItem>
                                {availableAssets.map((asset) => (
                                    <MenuItem key={asset._id} value={asset._id}>
                                        {asset.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {touched.asset && errors.asset && (
                                <FormHelperText error>{errors.asset}</FormHelperText>
                            )}

                            <Button
                                type="submit"
                                sx={{
                                    width: '100%',
                                    height: 36,
                                    marginTop: 2,
                                    marginBottom: 2,
                                    borderRadius: 1,
                                    textTransform: 'none',
                                }}
                                variant='contained'
                            >
                                Submit
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default AssetRequestForm;
