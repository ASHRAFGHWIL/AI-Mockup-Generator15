import type { DesignOptions, TextStyle } from '../types';
import { TSHIRT_FONTS } from '../constants';

/**
 * Loads an image from a data URL and returns its dimensions.
 * @param logoDataUrl The data URL of the logo image.
 * @returns A promise that resolves with the image's width and height.
 */
const getLogoDimensions = (logoDataUrl: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = (err) => reject(new Error('Failed to load logo image to determine dimensions.'));
        img.src = logoDataUrl;
    });
};

/**
 * Generates SVG filter and attribute strings based on the selected text style.
 */
const getTextStyleSvg = (style: TextStyle, textColor: string, id: string): string => {
    switch (style) {
        case 'outline': return `stroke="black" stroke-width="2" fill="${textColor}"`;
        case 'shadow': return `fill="${textColor}" filter="url(#shadow-${id})"`;
        case 'glow': return `fill="white" filter="url(#glow-${id})"`;
        case 'neon': return `fill="${textColor}" filter="url(#neon-${id})"`;
        case '3d': return `fill="${textColor}" filter="url(#three-d-${id})"`;
        case 'metallic': return `fill="url(#metallic-${id})"`;
        case 'chrome': return `fill="url(#chrome-${id})" stroke="#4B5563" stroke-width="0.5"`;
        case 'gradient': return `fill="url(#gradient-${id})"`;
        case 'varsity': return `stroke="black" stroke-width="4" stroke-linejoin="round" fill="${textColor}"`;
        default: return `fill="${textColor}"`;
    }
};

/**
 * Generates SVG <defs> for filters and gradients based on the selected text style.
 */
const getTextStyleDefs = (style: TextStyle, textColor: string, gradientStart: string, gradientEnd: string, id: string): string => {
    switch (style) {
        case 'shadow': return `
        <filter id="shadow-${id}" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="3" stdDeviation="3" flood-color="rgba(0,0,0,0.5)" />
        </filter>`;
        case 'glow': return `
        <filter id="glow-${id}" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>`;
        case 'neon': return `
        <filter id="neon-${id}" x="-50%" y="-50%" width="200%" height="200%">
            <feFlood result="flood" flood-color="${textColor}" flood-opacity="0.7"/>
            <feComposite in="flood" in2="SourceGraphic" operator="in" result="color-out"/>
            <feGaussianBlur in="color-out" stdDeviation="4" result="blur-out"/>
            <feMerge>
                <feMergeNode in="blur-out" />
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>`;
        case '3d': return `
        <filter id="three-d-${id}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="3" stdDeviation="0" flood-color="#4B5563" />
        </filter>`;
        case 'metallic': return `
        <linearGradient id="metallic-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#E5E7EB" />
            <stop offset="50%" stop-color="#9CA3AF" />
            <stop offset="100%" stop-color="#E5E7EB" />
        </linearGradient>`;
        case 'chrome': return `
        <linearGradient id="chrome-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#6B7280" /><stop offset="30%" stop-color="#D1D5DB" />
            <stop offset="50%" stop-color="#F9FAFB" /><stop offset="70%" stop-color="#D1D5DB" />
            <stop offset="100%" stop-color="#6B7280" />
        </linearGradient>`;
        case 'gradient': return `
        <linearGradient id="gradient-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${gradientStart}" />
            <stop offset="100%" stop-color="${gradientEnd}" />
        </linearGradient>`;
        default: return '';
    }
}

const escapeXml = (unsafe: string): string => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
};

/**
 * Fetches a font from Google Fonts, and encodes it as a base64 data URI.
 * @param fontUrl The URL to the Google Fonts CSS.
 * @returns A promise that resolves with the data URI and format of the font.
 */
const fetchAndEncodeFont = async (fontUrl: string): Promise<{ dataUri: string; format: string }> => {
    try {
        const cssResponse = await fetch(fontUrl, {
            headers: {
                // A modern browser user agent helps get the woff2 format.
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        if (!cssResponse.ok) throw new Error(`Failed to fetch font CSS: ${cssResponse.statusText}`);
        const cssText = await cssResponse.text();
        
        // Extract the font file URL (woff2) from the CSS
        const fontFileUrlMatch = cssText.match(/url\((https:\/\/[^)]+\.woff2)\)/);
        if (!fontFileUrlMatch?.[1]) {
            console.warn("Could not find woff2 URL in Google Fonts CSS. PNG export might have font issues.");
            return { dataUri: '', format: '' };
        }
        const fontFileUrl = fontFileUrlMatch[1];
        
        // Fetch the font file itself
        const fontFileResponse = await fetch(fontFileUrl);
        if (!fontFileResponse.ok) throw new Error(`Failed to fetch font file: ${fontFileResponse.statusText}`);
        const fontBlob = await fontFileResponse.blob();
        
        // Convert the font Blob to a base64 data URI
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve({ dataUri: reader.result as string, format: 'woff2' });
            reader.onerror = reject;
            reader.readAsDataURL(fontBlob);
        });
    } catch (error) {
        console.error("Error fetching and encoding font:", error);
        return { dataUri: '', format: '' }; // Return empty to avoid breaking the SVG generation
    }
};

