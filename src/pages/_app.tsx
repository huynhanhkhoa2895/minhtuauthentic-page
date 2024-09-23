import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AppProvider } from '@/contexts/appContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OrderProvider } from '@/contexts/orderContext';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <OrderProvider>
        <main>
          <Component {...pageProps} />
          <ToastContainer />
        </main>
      </OrderProvider>
    </AppProvider>
  );
}
