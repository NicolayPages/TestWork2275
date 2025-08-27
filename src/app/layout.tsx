import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import styles from './layout.module.scss';
import { config } from '@/constants/config';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import '@/ui/styles/globals.scss';
import { AuthInitializer } from '@/components/AuthInitializer';

const fontRoboto = Roboto({
  subsets: ['cyrillic'],
  variable: '--font-roboto',
});

const { title, description } = config;

export const metadata: Metadata = {
  title,
  description,
};

interface IRoot {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<IRoot>) {
  return (
    <html lang='ru'>
      <body className={`${fontRoboto.variable}`}>
        <div className={styles.wrapper}>
          <Header />
          <main className={styles.container}>{children}</main>
          <Footer />
          <AuthInitializer />
        </div>
      </body>
    </html>
  );
}
