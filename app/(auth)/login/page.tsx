"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import AuthBackground from "@/components/layout/AuthBackground";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/external/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Ошибка входа");
      }

      const token =
        responseData.data?.token ||
        responseData.token ||
        responseData.access_token;
      const user = responseData.data?.user || responseData.user;

      if (token) {
        localStorage.setItem("userToken", token);
        if (user) localStorage.setItem("userData", JSON.stringify(user));
        alert("Вход успешен!");
        router.push("/");
      } else {
        throw new Error("Нет токена в ответе сервера");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white dark:bg-[#161616] p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#2EC4B6]/40 dark:border-gray-800 backdrop-blur-sm transition-colors">
          <h1 className="text-4xl font-extrabold mb-4 text-center text-[#2EC4B6] flex items-center justify-center gap-2">
            <FaSignInAlt /> Вход
          </h1>

          <p className="text-[#2EC4B6] mb-6 text-center text-sm font-medium">
            Добро пожаловать! Введите данные для входа.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-[#2EC4B6] text-sm font-semibold mb-2"
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
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#2EC4B6]/60 dark:border-gray-700 bg-white dark:bg-[#111111] text-gray-700 dark:text-gray-200 outline-none transition focus:ring-2 focus:ring-[#2EC4B6]"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[#2EC4B6] text-sm font-semibold mb-2"
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
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#2EC4B6]/60 dark:border-gray-700 bg-white dark:bg-[#111111] text-gray-700 dark:text-gray-200 outline-none transition focus:ring-2 focus:ring-[#2EC4B6]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2EC4B6] hover:bg-[#259B92] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Вход..." : "Войти"}
            </button>

            <div className="text-center pt-2 flex flex-col items-center">
              <FaUserPlus className="text-[#2EC4B6] mb-2" />
              <Link
                href="/register"
                className="text-[#2EC4B6] font-semibold text-sm hover:text-[#259B92] transition"
              >
                Нет аккаунта? Зарегистрироваться
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthBackground>
  );
};

export default LoginPage;
