// components/AnimeComments.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaPaperPlane, FaBold, FaItalic, FaUnderline, FaQuoteRight, FaListUl, FaSmile } from 'react-icons/fa';

export default function AnimeComments() {
  const [comments, setComments] = useState<Array<{ name: string; text: string }>>([]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaText, setCaptchaText] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  const handleCommentSubmit = () => {
    if (!newCommentName.trim() || !newCommentText.trim() || newCommentText.length < 10) {
      alert('Введите имя и комментарий (минимум 10 символов)');
      return;
    }
    if (captchaInput !== captchaText) {
      alert('Неверный код с картинки');
      generateCaptcha();
      setCaptchaInput('');
      return;
    }
    setComments([...comments, { name: newCommentName, text: newCommentText }]);
    setNewCommentName('');
    setNewCommentText('');
    setCaptchaInput('');
    generateCaptcha();
  };

  return (
    <div className="lg:col-span-2">
      <h2 className="text-xl font-semibold mb-6 text-black border-l-4 border-teal-400 pl-3">
        Оставить комментарий
      </h2>

      <div className="bg-gray-100 p-6 rounded-xl shadow-lg border border-gray-300">
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 rounded bg-white border border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-teal-400 transition"
            placeholder="Ваше имя"
            value={newCommentName}
            onChange={(e) => setNewCommentName(e.target.value)}
          />
        </div>

        <div className="border border-gray-400 rounded overflow-hidden mb-4">
          <div className="flex bg-white p-2 border-b border-gray-400 gap-1">
            {[FaBold, FaItalic, FaUnderline, FaSmile, FaQuoteRight, FaListUl].map((Icon, idx) => (
              <button key={idx} className="p-2 hover:bg-gray-200 rounded text-gray-700 transition">
                <Icon />
              </button>
            ))}
          </div>
          <textarea
            className="w-full p-3 h-32 resize-y bg-white text-black placeholder-gray-500 focus:outline-none"
            placeholder="Написать комментарий (мин. 10 символов)..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            className="grow w-full p-3 rounded bg-white border border-gray-400 text-black focus:outline-none focus:border-teal-400"
            placeholder="Код с картинки"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
          />
          <div
            className="bg-gray-300 rounded flex items-center justify-center select-none shrink-0 text-2xl font-bold text-gray-700 tracking-widest"
            style={{ width: '120px', height: '50px' }}
          >
            {captchaText}
          </div>
        </div>

        <button
          className="w-full bg-teal-400 hover:bg-teal-400 text-white font-bold py-3 rounded transition shadow-lg hover:shadow-orange-500/20"
          onClick={handleCommentSubmit}>
          Отправить
        </button>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-bold mb-4 text-gray-700">
          Комментарии ({comments.length})
        </h3>
        <div className="space-y-4">
          {comments.length === 0 && (
            <p className="text-gray-500 italic">Пока нет комментариев.</p>
          )}
          {comments.map((c, idx) => (
            <div key={idx} className="flex gap-4 p-4 bg-gray-100 rounded-xl border border-gray-300">
              <FaUserCircle className="text-teal-400 w-10 h-10 shrink-0" />
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="font-bold text-black">{c.name}</p>
                  <span className="text-xs text-gray-500">Только что</span>
                </div>
                <p className="text-gray-700">{c.text}</p>
                <button className="mt-2 flex items-center gap-1 text-teal-400 text-xs hover:underline">
                  <FaPaperPlane /> Ответить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}