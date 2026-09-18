import React from 'react';
import { Experience } from '../types';

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
  onBookExperience: (exp: Experience) => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  experience,
  onClose,
  onBookExperience,
}) => {
  if (!experience) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#fbf9f6] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-gray-100">
        
        {/* Media Header */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden flex-shrink-0">
          <img src={experience.image} alt={experience.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00241a]/95 via-[#00241a]/30 to-transparent" />

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1b1c1a] hover:bg-white transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <span className="px-3 py-0.5 rounded-full bg-[#8f4e00] text-white text-[11px] font-bold uppercase tracking-wider">
              {experience.category}
            </span>
            <h2 className="font-headline-xl text-[26px] sm:text-[32px] text-white font-bold leading-tight">
              {experience.title}
            </h2>
            <div className="text-xs text-[#beedd9] flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                {experience.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">timer</span>
                {experience.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="p-4 rounded-xl bg-white border border-gray-100 space-y-2">
            <div className="text-xs uppercase font-bold text-gray-400">Best Time of Day</div>
            <div className="text-sm font-semibold text-[#00241a] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#8f4e00]">schedule</span>
              <span>{experience.idealTime}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-headline-sm text-[18px] text-[#00241a] font-bold">About This Experience</h3>
            <p className="text-[#414845] text-[15px] leading-relaxed">
              {experience.description}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#efeeeb] text-xs text-[#414845] space-y-1">
            <div className="font-bold text-[#00241a]">Travel Ceylone Assurance:</div>
            <p>All experiences can be seamlessly integrated into your customized multi-day private tour package with dedicated chauffeur transportation and reserved VIP access.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={() => {
              onBookExperience(experience);
              onClose();
            }}
            className="px-6 py-2.5 rounded-full bg-[#8f4e00] text-white font-bold text-sm shadow-md hover:bg-[#6d3a00] transition-colors"
          >
            Add to My Custom Trip
          </button>
        </div>
      </div>
    </div>
  );
};
