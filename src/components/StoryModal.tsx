import React from 'react';
import { TravelStory } from '../types';

interface StoryModalProps {
  story: TravelStory | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  story,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#fbf9f6] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-gray-100">
        
        {/* Story Header Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden flex-shrink-0">
          <img src={story.image} alt={story.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00241a]/90 via-black/30 to-transparent" />

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => onToggleSave(story.id)}
              aria-label="Bookmark Story"
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

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#beedd9]">
              <span className="px-2.5 py-0.5 rounded-full bg-[#8f4e00] text-white font-bold uppercase tracking-wider text-[10px]">
                {story.category}
              </span>
              <span>•</span>
              <span>{story.readTime}</span>
              <span>•</span>
              <span>{story.date}</span>
            </div>
            <h2 className="font-headline-xl text-[26px] sm:text-[32px] text-white font-bold leading-tight">
              {story.title}
            </h2>
          </div>
        </div>

        {/* Story Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
          <p className="font-headline-md text-[18px] text-[#00241a] italic border-l-4 border-[#8f4e00] pl-4 py-1">
            {story.summary}
          </p>

          <div className="space-y-4 text-[15px] text-[#414845] leading-relaxed pt-2">
            {story.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#efeeeb] flex items-center justify-between mt-6">
            <div className="text-xs text-[#414845]">
              Curated by the resident concierge team at <strong>Travel Ceylone</strong>.
            </div>
            <button
              onClick={() => onToggleSave(story.id)}
              className="text-xs font-bold text-[#8f4e00] flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isSaved ? 'bookmark_added' : 'bookmark_add'}
              </span>
              <span>{isSaved ? 'Saved in Profile' : 'Save Story'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#0d3b2e] text-white font-semibold text-sm hover:bg-[#00241a]"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
};
