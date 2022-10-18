import { Grid, Typography } from '@mui/material'
import React from 'react'

export const OrdenSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No. de productos</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>3</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>SubTotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{`$ ${155.00}`}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Impuestos (15%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{`$ ${35.00}`}</Typography>
        </Grid>

        <Grid item xs={6} sx={{ mt: 2}}>
            <Typography variant='subtitle1'>Total:</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography variant='subtitle1'>{`$ ${185.00}`}</Typography>
        </Grid>
    </Grid>
  )
}
