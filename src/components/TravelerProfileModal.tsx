import React from 'react';
import { DESTINATIONS_DATA, TOURS_DATA } from '../data/travelData';
import { Destination, TourPackage } from '../types';

interface TravelerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onRemoveSaved: (id: string) => void;
  onSelectDestination: (d: Destination) => void;
  onSelectTour: (t: TourPackage) => void;
  onPlanTrip: () => void;
}

export const TravelerProfileModal: React.FC<TravelerProfileModalProps> = ({
  isOpen,
  onClose,
  savedIds,
  onRemoveSaved,
  onSelectDestination,
  onSelectTour,
  onPlanTrip,
}) => {
  if (!isOpen) return null;

  const savedDestinations = DESTINATIONS_DATA.filter((d) => savedIds.includes(d.id));
  const savedTours = TOURS_DATA.filter((t) => savedIds.includes(t.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#fbf9f6] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-gray-100">
        
        {/* Profile Header */}
        <div className="p-6 bg-[#00241a] text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              alt="Traveler Avatar"
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[#8f4e00]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzZqXuGuUR9Coc_3LMN0Vxz9LRrhaafLfdYwG7wciOC_8TKgaDcDvmqdXjWSGkuy2AhpvHKKt3hHyUg1stXVUvcR7xSYo70LxwUdDZZa6J8Tv-v0zCWVMR7PUGn-fOugGNny2KX4RCKry58SSvJe55IjZiEhOmA7Bybu3S8xxiOAVWYvRU-6jR_FB2gBd4BvOI0tPkf5LSsHDrLjlAoF62dAYX5bMKpS2quXapwy4CnkhrIjndTdRhKA"
            />
            <div>
              <h3 className="font-headline-sm text-[20px] font-bold text-white">Ceylon Traveler Lounge</h3>
              <p className="text-xs text-[#beedd9]">Personalized saved sanctuaries & trip wishes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close profile"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Summary Banner */}
          <div className="p-4 rounded-xl bg-white border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[24px] text-[#8f4e00]">bookmark</span>
              <div>
                <div className="font-bold text-[14px] text-[#00241a]">
                  {savedIds.length} Saved {savedIds.length === 1 ? 'Item' : 'Items'}
                </div>
                <div className="text-xs text-gray-500">Easily reference your favorite Ceylon spots</div>
              </div>
            </div>
            {savedIds.length > 0 && (
              <button
                onClick={() => {
                  onPlanTrip();
                  onClose();
                }}
                className="px-4 py-1.5 rounded-full bg-[#8f4e00] text-white text-xs font-bold shadow hover:bg-[#6d3a00]"
              >
                Assemble into Trip
              </button>
            )}
          </div>

          {/* Saved Destinations */}
          {savedDestinations.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-bold text-[14px] text-[#00241a] uppercase tracking-wider text-xs">
                Saved Destinations ({savedDestinations.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedDestinations.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-gray-200 group"
                  >
                    <div
                      onClick={() => {
                        onSelectDestination(d);
                        onClose();
                      }}
                      className="flex items-center gap-3 cursor-pointer min-w-0"
                    >
                      <img src={d.image} alt={d.alt} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-[#00241a] group-hover:text-[#8f4e00] truncate">
                          {d.name}
                        </div>
                        <div className="text-xs text-gray-500">{d.region}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveSaved(d.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                      title="Remove bookmark"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Tours */}
          {savedTours.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-bold text-[14px] text-[#00241a] uppercase tracking-wider text-xs">
                Saved Tour Itineraries ({savedTours.length})
              </h4>
              <div className="space-y-2">
                {savedTours.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200 group"
                  >
                    <div
                      onClick={() => {
                        onSelectTour(t);
                        onClose();
                      }}
                      className="flex items-center gap-3 cursor-pointer min-w-0"
                    >
                      <img src={t.image} alt={t.alt} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-[#00241a] group-hover:text-[#8f4e00] truncate">
                          {t.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {t.days} Days • ${t.priceUSD}/person
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveSaved(t.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                      title="Remove bookmark"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {savedIds.length === 0 && (
            <div className="text-center py-10 space-y-3">
              <span className="material-symbols-outlined text-[48px] text-gray-300">bookmark_border</span>
              <p className="font-bold text-gray-600 text-sm">No saved items yet</p>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Tap the bookmark icon on any destination or tour card to keep track of experiences for your upcoming Ceylon trip.
              </p>
            </div>
          )}

          {/* Traveler Quick Tips */}
          <div className="p-4 rounded-xl bg-[#f5f3f0] space-y-2 border border-gray-200">
            <div className="text-xs font-bold uppercase tracking-wider text-[#00241a] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#8f4e00]">lightbulb</span>
              <span>Sri Lanka Travel Reminder</span>
            </div>
            <p className="text-xs text-[#414845] leading-relaxed">
              Standard tourist Electronic Travel Authorization (ETA) can be obtained online prior to departure via official SL government channels. Our 24/7 concierge assists with all flight connections and private chauffeur assignments upon arrival.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#0d3b2e] text-white font-semibold text-sm hover:bg-[#00241a]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
