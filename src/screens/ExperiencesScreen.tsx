import React, { useState } from 'react';
import { EXPERIENCES_DATA } from '../data/travelData';
import { Experience } from '../types';

interface ExperiencesScreenProps {
  onSelectExperience: (e: Experience) => void;
  onBookExperience: (e: Experience) => void;
}

export const ExperiencesScreen: React.FC<ExperiencesScreenProps> = ({
  onSelectExperience,
  onBookExperience,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Experiences');

  const categories = [
    'All Experiences',
    'Scenic Rail',
    'Wildlife Phenomenon',
    'Coastal Traditions',
    'Gastronomy',
    'Historical Adventure',
    'Heritage Craft',
    'Marine Safari',
  ];

  const filtered = EXPERIENCES_DATA.filter((exp) => {
    if (selectedCategory === 'All Experiences') return true;
    return exp.category === selectedCategory;
  });

  return (
    <div className="w-full bg-[#fbf9f6] min-h-screen pb-20">
      
      {/* Header Banner */}
      <section className="relative w-full py-20 bg-[#00241a] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuASUvisPEvGhiWnaVSqudRd2jw8yOmeb61RLs2sJcN-EGtJU0ynlU0qS9YdotkZ8o49wnv71ArK-_b8_KGTJrmJTpTWLSFbaq9T0tWOxUfELbli4Nzm6ER592fq2Lq2uOTAjwNTrXqxg9ek7_zDVGhZP1kiHd8Uccy50m5szkY3Z_TU-8mlO78YQ4CJn4yvhfwI5-jrRaMzddYHu3LaG8l7LDJD9My_IL0JiocMt7ypzH0kU9RJUDfqTA')`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8f4e00] text-white text-[11px] font-bold uppercase tracking-widest mx-auto">
            <span>Sensory Ceylon Immersion</span>
          </div>
          <h1 className="font-headline-xl text-[36px] sm:text-[48px] text-white font-bold leading-tight">
            Curated Sri Lankan Experiences
          </h1>
          <p className="font-body-lg text-[16px] text-[#a3d0be] max-w-2xl mx-auto leading-relaxed">
            Move beyond regular tour itineraries: smell single-origin tea leaves in the morning fog, share clay-pot curries with rural families, and witness wild elephant herds at twilight.
          </p>
        </div>
      </section>

      {/* Filter Rail */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16 -mt-7 relative z-20">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#00241a] text-white shadow-sm'
                  : 'bg-[#efeeeb] text-[#414845] hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Experiences Grid */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#8f4e00] text-white text-[11px] font-bold uppercase tracking-wider">
                      {exp.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs text-[#beedd9] flex items-center gap-1 font-semibold">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      <span>{exp.location}</span>
                    </span>
                    <h3 className="font-headline-md text-[20px] font-bold text-white leading-tight">
                      {exp.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <p className="text-[#414845] text-sm leading-relaxed line-clamp-3">
                    {exp.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <span className="flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[15px] text-[#8f4e00]">timer</span>
                      <span>{exp.duration}</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[15px] text-[#8f4e00]">schedule</span>
                      <span>{exp.idealTime}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-gray-100 mt-2">
                <button
                  onClick={() => onSelectExperience(exp)}
                  className="text-xs font-bold text-[#8f4e00] hover:underline"
                >
                  View Full Details →
                </button>
                <button
                  onClick={() => onBookExperience(exp)}
                  className="px-4 py-2 rounded-full bg-[#00241a] text-white text-xs font-bold hover:bg-[#8f4e00] transition-colors"
                >
                  Add to Custom Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
