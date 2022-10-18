import React from 'react'
import { Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import { ProductList } from '../../components/products';

const WomenPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout title={'Teslo Shop - Womens'} pageDescription={'Encuentra los mejores productos para Mujeres'}>
      <Typography variant='h1' component={'h1'}>Mujeres</Typography>
      <Typography variant='h2' sx={{ mb: 1}}>Productos de Mujeres</Typography>

      {
        isLoading
        ? <FullScreenLoading />
        : <ProductList products={ products } />
      }
      
    </ShopLayout>
  )
}

export default WomenPage