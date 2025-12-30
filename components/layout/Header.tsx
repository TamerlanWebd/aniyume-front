'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSignInAlt, FaUserPlus, FaUserCircle } from 'react-icons/fa';
import { HiAdjustmentsHorizontal, HiFire, HiMiniBookmark } from "react-icons/hi2";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaRankingStar } from "react-icons/fa6";
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';    

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <header className="relative w-full border-b border-gray-200 dark:border-[#232323] bg-background text-foreground z-50 transition-colors">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4">
          <Link href="/" className="shrink-0 transition-opacity hover:opacity-80">
     <Image 
        src="/images/logo0.png" 
        alt="Aniyume Logo" 
        width={400} 
        height={400} 
        className="h-16 w-auto object-contain dark:hidden" 
        priority 
      />
     <Image 
        src="/images/logo01.png" 
        alt="Aniyume Logo" 
        width={400} 
        height={400} 
        className="hidden h-16 w-auto object-contain dark:block" 
        priority 
      />
        </Link>
          <div className="mt-2">
              <ThemeToggle />
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center px-8 lg:flex">
           <SearchBar />
        </div>

        <nav className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            <li>
              <Link href="/popular" className="group flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                <FaRankingStar className="text-2xl text-gray-400 dark:text-gray-400 transition-colors group-hover:text-[#39bcba]" />
                <span>Популярное</span>
              </Link>
            </li>
            <li>
              <Link href="/schedule" className="group flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                <IoCalendarNumberSharp className="text-2xl text-gray-400 dark:text-gray-400 transition-colors group-hover:text-[#39bcba]" />
                <span>Расписание</span>
              </Link>
            </li>
            <li>
              <Link href="/filter" className="group flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                <HiAdjustmentsHorizontal className="text-2xl text-gray-400 dark:text-gray-400 transition-colors group-hover:text-[#39bcba]" />
                <span>Фильтр</span>
              </Link>
            </li>
            <li>
              <Link href="/bookmarks" className="group flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                <HiMiniBookmark className="text-2xl text-gray-400 dark:text-gray-400 transition-colors group-hover:text-[#39bcba]" />
                <span>Закладки</span>
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4 border-l border-gray-200 dark:border-gray-800 pl-6">
            {isLoggedIn ? (
              <Link href="/profile" className="text-gray-400 dark:text-gray-400 hover:text-[#39bcba] transition-colors">
                <FaUserCircle size={32} />
              </Link>
            ) : (
              <>
                <Link href="/login" className="hidden items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-gray-100 dark:hover:bg-gray-800 md:inline-flex">
                  <FaSignInAlt className="text-sm" />
                  <span>Вход</span>
                </Link>
                <Link href="/register" className="flex items-center gap-2 rounded-lg bg-[#39bcba] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#2f9795] hover:shadow-lg">
                  <FaUserPlus className="text-sm" />
                  <span>Регистрация</span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}