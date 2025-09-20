import React from 'react';

const IconProps = {
  // Common props for all icons
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.5,
};

export const TshirtIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v1.5l-2.5 2.5V19.5h11V8.5L15 6V4.5h-6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5a3 3 0 013-3 3 3 0 013 3" />
  </svg>
);

export const SweatshirtIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5A3.375 3.375 0 008.625 1.125 3.375 3.375 0 0012 4.5zm0 0A3.375 3.375 0 0115.375 1.125 3.375 3.375 0 0112 4.5zm0 0v1.5m0 0a3 3 0 013 3v2.25m-6 0V9a3 3 0 013-3m-3 9H3.75l1.5-1.5m9.75 1.5H20.25l-1.5-1.5M9 18h6v-3H9v3z" />
  </svg>
);

export const HoodieIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6v-3H9v3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75V9A3 3 0 0112 6v0a3 3 0 013 3v3.75m-6 0H3.75l1.5-1.5M15 12.75H20.25l-1.5-1.5m-3.75 0V9a2.25 2.25 0 00-4.5 0v3.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V3.75A2.25 2.25 0 0114.25 6v0" />
  </svg>
);

export const BagIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m11.25 0H2.25l1.125 11.25H19.125l1.125-11.25z" />
  </svg>
);

export const FrameIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="1" />
    <rect x="7" y="7" width="10" height="10" />
  </svg>
);

export const MugIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path d="M5 9h10a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2V11a2 2 0 012-2z" />
    <path d="M17 11h2a2 2 0 012 2v2a2 2 0 01-2 2h-2" />
  </svg>
);

export const SipperGlassIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path d="M7 3h10v18H7z" />
    <path d="M12 8V3" />
  </svg>
);

export const TumblerIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path d="M8 3h8l-1 18H9L8 3z" />
    <path d="M8 3h8v2H8z" />
  </svg>
);

export const HalloweenTumblerIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path d="M8 3h8l-1 18H9L8 3z" />
    <path d="M8 3h8v2H8z" />
    <path d="M10.5 11h-1v1h1v-1zm4 0h-1v1h1v-1z" />
    <path d="M9.5 15a4 4 0 005 0" />
  </svg>
);

export const TumblerTrioIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path d="M3 3h4l-.5 15h-3L3 3zm7 0h4l-.5 15h-3L10 3zm7 0h4l-.5 15h-3L17 3z" />
    <path d="M2 3h20v2H2zm-.5 15h21v2h-21z"/>
  </svg>
);

export const LaserIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path d="M13 2L6 14h4l-1 8l7-12h-4z" />
    <path d="M3 20h18" />
  </svg>
);

export const PhoneCaseIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <rect x="7" y="2" width="10" height="20" rx="2" />
    <rect x="9" y="4.5" width="2" height="3" rx="0.5" />
  </svg>
);

export const StickerIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path d="M20 7l-5-5H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7z" />
    <path d="M15 2v5h5" />
  </svg>
);

export const PosterIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <rect x="4" y="2" width="16" height="20" rx="1" />
  </svg>
);

export const WalletIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5H3a1.5 1.5 0 00-1.5 1.5v9A1.5 1.5 0 003 19.5h18a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0021 7.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 11.25a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01z" />
  </svg>
);

export const CapIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path d="M12 2a5 5 0 00-5 5v2h10V7a5 5 0 00-5-5z" />
    <path d="M19 12a7.5 7.5 0 01-14 0" />
  </svg>
);

export const BeanieIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path d="M4.5 15.5a7.5 7.5 0 0115 0" />
    <path d="M4 19h16v-3.5a7.5 7.5 0 00-15 0V19z" />
    <path d="M12 2a3 3 0 013 3v2a3 3 0 01-6 0V5a3 3 0 013-3z" />
  </svg>
);

export const PillowIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path d="M2 10 C 2 2, 10 2, 12 2 S 22 2, 22 10 S 22 22, 12 22 S 2 22, 2 10 Z" />
  </svg>
);

export const FlatLayIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path d="M5 3h14l-2 8H7L5 3z" />
    <path d="M7 11v10h10V11" />
  </svg>
);

export const PuzzleIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path d="M14 7h-4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2V9a2 2 0 00-2-2z" />
    <path d="M12 2v3a2 2 0 01-2 2H7" />
    <path d="M12 22v-3a2 2 0 00-2-2H7" />
    <path d="M2 12h3a2 2 0 002-2V7" />
    <path d="M22 12h-3a2 2 0 00-2-2V7" />
  </svg>
);

export const LaptopSleeveIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
  </svg>
);

export const TshirtAndMugIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path d="M8 4H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V5a1 1 0 00-1-1h-4" />
    <path d="M12 2a2 2 0 00-2 2v2h4V4a2 2 0 00-2-2z" />
    <path d="M17 14h2a1 1 0 011 1v2a1 1 0 01-1 1h-2v-4z" />
  </svg>
);

export const SweatshirtAndMugIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className}>
    <path d="M12 4.5A3.375 3.375 0 008.625 1.125 3.375 3.375 0 0012 4.5zm0 0A3.375 3.375 0 0115.375 1.125 3.375 3.375 0 0112 4.5zm0 0v1.5m0 0a3 3 0 013 3v2.25M6.75 9V11.25a3 3 0 003 3h0m-3-6H3.75l1.5-1.5" />
    <path d="M17 14h2a1 1 0 011 1v2a1 1 0 01-1 1h-2v-4z" />
  </svg>
);