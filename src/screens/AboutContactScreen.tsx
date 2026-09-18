import React, { useState } from 'react';

export const AboutContactScreen: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const faqs = [
    {
      q: 'When is the best time of year to travel to Sri Lanka?',
      a: 'Sri Lanka is genuinely a year-round paradise due to its dual monsoon system. From November to April, the South and West coasts (Galle, Mirissa, Bentota) and Central Highlands enjoy clear skies and calm seas. From May to September, the East Coast (Trincomalee, Pasikuda, Arugam Bay) boasts pristine, sunny beach weather while the Cultural Triangle remains dry.',
    },
    {
      q: 'Do international travelers need a visa for Sri Lanka?',
      a: 'Yes, most international travelers require an Electronic Travel Authorization (ETA) or tourist visa prior to boarding. This can be processed online through the official Sri Lankan immigration portal. Our concierge desk provides complimentary assistance and flight-connection guidance upon booking.',
    },
    {
      q: 'How does the Private Chauffeur-Guide service work?',
      a: 'Your dedicated chauffeur meets you at Bandaranaike International Airport (CMB) with your name board and stays with you throughout your entire expedition. All vehicle fuel, highway tolls, parking permits, and driver lodging/meals are 100% covered in your quote. Our drivers are SLTDA-licensed, fluent in English, and certified in first aid.',
    },
    {
      q: 'What is the dress code when visiting ancient sacred sites & temples?',
      a: 'When visiting Buddhist and Hindu temples (such as Sigiriya, Temple of the Tooth in Kandy, and Dambulla Caves), shoulders and knees must be covered. White or light-colored attire is considered respectful. Footwear and hats are removed at the temple entrance (we recommend carrying a pair of spare socks for warm stone walkways).',
    },
    {
      q: 'Can our travel itinerary be modified after booking?',
      a: 'Absolutely. We specialize in bespoke, flexible private travel. Once on the island, you can adapt your daily rhythm—whether sleeping in, lingering longer at a scenic waterfall, or requesting an impromptu roadside king coconut stop.',
    },
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <div className="w-full bg-[#fbf9f6] min-h-screen pb-20">
      
      {/* Header Banner */}
      <section className="relative w-full py-20 bg-[#00241a] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBwV0g7kCQ5uJLzBLHqn42qexhUNj38IWThVYEUsiv4JZ3lsPABv25c3FJgcz2_wzJDGC_2MpLovsXYXoOHMWNFxqZE1fOBJONrD8D6wEyU7FelFkMACTxUyI-vzDQIdG5d7QnSU6oeg6t85-3t_Y9Kb7ZOA0mEvuaR5T96UlQxVNat4E75QWwb7qR9Q52xUZ-TvMDBgj7Ob2WynZMrzIEQAd9H-vBiFJSAeAMzOqgfLZR8zoDHY21DcA')`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8f4e00] text-white text-[11px] font-bold uppercase tracking-widest mx-auto">
            <span>About Travel Ceylone & Concierge</span>
          </div>
          <h1 className="font-headline-xl text-[36px] sm:text-[48px] text-white font-bold leading-tight">
            The Soul of Sri Lankan Hospitality
          </h1>
          <p className="font-body-lg text-[16px] text-[#a3d0be] max-w-2xl mx-auto leading-relaxed">
            Headquartered in Colombo 03, we design thoughtful private expeditions grounded in deep cultural respect, unhurried luxury, and honest island hospitality.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16 pt-16 space-y-16">
        
        {/* Our Story & Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase font-bold text-[#8f4e00] tracking-wider">
              Bespoke Destination Specialists
            </span>
            <h2 className="font-headline-xl text-[30px] sm:text-[38px] text-[#00241a] font-bold leading-snug">
              Curating Sri Lanka Beyond the Guidebooks
            </h2>
            <p className="text-[#414845] text-sm leading-relaxed">
              Travel Ceylone was founded on a simple belief: Sri Lanka’s greatest treasures are not just its ancient stone citadels or pristine beaches, but the warmth of its people, the scent of cinnamon bark in village kitchens, and the quiet awe of misty mornings in high-grown tea hills.
            </p>
            <p className="text-[#414845] text-sm leading-relaxed">
              As a fully licensed Sri Lanka Tourism Development Authority (SLTDA) operator (License #4920), our private chauffeurs and local naturalists are among the most respected in the island, ensuring every traveler experiences effortless comfort, safety, and cultural authenticity.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-gray-200">
                <span className="text-2xl font-bold text-[#00241a]">4,500+</span>
                <span className="text-xs text-gray-500 block">Private Journeys Realized</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-200">
                <span className="text-2xl font-bold text-[#8f4e00]">100%</span>
                <span className="text-xs text-gray-500 block">Local Ceylon Chauffeurs</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL1mF1JbBOsydKRvPYXv-pTjwkTbrfiaz8993wasqjbi2w7hvAQ_47nS5oYffXTxsb7mk_7eull5dzXMAL6W4tiDvA4-AaOWYUk84r_Vz-ku4PXVnOdeRmfwG8NHM4HmobxCJgQkcc_zrj6ip3XAIRvC8xxfsY00lE2ua4YPNmlq9EkIe8A43E_5ESAEjXjOCU-fN0NFlAuo_OnUFImeazweQIdru43h1TppZpg_bt8p7dOKrPonR26g"
                alt="Travel Ceylone Heritage Experience"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#00241a] text-white p-5 rounded-xl shadow-lg max-w-xs hidden sm:block border border-[#0d3b2e]">
              <div className="text-xs text-[#fea047] font-bold uppercase">Our Promise</div>
              <div className="text-xs text-[#a3d0be] mt-1">
                Zero rushed bus tours. Only private, tailored journeys guided at your natural rhythm.
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Concierge Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 bg-[#00241a] text-white p-8 rounded-2xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-[#8f4e00] text-white text-[10px] font-bold uppercase tracking-wider">
                Island Concierge Desk
              </span>
              <h3 className="font-headline-sm text-[26px] font-bold text-white">
                We're Here in Sri Lanka For You
              </h3>
              <p className="text-xs text-[#a3d0be] leading-relaxed">
                Connect with our Colombo headquarters for immediate answers, flight arrangements, or bespoke journey itineraries.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px] text-[#fea047] mt-0.5">
                    location_on
                  </span>
                  <div className="text-xs">
                    <strong>Colombo Headquarters:</strong>
                    <div className="text-gray-300">Level 8, World Trade Center, Colombo 03, Sri Lanka</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px] text-[#fea047] mt-0.5">
                    phone
                  </span>
                  <div className="text-xs">
                    <strong>Direct Concierge Line:</strong>
                    <div className="text-gray-300">+94 11 234 5678 (24/7 Island Service)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px] text-[#fea047] mt-0.5">
                    chat
                  </span>
                  <div className="text-xs">
                    <strong>Direct WhatsApp Hotline:</strong>
                    <div className="text-[#beedd9] font-bold">+94 77 123 4567</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px] text-[#fea047] mt-0.5">
                    mail
                  </span>
                  <div className="text-xs">
                    <strong>Email Dossiers:</strong>
                    <div className="text-gray-300">concierge@travelceylone.com</div>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-[#8f4e00] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#6d3a00] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Open Direct WhatsApp Chat</span>
            </a>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-headline-sm text-[22px] font-bold text-[#00241a] mb-2">
              Send an Inquiry to Our Travel Desk
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Have questions or want custom recommendations? Write to us and a senior travel specialist will respond within 12 hours.
            </p>

            {inquirySent ? (
              <div className="p-6 rounded-xl bg-[#beedd9]/30 border border-[#beedd9] text-center space-y-2">
                <span className="material-symbols-outlined text-[32px] text-[#00241a]">task_alt</span>
                <h4 className="font-bold text-[#00241a]">Message Sent Successfully!</h4>
                <p className="text-xs text-[#414845]">
                  Thank you, <strong>{inquiryName}</strong>. Your inquiry has reached our Colombo concierge. We have sent a confirmation email to <strong>{inquiryEmail}</strong>.
                </p>
                <button
                  onClick={() => setInquirySent(false)}
                  className="mt-3 text-xs font-bold text-[#8f4e00] hover:underline block mx-auto"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Sterling"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#f5f3f0] border border-gray-200 text-sm focus:outline-none focus:border-[#8f4e00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="david@example.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#f5f3f0] border border-gray-200 text-sm focus:outline-none focus:border-[#8f4e00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Your Travel Question or Plans *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about the dates you are considering, family size, or questions about tea country and beaches..."
                    value={inquiryMsg}
                    onChange={(e) => setInquiryMsg(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#f5f3f0] border border-gray-200 text-sm focus:outline-none focus:border-[#8f4e00]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-[#00241a] text-white font-bold text-xs hover:bg-[#8f4e00] transition-colors shadow"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Travel FAQ Accordion */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold text-[#8f4e00] tracking-wider">
              Travel Knowledge
            </span>
            <h2 className="font-headline-xl text-[28px] sm:text-[36px] text-[#00241a] font-bold">
              Frequently Asked Ceylon Travel Questions
            </h2>
            <p className="text-xs text-gray-500">
              Essential tips prepared by our expedition leads for a smooth and memorable journey.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white border border-gray-200 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#00241a] hover:text-[#8f4e00]"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-[20px] text-[#8f4e00] flex-shrink-0">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#414845] leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
