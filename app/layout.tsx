// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../components/Header'; 
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aniyume - Онлайн-платформа для просмотра аниме',
  description: 'Смотрите аниме онлайн, ищите по жанрам и сохраняйте любимые сериалы в профиле.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header /> 
        <main className="container mx-auto p-4 min-h-screen">
          {children}
        </main>
        <Footer /> 
      </body>
    </html>
  );
}