import '@/styles/globals.scss'
import { AppProps } from 'next/app';

import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '../contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FuncionarioProvider } from '@/contexts/FuncionarioContext';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
   <AuthProvider>
     <FuncionarioProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} />
      </QueryClientProvider>
     </FuncionarioProvider>
   </AuthProvider>
  )
}

export default MyApp
