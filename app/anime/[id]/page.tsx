'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaCalendarAlt, FaFilm, FaBuilding, FaListUl, FaStar, FaHeadphones, FaUserCircle, FaPaperPlane, FaEdit, FaHome, FaStar as FaStarOutline } from 'react-icons/fa';
import { MdOutlinePlaylistPlay } from 'react-icons/md';
import { FaBold, FaItalic, FaUnderline, FaQuoteRight, FaListUl as FaListUlIcon, FaSmile, } from 'react-icons/fa';
import SeriesDropdown from '@/components/SeriesDropdown'; // Убедитесь, что путь верный
import { MdOutlineCalendarToday } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { GiFactory } from "react-icons/gi";
import { BsCollectionPlay } from "react-icons/bs";

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
    { num: 1, title: 'Первая серия', videoUrl: 'https://player.dreamerscast.com/embed/3def7ecd-1a2d-46b2-a0d2-74a1d8e0e071' },
    { num: 2, title: 'Вторая серия', videoUrl: 'https://player.dreamerscast.com/embed/3def7ecd-1a2d-46b2-a0d2-74a1d8e0e071' },
    { num: 3, title: 'Третья серия', videoUrl: 'https://player.dreamerscast.com/embed/3def7ecd-1a2d-46b2-a0d2-74a1d8e0e071' },
  ],
};

