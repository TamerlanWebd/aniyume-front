'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaUserCircle, FaPaperPlane, FaBold, FaItalic, FaQuoteRight, FaLock, FaSyncAlt, FaSmile } from 'react-icons/fa';

const EMOJIS = ['😊', '😂', '😍', '🤔', '😎', '😭', '😮', '🔥', '✨', '👍', '👎', '❤️', '😱', '🙌', '👀', '🎉', '🌟', '🍀', '🍕', '🚀'];

export default function AnimeComments() {
  const [comments, setComments] = useState<Array<{ name: string; html: string }>>([]);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canRefresh, setCanRefresh] = useState(true);
  
  const [user, setUser] = useState<{ name: string | null; isLoggedIn: boolean }>({
    name: null,
    isLoggedIn: false,
  });
  const [isUserLoading, setIsUserLoading] = useState(true);

  const editorRef = useRef<HTMLDivElement>(null);
  const MAX_LENGTH = 200;

  useEffect(() => {
    setMounted(true);
    generateCaptcha(true);
    checkAuth();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanRefresh(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const checkAuth = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setIsUserLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/external/profile/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        const userData = json.user || json;
        setUser({ name: userData.name, isLoggedIn: true });
      } else if (res.status === 401) {
        localStorage.removeItem("userToken");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUserLoading(false);
    }
  };

  const generateCaptcha = (force = false) => {
    if (!force && !canRefresh) return;

    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    setCaptchaText(result);
    
    setCanRefresh(false);
    setTimer(30);
  };

  const applyStyle = (command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
    updateCharCount();
  };

  const insertQuote = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const quote = document.createElement('blockquote');
    quote.className = "border-l-4 border-[#39bcba] pl-2 italic my-2 bg-gray-50 dark:bg-gray-800 p-1 opacity-80";
    quote.textContent = selection.toString() || "Цитата";
    range.deleteContents();
    range.insertNode(quote);
    updateCharCount();
  };

  const addEmoji = (emoji: string) => {
    if (charCount >= MAX_LENGTH) return;
    document.execCommand('insertText', false, emoji);
    setShowEmojis(false);
    updateCharCount();
  };

  const updateCharCount = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || "";
      if (text.length > MAX_LENGTH) {
        const range = document.createRange();
        const sel = window.getSelection();
        editorRef.current.innerText = text.substring(0, MAX_LENGTH);
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      setCharCount(editorRef.current.innerText.length);
    }
  };

  const handleCommentSubmit = () => {
    if (!user.isLoggedIn || !editorRef.current) return;
    const text = editorRef.current.innerText.trim();
    const html = editorRef.current.innerHTML;

    if (text.length < 5) {
      alert('Минимум 5 символов');
      return;
    }
    if (captchaInput !== captchaText) {
      alert('Неверная капча');
      generateCaptcha(true);
      return;
    }

    setComments([{ name: user.name || 'Пользователь', html: html }, ...comments]);
    editorRef.current.innerHTML = '';
    setCharCount(0);
    setCaptchaInput('');
    generateCaptcha(true);
  };

  if (!mounted) return null;
  if (isUserLoading) return <div className="py-10 text-center text-[#39bcba] animate-pulse font-bold">Загрузка...</div>;

