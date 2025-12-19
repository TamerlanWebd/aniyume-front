'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaRegAddressCard } from 'react-icons/fa';

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }

    setLoading(true);

    try {
      // Стучимся в /auth/register (прокси сам поймет, куда слать)
      const res = await fetch('/api/external/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.username, // Laravel ждет 'name'
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword // Laravel ждет confirmation
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Ошибка регистрации');
      }

      // Если в ответе есть токен, сразу сохраняем и входим
      if (data.token || data.access_token) {
          localStorage.setItem('userToken', data.token || data.access_token);
          if (data.user) localStorage.setItem('userData', JSON.stringify(data.user));
          alert('Регистрация успешна! Вы вошли.');
          router.push('/');
      } else {
          alert('Регистрация успешна! Теперь войдите.');
          router.push('/login');
      }

    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/images/fon.jpg')" }}
    >
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        
        <h1 className="text-4xl font-bold mb-4 text-center text-[#2EC4B6] flex items-center justify-center gap-2">
          <FaUserPlus /> Регистрация
        </h1>

        <p className="text-[#2EC4B6] mb-6 text-center text-sm font-medium">
          Создайте аккаунт в базе данных.
        </p>

        <form className="space-y-4 text-[#2EC4B6]" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block font-semibold mb-1">Имя пользователя</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2EC4B6]" />
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Ваше имя"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#2EC4B6] text-gray-700 outline-none focus:ring-2 focus:ring-[#2EC4B6]"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold mb-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2EC4B6]" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#2EC4B6] text-gray-700 outline-none focus:ring-2 focus:ring-[#2EC4B6]"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block font-semibold mb-1">Пароль</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2EC4B6]" />
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#2EC4B6] text-gray-700 outline-none focus:ring-2 focus:ring-[#2EC4B6]"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block font-semibold mb-1">Повторите пароль</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2EC4B6]" />
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#2EC4B6] text-gray-700 outline-none focus:ring-2 focus:ring-[#2EC4B6]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2EC4B6] hover:bg-[#259B92] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition shadow-md disabled:opacity-50"
          >
            {loading ? 'Регистрация...' : <><FaRegAddressCard /> Зарегистрироваться</>}
          </button>
        </form>

        <p className="text-center mt-4 flex flex-col items-center gap-2 text-[#2EC4B6]">
          <FaUser />
          <Link href="/login" className="font-bold text-sm hover:text-[#259B92]">
            Уже есть аккаунт? Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;