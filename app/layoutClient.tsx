'use client';

import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimeCarousel from '../components/AnimeCarousel';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const noLayoutPages = ['/login', '/register'];
  const hideLayout = noLayoutPages.includes(pathname);

  const hideCarousel = pathname.startsWith('/anime/');

  return (
    <>
      {!hideLayout && <Header />}

      {!hideLayout && !hideCarousel && (
        <>
          <h1 className="md:text-8xl font-extrabold text-center my-1 bg-linear-to-br from-[#000000] via-[#3b3a3a] to-[#000000] bg-clip-text text-transparent">
            Новинки!
          </h1>
          <AnimeCarousel />
        </>
      )}

      <main className="container mx-auto p-4 min-h-screen">{children}</main>

      {!hideLayout && <Footer />}
    </>
  );
}
