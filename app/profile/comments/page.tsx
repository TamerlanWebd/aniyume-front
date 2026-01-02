'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MyCommentsSkeleton from '@/components/skeletons/MyCommentsSkeleton';
import {
  FaTrash,
  FaExternalLinkAlt,
  FaRegCommentDots,
  FaSearch,
  FaCalendarAlt,
} from 'react-icons/fa';

interface UserComment {
  id: number;
  comment?: string;
  content?: string;
  created_at: string;
  anime?: {
    id: number;
    title: string;
    poster_url: string;
  };
}

export default function MyCommentsPage() {
  const [comments, setComments] = useState<UserComment[]>([]);
  const [loading, setLoading] = useState(true);

  const getPosterUrl = (path: string | undefined) => {
    if (!path) return '/no-poster.png';
    if (path.startsWith('http')) return path;
    return `http://164.90.185.95/storage/${path}`;
  };

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
      const res = await fetch('/api/external/user/comments', {
  headers: { Authorization: `Bearer ${token}` },
});
        if (res.ok) {
          const json = await res.json();
          const data = json.data || json;
          setComments(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error("Ошибка при загрузке комментариев:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить этот комментарий навсегда?')) return;
    const token = localStorage.getItem('userToken');
    try {
      const res = await fetch(`/api/external/comments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setComments((p) => p.filter((c) => c.id !== id));
      } else {
        alert("Не удалось удалить комментарий");
      }
    } catch (e) {
      console.error(e);
      alert("Ошибка сети");
    }
  };

  if (loading) return <MyCommentsSkeleton />;

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-slate-900 dark:text-gray-100 pb-24 transition-colors">
      <div className="border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center gap-6">
          <div className="p-4 rounded-2xl bg-[#39bcba]/10">
            <FaRegCommentDots className="text-[#39bcba] text-3xl" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
              Мои комментарии
            </h1>
            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#39bcba]">
              Всего сообщений: {comments.length}
            </p>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-[#111111]/80 border-b border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            История обсуждений
          </span>
          <span className="text-[10px] font-black text-[#39bcba] bg-[#39bcba]/10 px-3 py-1 rounded-full">
            {comments.length}
          </span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 mt-12">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center py-40 text-center">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center mb-8">
              <FaSearch className="text-3xl text-slate-300 dark:text-gray-700" />
            </div>
            <h2 className="text-xl font-black mb-6 uppercase tracking-tight">
              Список пуст
            </h2>
            <Link
              href="/catalog"
              className="px-10 py-4 rounded-xl bg-[#39bcba] text-white font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#39bcba]/20"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {comments.map((c) => (
              <article
                key={c.id}
                className="group rounded-4xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#161616] p-6 md:p-8 hover:border-[#39bcba]/30 transition-all duration-500 shadow-sm"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Постер аниме */}
                  {c.anime && (
                    <Link href={`/anime/${c.anime.id}`} className="shrink-0 mx-auto md:mx-0">
                      <div className="w-28 aspect-2/3 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-gray-200 dark:bg-gray-800">
                        <img
                          src={getPosterUrl(c.anime.poster_url)}
                          alt={c.anime.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                        />
                      </div>
                    </Link>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4 mb-5">
                      <div>
                        <Link
                          href={`/anime/${c.anime?.id}`}
                          className="text-xl font-black hover:text-[#39bcba] transition-colors line-clamp-1 uppercase tracking-tight"
                        >
                          {c.anime?.title || 'Без названия'}
                        </Link>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
                          <FaCalendarAlt className="text-[#39bcba]" />
                          {new Date(c.created_at).toLocaleDateString()} — {new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/anime/${c.anime?.id}`}
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 text-slate-500 hover:text-[#39bcba] hover:shadow-lg transition-all"
                        >
                          <FaExternalLinkAlt size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-white/5 text-slate-500 hover:bg-red-500/10 hover:text-red-500 transition-all"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white dark:bg-black/20 border border-slate-200 dark:border-white/5 p-6 shadow-inner">
                      <div
                        className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-slate-600 dark:text-gray-300 wrap-break-word 
                          [&_blockquote]:border-l-4 [&_blockquote]:border-[#39bcba] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-2 [&_blockquote]:bg-gray-50 dark:[&_blockquote]:bg-white/5 [&_blockquote]:p-2"
                        dangerouslySetInnerHTML={{ __html: c.comment || c.content || '' }}
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}