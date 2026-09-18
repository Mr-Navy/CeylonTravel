import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { DestinationModal } from './components/DestinationModal';
import { TourModal } from './components/TourModal';
import { StoryModal } from './components/StoryModal';
import { ExperienceModal } from './components/ExperienceModal';
import { TravelerProfileModal } from './components/TravelerProfileModal';
import { BookingInquiryModal } from './components/BookingInquiryModal';

import { HomeScreen } from './screens/HomeScreen';
import { DestinationsScreen } from './screens/DestinationsScreen';
import { ToursScreen } from './screens/ToursScreen';
import { ExperiencesScreen } from './screens/ExperiencesScreen';
import { TripPlannerScreen } from './screens/TripPlannerScreen';
import { AboutContactScreen } from './screens/AboutContactScreen';

import { Destination, TourPackage, Experience, TravelStory, Currency } from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<string>('home');
  const [currency, setCurrency] = useState<Currency>('USD');

  // Bookmarks / Saved items
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('travel_ceylone_saved');
      return stored ? JSON.parse(stored) : ['sigiriya', 'tea-trails'];
    } catch {
      return ['sigiriya', 'tea-trails'];
    }
  });

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [selectedStory, setSelectedStory] = useState<TravelStory | null>(null);

  // Booking inquiry modal state
  const [inquiryModal, setInquiryModal] = useState<{
    isOpen: boolean;
    tour: TourPackage | null;
    experience: Experience | null;
    customDestination?: string;
  }>({
    isOpen: false,
    tour: null,
    experience: null,
    customDestination: undefined,
  });

  // State to pass forward to trip planner
  const [plannerInitialDest, setPlannerInitialDest] = useState<string | undefined>(undefined);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('travel_ceylone_saved', JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds]);

  // Scroll to top on screen transition
  const handleNavigate = (screen: string) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Plan trip from destination or generic
  const handlePlanTripToDestination = (destName: string) => {
    setPlannerInitialDest(destName);
    setSelectedDestination(null);
    handleNavigate('plan-trip');
  };

  // Book tour / experience inquiry
  const handleOpenTourInquiry = (tour: TourPackage) => {
    setSelectedTour(null);
    setInquiryModal({
      isOpen: true,
      tour,
      experience: null,
      customDestination: undefined,
    });
  };

  const handleOpenExperienceInquiry = (exp: Experience) => {
    setSelectedExperience(null);
    setInquiryModal({
      isOpen: true,
      tour: null,
      experience: exp,
      customDestination: undefined,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f6] text-[#1b1c1a] font-body selection:bg-[#ffdcc2] selection:text-[#8f4e00]">
      {/* Universal Navigation Header */}
      <Header
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        currency={currency}
        onCurrencyChange={setCurrency}
        savedCount={savedIds.length}
      />

      {/* Primary View Router */}
      <main className="flex-1 w-full">
        {activeScreen === 'home' && (
          <HomeScreen
            onSelectDestination={setSelectedDestination}
            onSelectTour={setSelectedTour}
            onSelectExperience={setSelectedExperience}
            onSelectStory={setSelectedStory}
            onNavigate={handleNavigate}
            currency={currency}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeScreen === 'destinations' && (
          <DestinationsScreen
            onSelectDestination={setSelectedDestination}
            onPlanTripTo={handlePlanTripToDestination}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeScreen === 'tours' && (
          <ToursScreen
            onSelectTour={setSelectedTour}
            onBookTour={handleOpenTourInquiry}
            currency={currency}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeScreen === 'experiences' && (
          <ExperiencesScreen
            onSelectExperience={setSelectedExperience}
            onBookExperience={handleOpenExperienceInquiry}
          />
        )}

        {activeScreen === 'plan-trip' && (
          <TripPlannerScreen
            currency={currency}
            initialDestination={plannerInitialDest}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {activeScreen === 'about' && <AboutContactScreen />}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* ================================================================= */}
      {/* Interactive Overlays & Modals                                     */}
      {/* ================================================================= */}

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDestination={(d) => {
          setIsSearchOpen(false);
          setSelectedDestination(d);
        }}
        onSelectTour={(t) => {
          setIsSearchOpen(false);
          setSelectedTour(t);
        }}
        onSelectExperience={(e) => {
          setIsSearchOpen(false);
          setSelectedExperience(e);
        }}
      />

      {/* Traveler Profile & Saved Items Modal */}
      <TravelerProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        savedIds={savedIds}
        onRemoveSaved={handleToggleSave}
        onSelectDestination={setSelectedDestination}
        onSelectTour={setSelectedTour}
        onPlanTrip={() => handleNavigate('plan-trip')}
      />

      {/* Destination Detail Modal */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onPlanTripTo={handlePlanTripToDestination}
        isSaved={selectedDestination ? savedIds.includes(selectedDestination.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Tour Detail Modal */}
      <TourModal
        tour={selectedTour}
        onClose={() => setSelectedTour(null)}
        onBookTour={handleOpenTourInquiry}
        currency={currency}
        isSaved={selectedTour ? savedIds.includes(selectedTour.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Experience Detail Modal */}
      <ExperienceModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
        onBookExperience={handleOpenExperienceInquiry}
      />

      {/* Story Detail Modal */}
      <StoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
        isSaved={selectedStory ? savedIds.includes(selectedStory.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Booking / Concierge Inquiry Modal */}
      <BookingInquiryModal
        isOpen={inquiryModal.isOpen}
        onClose={() => setInquiryModal({ ...inquiryModal, isOpen: false })}
        tour={inquiryModal.tour}
        experience={inquiryModal.experience}
        customDestination={inquiryModal.customDestination}
        currency={currency}
      />
    </div>
  );
}
