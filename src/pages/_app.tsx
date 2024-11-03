import '@/styles/globals.css';
import '@/styles/bk.css';
import type { AppProps } from 'next/app';
import { AppProvider } from '@/contexts/appContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OrderProvider } from '@/contexts/orderContext';
import Head from 'next/head';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      gi
      <AppProvider>
        <OrderProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </OrderProvider>
      </AppProvider>
    </>
  );
}
