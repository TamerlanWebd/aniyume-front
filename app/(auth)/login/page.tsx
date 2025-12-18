'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const LoginPage = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/images/fon.jpg')" }}
    >
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#2EC4B6]/40 backdrop-blur-sm">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-[#2EC4B6] flex items-center justify-center gap-2">
          <FaSignInAlt className="text-[#2EC4B6]" /> Вход
        </h1>
        <p className="text-[#2EC4B6] mb-6 text-center text-sm font-medium">
          Добро пожаловать! Введите данные для входа.
        </p>
        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-[#2EC4B6] text-sm font-semibold mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2EC4B6]" />
              <input type="email" id="email" placeholder="email@example.com" className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white text-gray-700 border-[#2EC4B6] outline-none transition focus:ring-2 focus:ring-[#2EC4B6] focus:border-[#2EC4B6]" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-[#2EC4B6] text-sm font-semibold mb-2">Пароль</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2EC4B6]" />
              <input type="password" id="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white text-gray-700 border-[#2EC4B6] outline-none transition focus:ring-2 focus:ring-[#2EC4B6] focus:border-[#2EC4B6]" />
            </div>
          </div>
          <button type="submit" className="bg-[#2EC4B6] hover:bg-[#259B92] text-white font-bold py-3 px-6 rounded-lg w-full transition-all shadow-md hover:shadow-lg text-lg flex justify-center items-center gap-2">Войти</button>
          <div className="text-center pt-2 flex flex-col items-center">
            <FaUserPlus className="text-[#2EC4B6] mb-2" />
            <Link href="/register" className="text-[#2EC4B6] font-semibold text-sm hover:text-[#259B92] transition">Нет аккаунта? Зарегистрироваться</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
