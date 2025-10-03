import React from 'react';
import { WandIcon, DownloadIcon, BackArrowIcon } from './icons';
import type { ProductType, ImageMode } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface PreviewDisplayProps {
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
  productType: ProductType;
  onDownloadLogoPng: () => void;
  onDownloadTextSvg: () => void;
  onDownloadTextPng: () => void;
  onDownloadCombinedSvg: () => void;
  onDownloadCombinedPng: () => void;
  onDownloadEngravingSvg: () => void;
  onDownloadMockupPng: () => void;
  onDownloadMockupJpg: () => void;
  imageMode: ImageMode;
  isPreviewExpanded: boolean;
  onExitPreview: () => void;
}

const PreviewDisplay: React.FC<PreviewDisplayProps> = ({ generatedImage, isLoading, error, productType, onDownloadLogoPng, onDownloadTextSvg, onDownloadTextPng, onDownloadCombinedSvg, onDownloadCombinedPng, onDownloadEngravingSvg, onDownloadMockupPng, onDownloadMockupJpg, imageMode, isPreviewExpanded, onExitPreview }) => {
    const { t } = useTranslation();
    
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

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center gap-6">
      <div className={`w-full bg-gray-900/50 rounded-lg p-4 lg:p-8 relative flex items-center justify-center transition-colors ${imageMode === 'fit_transparent' ? '!bg-transparent' : ''}`}>
        
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
            {imageMode === 'fit_blur' && (
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
              className={
                `transition-all duration-300 rounded-lg shadow-2xl relative
                ${(imageMode === 'fit' || imageMode === 'fit_blur' || imageMode === 'fit_transparent') ? 'max-w-full max-h-full object-contain' : ''}
                ${imageMode === 'crop' ? 'w-full h-full object-cover' : ''}
                ${imageMode === 'stretch' ? 'w-full h-full object-fill' : ''}`
              }
            />
          </>
        )}
      </div>

      {isPreviewExpanded && generatedImage && !isLoading && (
        <div className="flex flex-col items-center gap-3 w-full">
            {/* Mockup Download Section */}
            <div className="p-3 rounded-lg bg-black/30 w-full max-w-md">
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={onExitPreview}
                        aria-label={t('backToEditorButton')}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors"
                    >
                        <BackArrowIcon className="w-5 h-5 rtl:scale-x-[-1]" />
                        <span>{t('backToEditorButton')}</span>
                    </button>
                    <button
                        onClick={onDownloadMockupPng}
                        title="Download Mockup as PNG"
                        className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105"
                    >
                        <DownloadIcon className="w-5 h-5" />
                        <span>{t('downloadPngButton')}</span>
                    </button>
                    <button
                        onClick={onDownloadMockupJpg}
                        title="Download Mockup as JPG"
                        className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105"
                    >
                        <DownloadIcon className="w-5 h-5" />
                        <span>{t('downloadJpgButton')}</span>
                    </button>
                </div>
            </div>

            {/* Design Download Section */}
            {textBasedProducts.includes(productType) && (
              <div className="p-3 rounded-lg bg-black/30 w-full max-w-md">
                  <div className="flex items-center justify-center gap-4">
                      <span className="text-lg font-semibold text-gray-200 shrink-0">{t('downloadDesignLabel')}</span>
                      <button
                          onClick={onDownloadCombinedSvg}
                          title="Download Design as SVG"
                          className="flex-1 flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105"
                      >
                          <DownloadIcon className="w-5 h-5" />
                          <span>{t('downloadDesignSvgButton')}</span>
                      </button>
                      <button
                          onClick={onDownloadCombinedPng}
                          title="Download Design as PNG"
                          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105"
                      >
                          <DownloadIcon className="w-5 h-5" />
                          <span>{t('downloadDesignPngButton')}</span>
                      </button>
                  </div>
              </div>
            )}
            
            {/* Individual Assets Download Section */}
            <div className="p-3 rounded-lg bg-black/30 w-full max-w-md">
                <div className="flex items-center justify-center gap-4">
                    <span className="text-sm font-semibold text-gray-400 shrink-0">{t('assetsLabel')}</span>
                    <button onClick={onDownloadLogoPng} className="flex-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-3 rounded-md transition-colors">{t('logoPngButton')}</button>
                    
                    {textBasedProducts.includes(productType) && (
                        <>
                        <button onClick={onDownloadTextSvg} className="flex-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-3 rounded-md transition-colors">{t('textSvgButton')}</button>
                        <button onClick={onDownloadTextPng} className="flex-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-3 rounded-md transition-colors">{t('textPngButton')}</button>
                        </>
                    )}

                    {productType === 'laser_engraving' && (
                        <button onClick={onDownloadEngravingSvg} className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg flex items-center gap-2 transition-all transform hover:scale-105">
                            <DownloadIcon className="w-5 h-5" />
                            <span>{t('downloadEngravingButton')}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default PreviewDisplay;