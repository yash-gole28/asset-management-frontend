import { Box, Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Typography } from '@mui/material';
import React from 'react'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import PersonIcon from '@mui/icons-material/Person';
import data from './../../Data.json'

const Profile = () => {
    const newArr = []

    for(let i=0 ;i<data.requestData.length ; i++){
        if(data.requestData[i].name.toLowerCase() === "yash"){
            newArr.push(data.requestData[i])
        }
    }
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
                            <Typography>Yash Gole</Typography>
                            <Typography>Designation</Typography>
                            <Typography>Mobile Number</Typography>
                            <Typography>email</Typography>

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
                                            <TableCell sx={{fontWeight:'600'}} align="center">Modal Number</TableCell>
                                            <TableCell sx={{fontWeight:'600'}} align="center">Serial Number</TableCell>
                                        
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {newArr.map((d , index) => (
                                            
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            
                                                <TableCell align="center">{d.assets_name}</TableCell>
                                                <TableCell align="center">{d.modal_number}</TableCell>
                                                <TableCell align="center">---</TableCell>
                                            
                                              
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