export default function AnimeViewPage() {
  const { id } = useParams();
  const [anime, setAnime] = useState<any>(null);
  const [currentEpisode, setCurrentEpisode] = useState<any>(animeData.episodesList[0]);
  const [comments, setComments] = useState<Array<{ name: string, text: string }>>([]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaText, setCaptchaText] = useState('');

  useEffect(() => {
    // В реальном приложении здесь был бы fetch по id
    if (id || !id) setAnime(animeData); // !id добавлено для теста, если нет параметров
    generateCaptcha();
  }, [id]);

  const generateCaptcha = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  const handleCommentSubmit = () => {
    if (!newCommentName.trim() || !newCommentText.trim() || newCommentText.trim().length < 10) {
      alert("Пожалуйста, введите ваше имя и комментарий (минимум 10 знаков).");
      return;
    }
    if (captchaInput !== captchaText) {
      alert("Неправильный код с картинки.");
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

  if (!anime) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800 text-xl">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900 font-sans rounded-md bg-gray-50">
      <main className="container mx-auto p-3 grid grid-cols-1 md:grid-cols-5 gap-6">
        
    

      
        <div className="md:col-span-4">
          
   
          <div className="bg-white rounded-md p-6 shadow-md border-4 border-[#2EC4B6]">
            
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <img
                src={anime.cover}
                alt={anime.title}
                className="w-full md:w-72 h-auto object-cover rounded-md border border-gray-300 shadow-lg self-start"
              />

              <div className="grow">
                <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4 md:gap-0">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 hover:text-[#2EC4B6] transition-colors">
                    {anime.title}
                  </h1>

                  <div className="flex flex-wrap gap-4 md:gap-6 text-gray-600">
                    <div className="flex items-center gap-2 hover:text-[#0fe7d1] transition">
                      <MdOutlineCalendarToday className="text-xl md:text-2xl" />
                      <span className="text-sm md:text-base">{anime.year}</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-[#FFD700] transition">
                      <AiFillStar className="text-xl md:text-2xl" />
                      <span className="text-sm md:text-base">{anime.rating || "8.9"}</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-[#14e1cd] transition">
                      <BsCollectionPlay className="text-xl md:text-2xl" />
                      <span className="text-sm md:text-base">{anime.episodes} эп.</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 italic mb-4">{anime.englishTitle}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-base text-gray-700 mb-4">
                  <p><span className="font-semibold">Год:</span> {anime.year}</p>
                  <p><span className="font-semibold">Эпизодов:</span> {anime.episodes}</p>
                  <p><span className="font-semibold">Сезон:</span> {anime.season}</p>
                  <p><span className="font-semibold">Студия:</span> {anime.studio}</p>
                  <p className="col-span-full"><span className="font-semibold">Жанр:</span> {anime.genre}</p>
                  <p className="col-span-full"><span className="font-semibold">Озвучивание:</span> {anime.voiceActing}</p>
                </div>
                <p className="text-gray-700 leading-relaxed">{anime.description}</p>
              </div>
            </div>

            <hr className="border-t-2 border-gray-100 my-8" />

            <div className="mb-8">
              <div className="mb-4">
                 <SeriesDropdown onSelect={(ep) => console.log("Выбрана серия:", ep)} />
              </div>
              
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-black">
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

            <hr className="border-t-2 border-gray-100 my-8" />

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#2EC4B6]">
                Оставить комментарий
              </h2>
              <p className="text-sm text-gray-500 mb-4">Минимальная длина комментария - 10 знаков. Комментарии модерируются.</p>

              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2EC4B6] transition bg-gray-50"
                  placeholder="Ваше имя"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                />
              </div>

              <div className="border border-gray-300 rounded-lg overflow-hidden mb-4 shadow-sm">
                <div className="flex bg-gray-100 p-2 border-b border-gray-300 gap-1">
                  <button className="p-2 hover:bg-gray-200 rounded text-gray-600"><FaBold /></button>
                  <button className="p-2 hover:bg-gray-200 rounded text-gray-600"><FaItalic /></button>
                  <button className="p-2 hover:bg-gray-200 rounded text-gray-600"><FaUnderline /></button>
                  <button className="p-2 hover:bg-gray-200 rounded text-gray-600"><FaSmile /></button>
                  <button className="p-2 hover:bg-gray-200 rounded text-gray-600"><FaQuoteRight /></button>
                  <button className="p-2 hover:bg-gray-200 rounded text-gray-600"><FaListUlIcon /></button>
                </div>
                <textarea
                  className="w-full p-3 h-32 resize-y focus:outline-none bg-white"
                  placeholder="Написать комментарий..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                ></textarea>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <input
                  type="text"
                  className="grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2EC4B6] transition bg-gray-50"
                  placeholder="Впишите код с картинки"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                />
                <div
                  className="bg-gray-200 rounded-lg flex items-center justify-center text-xl font-bold italic text-gray-700 select-none shadow-inner"
                  style={{
                    width: '120px',
                    height: '50px',
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='50'><rect width='100%' height='100%' fill='%23e0e0e0'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='cursive' font-size='28px' fill='%234a4a4a' transform='rotate(${Math.random() * 20 - 10}, 60, 25)'><tspan letter-spacing='2'>${captchaText.split('').join(' ')}</tspan></text></svg>")`,
                  }}
                >
                </div>
              </div>

              <button
                className="bg-[#2EC4B6] text-white px-8 py-3 rounded-lg hover:bg-[#259f93] transition text-lg font-semibold w-full md:w-auto shadow-md"
                onClick={handleCommentSubmit}>
                Отправить
              </button>
            </div>

            <hr className="border-t-2 border-gray-100 my-8" />

            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <FaUserCircle className="text-[#2EC4B6]" /> Комментарии ({comments.length})
              </h2>

              <div className="flex flex-col gap-4">
                {comments.length === 0 && (
                  <p className="text-gray-500 italic text-center py-4 bg-gray-50 rounded-lg">Пока нет комментариев. Будьте первым!</p>
                )}
                {comments.map((c, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition border-l-4 border-[#2EC4B6]">
                    <FaUserCircle className="text-[#2EC4B6] w-10 h-10 shrink-0 mt-1" />
                    <div className="grow">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-bold text-gray-800">{c.name}</p>
                        <span className="text-xs text-gray-400">Только что</span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">{c.text}</p>
                      <button className="mt-2 flex items-center gap-1 text-[#2EC4B6] hover:text-teal-700 text-sm transition font-medium">
                        <FaPaperPlane className="text-xs" /> Ответить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}