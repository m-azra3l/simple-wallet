import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/contexts/themeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Neo-Wallet',
  description: 'Account Abstracted Wallet',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>          
            <ToastContainer />
            <Navbar />
            {children}
            <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
