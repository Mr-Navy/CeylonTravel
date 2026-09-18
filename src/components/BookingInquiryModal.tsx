import React, { useState } from 'react';
import { TourPackage, Experience, Currency } from '../types';
import { CURRENCY_RATES } from '../data/travelData';

interface BookingInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: TourPackage | null;
  experience: Experience | null;
  customDestination?: string;
  currency: Currency;
}

export const BookingInquiryModal: React.FC<BookingInquiryModalProps> = ({
  isOpen,
  onClose,
  tour,
  experience,
  customDestination,
  currency,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [hotelTier, setHotelTier] = useState('5-star-boutique');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const rateInfo = CURRENCY_RATES[currency] || { symbol: '$', rate: 1.0 };
  const estimatedPrice = tour ? Math.round(tour.priceUSD * rateInfo.rate * parseInt(guests || '1', 10)) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#fbf9f6] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-gray-100">
        
        {/* Header */}
        <div className="p-6 bg-[#00241a] text-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#8f4e00] text-white text-[10px] font-bold uppercase tracking-wider mb-1">
              <span>Bespoke Concierge Booking</span>
            </div>
            <h3 className="font-headline-sm text-[20px] font-bold text-white">
              {tour
                ? `Inquire for ${tour.title}`
                : experience
                ? `Book Experience: ${experience.title}`
                : customDestination
                ? `Custom Journey to ${customDestination}`
                : 'Plan Your Custom Ceylon Journey'}
            </h3>
            <p className="text-xs text-[#beedd9]">
              Direct inquiry to Travel Ceylone’s Colombo 03 Private Concierge Desk
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            aria-label="Close inquiry modal"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#beedd9] text-[#00241a] flex items-center justify-center mx-auto shadow-lg">
                <span className="material-symbols-outlined text-[36px]">verified</span>
              </div>
              <h4 className="font-headline-md text-[24px] font-bold text-[#00241a]">
                Bespoke Inquiry Received!
              </h4>
              <p className="text-sm text-[#414845] max-w-md mx-auto leading-relaxed">
                Ayubowan, <strong>{name}</strong>! Your customized travel dossier has been assigned to our senior Ceylon expedition director. We will reply to <strong>{email}</strong> within 12 hours with a comprehensive itinerary proposal and fixed quote.
              </p>
              <div className="p-4 rounded-xl bg-white border border-gray-200 text-left text-xs text-gray-600 space-y-1 max-w-md mx-auto">
                <div><strong>Inquiry Reference:</strong> TC-2026-{Math.floor(100000 + Math.random() * 900000)}</div>
                <div><strong>Party:</strong> {guests} Travelers</div>
                {tour && <div><strong>Selected Journey:</strong> {tour.title} ({tour.days} Days)</div>}
                <div><strong>Estimated Total:</strong> {estimatedPrice ? `${rateInfo.symbol}${estimatedPrice.toLocaleString()}` : 'Bespoke Quote'}</div>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/94771234567?text=Hello%20Travel%20Ceylone,%20I%20just%20submitted%20an%20inquiry%20for%20${encodeURIComponent(name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0d3b2e] text-white text-xs font-bold shadow hover:bg-[#00241a]"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Connect Instantly on WhatsApp</span>
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100"
                >
                  Return to Exploration
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Tour / Experience Summary Box */}
              {(tour || experience) && (
                <div className="p-3 rounded-xl bg-[#efeeeb] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={tour?.image || experience?.image}
                      alt="Thumbnail"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-bold text-[#00241a]">{tour?.title || experience?.title}</div>
                      <div className="text-gray-500">
                        {tour ? `${tour.days} Days / ${tour.nights} Nights` : experience?.duration}
                      </div>
                    </div>
                  </div>
                  {tour && (
                    <div className="text-right">
                      <div className="font-bold text-[#8f4e00] text-sm">{rateInfo.symbol}{Math.round(tour.priceUSD * rateInfo.rate)}</div>
                      <div className="text-[10px] text-gray-500">/ person</div>
                    </div>
                  )}
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Mitchell"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#8f4e00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#8f4e00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    WhatsApp / Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+44 7911 123456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#8f4e00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Target Dates
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#8f4e00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#8f4e00]"
                  >
                    <option value="1">1 Solo Traveler</option>
                    <option value="2">2 Travelers (Couple)</option>
                    <option value="3">3 Travelers</option>
                    <option value="4">4 Travelers (Family)</option>
                    <option value="5">5+ Group</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Preferred Accommodation Standard
                </label>
                <select
                  value={hotelTier}
                  onChange={(e) => setHotelTier(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#8f4e00]"
                >
                  <option value="5-star-boutique">5-Star Luxury & Heritage Boutique (Recommended)</option>
                  <option value="relais-chateaux">Relais & Châteaux / Aman Ultra Luxury</option>
                  <option value="eco-tented">Luxury Eco Glamping & Safari Lodges</option>
                  <option value="4-star-superior">4-Star Superior Handpicked</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Special Wishes or Dietary Preferences
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., Honeymoon anniversary celebration, vegetarian options, prefer relaxed mornings..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#8f4e00]"
                />
              </div>

              {/* Reassurance */}
              <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#8f4e00]">lock</span>
                  <span>100% Privacy</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#8f4e00]">verified</span>
                  <span>Zero Obligation Quote</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#8f4e00]">timer</span>
                  <span>Response in &lt;12h</span>
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#8f4e00] text-white font-bold text-sm shadow-lg hover:bg-[#6d3a00] transition-colors"
                >
                  Submit Bespoke Travel Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
