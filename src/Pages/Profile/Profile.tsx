import { Box, Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import PersonIcon from '@mui/icons-material/Person';
import { MyContext } from '../../Context/AuthContext';
import { API } from '../../network';
import { apiList } from '../../apiList';
import dayjs from 'dayjs';

interface profileData {
    firstName : string;
    middleName:string;
    lastName : string;
    email : string;
    department: string;
    role : string;
}

const Profile = () => {
    const [userProfile , setUserProfile] = useState<profileData | null>(null)
    const [assets , setAssets] = useState<any[] | null>(null)
    const context = useContext(MyContext)

  
  if (!context) {
    throw new Error('Assets component must be used within a MyProvider');
  }
  const {getCurrentUser , value} = context

  const getUserAssets = async () => {
    try{
        const url = apiList.userAssets
        const response = await API.get(url)
        if(response.data.success){
            console.log(response.data.assets)
            setAssets(response.data.assets)
        }
    }catch(error){
        console.log(error)
    }
  }

  const getUserData = async () => {
    try{
        const url = apiList.getProfileData
        const response = await API.get(url)
        if(response.data.success){
            setUserProfile(response.data.user)
            getUserAssets()
        }
    }catch(error){
        console.log(error)
    }
  }
   
  useEffect(()=>{
    getCurrentUser()
            getUserData()
   
   
  },[])
    return (
        <Box>
            <Typography sx={{ padding:{xs:'10px',sm:'10px',md:'15px'}, fontWeight: '600' }} variant='h6'>Profile</Typography>
            <Box sx={{ flexGrow: 1, margin: '0px 15px' }}>
                <Grid container spacing={{xs:'10px',sm:'10px',md:'15px'}}>
                    <Grid sx={{backgroundColor: '#fff'}} size={{ xs: 12, sm: 12, md: 4 }}>
                        <Box sx={{ backgroundColor: '#fff', display: 'flex', color: 'grey', flexDirection: 'column', alignItems: 'center', padding: '15px', borderRadius: '4px' }}>
                            
                            <Box sx={{ backgroundColor: 'rgb(201, 210, 239)', width: 'fit-content', borderRadius: '50%', margin: 'auto' }}>
                                <PersonIcon sx={{ fontSize: '100px', color: '#fff' }} />
                            </Box>
                            <Typography>{userProfile?.firstName} {userProfile?.lastName}</Typography>
                            <Typography>department - {userProfile?.department}</Typography>
                            <Typography>role - {userProfile?.role}</Typography>
                            <Typography>{userProfile?.email}</Typography>

                        </Box>
                    </Grid>
                    <Grid sx={{backgroundColor: '#fff'}}  size={{ xs: 12, sm: 12, md: 8 }}>
                        <Typography sx={{ padding:{xs:'10px',sm:'10px',md:'15px'}, fontWeight: '600', backgroundColor:{xs:'rgb(242, 244, 247)',sm:'rgb(242, 244, 247)',md:'#fff'}}} variant='h6'>Edit Profile</Typography>
                        <Box sx={{ backgroundColor: '#fff',padding:'15px' }}>
                           

                        </Box>
                    </Grid>
                    <Grid size={{xs:12 , sm:12 , md:12}}>
                        <Box>
                        <Typography sx={{ fontWeight: '600' }} variant='h6'>My Assets</Typography>
                            
                        </Box>
                        <TableContainer component={Paper}>
                                <Table size='small' aria-label="simple table">
                                    <TableHead sx={{backgroundColor:'rgb(177, 191, 238)'}}>
                                        <TableRow>
                                            <TableCell sx={{fontWeight:'600'}} align='center'>Asset</TableCell>
                                            <TableCell sx={{fontWeight:'600'}} align='center'>Category</TableCell>
                                            <TableCell sx={{fontWeight:'600'}} align="center">Modal Number</TableCell>
                                            <TableCell sx={{fontWeight:'600'}} align="center">Service tag</TableCell>
                                            <TableCell sx={{fontWeight:'600'}} align="center">Assigned Date</TableCell>
                                        
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {assets?.map((asset , index) => (
                                            
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            
                                                <TableCell align="center">{asset.asset_id.name}</TableCell>
                                                <TableCell align="center">{asset.asset_id.type.category}</TableCell>
                                                <TableCell align="center">{asset.asset_id.model_number}</TableCell>
                                                <TableCell align="center">{asset.asset_id.service_tag}</TableCell>
                                                <TableCell align="center">{dayjs(asset.updatedAt).format('MMMM D, YYYY')}</TableCell>
                                            
                                              
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