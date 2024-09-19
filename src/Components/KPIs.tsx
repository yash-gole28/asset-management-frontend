import React from 'react'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const KPIs = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      }));
  return (
    <Box sx={{p:{xs:1 ,sm:1, md:2}}}>
        <Grid container spacing={{xs:1, sm:1 , md:2}}>
        <Grid size={{xs:6 , md:3}}>
          <Item>size=8</Item>
        </Grid>
        <Grid size={{xs:6 , md:3}}>
          <Item>size=4</Item>
        </Grid>
        <Grid size={{xs:6 , md:3}}>
          <Item>size=4</Item>
        </Grid>
        <Grid size={{xs:6 , md:3}}>
          <Item>size=8</Item>
        </Grid>
      </Grid> 
    </Box>
  )
}

export default KPIs