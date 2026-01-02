'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import AuthBackground from '@/components/layout/AuthBackground';
import Modal from '@/components/layout/Modal';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    isSuccess: false,
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
    if (modal.isSuccess) {
      router.push('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/external/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || 'Ошибка входа');
      }

      const token =
        responseData.data?.token ||
        responseData.token ||
        responseData.access_token;

      const user = responseData.data?.user || responseData.user;

      if (!token) {
        throw new Error('Нет токена в ответе сервера');
      }

      localStorage.setItem('userToken', token);
      if (user) {
        localStorage.setItem('userData', JSON.stringify(user));
      }

      setModal({
        isOpen: true,
        title: 'Успешно!',
        message: 'Вы успешно вошли в систему. Сейчас вы будете перенаправлены.',
        isSuccess: true,
      });
    } catch (error: any) {
      setModal({
        isOpen: true,
        title: 'Ошибка',
        message: error.message,
        isSuccess: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#2EC4B6]/40 dark:border-gray-800 bg-white dark:bg-[#161616] p-10 shadow-xl backdrop-blur-sm transition-colors">
          <h1 className="mb-4 flex items-center justify-center gap-2 text-center text-4xl font-extrabold text-[#2EC4B6]">
            <FaSignInAlt /> Вход
          </h1>

          <p className="mb-6 text-center text-sm font-medium text-[#2EC4B6]">
            Добро пожаловать! Введите данные для входа.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#2EC4B6]"
              >
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2EC4B6]" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full rounded-lg border border-[#2EC4B6]/60 bg-white py-2 pl-10 pr-4 text-gray-700 outline-none transition focus:ring-2 focus:ring-[#2EC4B6] dark:border-gray-700 dark:bg-[#111111] dark:text-gray-200"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#2EC4B6]"
              >
                Пароль
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2EC4B6]" />
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-[#2EC4B6]/60 bg-white py-2 pl-10 pr-4 text-gray-700 outline-none transition focus:ring-2 focus:ring-[#2EC4B6] dark:border-gray-700 dark:bg-[#111111] dark:text-gray-200"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2EC4B6] py-3 font-bold text-white shadow-md transition hover:bg-[#259B92] hover:shadow-lg disabled:opacity-50"
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>

            <div className="flex flex-col items-center pt-2 text-center">
              <FaUserPlus className="mb-2 text-[#2EC4B6]" />
              <Link
                href="/register"
                className="text-sm font-semibold text-[#2EC4B6] transition hover:text-[#259B92]"
              >
                Нет аккаунта? Зарегистрироваться
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        onConfirm={closeModal}
        title={modal.title}
        message={modal.message}
      />
    </AuthBackground>
  );
};

export default LoginPage;
