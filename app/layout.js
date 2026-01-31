import '@/app/_styles/globals.css';

//Usage of google fonts
//https://www.udemy.com/course/the-ultimate-react-course/learn/lecture/43783724#questions/21898766
import { Josefin_Sans } from 'next/font/google';
import Header from './_components/Header';
import { ReservationProvider } from './_contexts/ReservationContext';
import { AuthProvider } from './_providers/AuthProvider';
const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  // title: 'The wild Oasis',
  title: {
    template: '%s /  The Wild Oasis',
    default: 'Welcome / The Wild Oasis',
  },
  description:
    'Luxurious cabin hotel, located in the hear ot hte Italian Dolomites, surrounded by beautiful mountains nad dark forest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${josefin.className} antialiased  bg-primary-950 text-primary-100 min-h-screen flex flex-col  relative`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full ">
            <AuthProvider>
              <ReservationProvider>
                {children}
              </ReservationProvider>
            </AuthProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
