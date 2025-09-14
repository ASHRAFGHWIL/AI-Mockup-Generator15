import React from 'react';
import { CheckIcon } from './icons';

interface Color {
  name: string;
  value: string;
}

interface ColorPickerProps {
  label: string;
  colors: Color[];
  selectedValue: string;
  onChange: (value: string) => void;
}

// Helper to decide if the checkmark should be black or white
const getContrastColor = (hex: string): 'white' | 'black' => {
  if (!hex || hex.length < 4) return 'white'; // Default for invalid hex
  let cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }
  if (cleanHex.length !== 6) return 'white';

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? 'black' : 'white';
};


const ColorPicker: React.FC<ColorPickerProps> = ({ label, colors, selectedValue, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            role="radio"
            aria-checked={selectedValue === color.value}
            aria-label={color.name}
            title={color.name}
            onClick={() => onChange(color.value)}
            className={`w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 relative flex items-center justify-center
              ${selectedValue === color.value ? 'ring-2 ring-offset-2 ring-indigo-400 ring-offset-gray-800' : 'border-gray-600'}`}
            style={{ backgroundColor: color.value }}
          >
            {selectedValue === color.value && <CheckIcon className="w-5 h-5" style={{ color: getContrastColor(color.value) }} />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
