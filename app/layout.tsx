import './globals.css'
import { Inter } from 'next/font/google'
import LayoutClient from './layoutClient'
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aniyume - Онлайн-платформа для просмотра аниме',
  description: 'Смотрите аниме онлайн, ищите по жанрам и сохраняйте любимые'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        
        <LayoutClient>
          {children}<ScrollToTop />
        </LayoutClient>
      </body>
    </html>
  )
}
