// FIX: Import `GenerateImagesResponse` to correctly type the response from the image generation API.
// FIX: Removed HarmCategory and HarmBlockThreshold as safetySettings are not supported on these API calls.
import { GoogleGenAI, GenerateContentResponse, GenerateImagesResponse, Part, Modality } from "@google/genai";
import type { DesignOptions, DesignStyle, ModelPose, ModelAudience, TshirtFont, BagMaterial, TextStyle, FrameStyle, FrameModel, MugStyle, MugModel, SipperGlassStyle, SipperGlassModel, TumblerStyle, TumblerModel, HalloweenTumblerStyle, HalloweenTumblerSetting, TumblerTrioStyle, TumblerTrioSetting, PhoneCaseStyle, PhoneCaseModel, StickerStyle, StickerSetting, PosterStyle, PosterSetting, WalletStyle, WalletModel, CapStyle, CapModel, BeanieStyle, BeanieModel, PillowStyle, PillowSetting, FlatLayStyle, PuzzleStyle, PuzzleSetting, LaptopSleeveStyle, LaptopSleeveSetting, BackgroundStyle, AspectRatio, ProductType, ProfessionalBackground } from "../types";
import { MODEL_AUDIENCES, FRAME_MODELS, MUG_MODELS, SIPPER_GLASS_MODELS, TUMBLER_MODELS, HALLOWEEN_TUMBLER_SETTINGS, TUMBLER_TRIO_SETTINGS, PHONE_CASE_MODELS, STICKER_SETTINGS, POSTER_SETTINGS, WALLET_MODELS, CAP_MODELS, BEANIE_MODELS, PILLOW_SETTINGS, FLAT_LAY_STYLES, PUZZLE_SETTINGS, LAPTOP_SLEEVE_SETTINGS, PRODUCT_COLORS, TSHIRT_FONTS, PROFESSIONAL_BACKGROUNDS } from "../constants";

// IMPORTANT: This key is read from environment variables and should not be hardcoded.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const qualityPrompt = "8K, ultra-high resolution, photorealistic, DSLR photo with a 50mm f/1.8 lens, sharp focus, professional commercial photography, cinematic lighting, soft shadows, beautiful bokeh, high dynamic range.";

const criticalRealismInstructions = `
- **CRITICAL REALISM INSTRUCTIONS:**
- The design must be perfectly integrated onto the product's surface, looking like a high-end, realistic print or embroidery, not a flat sticker.
- **Logo Fidelity & Resolution (ABSOLUTE PRIORITY):** The provided logo image is a source of truth and must be rendered with the highest possible fidelity, as if it were a flawless print from a vector source at 300 DPI or higher. Every detail, line, and curve must be reproduced with extreme precision and maximum sharpness. There must be **ZERO** pixelation, compression artifacts, blurriness, or loss of detail. The final applied design must look like a professional, ultra-high-resolution print on the product, not a low-quality digital overlay.
- **Color Accuracy (CRITICAL):** The colors of the logo must be reproduced with perfect accuracy and vibrancy, exactly as they appear in the source image. Do **NOT** alter the hue, saturation, or brightness of the source colors. The final colors should only be subtly and realistically affected by the scene's ambient lighting and shadows, but the core colors must remain true, rich, and vivid. Avoid any color banding or posterization.
- **Texture Mapping:** The underlying fabric or material texture (e.g., cotton weave, fleece, leather grain) must be subtly visible through the design, especially in lighter areas of the print.
- **Warping & Draping:** The design must precisely follow all contours, folds, wrinkles, and seams of the product. The perspective of the design must match the product's angle perfectly.
- **Lighting & Shadows:** The lighting of the design (highlights, mid-tones, shadows) must perfectly match the lighting of the product in the photo. Shadows cast by wrinkles in the fabric must realistically fall across the design. The design's colors should be slightly affected by the ambient light color.
`;


/**
 * A wrapper for API calls that implements retry logic with exponential backoff
 * for rate limit errors (429).
 * @param apiCall The function that makes the API call.
 * @param maxRetries The maximum number of retries.
 * @returns The result of the API call.
 */
