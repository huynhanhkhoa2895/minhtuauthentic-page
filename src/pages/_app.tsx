import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { AppProvider } from '@/contexts/appContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OrderProvider } from '@/contexts/orderContext';
const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <OrderProvider>
        <main className={roboto.className}>
          <Component {...pageProps} />
          <ToastContainer />
        </main>
      </OrderProvider>
    </AppProvider>
  );
}
