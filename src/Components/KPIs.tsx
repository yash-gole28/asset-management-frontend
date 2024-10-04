import React from 'react'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
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
        height: '100px',
        [theme.breakpoints.down('sm')]: {
            height: '60px'
        },
        backgroundColor: 'inherit',

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
            <Grid container spacing={{ xs: '10px', sm: "15px", md: '15px' }}>
                <Grid size={{ xs: 6, sm: 6, md: 3 }}>
                    <Item sx={{ backgroundColor: '', position: 'relative', overflow: 'hidden' }}>
                        <CustomGrid>
                            <Box sx={{ pl: { xs: '0px', sm: '1rem', md: '1rem' }, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', height: '100%' }}>
                                <Typography variant='h6' sx={{ fontSize: "15px" }}>
                                    Total assets
                                </Typography>
                                <Typography variant='h3' sx={{ fontSize: { xs: '22px', sm: '25px', md: '35px' } }}>
                                    {totalCounts}
                                </Typography>
                                <InventoryIcon sx={{ fontSize: { xs: '50px', sm: '50px', md: '60px' }, color: 'rgb(250, 176, 68)', borderRadius: '50%', position: 'absolute', right: '15px', backgroundColor: 'rgb(255, 241, 218)', padding: '1rem' }} />
                            </Box>

                        </CustomGrid>
                    </Item>
                </Grid>
                <Grid size={{ xs: 6, sm: 6, md: 3 }}>
                    <Item sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CustomGrid>
                            <Box sx={{ pl: { xs: '0px', sm: '1rem', md: '1rem' }, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', height: '100%' }}>
                                <Typography variant='h6' sx={{ fontSize: "15px" ,zIndex:"100"}}>
                                    Allocated Assets
                                </Typography>
                                <Typography variant='h3' sx={{ fontSize: { xs: '22px', sm: '25px', md: '35px' } }}>
                                    {allocatedCount}
                                </Typography>
                                <AssignmentIndIcon sx={{ fontSize: { xs: '50px', sm: '50px', md: '60px' }, color: 'rgb(118, 122, 245)',
                                 borderRadius: '50%', backgroundColor: 'rgb(228, 228, 254)', padding: '1rem', position: 'absolute', right: '15px' }} />
                            </Box>
                        </CustomGrid>
                    </Item>
                </Grid>
                <Grid size={{ xs: 6, sm: 6, md: 3 }}>
                    <Item sx={{  position: 'relative', overflow: 'hidden' }}>
                        <CustomGrid>
                            <Box sx={{ pl: { xs: '0px', sm: '1rem', md: '1rem' }, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', height: '100%' }}>
                                <Typography variant='h6' sx={{ fontSize: "15px", textAlign: 'start',zIndex:"100" }}>
                                    Assets under Maintenance
                                </Typography>
                                <Typography variant='h3' sx={{ fontSize: { xs: '22px', sm: '25px', md: '35px' } }}>
                                    {underMaintenanceCount}
                                </Typography>
                                <BuildIcon sx={{ fontSize: { xs: '50px', sm: '50px', md: '60px' }, position: 'absolute',padding: '1rem', right: '15px',borderRadius: '50%',color:"rgb(240, 158, 127)",backgroundColor: 'rgb(253, 234, 228)' }}  />
                            </Box>
                        </CustomGrid>
                    </Item>
                </Grid>
                <Grid size={{ xs: 6, sm: 6, md: 3 }}>
                    <Item sx={{  position: 'relative', overflow: 'hidden' }}>
                        <CustomGrid>
                            <Box sx={{ pl: { xs: '0px', sm: '1rem', md: '1rem' }, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', height: '100%' }}>
                                <Typography variant='h6' sx={{ fontSize: "15px",zIndex:"100" }}>
                                    Available Assets
                                </Typography>
                                <Typography variant='h3' sx={{ fontSize: { xs: '22px', sm: '25px', md: '35px' } }}>
                                    {nonAllocatedAssets}
                                </Typography>
                                <KeyboardIcon sx={{ fontSize: { xs: '50px', sm: '50px', md: '60px' },padding: '1rem',  right: '15px',borderRadius: '50%',color:"rgb(133, 136, 246)",backgroundColor: 'rgb(253, 234, 228)', position: 'absolute' }} />
                            </Box>
                        </CustomGrid>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default KPIs