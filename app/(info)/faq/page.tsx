// app/faq/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FaSearch, FaPlay, FaMobileAlt, FaUserSecret, FaBug, FaPlus, FaMinus, 
  FaWifi, FaDownload, FaLanguage, FaRegCalendarAlt, FaUserCog, FaLock, 
  FaTrashAlt, FaTv, FaGlobe, FaShieldAlt, FaComments, FaMagic, FaChrome 
} from 'react-icons/fa';
import { MdHd, MdSubtitles } from 'react-icons/md';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] text-gray-900 pt-10 pb-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#21D0B8] rounded-full blur-[160px] opacity-[0.04] pointer-events-none" />
        <h1 className="text-4xl text-center mb-6 relative z-10 md:text-6xl font-extrabold  tracking-tight text-gray-900">
          Центр <span className="text-[#21D0B8]">Поддержки</span>
        </h1>
        <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10">
          Мы подготовили ответы на самые популярные вопросы, чтобы помочь вам разобраться с функционалом платформы.
        </p>
    
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6 relative z-10">
        {faqData.map((item, index) => (
          <div 
            key={index}
            onClick={() => toggleQuestion(index)}
            className={`
              group bg-white border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
              ${openIndex === index 
                ? 'border-[#21D0B8] shadow-[0_8px_30px_rgba(33,208,184,0.15)] ring-1 ring-[#21D0B8]' 
                : 'border-gray-100 hover:border-[#21D0B8]/40 shadow-sm hover:shadow-md'
              }
            `}
          >
            <div className="p-6 flex items-start gap-5">
              <div className={`
                mt-1 p-3.5 rounded-xl transition-colors duration-300 shrink-0
                ${openIndex === index 
                  ? 'bg-[#21D0B8] text-white' 
                  : 'bg-gray-50 text-[#21D0B8] group-hover:bg-[#21D0B8]/10'
                }
              `}>
                <span className="text-xl">{item.icon}</span>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center w-full">
                  <h3 className={`text-lg font-bold transition-colors pr-4 ${openIndex === index ? 'text-gray-900' : 'text-gray-800'}`}>
                    {item.question}
                  </h3>
                  <span className={`text-gray-300 transition-transform duration-300 shrink-0 ${openIndex === index ? 'rotate-180 text-[#21D0B8]' : ''}`}>
                    {openIndex === index ? <FaMinus size={14} /> : <FaPlus size={14} />}
                  </span>
                </div>

                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-gray-500 text-base leading-relaxed font-medium">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <p className="text-gray-400 font-medium mb-4">Не нашли нужный ответ?</p>
        <Link 
          href="https://t.me/kellyharvest"
          className="inline-flex items-center gap-2 text-[#21D0B8] font-bold hover:text-[#1aa895] text-lg transition-colors bg-[#21D0B8]/5 px-6 py-2 rounded-full hover:bg-[#21D0B8]/10"
        >
          <FaComments /> Написать в поддержку
        </Link>
      </div>
    </div>
  );
}

const faqData = [
  {
    icon: <FaWifi />,
    question: "Видео постоянно тормозит, что делать?",
    answer: "Чаще всего это связано с загруженностью серверов Kodik или вашим интернетом. Попробуйте снизить качество видео до 720p или 480p, перезагрузить страницу или включить VPN."
  },
  {
    icon: <FaMobileAlt />,
    question: "Есть ли у вас мобильное приложение?",
    answer: "Нативного приложения нет, но наш сайт поддерживает технологию PWA. Вы можете добавить его на главный экран телефона через настройки браузера, и оно будет работать как полноценное приложение."
  },
  {
    icon: <MdHd />,
    question: "Как включить 1080p или 4K?",
    answer: "Качество видео зависит от источника. В плеере нажмите на значок шестеренки (настройки) и выберите максимальное доступное разрешение из списка."
  },
  {
    icon: <FaDownload />,
    question: "Можно ли скачивать серии?",
    answer: "Прямой функции скачивания на сайте нет из-за ограничений правообладателей. Мы предоставляем только потоковый онлайн-просмотр."
  },
  {
    icon: <FaLanguage />,
    question: "Как сменить озвучку?",
    answer: "Над плеером или внутри него есть выпадающий список «Перевод» или «Озвучка». Там можно выбрать любимую студию (AniLibria, SHIZA, Dream Cast и др.)."
  },
  {
    icon: <FaRegCalendarAlt />,
    question: "Когда выходят новые серии?",
    answer: "Эпизоды появляются на сайте автоматически через 30-60 минут после их релиза фандаб-группами. Расписание можно посмотреть в соответствующем разделе."
  },
  {
    icon: <FaUserCog />,
    question: "Как синхронизировать просмотр?",
    answer: "Вам нужно зарегистрироваться. После входа в аккаунт история просмотров и списки «Избранного» будут автоматически синхронизироваться между ПК и телефоном."
  },
  {
    icon: <FaLock />,
    question: "Я забыл пароль, как восстановить?",
    answer: "Так как мы используем шифрование, узнать старый пароль невозможно. Напишите в поддержку с указанием вашего логина, и мы поможем сбросить доступ."
  },
  {
    icon: <MdSubtitles />,
    question: "Есть ли субтитры?",
    answer: "Да, большинство популярных тайтлов имеют вариант с субтитрами. Выберите «Субтитры» в списке озвучек в плеере."
  },
  {
    icon: <FaTv />,
    question: "Работает ли сайт на Smart TV?",
    answer: "Да, сайт адаптирован под браузеры телевизоров. Однако для лучшего опыта рекомендуем использовать мышь или пульт с функцией указки."
  },
  {
    icon: <FaTrashAlt />,
    question: "Как удалить аккаунт?",
    answer: "Вы можете удалить аккаунт в настройках профиля. Обратите внимание, что все ваши закладки и история просмотров будут уничтожены безвозвратно."
  },
  {
    icon: <FaMagic />,
    question: "Как работает умный поиск?",
    answer: "Поиск ищет не только по точному названию, но и по альтернативным английским и японским именам тайтлов."
  },
  {
    icon: <FaShieldAlt />,
    question: "Это легально?",
    answer: "Aniyume является поисковой системой и не хранит видеофайлы. Весь контент загружается из открытых источников, доступных в сети Интернет."
  },
  {
    icon: <FaChrome />,
    question: "Какой браузер лучше использовать?",
    answer: "Мы рекомендуем Google Chrome, Safari или Firefox последних версий для максимальной стабильности плеера и интерфейса."
  },
  {
    icon: <FaUserSecret />,
    question: "Почему нет рекламы?",
    answer: "Проект держится на энтузиазме разработчиков. Мы принципиально не вставляем навязчивую рекламу, чтобы просмотр был комфортным."
  },
  {
    icon: <FaGlobe />,
    question: "Нужен ли VPN для просмотра?",
    answer: "Обычно нет. Но если видеоплеер не загружается, возможно, ваш провайдер блокирует домен поставщика видео. В таком случае VPN может помочь."
  },
  {
    icon: <FaBug />,
    question: "Нашел баг, куда писать?",
    answer: "Мы будем благодарны за репорт! Напишите в наш Telegram-канал или боту поддержки, приложив скриншот ошибки."
  },
  {
    icon: <FaPlay />,
    question: "Плеер пишет «Файл не найден»",
    answer: "Такое бывает, если правообладатель удалил видео. Попробуйте выбрать другую озвучку — часто это решает проблему, так как источники разные."
  },
  {
    icon: <FaUserCog />,
    question: "Можно ли сменить никнейм?",
    answer: "В данный момент смена никнейма недоступна пользователям напрямую. Если это критично, обратитесь к администратору."
  },
  {
    icon: <FaComments />,
    question: "Как предложить идею?",
    answer: "Мы всегда рады фидбеку! Заходите в наш Discord или Telegram-чат, там есть специальная ветка для предложений."
  }
];