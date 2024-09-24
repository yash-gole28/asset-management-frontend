import React from 'react'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import data from './../Data.json'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BuildIcon from '@mui/icons-material/Build';
import InventoryIcon from '@mui/icons-material/Inventory';
import KeyboardIcon from '@mui/icons-material/Keyboard';


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
        <Box>
            <Grid container spacing={{ xs: 1, sm: 1, md:'15px' }}>
                <Grid size={{ xs: 6,sm:6, md: 3 }}>
                    <Item sx={{backgroundColor:'rgb(168, 231, 192)',position:'relative',overflow:'hidden',boxShadow:1}}>
                        <CustomGrid>
                            <Box sx={{pl:'1rem', display: 'flex', flexDirection: 'column', alignItems: 'start',justifyContent:'center',height:'100%' }}>
                                <Typography variant='h6' sx={{fontSize:"15px"}}>
                                    Total assets
                                </Typography>
                                <Typography variant='h3' sx={{fontSize:{xs:'22px',sm:'25px',md:'35px'}}}>
                                    {totalCounts}
                                </Typography>
                                <InventoryIcon sx={{fontSize:{xs:'80px',sm:'90px',md:'100px'},opacity:'0.3',position:'absolute',right:'0px'}}/>
                            </Box>

                        </CustomGrid>
                    </Item>
                </Grid>
                <Grid size={{ xs: 6,sm:6, md: 3 }}>
                    <Item sx={{backgroundColor:'rgb(247, 195, 195)',position:'relative',overflow:'hidden',boxShadow:1}}>
                        <CustomGrid>
                            <Box sx={{pl:'1rem', display: 'flex', flexDirection: 'column', alignItems: 'start',justifyContent:'center',height:'100%' }}>
                                <Typography variant='h6' sx={{fontSize:"15px"}}>
                                    Allocated Assets
                                </Typography>
                                <Typography variant='h3' sx={{fontSize:{xs:'22px',sm:'25px',md:'35px'}}}>
                                    {allocatedCount}
                                </Typography>
                                <AssignmentIndIcon sx={{fontSize:{xs:'80px',sm:'90px',md:'100px'},opacity:'0.3',position:'absolute',right:'0px'}}/>
                            </Box>
                        </CustomGrid>
                    </Item>
                </Grid>
                <Grid size={{ xs: 6,sm:6, md: 3 }}>
                    <Item sx={{backgroundColor:'rgb(201, 210, 239)',position:'relative',overflow:'hidden',boxShadow:1}}>
                        <CustomGrid>
                            <Box sx={{pl:'1rem', display: 'flex', flexDirection: 'column', alignItems: 'start',justifyContent:'center',height:'100%' }}>
                                <Typography variant='h6' sx={{fontSize:"15px",textAlign:'start'}}>
                                    Assets under Maintenance
                                </Typography>
                                <Typography variant='h3' sx={{fontSize:{xs:'22px',sm:'25px',md:'35px'}}}>
                                    {underMaintenanceCount}
                                </Typography>
                                <BuildIcon sx={{fontSize:{xs:'80px',sm:'90px',md:'100px'},opacity:'0.3',position:'absolute',right:'0px'}}/>
                            </Box>
                        </CustomGrid>
                    </Item>
                </Grid>
                <Grid size={{ xs: 6,sm:6, md: 3 }}>
                    <Item sx={{backgroundColor:'rgb(241, 193, 244)',position:'relative',overflow:'hidden',boxShadow:1}}>
                        <CustomGrid>
                            <Box sx={{pl:'1rem', display: 'flex', flexDirection: 'column', alignItems: 'start',justifyContent:'center',height:'100%' }}>
                                <Typography variant='h6' sx={{fontSize:"15px"}}>
                                    Available Assets
                                </Typography>
                                <Typography variant='h3' sx={{fontSize:{xs:'22px',sm:'25px',md:'35px'}}}>
                                    {nonAllocatedAssets}
                                </Typography>
                                <KeyboardIcon sx={{fontSize:{xs:'80px',sm:'90px',md:'100px'},opacity:'0.3',position:'absolute',right:'0px'}}/>
                            </Box>
                        </CustomGrid>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default KPIs