import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnimeCarousel from '../components/AnimeCarousel'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aniyume - Онлайн-платформа для просмотра аниме',
  description: 'Смотрите аниме онлайн, ищите по жанрам и сохраняйте любимые'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
 <h1 className="         
  md:text-8xl    
  font-extrabold 
  text-center
  my-1         

  bg-gradient-to-br
  from-[#000000]
  via-[#3b3a3a]
  to-[#000000]    
  bg-clip-text
  text-transparent
"
>
  Новинки!
</h1>

        <AnimeCarousel />
        <main className="container mx-auto p-4 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
