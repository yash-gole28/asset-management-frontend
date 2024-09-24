import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import PersonIcon from '@mui/icons-material/Person';
import data from './../../Data.json'

const Profile = () => {
    return (
        <Box>
            <Typography sx={{ padding: '15px', fontWeight: '600' }} variant='h6'>Profile</Typography>
            <Box sx={{ flexGrow: 1, margin: '0px 15px' }}>
                <Grid container spacing={'15px'}>
                    <Grid size={{ xs: 12, sm: 12, md: 4 }}>
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
                    <Grid size={{xs:12 , sm:12 , md:8}}>
                        <Box sx={{ backgroundColor: '#fff', padding: '15px' }}>
                            <Typography>My Assets</Typography>
                            
                        </Box>
                        <TableContainer component={Paper}>
                                <Table size='small' aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Asset</TableCell>
                                            <TableCell align="right">Modal Number</TableCell>
                                            <TableCell align="right">Serial Number</TableCell>
                                        
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.requestData.map((d , index) => (
                                            
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            
                                                <TableCell align="right">{d.assets_name}</TableCell>
                                                <TableCell align="right">{d.modal_number}</TableCell>
                                                <TableCell align="right">---</TableCell>
                                              
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