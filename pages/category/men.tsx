import React from 'react';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { useProducts } from '../../hooks';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';

const MenPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout title={'Teslo Shop - Mens'} pageDescription={'Encuentra los mejores productos para hombres'}>
      <Typography variant='h1' component={'h1'}>Hombres</Typography>
      <Typography variant='h2' sx={{ mb: 1}}>Productos para Hombres</Typography>

      {
        isLoading
        ? <FullScreenLoading />
        : <ProductList products={ products } />
      }
      
    </ShopLayout>
  )
}

export default MenPage