/**
 * A helper to generate text path elements for different design styles.
 */
const getTextElements = (design: DesignOptions, scaledLogo: { width: number, height: number }, center: { x: number, y: number }): string => {
    const { text, font, style, textStyle, textColor } = design;
    const fontName = TSHIRT_FONTS.find(f => f.id === font)?.name || 'Impact';
    const textId = "text-element";
    const textStyleAttributes = getTextStyleSvg(textStyle, textColor, textId);
    const commonTextProps = `${textStyleAttributes} font-family="'${fontName}', sans-serif" font-size="50px"`;

    switch (style) {
        case 'classic':
        case 'lower_half_circle': {
            const radius = scaledLogo.width / 2 + 30;
            const pathId = 'text-path-lower';
            const pathD = `M ${center.x - radius},${center.y + scaledLogo.height / 2 + 20} A ${radius},${radius} 0 0 1 ${center.x + radius},${center.y + scaledLogo.height / 2 + 20}`;
            return `<defs><path id="${pathId}" d="${pathD}" fill="none"/></defs><text><textPath href="#${pathId}" startOffset="50%" text-anchor="middle" ${commonTextProps}>${escapeXml(text)}</textPath></text>`;
        }
        case 'upper_half_circle': {
            const radius = scaledLogo.width / 2 + 30;
            const pathId = 'text-path-upper';
            const pathD = `M ${center.x + radius},${center.y - scaledLogo.height / 2 - 20} A ${radius},${radius} 0 0 0 ${center.x - radius},${center.y - scaledLogo.height / 2 - 20}`;
            return `<defs><path id="${pathId}" d="${pathD}" fill="none"/></defs><text><textPath href="#${pathId}" startOffset="50%" text-anchor="middle" ${commonTextProps}>${escapeXml(text)}</textPath></text>`;
        }
        case 'upper_oval': {
            const rx = scaledLogo.width / 2 + 80;
            const ry = 60;
            const pathId = 'text-path-upper-oval';
            const pathD = `M ${center.x + rx},${center.y - scaledLogo.height / 2 - 20} A ${rx},${ry} 0 0 0 ${center.x - rx},${center.y - scaledLogo.height / 2 - 20}`;
            return `<defs><path id="${pathId}" d="${pathD}" fill="none"/></defs><text><textPath href="#${pathId}" startOffset="50%" text-anchor="middle" ${commonTextProps}>${escapeXml(text)}</textPath></text>`;
        }
        case 'lower_oval': {
            const rx = scaledLogo.width / 2 + 80;
            const ry = 60;
            const pathId = 'text-path-lower-oval';
            const pathD = `M ${center.x - rx},${center.y + scaledLogo.height / 2 + 20} A ${rx},${ry} 0 0 1 ${center.x + rx},${center.y + scaledLogo.height / 2 + 20}`;
            return `<defs><path id="${pathId}" d="${pathD}" fill="none"/></defs><text><textPath href="#${pathId}" startOffset="50%" text-anchor="middle" ${commonTextProps}>${escapeXml(text)}</textPath></text>`;
        }
        case 'full_circle': {
            const words = text.split(/\s+/);
            const midPoint = Math.ceil(words.length / 2);
            const topText = words.slice(0, midPoint).join(' ');
            const bottomText = words.slice(midPoint).join(' ');
            const radius = Math.max(scaledLogo.width, scaledLogo.height) / 2 + 50;
            const pathTopId = 'text-path-top';
            const pathTopD = `M ${center.x + radius},${center.y} A ${radius},${radius} 0 0 0 ${center.x - radius},${center.y}`;
            const pathBottomId = 'text-path-bottom';
            const pathBottomD = `M ${center.x - radius},${center.y} A ${radius},${radius} 0 0 1 ${center.x + radius},${center.y}`;
            return `<defs><path id="${pathTopId}" d="${pathTopD}"/><path id="${pathBottomId}" d="${pathBottomD}"/></defs>
                <text><textPath href="#${pathTopId}" startOffset="50%" text-anchor="middle" ${commonTextProps}>${escapeXml(topText)}</textPath></text>
                <text><textPath href="#${pathBottomId}" startOffset="50%" text-anchor="middle" ${commonTextProps}>${escapeXml(bottomText)}</textPath></text>`;
        }
        case 'split': {
            const words = text.split(/\s+/);
            const midPoint = Math.ceil(words.length / 2);
            const leftText = words.slice(0, midPoint).join(' ');
            const rightText = words.slice(midPoint).join(' ');
            return `<text x="${center.x - scaledLogo.width/2 - 20}" y="${center.y}" text-anchor="end" dominant-baseline="middle" ${commonTextProps}>${escapeXml(leftText)}</text>
                <text x="${center.x + scaledLogo.width/2 + 20}" y="${center.y}" text-anchor="start" dominant-baseline="middle" ${commonTextProps}>${escapeXml(rightText)}</text>`;
        }
        case 'stacked_text': {
            const words = text.split(/\s+/);
            return words.map((word, i) =>
                `<text x="${center.x}" y="${center.y + scaledLogo.height/2 + 30 + (i * 60)}" text-anchor="middle" ${commonTextProps}>${escapeXml(word)}</text>`
            ).join('');
        }
        default:
            return `<text x="${center.x}" y="${center.y + scaledLogo.height/2 + 60}" text-anchor="middle" ${commonTextProps}>${escapeXml(text)}</text>`;
    }
};

