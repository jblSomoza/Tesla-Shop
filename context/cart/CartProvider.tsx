import { FC, useEffect, useReducer, useRef } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './'


export interface CartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE : CartState = {
    cart: []
}

interface Props {
    children : JSX.Element | JSX.Element[]
}

export const CartProvider:FC<Props> = ({ children }) => {

     const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
     const isCartReloading = useRef(true);

     useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
            dispatch({ type: 'Cart - LoadCart from cookies | storage', payload: cookieProducts })
        } catch (error) {
            dispatch({ type: 'Cart - LoadCart from cookies | storage', payload: [] })
        }

     }, [])
     

     useEffect(() => {
        if(isCartReloading.current){
            isCartReloading.current = false;
        }else{
            Cookie.set('cart', JSON.stringify( state.cart ));
        }
     }, [state.cart])
     

     const addProductToCart = (product : ICartProduct) => {
        const productsInCart = state.cart.some( p => p._id === product._id);

        if(!productsInCart ) return dispatch({ type: 'Cart - Update products in cart', payload : [...state.cart, product ]});

        const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size );

        if(!productInCartButDifferentSize) return dispatch({ type: 'Cart - Update products in cart', payload : [...state.cart, product ]});

        const updatedProducts = state.cart.map( p => {
            if(p._id !== product._id) return p;

            if(p.size !== product.size) return p;

            p.quantity += product.quantity;

            return p;
        });

        return dispatch({ type: 'Cart - Update products in cart', payload : updatedProducts});
     }

     return (
          <CartContext.Provider value={{
               ...state,

               addProductToCart
           }}>
               { children }
          </CartContext.Provider>
     )
}