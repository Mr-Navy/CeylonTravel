import React, { useState, useMemo } from 'react';
import { DESTINATIONS_DATA, TOURS_DATA, EXPERIENCES_DATA } from '../data/travelData';
import { Destination, TourPackage, Experience } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (d: Destination) => void;
  onSelectTour: (t: TourPackage) => void;
  onSelectExperience: (e: Experience) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDestination,
  onSelectTour,
  onSelectExperience,
}) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        destinations: DESTINATIONS_DATA.slice(0, 4),
        tours: TOURS_DATA.slice(0, 3),
        experiences: EXPERIENCES_DATA.slice(0, 3),
      };
    }

    return {
      destinations: DESTINATIONS_DATA.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.district.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      ),
      tours: TOURS_DATA.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.shortDesc.toLowerCase().includes(q) ||
          t.highlights.some((h) => h.toLowerCase().includes(q))
      ),
      experiences: EXPERIENCES_DATA.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q)
      ),
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#fbf9f6] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[85vh]">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
          <span className="material-symbols-outlined text-[24px] text-[#8f4e00]">search</span>
          <input
            type="text"
            placeholder="Search Sigiriya, Blue Train, Leopard Safari, Tea Estates..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-[#1b1c1a] font-medium text-[16px] focus:outline-none placeholder-gray-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-700 text-sm font-semibold"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Results Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Quick Filter suggestions if query is empty */}
          {!query && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['Ella Nine Arch Bridge', 'Sigiriya Rock', 'Yala Leopard Safari', 'Blue Train', 'Galle Fort', 'Highland Tea'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1 rounded-full bg-[#efeeeb] text-[12px] font-semibold text-[#414845] hover:bg-[#8f4e00] hover:text-white transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Destinations */}
          {filtered.destinations.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8f4e00] block mb-2.5">
                Destinations ({filtered.destinations.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filtered.destinations.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onSelectDestination(d);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white hover:bg-[#f5f3f0] cursor-pointer transition-all border border-gray-100 hover:border-gray-200 group"
                  >
                    <img src={d.image} alt={d.alt} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-[14px] text-[#00241a] group-hover:text-[#8f4e00] truncate">
                        {d.name}
                      </div>
                      <div className="text-[12px] text-gray-500 truncate">{d.district} • {d.tag}</div>
                    </div>
                    <span className="material-symbols-outlined text-[16px] text-gray-300 group-hover:text-[#8f4e00]">
                      chevron_right
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tours */}
          {filtered.tours.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00241a] block mb-2.5">
                Tour Packages ({filtered.tours.length})
              </span>
              <div className="space-y-2">
                {filtered.tours.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onSelectTour(t);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#f5f3f0] cursor-pointer transition-all border border-gray-100 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={t.image} alt={t.alt} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="font-bold text-[14px] text-[#00241a] group-hover:text-[#8f4e00] truncate">
                          {t.title}
                        </div>
                        <div className="text-[12px] text-gray-500">
                          {t.days} Days / {t.nights} Nights • ⭐ {t.rating}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 pl-3">
                      <div className="font-bold text-[14px] text-[#8f4e00]">${t.priceUSD}</div>
                      <div className="text-[11px] text-gray-400">per person</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experiences */}
          {filtered.experiences.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#003b3b] block mb-2.5">
                Authentic Experiences ({filtered.experiences.length})
              </span>
              <div className="space-y-2">
                {filtered.experiences.map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => {
                      onSelectExperience(exp);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white hover:bg-[#f5f3f0] cursor-pointer transition-all border border-gray-100 group"
                  >
                    <img src={exp.image} alt={exp.alt} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-[14px] text-[#00241a] group-hover:text-[#8f4e00] truncate">
                        {exp.title}
                      </div>
                      <div className="text-[12px] text-gray-500 truncate">
                        {exp.category} • {exp.duration}
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[16px] text-gray-300 group-hover:text-[#8f4e00]">
                      chevron_right
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {filtered.destinations.length === 0 &&
            filtered.tours.length === 0 &&
            filtered.experiences.length === 0 && (
              <div className="text-center py-12 space-y-2">
                <span className="material-symbols-outlined text-[48px] text-gray-300">travel_explore</span>
                <p className="font-bold text-[16px] text-gray-600">No destinations or tours found</p>
                <p className="text-[13px] text-gray-400">Try searching for &quot;Ella&quot;, &quot;Safari&quot;, or &quot;Galle&quot;</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