const withRetry = async <T>(apiCall: () => Promise<T>, maxRetries = 5): Promise<T> => {
  let attempt = 0;
  let delay = 10000; // Increased initial delay to 10 seconds to handle stricter rate limits

  while (attempt < maxRetries) {
    try {
      return await apiCall();
    } catch (error: any) {
      // More robustly check for rate limit error indicators
      const isRateLimitError = (err: any): boolean => {
        if (!err) return false;
        const message = (err.message || err.toString()).toLowerCase();
        // Check for common rate limit indicators from Google AI platform
        return message.includes('429') || 
               message.includes('resource_exhausted') || 
               message.includes('rate limit') ||
               message.includes('quota');
      };

      if (isRateLimitError(error)) {
        attempt++;
        if (attempt >= maxRetries) {
          console.error(`API call failed after ${maxRetries} retries due to rate limiting.`, error);
          throw new Error('The service is currently busy. Please wait a moment and try again.');
        }
        
        const jitter = Math.random() * 1000; // Add up to 1 second of jitter
        const waitTime = delay + jitter;

        console.warn(`Rate limit hit. Retrying attempt ${attempt}/${maxRetries} in ${waitTime.toFixed(0)}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        delay *= 2; // Exponential backoff: 10s, 20s, 40s, ...
      } else {
        // Not a retryable error, rethrow it immediately
        throw error;
      }
    }
  }
  // This line is for TypeScript's benefit and should not be reached.
  throw new Error('Exited retry loop unexpectedly.');
};


/**
 * Gets the color name from a hex value for more descriptive AI prompts.
 * @param hex The hex color string.
 * @returns The color name or the original hex if not found.
 */
const getColorName = (hex: string): string => {
    const color = PRODUCT_COLORS.find(c => c.value.toLowerCase() === hex.toLowerCase());
    return color ? color.name : hex;
};


/**
 * Calculates whether black or white text will have a better contrast against a given hex color.
 * @param hex The hex color of the background.
 * @returns 'white' or 'black'.
 */
const getContrastColor = (hex: string): 'white' | 'black' => {
  // Remove '#' if present
  let cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  // Handle 3-digit hex shorthand
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }
  
  if (cleanHex.length !== 6) {
      // Default to white for invalid hex codes
      return 'white'; 
  }

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Calculate perceived brightness using the standard formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // If brightness is high (> 128), use black text. Otherwise, use white.
  return brightness > 128 ? 'black' : 'white';
};


/**
 * Converts a File object to a Generative AI Part, handling errors.
 * @param file The file to convert.
 * @returns A promise that resolves with the Part object.
 */
const fileToGenerativePart = (file: File): Promise<Part> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error('FileReader did not return a string.'));
      }

      // The result includes the data URL prefix (e.g., "data:image/png;base64,"), remove it.
      const base64Data = reader.result.split(',')[1];

      if (!base64Data) {
        return reject(new Error('Could not extract base64 data from file. The file may be corrupt or in an unsupported format.'));
      }

      resolve({
        inlineData: {
          data: base64Data,
          // Provide a fallback MIME type just in case file.type is empty
          mimeType: file.type || 'application/octet-stream',
        },
      });
    };

    reader.onerror = () => {
      reject(new Error(`FileReader encountered an error while reading the file: ${reader.error?.message || 'Unknown error'}`));
    };

    reader.readAsDataURL(file);
  });
};

const getPoseDescription = (pose: ModelPose): string => {
    switch (pose) {
        case 'standing': return 'standing pose,';
        case 'sitting': return 'sitting on a stool,';
        case 'sitting_floor_cozy': return 'sitting cross-legged on the floor in a cozy, well-lit setting, smiling warmly towards the camera,';
        case 'sitting_hand_hip': return 'a relaxed sitting pose on a neutral surface, with one hand casually resting on the hip,';
        case 'sitting_on_counter': return 'sitting cross-legged on a clean kitchen counter in a modern, well-lit kitchen, looking relaxed and happy,';
        case 'recumbent': return 'recumbent pose (lying down gracefully on a neutral surface),';
        case 'smiling_glasses': return 'standing pose, smiling warmly, wearing stylish dark glasses,';
        case 'back': return 'standing with their back to the camera,';
        case 'drinking_tea': return 'sitting comfortably and holding a cup of tea, looking relaxed,';
        case 'jumping': return 'mid-air jumping pose, expressive and energetic,';
        case 'dancing': return 'dynamic dancing pose, capturing movement,';
        case 'meditating': return 'sitting in a calm, cross-legged meditation pose,';
        case 'heroic': return 'powerful heroic pose, like a superhero,';
        case 'action': return 'dynamic action pose, as if in motion,';
        case 'yoga': return 'serene yoga pose (e.g., tree pose),';
        case 'casual_lean': return 'casually leaning against a wall,';
        case 'walking_street': return 'dynamic walking pose on a blurred city street,';
        case 'laughing': return 'joyful laughing pose, looking natural and happy,';
        case 'arms_crossed': return 'standing with arms crossed confidently,';
        case 'thinking': return 'pensive pose, hand to chin as if in thought,';
        case 'hands_in_pockets': return 'casual standing pose with hands in pockets,';
        case 'closeup_casual': return 'a casual, close-up shot from the torso up against a clean, neutral studio background, focusing clearly on the garment,';
        case 'sultry_shoulder_look': return 'an elegant pose, looking over one shoulder at the camera with a soft, confident expression,';
        case 'gentle_touch_face': return 'a soft and gentle pose, with one hand delicately touching the cheek or jawline, looking serene,';
        case 'windswept_hair_dreamy': return 'a dreamy, romantic pose with hair appearing gently windswept, looking off-camera with a soft expression,';
        case 'lounging_on_silk': return 'lounging gracefully on a luxurious surface like silk sheets or a velvet couch, looking relaxed and elegant,';
        case 'playful_peekaboo': return 'a playful pose, peeking from behind a hand or over the edge of something, with a cute and flirtatious smile,';
        case 'cozy_sweater_hug': return 'a close-up, intimate shot of a beautiful woman with a soft expression, gently hugging herself in a cozy setting. The focus is on her serene face and the garment, which fills a large part of the frame,';
        case 'sun_kissed_glow_portrait': return 'a warm and attractive close-up portrait of a woman backlit by the golden hour sun, creating a soft, beautiful glow on her hair and skin. The garment is the central focus and takes up a large area of the image,';
        case 'playful_hair_toss_laugh': return 'a dynamic and attractive close-up shot of a woman laughing genuinely as she playfully tosses her hair. The shot captures a moment of pure joy and confidence. The focus is on the garment, which is prominently featured,';
        case 'meadow_daydream_top_down': return 'a dreamy, romantic top-down close-up of a woman lying in a meadow of soft wildflowers, looking up at the camera with a gentle, daydreaming expression. The garment is clearly visible and takes up a large portion of the frame,';
        case 'city_lights_glamour': return 'a chic and glamorous close-up shot of a woman at night, with a beautifully blurred background of city lights creating a bokeh effect. She has a confident, elegant expression. The garment is the main focus and catches the ambient light,';
        case 'delicate_flower_touch': return 'a close-up, romantic shot of a woman gently touching a delicate flower near her face, with a soft, dreamy expression,';
        case 'parisian_balcony_daydream': return 'a beautiful woman daydreaming on a Parisian balcony, leaning on the railing with a soft smile, with the Eiffel Tower heavily blurred in the background,';
        case 'cozy_cafe_window_rain': return 'a woman sitting by a cozy cafe window on a rainy day, looking out thoughtfully, with soft reflections of raindrops on the glass,';
        case 'secret_garden_reading': return 'a woman engrossed in a book while sitting in a secluded, magical-looking secret garden filled with soft-focus flowers,';
        case 'vintage_car_glamour': return 'a glamorous woman leaning against a classic vintage car, dressed elegantly, with a sophisticated, timeless look,';
        case 'sitting_floor_relaxed': return 'front view, sitting on the floor with legs slightly bent in a relaxed pose, with direct eye contact,';
        case 'sitting_cross_legged_side': return 'left side view, sitting cross-legged and looking slightly down,';
        case 'leaning_on_floor': return 'right side view, leaning with one arm on the floor and looking at the camera,';
        case 'standing_three_quarter_hands_pockets': return 'front three-quarter view, standing straight with hands in pockets,';
        case 'standing_rear_three_quarter': return 'rear three-quarter view, standing with head slightly tilted toward the camera,';
        case 'sitting_top_down': return 'top-down angle, sitting cross-legged and looking up at the camera,';
        case 'low_angle_arms_crossed': return 'low angle, confident pose with arms crossed,';
        case 'closeup_chest_design': return 'a close-up shot focused on the upper torso to showcase the garment\'s central design area, with no face visible,';
        case 'full_body_slouched': return 'full-body shot with a slouched stance and one leg bent, against a simple studio background,';
        case 'sitting_on_chair_dynamic': return 'dynamic sitting position on a chair, slightly leaning forward with a natural appearance,';
        // flat_lay_simple is handled directly in generateBaseImage and doesn't use this function.
        case 'flat_lay_simple': return ''; 
        default: return 'standing pose,';
    }
}

const getAudienceDescription = (audience: ModelAudience): string => {
    const audienceData = MODEL_AUDIENCES.find(a => a.id === audience);
    return audienceData ? audienceData.description : 'a woman with a casual style';
}

const getBackgroundDescription = (style: BackgroundStyle): string => {
    switch (style) {
        case 'urban_street': return 'The background is a stylish, heavily blurred urban or cafe setting with strong bokeh.';
        case 'natural_landscape': return 'The background is a beautiful, heavily blurred natural landscape (like a forest or beach) with strong bokeh.';
        case 'dreamy_bokeh_lights': return 'The background is a romantic scene of heavily blurred, warm, golden bokeh fairy lights, creating a magical and dreamy atmosphere.';
        case 'luxury_silk_drape': return 'The background is composed of luxurious, soft silk or satin fabric, artfully draped with gentle folds and heavily blurred with strong bokeh.';
        case 'rose_petal_bed': return 'The background is a soft, romantic surface covered in scattered, out-of-focus rose petals, creating a delicate and alluring setting with strong bokeh.';
        case 'sunset_beach_glow': return 'The background is a warm, golden hour sunset on a beautiful beach, heavily blurred to create a soft, romantic glow and beautiful bokeh from the glistening water.';
        case 'elegant_boudoir': return 'The background is a tasteful and elegant bedroom or dressing room setting, featuring soft lighting and luxurious textures, all heavily blurred with strong bokeh.';
        case 'plush_velvet_couch': return 'The background is a luxurious, plush velvet couch in a soft color, with gentle, artistic folds in the fabric, all heavily blurred with a strong bokeh effect.';
        case 'cherry_blossom_dreamscape': return 'The background is a dreamy, romantic scene of soft-focus, pink cherry blossom branches, creating a beautiful and delicate atmosphere, all heavily blurred with a strong bokeh effect.';
        case 'satin_sheets_boudoir': return 'The background is an alluring and elegant bedroom setting, featuring luxurious, rumpled satin sheets that catch the light beautifully, all heavily blurred with a strong and soft bokeh effect.';
        case 'golden_hour_meadow': return 'The background is a warm, romantic meadow during the golden hour sunset, with tall grass and wildflowers catching the light, all heavily blurred to create a soft, glowing bokeh effect.';
        case 'sparkling_champagne_bokeh': return 'The background is a glamorous and celebratory scene of sparkling, golden bokeh lights that look like champagne bubbles, creating a festive and chic atmosphere.';
        case 'ethereal_clouds_sky': return 'The background is a dreamy, ethereal sky filled with soft, pastel-colored clouds at sunrise or sunset, heavily blurred with strong bokeh.';
        case 'enchanted_forest_light': return 'The background is a magical, enchanted forest with rays of soft light filtering down through the trees, heavily blurred with strong bokeh.';
        case 'glittering_water_surface': return 'The background is the surface of glittering water, sparkling under the sun to create a beautiful, natural bokeh effect.';
        case 'opulent_ballroom': return 'The background is a grand, opulent ballroom with elegant chandeliers and classical architecture, all heavily blurred with strong bokeh.';
        case 'vintage_bookstore': return 'The background is a cozy, warm vintage bookstore with shelves of old books creating a rich, textured bokeh effect.';
        case 'woodland_camo': return 'The background is a heavily blurred, photorealistic woodland camouflage pattern.';
        case 'desert_camo': return 'The background is a heavily blurred, photorealistic desert camouflage pattern.';
        case 'urban_camo': return 'The background is a heavily blurred, photorealistic urban (black/white/gray) camouflage pattern.';
        case 'digital_camo': return 'The background is a heavily blurred, photorealistic digital camouflage pattern.';
        case 'studio':
        default:
             return 'The background is a clean, modern, heavily out-of-focus studio setting.';
    }
}

const getProfessionalBackgroundDescription = (style: ProfessionalBackground): string => {
    const backgroundData = PROFESSIONAL_BACKGROUNDS.find(b => b.id === style);
    return backgroundData ? backgroundData.description : 'a clean, professional surface';
}


const getBagMaterialDescription = (material: BagMaterial): string => {
    switch (material) {
        case 'canvas': return 'durable canvas';
        case 'leather': return 'high-quality leather';
        case 'nylon': return 'sleek nylon';
        case 'denim': return 'stylish denim';
        case 'soft_pink_velvet': return 'luxurious, soft pink velvet';
        case 'blush_pink_silk': return 'elegant, shimmering blush pink silk';
        case 'white_lace_overlay': return 'delicate white lace overlaying a satin base';
        case 'rose_gold_sequins': return 'glamorous, sparkling rose gold sequins';
        case 'creamy_faux_fur': return 'plush, creamy-colored faux fur';
        default: return 'high-quality';
    }
}

const getFrameStyleDescription = (style: FrameStyle): string => {
    switch (style) {
        case 'classic_ornate': return 'a classic, ornate, and intricately carved wooden frame';
        case 'modern_minimalist': return 'a modern, minimalist wooden frame with clean lines and a smooth finish';
        case 'rustic_barnwood': return 'a rustic frame made from reclaimed barnwood, with a weathered and textured look';
        case 'modern_mahogany': return 'a modern, minimalist frame with a rich, dark red mahogany finish';
        case 'rose_gold_ornate': return 'a beautiful, ornate frame with a polished rose gold metallic finish, featuring intricate, delicate floral filigree details';
        case 'pearl_inlay_minimalist': return 'a sleek, modern frame with clean lines, beautifully accented with an iridescent mother-of-pearl inlay';
        case 'velvet_lined_shadow_box': return 'a deep shadow box frame with a soft, plush velvet interior lining in a rich, sensual color like burgundy';
        case 'lace_carved_wood': return 'a unique wooden frame, intricately carved with a delicate, lace-like pattern and finished with a soft, matte paint';
        case 'shabby_chic_distressed': return 'a romantic, shabby chic style wooden frame with a distressed, soft pastel paint finish and gently worn edges';
        default: return 'a high-quality wooden frame';
    }
}

const getFrameModelDescription = (model: FrameModel): string => {
    const modelData = FRAME_MODELS.find(m => m.id === model);
    return modelData ? modelData.description : 'a person';
}

const getMugStyleDescription = (style: MugStyle): string => {
    switch (style) {
        case 'classic_ceramic': return 'a classic, high-quality ceramic mug';
        case 'modern_glass': return 'a sleek, modern double-walled glass mug';
        case 'vintage_enamel': return 'a vintage-style enamel camping mug';
        case 'pearl_lustre_ceramic': return 'a beautiful ceramic mug with an iridescent, shimmering pearl lustre finish that catches the light';
        case 'gold_rimmed_porcelain': return 'an elegant, fine porcelain teacup-style mug with a delicate, hand-painted gold rim';
        case 'matte_pink_heart_handle': return 'a chic, modern ceramic mug with a soft matte pink finish and a unique, cute heart-shaped handle';
        case 'scalloped_edge_teacup': return 'a delicate, vintage-inspired porcelain teacup with a beautiful scalloped or fluted rim, evoking a sense of soft romance';
        case 'rose_gold_metallic': return 'a glamorous and stylish mug with a highly reflective, polished rose gold metallic finish';
        default: return 'a high-quality mug';
    }
}

const getMugModelDescription = (model: MugModel): string => {
    const modelData = MUG_MODELS.find(m => m.id === model);
    return modelData ? modelData.description : 'a person';
}

const getSipperGlassStyleDescription = (style: SipperGlassStyle): string => {
    switch (style) {
        case 'classic_can_shape': return 'a classic, can-shaped glass';
        case 'modern_tapered': return 'a sleek, modern tapered glass';
        case 'frosted_finish': return 'a glass with a stylish frosted finish';
        case 'rose_gold_rim_crystal': return 'an exquisite, high-quality crystal glass with a delicate, polished rose gold rim';
        case 'iridescent_holographic': return 'a magical-looking glass with a shimmering, iridescent holographic finish that catches the light in a rainbow of colors';
        case 'etched_lace_pattern': return 'a romantic glass with a beautifully intricate and delicate floral lace pattern etched into its surface';
        case 'frosted_pink_ombre': return 'a chic glass with a soft, frosted finish that transitions in a beautiful ombre gradient from a soft pink at the bottom to clear at the top';
        case 'stemless_pearl_finish': return 'a modern, stemless glass with a soft, elegant pearlescent or opalescent finish, giving it a subtle, milky shimmer';
        default: return 'a high-quality sipper glass';
    }
}

const getSipperGlassModelDescription = (model: SipperGlassModel): string => {
    const modelData = SIPPER_GLASS_MODELS.find(m => m.id === model);
    return modelData ? modelData.description : 'a person';
}

const getTumblerStyleDescription = (style: TumblerStyle): string => {
    switch (style) {
        case 'stainless_steel': return 'a classic, high-quality stainless steel tumbler with a lid';
        case 'matte_finish': return 'a tumbler with a modern, non-reflective matte finish';
        case 'glossy_white': return 'a glossy white tumbler, perfect for sublimation prints';
        case 'rose_gold_ombre_glitter': return 'a glamorous tumbler with a cascading rose gold ombre glitter finish';
        case 'pearlized_marble': return 'an elegant tumbler with a soft, swirling white and grey marble pattern and an iridescent, pearlized finish';
        case 'satin_finish_blush_pink': return 'a chic tumbler with a smooth, non-glossy satin finish in a delicate blush pink color';
        case 'lace_etched_crystal': return 'a romantic, high-quality crystal-clear tumbler with a delicate floral lace pattern intricately etched into its surface';
        case 'holographic_chrome': return 'a stylish and modern tumbler with a vibrant, highly reflective holographic chrome finish that shifts colors';
        case 'soft_touch_lilac': return 'a modern, minimalist tumbler with a smooth, soft-touch silicone-like finish in a gentle lilac color';
        case 'brushed_rose_gold': return 'a sophisticated tumbler with a finely brushed rose gold metallic finish, giving it a subtle, elegant texture and sheen';
        case 'watercolor_peony': return 'a beautiful tumbler featuring a soft, artistic watercolor design of blooming peony flowers in shades of pink and white';
        case 'champagne_gold_glitter': return 'a glamorous tumbler coated in a fine, sparkling champagne gold glitter, creating a chic and celebratory look';
        case 'minimalist_ceramic_matte': return 'a high-end, minimalist tumbler with a smooth, non-reflective ceramic matte finish, reminiscent of artisanal pottery';
        case 'geode_crystal_rose_quartz': return 'a high-end tumbler with a beautiful rose quartz geode design, featuring crystalline structures and subtle gold veins';
        case 'mother_of_pearl_inlay': return 'an elegant tumbler with a smooth, seamless mother-of-pearl inlay pattern that catches the light with an iridescent sheen';
        case 'silk_wrapped_blossom': return 'a sophisticated tumbler that appears to be delicately wrapped in a soft, blush-pink silk fabric with a subtle cherry blossom print';
        case 'liquid_marble_rose_gold': return 'a modern and chic tumbler with a liquid marble effect, featuring flowing white and soft pink colors with veins of polished rose gold';
        case 'embossed_velvet': return 'a luxurious tumbler with a soft-touch, embossed velvet finish, featuring an intricate floral or damask pattern';
        case 'soft_ombre_pearl': return 'a high-end tumbler with a soft, pearlescent ombre finish, transitioning between delicate pastel colors with an elegant, shimmering effect';
        case 'engraved_botanical_matte': return 'a sophisticated tumbler with a smooth, professional matte finish, featuring a finely detailed, laser-engraved botanical or floral line-art pattern';
        case 'gilded_agate_slice': return 'a luxurious tumbler that looks like it is crafted from a polished agate slice, with natural crystalline patterns and elegant, hand-painted gilded gold edges';
        case 'silk_ribbon_wrap': return 'a chic and feminine tumbler that appears to be artfully wrapped in a wide, shimmering silk ribbon, complete with a realistic, tied bow detail';
        case 'cherry_blossom_emboss': return 'an elegant tumbler with a subtle, 3D embossed pattern of delicate cherry blossom branches and petals, creating a tactile and visually soft effect';
        case 'porcelain_rose_inlay': return 'a beautiful tumbler that resembles fine porcelain, with delicate, hand-painted rose illustrations intricately inlaid into the surface';
        case 'opalescent_glass': return 'a stunning tumbler made from opalescent glass, which catches the light with a soft, milky, rainbow-like shimmer, reminiscent of an opal gemstone';
        case 'sculpted_floral_metal': return 'a modern and artistic tumbler made from brushed metal, featuring a raised, 3D sculpted floral pattern that creates a sophisticated play of light and shadow';
        case 'pressed_wildflower_resin': return 'a beautiful tumbler with real, delicate pressed wildflowers and foliage elegantly suspended in a crystal-clear resin';
        case 'embroidered_linen_wrap': return 'a unique tumbler that appears to be wrapped in a high-quality, textured linen fabric, featuring delicate and colorful floral embroidery';
        case 'rose_quartz_crystal_point': return 'a magical-looking tumbler with a base that looks like a raw, natural rose quartz crystal point, with the body being smooth and polished';
        case 'butterfly_wing_iridescent': return 'a stunning tumbler with a delicate, iridescent finish that perfectly mimics the shimmering, intricate patterns of a butterfly\'s wing';
        case 'vintage_porcelain_tea_rose': return 'an elegant tumbler that has the appearance of fine vintage porcelain, featuring a delicate pattern of painted tea roses and subtle gold trim details';
        default: return 'a high-quality tumbler';
    }
}

const getTumblerModelDescription = (model: TumblerModel): string => {
    const modelData = TUMBLER_MODELS.find(m => m.id === model);
    return modelData ? modelData.description : 'a person';
}

const getHalloweenTumblerStyleDescription = (style: HalloweenTumblerStyle): string => {
    switch (style) {
        case 'glossy_black': return 'a high-quality tumbler with a glossy black finish';
        case 'matte_black': return 'a high-quality tumbler with a modern, non-reflective matte black finish';
        case 'stainless_steel': return 'a classic, high-quality stainless steel tumbler with a lid';
        default: return 'a high-quality tumbler';
    }
}

const getHalloweenTumblerSettingDescription = (setting: HalloweenTumblerSetting): string => {
    const settingData = HALLOWEEN_TUMBLER_SETTINGS.find(s => s.id === setting);
    return settingData ? settingData.description : 'a festive halloween scene';
}

const getTumblerTrioStyleDescription = (style: TumblerTrioStyle): string => {
    switch (style) {
        case 'glossy_white': return 'three identical high-quality tumblers with a glossy white finish, perfect for sublimation prints';
        case 'matte_white': return 'three identical high-quality tumblers with a modern, non-reflective matte white finish';
        case 'stainless_steel': return 'three identical classic, high-quality stainless steel tumblers with lids';
        default: return 'three identical high-quality tumblers';
    }
}

const getTumblerTrioSettingDescription = (setting: TumblerTrioSetting): string => {
    const settingData = TUMBLER_TRIO_SETTINGS.find(s => s.id === setting);
    return settingData ? settingData.description : 'a clean, well-lit product setting';
}

const getPhoneCaseStyleDescription = (style: PhoneCaseStyle): string => {
    switch (style) {
        case 'glossy': return 'a high-quality glossy finish';
        case 'matte': return 'a modern, non-reflective matte finish';
        case 'clear': return 'a transparent, clear';
        default: return 'a high-quality';
    }
}

const getPhoneCaseModelDescription = (model: PhoneCaseModel): string => {
    const modelData = PHONE_CASE_MODELS.find(m => m.id === model);
    return modelData ? modelData.description : 'a person holding a phone';
}

const getStickerStyleDescription = (style: StickerStyle): string => {
    switch (style) {
        case 'die_cut_glossy': return 'die-cut sticker with a glossy vinyl finish';
        case 'kiss_cut_matte': return 'kiss-cut sticker on a square backing with a matte finish';
        case 'holographic': return 'die-cut sticker with a vibrant holographic finish';
        default: return 'a high-quality sticker';
    }
}

const getStickerSettingDescription = (setting: StickerSetting): string => {
    const settingData = STICKER_SETTINGS.find(s => s.id === setting);
    return settingData ? settingData.description : 'a sticker on a surface';
}

const getPosterStyleDescription = (style: PosterStyle): string => {
    switch (style) {
        case 'glossy_finish': return 'poster with a glossy finish';
        case 'matte_finish': return 'poster with a non-reflective matte finish';
        default: return 'a high-quality poster';
    }
}

const getPosterSettingDescription = (setting: PosterSetting): string => {
    const settingData = POSTER_SETTINGS.find(s => s.id === setting);
    return settingData ? settingData.description : 'a poster on a wall';
}

const getWalletStyleDescription = (style: WalletStyle): string => {
    switch (style) {
        case 'bifold': return 'a classic bifold leather wallet';
        case 'cardholder': return 'a slim, minimalist leather cardholder wallet';
        case 'zipper': return 'a modern leather wallet with a zipper closure';
        case 'quilted_leather_chain': return 'an elegant, luxurious quilted leather wallet with a sophisticated gold chain strap';
        case 'pastel_pink_saffiano': return 'a chic Saffiano leather wallet in a soft pastel pink color, with a high-fashion, cross-hatch texture';
        case 'floral_embroidered_clutch': return 'a beautiful clutch-style wallet with delicate, intricate floral embroidery on a fabric surface';
        case 'rose_gold_metallic': return 'a glamorous and stylish wallet with a shimmering, reflective rose gold metallic finish';
        case 'plush_velvet_pearl': return 'a soft, plush velvet wallet with a romantic feel, featuring an elegant pearl clasp closure';
        case 'satin_bow_clutch': return 'an elegant, clutch-style wallet made from shimmering satin fabric, featuring a large, beautifully tied bow on the front as a closure';
        case 'lace_and_silk_wallet': return 'a romantic and stylish wallet made from luxurious silk, with an intricate and delicate black or white lace overlay';
        case 'pearl_encrusted_cardholder': return 'a chic and sophisticated cardholder, beautifully embellished with a dense scattering of small, elegant pearls';
        case 'holographic_mermaid_wallet': return 'a trendy and magical wallet with a shimmering, iridescent holographic finish that mimics mermaid scales';
        case 'plush_faux_fur_clutch': return 'a soft, glamorous, and touchable clutch-style wallet made from high-quality, plush faux fur';
        default: return 'a high-quality leather wallet';
    }
}

const getWalletModelDescription = (model: WalletModel): string => {
    const modelData = WALLET_MODELS.find(m => m.id === model);
    return modelData ? modelData.description : 'a person holding a wallet';
}

const getCapStyleDescription = (style: CapStyle): string => {
    switch (style) {
        case 'structured_baseball': return 'a classic, structured baseball cap with a curved brim';
        case 'unstructured_dad_hat': return 'a casual, unstructured "dad hat" with a soft crown';
        case 'snapback': return 'a stylish snapback cap with a flat brim';
        case 'floral_trucker': return 'a delicate, feminine trucker-style cap with a soft, photorealistic floral print on the white front panel and mesh back';
        case 'satin_luxe': return 'a luxurious and elegant baseball cap made from shimmering, high-quality satin fabric';
        case 'pastel_suede': return 'a soft and delicate dad hat made from high-quality, pastel-colored faux suede with a beautiful texture';
        case 'bow_back_canvas': return 'a chic canvas baseball cap with an elegant, oversized silk bow integrated into the back closure';
        case 'lace_overlay_trucker': return 'a feminine trucker-style cap with a delicate, intricate white lace overlay on the front panel and a soft mesh back';
        case 'pearl_embellished_denim': return 'a stylish denim dad hat, delicately embellished with an array of small, elegant white pearls scattered across the front';
        case 'velvet_baseball_cap': return 'a luxurious baseball cap made from soft, plush velvet with a rich texture and a soft sheen';
        case 'silk_scarf_tie_hat': return 'a chic canvas dad hat where the back closure is a beautiful, patterned silk scarf that is tied into an elegant bow';
        default: return 'a high-quality cap';
    }
}

const getCapModelDescription = (model: CapModel): string => {
    const modelData = CAP_MODELS.find(m => m.id === model);
    return modelData ? modelData.description : 'a person wearing a cap';
}

const getBeanieStyleDescription = (style: BeanieStyle): string => {
    switch (style) {
        case 'cuffed': return 'a classic, ribbed-knit cuffed beanie';
        case 'slouchy': return 'a relaxed, slouchy-fit beanie';
        case 'pom_pom': return 'a knit beanie with a large pom-pom on top';
        case 'angora_pearl': return 'an incredibly soft and fluffy angora knit beanie, delicately embellished with scattered small pearls';
        case 'chenille_heart_knit': return 'a plush, velvety chenille beanie featuring a subtle, romantic cable knit pattern with interlocking hearts';
        case 'slouchy_cashmere': return 'an exquisitely soft, luxurious cashmere beanie with a relaxed, stylish slouchy fit';
        case 'luxe_faux_fur_pompom': return 'a chic ribbed-knit beanie topped with an oversized, fluffy, and luxurious faux fur pom-pom';
        case 'satin_lined_slouchy': return 'a soft knit slouchy beanie with a glimpse of a smooth, elegant satin lining on the inside edge';
        case 'floral_embroidery': return 'a finely knit beanie with delicate, intricate, photorealistic floral embroidery across the front';
        case 'sequin_knit': return 'a soft knit beanie subtly interwoven with delicate, sparkling sequins for a glamorous and elegant look';
        case 'veiled_beanie': return 'a chic and mysterious soft knit beanie with a delicate, short birdcage veil attached to the front';
        case 'beret_style': return 'a soft, slightly slouchy high-quality knit beanie styled like a classic, chic French beret';
        case 'cable_knit_heart_pattern': return 'a soft, chunky cable-knit beanie featuring a subtle, romantic, all-over integrated knitted heart pattern';
        case 'ribbon_woven_beanie': return 'a classic cuffed knit beanie with a delicate, contrasting satin ribbon elegantly woven through the stitches of the cuff';
        case 'mohair_fluffy_beanie': return 'an incredibly soft and delicate, fluffy beanie made from a high-quality mohair blend, with a visible soft halo of fibers';
        case 'crystal_scatter_beanie': return 'a fine-knit, elegant beanie with small, sparkling clear crystals delicately scattered across the surface like stars';
        default: return 'a high-quality beanie';
    }
}

const getBeanieModelDescription = (model: BeanieModel): string => {
    const modelData = BEANIE_MODELS.find(m => m.id === model);
    return modelData ? modelData.description : 'a person wearing a beanie';
}

const getPillowStyleDescription = (style: PillowStyle): string => {
    switch (style) {
        case 'square_cotton': return 'a square throw pillow made of high-quality cotton';
        case 'lumbar_linen': return 'a rectangular lumbar pillow with a textured linen finish';
        case 'round_velvet': return 'a round decorative pillow made of plush velvet';
        case 'plush_faux_fur_heart': return 'a heart-shaped throw pillow made of incredibly soft and plush faux fur, with a visible, touchable texture';
        case 'satin_with_lace_trim': return 'a square pillow made from smooth, shimmering satin, elegantly bordered with a delicate and intricate lace trim';
        case 'round_velvet_with_tassel': return 'a round decorative pillow made of plush velvet, featuring a chic, silky tassel attached to one side';
        case 'silk_bolster': return 'a long, cylindrical bolster pillow made from luxurious, shimmering silk with a soft sheen';
        case 'ruffled_linen_square': return 'a square throw pillow made from soft linen, framed with a generous, romantic ruffle border';
        case 'sequin_mermaid_shimmer': return 'a square pillow covered in shimmering, reversible sequins that look like mermaid scales';
        case 'tulle_and_pearl_overlay': return 'a delicate pillow with a soft, sheer tulle overlay that is scattered with tiny, elegant pearls';
        case 'chunky_knit_wool': return 'a super chunky, hand-knit wool pillow, that looks incredibly soft and cozy';
        case 'silk_with_crystal_brooch': return 'a luxurious silk pillow featuring a beautiful vintage-style crystal brooch as an accent in the center';
        default: return 'a high-quality pillow';
    }
}

const getPillowSettingDescription = (setting: PillowSetting): string => {
    const settingData = PILLOW_SETTINGS.find(s => s.id === setting);
    return settingData ? settingData.description : 'a cozy home setting';
}

const getFlatLayStyleDescription = (style: FlatLayStyle): string => {
    const styleData = FLAT_LAY_STYLES.find(s => s.id === style);
    return styleData ? styleData.description : 'a clean, minimalist flat lay';
}

const getPuzzleStyleDescription = (style: PuzzleStyle): string => {
    switch (style) {
        case 'rectangle_cardboard': return 'a rectangular jigsaw puzzle made of high-quality cardboard with standard interlocking pieces';
        case 'heart_shaped_wood': return 'a heart-shaped jigsaw puzzle made of laser-cut wood with unique, thematic pieces';
        default: return 'a high-quality jigsaw puzzle';
    }
}

const getPuzzleSettingDescription = (setting: PuzzleSetting): string => {
    const settingData = PUZZLE_SETTINGS.find(s => s.id === setting);
    return settingData ? settingData.description : 'a product setting';
}

const getLaptopSleeveStyleDescription = (style: LaptopSleeveStyle): string => {
    switch (style) {
        case 'neoprene': return 'a sleek, protective neoprene laptop sleeve';
        case 'leather_folio': return 'an elegant, professional leather folio laptop sleeve';
        case 'canvas_pouch': return 'a casual, durable canvas pouch-style laptop sleeve';
        default: return 'a high-quality laptop sleeve';
    }
}

const getLaptopSleeveSettingDescription = (setting: LaptopSleeveSetting): string => {
    const settingData = LAPTOP_SLEEVE_SETTINGS.find(s => s.id === setting);
    return settingData ? settingData.description : 'a product setting';
}


const getTextStyleDescription = (style: TextStyle, contrastColor: 'white' | 'black', gradientStart?: string, gradientEnd?: string): string => {
    switch (style) {
        case 'outline':
            return `Each letter must have a thin, sharp outline. The outline color must be exactly ${contrastColor}.`;
        case 'shadow': 
            return 'The text must have a professional, soft drop shadow to give it depth.';
        case 'glow': 
            return 'The text should have a vibrant, neon-like glow effect around it.';
        case 'neon':
            return 'The text must look like a realistic, brightly glowing neon sign. The glow should be vibrant and emanate from the letters.';
        case '3d': 
            return 'The text must be rendered in a bold 3D block style with realistic shading.';
        case 'metallic': 
            return 'The text should have a realistic metallic texture, like brushed gold or polished silver.';
        case 'chrome':
            return 'The text must have a hyper-realistic, polished chrome effect, with metallic reflections and highlights that suggest a curved, shiny surface.';
        case 'gradient':
            if (gradientStart && gradientEnd) {
                return `The text must be rendered with a smooth vertical gradient, transitioning from ${gradientStart} at the top to ${gradientEnd} at the bottom.`;
            }
            return 'The text must be rendered with a smooth vertical gradient effect.';
        case 'pastel_rainbow':
            return 'The text must be rendered with a smooth horizontal gradient of soft pastel rainbow colors (e.g., light pink, soft orange, pale yellow, mint green, baby blue, lavender).';
        case 'distressed':
            return 'The text should have a rugged, distressed, and cracked texture, as if it has been weathered over time.';
        case 'fire':
            return 'The text must be rendered as if it is engulfed in realistic, vibrant flames.';
        case 'ice':
            return 'The text must be rendered to look like it is made of solid, clear or slightly frosted ice, with realistic frosty textures and chilly highlights.';
        case 'wooden':
            return 'The text should appear as if it is carved from or made of realistic wood, with complete wood grain texture and natural lighting effects.';
        case 'comic':
            return 'The text should be in a dynamic, comic-book style, with a bold outline and possibly a halftone dot pattern fill.';
        case 'glitch':
            return 'The text must have a modern digital glitch effect, with color channel separation and pixel distortion.';
        case 'script':
            return 'The text must be rendered in an elegant, flowing, and connected script style, as if written with a calligraphy pen.';
        case 'varsity':
            return `The text should be in a classic, blocky "varsity" or "collegiate" athletic style. Each letter must have a thick, contrasting outline (use ${contrastColor} for the outline).`;
        case 'none': 
        default: 
            return 'The text should be rendered cleanly without any additional effects.';
    }
}

/**
 * Step 1: Generate a base image of a model with a blank product.
 * This uses a text-to-image model to create a safe "canvas" for editing.
 */
const generateBaseImage = async (options: DesignOptions): Promise<string> => {
    const { productType, productColor, pose, audience, backgroundStyle, professionalBackground, bagMaterial, frameStyle, frameModel, mugStyle, mugModel, sipperGlassStyle, sipperGlassModel, tumblerStyle, tumblerModel, halloweenTumblerStyle, halloweenTumblerSetting, tumblerTrioStyle, tumblerTrioSetting, phoneCaseStyle, phoneCaseModel, stickerStyle, stickerSetting, posterStyle, posterSetting, walletStyle, walletModel, capStyle, capModel, beanieStyle, beanieModel, pillowStyle, pillowSetting, flatLayStyle, puzzleStyle, puzzleSetting, laptopSleeveStyle, laptopSleeveSetting, aspectRatio } = options;
    let prompt;
    const backgroundDescription = getBackgroundDescription(backgroundStyle);
    const proBackgroundDescription = getProfessionalBackgroundDescription(professionalBackground);

    switch (productType) {
        case 'tshirt':
        case 'sweatshirt':
        case 'hoodie': {
            let productGarment;
            if (productType === 'tshirt') {
                productGarment = 't-shirt';
            } else if (productType === 'sweatshirt') {
                productGarment = 'sweatshirt';
            } else {
                productGarment = 'hoodie';
            }

            if (pose === 'flat_lay_simple') {
                prompt = `Top-down commercial product photo. A plain, unbranded, high-quality ${getColorName(productColor)} ${productGarment} is laid perfectly flat on ${proBackgroundDescription}. The ${productGarment} has a few subtle, natural-looking wrinkles to show fabric texture. The lighting is soft and even, creating gentle, realistic shadows. The background is simple and out of focus. ${qualityPrompt}`;
            } else {
                const audienceDescription = getAudienceDescription(audience);
                const poseDescription = getPoseDescription(pose);
                prompt = `Commercial product mockup photo, close-up portrait from the torso up. A hyperrealistic model, ${audienceDescription}, in a ${poseDescription} with a natural expression. The model has extremely detailed, natural skin texture with subtle pores and looks completely authentic. The model is wearing a plain, unbranded, high-quality ${getColorName(productColor)} ${productGarment} with detailed fabric weave and texture visible. The garment is shown clearly for a mockup and takes up a large portion of the frame. ${backgroundDescription} ${qualityPrompt}`;
            }
            break;
        }
        case 'tshirt_teacup_scene': {
            const audienceDescription = getAudienceDescription(audience);
            // Ensure pose is not flat lay for this scene
            const effectivePose = pose === 'flat_lay_simple' ? 'sitting' : pose;
            const poseDescription = getPoseDescription(effectivePose);
            const mugStyleDescription = getMugStyleDescription(mugStyle);

            prompt = `Commercial product mockup photo, close-up portrait from the torso up. A hyperrealistic model, ${audienceDescription}, in a ${poseDescription} with a natural expression, holding a teacup. The model has extremely detailed, natural skin texture with subtle pores and looks completely authentic. The model is wearing a plain, unbranded, high-quality ${getColorName(productColor)} t-shirt with detailed fabric weave and texture visible. The model is holding a plain, unbranded ${mugStyleDescription} in the same ${getColorName(productColor)} color. Both the garment and the mug are shown clearly for a mockup and take up a large portion of the frame. ${backgroundDescription} ${qualityPrompt}`;
            break;
        }
        case 'sweatshirt_mug_scene': {
            const audienceDescription = getAudienceDescription(audience);
            // Ensure pose is not flat lay for this scene
            const effectivePose = pose === 'flat_lay_simple' ? 'sitting' : pose;
            const poseDescription = getPoseDescription(effectivePose);
            const mugStyleDescription = getMugStyleDescription(mugStyle);

            prompt = `Commercial product mockup photo, close-up portrait from the torso up. A hyperrealistic model, ${audienceDescription}, in a ${poseDescription} with a natural expression, holding a mug. The model has extremely detailed, natural skin texture with subtle pores and looks completely authentic. The model is wearing a plain, unbranded, high-quality ${getColorName(productColor)} sweatshirt with detailed fabric weave and texture visible. The model is holding a plain, unbranded ${mugStyleDescription} in the same ${getColorName(productColor)} color. Both the garment and the mug are shown clearly for a mockup and take up a large portion of the frame. ${backgroundDescription} ${qualityPrompt}`;
            break;
        }
        case 'sweatshirt_teacup_scene': {
            const audienceDescription = getAudienceDescription(audience);
            // Ensure pose is not flat lay for this scene
            const effectivePose = pose === 'flat_lay_simple' ? 'sitting' : pose;
            const poseDescription = getPoseDescription(effectivePose);
            const mugStyleDescription = getMugStyleDescription(mugStyle); // reusing mug style for teacup

            prompt = `Commercial product mockup photo, close-up portrait from the torso up. A hyperrealistic model, ${audienceDescription}, in a ${poseDescription} with a natural expression, holding a teacup. The model has extremely detailed, natural skin texture with subtle pores and looks completely authentic. The model is wearing a plain, unbranded, high-quality ${getColorName(productColor)} sweatshirt with detailed fabric weave and texture visible. The model is holding a plain, unbranded ${mugStyleDescription} in the same ${getColorName(productColor)} color. Both the garment and the teacup are shown clearly for a mockup and take up a large portion of the frame. ${backgroundDescription} ${qualityPrompt}`;
            break;
        }
        case 'hoodie_teacup_scene': {
            const audienceDescription = getAudienceDescription(audience);
            // Ensure pose is not flat lay for this scene
            const effectivePose = pose === 'flat_lay_simple' ? 'sitting' : pose;
            const poseDescription = getPoseDescription(effectivePose);
            const mugStyleDescription = getMugStyleDescription(mugStyle); // reusing mug style for teacup

            prompt = `Commercial product mockup photo, close-up portrait from the torso up. A hyperrealistic model, ${audienceDescription}, in a ${poseDescription} with a natural expression, holding a teacup. The model has extremely detailed, natural skin texture with subtle pores and looks completely authentic. The model is wearing a plain, unbranded, high-quality ${getColorName(productColor)} hoodie with detailed fabric weave and texture visible. The model is holding a plain, unbranded ${mugStyleDescription} in the same ${getColorName(productColor)} color. Both the garment and the teacup are shown clearly for a mockup and take up a large portion of the frame. ${backgroundDescription} ${qualityPrompt}`;
            break;
        }
        case 'bag': {
             const bagMaterialDescription = getBagMaterialDescription(bagMaterial);
             prompt = `Close-up commercial product lifestyle photo. A person's hand and arm with hyperrealistic, natural skin texture, holding a plain, unbranded bag made of ${bagMaterialDescription} in ${getColorName(productColor)}. The focus is on the bag, which takes up a large area of the image, highlighting its detailed material texture. ${backgroundDescription} ${qualityPrompt}`;
            break;
        }
        case 'wallet': {
            const walletStyleDescription = getWalletStyleDescription(walletStyle);
            let sceneDescription = getWalletModelDescription(walletModel);
            if (walletModel === 'flat_lay_desk') {
                sceneDescription = `${sceneDescription} on ${proBackgroundDescription}.`;
            }
            prompt = `Close-up commercial product photo of a plain, unbranded ${walletStyleDescription} in a ${getColorName(productColor)} color, taking up a large area of the image and highlighting the detailed leather texture. Scene: ${sceneDescription}. The background is beautifully blurred with strong bokeh. ${qualityPrompt}`;
            break;
        }
        case 'frame':
            const frameStyleDescription = getFrameStyleDescription(frameStyle);
            const frameModelDescription = getFrameModelDescription(frameModel);
            prompt = `Close-up commercial product photo. A hyperrealistic model, ${frameModelDescription}, with natural skin texture, is holding up a plain, empty ${frameStyleDescription} in a ${getColorName(productColor)} finish. The focus is on the empty frame, which takes up most of the image area, showing its detailed wood grain. ${backgroundDescription} ${qualityPrompt}`;
            break;
        case 'mug':
            const mugStyleDescription = getMugStyleDescription(mugStyle);
            const mugModelDescription = getMugModelDescription(mugModel);
            prompt = `Close-up commercial product photo. A hyperrealistic model, ${mugModelDescription}, with natural skin texture, is holding a plain, unbranded ${mugStyleDescription} in a ${getColorName(productColor)} color. The focus is on the mug, which takes up a large portion of the image, showing its texture. ${backgroundDescription} ${qualityPrompt}`;
            break;
        case 'sipper_glass':
            const sipperStyleDescription = getSipperGlassStyleDescription(sipperGlassStyle);
            const sipperModelDescription = getSipperGlassModelDescription(sipperGlassModel);
            const beverageColor = productColor === '#FFFFFF' ? 'clear' : getColorName(productColor);
            prompt = `Close-up commercial product photo. A hyperrealistic model, ${sipperModelDescription}, holding a plain, unbranded ${sipperStyleDescription} containing a ${beverageColor} beverage. The focus is on the sipper glass, which takes up a large portion of the image, showing realistic condensation and reflections. ${backgroundDescription} ${qualityPrompt}`;
            break;
        case 'tumbler_wrap':
            const tumblerStyleDescription = getTumblerStyleDescription(tumblerStyle);
            const tumblerModelDescription = getTumblerModelDescription(tumblerModel);
            prompt = `Close-up commercial product photo. A hyperrealistic model, ${tumblerModelDescription}, holding a plain, unbranded ${tumblerStyleDescription} in a ${getColorName(productColor)} color. The focus is on the tumbler, which takes up a large portion of the image, highlighting its material finish (matte, steel). ${backgroundDescription} ${qualityPrompt}`;
            break;
        case 'halloween_tumbler':
            const halloweenTumblerStyleDescription = getHalloweenTumblerStyleDescription(halloweenTumblerStyle);
            const halloweenTumblerSettingDescription = getHalloweenTumblerSettingDescription(halloweenTumblerSetting);
            prompt = `Close-up commercial product photo. A plain, unbranded ${halloweenTumblerStyleDescription} in a ${getColorName(productColor)} color is placed in the center of ${halloweenTumblerSettingDescription}. The focus is on the tumbler, which fills a large portion of the frame, highlighting its material and the atmospheric lighting. The background has a beautiful, strong bokeh effect. ${qualityPrompt}`;
            break;
        case 'tumbler_trio':
            const tumblerTrioStyleDescription = getTumblerTrioStyleDescription(tumblerTrioStyle);
            const tumblerTrioSettingDescription = getTumblerTrioSettingDescription(tumblerTrioSetting);
            prompt = `Close-up commercial product photo. ${tumblerTrioStyleDescription} are standing in a neat row, side-by-side, on ${tumblerTrioSettingDescription}. They are all plain, unbranded, and have a ${getColorName(productColor)} base color. The focus is on the three tumblers, which fill a large portion of the frame, highlighting their material and reflections. The background has a beautiful bokeh effect. ${qualityPrompt}`;
            break;
        case 'laser_engraving': {
            prompt = `Top-down commercial product photo of ${proBackgroundDescription}. The surface is a clean, flat, high-quality slab, perfectly lit to showcase its texture and grain for a laser engraving mockup. The lighting is soft and even. ${qualityPrompt}`;
            break;
        }
        case 'phone_case': {
            const phoneCaseStyleDescription = getPhoneCaseStyleDescription(phoneCaseStyle);
            let sceneDescription = getPhoneCaseModelDescription(phoneCaseModel);
             if (phoneCaseModel === 'flat_lay' || phoneCaseModel === 'on_desk') {
                sceneDescription = `${sceneDescription} on ${proBackgroundDescription}.`;
            }
            prompt = `Close-up commercial product photo. A plain, unbranded phone case with a ${phoneCaseStyleDescription} in a ${getColorName(productColor)} color is shown, taking up a large area of the image. Scene: ${sceneDescription}. The focus is on the phone case, highlighting its material and realistic reflections. The background is beautifully blurred with strong bokeh. ${qualityPrompt}`;
            break;
        }
        case 'sticker':
            const stickerStyleDescription = getStickerStyleDescription(stickerStyle);
            const stickerSettingDescription = getStickerSettingDescription(stickerSetting);
            prompt = `Extreme close-up commercial product photo. A plain, unbranded ${stickerStyleDescription} is placed on ${stickerSettingDescription}. The focus is on the blank sticker, which takes up most of the image area, highlighting its texture and finish against the surface. The background is beautifully blurred with strong bokeh. ${qualityPrompt}`;
            break;
        case 'poster':
            const posterStyleDescription = getPosterStyleDescription(posterStyle);
            const posterSettingDescription = getPosterSettingDescription(posterSetting);
            prompt = `Close-up commercial product photo. A plain, unbranded ${posterStyleDescription} is shown, filling most of the frame. Scene: ${posterSettingDescription}. The focus is on the blank poster, highlighting its paper texture. The background is beautifully blurred with strong bokeh. ${qualityPrompt}`;
            break;
        case 'cap': {
            const capStyleDescription = getCapStyleDescription(capStyle);
            let sceneDescription = getCapModelDescription(capModel);
             if (capModel === 'flat_lay') {
                sceneDescription = `${sceneDescription} on ${proBackgroundDescription}.`;
            }
            prompt = `Close-up commercial product photo. A plain, unbranded ${capStyleDescription} in a ${getColorName(productColor)} color is shown, taking up a large portion of the frame. Scene: ${sceneDescription}. The focus is on the cap, highlighting its fabric texture. ${backgroundDescription} ${qualityPrompt}`;
            break;
        }
        case 'beanie': {
            const beanieStyleDescription = getBeanieStyleDescription(beanieStyle);
            let sceneDescription = getBeanieModelDescription(beanieModel);
            if (beanieModel === 'flat_lay') {
                sceneDescription = `${sceneDescription} on ${proBackgroundDescription}.`;
            }
            prompt = `Close-up commercial product photo. A plain, unbranded ${beanieStyleDescription} in a ${getColorName(productColor)} color is shown, taking up a large portion of the frame. Scene: ${sceneDescription}. The focus is on the beanie, highlighting its knit texture. ${backgroundDescription} ${qualityPrompt}`;
            break;
        }
        case 'pillow':
            const pillowStyleDescription = getPillowStyleDescription(pillowStyle);
            const pillowSettingDescription = getPillowSettingDescription(pillowSetting);
            prompt = `Close-up commercial product photo. A plain, unbranded ${pillowStyleDescription} in a ${getColorName(productColor)} color is placed on ${pillowSettingDescription}. The focus is on the pillow, which fills most of the frame, highlighting its fabric texture and softness. The background is beautifully blurred with strong bokeh. ${qualityPrompt}`;
            break;
        case 'flat_lay':
            const flatLayStyleDescription = getFlatLayStyleDescription(flatLayStyle);
            if (flatLayStyle.includes('close_up')) {
                prompt = `Top-down commercial product photo of a plain, unbranded, high-quality ${getColorName(productColor)} t-shirt. The shot is ${flatLayStyleDescription}. The scene is arranged on ${proBackgroundDescription}. The lighting is soft and even, creating gentle, realistic shadows. The background is simple and out of focus. ${qualityPrompt}`;
            } else {
                prompt = `Top-down commercial product photo. A plain, unbranded, high-quality ${getColorName(productColor)} t-shirt is laid perfectly flat, as the prominent centerpiece of ${flatLayStyleDescription}. The entire flat lay is arranged on ${proBackgroundDescription}. The lighting is soft and even, creating gentle, realistic shadows. The background is simple and out of focus. ${qualityPrompt}`;
            }
            break;
        case 'jigsaw_puzzle':
            const puzzleStyleDescription = getPuzzleStyleDescription(puzzleStyle);
            let puzzleSettingDescription = getPuzzleSettingDescription(puzzleSetting);
            if (puzzleSetting === 'flat_lay_minimalist') {
                puzzleSettingDescription = `${puzzleSettingDescription} on ${proBackgroundDescription}.`;
            }
            prompt = `Close-up commercial product photo. Scene: ${puzzleSettingDescription}. The puzzle is ${puzzleStyleDescription} and takes up a large portion of the image. The focus is on the blank puzzle, highlighting its material and piece shapes. The background is beautifully blurred with strong bokeh. ${qualityPrompt}`;
            break;
        case 'laptop_sleeve':
            const laptopSleeveStyleDescription = getLaptopSleeveStyleDescription(laptopSleeveStyle);
            let laptopSleeveSettingDescription = getLaptopSleeveSettingDescription(laptopSleeveSetting);
            if (laptopSleeveSetting === 'flat_lay_minimalist') {
                laptopSleeveSettingDescription = `${laptopSleeveSettingDescription} on ${proBackgroundDescription}.`;
            }
            prompt = `Close-up commercial product photo. A plain, unbranded ${laptopSleeveStyleDescription} in a ${getColorName(productColor)} color is shown, taking up a large portion of the frame. Scene: ${laptopSleeveSettingDescription}. The focus is on the sleeve, highlighting its material texture. The background is beautifully blurred with strong bokeh. ${qualityPrompt}`;
            break;
        default:
            // Fallback for any product types not explicitly handled
            prompt = `Commercial product photo of a plain, unbranded ${productType} in ${getColorName(productColor)}. ${backgroundDescription} ${qualityPrompt}`;
    }

// FIX: The `safetySettings` parameter is not supported by the `generateImages` API call and has been removed.
    const apiCall = () => ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: aspectRatio,
        },
    });
    
    // The API call is wrapped in a retry mechanism
    const response: GenerateImagesResponse = await withRetry(apiCall);

    const base64ImageBytes = response.generatedImages[0]?.image?.imageBytes;
    if (!base64ImageBytes) {
        throw new Error('Image generation failed, received no image data.');
    }
    return base64ImageBytes;
};

