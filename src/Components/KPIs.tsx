import React from 'react'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import data from './../Data.json'

const KPIs = () => {
    
    const Item = styled(Paper)(({ theme }) => ({
        boxShadow: '0px 0px 0px #fff',
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));
    const CustomGrid = styled(Paper)(({ theme }) => ({
        boxShadow: '0px 0px 0px #fff',
        height:'100px',
        [theme.breakpoints.down('sm')]: {
            height:'60px'
          },
        backgroundColor:'inherit',

    }));
    let totalCounts = 0;
    let allocatedCount = 0;
    let underMaintenanceCount = 0;
  
    data.CategoryData.forEach(item => {
      totalCounts += parseInt(item.count);
      allocatedCount += parseInt(item.allocated);
      underMaintenanceCount += parseInt(item.underMaintenance);
    });

    const nonAllocatedAssets = totalCounts - (allocatedCount + underMaintenanceCount) 

    return (
        <Box sx={{ p: { xs: 1, sm: 1, md: 3 } }}>
            <Grid container spacing={{ xs: 1, sm: 1, md: 2 }}>
                <Grid size={{ xs: 12,sm:6, md: 3 }}>
                    <Item sx={{backgroundColor:'rgb(168, 231, 192)'}}>
                        <CustomGrid>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start',justifyContent:'center',height:'100%' }}>
                                <Typography variant='h6' sx={{fontSize:"15px"}}>
                                    Total assets
                                </Typography>
                                <Typography variant='h3' sx={{fontSize:{xs:'22px',sm:'25px',md:'35px'}}}>
                                    {totalCounts}
                                </Typography>

                            </Box>

                        </CustomGrid>
                    </Item>
                </Grid>
                <Grid size={{ xs: 12,sm:6, md: 3 }}>
                    <Item sx={{backgroundColor:'rgb(247, 195, 195)'}}>
                        <CustomGrid>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start',justifyContent:'center',height:'100%' }}>
                                <Typography variant='h6' sx={{fontSize:"15px"}}>
                                    Total assets
                                </Typography>
                                <Typography variant='h3' sx={{fontSize:{xs:'22px',sm:'25px',md:'35px'}}}>
                                    {allocatedCount}
                                </Typography>

                            </Box>
                        </CustomGrid>
                    </Item>
                </Grid>
                <Grid size={{ xs: 12,sm:6, md: 3 }}>
                    <Item sx={{backgroundColor:'rgb(201, 210, 239)'}}>
                        <CustomGrid>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start',justifyContent:'center',height:'100%' }}>
                                <Typography variant='h6' sx={{fontSize:"15px"}}>
                                    Assets under Maintenance
                                </Typography>
                                <Typography variant='h3' sx={{fontSize:{xs:'22px',sm:'25px',md:'35px'}}}>
                                    {underMaintenanceCount}
                                </Typography>

                            </Box>
                        </CustomGrid>
                    </Item>
                </Grid>
                <Grid size={{ xs: 12,sm:6, md: 3 }}>
                    <Item sx={{backgroundColor:'rgb(241, 193, 244)'}}>
                        <CustomGrid>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start',justifyContent:'center',height:'100%' }}>
                                <Typography variant='h6' sx={{fontSize:"15px"}}>
                                    available assets
                                </Typography>
                                <Typography variant='h3' sx={{fontSize:{xs:'22px',sm:'25px',md:'35px'}}}>
                                    {nonAllocatedAssets}
                                </Typography>

                            </Box>
                        </CustomGrid>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default KPIs