/**
 * Generates an SVG string containing only the text part of the design,
 * laid out as it would be with the logo.
 * @param design The current design options.
 * @param embedFont Whether to embed the font as a data URI for PNG conversion.
 * @returns A promise that resolves with the SVG string.
 */
export const generateTextOnlySvg = async (design: DesignOptions, embedFont: boolean = false): Promise<string> => {
    const { logo, text, textColor, font, textStyle, gradientStartColor, gradientEndColor } = design;

    if (!logo) throw new Error("Logo is required for layout.");
    if (!text.trim()) return '<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"></svg>';

    const logoDims = await getLogoDimensions(logo);
    const VIEWBOX_SIZE = 1000;
    const center = { x: VIEWBOX_SIZE / 2, y: VIEWBOX_SIZE / 2 };
    
    const maxLogoDim = 400;
    const ratio = Math.min(maxLogoDim / logoDims.width, maxLogoDim / logoDims.height, 1);
    const scaledLogo = { width: logoDims.width * ratio, height: logoDims.height * ratio };

    const fontName = TSHIRT_FONTS.find(f => f.id === font)?.name || 'Impact';
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;700&display=swap`;

    let fontStyleDef: string;
    if (embedFont) { // For PNG generation
        const fontData = await fetchAndEncodeFont(fontUrl); // Use original URL for fetch
        if (fontData.dataUri) {
            fontStyleDef = `
            <style>
                @font-face {
                    font-family: '${fontName}';
                    src: url(${fontData.dataUri}) format('${fontData.format}');
                }
            </style>`;
        } else {
            // Fallback in case font fetch fails for PNG, still escape for safety
            fontStyleDef = `<style>@import url('${fontUrl.replace(/&/g, '&amp;')}');</style>`;
        }
    } else { // For direct SVG file download
        // The ampersand in the URL must be escaped for the SVG to be valid XML.
        fontStyleDef = `<style>@import url('${fontUrl.replace(/&/g, '&amp;')}');</style>`;
    }
    
    const textId = "text-element";
    const textStyleDefs = getTextStyleDefs(textStyle, textColor, gradientStartColor, gradientEndColor, textId);
    const textElements = getTextElements(design, scaledLogo, center);

    return `
<svg width="${VIEWBOX_SIZE}" height="${VIEWBOX_SIZE}" viewBox="0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${fontStyleDef}
    ${textStyleDefs}
  </defs>
  ${textElements}
</svg>`;
};

/**
 * Generates a complete SVG string containing both the logo and the text part of the design.
 * @param design The current design options.
 * @returns A promise that resolves with the complete design SVG string.
 */
export const generateCombinedSvg = async (design: DesignOptions): Promise<string> => {
    const { logo, text, textColor, font, textStyle, gradientStartColor, gradientEndColor } = design;

    if (!logo) throw new Error("Logo is required to generate the design SVG.");

    const logoDims = await getLogoDimensions(logo);
    const VIEWBOX_SIZE = 1000;
    const center = { x: VIEWBOX_SIZE / 2, y: VIEWBOX_SIZE / 2 };

    const maxLogoDim = 400;
    const ratio = Math.min(maxLogoDim / logoDims.width, maxLogoDim / logoDims.height, 1);
    const scaledLogo = { width: logoDims.width * ratio, height: logoDims.height * ratio };

    const logoX = center.x - scaledLogo.width / 2;
    const logoY = center.y - scaledLogo.height / 2;

    const fontName = TSHIRT_FONTS.find(f => f.id === font)?.name || 'Impact';
    // The ampersand in the URL must be escaped for the SVG to be valid XML.
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;700&display=swap`.replace(/&/g, '&amp;');
    const fontStyleDef = `<style>@import url('${fontUrl}');</style>`;
    
    const textId = "design-element";
    const textStyleDefs = getTextStyleDefs(textStyle, textColor, gradientStartColor, gradientEndColor, textId);
    const textElements = text.trim() ? getTextElements(design, scaledLogo, center) : '';

    return `
<svg width="${VIEWBOX_SIZE}" height="${VIEWBOX_SIZE}" viewBox="0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    ${fontStyleDef}
    ${textStyleDefs}
  </defs>
  <image 
    href="${logo}" 
    x="${logoX}" y="${logoY}" 
    width="${scaledLogo.width}" height="${scaledLogo.height}" 
    preserveAspectRatio="xMidYMid meet"
  />
  ${textElements}
</svg>`;
};

