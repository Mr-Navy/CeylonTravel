import React, { useState } from 'react';
import { Currency } from '../types';
import { CURRENCY_RATES, DESTINATIONS_DATA, EXPERIENCES_DATA } from '../data/travelData';

interface TripPlannerScreenProps {
  currency: Currency;
  initialDestination?: string;
  onNavigateHome: () => void;
}

export const TripPlannerScreen: React.FC<TripPlannerScreenProps> = ({
  currency,
  initialDestination,
  onNavigateHome,
}) => {
  const [step, setStep] = useState<number>(1);

  // Selections
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    initialDestination ? [initialDestination] : ['Cultural Triangle', 'Hill Country']
  );
  const [durationDays, setDurationDays] = useState<number>(7);
  const [travelPace, setTravelPace] = useState<'relaxed' | 'balanced' | 'active'>('balanced');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [hotelStandard, setHotelStandard] = useState<'boutique' | 'luxury' | 'relais'>('boutique');
  const [vehicleType, setVehicleType] = useState<'alphard' | 'suv' | 'sedan'>('alphard');
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([
    'Ride the Legendary Kandy–Ella Blue Train',
    'The Great Elephant Gathering',
  ]);

  // Traveler info
  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [travelerPhone, setTravelerPhone] = useState('');
  const [travelMonth, setTravelMonth] = useState('December 2026');
  const [specialNotes, setSpecialNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const rateInfo = CURRENCY_RATES[currency] || { symbol: '$', rate: 1.0 };

  // Calculate dynamic estimated price
  const baseRatePerDay =
    hotelStandard === 'relais' ? 340 : hotelStandard === 'luxury' ? 220 : 160;
  const vehicleRatePerDay = vehicleType === 'alphard' ? 65 : vehicleType === 'suv' ? 55 : 45;
  const estimatedTotalUSD = (baseRatePerDay * durationDays * travelersCount) + (vehicleRatePerDay * durationDays) + (selectedExperiences.length * 45);
  const convertedTotal = Math.round(estimatedTotalUSD * rateInfo.rate);

  const availableRegions = [
    { id: 'Cultural Triangle', label: 'Cultural Triangle', sub: 'Sigiriya, Dambulla & Ancient Kingdoms', icon: 'castle' },
    { id: 'Hill Country', label: 'Hill Country & Tea', sub: 'Ella, Nuwara Eliya & Scenic Rail', icon: 'landscape' },
    { id: 'Southern Coast', label: 'Southern Coast & Fort', sub: 'Galle Fort, Weligama & Mirissa Whales', icon: 'beach_access' },
    { id: 'Wildlife', label: 'Wild Sanctuaries', sub: 'Yala Leopards & Minneriya Elephants', icon: 'pets' },
    { id: 'Western Province', label: 'Colombo & Negombo', sub: 'Colonial Architecture & Food Scene', icon: 'apartment' },
    { id: 'East Coast', label: 'East Coast Sun', sub: 'Trincomalee, Pigeon Island & Surf', icon: 'sunny' },
  ];

  const toggleRegion = (id: string) => {
    if (selectedRegions.includes(id)) {
      if (selectedRegions.length > 1) {
        setSelectedRegions(selectedRegions.filter((r) => r !== id));
      }
    } else {
      setSelectedRegions([...selectedRegions, id]);
    }
  };

  const toggleExperience = (title: string) => {
    if (selectedExperiences.includes(title)) {
      setSelectedExperiences(selectedExperiences.filter((e) => e !== title));
    } else {
      setSelectedExperiences([...selectedExperiences, title]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#fbf9f6] min-h-screen pb-20">
      
      {/* Header */}
      <section className="relative w-full py-16 bg-[#00241a] text-white overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8f4e00] text-white text-[11px] font-bold uppercase tracking-widest mx-auto">
            <span className="material-symbols-outlined text-[15px]">tune</span>
            <span>Bespoke Trip Architect</span>
          </div>
          <h1 className="font-headline-xl text-[32px] sm:text-[44px] text-white font-bold leading-tight">
            Design Your Tailored Ceylon Journey
          </h1>
          <p className="text-[#a3d0be] text-[15px] max-w-xl mx-auto">
            Choose your preferred regions, pacing, accommodation standard, and signature experiences. Receive a bespoke proposal within 12 hours.
          </p>

          {/* Stepper indicators */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                onClick={() => setStep(s)}
                className={`flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  step === s
                    ? 'bg-[#8f4e00] text-white'
                    : step > s
                    ? 'bg-[#0d3b2e] text-[#beedd9]'
                    : 'bg-white/10 text-white/60'
                }`}
              >
                <span>Step {s}</span>
                {s === 1 && <span className="hidden sm:inline">• Regions</span>}
                {s === 2 && <span className="hidden sm:inline">• Pacing</span>}
                {s === 3 && <span className="hidden sm:inline">• Hotels & Car</span>}
                {s === 4 && <span className="hidden sm:inline">• Review & Quote</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form Container */}
      <div className="max-w-5xl mx-auto px-5 md:px-8 mt-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          
          {submitted ? (
            <div className="p-8 md:p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#beedd9] text-[#00241a] flex items-center justify-center mx-auto shadow-md">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              <h2 className="font-headline-xl text-[32px] font-bold text-[#00241a]">
                Bespoke Itinerary Dossier Created!
              </h2>
              <p className="text-[#414845] text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{travelerName}</strong>! Our Ceylon expedition curator will prepare your customized <strong>{durationDays}-Day</strong> itinerary covering <strong>{selectedRegions.join(', ')}</strong> with a private chauffeur and send it to <strong>{travelerEmail}</strong>.
              </p>

              <div className="p-4 rounded-xl bg-[#f5f3f0] text-left text-xs text-gray-700 max-w-md mx-auto space-y-1.5 border border-gray-200">
                <div><strong>Party:</strong> {travelersCount} Travelers</div>
                <div><strong>Duration:</strong> {durationDays} Days / {durationDays - 1} Nights</div>
                <div><strong>Standard:</strong> {hotelStandard === 'relais' ? 'Relais & Châteaux Ultra Luxury' : hotelStandard === 'luxury' ? '5-Star Luxury' : 'Boutique Heritage'}</div>
                <div><strong>Chauffeur Vehicle:</strong> {vehicleType === 'alphard' ? 'Luxury Toyota Alphard / Vellfire' : 'Private SUV'}</div>
                <div><strong>Estimated Budget:</strong> {rateInfo.symbol}{convertedTotal} ({currency})</div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/94771234567?text=Hi%20Travel%20Ceylone,%20I%20designed%20a%20${durationDays}-day%20itinerary%20for%20${encodeURIComponent(travelerName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0d3b2e] text-white text-xs font-bold shadow hover:bg-[#00241a]"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Connect with Concierge on WhatsApp</span>
                </a>
                <button
                  onClick={onNavigateHome}
                  className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50"
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 md:p-10 space-y-8">
              
              {/* STEP 1: SELECT REGIONS */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-headline-sm text-[20px] font-bold text-[#00241a]">
                      Step 1: Which regions of Sri Lanka would you like to explore?
                    </h2>
                    <p className="text-xs text-gray-500">
                      Select all regions that interest you. We connect them into a smooth, scenic chauffeur route.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {availableRegions.map((reg) => {
                      const isSelected = selectedRegions.includes(reg.id);
                      return (
                        <div
                          key={reg.id}
                          onClick={() => toggleRegion(reg.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#8f4e00] bg-[#ffdcc2]/20 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="material-symbols-outlined text-[26px] text-[#8f4e00]">
                              {reg.icon}
                            </span>
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                                isSelected ? 'bg-[#8f4e00] text-white' : 'border border-gray-300'
                              }`}
                            >
                              {isSelected ? '✓' : ''}
                            </span>
                          </div>
                          <h4 className="font-bold text-[15px] text-[#00241a] mt-2">{reg.label}</h4>
                          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{reg.sub}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="px-8 py-3 rounded-full bg-[#8f4e00] text-white font-bold text-sm shadow hover:bg-[#6d3a00]"
                    >
                      Next: Choose Pacing & Days →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PACING & DURATION */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-headline-sm text-[20px] font-bold text-[#00241a]">
                      Step 2: Trip Duration, Party Size & Travel Pace
                    </h2>
                    <p className="text-xs text-gray-500">
                      Tell us how long you want to travel and the rhythm of your days.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Duration Slider */}
                    <div className="p-5 rounded-xl bg-[#f5f3f0] space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
                          Total Trip Days
                        </label>
                        <span className="text-lg font-bold text-[#8f4e00]">
                          {durationDays} Days / {durationDays - 1} Nights
                        </span>
                      </div>
                      <input
                        type="range"
                        min={3}
                        max={16}
                        value={durationDays}
                        onChange={(e) => setDurationDays(parseInt(e.target.value, 10))}
                        className="w-full accent-[#8f4e00] cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-gray-400">
                        <span>3 Days (Short)</span>
                        <span>7 Days (Highlights)</span>
                        <span>10 Days</span>
                        <span>16 Days (Grand)</span>
                      </div>
                    </div>

                    {/* Travelers Count */}
                    <div className="p-5 rounded-xl bg-[#f5f3f0] space-y-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
                        Number of Travelers
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                          className="w-10 h-10 rounded-full bg-white border border-gray-300 font-bold text-lg flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="text-xl font-bold text-[#00241a] px-4">
                          {travelersCount} {travelersCount === 1 ? 'Traveler' : 'Travelers'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setTravelersCount(travelersCount + 1)}
                          className="w-10 h-10 rounded-full bg-white border border-gray-300 font-bold text-lg flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Custom quote includes private vehicle sized specifically for your party.
                      </p>
                    </div>
                  </div>

                  {/* Travel Pace */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
                      Preferred Travel Pace
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'relaxed', title: 'Relaxed & Unhurried', desc: '2-3 nights per destination, leisurely breakfasts and pool afternoons.' },
                        { id: 'balanced', title: 'Classic Balanced', desc: 'A blend of morning highlights and peaceful afternoon tea/beach relaxation.' },
                        { id: 'active', title: 'High Adventure', desc: 'Maximum sights: early sunrises, multiple hikes, safaris, and train rides.' },
                      ].map((p) => (
                        <div
                          key={p.id}
                          onClick={() => setTravelPace(p.id as any)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            travelPace === p.id
                              ? 'border-[#8f4e00] bg-[#ffdcc2]/20'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <h4 className="font-bold text-sm text-[#00241a]">{p.title}</h4>
                          <p className="text-xs text-gray-500 mt-1 leading-snug">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50"
                    >
                      ← Back to Regions
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-8 py-3 rounded-full bg-[#8f4e00] text-white font-bold text-sm shadow hover:bg-[#6d3a00]"
                    >
                      Next: Stays & Chauffeur Vehicle →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: HOTEL STANDARD & VEHICLE */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-headline-sm text-[20px] font-bold text-[#00241a]">
                      Step 3: Stays, Chauffeur Vehicle & Key Experiences
                    </h2>
                    <p className="text-xs text-gray-500">
                      We only work with audited, top-rated hotels and comfortable private fleets.
                    </p>
                  </div>

                  {/* Hotel Standard */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
                      Accommodation Standard
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'boutique', title: 'Heritage Boutique (4–5 Star)', desc: 'Colonial tea bungalows, restored Dutch merchant houses, boutique eco-resorts.' },
                        { id: 'luxury', title: '5-Star Premier Luxury', desc: 'Water Garden Sigiriya, 98 Acres Ella, Cape Weligama, Cinnamon Lodge.' },
                        { id: 'relais', title: 'Relais & Châteaux / Ultra', desc: 'Ceylon Tea Trails, Wild Coast Tented Lodge, Amangalla.' },
                      ].map((h) => (
                        <div
                          key={h.id}
                          onClick={() => setHotelStandard(h.id as any)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            hotelStandard === h.id
                              ? 'border-[#8f4e00] bg-[#ffdcc2]/20'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <h4 className="font-bold text-sm text-[#00241a]">{h.title}</h4>
                          <p className="text-xs text-gray-500 mt-1 leading-snug">{h.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chauffeur Vehicle */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
                      Private Chauffeur Vehicle
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'alphard', title: 'Toyota Alphard / Luxury Van', desc: 'Spacious leather captain seats, tinted windows, ample luggage room.' },
                        { id: 'suv', title: 'Private Luxury SUV', desc: 'High ground clearance, ideal for hill country trails and safari transit.' },
                        { id: 'sedan', title: 'Executive Sedan', desc: 'Toyota Prius / Axio Hybrid, smooth for couples on highway corridors.' },
                      ].map((v) => (
                        <div
                          key={v.id}
                          onClick={() => setVehicleType(v.id as any)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            vehicleType === v.id
                              ? 'border-[#8f4e00] bg-[#ffdcc2]/20'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <h4 className="font-bold text-sm text-[#00241a]">{v.title}</h4>
                          <p className="text-xs text-gray-500 mt-1 leading-snug">{v.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Experiences */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
                      Add Signature Experiences
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {EXPERIENCES_DATA.map((exp) => {
                        const isAdded = selectedExperiences.includes(exp.title);
                        return (
                          <div
                            key={exp.id}
                            onClick={() => toggleExperience(exp.title)}
                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                              isAdded
                                ? 'border-[#8f4e00] bg-[#ffdcc2]/20'
                                : 'border-gray-200 bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="material-symbols-outlined text-[20px] text-[#8f4e00]">
                                star
                              </span>
                              <span className="text-xs font-bold text-[#00241a]">{exp.title}</span>
                            </div>
                            <span className={`text-xs font-bold ${isAdded ? 'text-[#8f4e00]' : 'text-gray-400'}`}>
                              {isAdded ? 'Added ✓' : '+ Add'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="px-8 py-3 rounded-full bg-[#8f4e00] text-white font-bold text-sm shadow hover:bg-[#6d3a00]"
                    >
                      Next: Review Summary & Quote →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW & SUBMIT QUOTE */}
              {step === 4 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="font-headline-sm text-[20px] font-bold text-[#00241a]">
                      Step 4: Review Your Itinerary Blueprint & Inquire
                    </h2>
                    <p className="text-xs text-gray-500">
                      Review the custom itinerary parameters and enter your contact details for an official proposal.
                    </p>
                  </div>

                  {/* Summary Blueprint Box */}
                  <div className="p-6 rounded-2xl bg-[#00241a] text-white space-y-4 shadow-inner">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0d3b2e] pb-4">
                      <div>
                        <span className="text-xs text-[#beedd9] uppercase tracking-wider font-bold">
                          Custom Tailored Expedition
                        </span>
                        <h3 className="font-headline-sm text-[22px] font-bold text-white">
                          {durationDays}-Day Ceylon Bespoke Passage
                        </h3>
                        <p className="text-xs text-[#a3d0be]">
                          {travelersCount} Travelers • {selectedRegions.join(' → ')}
                        </p>
                      </div>

                      <div className="text-left sm:text-right bg-white/10 p-3 rounded-xl">
                        <span className="text-[10px] uppercase tracking-wider text-[#beedd9] block">
                          Estimated Total ({currency})
                        </span>
                        <span className="text-[26px] font-bold text-white">
                          {rateInfo.symbol}{convertedTotal.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-[#a3d0be] block">
                          (~{rateInfo.symbol}{Math.round(convertedTotal / travelersCount).toLocaleString()} / person)
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#a3d0be]">
                      <div>
                        <span className="text-gray-400 block font-bold">Hotels</span>
                        <span className="text-white font-semibold capitalize">{hotelStandard} tier</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-bold">Chauffeur</span>
                        <span className="text-white font-semibold capitalize">{vehicleType}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-bold">Pace</span>
                        <span className="text-white font-semibold capitalize">{travelPace}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-bold">Experiences</span>
                        <span className="text-white font-semibold">{selectedExperiences.length} included</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="space-y-4 pt-2">
                    <h4 className="font-bold text-sm text-[#00241a]">Where should we send your customized itinerary?</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Dr. Christopher Vance"
                          value={travelerName}
                          onChange={(e) => setTravelerName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#f5f3f0] border border-gray-200 text-sm focus:outline-none focus:border-[#8f4e00]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="chris@example.com"
                          value={travelerEmail}
                          onChange={(e) => setTravelerEmail(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#f5f3f0] border border-gray-200 text-sm focus:outline-none focus:border-[#8f4e00]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 234-5678"
                          value={travelerPhone}
                          onChange={(e) => setTravelerPhone(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#f5f3f0] border border-gray-200 text-sm focus:outline-none focus:border-[#8f4e00]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                          Target Travel Month
                        </label>
                        <select
                          value={travelMonth}
                          onChange={(e) => setTravelMonth(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#f5f3f0] border border-gray-200 text-sm focus:outline-none focus:border-[#8f4e00]"
                        >
                          <option value="November 2026">November 2026</option>
                          <option value="December 2026">December 2026 (Festive)</option>
                          <option value="January 2027">January 2027</option>
                          <option value="February 2027">February 2027</option>
                          <option value="March 2027">March 2027</option>
                          <option value="April 2027">April 2027</option>
                          <option value="Summer 2027">Summer 2027 (East Coast & Esala Perahera)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                          Special Dietary or Accessibility Needs
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Vegetarian, ground floor rooms preferred"
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#f5f3f0] border border-gray-200 text-sm focus:outline-none focus:border-[#8f4e00]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-50"
                    >
                      ← Back to Stays
                    </button>
                    <button
                      type="submit"
                      className="px-10 py-3.5 rounded-full bg-[#8f4e00] text-white font-bold text-sm shadow-xl hover:bg-[#6d3a00] transition-colors"
                    >
                      Submit Custom Travel Blueprint
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
