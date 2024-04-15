import '@/styles/globals.scss'
import { AppProps } from 'next/app';

import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '../contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
   <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </QueryClientProvider>
   </AuthProvider>
  )
}

export default MyApp
