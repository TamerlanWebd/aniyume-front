'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FaInstagram,
  FaYoutube,
  FaDiscord,
  FaPlayCircle,
  FaBookOpen,
  FaTags,
  FaCalendarAlt,
  FaNewspaper,
  FaInfoCircle,
  FaEnvelope,
  FaShieldAlt,
  FaBalanceScale,
  FaQuestionCircle
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-linear-to-br from-[#008E7A] via-[#00C9B0] via-[#00C9B0] to-[#008E7A] text-white py-10 mt-10 shadow-[0_0_60px_#00E2C4]/90 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-white rounded-full mix-blend-overlay animate-float"></div>
        <div className="absolute -bottom-1/5 -right-1/6 w-1/2 h-1/3 bg-white rounded-full mix-blend-overlay animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/4 w-1/4 h-1/4 bg-white rounded-full mix-blend-overlay animate-float-alt"></div>
      </div>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        
        <div>
          <Link href="/">
            <Image
              src="/images/oblako.png"
              alt="Aniyume Logo"
              width={500}
              height={400}
              className="h-auto w-auto mb-4 drop-shadow-lg animate-pulse"
            />
          </Link>
          <p className="text-xl mb-4 font-light leading-relaxed">
            Ваш лучший источник для просмотра аниме онлайн. Откройте для себя что-то новое!
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 border-b-2 border-white/50 pb-2">Навигация</h3>
          <ul className="space-y-3">
            <li><Link href="/anime" className="flex items-center gap-3 hover:text-gray-200 transition-colors duration-300 text-lg"><FaPlayCircle /> Аниме</Link></li>
            <li><Link href="/genres" className="flex items-center gap-3 hover:text-gray-200 transition-colors duration-300 text-lg"><FaTags /> Жанры</Link></li>
            <li><Link href="/news" className="flex items-center gap-3 hover:text-gray-200 transition-colors duration-300 text-lg"><FaNewspaper /> Новости</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 border-b-2 border-white/50 pb-2">Полезное</h3>
          <ul className="space-y-3">
            <li><Link href="/about" className="flex items-center gap-3 hover:text-gray-200 transition-colors duration-300 text-lg"><FaInfoCircle /> О нас</Link></li>
            <li><Link href="/privacy" className="flex items-center gap-3 hover:text-gray-200 transition-colors duration-300 text-lg"><FaShieldAlt /> Политика конфиденциальности</Link></li>
            <li><Link href="/terms" className="flex items-center gap-3 hover:text-gray-200 transition-colors duration-300 text-lg"><FaBalanceScale /> Условия использования</Link></li>
            <li><Link href="/faq" className="flex items-center gap-3 hover:text-gray-200 transition-colors duration-300 text-lg"><FaQuestionCircle /> FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 border-b-2 border-white/50 pb-2">Присоединяйтесь к нам</h3>
          <div className="flex space-x-6 mb-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors duration-300"><FaInstagram className="text-3xl" /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors duration-300"><FaYoutube className="text-3xl" /></a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors duration-300"><FaDiscord className="text-3xl" /></a>
          </div>
          <p className="text-lg">
            Email: <a href="mailto:support@aniyume.com" className="hover:underline hover:text-gray-200 transition-colors duration-300">support@aniyume.com</a>
          </p>
        </div>

      </div>

      <div className="border-t border-white/40 mt-10 pt-8 text-center text-sm relative z-10">
        &copy; {new Date().getFullYear()} Aniyume. Все права защищены.
      </div>

      
      <div className="absolute -top-1/4 right-0 w-1/3 h-1/3 bg-white/35 rounded-full mix-blend-overlay animate-float-alt-delay"></div>
      <div className="absolute bottom-1/2 right-1/4 w-1/5 h-1/4 bg-white/20 rounded-full mix-blend-overlay animate-float-delay-alt"></div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10%, -10%) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float-delay {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10%, 10%) scale(1.03); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float-alt {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-5%, 5%) scale(1.07); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float-alt-delay { 
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5%, -10%) scale(1.06); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float-delay-alt { 
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-5%, 10%) scale(1.04); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-float { animation: float 15s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 18s ease-in-out infinite; }
        .animate-float-alt { animation: float-alt 12s ease-in-out infinite; }
        .animate-float-alt-delay { animation: float-alt-delay 16s ease-in-out infinite; }
        .animate-float-delay-alt { animation: float-delay-alt 13s ease-in-out infinite; }
      `}</style>
    </footer>
  );
}