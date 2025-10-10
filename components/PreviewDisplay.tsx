import React, { useState, useEffect, useRef } from 'react';
import { WandIcon, DownloadIcon, BackArrowIcon, ZoomInIcon, ZoomOutIcon } from './icons';
import type { ProductType, ImageMode } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface PreviewDisplayProps {
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
  productType: ProductType;
  onDownloadCombinedSvg: () => void;
  onDownloadCombinedPng: () => void;
  onDownloadEngravingSvg: () => void;
  onDownloadMockupPng: () => void;
  onDownloadMockupJpg: () => void;
  imageMode: ImageMode;
  isPreviewExpanded: boolean;
  onExitPreview: () => void;
}

const PreviewDisplay: React.FC<PreviewDisplayProps> = ({ generatedImage, isLoading, error, productType, onDownloadCombinedSvg, onDownloadCombinedPng, onDownloadEngravingSvg, onDownloadMockupPng, onDownloadMockupJpg, imageMode, isPreviewExpanded, onExitPreview }) => {
    const { t } = useTranslation();
    const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
    const downloadMenuRef = useRef<HTMLDivElement>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    
    const loadingMessages = React.useMemo(() => [
        t('loadingMsg1'),
        t('loadingMsg2'),
        t('loadingMsg3'),
        t('loadingMsg4'),
        t('loadingMsg5'),
        t('loadingMsg6'),
    ], [t]);

    const [loadingMessage, setLoadingMessage] = React.useState(loadingMessages[0]);
    
    const textBasedProducts: ProductType[] = ['tshirt', 'sweatshirt', 'hoodie', 'bag', 'phone_case', 'sticker', 'poster', 'wallet', 'cap', 'pillow', 'flat_lay', 'tumbler_wrap', 'halloween_tumbler', 'tumbler_trio', 'tshirt_teacup_scene', 'sweatshirt_mug_scene', 'hoodie_teacup_scene', 'sweatshirt_teacup_scene'];
    const imageUrl = generatedImage ? `data:image/png;base64,${generatedImage}` : '';

    React.useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
            }, 2500);
            return () => clearInterval(interval);
        }
    }, [isLoading, loadingMessages]);

    // Close dropdown on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target as Node)) {
          setIsDownloadMenuOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleDownloadClick = (downloadFn: () => void) => {
      downloadFn();
      setIsDownloadMenuOpen(false);
    };

    const effectiveImageMode = isZoomed ? 'crop' : imageMode;
    const imageClasses = `
      transition-all duration-500 ease-in-out rounded-lg shadow-2xl relative
      ${(effectiveImageMode === 'fit' || effectiveImageMode === 'fit_blur' || effectiveImageMode === 'fit_transparent') ? 'max-w-full max-h-full object-contain' : ''}
      ${effectiveImageMode === 'crop' ? 'w-full h-full object-cover' : ''}
      ${effectiveImageMode === 'stretch' ? 'w-full h-full object-fill' : ''}
    `;

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center gap-6">
      <div className={`w-full bg-gray-900/50 rounded-lg p-4 lg:p-8 relative flex items-center justify-center overflow-hidden transition-colors ${imageMode === 'fit_transparent' ? '!bg-transparent' : ''}`}>
        
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-10 text-white transition-opacity">
            <svg className="animate-spin h-12 w-12 text-indigo-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-semibold">{loadingMessage}</p>
            <p className="text-sm text-gray-400 mt-1">{t('loadingMoment')}</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="text-center text-red-400">
              <h3 className="text-xl font-semibold">{t('generationFailedTitle')}</h3>
              <p className="mt-2 text-sm">{error}</p>
          </div>
        )}

        {!generatedImage && !isLoading && !error && (
           <div className="text-center text-gray-500">
            <WandIcon className="w-24 h-24 mx-auto text-gray-700" />
            <h3 className="mt-4 text-xl font-semibold text-gray-400">{t('previewPlaceholderTitle')}</h3>
            <p className="mt-1 text-sm">{t('previewPlaceholderSubtitle')}</p>
          </div>
        )}

        {generatedImage && (
          <>
            {imageMode === 'fit_blur' && !isZoomed && (
                <img 
                    src={imageUrl} 
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover filter blur-xl scale-110"
                />
            )}
            <img 
              src={imageUrl}
              alt="Generated mockup" 
              className={imageClasses}
            />
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-4 right-4 z-20 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white transition-all backdrop-blur-sm"
              aria-label={isZoomed ? t('zoomOut') : t('zoomIn')}
              title={isZoomed ? t('zoomOut') : t('zoomIn')}
            >
              {isZoomed ? <ZoomOutIcon className="w-6 h-6" /> : <ZoomInIcon className="w-6 h-6" />}
            </button>
          </>
        )}
      </div>

      {isPreviewExpanded && generatedImage && !isLoading && (
        <div className="flex items-center gap-3 w-full justify-center">
            <button
                onClick={onExitPreview}
                aria-label={t('backToEditorButton')}
                className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
            >
                <BackArrowIcon className="w-5 h-5 rtl:scale-x-[-1]" />
                <span>{t('backToEditorButton')}</span>
            </button>

            <div className="relative" ref={downloadMenuRef}>
              <button
                  onClick={() => setIsDownloadMenuOpen(prev => !prev)}
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
              >
                  <DownloadIcon className="w-5 h-5" />
                  <span>{t('downloadButton')}</span>
              </button>
              
              {isDownloadMenuOpen && (
                <div className="absolute bottom-full mb-2 w-56 bg-gray-700 rounded-lg shadow-2xl overflow-hidden z-20 border border-gray-600">
                  {productType === 'laser_engraving' ? (
                     <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); handleDownloadClick(onDownloadEngravingSvg); }}
                      className="block px-4 py-3 text-sm text-gray-200 hover:bg-indigo-500 hover:text-white transition-colors"
                    >
                      {t('downloadEngravingSvg')}
                    </a>
                  ) : (
                    <>
                      <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{t('downloadMockupLabel')}</div>
                      <a href="#" onClick={(e) => { e.preventDefault(); handleDownloadClick(onDownloadMockupPng); }} className="block px-4 py-3 text-sm text-gray-200 hover:bg-indigo-500 hover:text-white transition-colors">{t('downloadMockupPng')}</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); handleDownloadClick(onDownloadMockupJpg); }} className="block px-4 py-3 text-sm text-gray-200 hover:bg-indigo-500 hover:text-white transition-colors">{t('downloadMockupJpg')}</a>
                      <div className="border-t border-gray-600 my-1"></div>
                      <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{t('downloadDesignLabel')}</div>
                      <a href="#" onClick={(e) => { e.preventDefault(); handleDownloadClick(onDownloadCombinedSvg); }} className="block px-4 py-3 text-sm text-gray-200 hover:bg-indigo-500 hover:text-white transition-colors">{t('downloadDesignSvg')}</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); handleDownloadClick(onDownloadCombinedPng); }} className="block px-4 py-3 text-sm text-gray-200 hover:bg-indigo-500 hover:text-white transition-colors">{t('downloadDesignPng')}</a>
                    </>
                  )}
                </div>
              )}
            </div>
        </div>
      )}
    </div>
  );
};

export default PreviewDisplay;