'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBold, FaItalic, FaQuoteRight, FaLock, FaSyncAlt, FaSmile, FaTrash } from 'react-icons/fa';
import Modal from '../layout/Modal';

const EMOJIS = ['😊', '😂', '😍', '🤔', '😎', '😭', '😮', '🔥', '✨', '👍', '👎', '❤️', '😱', '🙌', '👀', '🎉', '🌟', '🍀', '🍕', '🚀'];
const API_BASE = "http://164.90.185.95/storage/";

export default function AnimeComments({ animeId }: { animeId: string | number }) {
  const [comments, setComments] = useState<any[]>([]);
  const [captcha, setCaptcha] = useState({ input: '', text: '', timer: 0, canRefresh: true });
  const [ui, setUi] = useState({ showEmojis: false, charCount: 0, isSubmitting: false, mounted: false });
  const [user, setUser] = useState({ name: null, avatar: null, isLoggedIn: false, loading: true });
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  const editorRef = useRef<HTMLDivElement>(null);
  const MAX_LENGTH = 1000;
  const getToken = () => localStorage.getItem("userToken");

  const getAvatar = (path: string | null) => path?.startsWith('http') ? path : path ? `${API_BASE}${path}` : null;

  useEffect(() => {
    setUi(prev => ({ ...prev, mounted: true }));
    refreshCaptcha(true);
    checkAuth();
    if (animeId) fetch(`/api/external/public/anime/${animeId}/comments`)
      .then(res => res.json()).then(json => setComments(json.data || []));
  }, [animeId]);

  useEffect(() => {
    if (captcha.timer > 0) {
      const t = setInterval(() => setCaptcha(c => ({ ...c, timer: c.timer - 1 })), 1000);
      return () => clearInterval(t);
    }
    setCaptcha(c => ({ ...c, canRefresh: true }));
  }, [captcha.timer]);

  const checkAuth = async () => {
    const token = getToken();
    if (!token) return setUser(u => ({ ...u, loading: false }));
    try {
      const res = await fetch("/api/external/profile/me", { headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json();
      const data = json.user || json;
      if (res.ok) setUser({ name: data.name, avatar: data.avatar, isLoggedIn: true, loading: false });
      else throw new Error();
    } catch {
      localStorage.removeItem("userToken");
      setUser(u => ({ ...u, loading: false }));
    }
  };

  const refreshCaptcha = (force = false) => {
    if (!force && !captcha.canRefresh) return;
    setCaptcha(c => ({ ...c, text: Math.random().toString(36).substring(2, 6), canRefresh: false, timer: 30 }));
  };

  const exec = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
    setUi(prev => ({ ...prev, charCount: editorRef.current?.innerText.length || 0 }));
  };

  const submitComment = async () => {
    const text = editorRef.current?.innerText.trim() || "";
    if (text.length < 3) return alert('Минимум 3 символа');
    if (captcha.input !== captcha.text) return (alert('Неверная капча'), refreshCaptcha(true));

    setUi(prev => ({ ...prev, isSubmitting: true }));
    try {
      const res = await fetch("/api/external/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
        body: JSON.stringify({ anime_id: Number(animeId), comment: editorRef.current?.innerHTML })
      });
      const json = await res.json();
      if (res.ok) {
        setComments([json.data, ...comments]);
        if (editorRef.current) editorRef.current.innerHTML = '';
        setCaptcha(c => ({ ...c, input: '' }));
        setUi(prev => ({ ...prev, charCount: 0 }));
        refreshCaptcha(true);
      }
    } catch { alert("Ошибка сети"); }
    setUi(prev => ({ ...prev, isSubmitting: false }));
  };

  const deleteComment = async () => {
    try {
      const res = await fetch(`/api/external/comments/${commentToDelete}`, {
        method: "DELETE", headers: { "Authorization": `Bearer ${getToken()}` }
      });
      if (res.ok) setComments(prev => prev.filter(c => c.id !== commentToDelete));
    } finally { setCommentToDelete(null); }
  };

  if (!ui.mounted) return null;
  if (user.loading) return <div className="py-10 text-center text-[#39bcba] animate-pulse font-bold">Загрузка...</div>;

  return (
    <div className="lg:col-span-2">
      <h2 className="text-xl font-black mb-6 border-l-4 border-[#39bcba] pl-3 uppercase">Отзывы и обсуждение</h2>

      {user.isLoggedIn ? (
        <div className="bg-gray-50 dark:bg-[#161616] p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="mb-4 flex items-center gap-3">
            <UserAvatar name={user.name} avatar={getAvatar(user.avatar)} size="10" />
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Вы вошли как</p>
              <p className="font-black dark:text-gray-200">{user.name}</p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-[#111111]">
            <div className="flex p-2 gap-1 bg-gray-50/60 dark:bg-[#1a1a1a] border-b dark:border-gray-800">
              <ToolbarBtn icon={<FaBold size={12}/>} onClick={() => exec('bold')} />
              <ToolbarBtn icon={<FaItalic size={12}/>} onClick={() => exec('italic')} />
              <ToolbarBtn icon={<FaQuoteRight size={12}/>} onClick={() => {
                const sel = window.getSelection()?.toString();
                exec('insertHTML', `<blockquote class="border-l-4 border-[#39bcba] pl-2 italic my-2 bg-gray-50 dark:bg-gray-800 p-1 opacity-80">${sel || 'Цитата'}</blockquote>`);
              }} />
              <div className="relative">
                <ToolbarBtn icon={<FaSmile size={14}/>} onClick={() => setUi(p => ({ ...p, showEmojis: !p.showEmojis }))} active={ui.showEmojis} />
                {ui.showEmojis && (
                  <div className="absolute top-full left-0 mt-2 p-2 bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 grid grid-cols-5 gap-1 w-44">
                    {EMOJIS.map(e => <button key={e} onClick={() => { exec('insertText', e); setUi(p => ({ ...p, showEmojis: false })); }} className="hover:scale-110 p-1">{e}</button>)}
                  </div>
                )}
              </div>
            </div>
            <div ref={editorRef} contentEditable onInput={() => setUi(p => ({ ...p, charCount: editorRef.current?.innerText.length || 0 }))} className="p-4 h-32 overflow-y-auto outline-none text-sm dark:text-gray-200" />
          </div>

          <div className="text-right mt-1 mb-4 text-[10px] font-bold text-gray-400 uppercase">{ui.charCount} / {MAX_LENGTH}</div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input className="grow p-3.5 rounded-lg dark:bg-[#111111] border dark:border-gray-700 text-sm outline-none focus:border-[#39bcba]" placeholder="Код проверки" value={captcha.input} onChange={e => setCaptcha(c => ({ ...c, input: e.target.value }))} />
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3">
                <div className="bg-gray-200 dark:bg-[#1a1a1a] px-6 py-3 rounded-lg font-black tracking-[0.4em] italic text-xl border dark:border-gray-700">{captcha.text}</div>
                <button onClick={() => refreshCaptcha()} disabled={!captcha.canRefresh} className={!captcha.canRefresh ? 'text-gray-300' : 'text-[#39bcba]'}><FaSyncAlt /></button>
              </div>
              {!captcha.canRefresh && <span className="text-[9px] font-bold text-gray-400 uppercase">через {captcha.timer}с</span>}
            </div>
          </div>

          <button onClick={submitComment} disabled={ui.isSubmitting} className="w-full bg-[#39bcba] text-white font-black py-4 rounded-lg uppercase text-xs tracking-widest disabled:opacity-50">
            {ui.isSubmitting ? 'Отправка...' : 'Отправить'}
          </button>
        </div>
      ) : (
        <LoginPrompt />
      )}

      <div className="mt-12 space-y-6">
        <h3 className="font-black text-sm uppercase tracking-widest">Всего сообщений ({comments.length})</h3>
        {comments.map(c => (
          <div key={c.id} className="flex gap-4 p-5 bg-white dark:bg-[#181818] rounded-lg border dark:border-gray-800">
            <UserAvatar name={c.user.name} avatar={getAvatar(c.user.avatar)} size="12" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <p className="font-black text-sm dark:text-gray-200">{c.user.name}</p>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{new Date(c.created_at).toLocaleDateString()}</span>
                </div>
                {user.isLoggedIn && user.name === c.user.name && (
                  <button onClick={() => setCommentToDelete(c.id)} className="text-gray-300 hover:text-red-500"><FaTrash size={12} /></button>
                )}
              </div>
              <div className="text-sm dark:text-gray-400 prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: c.comment }} />
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={commentToDelete !== null} onClose={() => setCommentToDelete(null)} onConfirm={deleteComment} title="Удаление" message="Удалить комментарий навсегда?" />
    </div>
  );
}

// Вспомогательные мини-компоненты
const ToolbarBtn = ({ icon, onClick, active = false }: any) => (
  <button onClick={onClick} className={`p-2 rounded-lg transition ${active ? 'text-[#39bcba] bg-white dark:bg-gray-800' : 'text-gray-500 hover:bg-white dark:hover:bg-gray-800'}`}>{icon}</button>
);

const UserAvatar = ({ name, avatar, size }: any) => (
  avatar ? <img src={avatar} alt={name} className={`w-${size} h-${size} rounded-full object-cover border-2 border-[#39bcba]`} />
         : <div className={`w-${size} h-${size} rounded-full bg-[#39bcba] flex items-center justify-center text-white font-bold`}>{name?.[0].toUpperCase()}</div>
);

const LoginPrompt = () => (
  <div className="bg-gray-50 dark:bg-[#0b0f1a] p-10 rounded-lg border-2 border-dashed dark:border-gray-800 text-center">
    <FaLock className="mx-auto mb-4 text-gray-300" size={24} />
    <h3 className="font-black uppercase mb-2">Доступ ограничен</h3>
    <Link href="/login" className="inline-block bg-[#39bcba] text-white px-10 py-3 rounded-lg font-black text-xs uppercase">Войти</Link>
  </div>
);