/**
 * Generates a PNG data URL of the text design by rendering the SVG to a canvas.
 * @param design The current design options.
 * @returns A promise that resolves with the PNG data URL.
 */
export const generateTextOnlyPng = async (design: DesignOptions): Promise<string> => {
    // Pass `true` to embed the font as a data URI, which is necessary for canvas rendering.
    const svgString = await generateTextOnlySvg(design, true);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const scale = 2; // for higher resolution
            canvas.width = 1000 * scale;
            canvas.height = 1000 * scale;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                URL.revokeObjectURL(url);
                resolve(canvas.toDataURL('image/png'));
            } else {
                URL.revokeObjectURL(url);
                reject(new Error('Could not get canvas context for PNG generation.'));
            }
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to load SVG image for PNG conversion. It may contain unsupported features.'));
        }
        img.src = url;
    });
};

/**
 * Generates an SVG string for laser engraving, combining a monochrome version
 * of the logo and text.
 * @param design The current design options.
 * @returns A promise that resolves with the SVG string for engraving.
 */
export const generateEngravingSvg = async (design: DesignOptions): Promise<string> => {
    const { logo } = design;
    if (!logo) throw new Error("Logo is required for layout.");
    
    const logoDims = await getLogoDimensions(logo);
    const VIEWBOX_SIZE = 1000;
    const center = { x: VIEWBOX_SIZE / 2, y: VIEWBOX_SIZE / 2 };
    
    const maxLogoDim = 400;
    const ratio = Math.min(maxLogoDim / logoDims.width, maxLogoDim / logoDims.height, 1);
    const scaledLogo = { width: logoDims.width * ratio, height: logoDims.height * ratio };
    
    // Generate SVG for text without embedding the font, as it's for an SVG file.
    const textSvg = await generateTextOnlySvg({ ...design, textColor: '#000000', textStyle: 'none' }, false);
    const textSvgContent = textSvg.substring(textSvg.indexOf('<defs>')).replace('</svg>', '');

    const logoX = center.x - scaledLogo.width / 2;
    const logoY = center.y - scaledLogo.height / 2;
    
    return `
<svg width="${VIEWBOX_SIZE}" height="${VIEWBOX_SIZE}" viewBox="0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <filter id="monochrome">
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </defs>
  ${textSvgContent}
  <image 
    href="${logo}" 
    x="${logoX}" y="${logoY}" 
    width="${scaledLogo.width}" height="${scaledLogo.height}" 
    preserveAspectRatio="xMidYMid meet"
    filter="url(#monochrome)" 
  />
</svg>`;
};

// This function is imported but not used in App.tsx. Adding a stub implementation to prevent potential future issues.
export const generateDesignPng = async (design: DesignOptions): Promise<string> => {
    console.warn("generateDesignPng is not fully implemented.");
    return "";
};