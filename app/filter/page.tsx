'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft, FaFilter } from 'react-icons/fa';

interface Genre { id: number; name: string; slug: string; }
interface Studio { id: number; name: string; }
interface Translator { translator: string; translation_type: string; }

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, onChange, options, disabled }) => {
  return (
    <div className="relative group">
      <label className="absolute -top-2.5 left-3 bg-white dark:bg-[#111111] px-1 text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-[#21D0B8]">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0d0d0d] px-3 text-sm text-gray-800 dark:text-gray-200 outline-none transition-all hover:border-gray-400 dark:hover:border-gray-500 focus:border-[#21D0B8] focus:ring-1 focus:ring-[#21D0B8] disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 appearance-none cursor-pointer"
      >
        <option value="">Не важно</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

function FilterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const API_BASE = '/api/external';

  const [genres, setGenres] = useState<Genre[]>([]);
  const [studios, setStudios] = useState<Studio[]>([]);
  const [translators, setTranslators] = useState<string[]>([]);

  const [filters, setFilters] = useState({
    genre: '',
    studio: '',
    translator: '',
    year: '',
    season: '',
    status: '',
    type: '',
    sort: 'newest',
    ageRating: '',
    country: '',
  });

  useEffect(() => {
    setFilters({
      genre: searchParams.get('genre') || '',
      studio: searchParams.get('studio') || '',
      translator: searchParams.get('translator') || '',
      year: searchParams.get('year') || '',
      season: searchParams.get('season') || '',
      status: searchParams.get('status') || '',
      type: searchParams.get('type') || '',
      sort: searchParams.get('sort') || 'newest',
      ageRating: searchParams.get('ageRating') || '',
      country: searchParams.get('country') || '',
    });
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      const [tagsRes, studiosRes, translatorsRes] = await Promise.all([
        fetch(`${API_BASE}/tags`),
        fetch(`${API_BASE}/studios`),
        fetch(`${API_BASE}/episodes/translators`)
      ]);

      if (tagsRes.ok) {
        const tData = await tagsRes.json();
        const list = Array.isArray(tData.data) ? tData.data : [];
        list.sort((a: Genre, b: Genre) => a.name.localeCompare(b.name));
        setGenres(list);
      }

      if (studiosRes.ok) {
        const sData = await studiosRes.json();
        setStudios(Array.isArray(sData.data) ? sData.data : []);
      }

      if (translatorsRes.ok) {
        const trData = await translatorsRes.json();
        const list = Array.isArray(trData.data) ? trData.data : [];
        const uniqueNames = Array.from(new Set(list.map((t: any) => t.translator))).sort() as string[];
        setTranslators(uniqueNames);
      }
    };
    fetchData();
  }, []);

  const years = Array.from({ length: 46 }, (_, i) => ({
    value: String(2025 - i),
    label: String(2025 - i),
  }));

  const countries = [
    { value: 'JP', label: 'Япония' },
    { value: 'CN', label: 'Китай' },
    { value: 'KR', label: 'Южная Корея' },
  ];

  const handleChange = (key: string, val: string) => {
    setFilters(prev => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setFilters({
      genre: '', studio: '', translator: '', year: '', season: '',
      status: '', type: '', sort: 'newest', ageRating: '', country: '',
    });
  };

  const handleApply = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val) params.append(key, val);
    });
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111111] pb-20 transition-colors">
      <div className="bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
            Фильтр
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="bg-white dark:bg-[#0d0d0d] rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            <FilterSelect label="Жанры" value={filters.genre} onChange={(v) => handleChange('genre', v)} options={genres.map(g => ({ value: g.slug, label: g.name }))} />
            <FilterSelect label="Озвучка" value={filters.translator} onChange={(v) => handleChange('translator', v)} options={translators.map(t => ({ value: t, label: t }))} />
            <FilterSelect label="Сортировка" value={filters.sort} onChange={(v) => handleChange('sort', v)} options={[{ value: 'newest', label: 'Новые' }, { value: 'rating', label: 'По рейтингу' }, { value: 'popularity', label: 'Популярные' }, { value: 'title', label: 'По алфавиту' }]} />
            <FilterSelect label="Год" value={filters.year} onChange={(v) => handleChange('year', v)} options={years} />
            <FilterSelect label="Статус" value={filters.status} onChange={(v) => handleChange('status', v)} options={[{ value: 'finished', label: 'Завершен' }, { value: 'ongoing', label: 'Онгоинг' }, { value: 'upcoming', label: 'Анонс' }]} />
            <FilterSelect label="Тип" value={filters.type} onChange={(v) => handleChange('type', v)} options={[{ value: 'tv', label: 'TV' }, { value: 'movie', label: 'Фильм' }, { value: 'ova', label: 'OVA' }, { value: 'special', label: 'Спешл' }]} />
            <FilterSelect label="Сезон" value={filters.season} onChange={(v) => handleChange('season', v)} options={[{ value: 'winter', label: 'Зима' }, { value: 'spring', label: 'Весна' }, { value: 'summer', label: 'Лето' }, { value: 'fall', label: 'Осень' }]} />
            <FilterSelect label="Возраст" value={filters.ageRating} onChange={(v) => handleChange('ageRating', v)} options={[{ value: 'g', label: 'G' }, { value: 'pg', label: 'PG' }, { value: 'r', label: 'R-17' }]} />
            <FilterSelect label="Страна" value={filters.country} onChange={(v) => handleChange('country', v)} options={countries} />
          </div>

          <hr className="my-10 border-gray-100 dark:border-gray-800" />

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-500 transition-colors w-full sm:w-auto"
            >
              Сбросить
            </button>
            <button
              onClick={handleApply}
              className="px-10 py-3 rounded-xl bg-[#21D0B8] text-white font-bold shadow-lg shadow-[#21D0B8]/30 hover:bg-[#1bb5a0] active:scale-95 transition-all w-full sm:w-auto"
            >
              Применить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FilterPage() {
  return (
    <Suspense fallback={<div className="text-gray-400">Загрузка...</div>}>
      <FilterPageContent />
    </Suspense>
  );
}
