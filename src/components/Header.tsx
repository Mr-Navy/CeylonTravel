import React, { useState } from 'react';
import { Currency } from '../types';

interface HeaderProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  currency,
  onCurrencyChange,
  onOpenSearch,
  onOpenProfile,
  savedCount,
}) => {
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'tours', label: 'Tours' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'about-us', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNav = (screenId: string) => {
    onNavigate(screenId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#fbf9f6]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all">
        <div className="h-20 max-w-7xl mx-auto px-5 md:px-8 lg:px-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 text-left group transition-transform focus:outline-none"
              aria-label="Travel Ceylone Home"
            >
              <img
                alt="Travel Ceylone Brand Logo"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XDgJBH6ehH8H4X4QeCdifoxrc9RyYgSAmtsxHMGpq47KKGMFy6QvF8H6nzzjMUAM_GW-FdmdwAkNX1av7_TgMC9q4h0zR_UGRMPWqIpVVoKshdlh87VoL22dUe3FWFgh8YqSOr1Vq6HuoZ0_GS0EqdKBz7h9hB6p0UBHcmmLF_eddO4FSPJwE6e9GzcwDQ_zSKAapl3F4RQK-n-cUPyMJsvLxPkfdcRz43yGnPu3_MJX6K_6wwXkdDi93K"
              />
              <div className="hidden sm:flex flex-col">
                <span className="font-headline-sm text-[18px] tracking-tight text-[#00241a] leading-none font-bold">
                  Travel Ceylone
                </span>
                <span className="font-label-eyebrow text-[11px] uppercase text-[#8f4e00] tracking-widest mt-1 font-bold">
                  Sri Lanka Sanctuaries
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#f5f3f0]">
            {navItems.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-4 py-1.5 rounded-full font-label-lg text-[14px] transition-all ${
                    isActive
                      ? 'bg-[#0d3b2e] text-white font-semibold shadow-sm'
                      : 'text-[#414845] hover:text-[#1b1c1a] hover:bg-[#efeeeb]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* Currency Selector */}
            <div className="relative hidden xl:block">
              <button
                onClick={() => setCurrencyMenuOpen(!currencyMenuOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#efeeeb] text-[#414845] hover:text-[#1b1c1a] text-[13px] font-semibold transition-colors"
                type="button"
                aria-label="Select Currency"
              >
                <span className="material-symbols-outlined text-[16px]">language</span>
                <span>{currency} $ | EN</span>
                <span className="material-symbols-outlined text-[14px]">expand_more</span>
              </button>

              {currencyMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Currency
                  </div>
                  {(['USD', 'EUR', 'GBP', 'AUD'] as Currency[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        onCurrencyChange(c);
                        setCurrencyMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-[13px] flex items-center justify-between hover:bg-gray-50 ${
                        currency === c ? 'text-[#8f4e00] font-bold' : 'text-gray-700'
                      }`}
                    >
                      <span>{c}</span>
                      <span className="text-gray-400 text-xs">
                        {c === 'USD' ? '$' : c === 'EUR' ? '€' : c === 'GBP' ? '£' : 'A$'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search tours and destinations"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#414845] hover:bg-[#efeeeb] hover:text-[#1b1c1a] transition-all focus:outline-none"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Plan Your Trip CTA */}
            <button
              onClick={() => handleNav('plan-trip')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#8f4e00] text-white font-semibold text-[14px] shadow-[0_4px_16px_rgba(217,130,43,0.35)] hover:bg-[#6d3a00] hover:scale-[1.02] transition-all"
              type="button"
            >
              Plan Your Trip
            </button>

            {/* Traveler Profile / Bookmarks */}
            <button
              onClick={onOpenProfile}
              aria-label="Traveler Profile and Saved Journeys"
              className="relative p-0.5 rounded-full ring-2 ring-[#8f4e00]/40 hover:ring-[#8f4e00] transition-all focus:outline-none"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzZqXuGuUR9Coc_3LMN0Vxz9LRrhaafLfdYwG7wciOC_8TKgaDcDvmqdXjWSGkuy2AhpvHKKt3hHyUg1stXVUvcR7xSYo70LxwUdDZZa6J8Tv-v0zCWVMR7PUGn-fOugGNny2KX4RCKry58SSvJe55IjZiEhOmA7Bybu3S8xxiOAVWYvRU-6jR_FB2gBd4BvOI0tPkf5LSsHDrLjlAoF62dAYX5bMKpS2quXapwy4CnkhrIjndTdRhKA"
              />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8f4e00] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#1b1c1a] hover:bg-[#efeeeb] transition-colors focus:outline-none"
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden pt-20">
          <div className="bg-[#fbf9f6] border-b border-gray-200 p-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`text-left px-4 py-3 rounded-xl font-headline-sm text-[16px] transition-colors ${
                    activeScreen === item.id
                      ? 'bg-[#0d3b2e] text-white font-bold'
                      : 'text-[#1b1c1a] hover:bg-[#efeeeb]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
              <button
                onClick={() => handleNav('plan-trip')}
                className="w-full py-3 rounded-full bg-[#8f4e00] text-white font-bold text-center shadow-md"
              >
                Plan Your Tailored Trip
              </button>
              <div className="flex items-center justify-between px-2 text-xs text-[#414845]">
                <span>Language & Currency</span>
                <div className="flex gap-2">
                  {(['USD', 'EUR', 'GBP', 'AUD'] as Currency[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => onCurrencyChange(c)}
                      className={`px-2 py-1 rounded ${
                        currency === c ? 'bg-[#0d3b2e] text-white font-bold' : 'bg-gray-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
