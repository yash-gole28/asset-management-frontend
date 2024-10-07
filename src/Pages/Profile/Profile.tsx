import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import PersonIcon from '@mui/icons-material/Person';
import { MyContext } from '../../Context/AuthContext';
import { API } from '../../network';
import { apiList } from '../../apiList';
import dayjs from 'dayjs';

interface profileData {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    department: string;
    role: string;
}

const Profile = () => {
    const [userProfile, setUserProfile] = useState<profileData | null>(null)
    const [assets, setAssets] = useState<any[] | null>(null)
    const context = useContext(MyContext)
    const [loading, setLoading] = useState(true);


    if (!context) {
        throw new Error('Assets component must be used within a MyProvider');
    }
    const { getCurrentUser, value } = context

    const getUserAssets = async () => {
        try {
            setLoading(true)
            const url = apiList.userAssets
            const response = await API.get(url)
            if (response.data.success) {
                console.log(response.data.assets)
                setAssets(response.data.assets)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getUserData = async () => {
        try {
            const url = apiList.getProfileData
            const response = await API.get(url)
            if (response.data.success) {
                setUserProfile(response.data.user)
                getUserAssets()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCurrentUser()
        getUserData()


    }, [])
    return (
        <Box>

            <Box sx={{ flexGrow: 1, padding: '15px' }}>
                <Grid container spacing={{ xs: '10px', sm: '10px', md: '15px' }}>
                    <Grid sx={{ backgroundColor: '#fff' }} size={{ xs: 12, sm: 12, md: 4 }}>
                        <Box sx={{ backgroundColor: '#fff', display: 'flex', color: 'grey', flexDirection: 'column', alignItems: 'center', padding: '15px', borderRadius: '4px', position: 'relative' }}>
                            <Typography sx={{ padding: { xs: '10px', sm: '10px', md: '15px' }, fontWeight: '600', position: 'absolute', top: '0px', left: '0px', color: '#495057' }}>Profile</Typography>
                            <Box sx={{ backgroundColor: 'rgb(201, 210, 239)', width: 'fit-content', borderRadius: '50%', margin: 'auto', mt: '30px' }}>
                                <PersonIcon sx={{ fontSize: { xs: '70px', sm: '80px', md: '90px' }, color: '#fff' }} />
                            </Box>
                            <Typography>{userProfile?.firstName} {userProfile?.lastName}</Typography>


                        </Box>
                    </Grid>
                    <Grid sx={{ backgroundColor: '#fff' }} size={{ xs: 12, sm: 12, md: 8 }}>
                        <Typography sx={{ padding: { xs: '10px', sm: '10px', md: '15px' }, fontWeight: '600', backgroundColor: '#fff', color: '#495057' }}>Details</Typography>
                        <Box sx={{ flexGrow: 1, padding: '15px', paddingTop: '0px' }}>
                            <Grid container spacing='15px'>
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <TextField
                                        disabled
                                        label="First Name"
                                        value={userProfile?.firstName || ''}
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <TextField
                                        disabled
                                        label="Middle Name"
                                        value={userProfile?.middleName || ''}
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <TextField
                                        disabled
                                        label="Last Name"
                                        value={userProfile?.lastName || ''}
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <TextField
                                        disabled
                                        label="Department"
                                        value={userProfile?.department || ''}
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <TextField
                                        disabled
                                        label="Role"
                                        value={userProfile?.role || ''}
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <TextField
                                        disabled
                                        label="Email"
                                        value={userProfile?.email || ''}
                                        fullWidth
                                        margin="normal"
                                        size="small"

                                    />
                                </Grid>


                            </Grid>
                        </Box>




                    </Grid>
                    <Grid sx={{ backgroundColor: '#fff', padding: '15px' }} size={{ xs: 12, sm: 12, md: 12 }}>
                        <Box>
                            <Typography sx={{ fontWeight: '600', mb: '15px', color: '#495057' }}>My Assets</Typography>

                        </Box>
                        <TableContainer sx={{
                            width: { xs: "100%", sm: "100%" },
                            borderRadius: "4px",
                            backgroundColor: "white",
                            boxShadow: ' 0 0 3px rgb(198, 200, 205)',
                            // position: "relative",
                            padding: { xs: '0px', sm: '0px 10px', md: '0px 15px' }
                        }}>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                        zIndex: '200'
                                    }}
                                />
                            )}
                            <Table size='small' aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: '600', color: '#495057' }} align='center'>Asset</TableCell>
                                        <TableCell sx={{ fontWeight: '600', color: '#495057' }} align='center'>Category</TableCell>
                                        <TableCell sx={{ fontWeight: '600', color: '#495057' }} align="center">Modal Number</TableCell>
                                        <TableCell sx={{ fontWeight: '600', color: '#495057' }} align="center">Service tag</TableCell>
                                        <TableCell sx={{ fontWeight: '600', color: '#495057' }} align="center">Assigned Date</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {assets?.map((asset, index) => (

                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >

                                            <TableCell align="center">{asset.asset_id.name}</TableCell>
                                            <TableCell align="center">{asset.asset_id.type.category}</TableCell>
                                            <TableCell align="center">{asset.asset_id.model_number}</TableCell>
                                            <TableCell align="center">{asset.asset_id.service_tag}</TableCell>
                                            <TableCell align="center">{dayjs(asset.updatedAt).format('MM/D/YYYY')}</TableCell>


                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    )
}

export default Profile