return (
  <div className="lg:col-span-2">
    <h2 className="text-xl font-black mb-6 text-black dark:text-gray-200 border-l-4 border-[#39bcba] pl-3 uppercase tracking-tighter">
      Отзывы и обсуждение
    </h2>

    {user.isLoggedIn ? (
      <div className="bg-gray-50 dark:bg-[#161616] p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm relative transition-colors">
        <div className="mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#39bcba] flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/20">
            {user.name?.[0].toUpperCase()}
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Вы вошли как
            </p>
            <p className="font-black text-gray-900 dark:text-gray-200">
              {user.name}
            </p>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-[#111111] transition-all focus-within:border-[#39bcba] focus-within:ring-4 focus-within:ring-teal-500/5">
          <div className="flex p-2 border-b border-gray-100 dark:border-gray-800 gap-1 bg-gray-50/60 dark:bg-[#1a1a1a]">
            <button onClick={() => applyStyle('bold')} className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400 transition">
              <FaBold size={12}/>
            </button>
            <button onClick={() => applyStyle('italic')} className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400 transition">
              <FaItalic size={12}/>
            </button>
            <button onClick={insertQuote} className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400 transition">
              <FaQuoteRight size={12}/>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowEmojis(!showEmojis)}
                className={`p-2 rounded-lg transition ${
                  showEmojis
                    ? 'text-[#39bcba] bg-white dark:bg-gray-800'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800'
                }`}
              >
                <FaSmile size={14}/>
              </button>

              {showEmojis && (
                <div className="absolute top-full left-0 mt-2 p-2 bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 grid grid-cols-5 gap-1 w-44">
                  {EMOJIS.map(e => (
                    <button
                      key={e}
                      onClick={() => addEmoji(e)}
                      className="text-lg hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded transition-transform hover:scale-110"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div
            ref={editorRef}
            contentEditable
            onInput={updateCharCount}
            className="w-full p-4 h-32 overflow-y-auto resize-none bg-transparent text-gray-900 dark:text-gray-200 focus:outline-none text-sm leading-relaxed"
            style={{ minHeight: '8rem' }}
          />
        </div>

        <div className="flex justify-end mt-2 mb-4">
          <span
            className={`text-[10px] font-black uppercase tracking-widest ${
              charCount >= MAX_LENGTH
                ? 'text-red-500'
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            {charCount} / {MAX_LENGTH}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            className="grow w-full p-3.5 rounded-lg bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:border-[#39bcba]"
            placeholder="Код проверки"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
          />

          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 dark:bg-[#1a1a1a] px-6 py-3 rounded-lg select-none font-black text-gray-500 dark:text-gray-400 tracking-[0.4em] italic text-xl border border-gray-300 dark:border-gray-700">
                {captchaText}
              </div>
             <button
                onClick={() => generateCaptcha()}
                disabled={!canRefresh}
                className={`transition-all ${
              !canRefresh
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-400 hover:text-[#39bcba]'
                     }`}
             >
           <FaSyncAlt className={!canRefresh ? '' : 'hover:rotate-180 duration-500'} />
              </button>

            </div>

            {!canRefresh && (
              <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase">
                Обновление через {timer}с
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleCommentSubmit}
          className="w-full bg-[#39bcba] hover:bg-[#2fa3a1] text-white font-black py-4 rounded-lg transition-all shadow-xl shadow-teal-500/20 uppercase text-xs tracking-[0.2em]"
        >
          Отправить комментарий
        </button>
      </div>
    ) : (
      <div className="bg-gray-50 dark:bg-[#0b0f1a] p-10 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-800 text-center">
        <div className="w-16 h-16 bg-white dark:bg-[#111111] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <FaLock className="text-gray-300" size={24} />
        </div>
        <h3 className="font-black text-gray-900 dark:text-gray-200 mb-2 uppercase tracking-tight">
          Доступ ограничен
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-xs mx-auto">
          Чтобы оставлять комментарии, необходимо войти в свой аккаунт
        </p>
        <Link
          href="/login"
          className="inline-block bg-[#39bcba] text-white px-10 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-teal-500/20"
        >
          Войти на сайт
        </Link>
      </div>
    )}

    <div className="mt-12 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
        <h3 className="font-black text-gray-900 dark:text-gray-200 uppercase text-sm tracking-widest">
          Всего сообщений ({comments.length})
        </h3>
      </div>

      <div className="grid gap-4">
        {comments.map((c, idx) => (
          <div
            key={idx}
            className="flex gap-4 p-5 bg-white dark:bg-[#181818] rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-[#1a1a1a] flex items-center justify-center shrink-0 border-2 border-white dark:border-gray-900 shadow-sm text-[#39bcba] font-bold">
              {c.name[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <p className="font-black text-sm text-gray-900 dark:text-gray-200 truncate">
                  {c.name}
                </p>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                  Только что
                </span>
              </div>
              <div
                className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed wrap-break-word prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: c.html }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}