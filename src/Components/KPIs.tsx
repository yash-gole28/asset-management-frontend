import React from 'react'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import data from './../Data.json'

const KPIs = () => {
    const nonAllocatedAssets = data.totalAssets - (data.totalApprovedAssets + data.assetsUnderMaintenance) 
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
        minHeight: '100px',
        backgroundColor: '#fff',

    }));

    return (
        <Box sx={{ p: { xs: 1, sm: 1, md: 2 } }}>
            <Grid container spacing={{ xs: 1, sm: 1, md: 2 }}>
                <Grid size={{ xs: 6, md: 3 }}>
                    <Item>
                        <CustomGrid>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                <Typography variant='h6'>
                                    Total assets
                                </Typography>
                                <Typography variant='h3'>
                                    {data.totalAssets}
                                </Typography>

                            </Box>

                        </CustomGrid>
                    </Item>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                    <Item>
                        <CustomGrid>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                <Typography variant='h6'>
                                    Total assets
                                </Typography>
                                <Typography variant='h3'>
                                    {data.totalApprovedAssets}
                                </Typography>

                            </Box>
                        </CustomGrid>
                    </Item>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                    <Item>
                        <CustomGrid>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                <Typography variant='h6'>
                                    Assets under Maintenance
                                </Typography>
                                <Typography variant='h3'>
                                    {data.assetsUnderMaintenance}
                                </Typography>

                            </Box>
                        </CustomGrid>
                    </Item>
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                    <Item>
                        <CustomGrid>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                <Typography variant='h6'>
                                    available assets
                                </Typography>
                                <Typography variant='h3'>
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