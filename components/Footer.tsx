'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaTelegram,
  FaYoutube,
  FaDiscord,
  FaInfoCircle,
  FaShieldAlt,
  FaBalanceScale,
  FaQuestionCircle,

} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiAdjustmentsHorizontal, HiMiniBookmark, HiFire } from 'react-icons/hi2';
import { IoCalendarNumberSharp } from 'react-icons/io5';

interface FooterLinkProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-white via-slate-50 to-slate-100 pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0">
      
      </div>

     <div className="grid grid-cols-1 gap-14 border-t border-slate-400 pt-20 sm:grid-cols-2 lg:grid-cols-4"/>
<div className="relative mx-auto max-w-7xl px-2">
  <div className="flex items-center justify-between gap-12">
    
   
    <div className="max-w-xl">
      <Link href="/" className="inline-block">
        <Image
          src="/images/logo0.png"
          alt="AniYume"
          width={480}          
          height={180}
          className="h-30 w-auto"
        />
      </Link>

      <p className="mt-6 text-lg leading-relaxed text-slate-700">
        AniYume — современная платформа для просмотра аниме.
        Новинки, расписание, коллекции и живое сообщество в одном месте.
      </p>
    </div>

   
    <div className="relative">
      <Image
        src="/images/44.png"
        alt="AniYume mascot"
        width={900}
        height={400}
        className="w-[420px] h-auto"
        priority
      />
    </div>
</div>


        <div className="grid grid-cols-1 gap-14 border-t border-slate-400 pt-20 sm:grid-cols-2 lg:grid-cols-4">
          <Block title="Навигация">
            <FooterLink href="/popular" icon={HiFire}>Популярное</FooterLink>
            <FooterLink href="/schedule" icon={IoCalendarNumberSharp}>Расписание</FooterLink>
            <FooterLink href="/filter" icon={HiAdjustmentsHorizontal}>Каталог</FooterLink>
            <FooterLink href="/bookmarks" icon={HiMiniBookmark}>Закладки</FooterLink>
          </Block>

          <Block title="Информация">
            <FooterLink href="/about" icon={FaInfoCircle}>О проекте</FooterLink>
            <FooterLink href="/privacy" icon={FaShieldAlt}>Приватность</FooterLink>
            <FooterLink href="/terms" icon={FaBalanceScale}>Условия</FooterLink>
            <FooterLink href="/faq" icon={FaQuestionCircle}>FAQ</FooterLink>
          </Block>

          <Block title="Поддержка">
            <p className="text-slate-600">Наша команда отвечает ежедневно</p>
            <a
              href="mailto:support@aniyume.com"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-[#2EC4B6]"
            >
              support@aniyume.com
            </a>
            <span className="mt-3 block text-sm text-slate-400">10:00 – 22:00</span>
          </Block>

          <Block title="Мы в соцсетях">
            <div className="grid grid-cols-4 gap-3">
              <SocialCard href="https://discord.gg/PYMXhXcR5Y" icon={FaDiscord} label="Discord" hoverClass="hover:bg-[#5865F2] hover:text-white" />
              <SocialCard href="https://t.me/aniYume_group" icon={FaTelegram} label="Telegram" hoverClass="hover:bg-[#2ca0de] hover:text-white" />
              <SocialCard href="#" icon={FaYoutube} label="YouTube" hoverClass="hover:bg-[#FF0000] hover:text-white" />
              <SocialCard href="#" icon={FaXTwitter} label="Twitter" hoverClass="hover:bg-black hover:text-white" />
            </div>
          </Block>
        </div>

        <div className="mt-20 border-t border-slate-300 py-10 text-center text-sm text-slate-400">
          © {year} AniYume. Все права защищены
        </div>
      </div>
    </footer>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-6 text-lg font-bold text-slate-900">
        <span className="border-b-4 border-[#2EC4B6] pb-1">{title}</span>
      </h3>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function FooterLink({ href, icon: Icon, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 text-base text-slate-600 transition hover:translate-x-2 hover:text-slate-900"
    >
      <Icon className="text-xl text-slate-400 transition group-hover:text-[#2EC4B6]" />
      {children}
    </Link>
  );
}

function SocialCard({ href, icon: Icon, label, hoverClass }: { href: string; icon: React.ElementType; label: string; hoverClass: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-xl bg-slate-100 text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${hoverClass}`}
    >
      <Icon className="text-2xl transition-transform duration-300 group-hover:scale-110" />
      <span className="text-[10px] font-semibold leading-none opacity-80 group-hover:opacity-100">{label}</span>
    </a>
  );
}
