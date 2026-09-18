import React from 'react';

interface FooterProps {
  onNavigate: (screen: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (screen: string) => {
    onNavigate(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#00241a] text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 pb-12 border-b border-[#0d3b2e]">
          
          {/* Col 1 & 2: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                alt="Travel Ceylone Brand Logo"
                className="h-8 w-auto object-contain brightness-0 invert"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XDgJBH6ehH8H4X4QeCdifoxrc9RyYgSAmtsxHMGpq47KKGMFy6QvF8H6nzzjMUAM_GW-FdmdwAkNX1av7_TgMC9q4h0zR_UGRMPWqIpVVoKshdlh87VoL22dUe3FWFgh8YqSOr1Vq6HuoZ0_GS0EqdKBz7h9hB6p0UBHcmmLF_eddO4FSPJwE6e9GzcwDQ_zSKAapl3F4RQK-n-cUPyMJsvLxPkfdcRz43yGnPu3_MJX6K_6wwXkdDi93K"
              />
              <span className="font-headline-sm text-[20px] font-bold tracking-tight text-white">
                Travel Ceylone
              </span>
            </div>

            <p className="font-headline-md text-[22px] italic text-[#ffb77a] leading-snug">
              “Discover Sri Lanka. Experience Ceylon.”
            </p>

            <p className="text-[#a3d0be] font-body-sm text-[13px] leading-relaxed max-w-sm">
              Handcrafting sustainable, high-end expeditions across misty highland tea estates, ancient royal citadels, and wild tropical coastlines.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d3b2e] text-[#beedd9] text-[11px] font-bold tracking-widest uppercase">
              <span className="material-symbols-outlined text-sm text-[#fea047]">verified</span>
              <span>SLTDA Certified Luxury Operator • License #4920</span>
            </div>
          </div>

          {/* Col 3: Explore */}
          <div className="space-y-3">
            <span className="font-label-eyebrow text-[11px] uppercase tracking-widest text-[#ffb77a] block font-bold">
              Explore
            </span>
            <ul className="space-y-2 text-[13px] text-[#a3d0be]">
              <li>
                <button onClick={() => handleNav('destinations')} className="hover:text-white transition-colors text-left">
                  Destinations
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('tours')} className="hover:text-white transition-colors text-left">
                  Bespoke Tours
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('experiences')} className="hover:text-white transition-colors text-left">
                  Curated Experiences
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors text-left">
                  Travel Stories
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destinations')} className="hover:text-white transition-colors text-left">
                  Hidden Gems
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="space-y-3">
            <span className="font-label-eyebrow text-[11px] uppercase tracking-widest text-[#ffb77a] block font-bold">
              Company
            </span>
            <ul className="space-y-2 text-[13px] text-[#a3d0be]">
              <li>
                <button onClick={() => handleNav('about-us')} className="hover:text-white transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about-us')} className="hover:text-white transition-colors text-left">
                  Why Travel Ceylone
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about-us')} className="hover:text-white transition-colors text-left">
                  Team & Guides
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about-us')} className="hover:text-white transition-colors text-left">
                  Sustainability Pledge
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors text-left">
                  Careers & Chauffeurs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Help & Info */}
          <div className="space-y-3">
            <span className="font-label-eyebrow text-[11px] uppercase tracking-widest text-[#ffb77a] block font-bold">
              Help & Info
            </span>
            <ul className="space-y-2 text-[13px] text-[#a3d0be]">
              <li>
                <button onClick={() => handleNav('about-us')} className="hover:text-white transition-colors text-left">
                  Frequently Asked
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about-us')} className="hover:text-white transition-colors text-left">
                  Travel Visa & Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors text-left">
                  Best Time to Visit
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors text-left">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 6: Contact */}
          <div className="space-y-3">
            <span className="font-label-eyebrow text-[11px] uppercase tracking-widest text-[#ffb77a] block font-bold">
              Contact
            </span>
            <div className="space-y-1.5 text-[13px] text-[#a3d0be]">
              <p className="text-white font-bold text-[16px]">+94 77 123 4567</p>
              <p>hello@travelceylone.com</p>
              <p>24/7 Dedicated Concierge</p>
              <p>Colombo 03, Sri Lanka</p>
            </div>
            <div className="flex items-center gap-2 pt-2 text-[#ffb77a]">
              <a
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#0d3b2e] flex items-center justify-center hover:bg-[#8f4e00] hover:text-white transition-all"
                href="#instagram"
                onClick={(e) => e.preventDefault()}
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
              <a
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#0d3b2e] flex items-center justify-center hover:bg-[#8f4e00] hover:text-white transition-all"
                href="#facebook"
                onClick={(e) => e.preventDefault()}
              >
                <span className="material-symbols-outlined text-[18px]">public</span>
              </a>
              <a
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-[#0d3b2e] flex items-center justify-center hover:bg-[#8f4e00] hover:text-white transition-all"
                href="#youtube"
                onClick={(e) => e.preventDefault()}
              >
                <span className="material-symbols-outlined text-[18px]">smart_display</span>
              </a>
              <a
                aria-label="TikTok"
                className="w-8 h-8 rounded-full bg-[#0d3b2e] flex items-center justify-center hover:bg-[#8f4e00] hover:text-white transition-all"
                href="#tiktok"
                onClick={(e) => e.preventDefault()}
              >
                <span className="material-symbols-outlined text-[18px]">music_note</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[#a3d0be] text-[13px]">
          <p>© 2026 Travel Ceylone (Pvt) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[12px] font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#ffb77a]">shield</span>
              Verified Safe Travels
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#ffb77a]">payments</span>
              Secure Global Escrow
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
