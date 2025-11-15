'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaRegAddressCard } from 'react-icons/fa';

const RegisterPage = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-white px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#2EC4B6]/40 backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-4 text-center text-[#2EC4B6] flex items-center justify-center gap-2">
          <FaUserPlus className="text-[#2EC4B6]" /> Регистрация
        </h1>
        <p className="text-[#2EC4B6] mb-6 text-center text-sm font-medium">Создайте аккаунт, чтобы продолжить.</p>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-[#2EC4B6] font-semibold mb-1">Имя пользователя</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2EC4B6]" />
              <input id="username" type="text" placeholder="Ваше имя" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EC4B6]" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-[#2EC4B6] font-semibold mb-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2EC4B6]" />
              <input id="email" type="email" placeholder="email@example.com" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EC4B6]" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-[#2EC4B6] font-semibold mb-1">Пароль</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2EC4B6]" />
              <input id="password" type="password" placeholder="********" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2EC4B6]" />
            </div>
          </div>
          <button type="submit" className="w-full bg-[#2EC4B6] hover:bg-[#259B92] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition">
            <FaRegAddressCard /> Зарегистрироваться
          </button>
        </form>
        <p className="text-center mt-4 flex flex-col items-center gap-2">
          <FaUser className="text-[#2EC4B6]" />
          <Link href="/login" className="font-bold text-sm text-[#2EC4B6] hover:text-[#259B92]">Уже есть аккаунт? Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
