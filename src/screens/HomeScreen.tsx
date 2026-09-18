import React, { useState } from 'react';
import { DESTINATIONS_DATA, TOURS_DATA, EXPERIENCES_DATA, STORIES_DATA, TESTIMONIALS_DATA, CURRENCY_RATES } from '../data/travelData';
import { Destination, TourPackage, Experience, TravelStory, Currency } from '../types';

interface HomeScreenProps {
  onSelectDestination: (d: Destination) => void;
  onSelectTour: (t: TourPackage) => void;
  onSelectExperience: (e: Experience) => void;
  onSelectStory: (s: TravelStory) => void;
  onNavigate: (screen: string) => void;
  currency: Currency;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectDestination,
  onSelectTour,
  onSelectExperience,
  onSelectStory,
  onNavigate,
  currency,
  savedIds,
  onToggleSave,
}) => {
  // Tour category tab state
  const [activeTourCategory, setActiveTourCategory] = useState<string>('All Journeys');

  // Quick trip planner form state
  const [plannerDestination, setPlannerDestination] = useState('all');
  const [plannerSeason, setPlannerSeason] = useState('nov-apr');
  const [plannerTravelers, setPlannerTravelers] = useState('couple');
  const [plannerExperience, setPlannerExperience] = useState('luxury');
  const [fastFilter, setFastFilter] = useState<string>('');

  const rateInfo = CURRENCY_RATES[currency] || { symbol: '$', rate: 1.0 };

  const tourCategories = [
    'All Journeys',
    'Classic & Cultural',
    'Wildlife & Nature',
    'Coast & Relaxation',
    'Luxury Signature',
  ];

  const filteredTours = TOURS_DATA.filter((tour) => {
    if (activeTourCategory === 'All Journeys') return true;
    return tour.category === activeTourCategory;
  });

  const handleQuickPlannerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('plan-trip');
  };

  return (
    <div className="flex flex-col w-full">
      
      {/* ================================================================= */}
      {/* 1. HERO SECTION (Full-bleed cinematic, bled under shell header)    */}
      {/* ================================================================= */}
      <section className="relative w-full min-h-[942px] -mt-20 flex flex-col justify-between overflow-hidden">
        {/* Atmospheric Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          data-alt="Cinematic aerial sunrise view over Sri Lanka's emerald tea estate mountain ranges of Ella and Nuwara Eliya, golden morning sunlight filtering through misty jungle canopies, warm amber sunbeams meeting lush rolling hills, ultra high resolution, refined editorial luxury travel photography."
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBCBSuuhCv6JNcuT-RDFeMBaSYxyayVlyyOYk892tFwSaqtb9jJ_28JyQ2IkHK0PzZ4JdQKem9J8zWtqrdU2oirPJha6zKSHftfZc-nSmXSud7ycdh3H_7SpNOFmMFhwSIY-KHlo9g2dzahWjVyh58NgbCanZXPGpd0HnWn3TFB0aTZqRn_9aLmfjhOujYKCl5EatswVRcMBYE5filfQUhGf0inJJQZwRqQss11PJK_gwPgoU4s1JdGqg')`,
          }}
        />

        {/* Multi-stage Scrim Gradients for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00241a]/80 via-[#00241a]/45 to-[#00241a]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00241a]/70 via-transparent to-transparent" />

        {/* Ambient Floating Aura */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#8f4e00]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-16 pt-40 md:pt-48 pb-16 flex-1 flex flex-col justify-center">
          <div className="max-w-3xl space-y-4">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-[#ffdcc2]">
              <span className="material-symbols-outlined text-[16px] text-[#fea047]">arrow_back_ios_new</span>
              <span className="font-label-eyebrow text-[11px] tracking-widest uppercase text-[#fea047] font-bold">
                SRI LANKA • THE PEARL OF THE INDIAN OCEAN
              </span>
            </div>

            {/* Grand Display Headline */}
            <h1 className="font-display-hero text-[36px] sm:text-[46px] md:text-[56px] text-white leading-tight tracking-tight font-semibold">
              Discover Sri Lanka. <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#ffb77a]">Experience Ceylon.</span>
            </h1>

            {/* Supporting Editorial Copy */}
            <p className="font-body-lg text-[18px] text-[#a3d0be] max-w-2xl leading-relaxed">
              Explore breathtaking highland tea crests, ancient royal citadels, sun-blessed coastal sanctuaries, and untamed wildlife reserves — curated with quintessential Sri Lankan warmth.
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#8f4e00] text-white font-label-lg text-[14px] font-semibold shadow-[0_8px_24px_rgba(143,78,0,0.35)] hover:bg-[#6d3a00] hover:scale-[1.02] transition-all"
                href="#tours-section"
              >
                <span>Explore Tours</span>
                <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
              </a>

              <button
                onClick={() => onNavigate('plan-trip')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/15 text-white font-label-lg text-[14px] font-semibold backdrop-blur-md hover:bg-white/25 transition-all"
              >
                <span className="material-symbols-outlined text-[18px] text-[#ffdcc2]">tune</span>
                <span>Plan My Trip</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Bottom Anchor */}
        <div className="relative z-10 w-full pb-8 flex flex-col items-center justify-center text-[#a3d0be]">
          <a
            className="group flex flex-col items-center gap-1 hover:text-white transition-colors"
            href="#trip-planner"
          >
            <span className="font-label-eyebrow text-[11px] uppercase tracking-widest text-[#ffb77a] group-hover:text-[#fea047] transition-colors font-bold">
              Scroll to explore
            </span>
            <span className="material-symbols-outlined text-[20px] animate-bounce">expand_more</span>
          </a>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. QUICK TRIP PLANNER (Interactive Floating Glass Console)        */}
      {/* ================================================================= */}
      <section className="relative z-20 max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-16 -mt-16 md:-mt-20" id="trip-planner">
        <div className="w-full bg-white rounded-2xl shadow-[0_20px_48px_-12px_rgba(0,36,26,0.14)] p-4 md:p-6 lg:p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8f4e00]" />
              <h2 className="font-headline-sm text-[18px] md:text-[20px] font-bold text-[#00241a]">
                Plan Your Sri Lankan Journey
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efeeeb] text-[#414845] font-label-md text-[12px] font-semibold">
              <span className="material-symbols-outlined text-[15px] text-[#8f4e00]">verified_user</span>
              <span>Bespoke • 100% Tailored Itineraries</span>
            </div>
          </div>

          {/* Planner Horizontal Console */}
          <form onSubmit={handleQuickPlannerSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Field 1: Destination */}
            <div className="flex flex-col p-3 rounded-xl bg-[#f5f3f0] hover:bg-[#efeeeb] transition-colors cursor-pointer group">
              <label className="font-label-eyebrow text-[11px] uppercase tracking-widest text-[#414845] flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-[14px] text-[#8f4e00]">location_on</span>
                <span>Where do you want to go?</span>
              </label>
              <select
                value={plannerDestination}
                onChange={(e) => setPlannerDestination(e.target.value)}
                className="mt-1 bg-transparent font-semibold text-[14px] text-[#1b1c1a] focus:outline-none cursor-pointer"
              >
                <option value="all">All Sri Lanka (Complete Island)</option>
                <option value="cultural">Cultural Triangle (Sigiriya, Kandy)</option>
                <option value="hill-country">Hill Country & Ella (Tea Estates)</option>
                <option value="south-coast">Southern Coast & Mirissa</option>
                <option value="wildlife">Yala & Wildlife Parks</option>
                <option value="east-coast">East Coast (Trincomalee / Pasikuda)</option>
              </select>
            </div>

            {/* Field 2: Dates / Seasons */}
            <div className="flex flex-col p-3 rounded-xl bg-[#f5f3f0] hover:bg-[#efeeeb] transition-colors cursor-pointer group">
              <label className="font-label-eyebrow text-[11px] uppercase tracking-widest text-[#414845] flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-[14px] text-[#8f4e00]">calendar_today</span>
                <span>Travel dates / Season</span>
              </label>
              <select
                value={plannerSeason}
                onChange={(e) => setPlannerSeason(e.target.value)}
                className="mt-1 bg-transparent font-semibold text-[14px] text-[#1b1c1a] focus:outline-none cursor-pointer"
              >
                <option value="nov-apr">Nov – Apr (Peak South & West)</option>
                <option value="may-oct">May – Oct (Sunny East Coast)</option>
                <option value="dec-jan">Festive Season (Christmas / New Year)</option>
                <option value="jul-aug">Summer Holidays (Esala Perahera)</option>
                <option value="flexible">I am flexible / Inquire</option>
              </select>
            </div>

            {/* Field 3: Travelers */}
            <div className="flex flex-col p-3 rounded-xl bg-[#f5f3f0] hover:bg-[#efeeeb] transition-colors cursor-pointer group">
              <label className="font-label-eyebrow text-[11px] uppercase tracking-widest text-[#414845] flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-[14px] text-[#8f4e00]">group</span>
                <span>Number of travelers</span>
              </label>
              <select
                value={plannerTravelers}
                onChange={(e) => setPlannerTravelers(e.target.value)}
                className="mt-1 bg-transparent font-semibold text-[14px] text-[#1b1c1a] focus:outline-none cursor-pointer"
              >
                <option value="couple">Couple / 2 Travelers</option>
                <option value="solo">Solo Explorer (1 Person)</option>
                <option value="family-small">Family Holiday (3–4 People)</option>
                <option value="family-large">Large Family / Group (5+ People)</option>
                <option value="honeymoon">Luxury Honeymoon (2 People)</option>
              </select>
            </div>

            {/* Field 4: Trip Type */}
            <div className="flex flex-col p-3 rounded-xl bg-[#f5f3f0] hover:bg-[#efeeeb] transition-colors cursor-pointer group">
              <label className="font-label-eyebrow text-[11px] uppercase tracking-widest text-[#414845] flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-[14px] text-[#8f4e00]">explore</span>
                <span>Trip Experience</span>
              </label>
              <select
                value={plannerExperience}
                onChange={(e) => setPlannerExperience(e.target.value)}
                className="mt-1 bg-transparent font-semibold text-[14px] text-[#1b1c1a] focus:outline-none cursor-pointer"
              >
                <option value="luxury">Luxury & Tea Heritage</option>
                <option value="culture">Ancient Citadels & Culture</option>
                <option value="wildlife">Big Cat & Leopard Safari</option>
                <option value="beach">Tropical Beach & Wellness</option>
                <option value="adventure">Highland Trekking & Rail</option>
              </select>
            </div>
          </form>

          {/* Action Footer with Quick Pill Filters & Trigger Button */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-label-eyebrow text-[11px] uppercase text-[#414845] tracking-wider font-bold">
                Fast filters:
              </span>
              {[
                'Tea Bungalows',
                'Yala Glamping',
                'Galle UNESCO Fort',
                'Whale Migration',
              ].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setFastFilter(fastFilter === filter ? '' : filter)}
                  className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all ${
                    fastFilter === filter
                      ? 'bg-[#00241a] text-white'
                      : 'bg-[#efeeeb] text-[#414845] hover:bg-[#eae8e5]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <button
              onClick={() => onNavigate('plan-trip')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#8f4e00] text-white font-semibold text-[14px] shadow-[0_6px_20px_rgba(143,78,0,0.3)] hover:bg-[#6d3a00] hover:scale-[1.02] transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span>Find My Tailored Trip</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. EXPLORE THE WONDERS OF SRI LANKA (8 Rich Destination Cards)   */}
      {/* ================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-16 pt-20 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 text-[#8f4e00] font-label-eyebrow text-[11px] uppercase tracking-widest font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8f4e00]" />
              <span>Top Curated Destinations</span>
            </div>
            <h2 className="font-headline-xl text-[28px] md:text-[40px] text-[#00241a] font-bold">
              Explore the Wonders of Sri Lanka
            </h2>
            <p className="font-body-md text-[15px] text-[#414845]">
              From misty emerald summits to sun-kissed coral coastlines, discover the historic cities, wildlife frontiers, and sanctuaries that define Ceylon.
            </p>
          </div>

          <button
            onClick={() => onNavigate('destinations')}
            className="inline-flex items-center gap-2 text-[#8f4e00] font-semibold text-[14px] group hover:text-[#6d3a00] transition-colors"
          >
            <span>View all 24 regional sanctuaries</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS_DATA.map((dest) => {
            const isSaved = savedIds.includes(dest.id);
            return (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest)}
                className="group relative h-96 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between p-6"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  data-alt={dest.alt}
                  style={{ backgroundImage: `url('${dest.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00241a]/95 via-[#00241a]/40 to-transparent" />

                <div className="relative z-10 flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md font-label-eyebrow text-[11px] uppercase tracking-wider text-[#00241a] font-bold">
                    {dest.tag}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(dest.id);
                      }}
                      className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#8f4e00] hover:bg-white transition-colors"
                      title="Save destination"
                    >
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        bookmark
                      </span>
                    </button>
                    <span className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#00241a] group-hover:bg-[#8f4e00] group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </span>
                  </div>
                </div>

                <div className="relative z-10 space-y-1">
                  <div className="flex items-center gap-1 text-[#ffdcc2]">
                    <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                    <span className="font-label-md text-[12px] uppercase tracking-wider font-semibold">
                      {dest.district}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-[24px] text-white font-bold">{dest.name}</h3>
                  <p className="font-body-sm text-[13px] text-[#a3d0be] line-clamp-2">
                    {dest.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. POPULAR TOUR PACKAGES (Bespoke Curated Itineraries)            */}
      {/* ================================================================= */}
      <section className="w-full bg-[#f5f3f0] py-20" id="tours-section">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[#8f4e00] font-label-eyebrow text-[11px] uppercase tracking-widest font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8f4e00]" />
                <span>Handcrafted Itineraries</span>
              </div>
              <h2 className="font-headline-xl text-[28px] md:text-[40px] text-[#00241a] font-bold">
                Journeys Worth Remembering
              </h2>
              <p className="font-body-md text-[15px] text-[#414845]">
                Tailor-made expeditions managed by seasoned local chauffeurs and guides, featuring private safari jeeps and handpicked heritage stays.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0" id="tourTabs">
              {tourCategories.map((cat) => {
                const isActive = activeTourCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTourCategory(cat)}
                    className={`px-4 py-2 rounded-full font-semibold text-[12px] whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#00241a] text-white shadow-sm'
                        : 'bg-[#efeeeb] text-[#414845] hover:text-[#1b1c1a]'
                    }`}
                    type="button"
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6 Detailed Tour Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => {
              const convertedPrice = Math.round(tour.priceUSD * rateInfo.rate);
              return (
                <div
                  key={tour.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between border border-gray-100"
                >
                  <div>
                    <div className="relative h-60 w-full overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                        data-alt={tour.alt}
                        style={{ backgroundImage: `url('${tour.image}')` }}
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {tour.badge && (
                          <span className={`px-3 py-1 rounded-full font-label-eyebrow text-[11px] uppercase tracking-wider font-bold ${tour.badgeColor || 'bg-[#8f4e00] text-white'}`}>
                            {tour.badge}
                          </span>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#00241a] font-semibold text-[12px] flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        <span>{tour.days} Days / {tour.nights} Nights</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[#8f4e00]">
                          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                          <span className="text-[14px] text-[#1b1c1a] font-bold">{tour.rating}</span>
                          <span className="text-[13px] text-gray-500">({tour.reviewsCount} reviews)</span>
                        </div>
                        <span className="text-[12px] text-[#414845] font-semibold">{tour.chauffeurType}</span>
                      </div>

                      <h3
                        onClick={() => onSelectTour(tour)}
                        className="font-headline-md text-[24px] text-[#00241a] group-hover:text-[#8f4e00] transition-colors font-bold cursor-pointer"
                      >
                        {tour.title}
                      </h3>

                      <p className="font-body-sm text-[13px] text-[#414845] leading-relaxed line-clamp-2">
                        {tour.shortDesc}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {tour.highlights.slice(0, 3).map((h, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-[#efeeeb] text-[12px] font-medium text-[#414845]"
                          >
                            {h.split(' ')[0]} {h.split(' ')[1]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-4 flex items-center justify-between border-t border-gray-100">
                    <div className="pt-4">
                      <span className="block font-label-eyebrow text-[11px] uppercase text-gray-400 tracking-wider font-bold">
                        From
                      </span>
                      <span className="font-headline-md text-[24px] text-[#00241a] font-bold">
                        {rateInfo.symbol}{convertedPrice}
                      </span>
                      <span className="text-[13px] text-gray-500"> / person</span>
                    </div>

                    <button
                      onClick={() => onSelectTour(tour)}
                      className="mt-4 px-5 py-2.5 rounded-full bg-[#00241a] text-white font-semibold text-[14px] hover:bg-[#8f4e00] hover:text-white transition-colors shadow-sm"
                      type="button"
                    >
                      View Itinerary
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. WHY TRAVEL CEYLONE (Trust, Pillars & Credibility)             */}
      {/* ================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-16 py-20">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 text-[#8f4e00] font-label-eyebrow text-[11px] uppercase tracking-widest font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8f4e00]" />
            <span>The Ceylon Standard</span>
          </div>
          <h2 className="font-headline-xl text-[28px] md:text-[40px] text-[#00241a] font-bold">
            Travel Sri Lanka Your Way
          </h2>
          <p className="font-body-md text-[15px] text-[#414845]">
            Why discerning global travelers choose Travel Ceylone as their local orchestrator for seamless, high-touch journeys.
          </p>
        </div>

        {/* 4 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 rounded-2xl bg-[#f5f3f0] hover:bg-[#efeeeb] transition-all group space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0d3b2e] text-[#beedd9] flex items-center justify-center group-hover:bg-[#8f4e00] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[28px]">explore</span>
            </div>
            <h3 className="font-headline-sm text-[18px] text-[#00241a] font-bold">Local Expertise</h3>
            <p className="font-body-sm text-[13px] text-[#414845] leading-relaxed">
              Travel with local specialists who know Ceylon beyond the guidebooks — secret viewpoints, quiet temple hours, and off-path village encounters.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#f5f3f0] hover:bg-[#efeeeb] transition-all group space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0d3b2e] text-[#beedd9] flex items-center justify-center group-hover:bg-[#8f4e00] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[28px]">design_services</span>
            </div>
            <h3 className="font-headline-sm text-[18px] text-[#00241a] font-bold">Tailor-Made Journeys</h3>
            <p className="font-body-sm text-[13px] text-[#414845] leading-relaxed">
              Every single route is customized around your personal interests, desired pace, favorite culinary palette, and private accommodation style.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#f5f3f0] hover:bg-[#efeeeb] transition-all group space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0d3b2e] text-[#beedd9] flex items-center justify-center group-hover:bg-[#8f4e00] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[28px]">handshake</span>
            </div>
            <h3 className="font-headline-sm text-[18px] text-[#00241a] font-bold">Trusted Care 24/7</h3>
            <p className="font-body-sm text-[13px] text-[#414845] leading-relaxed">
              From warm VIP airport assistance to your private luxury chauffeur and 24-hour dedicated concierge desk, you are continuously looked after.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#f5f3f0] hover:bg-[#efeeeb] transition-all group space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0d3b2e] text-[#beedd9] flex items-center justify-center group-hover:bg-[#8f4e00] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[28px]">volunteer_activism</span>
            </div>
            <h3 className="font-headline-sm text-[18px] text-[#00241a] font-bold">Authentic Immersion</h3>
            <p className="font-body-sm text-[13px] text-[#414845] leading-relaxed">
              Experience genuine Sri Lankan life — dining with families in spice gardens, sharing tea with hill estate harvesters, and supporting conservation.
            </p>
          </div>
        </div>

        {/* Credibility & Trust Seal Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-[#efeeeb] flex flex-wrap items-center justify-around gap-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[28px] text-[#8f4e00]">verified</span>
            <div>
              <div className="font-headline-sm text-[14px] text-[#00241a] font-bold">SLTDA Certified</div>
              <div className="font-body-sm text-[13px] text-[#414845]">Licensed Tour Operator No. 4920</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[28px] text-[#8f4e00]">lock</span>
            <div>
              <div className="font-headline-sm text-[14px] text-[#00241a] font-bold">100% Financial Protection</div>
              <div className="font-body-sm text-[13px] text-[#414845]">Secure Escrow Payment Gateway</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[28px] text-[#8f4e00]">support_agent</span>
            <div>
              <div className="font-headline-sm text-[14px] text-[#00241a] font-bold">24/7 Island Concierge</div>
              <div className="font-body-sm text-[13px] text-[#414845]">Immediate Local Ground Assistance</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[28px] text-[#8f4e00]">sentiment_very_satisfied</span>
            <div>
              <div className="font-headline-sm text-[14px] text-[#00241a] font-bold">99.4% Traveler Approval</div>
              <div className="font-body-sm text-[13px] text-[#414845]">Over 4,500+ Journeys Realized</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. SRI LANKAN EXPERIENCES (Interactive Asymmetric Showcase)      */}
      {/* ================================================================= */}
      <section className="w-full bg-[#00241a] text-white py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[#ffb77a] font-label-eyebrow text-[11px] uppercase tracking-widest font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fea047]" />
                <span>Immersive Encounters</span>
              </div>
              <h2 className="font-headline-xl text-[28px] md:text-[40px] text-white font-bold">
                Experience the Real Ceylon
              </h2>
              <p className="font-body-md text-[15px] text-[#a3d0be]">
                Beyond standard sightseeing — sensory encounters with the people, wildlife, and natural wonders of Sri Lanka.
              </p>
            </div>

            <button
              onClick={() => onNavigate('experiences')}
              className="inline-flex items-center gap-2 text-[#fea047] font-semibold text-[14px] hover:text-[#ffdcc2] transition-colors"
            >
              <span>Discover all authentic experiences</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Asymmetric Mosaic Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Large Featured Hero Experience (7 Cols) */}
            <div
              onClick={() => onSelectExperience(EXPERIENCES_DATA[0])}
              className="lg:col-span-7 group relative rounded-2xl overflow-hidden min-h-[460px] flex flex-col justify-end p-8 shadow-xl cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                data-alt={EXPERIENCES_DATA[0].alt}
                style={{ backgroundImage: `url('${EXPERIENCES_DATA[0].image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00241a]/95 via-[#00241a]/50 to-transparent" />

              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8f4e00] text-white font-label-eyebrow text-[11px] uppercase tracking-wider font-bold">
                  <span>Featured Highlight</span>
                </div>
                <h3 className="font-headline-xl text-[28px] md:text-[36px] text-white font-bold">
                  {EXPERIENCES_DATA[0].title}
                </h3>
                <p className="font-body-md text-[15px] text-[#a3d0be] max-w-xl leading-relaxed">
                  {EXPERIENCES_DATA[0].description}
                </p>
                <div className="pt-2 flex items-center gap-4">
                  <span className="text-[13px] text-[#ffdcc2] flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[16px]">timer</span>
                    <span>{EXPERIENCES_DATA[0].duration}</span>
                  </span>
                  <span className="text-[14px] text-white underline underline-offset-4 hover:text-[#fea047] transition-colors font-bold">
                    Reserve with Tour →
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side Companion Cards (5 Cols, 2 stacked) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Experience 2: Minneriya Elephants */}
              <div
                onClick={() => onSelectExperience(EXPERIENCES_DATA[1])}
                className="group relative rounded-2xl overflow-hidden h-[218px] flex flex-col justify-end p-6 cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  data-alt={EXPERIENCES_DATA[1].alt}
                  style={{ backgroundImage: `url('${EXPERIENCES_DATA[1].image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00241a]/95 via-[#00241a]/40 to-transparent" />

                <div className="relative z-10 space-y-1">
                  <span className="font-label-eyebrow text-[11px] uppercase tracking-wider text-[#fea047] font-bold">
                    Wildlife Phenomenon
                  </span>
                  <h4 className="font-headline-md text-[20px] text-white font-bold">
                    {EXPERIENCES_DATA[1].title}
                  </h4>
                  <p className="font-body-sm text-[13px] text-[#a3d0be] line-clamp-1">
                    {EXPERIENCES_DATA[1].description}
                  </p>
                </div>
              </div>

              {/* Experience 3: Southern Coast Surf & Ocean */}
              <div
                onClick={() => onSelectExperience(EXPERIENCES_DATA[2])}
                className="group relative rounded-2xl overflow-hidden h-[218px] flex flex-col justify-end p-6 cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  data-alt={EXPERIENCES_DATA[2].alt}
                  style={{ backgroundImage: `url('${EXPERIENCES_DATA[2].image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00241a]/95 via-[#00241a]/40 to-transparent" />

                <div className="relative z-10 space-y-1">
                  <span className="font-label-eyebrow text-[11px] uppercase tracking-wider text-[#fea047] font-bold">
                    Coastal Traditions
                  </span>
                  <h4 className="font-headline-md text-[20px] text-white font-bold">
                    {EXPERIENCES_DATA[2].title}
                  </h4>
                  <p className="font-body-sm text-[13px] text-[#a3d0be] line-clamp-1">
                    {EXPERIENCES_DATA[2].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Secondary Companion Experience Pills below */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div
              onClick={() => onSelectExperience(EXPERIENCES_DATA[3])}
              className="p-5 rounded-xl bg-[#0d3b2e]/60 hover:bg-[#0d3b2e] transition-all group flex items-start gap-4 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[32px] text-[#fea047] flex-shrink-0">
                restaurant
              </span>
              <div className="space-y-1">
                <h5 className="font-headline-sm text-[16px] text-white font-bold">
                  Clay-Pot Culinary Masterclass
                </h5>
                <p className="font-body-sm text-[13px] text-[#a3d0be]">
                  Grind fresh cinnamon and coconut sambal with rural village cooks.
                </p>
              </div>
            </div>

            <div
              onClick={() => onSelectExperience(EXPERIENCES_DATA[4])}
              className="p-5 rounded-xl bg-[#0d3b2e]/60 hover:bg-[#0d3b2e] transition-all group flex items-start gap-4 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[32px] text-[#fea047] flex-shrink-0">
                wb_twilight
              </span>
              <div className="space-y-1">
                <h5 className="font-headline-sm text-[16px] text-white font-bold">
                  Dawn Climb of Sigiriya Rock
                </h5>
                <p className="font-body-sm text-[13px] text-[#a3d0be]">
                  Beat the heat and crowds to stand on King Kashyapa’s cloud throne.
                </p>
              </div>
            </div>

            <div
              onClick={() => onSelectExperience(EXPERIENCES_DATA[5])}
              className="p-5 rounded-xl bg-[#0d3b2e]/60 hover:bg-[#0d3b2e] transition-all group flex items-start gap-4 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[32px] text-[#fea047] flex-shrink-0">
                coffee
              </span>
              <div className="space-y-1">
                <h5 className="font-headline-sm text-[16px] text-white font-bold">
                  Pure Ceylon Tea Cupping
                </h5>
                <p className="font-body-sm text-[13px] text-[#a3d0be]">
                  Pluck tender two leaves & a bud; taste single-estate high-grown blends.
                </p>
              </div>
            </div>

            <div
              onClick={() => onSelectExperience(EXPERIENCES_DATA[6])}
              className="p-5 rounded-xl bg-[#0d3b2e]/60 hover:bg-[#0d3b2e] transition-all group flex items-start gap-4 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[32px] text-[#fea047] flex-shrink-0">
                water
              </span>
              <div className="space-y-1">
                <h5 className="font-headline-sm text-[16px] text-white font-bold">
                  Mirissa Blue Whale Cruise
                </h5>
                <p className="font-body-sm text-[13px] text-[#a3d0be]">
                  Encounter the largest creature on earth on a certified responsible vessel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 7. WILDLIFE SECTION ("Wild at Heart")                             */}
      {/* ================================================================= */}
      <section className="relative w-full py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          data-alt="Intense eye contact with a magnificent wild Sri Lankan leopard resting in the dappled jungle light of Yala National Park, high dynamic range, nature documentary style."
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3n5CQ1QviIReWqQLk7hACZvtjdy5GVB5igkaWByYYnEtC7uV491_d_V0IWX_h1xcSJDgYDc1opf9YktH-CG_iK8YqcTJ05XjCSgdb-HhWsYI7wH92h7JhP3zVWcWiEkF43qSV2AFt7B16R5i4vti4SGuZFN2q4gaKrCHknqGpPp05aMsZQjttkYBRFvgFgXglNGZidngvFpwY2y_3Pcx1ixr8x4Gbo2tMpiMWVJjCDoPDFtg2tuq8ZQ')`,
          }}
        />
        <div className="absolute inset-0 bg-[#00241a]/85 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8f4e00]/30 text-[#ffdcc2] font-label-eyebrow text-[11px] uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined text-[15px]">pets</span>
                <span>Wildlife & Bio-Diversity Hotspot</span>
              </div>
              <h2 className="font-display-hero text-[36px] md:text-[52px] text-white font-bold leading-tight">
                Wild at Heart
              </h2>
              <p className="font-body-lg text-[18px] text-[#a3d0be] max-w-xl leading-relaxed">
                From majestic herds of Asian elephants and elusive Sri Lankan leopards to the gentle ocean giants off southern shores, Sri Lanka is one of the world's most concentrated natural wildlife sanctuaries.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('tours')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#8f4e00] text-white font-semibold text-[14px] shadow-lg hover:bg-[#6d3a00] transition-all"
                >
                  <span>Explore Wildlife Expeditions</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <div className="flex items-center gap-2 text-[#a3d0be] text-[13px] font-semibold">
                  <span className="material-symbols-outlined text-[#fea047]">eco</span>
                  <span>100% Ethical & Certified Naturalist Rangers</span>
                </div>
              </div>
            </div>

            {/* 3 Rich Stats Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-display-hero text-[36px] md:text-[44px] text-[#ffdcc2] font-bold">
                    26+
                  </span>
                  <span className="material-symbols-outlined text-[#ffdcc2] text-[32px]">forest</span>
                </div>
                <h4 className="font-headline-sm text-[18px] text-white font-bold">National Parks</h4>
                <p className="font-body-sm text-[13px] text-[#a3d0be]">
                  Protected bio-diverse habitats spanning rainforests, wetlands & savannahs.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-display-hero text-[36px] md:text-[44px] text-[#ffdcc2] font-bold">
                    1,700+
                  </span>
                  <span className="material-symbols-outlined text-[#ffdcc2] text-[32px]">nature</span>
                </div>
                <h4 className="font-headline-sm text-[18px] text-white font-bold">Wildlife Species</h4>
                <p className="font-body-sm text-[13px] text-[#a3d0be]">
                  Including endemic purple-faced langurs, sloth bears and saltwater crocodiles.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-display-hero text-[36px] md:text-[44px] text-[#ffdcc2] font-bold">
                    500+
                  </span>
                  <span className="material-symbols-outlined text-[#ffdcc2] text-[32px]">flutter_dash</span>
                </div>
                <h4 className="font-headline-sm text-[18px] text-white font-bold">Bird Species</h4>
                <p className="font-body-sm text-[13px] text-[#a3d0be]">
                  A world-renowned sanctuary for resident avifauna and international migrants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 8. TRAVEL STORIES & LOCAL EDITORIALS                              */}
      {/* ================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-5 md:px-8 lg:px-16 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#8f4e00] font-label-eyebrow text-[11px] uppercase tracking-widest font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8f4e00]" />
              <span>Editorial Journal</span>
            </div>
            <h2 className="font-headline-xl text-[28px] md:text-[40px] text-[#00241a] font-bold">
              Stories From Ceylon
            </h2>
            <p className="font-body-md text-[15px] text-[#414845]">
              Inspiration, local wisdom, and seasonal travel advice straight from our private concierge and resident expedition leaders.
            </p>
          </div>

          <button
            onClick={() => onSelectStory(STORIES_DATA[0])}
            className="inline-flex items-center gap-2 text-[#8f4e00] font-semibold text-[14px] hover:text-[#6d3a00] transition-colors"
          >
            <span>Read all travel stories</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* 4 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STORIES_DATA.map((story) => {
            const isSaved = savedIds.includes(story.id);
            return (
              <article
                key={story.id}
                onClick={() => onSelectStory(story)}
                className="flex flex-col rounded-2xl overflow-hidden bg-[#f5f3f0] hover:bg-[#efeeeb] transition-all group cursor-pointer border border-gray-200"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    data-alt={story.alt}
                    style={{ backgroundImage: `url('${story.image}')` }}
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md font-label-eyebrow text-[10px] uppercase tracking-wider text-[#00241a] font-bold">
                    {story.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-500 text-[12px]">
                      <span>{story.readTime}</span>
                      <span>•</span>
                      <span>{story.date}</span>
                    </div>
                    <h3 className="font-headline-sm text-[16px] text-[#00241a] group-hover:text-[#8f4e00] transition-colors font-bold leading-snug">
                      {story.title}
                    </h3>
                    <p className="font-body-sm text-[13px] text-[#414845] line-clamp-2">
                      {story.summary}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-gray-200">
                    <span className="text-[12px] text-[#8f4e00] font-bold">Read Guide →</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(story.id);
                      }}
                      className="p-1 text-gray-400 hover:text-[#8f4e00]"
                      title="Bookmark Story"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        bookmark
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ================================================================= */}
      {/* 9. TESTIMONIALS ("Loved by Travelers")                            */}
      {/* ================================================================= */}
      <section className="w-full bg-[#f5f3f0] py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <div className="inline-flex items-center gap-2 text-[#8f4e00] font-label-eyebrow text-[11px] uppercase tracking-widest font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8f4e00]" />
              <span>Guest Stories</span>
            </div>
            <h2 className="font-headline-xl text-[28px] md:text-[40px] text-[#00241a] font-bold">
              Loved by Travelers
            </h2>
            <p className="font-body-md text-[15px] text-[#414845]">
              Over 4,500 travelers have experienced the soul of Sri Lanka with our private chauffeur-guides. Here is what they have to say.
            </p>
          </div>

          {/* 3 Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map((rev) => (
              <div
                key={rev.id}
                className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 border border-gray-100"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#8f4e00]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-headline-sm text-[16px] text-[#00241a] italic leading-relaxed">
                    “{rev.quote}”
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                    data-alt={rev.alt}
                    src={rev.avatar}
                  />
                  <div>
                    <div className="font-headline-sm text-[15px] text-[#00241a] font-bold">
                      {rev.author}
                    </div>
                    <div className="font-body-sm text-[12px] text-gray-500">
                      {rev.location} • {rev.tourName}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 10. FINAL CALL TO ACTION (Warm Sunset Warmth)                      */}
      {/* ================================================================= */}
      <section className="relative w-full py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          data-alt="Breathtaking Sri Lankan coastal sunset with palm silhouettes, calm golden Indian ocean reflecting warm saffron amber light, serene luxury atmosphere."
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBwV0g7kCQ5uJLzBLHqn42qexhUNj38IWThVYEUsiv4JZ3lsPABv25c3FJgcz2_wzJDGC_2MpLovsXYXoOHMWNFxqZE1fOBJONrD8D6wEyU7FelFkMACTxUyI-vzDQIdG5d7QnSU6oeg6t85-3t_Y9Kb7ZOA0mEvuaR5T96UlQxVNat4E75QWwb7qR9Q52xUZ-TvMDBgj7Ob2WynZMrzIEQAd9H-vBiFJSAeAMzOqgfLZR8zoDHY21DcA')`,
          }}
        />
        <div className="absolute inset-0 bg-[#00241a]/80 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 lg:px-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fea047]/20 text-[#fea047] font-label-eyebrow text-[11px] uppercase tracking-widest mx-auto font-bold">
            <span className="material-symbols-outlined text-[16px]">flight_takeoff</span>
            <span>Start Your Bespoke Journey</span>
          </div>

          <h2 className="font-display-hero text-[36px] sm:text-[44px] md:text-[52px] text-white font-bold leading-tight">
            Your Ceylon Adventure Starts Here
          </h2>

          <p className="font-body-lg text-[18px] text-[#a3d0be] max-w-2xl mx-auto leading-relaxed">
            Tell us what you dream of seeing, tasting, and feeling. Our resident travel planners will craft a complimentary personalized itinerary within 12 hours.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('plan-trip')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#8f4e00] text-white font-semibold text-[15px] shadow-[0_8px_24px_rgba(143,78,0,0.4)] hover:bg-[#6d3a00] hover:scale-[1.02] transition-all"
            >
              <span>Plan My Custom Trip</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>

            <a
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/15 text-white font-semibold text-[15px] backdrop-blur-md hover:bg-white/25 transition-all"
              href="https://wa.me/94771234567"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[20px] text-[#ffdcc2]">chat</span>
              <span>Talk to Us on WhatsApp</span>
            </a>
          </div>

          {/* Trust Reassurance Micro Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-[#a3d0be] text-[13px] font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#fea047]">check_circle</span>
              <span>No commitment tailored quote</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#fea047]">check_circle</span>
              <span>100% customizable routes</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#fea047]">check_circle</span>
              <span>Direct WhatsApp concierge response</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
