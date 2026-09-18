import React from 'react';
import { Destination } from '../types';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onPlanTripTo: (destName: string) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onPlanTripTo,
  isSaved,
  onToggleSave,
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#fbf9f6] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-gray-100">
        
        {/* Header Media */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden flex-shrink-0">
          <img
            src={destination.image}
            alt={destination.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00241a]/90 via-[#00241a]/30 to-transparent" />

          {/* Close & Bookmark Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => onToggleSave(destination.id)}
              aria-label="Bookmark Destination"
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

          {/* Title on Image */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8f4e00] text-white text-[11px] font-bold uppercase tracking-wider">
              <span>{destination.region}</span>
              <span>•</span>
              <span>{destination.tag}</span>
            </div>
            <h2 className="font-headline-xl text-[32px] sm:text-[40px] text-white leading-tight font-bold">
              {destination.name}
            </h2>
            <p className="text-[#a3d0be] text-[14px] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#ffb77a]">location_on</span>
              <span>{destination.district}</span>
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white border border-gray-100 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Climate</span>
              <span className="font-semibold text-[13px] text-[#00241a]">{destination.climate}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-gray-100 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Best Season</span>
              <span className="font-semibold text-[13px] text-[#00241a]">{destination.bestSeason}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-gray-100 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">From Colombo</span>
              <span className="font-semibold text-[13px] text-[#00241a]">{destination.travelTimeFromColombo}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-gray-100 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Ideal Stay</span>
              <span className="font-semibold text-[13px] text-[#00241a]">{destination.idealStayDuration}</span>
            </div>
          </div>

          {/* Editorial Description */}
          <div className="space-y-2">
            <h3 className="font-headline-sm text-[18px] text-[#00241a] font-bold">About {destination.name}</h3>
            <p className="text-[#414845] text-[15px] leading-relaxed">
              {destination.longDescription}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            <h3 className="font-headline-sm text-[18px] text-[#00241a] font-bold">Curated Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {destination.highlights.map((h, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-gray-100 text-[14px] text-[#1b1c1a]"
                >
                  <span className="w-6 h-6 rounded-full bg-[#efeeeb] text-[#8f4e00] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    ✓
                  </span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 md:p-6 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-500 text-center sm:text-left">
            Include <strong className="text-[#00241a]">{destination.name}</strong> in your custom Ceylon itinerary.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onPlanTripTo(destination.name);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full bg-[#8f4e00] text-white font-semibold text-sm shadow-md hover:bg-[#6d3a00] transition-colors"
            >
              Plan Trip to {destination.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
