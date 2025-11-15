'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaCalendarAlt, FaFilm, FaBuilding, FaListUl, FaStar, FaHeadphones, FaUserCircle, FaPaperPlane } from 'react-icons/fa';

const animeData = {
  id: 'kikaijikake-no-marie',
  title: 'МЕХАНИЧЕСКАЯ МАРИ',
  englishTitle: 'KIKAIJIKAKE NO MARIE',
  year: '2025',
  season: 'Осень',
  studio: 'Zero-G',
  episodes: '6 из 12',
  genre: 'Романтика, Сёдзё, Комедия',
  voiceActing: 'Dreamy Sleep, EnoRu, Gecep, Inferno_Phantom',
  description: 'Это история о механической девушке по имени Мари и её приключениях в мире, полном загадок и чувств.',
  cover: '/images/anime.jpg',
  episodesList: [
    { num: 1, title: 'Первая серия', videoUrl: 'https://player.dreamerscast.com/embed/44c4c19a-68f5-4f33-88a5-e4fe137acce3' },
    { num: 2, title: 'Вторая серия', videoUrl: 'https://player.dreamerscast.com/embed/44c4c19a-68f5-4f33-88a5-e4fe137acce3' },
    { num: 3, title: 'Третья серия', videoUrl: 'https://player.dreamerscast.com/embed/44c4c19a-68f5-4f33-88a5-e4fe137acce3' },
  ],
};

export default function AnimeViewPage() {
  const { id } = useParams();
  const [anime, setAnime] = useState<any>(null);
  const [currentEpisode, setCurrentEpisode] = useState<any>(animeData.episodesList[0]);
  const [comments, setComments] = useState<Array<{name: string, text: string}>>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (id) setAnime(animeData);
  }, [id]);

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    setComments([...comments, { name: 'Аноним', text: newComment }]);
    setNewComment('');
  };

  if (!anime) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-800 text-xl">
        Загрузка...
      </div>
    );
  }

  const iconClass = "text-[#2EC4B6]";

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <main className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <img 
            src={anime.cover} 
            alt={anime.title} 
            className="w-full md:w-96 rounded-md border-4 border-[#2EC4B6] object-cover" 
          />
          <div className="grow p-6 bg-white rounded-md border border-[#2EC4B6]">
            <h1 className="text-4xl font-extrabold mb-2 text-gray-900">{anime.title}</h1>
            <p className="text-lg text-gray-600 mb-4 italic">{anime.englishTitle}</p>
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm md:text-base">
              <p className="flex items-center gap-2"><FaCalendarAlt className={iconClass}/> <span className="font-semibold">Год:</span> {anime.year}</p>
              <p className="flex items-center gap-2"><FaStar className={iconClass}/> <span className="font-semibold">Сезон:</span> {anime.season}</p>
              <p className="flex items-center gap-2"><FaBuilding className={iconClass}/> <span className="font-semibold">Студия:</span> {anime.studio}</p>
              <p className="flex items-center gap-2"><FaFilm className={iconClass}/> <span className="font-semibold">Эпизодов:</span> {anime.episodes}</p>
              <p className="col-span-2 flex items-center gap-2"><FaListUl className={iconClass}/> <span className="font-semibold">Жанр:</span> {anime.genre}</p>
              <p className="col-span-2 flex items-center gap-2"><FaHeadphones className={iconClass}/> <span className="font-semibold">Озвучивание:</span> {anime.voiceActing}</p>
            </div>
            <p className="text-gray-700">{anime.description}</p>
          </div>
        </div>

        <div className="bg-white rounded-md p-4 mb-8 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <select
              className="bg-gray-100 p-2 rounded shadow-inner"
              value={currentEpisode.num}
              onChange={(e) => {
               const selected = anime.episodesList.find((ep: any) => ep.num === parseInt(e.target.value));
                if (selected) setCurrentEpisode(selected);
              }}
            >
              {anime.episodesList.map((ep: any) => (
                <option key={ep.num} value={ep.num}>Серия {ep.num}</option>
              ))}
            </select>
          </div>

          <div className="relative w-full md:w-3/4 mx-auto aspect-video rounded-xl overflow-hidden shadow-lg mb-4">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={currentEpisode.videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`Серия ${currentEpisode.num}`}>
            </iframe>
          </div>
        </div>
        <div className="mt-12 bg-white rounded-xl shadow-2xl p-6 border-2 border-gray-200">
  <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
    <FaUserCircle className="text-[#2EC4B6]" /> Комментарии
  </h2>

  <div className="flex flex-col gap-4 mb-6">
    {comments.length === 0 && (
      <p className="text-gray-500 italic">Пока нет комментариев. Будьте первым!</p>
    )}
    {comments.map((c, idx) => (
      <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-xl shadow hover:shadow-md transition border-l-4 border-[#2EC4B6]">
        <FaUserCircle className="text-[#2EC4B6] w-10 h-10 shrink-0" />
        <div>
          <p className="font-semibold text-gray-800">{c.name}</p>
          <p className="text-gray-700">{c.text}</p>
          <button className="mt-2 flex items-center gap-1 text-[#2EC4B6] hover:text-teal-500 text-sm transition">
            <FaPaperPlane /> Ответить
          </button>
        </div>
      </div>
    ))}
  </div>

  <div className="flex flex-col md:flex-row gap-2">
    <input
      type="text"
      className="grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2EC4B6] transition"
      placeholder="Написать комментарий..."
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
    />
    <button
      className="flex items-center gap-2 bg-[#2EC4B6] text-white px-6 py-3 rounded-lg hover:bg-teal-500 transition"
      onClick={handleCommentSubmit}
    >
      <FaPaperPlane /> Отправить
    </button>
  </div>
</div>
      </main>
    </div>
  );
}
