import React, { useState } from 'react';
import { TOURS_DATA, CURRENCY_RATES } from '../data/travelData';
import { TourPackage, Currency } from '../types';

interface ToursScreenProps {
  onSelectTour: (t: TourPackage) => void;
  onBookTour: (t: TourPackage) => void;
  currency: Currency;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export const ToursScreen: React.FC<ToursScreenProps> = ({
  onSelectTour,
  onBookTour,
  currency,
  savedIds,
  onToggleSave,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Journeys');
  const [durationFilter, setDurationFilter] = useState<string>('all');

  const rateInfo = CURRENCY_RATES[currency] || { symbol: '$', rate: 1.0 };

  const categories = [
    'All Journeys',
    'Classic & Cultural',
    'Wildlife & Nature',
    'Coast & Relaxation',
    'Luxury Signature',
  ];

  const filtered = TOURS_DATA.filter((tour) => {
    const matchesCat = activeCategory === 'All Journeys' || tour.category === activeCategory;
    let matchesDuration = true;
    if (durationFilter === 'short') matchesDuration = tour.days <= 6;
    if (durationFilter === 'medium') matchesDuration = tour.days >= 7 && tour.days <= 8;
    if (durationFilter === 'long') matchesDuration = tour.days >= 9;
    return matchesCat && matchesDuration;
  });

  return (
    <div className="w-full bg-[#fbf9f6] min-h-screen pb-20">
      
      {/* Header Banner */}
      <section className="relative w-full py-20 bg-[#00241a] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAfLi1Fe-NKUr2SbXE2xselKGKjoLRVjbSgU7uPErOyMA-tPDPlrZN7QJBeTgMNF4a7SA51d8VjezH2FQDM1sJWDMR5vaDaZQFLTCxx-6b1whvZYm0gGkT576FN4RQ148XgNTb3gqMevsretXAns_0Kqy_wEP5ofAsVAo7D16DMxOIH52RPv9RfR305aMlEJbaHtNXVTS09ohAtD6QsjnovjA_2PhPcQxvu-65NIfOJ1ZwoO_IDNttHw')`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8f4e00] text-white text-[11px] font-bold uppercase tracking-widest mx-auto">
            <span>Bespoke Private Journeys</span>
          </div>
          <h1 className="font-headline-xl text-[36px] sm:text-[48px] text-white font-bold leading-tight">
            Curated Ceylon Expeditions
          </h1>
          <p className="font-body-lg text-[16px] text-[#a3d0be] max-w-2xl mx-auto leading-relaxed">
            Every journey includes a private luxury vehicle, experienced English-speaking chauffeur-guide, handpicked luxury accommodations, and fully flexible day schedules.
          </p>
        </div>
      </section>

      {/* Filter Rail */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16 -mt-7 relative z-20">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#00241a] text-white shadow-sm'
                    : 'bg-[#efeeeb] text-[#414845] hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-gray-500 whitespace-nowrap">Duration:</span>
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="px-3 py-1.5 rounded-full bg-[#f5f3f0] text-xs font-semibold text-[#1b1c1a] border border-gray-200 focus:outline-none"
            >
              <option value="all">Any Duration</option>
              <option value="short">4–6 Days</option>
              <option value="medium">7–8 Days</option>
              <option value="long">9+ Days (Grand Circuit)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tour Cards Grid */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((tour) => {
            const convertedPrice = Math.round(tour.priceUSD * rateInfo.rate);
            const isSaved = savedIds.includes(tour.id);
            return (
              <div
                key={tour.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {tour.badge && (
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${tour.badgeColor || 'bg-[#8f4e00] text-white'}`}>
                          {tour.badge}
                        </span>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => onToggleSave(tour.id)}
                      aria-label="Save tour"
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#8f4e00] hover:bg-white shadow"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        bookmark
                      </span>
                    </button>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-semibold">
                        {tour.days} Days / {tour.nights} Nights
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-semibold">
                        {tour.chauffeurType}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1 text-[#8f4e00]">
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="text-sm font-bold text-[#1b1c1a]">{tour.rating}</span>
                      <span className="text-xs text-gray-500">({tour.reviewsCount} reviews)</span>
                    </div>

                    <h3
                      onClick={() => onSelectTour(tour)}
                      className="font-headline-md text-[22px] font-bold text-[#00241a] group-hover:text-[#8f4e00] cursor-pointer transition-colors"
                    >
                      {tour.title}
                    </h3>

                    <p className="text-[#414845] text-sm leading-relaxed line-clamp-2">
                      {tour.shortDesc}
                    </p>

                    <div className="pt-2 space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        Key Experiences
                      </div>
                      <ul className="space-y-1 text-xs text-[#414845]">
                        {tour.highlights.slice(0, 3).map((h, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-[#8f4e00] font-bold">✓</span>
                            <span className="line-clamp-1">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 flex items-center justify-between gap-3 mt-4">
                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">From</span>
                    <span className="text-[22px] font-bold text-[#00241a]">
                      {rateInfo.symbol}{convertedPrice}
                    </span>
                    <span className="text-xs text-gray-500"> / person</span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => onSelectTour(tour)}
                      className="px-4 py-2 rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
                    >
                      Itinerary
                    </button>
                    <button
                      onClick={() => onBookTour(tour)}
                      className="px-4 py-2 rounded-full bg-[#8f4e00] text-white text-xs font-bold hover:bg-[#6d3a00]"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
