import React from 'react'
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts'
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import { ProductList } from '../../components/products';

const KidPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout title={'Teslo Shop - Kid'} pageDescription={'Encuentra los mejores productos para Niños'}>
      <Typography variant='h1' component={'h1'}>Niños</Typography>
      <Typography variant='h2' sx={{ mb: 1}}>Productos para niños</Typography>

      {
        isLoading
        ? <FullScreenLoading />
        : <ProductList products={ products } />
      }
      
    </ShopLayout>
  )
}

export default KidPage