import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Select, MenuItem, Typography, Button, FormHelperText } from '@mui/material';

// Define a type for assets
type AssetType = {
    [key: string]: string[];
};

// Define assets and their categories
const assets: AssetType = {
    Laptop: ['Dell Laptop', 'HP Laptop'],
    Charger: ['Dell Charger', 'HP Charger'],
    Keyboard: ['Mechanical Keyboard', 'Wireless Keyboard'],
};

// Define a list of employees
const employees = ['Yash Gole', 'Pranav Patil', 'Amruta Gharat', 'Rehana Parveen'];

const validationSchema = Yup.object({
    employee: Yup.string().required('Employee name is required'),
    assetCategory: Yup.string().required('Asset category is required'),
    asset: Yup.string().required('Asset name is required'),
});

const AssetRequestForm: React.FC = () => {
    const [selectedAssetCategory, setSelectedAssetCategory] = useState<string>('');
    const [availableAssets, setAvailableAssets] = useState<string[]>([]);

    const handleAssetCategoryChange = (event: React.ChangeEvent<{ value: unknown }>, setFieldValue: (field: string, value: any) => void) => {
        const category = event.target.value as string; // Cast to string
        setSelectedAssetCategory(category);
        const categoryAssets = assets[category] || [];
        setAvailableAssets(categoryAssets);
        setFieldValue('assetCategory', category); // Update Formik field value
    };

    const handleSubmit = (values: { employee: string; assetCategory: string; asset: string }) => {
        console.log(values);
    };

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
                // alignItems: 'center',
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
                                    name="employee"
                                    fullWidth
                                    value={values.employee} // Use Formik value here
                                    onChange={(e) => setFieldValue('employee', e.target.value)}
                                    sx={{
                                        backgroundColor: "white",
                                        borderRadius: 1,
                                        width: {md:"350"}
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Select Employee</em>
                                    </MenuItem>
                                    {employees.map((employee) => (
                                        <MenuItem key={employee} value={employee}>
                                            {employee}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.employee && errors.employee && (
                                    <FormHelperText error>{errors.employee}</FormHelperText>
                                )}
                            </Box>

                            <Typography sx={{ marginTop: 2 }}>Asset Category</Typography>
                            <Select
                                name="assetCategory"
                                fullWidth
                                value={values.assetCategory} // Use Formik value here
                                onChange={(e:any) => handleAssetCategoryChange(e, setFieldValue)}
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: 1,
                                    width: {md:"350"}
                                }}
                            >
                                <MenuItem value="">
                                    <em>Select Asset Category</em>
                                </MenuItem>
                                {Object.keys(assets).map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                            {touched.assetCategory && errors.assetCategory && (
                                <FormHelperText error>{errors.assetCategory}</FormHelperText>
                            )}

                            <Typography sx={{ marginTop: 2 }}>Asset</Typography>
                            <Select
                                name="asset"
                                fullWidth
                                value={values.asset} // Use Formik value here
                                onChange={(e) => setFieldValue('asset', e.target.value)}
                                disabled={!selectedAssetCategory} // Disable if no category is selected
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: 1,
                                    width: {md:"350"}
                                }}
                            >
                                <MenuItem value="">
                                    <em>Select Asset</em>
                                </MenuItem>
                                {availableAssets.map((asset) => (
                                    <MenuItem key={asset} value={asset}>
                                        {asset}
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
