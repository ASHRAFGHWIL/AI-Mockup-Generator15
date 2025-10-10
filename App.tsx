import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import ControlsPanel from './components/ControlsPanel';
import PreviewDisplay from './components/PreviewDisplay';
import { WandIcon, UndoIcon, RedoIcon, ResetIcon } from './components/icons';
import type { DesignOptions, ImageMode } from './types';
import { generateMockup as generateMockupFromApi } from './services/geminiService';
import { generateCombinedSvg, generateCombinedPng, generateEngravingSvg, generateTextOnlySvg, generateTextOnlyPng } from './services/svgService';
import { LanguageContext, useTranslation, Language } from './hooks/useTranslation';
import { en } from './i18n/en';
// FIX: Statically import the 'ar' translations to resolve the "Cannot find name 'require'" error, which is not available in a browser environment.
import { ar } from './i18n/ar';
import { SAMPLE_LOGO_B64 } from './sample';

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: keyof typeof en) => {
    if (language === 'ar') {
      return ar[key] || key;
    }
    return en[key] || key;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, t]);
  
  React.useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

const initialDesignState: DesignOptions = {
    productType: 'sweatshirt',
    logo: SAMPLE_LOGO_B64,
    text: 'BOO',
    productColor: '#FFFFFF',
    textColor: '#A78BFA',
    style: 'distressed_vintage',
    pose: 'sitting_floor_relaxed',
    audience: 'woman_stylish_redhead',
    font: 'creepster',
    textStyle: 'none',
    gradientStartColor: '#2563EB',
    gradientEndColor: '#B91C1C',
    aspectRatio: '1:1',
    backgroundStyle: 'studio',
    professionalBackground: 'white_marble',
    artisticFilter: 'none',
    bagMaterial: 'canvas',
    frameStyle: 'classic_ornate',
    frameModel: 'elegant_woman_street',
    frameTexture: 'none',
    frameDimension: '8.5x11',
    mugStyle: 'classic_ceramic',
    mugModel: 'woman_cafe',
    sipperGlassStyle: 'classic_can_shape',
    sipperGlassModel: 'woman_cafe_elegant',
    tumblerStyle: 'stainless_steel',
    tumblerModel: 'person_gym',
    halloweenTumblerStyle: 'glossy_black',
    halloweenTumblerSetting: 'spooky_table',
    tumblerTrioStyle: 'glossy_white',
    tumblerTrioSetting: 'marble_countertop',
    phoneCaseStyle: 'glossy',
    phoneCaseModel: 'person_holding',
    stickerStyle: 'die_cut_glossy',
    stickerSetting: 'on_laptop',
    posterStyle: 'glossy_finish',
    posterSetting: 'framed_on_wall',
    walletStyle: 'bifold',
    walletModel: 'person_holding',
    capStyle: 'structured_baseball',
    capModel: 'person_forwards',
    beanieStyle: 'cuffed',
    beanieModel: 'person_forwards',
    pillowStyle: 'square_cotton',
    pillowSetting: 'on_sofa',
    flatLayStyle: 'minimalist_neutral',
    puzzleStyle: 'rectangle_cardboard',
    puzzleSetting: 'on_wooden_table',
    laptopSleeveStyle: 'neoprene',
    laptopSleeveSetting: 'on_desk_modern',
};

