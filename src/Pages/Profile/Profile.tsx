import { Box, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import PersonIcon from '@mui/icons-material/Person';

const Profile = () => {
    return (
        <Box>
            <Typography sx={{ padding: '15px', fontWeight: '600' }} variant='h6'>Profile</Typography>
            <Box sx={{ flexGrow: 1, margin: '0px 15px' }}>
                <Grid container spacing={'15px'}>
                    <Grid size={{xs:12 , sm:12 , md:4}}>
                        <Box sx={{ backgroundColor: '#fff',display:'flex',color:'grey',flexDirection:'column',alignItems:'center' ,padding:'15px',borderRadius:'4px'}}>
                            <Box sx={{backgroundColor:'rgb(201, 210, 239)',width:'fit-content',borderRadius:'50%',margin:'auto'}}>
                                <PersonIcon sx={{ fontSize: '100px' ,color:'#fff' }} />
                            </Box>
                            <Typography>Yash Gole</Typography>
                            <Typography>Designation</Typography>
                            <Typography>Mobile Number</Typography>
                            <Typography>email</Typography>
                            
                        </Box>
                    </Grid>
                    <Grid size={6}>
                        <Box sx={{ backgroundColor: '#fff' }}>
                            <Typography>slkdfjsldfj</Typography>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    )
}

export default Profile