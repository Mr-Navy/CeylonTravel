import React, { useState } from 'react';
import { TourPackage, Currency } from '../types';
import { CURRENCY_RATES } from '../data/travelData';

interface TourModalProps {
  tour: TourPackage | null;
  onClose: () => void;
  currency: Currency;
  onBookTour: (tour: TourPackage) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const TourModal: React.FC<TourModalProps> = ({
  tour,
  onClose,
  currency,
  onBookTour,
  isSaved,
  onToggleSave,
}) => {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'hotels'>('itinerary');

  if (!tour) return null;

  const rateInfo = CURRENCY_RATES[currency] || { symbol: '$', rate: 1.0 };
  const convertedPrice = Math.round(tour.priceUSD * rateInfo.rate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#fbf9f6] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-gray-100">
        
        {/* Tour Media Header */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden flex-shrink-0">
          <img src={tour.image} alt={tour.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00241a]/95 via-[#00241a]/40 to-transparent" />

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => onToggleSave(tour.id)}
              aria-label="Bookmark Tour"
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1b1c1a] hover:bg-white transition-all shadow-md"
            >
              <span
                className="material-symbols-outlined text-[20px] text-[#8f4e00]"
                style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
              >
                bookmark
              </span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1b1c1a] hover:bg-white transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Header titles */}
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                {tour.badge && (
                  <span className={`px-3 py-0.5 rounded-full font-label-eyebrow text-[11px] uppercase tracking-wider ${tour.badgeColor || 'bg-[#8f4e00] text-white'}`}>
                    {tour.badge}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                  {tour.days} Days / {tour.nights} Nights
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                  {tour.chauffeurType}
                </span>
              </div>
              <h2 className="font-headline-xl text-[28px] sm:text-[36px] text-white font-bold leading-tight">
                {tour.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-[#beedd9]">
                <span className="flex items-center text-[#fea047]">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <strong className="ml-1 text-white text-sm">{tour.rating}</strong>
                </span>
                <span>({tour.reviewsCount} verified traveler reviews)</span>
              </div>
            </div>

            {/* Price Tag */}
            <div className="text-left sm:text-right bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
              <span className="text-[11px] uppercase tracking-wider text-[#a3d0be] block font-semibold">All-Inclusive from</span>
              <span className="text-[26px] font-bold text-white">
                {rateInfo.symbol}{convertedPrice}
              </span>
              <span className="text-xs text-[#a3d0be]"> / person</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-gray-200 bg-white">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`pb-3 px-3 font-semibold text-sm transition-colors border-b-2 ${
              activeTab === 'itinerary'
                ? 'border-[#8f4e00] text-[#8f4e00]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Day-by-Day Itinerary ({tour.itinerary.length} Days)
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`pb-3 px-3 font-semibold text-sm transition-colors border-b-2 ${
              activeTab === 'inclusions'
                ? 'border-[#8f4e00] text-[#8f4e00]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Inclusions & Amenities
          </button>
          <button
            onClick={() => setActiveTab('hotels')}
            className={`pb-3 px-3 font-semibold text-sm transition-colors border-b-2 ${
              activeTab === 'hotels'
                ? 'border-[#8f4e00] text-[#8f4e00]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Handpicked Stays
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          
          {/* TAB 1: ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              <p className="text-[#414845] text-[15px] leading-relaxed">
                {tour.shortDesc}
              </p>

              <div className="space-y-3 pt-2">
                {tour.itinerary.map((day) => {
                  const isExpanded = activeDay === day.day;
                  return (
                    <div
                      key={day.day}
                      className={`rounded-xl border transition-all ${
                        isExpanded
                          ? 'border-[#0d3b2e] bg-white shadow-sm'
                          : 'border-gray-200 bg-white/70 hover:bg-white'
                      }`}
                    >
                      <button
                        onClick={() => setActiveDay(isExpanded ? 0 : day.day)}
                        className="w-full text-left p-4 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                              isExpanded
                                ? 'bg-[#0d3b2e] text-white'
                                : 'bg-[#efeeeb] text-[#00241a]'
                            }`}
                          >
                            D{day.day}
                          </span>
                          <div>
                            <h4 className="font-headline-sm text-[16px] text-[#00241a] font-bold">
                              {day.title}
                            </h4>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">hotel</span>
                              <span>Overnight: {day.overnight}</span>
                            </span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">
                          {isExpanded ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-5 pt-1 space-y-3 text-[14px] text-[#414845] border-t border-gray-100 mt-1">
                          <p className="leading-relaxed">{day.description}</p>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {day.activities.map((act, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#f5f3f0] text-xs font-medium text-[#1b1c1a]"
                              >
                                <span className="material-symbols-outlined text-[12px] text-[#8f4e00]">
                                  check_circle
                                </span>
                                <span>{act}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: INCLUSIONS */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-3">
                <h4 className="font-headline-sm text-[16px] text-[#0d3b2e] font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0d3b2e]">verified</span>
                  <span>What’s Included</span>
                </h4>
                <ul className="space-y-2 text-[14px] text-[#414845]">
                  {tour.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#8f4e00] font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-3">
                <h4 className="font-headline-sm text-[16px] text-[#8f4e00] font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#8f4e00]">info</span>
                  <span>Exclusions & Optional</span>
                </h4>
                <ul className="space-y-2 text-[14px] text-[#414845]">
                  {tour.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-gray-400 font-bold">—</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: RECOMMENDED HOTELS */}
          {activeTab === 'hotels' && (
            <div className="space-y-4">
              <p className="text-[14px] text-gray-600">
                We partner with boutique heritage mansions, colonial tea bungalows, and luxury eco-tented lodges across Sri Lanka. You can tailor your preferred room category.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tour.recommendedHotels.map((hotel, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-gray-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#efeeeb] text-[#8f4e00] flex items-center justify-center font-bold flex-shrink-0">
                      <span className="material-symbols-outlined text-[20px]">villa</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-[15px] text-[#00241a]">{hotel}</h5>
                      <p className="text-xs text-gray-500">5-Star Luxury / Relais & Châteaux Partner</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-6 bg-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-gray-500">All-Inclusive Quote from</div>
            <div className="text-[24px] font-bold text-[#00241a]">
              {rateInfo.symbol}{convertedPrice} <span className="text-xs font-normal text-gray-500">/ person (twin share)</span>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => {
                onBookTour(tour);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-7 py-3 rounded-full bg-[#8f4e00] text-white font-bold text-sm shadow-md hover:bg-[#6d3a00] transition-colors"
            >
              Inquire / Customize This Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