const AppContent: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  
  const [history, setHistory] = useState<DesignOptions[]>([initialDesignState]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const design = history[historyIndex];

  const setDesign = (newDesign: DesignOptions | ((prevState: DesignOptions) => DesignOptions)) => {
    const newState = typeof newDesign === 'function' ? newDesign(design) : newDesign;

    // Prevent adding identical states to history
    if (JSON.stringify(newState) === JSON.stringify(design)) {
      return;
    }

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleUndo = useCallback(() => {
    if (canUndo) {
      setHistoryIndex(prevIndex => prevIndex - 1);
    }
  }, [canUndo]);

  const handleRedo = useCallback(() => {
    if (canRedo) {
      setHistoryIndex(prevIndex => prevIndex + 1);
    }
  }, [canRedo]);

  const handleReset = useCallback(() => {
    setHistory([initialDesignState]);
    setHistoryIndex(0);
  }, []);


  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageMode, setImageMode] = useState<ImageMode>('fit_blur');
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const logoFileRef = useRef<File | null>(null);

  useEffect(() => {
    // Initialize with sample logo
    const initializeSampleLogo = async () => {
      try {
        const response = await fetch(SAMPLE_LOGO_B64);
        const blob = await response.blob();
        const file = new File([blob], "sample_logo.svg", { type: "image/svg+xml" });
        logoFileRef.current = file;
      } catch (e) {
        console.error("Failed to fetch sample logo:", e);
      }
    };
    initializeSampleLogo();
  }, []);
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.type)) {
        setError(t('errorUnsupportedFileType'));
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setError(t('errorFileSizeExceeds'));
        return;
      }
      logoFileRef.current = file;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setDesign(d => ({ ...d, logo: event.target!.result as string }));
          setError(null);
        } else {
          setError(t('errorCouldNotReadFile'));
        }
      };
      reader.onerror = () => {
        setError(t('errorCouldNotReadFile'));
      }
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!logoFileRef.current) {
      setError(t('errorNoLogo'));
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const imageB64 = await generateMockupFromApi(logoFileRef.current, design);
      setGeneratedImage(imageB64);
      setIsPreviewExpanded(true);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const onDownloadLogoPng = () => {
    if (!design.logo) {
      setError(t('errorNoLogoToDownload'));
      return;
    }
    downloadFile(design.logo, 'logo.png');
  };

  const onDownloadTextSvg = async () => {
    if (!design.text.trim()) {
      setError(t('errorNoTextForSvg'));
      return;
    }
    if (!design.logo) { // Needed for layout
      setError(t('errorNoLogoForLayout'));
      return;
    }
    try {
      const svgString = await generateTextOnlySvg(design);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      downloadFile(url, 'text_design.svg');
      URL.revokeObjectURL(url);
    } catch(e: any) {
      setError(e.message);
    }
  };

  const onDownloadTextPng = async () => {
    if (!design.text.trim()) {
      setError(t('errorNoTextForSvg'));
      return;
    }
    if (!design.logo) {
      setError(t('errorNoLogoForLayout'));
      return;
    }
    try {
      const pngDataUrl = await generateTextOnlyPng(design);
      downloadFile(pngDataUrl, 'text_design.png');
    } catch(e: any) {
      setError(e.message);
    }
  };
  
  const onDownloadCombinedSvg = async () => {
     if (!design.logo) {
      setError(t('errorNoLogo'));
      return;
    }
    try {
      const svgString = await generateCombinedSvg(design);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      downloadFile(url, 'combined_design.svg');
      URL.revokeObjectURL(url);
    } catch(e: any) {
      setError(e.message);
    }
  };

  const onDownloadCombinedPng = async () => {
    if (!design.logo) {
      setError(t('errorNoLogo'));
      return;
    }
    try {
      const pngDataUrl = await generateCombinedPng(design);
      downloadFile(pngDataUrl, 'combined_design.png');
    } catch(e: any) {
      setError(e.message);
    }
  };

  const onDownloadEngravingSvg = async () => {
    if (!design.logo) {
      setError(t('errorNoLogo'));
      return;
    }
    try {
      const svgString = await generateEngravingSvg(design);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      downloadFile(url, 'engraving_design.svg');
      URL.revokeObjectURL(url);
    } catch(e: any) {
      setError(e.message);
    }
  };
  
  const onDownloadMockupPng = () => {
    if (!generatedImage) {
      setError(t('errorNoMockupToDownload'));
      return;
    }
    downloadFile(`data:image/png;base64,${generatedImage}`, 'mockup.png');
  };

  const onDownloadMockupJpg = () => {
    if (!generatedImage) {
      setError(t('errorNoMockupToDownload'));
      return;
    }
    const imageUrl = `data:image/jpeg;base64,${generatedImage}`;
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white'; // JPG doesn't support transparency, so fill background
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const jpgUrl = canvas.toDataURL('image/jpeg', 0.9);
        downloadFile(jpgUrl, 'mockup.jpg');
      }
    };
  };

  const onExitPreview = () => setIsPreviewExpanded(false);

  return (
    <div className={`min-h-screen bg-gray-900 text-white font-sans transition-all duration-500 ${isPreviewExpanded ? 'overflow-hidden' : ''}`}>
      <header className="p-4 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <WandIcon className="w-8 h-8 text-indigo-400" />
            <div>
              <h1 className="text-xl font-bold">{t('headerTitle')}</h1>
              <p className="text-xs text-gray-400">{t('headerSubtitle')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button onClick={handleUndo} disabled={!canUndo} title={t('undo')} aria-label={t('undo')} className="p-2 rounded-md bg-gray-700/50 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <UndoIcon className="w-5 h-5" />
              </button>
              <button onClick={handleRedo} disabled={!canRedo} title={t('redo')} aria-label={t('redo')} className="p-2 rounded-md bg-gray-700/50 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <RedoIcon className="w-5 h-5" />
              </button>
              <button onClick={handleReset} title={t('reset')} aria-label={t('reset')} className="p-2 rounded-md bg-gray-700/50 hover:bg-gray-700 transition-colors">
                  <ResetIcon className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors px-3 py-1 rounded-md bg-indigo-500/10 hover:bg-indigo-500/20"
            >
              {t('languageToggleButton')}
            </button>
          </div>

        </div>
      </header>

      <main className={`container mx-auto p-4 lg:p-8 transition-transform duration-500 ${isPreviewExpanded ? 'transform -translate-y-full' : 'transform translate-y-0'}`}>
        <div className="flex flex-col lg:flex-row gap-8">
          <ControlsPanel 
            design={design} 
            setDesign={setDesign}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            handleLogoChange={handleLogoChange}
            imageMode={imageMode}
            setImageMode={setImageMode}
          />
          <PreviewDisplay 
            generatedImage={generatedImage} 
            isLoading={isLoading} 
            error={error}
            productType={design.productType}
            onDownloadCombinedSvg={onDownloadCombinedSvg}
            onDownloadCombinedPng={onDownloadCombinedPng}
            onDownloadEngravingSvg={onDownloadEngravingSvg}
            onDownloadMockupPng={onDownloadMockupPng}
            onDownloadMockupJpg={onDownloadMockupJpg}
            imageMode={imageMode}
            isPreviewExpanded={false}
            onExitPreview={() => {}}
          />
        </div>
      </main>

      <div className={`fixed inset-0 z-30 bg-black/80 backdrop-blur-lg transition-opacity duration-500 ${isPreviewExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="container mx-auto h-full p-4 lg:p-8 flex items-center justify-center">
             <PreviewDisplay 
              generatedImage={generatedImage} 
              isLoading={isLoading} 
              error={error}
              productType={design.productType}
              onDownloadCombinedSvg={onDownloadCombinedSvg}
              onDownloadCombinedPng={onDownloadCombinedPng}
              onDownloadEngravingSvg={onDownloadEngravingSvg}
              onDownloadMockupPng={onDownloadMockupPng}
              onDownloadMockupJpg={onDownloadMockupJpg}
              imageMode={'fit'}
              isPreviewExpanded={isPreviewExpanded}
              onExitPreview={onExitPreview}
            />
          </div>
        </div>
    </div>
  );
};

// FIX: Reconstructed the App component and added a default export to resolve the module resolution error.
const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;