/**
 * Generates a full product mockup by first creating a base image and then applying
 * the logo and text design using an image editing model.
 */
export const generateMockup = async (logoFile: File, options: DesignOptions): Promise<string> => {
    const { text, textColor, font, style, textStyle, gradientStartColor, gradientEndColor, productType } = options;

    // Step 1: Generate the base image of the product with a model/setting.
    const baseImageB64 = await generateBaseImage(options);
    const baseImagePart: Part = {
        inlineData: {
            mimeType: 'image/jpeg', // The base image is always a JPEG
            data: baseImageB64,
        },
    };

    // Step 2: Convert the uploaded logo file into a Part for the API.
    const logoPart = await fileToGenerativePart(logoFile);

    // Step 3: Build the detailed text prompt for the editing model.
    const hasText = text && text.trim().length > 0;
    const contrastColor = getContrastColor(options.productColor);
    const textStyleDesc = getTextStyleDescription(textStyle, contrastColor, getColorName(gradientStartColor), getColorName(gradientEndColor));
    const fontName = TSHIRT_FONTS.find(f => f.id === font)?.name || 'Impact';

    let designPlacement;
    let overallStyle = `a ${style.replace(/_/g, ' ')} style.`; // Default style description

    // Some products don't have a "style" dropdown, so we default to 'classic' for text placement.
    const nonStyledProducts: ProductType[] = ['bag', 'phone_case', 'sticker', 'poster', 'wallet', 'cap', 'beanie', 'pillow', 'laptop_sleeve', 'tshirt_teacup_scene', 'sweatshirt_mug_scene', 'hoodie_teacup_scene', 'sweatshirt_teacup_scene', 'laser_engraving'];
    const effectiveStyle = nonStyledProducts.includes(productType) ? 'classic' : style;

    switch (effectiveStyle) {
        case 'classic':
        case 'lower_half_circle':
            designPlacement = `Apply the logo to the center of the product. The text "${text}" should be placed below the logo in a gentle, semi-circular arc.`;
            break;
        case 'upper_half_circle':
            designPlacement = `Apply the logo to the center of the product. The text "${text}" should be placed above the logo in a gentle, semi-circular arc.`;
            break;
        case 'upper_oval':
            designPlacement = `Apply the logo to the center of the product. The text "${text}" should be placed above the logo in a gentle, oval-shaped arc.`;
            break;
        case 'lower_oval':
            designPlacement = `Apply the logo to the center of the product. The text "${text}" should be placed below the logo in a gentle, oval-shaped arc.`;
            break;
        case 'full_circle': {
            const circleWords = text.split(/\s+/);
            const circleMidPoint = Math.ceil(circleWords.length / 2);
            const topCircleText = circleWords.slice(0, circleMidPoint).join(' ');
            const bottomCircleText = circleWords.slice(circleMidPoint).join(' ');
            designPlacement = `Place the logo in the center. Arc the text "${topCircleText}" above the logo, and arc the text "${bottomCircleText}" below the logo to create a full circular text effect around the logo.`;
            break;
        }
        case 'split': {
            const words = text.split(/\s+/);
            const midPoint = Math.ceil(words.length / 2);
            const leftText = words.slice(0, midPoint).join(' ');
            const rightText = words.slice(midPoint).join(' ');
            designPlacement = `Place the logo in the absolute center. Place the text "${leftText}" to the left of the logo, and the text "${rightText}" to the right of the logo.`;
            break;
        }
        case 'vintage_stamp':
        case 'emblem': {
            const stampWords = text.split(/\s+/);
            const stampMidPoint = Math.ceil(stampWords.length / 2);
            const topText = stampWords.slice(0, stampMidPoint).join(' ');
            const bottomText = stampWords.slice(stampMidPoint).join(' ');
            designPlacement = `Place the logo in the center. Arc the text "${topText}" above the logo, and arc the text "${bottomText}" below the logo to create a circular emblem or stamp effect.`;
            break;
        }
        case 'minimalist_line':
            designPlacement = `Place the logo on the left side, and place the text "${text}" vertically (rotated 90 degrees counter-clockwise) on the right side.`;
            break;
        case 'stacked_text':
            designPlacement = `Place the logo in the upper center. Below the logo, stack the words of the text "${text}" on top of each other, with each word centered.`;
            break;
        case 'grunge_overlay':
        case 'photo_text':
            designPlacement = `Overlay the text "${text}" directly on top of the logo image, both centered together on the product.`;
            break;
        case 'slasher':
            overallStyle = 'a gritty, horror movie title style, like a slasher film poster from the 1980s. The text should look menacing, perhaps with a dripping or scratched effect.';
            designPlacement = `Place the logo and text "${text}" together in the center.`;
            break;
        case 'sketch':
             overallStyle = 'a hand-drawn, gritty, monochrome pencil sketch style. The entire design should look like it was sketched directly onto the fabric.';
             designPlacement = `Place the logo and text "${text}" together in the center.`;
            break;
        case 'retro_wave':
             overallStyle = 'a 1980s retro wave or synthwave aesthetic. Think chrome, neon, and grid lines.';
             designPlacement = `Place the logo centrally, with the text "${text}" below it in a bold, retro font.`;
            break;
        case 'cyberpunk_glitch':
             overallStyle = 'a futuristic cyberpunk theme with a digital glitch effect. The text and logo should have distorted, chromatic aberration effects.';
             designPlacement = `Place the logo and text "${text}" together in the center.`;
            break;
        case 'boho_floral_wreath':
             overallStyle = 'a delicate, hand-drawn bohemian style.';
             designPlacement = `Place the logo in the center. Surround the logo with a beautiful wreath of hand-drawn wildflowers and foliage. Place the text "${text}" in a gentle arc underneath the wreath.`;
            break;
        case 'girly_script_heart':
             overallStyle = 'a cute, feminine, and girly style.';
             designPlacement = `Place the logo in the center. Below the logo, render the text "${text}" in an elegant, flowing script font. Add a small, cute, hand-drawn heart icon next to the text.`;
            break;
        case 'celestial_moon_phases':
             overallStyle = 'a mystical, celestial theme with gold and silver accents.';
             designPlacement = `Place the logo centrally. Arrange a graceful arc of moon phase icons (waxing, full, waning) above the logo. Place the text "${text}" below the logo in a serif or mystical-style font.`;
            break;
        case 'glam_leopard_print':
             overallStyle = 'a bold, chic, and glamorous fashion style.';
             designPlacement = `Place the logo in the center. Apply a realistic and fashionable leopard print pattern as an accent around the edges of the logo and text. Place the text "${text}" below the logo.`;
            break;
        case 'kawaii_cute_doodle':
             overallStyle = 'a fun, playful, and cute Japanese kawaii style.';
             designPlacement = `Place the logo in the center. Surround the logo and text with small, cute, simple hand-drawn doodles like stars, sparkles, hearts, and happy faces. Place the text "${text}" below the logo in a rounded, bubbly font.`;
            break;
        case 'watercolor_blooms':
            overallStyle = 'a soft, artistic, and delicate watercolor style.';
            designPlacement = `Place the logo in the center. Beautifully integrate soft, translucent watercolor flowers (like peonies and roses in pastel pinks and purples) blooming around and behind the logo. Place the text "${text}" below the logo.`;
            break;
        case 'gold_foil_accents':
            overallStyle = 'an elegant, luxurious, and chic style.';
            designPlacement = `Place the logo centrally. Add delicate, shimmering gold foil accents and splatters around the logo and text to give it a touch of glamour. Place the text "${text}" below the logo.`;
            break;
        case 'lace_trim_border':
            overallStyle = 'a sophisticated, intricate, and romantic style.';
            designPlacement = `Place the logo and text "${text}" in the center. Frame the entire design with an elegant and intricate white lace border, creating a sophisticated and delicate look.`;
            break;
        case 'pastel_tie_dye':
            overallStyle = 'a dreamy, soft, and trendy pastel tie-dye style.';
            designPlacement = `Create a subtle, circular pastel tie-dye effect (using colors like baby pink, lavender, and mint green) as a background for the main design elements. Place the logo and text "${text}" in the center, on top of the tie-dye pattern.`;
            break;
        case 'starry_night_sky':
            overallStyle = 'a magical, mystical, and dreamy celestial style.';
            designPlacement = `Place the logo in the center. Create a backdrop of a dark navy night sky with twinkling stars and faint, glowing constellations around the logo. Place the text "${text}" below the logo in an elegant font.`;
            break;
        case 'cherry_blossom_dream':
            overallStyle = 'a soft, delicate, and romantic Japanese-inspired style.';
            designPlacement = `Place the logo and text centrally. Frame the design with elegant, soft-focus cherry blossom branches that appear to be gently blowing in the wind, with a few petals scattered across the design.`;
            break;
        case 'satin_lace_trim':
            overallStyle = 'a stylish, luxurious, and elegant boudoir-inspired style.';
            designPlacement = `Place the logo and text in the center. Create a sophisticated border around the design using a combination of shimmering satin ribbon and delicate, intricate black or white lace.`;
            break;
        case 'rose_gold_glitter':
            overallStyle = 'a glamorous, chic, and stylish style.';
            designPlacement = `Place the logo and text in the center. The design should be accented with a spray of fine, shimmering rose gold glitter that looks like it was just sprinkled on, with some particles catching the light.`;
            break;
        case 'dreamy_angel_wings':
            overallStyle = 'a soft, ethereal, and dreamy angelic style.';
            designPlacement = `Place the logo and text in the center. Position a pair of large, soft, and ethereal white feathered angel wings so they gracefully arch around the central design.`;
            break;
        case 'sensual_smoke_perfume':
            overallStyle = 'a mysterious, elegant, and alluring style.';
            designPlacement = `Place the logo and text in the center. Have wisps of soft, colored smoke (in shades of deep purple and soft pink, like perfume) swirling elegantly around and partially through the design, creating a sense of mystery and allure.`;
            break;
        default:
             designPlacement = `Apply the logo to the center of the product. If there is text, place the text "${text}" below the logo.`;
    }

    let productInstruction = `Apply the design realistically onto the product in the image.`; // Default
    switch (productType) {
        case 'tshirt':
        case 'sweatshirt':
        case 'hoodie':
        case 'flat_lay':
            productInstruction = 'Apply the design realistically onto the center of the apparel.';
            break;
        case 'tshirt_teacup_scene':
            productInstruction = 'Apply the design realistically onto the center of the t-shirt AND onto the front of the teacup.';
            break;
        case 'sweatshirt_mug_scene':
            productInstruction = 'Apply the design realistically onto the center of the sweatshirt AND onto the front of the mug.';
            break;
        case 'sweatshirt_teacup_scene':
            productInstruction = 'Apply the design realistically onto the center of the sweatshirt AND onto the front of the teacup.';
            break;
        case 'hoodie_teacup_scene':
            productInstruction = 'Apply the design realistically onto the center of the hoodie AND onto the front of the teacup.';
            break;
        case 'bag':
            productInstruction = 'Apply the design realistically onto the front face of the bag.';
            break;
        case 'wallet':
            productInstruction = 'Apply the design realistically onto the front of the wallet.';
            break;
        case 'cap':
             productInstruction = 'Apply the design realistically onto the front of the cap.';
             break;
        case 'beanie':
             productInstruction = 'Apply the design realistically onto the front (cuffed area if visible) of the beanie.';
             break;
        case 'pillow':
             productInstruction = 'Apply the design realistically onto the center of the pillow.';
             break;
        case 'frame':
             productInstruction = 'Apply the provided logo as the picture inside the empty wooden frame. Ignore any text prompts.';
             break;
        case 'mug':
        case 'sipper_glass':
        case 'tumbler_wrap':
        case 'halloween_tumbler':
             productInstruction = 'Apply the design realistically, wrapping it around the center of the drinkware.';
             break;
        case 'tumbler_trio':
             productInstruction = 'Apply the same design realistically to the front of all three tumblers.';
             break;
        case 'laser_engraving':
             productInstruction = 'Apply the provided design onto the wooden surface. The design must look like a high-quality, precise, and clean laser engraving. The engraving should have realistic depth and a slightly darkened, burnt-in appearance that follows the material\'s grain and texture. The logo image and text must be converted into a monochrome format suitable for engraving.';
             break;
        case 'phone_case':
             productInstruction = 'Apply the design realistically onto the back of the phone case.';
             break;
        case 'sticker':
             productInstruction = 'Apply the design to the blank sticker, making it look like a single, cohesive sticker design.';
             break;
        case 'poster':
             productInstruction = 'Apply the design as the artwork for the poster.';
             break;
        case 'jigsaw_puzzle':
             productInstruction = 'Apply the design as the image for the entire jigsaw puzzle.';
             break;
        case 'laptop_sleeve':
             productInstruction = 'Apply the design realistically onto the front of the laptop sleeve.';
             break;
    }

    // Construct the final text prompt for the editing model
    const textPrompt = `
        **TASK: Apply the provided design (logo and text) onto the blank product in the base image.**

        **Design Details:**
        - **Logo:** Use the provided logo image.
        - **Text:** ${hasText ? `"${text}"` : 'No text provided.'}
        - **Font:** ${hasText ? `Use a font that looks like "${fontName}".` : 'N/A'}
        - **Text Color:** ${hasText ? `Use the color ${getColorName(textColor)}.` : 'N/A'}
        - **Text Style:** ${hasText ? textStyleDesc : 'N/A'}

        **Placement & Style Instructions:**
        - **Overall Style:** The design should be in ${overallStyle}
        - **Placement:** ${designPlacement}
        - **Instructions:** ${productInstruction}

        ${criticalRealismInstructions}
    `;

    const contents: Part[] = [baseImagePart, logoPart, { text: textPrompt }];

    // Step 4: Call the editing model.
// FIX: The `safetySettings` parameter is not supported by the `generateContent` API call and has been removed.
    const apiCall = () => ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: { parts: contents },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    const response: GenerateContentResponse = await withRetry(apiCall);

    // Step 5: Extract the generated image from the response.
    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
    const resultBase64 = imagePart?.inlineData?.data;

    if (!resultBase64) {
        const blockReason = response.candidates?.[0]?.finishReason;
        const safetyRatings = response.candidates?.[0]?.safetyRatings;
        console.error("Image generation failed. Block Reason:", blockReason, "Safety Ratings:", safetyRatings);
        throw new Error('Failed to generate the final mockup. The model did not return an image. This could be due to a safety filter or an internal error.');
    }

    return resultBase64;
};