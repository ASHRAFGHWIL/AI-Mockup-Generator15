
import React from 'react';

export const UploadIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);

export const TrashIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

export const WandIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104l-1.328 4.648-4.648 1.328 4.648 1.328 1.328 4.648 1.328-4.648 4.648-1.328-4.648-1.328L9.75 3.104zM18 9l-2.25 2.25L18 13.5l-2.25 2.25L13.5 18l-2.25-2.25L9 18l-2.25-2.25L9 13.5l2.25-2.25L9 9l2.25-2.25L13.5 9l2.25-2.25L18 9z"/>
    </svg>
);

export const DownloadIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const IconProps = {
  // Common props for all icons
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.5,
};

export const FitIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className} viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="2" strokeDasharray="4 2" strokeWidth="2" />
    <rect x="6" y="6" width="12" height="12" rx="1" strokeWidth="2" />
  </svg>
);

export const FitBlurIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className} viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="2" fill="url(#p-blur)" />
    <rect x="6" y="6" width="12" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
    <defs>
      <pattern id="p-blur" width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.5"/>
        <circle cx="4" cy="4" r="1" fill="currentColor" opacity="0.5"/>
      </pattern>
    </defs>
  </svg>
);

export const FitTransparentIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className} viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="2" fill="url(#p-check)" />
    <rect x="6" y="6" width="12" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
    <defs>
      <pattern id="p-check" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="4" height="4" fill="currentColor" opacity="0.3"/>
        <rect x="4" y="4" width="4" height="4" fill="currentColor" opacity="0.3"/>
      </pattern>
    </defs>
  </svg>
);

export const CropIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className} viewBox="0 0 24 24" strokeWidth="2">
    <path d="M6 2v14a2 2 0 0 0 2 2h14" />
    <path d="M18 22V8a2 2 0 0 0-2-2H2" />
  </svg>
);

export const StretchIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className} viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="2" strokeDasharray="4 2" strokeWidth="2" />
    <rect x="6" y="4" width="12" height="16" rx="1" strokeWidth="2" />
  </svg>
);

export const CheckIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export const AspectRatioSquareIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className} viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" rx="2" />
  </svg>
);

export const AspectRatioHorizontalIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className} viewBox="0 0 24 24">
    <rect x="2" y="7" width="20" height="10" rx="2" />
  </svg>
);

export const AspectRatioVerticalIcon = ({ className }: { className?: string }) => (
  <svg {...IconProps} className={className} viewBox="0 0 24 24">
    <rect x="7" y="2" width="10" height="20" rx="2" />
  </svg>
);