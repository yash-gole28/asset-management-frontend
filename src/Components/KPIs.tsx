import React, { useEffect, useState } from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BuildIcon from '@mui/icons-material/Build';
import InventoryIcon from '@mui/icons-material/Inventory';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { apiList } from '../apiList';
import { API } from '../network';
import InfoIcon from '@mui/icons-material/Info';

interface kpiStructure {
    allocatedCount: number | null;
    notAllocatedCount: number | null;
}
const KPIs = () => {
    const [data, setData] = useState<kpiStructure | null>(null);
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
    const getData = async () => {
        try {
            const url = apiList.getKpiData
            const response = await API.get(url)
            if (response.data.success) {
                // console.log(response.data)
                setData(response.data.data)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const totalAssets = data ? (data.allocatedCount || 0) + (data.notAllocatedCount || 0) : 0;
    useEffect(() => {
        getData()
    }, [])
    return (
        <Box>
            <Grid container spacing={{ xs: '10px', sm: "15px", md: '15px' }}>
                <Grid size={{ xs: 6, sm: 6, md: 3 }}>
                    <Item sx={{ backgroundColor: '', position: 'relative', overflow: 'hidden' }}>
                        <CustomGrid>
                            <Box sx={{ pl: { xs: '0px', sm: '1rem', md: '1rem' }, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', height: '100%' }}>
                                <Typography onClick={() => console.log(data)} variant='h6' sx={{ fontSize: "14px" }}>
                                    Total assets
                                    <Tooltip title='total Asset count'>
                                        <InfoIcon sx={{fontSize:'14px',color:'grey',position:'relative',top:'2px',left:'4px'}}/>
                                    </Tooltip>
                                </Typography>
                                <Typography variant='h3' sx={{ fontSize: { xs: '18px', sm: '20px', md: '25px' } }}>
                                    {/* {totalCounts} */}
                                    {data && totalAssets}
 
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
                                <Typography variant='h6' sx={{ fontSize: "13px", zIndex: "100" }}>
                                    Allocated Assets
                                    <Tooltip title='Asset count which are allocated'>
                                        <InfoIcon sx={{fontSize:'14px',color:'grey',position:'relative',top:'2px',left:'4px'}}/>
                                    </Tooltip>
                                </Typography>
                                <Typography variant='h3' sx={{ fontSize: { xs: '18px', sm: '20px', md: '25px' } }}>
                                    {/* {allocatedCount} */}
                                    {data?.allocatedCount}
                                </Typography>
                                <AssignmentIndIcon sx={{
                                    fontSize: { xs: '50px', sm: '50px', md: '60px' }, color: 'rgb(118, 122, 245)',
                                    borderRadius: '50%', backgroundColor: 'rgb(228, 228, 254)', padding: '1rem', position: 'absolute', right: '15px'
                                }} />
                            </Box>
                        </CustomGrid>
                    </Item>
                </Grid>
                <Grid size={{ xs: 6, sm: 6, md: 3 }}>
                    <Item sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CustomGrid>
                            <Box sx={{ pl: { xs: '0px', sm: '1rem', md: '1rem' }, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', height: '100%' }}>
                                <Typography variant='h6' sx={{ fontSize: "13px", textAlign: 'start', zIndex: "100" }}>
                                    Under Maintenance
                                    <Tooltip title='Asset count which are under maintenance'>
                                        <InfoIcon sx={{fontSize:'14px',color:'grey',position:'relative',top:'2px',left:'4px'}}/>
                                    </Tooltip>
                                </Typography>
                                <Typography variant='h3' sx={{ fontSize: { xs: '18px', sm: '20px', md: '25px' } }}>
                                    {/* {underMaintenanceCount} */}
                                    {data && 0}
                                </Typography>
                                <BuildIcon sx={{ fontSize: { xs: '50px', sm: '50px', md: '60px' }, position: 'absolute', padding: '1rem', right: '15px', borderRadius: '50%', color: "rgb(240, 158, 127)", backgroundColor: 'rgb(253, 234, 228)' }} />
                            </Box>
                        </CustomGrid>
                    </Item>
                </Grid>
                <Grid size={{ xs: 6, sm: 6, md: 3 }}>
                    <Item sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CustomGrid>
                            <Box sx={{ pl: { xs: '0px', sm: '1rem', md: '1rem' }, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', height: '100%' }}>
                                <Typography variant='h6' sx={{ fontSize: "13px", zIndex: "100" }}>
                                    Available Assets
                                    <Tooltip title='Asset count which are not allocated'>
                                        <InfoIcon sx={{fontSize:'14px',color:'grey',position:'relative',top:'2px',left:'4px'}}/>
                                    </Tooltip>
                                </Typography>
                                <Typography variant='h3' sx={{ fontSize: { xs: '18px', sm: '20px', md: '25px' } }}>
                                    {/* {nonAllocatedAssets} */}
                                    {data?.notAllocatedCount}
                                </Typography>
                                <KeyboardIcon sx={{ fontSize: { xs: '50px', sm: '50px', md: '60px' }, padding: '1rem', right: '15px', borderRadius: '50%', color:" #599168", backgroundColor: '#c5fcd4', position: 'absolute' }} />
                            </Box>
                        </CustomGrid>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default KPIs