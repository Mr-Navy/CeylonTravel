import React, { useState } from 'react';
import { DESTINATIONS_DATA } from '../data/travelData';
import { Destination } from '../types';

interface DestinationsScreenProps {
  onSelectDestination: (d: Destination) => void;
  onPlanTripTo: (destName: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export const DestinationsScreen: React.FC<DestinationsScreenProps> = ({
  onSelectDestination,
  onPlanTripTo,
  savedIds,
  onToggleSave,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [searchFilter, setSearchFilter] = useState('');

  const regions = [
    'All Regions',
    'Hill Country',
    'Cultural Triangle',
    'Southern Coast',
    'Wildlife',
    'Western Province',
  ];

  const filtered = DESTINATIONS_DATA.filter((dest) => {
    const matchesRegion = selectedRegion === 'All Regions' || dest.region === selectedRegion;
    const matchesQuery =
      dest.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      dest.district.toLowerCase().includes(searchFilter.toLowerCase()) ||
      dest.highlights.some((h) => h.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesRegion && matchesQuery;
  });

  return (
    <div className="w-full bg-[#fbf9f6] min-h-screen pb-20">
      
      {/* Screen Header Banner */}
      <section className="relative w-full py-20 bg-[#00241a] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCL1mF1JbBOsydKRvPYXv-pTjwkTbrfiaz8993wasqjbi2w7hvAQ_47nS5oYffXTxsb7mk_7eull5dzXMAL6W4tiDvA4-AaOWYUk84r_Vz-ku4PXVnOdeRmfwG8NHM4HmobxCJgQkcc_zrj6ip3XAIRvC8xxfsY00lE2ua4YPNmlq9EkIe8A43E_5ESAEjXjOCU-fN0NFlAuo_OnUFImeazweQIdru43h1TppZpg_bt8p7dOKrPonR26g')`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8f4e00] text-white text-[11px] font-bold uppercase tracking-widest mx-auto">
            <span>Sri Lanka Regional Sanctuaries</span>
          </div>
          <h1 className="font-headline-xl text-[36px] sm:text-[48px] text-white font-bold leading-tight">
            Explore Sri Lanka by Region
          </h1>
          <p className="font-body-lg text-[16px] text-[#a3d0be] max-w-2xl mx-auto leading-relaxed">
            From the misty high-altitude tea peaks of Ella and Nuwara Eliya to the 2,500-year-old citadels of Sigiriya and golden coastal whale bays of Mirissa.
          </p>
        </div>
      </section>

      {/* Filter & Controls Rail */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16 -mt-7 relative z-20">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedRegion === reg
                    ? 'bg-[#00241a] text-white shadow-sm'
                    : 'bg-[#efeeeb] text-[#414845] hover:bg-gray-200'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Quick Search inside page */}
          <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-full bg-[#f5f3f0] text-xs text-[#1b1c1a] focus:outline-none focus:ring-1 focus:ring-[#8f4e00]"
            />
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16 pt-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Showing {filtered.length} of {DESTINATIONS_DATA.length} Regional Sanctuaries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => {
            const isSaved = savedIds.includes(dest.id);
            return (
              <div
                key={dest.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#00241a] uppercase tracking-wider">
                        {dest.tag}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleSave(dest.id)}
                      aria-label="Save destination"
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#8f4e00] hover:bg-white shadow"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        bookmark
                      </span>
                    </button>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[12px] text-[#ffdcc2] font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                        <span>{dest.district}</span>
                      </span>
                      <h3 className="font-headline-md text-[24px] font-bold text-white leading-tight">
                        {dest.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-[#414845] text-[14px] leading-relaxed line-clamp-3">
                      {dest.longDescription}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-[#414845] bg-[#f5f3f0] p-3 rounded-xl">
                      <div>
                        <span className="font-bold text-gray-500 block">Best Season:</span>
                        <span>{dest.bestSeason}</span>
                      </div>
                      <div>
                        <span className="font-bold text-gray-500 block">Climate:</span>
                        <span>{dest.climate}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        Top Attractions
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {dest.highlights.slice(0, 3).map((h, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-md bg-[#efeeeb] text-[11px] text-[#1b1c1a]"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-gray-100 mt-2">
                  <button
                    onClick={() => onSelectDestination(dest)}
                    className="text-xs font-bold text-[#8f4e00] hover:underline"
                  >
                    View Destination Details →
                  </button>
                  <button
                    onClick={() => onPlanTripTo(dest.name)}
                    className="px-4 py-2 rounded-full bg-[#00241a] text-white text-xs font-bold hover:bg-[#8f4e00] transition-colors"
                  >
                    Plan Custom Trip
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
