import React from 'react';
import NextLink from 'next/link'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';;
import { Chip, Grid, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

const columns : GridColDef[] = [
    { field: 'id', headerName:'ID', width: 100},
    { field: 'fullName', headerName:'Nombre Completo', width: 300},
    { field: 'paid', headerName: 'Pagada', width:200,
        description: 'Muestra informacion si esta pagada',
        renderCell: (params : GridRenderCellParams) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='Pagada' variant='outlined' />
                    : <Chip color='error' label='No Pagada' variant='outlined' />
            )
        }
    },
    { field: 'no-orden', headerName: 'Ver Orden', width:200,
        sortable:false,
        renderCell: (params : GridRenderCellParams) => {
            return (
               <NextLink href={`/orders/${params.row.id}`} passHref>
                <Link underline='always'>Ver Orden</Link>
               </NextLink>
            )
        }
    }
]

const rows = [
    { id: 1, paid: true, fullName: 'Jhony Lopez'},
    { id: 2, paid: true, fullName: 'Fredy Joachin'},
    { id: 3, paid: false, fullName: ' '},
    { id: 4, paid: false, fullName: 'Jhony Lopez'},
    { id: 5, paid: true, fullName: 'Jhony Lopez'},
    { id: 6, paid: false, fullName: 'Jhony Lopez'},
    { id: 7, paid: true, fullName: 'Jhony Lopez'},
    { id: 8, paid: true, fullName: 'Jhony Lopez'},
    { id: 9, paid: true, fullName: 'Jhony Lopez'},
    { id: 10, paid: false, fullName: 'Jhony Lopez'},
    { id: 11, paid: false, fullName: 'Jhony Lopez'},
    { id: 12, paid: false, fullName: 'Jhony Lopez'}
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Historial de Ordenes' pageDescription='Historial de ordenes del cliente'>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

        <Grid container>
            <Grid item xs={12} sx={{ height:650, width:'100%'}}>
                <DataGrid 
                    rows={rows}
                    columns={ columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default HistoryPage