import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import '../styles/globals.css'
import { lightTheme } from '../themes';
import { AuthProvider, CartProvider, UiProvider } from '../context';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT || '' }}>
        <SWRConfig 
          value={{
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
          <AuthProvider>
            <CartProvider>
              <UiProvider>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </UiProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  )
}

export default MyApp
