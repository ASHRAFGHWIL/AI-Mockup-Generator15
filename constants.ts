import React from 'react';
import type { DesignStyle, ModelPose, ModelAudience, TshirtFont, ProductType, BagMaterial, TextStyle, FrameStyle, FrameModel, FrameDimension, MugStyle, MugModel, SipperGlassStyle, SipperGlassModel, TumblerStyle, TumblerModel, HalloweenTumblerStyle, HalloweenTumblerSetting, TumblerTrioStyle, TumblerTrioSetting, PhoneCaseStyle, PhoneCaseModel, StickerStyle, StickerSetting, PosterStyle, PosterSetting, WalletStyle, WalletModel, CapStyle, CapModel, BeanieStyle, BeanieModel, PillowStyle, PillowSetting, FlatLayStyle, PuzzleStyle, PuzzleSetting, LaptopSleeveStyle, LaptopSleeveSetting, BackgroundStyle, ProfessionalBackground, WritingTemplateCategory } from './types';
// FIX: Added missing icon imports (TumblerIcon, etc.) to resolve module export errors.
import { TshirtIcon, SweatshirtIcon, HoodieIcon, BagIcon, FrameIcon, MugIcon, SipperGlassIcon, TumblerIcon, HalloweenTumblerIcon, TumblerTrioIcon, LaserIcon, PhoneCaseIcon, StickerIcon, PosterIcon, WalletIcon, CapIcon, BeanieIcon, PillowIcon, FlatLayIcon, PuzzleIcon, LaptopSleeveIcon, TshirtAndMugIcon, SweatshirtAndMugIcon } from './components/productIcons';

export const PRODUCT_COLORS = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#272727' },
  { name: 'Jet Black', value: '#111111' },
  { name: 'Grey', value: '#808080' },
  { name: 'Charcoal', value: '#4A4A4A' },
  { name: 'Silver', value: '#C0C0C0' },
  { name: 'Cream', value: '#FEF3C7' },
  { name: 'Beige', value: '#D2B48C' },
  { name: 'Red', value: '#B91C1C' },
  { name: 'Maroon', value: '#800000' },
  { name: 'Burgundy', value: '#9F1239' },
  { name: 'Rose', value: '#FB7185' },
  { name: 'Pink', value: '#F472B6' },
  { name: 'Hot Pink', value: '#D946EF' },
  { name: 'Light Pink', value: '#FBCFE8' },
  { name: 'Coral', value: '#FF7F50' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Bright Orange', value: '#F97316' },
  { name: 'Gold', value: '#FFD700' },
  { name: 'Yellow', value: '#FBBF24' },
  { name: 'Electric Lime', value: '#BEF264' },
  { name: 'Lime', value: '#A3E635' },
  { name: 'Green', value: '#16A34A' },
  { name: 'Forest Green', value: '#15803D' },
  { name: 'Mint Green', value: '#6EE7B7' },
  { name: 'Teal', value: '#2DD4BF' },
  { name: 'Turquoise', value: '#40E0D0' },
  { name: 'Cyan', value: '#22D3EE' },
  { name: 'Sky Blue', value: '#38BDF8' },
  { name: 'Baby Blue', value: '#BFDBFE' },
  { name: 'Blue', value: '#2563EB' },
  { name: 'Royal Blue', value: '#4338CA' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Navy', value: '#001f3f' },
  { name: 'Purple', value: '#A78BFA' },
  { name: 'Lavender', value: '#C4B5FD' },
  { name: 'Lilac', value: '#D8B4FE' },
  { name: 'Fuchsia', value: '#E879F9' },
  { name: 'Brown', value: '#78350F' },
  { name: 'Walnut', value: '#5C4033' },
  { name: 'Pine', value: '#A67B5B' },
  { name: 'Oak', value: '#C2A47C' },
  { name: 'Mahogany', value: '#C04000' },
];

export const PRODUCT_TYPES: {id: ProductType, nameKey: string, icon: React.FC<{ className?: string }>}[] = [
    { id: 'tshirt', nameKey: 'productType_tshirt', icon: TshirtIcon },
    { id: 'tshirt_teacup_scene', nameKey: 'productType_tshirt_teacup_scene', icon: TshirtAndMugIcon },
    { id: 'sweatshirt', nameKey: 'productType_sweatshirt', icon: SweatshirtIcon },
    { id: 'sweatshirt_mug_scene', nameKey: 'productType_sweatshirt_mug_scene', icon: SweatshirtAndMugIcon },
    { id: 'sweatshirt_teacup_scene', nameKey: 'productType_sweatshirt_teacup_scene', icon: SweatshirtAndMugIcon },
    { id: 'hoodie', nameKey: 'productType_hoodie', icon: HoodieIcon },
    { id: 'hoodie_teacup_scene', nameKey: 'productType_hoodie_teacup_scene', icon: TshirtAndMugIcon },
    { id: 'flat_lay', nameKey: 'productType_flat_lay', icon: FlatLayIcon },
    { id: 'bag', nameKey: 'productType_bag', icon: BagIcon },
    { id: 'wallet', nameKey: 'productType_wallet', icon: WalletIcon },
    { id: 'cap', nameKey: 'productType_cap', icon: CapIcon },
    { id: 'beanie', nameKey: 'productType_beanie', icon: BeanieIcon },
    { id: 'pillow', nameKey: 'productType_pillow', icon: PillowIcon },
    { id: 'frame', nameKey: 'productType_frame', icon: FrameIcon },
    { id: 'mug', nameKey: 'productType_mug', icon: MugIcon },
    { id: 'sipper_glass', nameKey: 'productType_sipper_glass', icon: SipperGlassIcon },
    { id: 'tumbler_wrap', nameKey: 'productType_tumbler_wrap', icon: TumblerIcon },
    { id: 'halloween_tumbler', nameKey: 'productType_halloween_tumbler', icon: HalloweenTumblerIcon },
    { id: 'tumbler_trio', nameKey: 'productType_tumbler_trio', icon: TumblerTrioIcon },
    { id: 'laser_engraving', nameKey: 'productType_laser_engraving', icon: LaserIcon },
    { id: 'phone_case', nameKey: 'productType_phone_case', icon: PhoneCaseIcon },
    { id: 'sticker', nameKey: 'productType_sticker', icon: StickerIcon },
    { id: 'poster', nameKey: 'productType_poster', icon: PosterIcon },
    { id: 'jigsaw_puzzle', nameKey: 'productType_jigsaw_puzzle', icon: PuzzleIcon },
    { id: 'laptop_sleeve', nameKey: 'productType_laptop_sleeve', icon: LaptopSleeveIcon },
];

export const BAG_MATERIALS: {id: BagMaterial, nameKey: string}[] = [
    { id: 'canvas', nameKey: 'bagMaterial_canvas' },
    { id: 'leather', nameKey: 'bagMaterial_leather' },
    { id: 'nylon', nameKey: 'bagMaterial_nylon' },
    { id: 'denim', nameKey: 'bagMaterial_denim' },
    { id: 'soft_pink_velvet', nameKey: 'bagMaterial_soft_pink_velvet' },
    { id: 'blush_pink_silk', nameKey: 'bagMaterial_blush_pink_silk' },
    { id: 'white_lace_overlay', nameKey: 'bagMaterial_white_lace_overlay' },
    { id: 'rose_gold_sequins', nameKey: 'bagMaterial_rose_gold_sequins' },
    { id: 'creamy_faux_fur', nameKey: 'bagMaterial_creamy_faux_fur' },
];

export const FRAME_STYLES: {id: FrameStyle, nameKey: string}[] = [
    { id: 'classic_ornate', nameKey: 'frameStyle_classic_ornate' },
    { id: 'modern_minimalist', nameKey: 'frameStyle_modern_minimalist' },
    { id: 'rustic_barnwood', nameKey: 'frameStyle_rustic_barnwood' },
    { id: 'modern_mahogany', nameKey: 'frameStyle_modern_mahogany' },
    { id: 'rose_gold_ornate', nameKey: 'frameStyle_rose_gold_ornate' },
    { id: 'pearl_inlay_minimalist', nameKey: 'frameStyle_pearl_inlay_minimalist' },
    { id: 'velvet_lined_shadow_box', nameKey: 'frameStyle_velvet_lined_shadow_box' },
    { id: 'lace_carved_wood', nameKey: 'frameStyle_lace_carved_wood' },
    { id: 'shabby_chic_distressed', nameKey: 'frameStyle_shabby_chic_distressed' },
];

export const FRAME_DIMENSIONS: {id: FrameDimension, nameKey: string, description: string}[] = [
    { id: '8.5x11', nameKey: 'frameDimension_8_5x11', description: 'an 8.5 by 11 inch portrait frame' },
    { id: '14x11', nameKey: 'frameDimension_14x11', description: 'a 14 by 11 inch landscape frame' },
    { id: '20x16', nameKey: 'frameDimension_20x16', description: 'a 20 by 16 inch landscape frame' },
    { id: '36x24', nameKey: 'frameDimension_36x24', description: 'a 36 by 24 inch landscape frame' },
    { id: 'A1', nameKey: 'frameDimension_A1', description: 'an A1 size portrait frame' },
    { id: 'A2', nameKey: 'frameDimension_A2', description: 'an A2 size portrait frame' },
    { id: 'A3', nameKey: 'frameDimension_A3', description: 'an A3 size landscape frame' },
    { id: 'A4', nameKey: 'frameDimension_A4', description: 'an A4 size portrait frame' },
];

export const FRAME_MODELS: {id: FrameModel, nameKey: string, description: string}[] = [
    { id: 'elegant_woman_street', nameKey: 'frameModel_elegant_woman_street', description: 'an elegant woman in elegant clothing, standing on a picturesque European-style street and holding the frame' },
    { id: 'art_curator_gallery', nameKey: 'frameModel_art_curator_gallery', description: 'an art curator with a professional appearance in a minimalist gallery, presenting the frame' },
    { id: 'craftsman_workshop', nameKey: 'frameModel_craftsman_workshop', description: 'a craftsman in a woodworking workshop, showcasing the frame' },
    { id: 'man_modern_loft', nameKey: 'frameModel_man_modern_loft', description: 'a stylish man in a modern, industrial-style loft apartment, hanging the frame on an exposed brick wall' },
    { id: 'woman_cozy_living_room', nameKey: 'frameModel_woman_cozy_living_room', description: 'a woman in a cozy, hygge-style living room with a fireplace, placing the frame on a wooden mantle' },
    { id: 'couple_art_store', nameKey: 'frameModel_couple_art_store', description: 'a happy young couple in a bright, well-lit art supply store, holding up the frame together' },
    { id: 'boudoir_vanity_glamour', nameKey: 'frameModel_boudoir_vanity_glamour', description: 'a glamorous close-up shot of the frame placed on a beautiful vanity table, surrounded by elegant perfume bottles, jewelry, and soft, romantic lighting. The frame is the main focus.' },
    { id: 'lounging_on_silk_sheets', nameKey: 'frameModel_lounging_on_silk_sheets', description: 'a close-up shot focusing on an elegant woman with beautiful hands lounging on luxurious silk sheets, holding the frame prominently for the camera. The frame is the main focus of the shot.' },
    { id: 'parisian_cafe_chic', nameKey: 'frameModel_parisian_cafe_chic', description: 'a chic lifestyle shot of a stylish woman sitting at an outdoor Parisian café. She is holding the frame, which is the clear focus, with a beautifully blurred background of the romantic street.' },
    { id: 'floral_garden_sunlight', nameKey: 'frameModel_floral_garden_sunlight', description: 'a soft and romantic shot of a woman with elegant hands holding the frame in a beautiful, sun-drenched floral garden. The background has soft-focus flowers, creating a dreamy atmosphere. The frame is the main focus.' },
    { id: 'rooftop_sunset_glamour', nameKey: 'frameModel_rooftop_sunset_glamour', description: 'a glamorous and stylish shot of a woman holding the frame on a rooftop bar at sunset. The warm glow of the sun creates a beautiful ambiance with a blurred city skyline. The frame is the main focus.' },
    { id: 'school_counselor_office', nameKey: 'frameModel_school_counselor_office', description: "The frame is hanging on a wall in a bright, welcoming, and organized school counselor's office. The background is softly blurred and includes elements like bookshelves, plants, and comfortable seating, creating a supportive and calm atmosphere." },
    { id: 'psychologist_office', nameKey: 'frameModel_psychologist_office', description: "The frame is placed on a wall in a calm and professional psychologist's office. The setting is serene and modern, with soft lighting, comfortable furniture, and a tranquil color palette, with the background softly out of focus." },
    { id: 'luxurious_american_office', nameKey: 'frameModel_luxurious_american_office', description: "A large-scale version of the frame is displayed as a central mural in a luxurious, modern American corporate office lobby. The setting features high ceilings, sleek furniture, large windows with a city view, and high-end materials, with the background elegantly blurred." },
];

export const MUG_STYLES: {id: MugStyle, nameKey: string}[] = [
    { id: 'classic_ceramic', nameKey: 'mugStyle_classic_ceramic' },
    { id: 'modern_glass', nameKey: 'mugStyle_modern_glass' },
    { id: 'vintage_enamel', nameKey: 'mugStyle_vintage_enamel' },
    { id: 'pearl_lustre_ceramic', nameKey: 'mugStyle_pearl_lustre_ceramic' },
    { id: 'gold_rimmed_porcelain', nameKey: 'mugStyle_gold_rimmed_porcelain' },
    { id: 'matte_pink_heart_handle', nameKey: 'mugStyle_matte_pink_heart_handle' },
    { id: 'scalloped_edge_teacup', nameKey: 'mugStyle_scalloped_edge_teacup' },
    { id: 'rose_gold_metallic', nameKey: 'mugStyle_rose_gold_metallic' },
];

export const MUG_MODELS: {id: MugModel, nameKey: string, description: string}[] = [
    { id: 'woman_cafe', nameKey: 'mugModel_woman_cafe', description: 'a woman sitting in a picturesque European-style cafe, smiling while wearing elegant clothing and holding the mug' },
    { id: 'man_office', nameKey: 'mugModel_man_office', description: 'a man in a modern office, holding the mug during a break' },
    { id: 'person_cozy_home', nameKey: 'mugModel_person_cozy_home', description: 'a person in a cozy, hygge-style living room, relaxing with the mug' },
];

export const SIPPER_GLASS_STYLES: {id: SipperGlassStyle, nameKey: string}[] = [
    { id: 'classic_can_shape', nameKey: 'sipperGlassStyle_classic_can_shape' },
    { id: 'modern_tapered', nameKey: 'sipperGlassStyle_modern_tapered' },
    { id: 'frosted_finish', nameKey: 'sipperGlassStyle_frosted_finish' },
    { id: 'rose_gold_rim_crystal', nameKey: 'sipperGlassStyle_rose_gold_rim_crystal' },
    { id: 'iridescent_holographic', nameKey: 'sipperGlassStyle_iridescent_holographic' },
    { id: 'etched_lace_pattern', nameKey: 'sipperGlassStyle_etched_lace_pattern' },
    { id: 'frosted_pink_ombre', nameKey: 'sipperGlassStyle_frosted_pink_ombre' },
    { id: 'stemless_pearl_finish', nameKey: 'sipperGlassStyle_stemless_pearl_finish' },
];

export const SIPPER_GLASS_MODELS: {id: SipperGlassModel, nameKey: string, description: string}[] = [
    { id: 'woman_cafe_elegant', nameKey: 'sipperGlassModel_woman_cafe_elegant', description: 'a young woman sitting in a cafe on a European or historical street, smiling and wearing elegant clothes, holding the sipper glass with a beverage inside' },
    { id: 'man_modern_kitchen', nameKey: 'sipperGlassModel_man_modern_kitchen', description: 'a man in a bright, modern kitchen, holding the sipper glass with a beverage inside' },
    { id: 'person_outdoor_patio', nameKey: 'sipperGlassModel_person_outdoor_patio', description: 'a person relaxing on a sunny outdoor patio, holding the sipper glass with a beverage inside' },
];

export const TUMBLER_STYLES: {id: TumblerStyle, nameKey: string}[] = [
    { id: 'stainless_steel', nameKey: 'tumblerStyle_stainless_steel' },
    { id: 'matte_finish', nameKey: 'tumblerStyle_matte_finish' },
    { id: 'glossy_white', nameKey: 'tumblerStyle_glossy_white' },
    { id: 'rose_gold_ombre_glitter', nameKey: 'tumblerStyle_rose_gold_ombre_glitter' },
    { id: 'pearlized_marble', nameKey: 'tumblerStyle_pearlized_marble' },
    { id: 'satin_finish_blush_pink', nameKey: 'tumblerStyle_satin_finish_blush_pink' },
    { id: 'lace_etched_crystal', nameKey: 'tumblerStyle_lace_etched_crystal' },
    { id: 'holographic_chrome', nameKey: 'tumblerStyle_holographic_chrome' },
    { id: 'soft_touch_lilac', nameKey: 'tumblerStyle_soft_touch_lilac' },
    { id: 'brushed_rose_gold', nameKey: 'tumblerStyle_brushed_rose_gold' },
    { id: 'watercolor_peony', nameKey: 'tumblerStyle_watercolor_peony' },
    { id: 'champagne_gold_glitter', nameKey: 'tumblerStyle_champagne_gold_glitter' },
    { id: 'minimalist_ceramic_matte', nameKey: 'tumblerStyle_minimalist_ceramic_matte' },
    { id: 'geode_crystal_rose_quartz', nameKey: 'tumblerStyle_geode_crystal_rose_quartz' },
    { id: 'mother_of_pearl_inlay', nameKey: 'tumblerStyle_mother_of_pearl_inlay' },
    { id: 'silk_wrapped_blossom', nameKey: 'tumblerStyle_silk_wrapped_blossom' },
    { id: 'liquid_marble_rose_gold', nameKey: 'tumblerStyle_liquid_marble_rose_gold' },
    { id: 'embossed_velvet', nameKey: 'tumblerStyle_embossed_velvet' },
    { id: 'soft_ombre_pearl', nameKey: 'tumblerStyle_soft_ombre_pearl' },
    { id: 'engraved_botanical_matte', nameKey: 'tumblerStyle_engraved_botanical_matte' },
    { id: 'gilded_agate_slice', nameKey: 'tumblerStyle_gilded_agate_slice' },
    { id: 'silk_ribbon_wrap', nameKey: 'tumblerStyle_silk_ribbon_wrap' },
    { id: 'cherry_blossom_emboss', nameKey: 'tumblerStyle_cherry_blossom_emboss' },
    { id: 'porcelain_rose_inlay', nameKey: 'tumblerStyle_porcelain_rose_inlay' },
    { id: 'opalescent_glass', nameKey: 'tumblerStyle_opalescent_glass' },
    { id: 'sculpted_floral_metal', nameKey: 'tumblerStyle_sculpted_floral_metal' },
    { id: 'pressed_wildflower_resin', nameKey: 'tumblerStyle_pressed_wildflower_resin' },
    { id: 'embroidered_linen_wrap', nameKey: 'tumblerStyle_embroidered_linen_wrap' },
    { id: 'rose_quartz_crystal_point', nameKey: 'tumblerStyle_rose_quartz_crystal_point' },
    { id: 'butterfly_wing_iridescent', nameKey: 'tumblerStyle_butterfly_wing_iridescent' },
    { id: 'vintage_porcelain_tea_rose', nameKey: 'tumblerStyle_vintage_porcelain_tea_rose' },
];

export const TUMBLER_MODELS: {id: TumblerModel, nameKey: string, description: string}[] = [
    { id: 'person_gym', nameKey: 'tumblerModel_person_gym', description: 'an athletic person at a modern gym, holding the tumbler' },
    { id: 'hiker_trail', nameKey: 'tumblerModel_hiker_trail', description: 'a hiker resting on a scenic mountain trail, holding the tumbler' },
    { id: 'student_desk', nameKey: 'tumblerModel_student_desk', description: 'a student studying at a desk in a well-lit room, with the tumbler nearby' },
    { id: 'woman_yoga_studio_close_up', nameKey: 'tumblerModel_woman_yoga_studio_close_up', description: 'a close-up shot of an athletic woman in a serene, sunlit yoga studio, holding the tumbler post-workout. The focus is on her relaxed expression and the tumbler, which takes up a large portion of the frame.' },
    { id: 'woman_luxury_spa_relaxing', nameKey: 'tumblerModel_woman_luxury_spa_relaxing', description: 'a close-up lifestyle shot of a woman relaxing at a luxury spa, with the tumbler on a marble side table next to her. The atmosphere is serene and pampering, with soft lighting. The tumbler is the main focus and fills the frame.' },
    { id: 'woman_beach_sunset_glow', nameKey: 'tumblerModel_woman_beach_sunset_glow', description: 'a glamorous close-up of a woman on a beautiful beach at sunset, holding the tumbler. The warm, golden hour light creates a soft, beautiful glow. The tumbler is the central focus and takes up a large area of the image.' },
    { id: 'woman_chic_home_office_break', nameKey: 'tumblerModel_woman_chic_home_office_break', description: 'a stylish close-up shot of a woman taking a break in her chic, modern home office. She is holding the tumbler, and the background is tastefully blurred. The focus is on the tumbler, which is prominently featured.' },
    { id: 'woman_rooftop_lounge_glam', nameKey: 'tumblerModel_woman_rooftop_lounge_glam', description: 'a stylish, glamorous shot of a woman in a rooftop lounge at dusk, with blurred city lights in the background. She is holding the tumbler, which is prominently featured and catches the city lights\' reflections. The tumbler takes up a large portion of the frame.' },
];

export const HALLOWEEN_TUMBLER_STYLES: {id: HalloweenTumblerStyle, nameKey: string}[] = [
    { id: 'glossy_black', nameKey: 'halloweenTumblerStyle_glossy_black' },
    { id: 'matte_black', nameKey: 'halloweenTumblerStyle_matte_black' },
    { id: 'stainless_steel', nameKey: 'halloweenTumblerStyle_stainless_steel' },
];

export const HALLOWEEN_TUMBLER_SETTINGS: {id: HalloweenTumblerSetting, nameKey: string, description: string}[] = [
    { id: 'spooky_table', nameKey: 'halloweenTumblerSetting_spooky_table', description: 'a festive Halloween scene on a wooden table, with out-of-focus pumpkins, candy corn, and spooky string lights in the background' },
    { id: 'haunted_house', nameKey: 'halloweenTumblerSetting_haunted_house', description: 'a moody, atmospheric setting in front of a slightly blurred, spooky haunted house at dusk' },
    { id: 'witchs_cauldron', nameKey: 'halloweenTumblerSetting_witchs_cauldron', description: 'a magical setting next to a bubbling witch\'s cauldron with glowing green smoke and potion ingredients scattered around' },
    { id: 'autumn_porch', nameKey: 'halloweenTumblerSetting_autumn_porch', description: 'a cozy autumn scene on a porch, surrounded by fall leaves, mums, and rustic decorations' },
    { id: 'glam_witch_boudoir', nameKey: 'halloweenTumblerSetting_glam_witch_boudoir', description: 'a close-up shot of the tumbler on a glamorous witch\'s vanity table, surrounded by elegant, out-of-focus items like velvet, silk, sparkling crystals, and romantic, soft candlelight. The atmosphere is mysterious, feminine, and elegant.' },
    { id: 'enchanted_moonlit_garden', nameKey: 'halloweenTumblerSetting_enchanted_moonlit_garden', description: 'a dreamy, close-up shot of the tumbler in an enchanted garden at night. The scene is illuminated by soft, magical moonlight and glowing, out-of-focus flowers. The atmosphere is soft, feminine, and mysterious, with the tumbler as the main focus.' },
    { id: 'vampires_velvet_lounge', nameKey: 'halloweenTumblerSetting_vampires_velvet_lounge', description: 'a chic and luxurious close-up of the tumbler resting on a plush, deep-red velvet surface in a gothic vampire\'s lounge. The background is dark and moody, with out-of-focus candelabras casting a warm, romantic glow. The tumbler is the central, glamorous focus.' },
    { id: 'pastel_goth_sweet_shop', nameKey: 'halloweenTumblerSetting_pastel_goth_sweet_shop', description: 'a chic and feminine close-up shot of the tumbler in a pastel goth sweet shop setting. The background features soft-focus, cute Halloween-themed candies and treats in pastel pinks, lavenders, and blacks. The overall vibe is soft, trendy, and sweet with an edgy twist.' },
    { id: 'mystical_crystal_ball_reading', nameKey: 'halloweenTumblerSetting_mystical_crystal_ball_reading', description: 'an alluring close-up of the tumbler on a dark wood table next to a softly glowing crystal ball. Wisps of incense smoke and out-of-focus tarot cards create a mystical and intimate atmosphere. The lighting is warm and focused on the tumbler, making it the star of the scene.' },
];

export const TUMBLER_TRIO_STYLES: {id: TumblerTrioStyle, nameKey: string}[] = [
    { id: 'glossy_white', nameKey: 'tumblerTrioStyle_glossy_white' },
    { id: 'matte_white', nameKey: 'tumblerTrioStyle_matte_white' },
    { id: 'stainless_steel', nameKey: 'tumblerTrioStyle_stainless_steel' },
];

export const TUMBLER_TRIO_SETTINGS: {id: TumblerTrioSetting, nameKey: string, description: string}[] = [
    { id: 'marble_countertop', nameKey: 'tumblerTrioSetting_marble_countertop', description: 'a clean, bright white marble countertop with soft, out-of-focus kitchen background elements' },
    { id: 'light_wood', nameKey: 'tumblerTrioSetting_light_wood', description: 'a light-colored wooden table with a soft, warm, and slightly blurred background' },
    { id: 'minimalist_shelf', nameKey: 'tumblerTrioSetting_minimalist_shelf', description: 'a simple, floating minimalist shelf against a plain, neutral-colored wall' },
];

export const PHONE_CASE_STYLES: {id: PhoneCaseStyle, nameKey: string}[] = [
    { id: 'glossy', nameKey: 'phoneCaseStyle_glossy' },
    { id: 'matte', nameKey: 'phoneCaseStyle_matte' },
    { id: 'clear', nameKey: 'phoneCaseStyle_clear' },
];

export const PHONE_CASE_MODELS: {id: PhoneCaseModel, nameKey: string, description: string}[] = [
    { id: 'person_holding', nameKey: 'phoneCaseModel_person_holding', description: 'a person with natural-looking hands holding a modern smartphone, showcasing the case' },
    { id: 'on_desk', nameKey: 'phoneCaseModel_on_desk', description: 'a modern smartphone in a case, placed on a stylish surface next to a laptop and a coffee mug, with a blurred background' },
    { id: 'flat_lay', nameKey: 'phoneCaseModel_flat_lay', description: 'a flat lay photo of a modern smartphone in a case on a clean, minimalist surface' },
    { id: 'glamorous_mirror_selfie', nameKey: 'phoneCaseModel_glamorous_mirror_selfie', description: 'a glamorous close-up shot of a woman\'s manicured hands holding a modern smartphone, taking a mirror selfie in a beautiful, elegant setting. The phone case is the clear focus of the image and takes up a large portion of the frame.' },
    { id: 'chic_cafe_lifestyle', nameKey: 'phoneCaseModel_chic_cafe_lifestyle', description: 'a chic, close-up lifestyle shot of a woman at an outdoor Parisian café. The smartphone is placed prominently on the marble table, showcasing the case. The background is beautifully blurred. The phone case is the main focus.' },
    { id: 'night_out_essential', nameKey: 'phoneCaseModel_night_out_essential', description: 'a stylish, glamorous close-up of a woman\'s manicured hands holding a modern smartphone, alongside a stylish clutch bag. The background is a blur of city lights at night, creating a sophisticated "night out" vibe. The phone case is the central focus.' },
    { id: 'cozy_bed_morning', nameKey: 'phoneCaseModel_cozy_bed_morning', description: 'a soft and intimate close-up shot of a woman lounging in a cozy bed with plush, white silk sheets, holding her smartphone. The morning light is soft and romantic. The focus is on the phone case, which is prominently displayed.' },
    { id: 'rooftop_golden_hour', nameKey: 'phoneCaseModel_rooftop_golden_hour', description: 'an attractive and stylish close-up of a woman holding her smartphone on a rooftop during the golden hour sunset. The warm light creates a beautiful glow. The focus is on the phone case, which takes up a large portion of the image.' },
];

export const STICKER_STYLES: {id: StickerStyle, nameKey: string}[] = [
    { id: 'die_cut_glossy', nameKey: 'stickerStyle_die_cut_glossy' },
    { id: 'kiss_cut_matte', nameKey: 'stickerStyle_kiss_cut_matte' },
    { id: 'holographic', nameKey: 'stickerStyle_holographic' },
];

export const STICKER_SETTINGS: {id: StickerSetting, nameKey: string, description: string}[] = [
    { id: 'on_laptop', nameKey: 'stickerSetting_on_laptop', description: 'a sticker placed on the corner of a modern laptop with a blurred background' },
    { id: 'on_water_bottle', nameKey: 'stickerSetting_on_water_bottle', description: 'a sticker placed on a sleek, modern water bottle' },
    { id: 'on_notebook', nameKey: 'stickerSetting_on_notebook', description: 'a sticker placed on the cover of a minimalist notebook or journal' },
];

export const POSTER_STYLES: {id: PosterStyle, nameKey: string}[] = [
    { id: 'glossy_finish', nameKey: 'posterStyle_glossy_finish' },
    { id: 'matte_finish', nameKey: 'posterStyle_matte_finish' },
];

export const POSTER_SETTINGS: {id: PosterSetting, nameKey: string, description: string}[] = [
    { id: 'framed_on_wall', nameKey: 'posterSetting_framed_on_wall', description: 'a poster in a simple, modern frame hanging on a well-lit wall in a stylish room' },
    { id: 'person_holding', nameKey: 'posterSetting_person_holding', description: 'a person with natural-looking hands holding up a poster, with a blurred, neutral background' },
    { id: 'taped_on_brick_wall', nameKey: 'posterSetting_taped_on_brick_wall', description: 'a poster casually taped to an urban-style exposed brick wall' },
];

export const WALLET_STYLES: {id: WalletStyle, nameKey: string}[] = [
    { id: 'bifold', nameKey: 'walletStyle_bifold' },
    { id: 'cardholder', nameKey: 'walletStyle_cardholder' },
    { id: 'zipper', nameKey: 'walletStyle_zipper' },
    { id: 'quilted_leather_chain', nameKey: 'walletStyle_quilted_leather_chain' },
    { id: 'pastel_pink_saffiano', nameKey: 'walletStyle_pastel_pink_saffiano' },
    { id: 'floral_embroidered_clutch', nameKey: 'walletStyle_floral_embroidered_clutch' },
    { id: 'rose_gold_metallic', nameKey: 'walletStyle_rose_gold_metallic' },
    { id: 'plush_velvet_pearl', nameKey: 'walletStyle_plush_velvet_pearl' },
    { id: 'satin_bow_clutch', nameKey: 'walletStyle_satin_bow_clutch' },
    { id: 'lace_and_silk_wallet', nameKey: 'walletStyle_lace_and_silk_wallet' },
    { id: 'pearl_encrusted_cardholder', nameKey: 'walletStyle_pearl_encrusted_cardholder' },
    { id: 'holographic_mermaid_wallet', nameKey: 'walletStyle_holographic_mermaid_wallet' },
    { id: 'plush_faux_fur_clutch', nameKey: 'walletStyle_plush_faux_fur_clutch' },
];

export const WALLET_MODELS: {id: WalletModel, nameKey: string, description: string}[] = [
    { id: 'person_holding', nameKey: 'walletModel_person_holding', description: 'a person with well-manicured hands holding a modern leather wallet, showcasing the front' },
    { id: 'flat_lay_desk', nameKey: 'walletModel_flat_lay_desk', description: 'a flat lay photo of a modern leather wallet next to a pen and notebook, with a blurred background' },
    { id: 'in_pocket', nameKey: 'walletModel_in_pocket', description: 'a modern leather wallet peeking out of the back pocket of a pair of stylish jeans' },
    { id: 'lounging_on_silk_sheets', nameKey: 'walletModel_lounging_on_silk_sheets', description: 'an elegant woman with beautiful hands lounging on luxurious silk sheets, holding the wallet close to the camera so it is the main focus' },
    { id: 'parisian_cafe_chic', nameKey: 'walletModel_parisian_cafe_chic', description: 'a stylish woman sitting at an outdoor Parisian café, with the wallet placed prominently on the table next to a cup of coffee and a croissant' },
    { id: 'boudoir_vanity_table', nameKey: 'walletModel_boudoir_vanity_table', description: 'a close-up flat lay of the wallet on a beautiful vanity table, surrounded by perfume bottles, jewelry, and soft lighting' },
    { id: 'floral_garden_sunlight', nameKey: 'walletModel_floral_garden_sunlight', description: 'a woman with elegant hands holding the wallet in a beautiful, sun-drenched floral garden, with soft-focus flowers in the background' },
    { id: 'rooftop_sunset_glamour', nameKey: 'walletModel_rooftop_sunset_glamour', description: 'a glamorous woman holding the wallet on a rooftop bar at sunset, with the warm glow of the sun creating a beautiful, chic ambiance and a blurred city skyline' },
];

export const CAP_STYLES: {id: CapStyle, nameKey: string}[] = [
    { id: 'structured_baseball', nameKey: 'capStyle_structured_baseball' },
    { id: 'unstructured_dad_hat', nameKey: 'capStyle_unstructured_dad_hat' },
    { id: 'snapback', nameKey: 'capStyle_snapback' },
    { id: 'floral_trucker', nameKey: 'capStyle_floral_trucker' },
    { id: 'satin_luxe', nameKey: 'capStyle_satin_luxe' },
    { id: 'pastel_suede', nameKey: 'capStyle_pastel_suede' },
    { id: 'bow_back_canvas', nameKey: 'capStyle_bow_back_canvas' },
    { id: 'lace_overlay_trucker', nameKey: 'capStyle_lace_overlay_trucker' },
    { id: 'pearl_embellished_denim', nameKey: 'capStyle_pearl_embellished_denim' },
    { id: 'velvet_baseball_cap', nameKey: 'capStyle_velvet_baseball_cap' },
    { id: 'silk_scarf_tie_hat', nameKey: 'capStyle_silk_scarf_tie_hat' },
];

export const CAP_MODELS: {id: CapModel, nameKey: string, description: string}[] = [
    { id: 'person_forwards', nameKey: 'capModel_person_forwards', description: 'a lifelike model wearing the cap forwards' },
    { id: 'person_backwards', nameKey: 'capModel_person_backwards', description: 'a lifelike model wearing the cap backwards' },
    { id: 'flat_lay', nameKey: 'capModel_flat_lay', description: 'a flat lay photo of the cap' },
];

export const BEANIE_STYLES: {id: BeanieStyle, nameKey: string}[] = [
    { id: 'cuffed', nameKey: 'beanieStyle_cuffed' },
    { id: 'slouchy', nameKey: 'beanieStyle_slouchy' },
    { id: 'pom_pom', nameKey: 'beanieStyle_pom_pom' },
    { id: 'angora_pearl', nameKey: 'beanieStyle_angora_pearl' },
    { id: 'chenille_heart_knit', nameKey: 'beanieStyle_chenille_heart_knit' },
    { id: 'slouchy_cashmere', nameKey: 'beanieStyle_slouchy_cashmere' },
    { id: 'luxe_faux_fur_pompom', nameKey: 'beanieStyle_luxe_faux_fur_pompom' },
    { id: 'satin_lined_slouchy', nameKey: 'beanieStyle_satin_lined_slouchy' },
    { id: 'floral_embroidery', nameKey: 'beanieStyle_floral_embroidery' },
    { id: 'sequin_knit', nameKey: 'beanieStyle_sequin_knit' },
    { id: 'veiled_beanie', nameKey: 'beanieStyle_veiled_beanie' },
    { id: 'beret_style', nameKey: 'beanieStyle_beret_style' },
    { id: 'cable_knit_heart_pattern', nameKey: 'beanieStyle_cable_knit_heart_pattern' },
    { id: 'ribbon_woven_beanie', nameKey: 'beanieStyle_ribbon_woven_beanie' },
    { id: 'mohair_fluffy_beanie', nameKey: 'beanieStyle_mohair_fluffy_beanie' },
    { id: 'crystal_scatter_beanie', nameKey: 'beanieStyle_crystal_scatter_beanie' },
];

export const BEANIE_MODELS: {id: BeanieModel, nameKey: string, description: string}[] = [
    { id: 'person_forwards', nameKey: 'beanieModel_person_forwards', description: 'a lifelike model wearing the beanie' },
    { id: 'person_side_profile', nameKey: 'beanieModel_person_side_profile', description: 'a side profile shot of a lifelike model wearing the beanie' },
    { id: 'cozy_window_seat', nameKey: 'beanieModel_cozy_window_seat', description: 'a close-up, intimate portrait of a beautiful model sitting on a cozy, soft-lit window seat, looking gently towards the camera. The focus is on her face and the beanie she is wearing.' },
    { id: 'sweater_weather_cuddle', nameKey: 'beanieModel_sweater_weather_cuddle', description: 'a very close-up shot of a model with a soft, serene expression, nuzzling into the collar of a plush, oversized knit sweater. The beanie is the main focus of the shot.' },
    { id: 'winter_wonderland_portrait', nameKey: 'beanieModel_winter_wonderland_portrait', description: 'a dreamy, close-up outdoor portrait of a model with rosy cheeks and a gentle smile, with a beautifully blurred background of soft, falling snow. The beanie is prominently featured.' },
    { id: 'playful_wink_smile', nameKey: 'beanieModel_playful_wink_smile', description: 'a dynamic close-up shot of a happy, beautiful model giving a playful wink and a charming smile to the camera. The beanie is worn stylishly and takes up a large portion of the frame.' },
    { id: 'cafe_steam_soft_light', nameKey: 'beanieModel_cafe_steam_soft_light', description: 'a close-up shot of a model in a charming café, holding a warm mug near her face. Wisps of steam rise softly, creating a dreamy, cozy atmosphere. The focus is on her serene expression and the beanie.' },
    { id: 'flat_lay', nameKey: 'beanieModel_flat_lay', description: 'a flat lay photo of the beanie' },
];

export const PILLOW_STYLES: {id: PillowStyle, nameKey: string}[] = [
    { id: 'square_cotton', nameKey: 'pillowStyle_square_cotton' },
    { id: 'lumbar_linen', nameKey: 'pillowStyle_lumbar_linen' },
    { id: 'round_velvet', nameKey: 'pillowStyle_round_velvet' },
    { id: 'plush_faux_fur_heart', nameKey: 'pillowStyle_plush_faux_fur_heart' },
    { id: 'satin_with_lace_trim', nameKey: 'pillowStyle_satin_with_lace_trim' },
    { id: 'round_velvet_with_tassel', nameKey: 'pillowStyle_round_velvet_with_tassel' },
    { id: 'silk_bolster', nameKey: 'pillowStyle_silk_bolster' },
    { id: 'ruffled_linen_square', nameKey: 'pillowStyle_ruffled_linen_square' },
    { id: 'sequin_mermaid_shimmer', nameKey: 'pillowStyle_sequin_mermaid_shimmer' },
    { id: 'tulle_and_pearl_overlay', nameKey: 'pillowStyle_tulle_and_pearl_overlay' },
    { id: 'chunky_knit_wool', nameKey: 'pillowStyle_chunky_knit_wool' },
    { id: 'silk_with_crystal_brooch', nameKey: 'pillowStyle_silk_with_crystal_brooch' },
];

export const PILLOW_SETTINGS: {id: PillowSetting, nameKey: string, description: string}[] = [
    { id: 'on_sofa', nameKey: 'pillowSetting_on_sofa', description: 'a stylish, modern sofa in a well-lit living room' },
    { id: 'on_bed', nameKey: 'pillowSetting_on_bed', description: 'a neatly made bed with plush duvets in a cozy bedroom' },
    { id: 'on_armchair', nameKey: 'pillowSetting_on_armchair', description: 'a comfortable armchair in a reading nook' },
    { id: 'luxury_boudoir_bed', nameKey: 'pillowSetting_luxury_boudoir_bed', description: 'a luxurious bed with soft, rumpled silk or satin sheets and romantic, diffused lighting. This is a close-up shot where the pillow is the main focus.' },
    { id: 'plush_window_nook', nameKey: 'pillowSetting_plush_window_nook', description: 'a cozy, plush window seat with soft morning light filtering through sheer curtains. This is a close-up shot where the pillow is the main focus.' },
    { id: 'chic_velvet_sofa', nameKey: 'pillowSetting_chic_velvet_sofa', description: 'a chic, modern velvet sofa, with a soft cashmere throw draped artfully nearby. This is a close-up shot where the pillow is the main focus.' },
    { id: 'faux_fur_rug_romance', nameKey: 'pillowSetting_faux_fur_rug_romance', description: 'a plush, soft white faux fur rug, with a few out-of-focus, delicate flower petals scattered around. This is a close-up, top-down shot where the pillow is the main focus.' },
    { id: 'dreamy_chaise_lounge', nameKey: 'pillowSetting_dreamy_chaise_lounge', description: 'an elegant chaise lounge in a beautifully lit, serene room, creating a sense of dreamy relaxation. This is a close-up shot where the pillow is the main focus.' },
];

export const FLAT_LAY_STYLES: {id: FlatLayStyle, nameKey: string, description: string}[] = [
    { id: 'minimalist_neutral', nameKey: 'flatLayStyle_minimalist_neutral', description: 'a clean, minimalist theme with simple, elegant accessories like a pair of sunglasses, a watch, and a small plant.' },
    { id: 'rustic_outdoors', nameKey: 'flatLayStyle_rustic_outdoors', description: 'a rustic, outdoors theme, surrounded by items like hiking boots, a compass, a leather-bound journal, and some pine cones.' },
    { id: 'urban_streetwear', nameKey: 'flatLayStyle_urban_streetwear', description: 'an urban streetwear theme, accompanied by accessories like trendy sneakers, a beanie, headphones, and a skateboard deck.' },
    { id: 'cozy_autumn', nameKey: 'flatLayStyle_cozy_autumn', description: 'a cozy autumn theme, featuring items like a knitted scarf, a steaming mug of coffee, fall leaves, and a book.' },
    { id: 'beach_vacation', nameKey: 'flatLayStyle_beach_vacation', description: 'a bright, beach vacation theme, with accessories like sandals, a straw hat, seashells, and a pair of sunglasses.' },
    { id: 'tech_gadget', nameKey: 'flatLayStyle_tech_gadget', description: 'a modern tech and gadget theme, surrounded by sleek accessories like wireless earbuds, a smartwatch, a minimalist keyboard, and stylish glasses.' },
    { id: 'coffee_lover', nameKey: 'flatLayStyle_coffee_lover', description: 'a coffee lover theme, presented next to a ceramic mug of black coffee, roasted coffee beans, a silver coffee spoon, and a leather-bound notebook.' },
    { id: 'fitness_active', nameKey: 'flatLayStyle_fitness_active', description: 'a fitness and active lifestyle theme, arranged with items like a water bottle, a rolled-up yoga mat, a pair of dumbbells, and a healthy snack like an apple.' },
    { id: 'bookworm_academic', nameKey: 'flatLayStyle_bookworm_academic', description: 'an academic, bookworm theme, featuring open books, a pair of reading glasses, a fountain pen, and a cup of tea.' },
    { id: 'artists_studio', nameKey: 'flatLayStyle_artists_studio', description: 'an artist\'s studio theme, surrounded by paintbrushes, tubes of acrylic paint, a sketchbook with a charcoal drawing, and some spilled paint splatters.' },
    { id: 'gourmet_kitchen', nameKey: 'flatLayStyle_gourmet_kitchen', description: 'a gourmet kitchen theme, accompanied by a wooden cutting board, fresh herbs like rosemary, a chef\'s knife, and scattered peppercorns.' },
    { id: 'bohemian_chic', nameKey: 'flatLayStyle_bohemian_chic', description: 'a bohemian chic theme, featuring accessories like a fringed suede bag, turquoise jewelry, a wide-brimmed felt hat, and a few sprigs of dried lavender.' },
    { id: 'glamorous_night_out', nameKey: 'flatLayStyle_glamorous_night_out', description: 'a glamorous night-out theme, with items like a sequined clutch, a pair of elegant high heels, a tube of red lipstick, and a bottle of luxury perfume.' },
    { id: 'home_spa_day', nameKey: 'flatLayStyle_home_spa_day', description: 'a relaxing home spa day theme, surrounded by a scented candle, a clay face mask in a small bowl, a fluffy white towel, and scattered bath salts.' },
    { id: 'digital_nomad_female', nameKey: 'flatLayStyle_digital_nomad_female', description: 'a female digital nomad theme, featuring a passport, a sleek laptop, stylish wireless headphones, a Moleskine journal, and a cup of artisanal coffee.' },
    { id: 'baking_enthusiast', nameKey: 'flatLayStyle_baking_enthusiast', description: 'a baking enthusiast theme, with props like a wooden rolling pin, a dusting of flour, heart-shaped cookie cutters, and a small bowl of fresh strawberries.' },
    { id: 'parisian_chic', nameKey: 'flatLayStyle_parisian_chic', description: 'a chic, Parisian theme, featuring a silk scarf, a classic book, a tube of red lipstick, and delicate gold jewelry.' },
    { id: 'cottagecore_dream', nameKey: 'flatLayStyle_cottagecore_dream', description: 'a dreamy cottagecore theme, with fresh wildflowers, a vintage teacup, embroidered linen, and a book of poetry.' },
    { id: 'sakura_spring', nameKey: 'flatLayStyle_sakura_spring', description: 'a beautiful Japanese spring theme, with delicate cherry blossom branches, a matcha tea bowl, and a traditional fan.' },
    { id: 'luxe_vanity', nameKey: 'flatLayStyle_luxe_vanity', description: 'a luxurious vanity theme, with elegant perfume bottles, rose gold makeup brushes, a pearl necklace, and a piece of silk fabric.' },
    { id: 'watercolor_artist', nameKey: 'flatLayStyle_watercolor_artist', description: 'a creative watercolor artist theme, with a palette of soft pastel paints, fine brushes, and a floral painting in progress.' },
    { id: 'flat_lay_folded_close_up', nameKey: 'flatLayStyle_flat_lay_folded_close_up', description: 'a close-up, top-down shot of the t-shirt neatly folded to prominently display the central design area. Minimal props are blurred in the background.' },
    { id: 'flat_lay_draped_close_up', nameKey: 'flatLayStyle_flat_lay_draped_close_up', description: 'an artistic, close-up shot of the t-shirt artfully draped with soft wrinkles, with the design area as the main focus.' },
    { id: 'flat_lay_pocket_region_close_up', nameKey: 'flatLayStyle_flat_lay_pocket_region_close_up', description: 'an extreme close-up shot focused on the upper chest/pocket area of the t-shirt, ideal for showcasing smaller logos.' },
    { id: 'flat_lay_texture_close_up', nameKey: 'flatLayStyle_flat_lay_texture_close_up', description: 'an extreme close-up, macro-style shot showcasing the design on the detailed texture of the fabric (e.g., cotton weave).' },
    { id: 'boudoir_vanity_glamour', nameKey: 'flatLayStyle_boudoir_vanity_glamour', description: "a close-up, glamorous flat lay of the t-shirt artfully arranged on a beautiful vanity table. The scene is surrounded by elegant, out-of-focus props like perfume bottles, delicate jewelry, and a silk robe under soft, romantic lighting." },
    { id: 'parisian_cafe_lifestyle', nameKey: 'flatLayStyle_parisian_cafe_lifestyle', description: "a chic, close-up lifestyle flat lay of the t-shirt neatly folded on a marble Parisian café table. The scene includes beautifully blurred, out-of-focus props like a cup of coffee, a croissant, and a vintage book." },
    { id: 'silk_sheets_romance', nameKey: 'flatLayStyle_silk_sheets_romance', description: "a soft and romantic close-up flat lay of the t-shirt casually draped on luxurious, rumpled silk or satin sheets. The scene is accented with scattered, out-of-focus rose petals and soft morning light." },
    { id: 'cherry_blossom_dreamscape', nameKey: 'flatLayStyle_cherry_blossom_dreamscape', description: "a dreamy, close-up flat lay of the t-shirt on a soft, light-colored surface. The scene is framed with delicate, out-of-focus cherry blossom branches and scattered petals, creating a soft and feminine atmosphere." },
    { id: 'watercolor_artist_studio', nameKey: 'flatLayStyle_watercolor_artist_studio', description: "a creative and feminine close-up flat lay of the t-shirt in a bright artist's studio. The scene features beautifully arranged, out-of-focus props like a watercolor palette, fine brushes, a sketchbook with a floral painting, and a delicate teacup." },
    { id: 'vintage_love_letters', nameKey: 'flatLayStyle_vintage_love_letters', description: 'a romantic flat lay featuring aged love letters, a fountain pen, a wax seal, and scattered dried rose petals.' },
    { id: 'ballet_core_elegance', nameKey: 'flatLayStyle_ballet_core_elegance', description: 'an elegant "balletcore" themed flat lay with ballet slippers, a silk ribbon, pearls, and delicate tulle fabric.' },
    { id: 'luxe_skincare_shelfie', nameKey: 'flatLayStyle_luxe_skincare_shelfie', description: 'a luxurious "shelfie" flat lay with beautifully packaged skincare products, a jade roller, and a silk eye mask.' },
    { id: 'afternoon_high_tea', nameKey: 'flatLayStyle_afternoon_high_tea', description: 'a delicate afternoon high tea flat lay with a vintage teacup, a macaron, a silver spoon, and a small bouquet of flowers.' },
    { id: 'princess_dream_vanity', nameKey: 'flatLayStyle_princess_dream_vanity', description: 'a dreamy "princesscore" flat lay on a vanity with a vintage hand mirror, a crystal perfume bottle, a tiara, and sparkling jewelry.' },
];

export const PUZZLE_STYLES: {id: PuzzleStyle, nameKey: string}[] = [
    { id: 'rectangle_cardboard', nameKey: 'puzzleStyle_rectangle_cardboard' },
    { id: 'heart_shaped_wood', nameKey: 'puzzleStyle_heart_shaped_wood' },
];

export const PUZZLE_SETTINGS: {id: PuzzleSetting, nameKey: string, description: string}[] = [
    { id: 'on_wooden_table', nameKey: 'puzzleSetting_on_wooden_table', description: 'a blank jigsaw puzzle on a rustic wooden table with soft, warm lighting and a blurred background' },
    { id: 'family_playing', nameKey: 'puzzleSetting_family_playing', description: 'the hands of a family gathered around a table, about to start working on the blank jigsaw puzzle, with a cozy home background' },
    { id: 'flat_lay_minimalist', nameKey: 'puzzleSetting_flat_lay_minimalist', description: 'a flat lay of the blank jigsaw puzzle on a clean, minimalist neutral-colored surface' },
];

export const LAPTOP_SLEEVE_STYLES: {id: LaptopSleeveStyle, nameKey: string}[] = [
    { id: 'neoprene', nameKey: 'laptopSleeveStyle_neoprene' },
    { id: 'leather_folio', nameKey: 'laptopSleeveStyle_leather_folio' },
    { id: 'canvas_pouch', nameKey: 'laptopSleeveStyle_canvas_pouch' },
];

export const LAPTOP_SLEEVE_SETTINGS: {id: LaptopSleeveSetting, nameKey: string, description: string}[] = [
    { id: 'on_desk_modern', nameKey: 'laptopSleeveSetting_on_desk_modern', description: 'a laptop sleeve placed on a modern, organized desk next to a sleek laptop and a cup of coffee' },
    { id: 'person_carrying_street', nameKey: 'laptopSleeveSetting_person_carrying_street', description: 'a stylish person walking down a blurred city street, carrying the laptop sleeve under their arm' },
    { id: 'flat_lay_minimalist', nameKey: 'laptopSleeveSetting_flat_lay_minimalist', description: 'a flat lay of the laptop sleeve on a clean, minimalist background with a few tech accessories like earbuds and a mouse' },
];


export const DESIGN_STYLES: {id: DesignStyle, nameKey: string}[] = [
    { id: 'classic', nameKey: 'designStyle_classic' },
    { id: 'upper_half_circle', nameKey: 'designStyle_upper_half_circle' },
    { id: 'lower_half_circle', nameKey: 'designStyle_lower_half_circle' },
    { id: 'upper_oval', nameKey: 'designStyle_upper_oval' },
    { id: 'lower_oval', nameKey: 'designStyle_lower_oval' },
    { id: 'full_circle', nameKey: 'designStyle_full_circle' },
    { id: 'split', nameKey: 'designStyle_split' },
    { id: 'sketch', nameKey: 'designStyle_sketch' },
    { id: 'slasher', nameKey: 'designStyle_slasher' },
    { id: 'vintage_stamp', nameKey: 'designStyle_vintage_stamp' },
    { id: 'retro_wave', nameKey: 'designStyle_retro_wave' },
    { id: 'minimalist_line', nameKey: 'designStyle_minimalist_line' },
    { id: 'grunge_overlay', nameKey: 'designStyle_grunge_overlay' },
    { id: 'stacked_text', nameKey: 'designStyle_stacked_text' },
    { id: 'emblem', nameKey: 'designStyle_emblem' },
    { id: 'photo_text', nameKey: 'designStyle_photo_text' },
    { id: 'cyberpunk_glitch', nameKey: 'designStyle_cyberpunk_glitch' },
    { id: 'full_wrap', nameKey: 'designStyle_full_wrap' },
    { id: 'full_front', nameKey: 'designStyle_full_front' },
    { id: 'american_traditional_tattoo', nameKey: 'designStyle_american_traditional_tattoo' },
    { id: 'watercolor_splash', nameKey: 'designStyle_watercolor_splash' },
    { id: 'art_deco', nameKey: 'designStyle_art_deco' },
    { id: 'pop_art', nameKey: 'designStyle_pop_art' },
    { id: 'cosmic_galaxy', nameKey: 'designStyle_cosmic_galaxy' },
    { id: 'japanese_ukiyo-e', nameKey: 'designStyle_japanese_ukiyo_e' },
    { id: 'distressed_vintage', nameKey: 'designStyle_distressed_vintage' },
    { id: 'typography_focus', nameKey: 'designStyle_typography_focus' },
    { id: 'abstract_geometric', nameKey: 'designStyle_abstract_geometric' },
    { id: 'vintage_poster', nameKey: 'designStyle_vintage_poster' },
    { id: 'geometric_pattern', nameKey: 'designStyle_geometric_pattern' },
    { id: 'hand_drawn_sketch', nameKey: 'designStyle_hand_drawn_sketch' },
    { id: 'boho_floral_wreath', nameKey: 'designStyle_boho_floral_wreath' },
    { id: 'girly_script_heart', nameKey: 'designStyle_girly_script_heart' },
    { id: 'celestial_moon_phases', nameKey: 'designStyle_celestial_moon_phases' },
    { id: 'glam_leopard_print', nameKey: 'designStyle_glam_leopard_print' },
    { id: 'kawaii_cute_doodle', nameKey: 'designStyle_kawaii_cute_doodle' },
    { id: 'watercolor_blooms', nameKey: 'designStyle_watercolor_blooms' },
    { id: 'gold_foil_accents', nameKey: 'designStyle_gold_foil_accents' },
    { id: 'lace_trim_border', nameKey: 'designStyle_lace_trim_border' },
    { id: 'pastel_tie_dye', nameKey: 'designStyle_pastel_tie_dye' },
    { id: 'starry_night_sky', nameKey: 'designStyle_starry_night_sky' },
    { id: 'cherry_blossom_dream', nameKey: 'designStyle_cherry_blossom_dream' },
    { id: 'satin_lace_trim', nameKey: 'designStyle_satin_lace_trim' },
    { id: 'rose_gold_glitter', nameKey: 'designStyle_rose_gold_glitter' },
    { id: 'dreamy_angel_wings', nameKey: 'designStyle_dreamy_angel_wings' },
    { id: 'sensual_smoke_perfume', nameKey: 'designStyle_sensual_smoke_perfume' },
];

export const TEXT_STYLES: {id: TextStyle, nameKey: string}[] = [
    { id: 'none', nameKey: 'textStyle_none' },
    { id: 'outline', nameKey: 'textStyle_outline' },
    { id: 'shadow', nameKey: 'textStyle_shadow' },
    { id: 'glow', nameKey: 'textStyle_glow' },
    { id: 'neon', nameKey: 'textStyle_neon' },
    { id: '3d', nameKey: 'textStyle_3d' },
    { id: 'metallic', nameKey: 'textStyle_metallic' },
    { id: 'chrome', nameKey: 'textStyle_chrome' },
    { id: 'gradient', nameKey: 'textStyle_gradient' },
    { id: 'pastel_rainbow', nameKey: 'textStyle_pastel_rainbow' },
    { id: 'distressed', nameKey: 'textStyle_distressed' },
    { id: 'fire', nameKey: 'textStyle_fire' },
    { id: 'ice', nameKey: 'textStyle_ice' },
    { id: 'wooden', nameKey: 'textStyle_wooden' },
    { id: 'comic', nameKey: 'textStyle_comic' },
    { id: 'glitch', nameKey: 'textStyle_glitch' },
    { id: 'script', nameKey: 'textStyle_script' },
    { id: 'varsity', nameKey: 'textStyle_varsity' },
];

export const BACKGROUND_STYLES: {id: BackgroundStyle, nameKey: string}[] = [
    { id: 'studio', nameKey: 'backgroundStyle_studio' },
    { id: 'urban_street', nameKey: 'backgroundStyle_urban_street' },
    { id: 'natural_landscape', nameKey: 'backgroundStyle_natural_landscape' },
    { id: 'dreamy_bokeh_lights', nameKey: 'backgroundStyle_dreamy_bokeh_lights' },
    { id: 'luxury_silk_drape', nameKey: 'backgroundStyle_luxury_silk_drape' },
    { id: 'rose_petal_bed', nameKey: 'backgroundStyle_rose_petal_bed' },
    { id: 'sunset_beach_glow', nameKey: 'backgroundStyle_sunset_beach_glow' },
    { id: 'elegant_boudoir', nameKey: 'backgroundStyle_elegant_boudoir' },
    { id: 'plush_velvet_couch', nameKey: 'backgroundStyle_plush_velvet_couch' },
    { id: 'cherry_blossom_dreamscape', nameKey: 'backgroundStyle_cherry_blossom_dreamscape' },
    { id: 'satin_sheets_boudoir', nameKey: 'backgroundStyle_satin_sheets_boudoir' },
    { id: 'golden_hour_meadow', nameKey: 'backgroundStyle_golden_hour_meadow' },
    { id: 'sparkling_champagne_bokeh', nameKey: 'backgroundStyle_sparkling_champagne_bokeh' },
    { id: 'ethereal_clouds_sky', nameKey: 'backgroundStyle_ethereal_clouds_sky' },
    { id: 'enchanted_forest_light', nameKey: 'backgroundStyle_enchanted_forest_light' },
    { id: 'glittering_water_surface', nameKey: 'backgroundStyle_glittering_water_surface' },
    { id: 'opulent_ballroom', nameKey: 'backgroundStyle_opulent_ballroom' },
    { id: 'vintage_bookstore', nameKey: 'backgroundStyle_vintage_bookstore' },
    { id: 'woodland_camo', nameKey: 'backgroundStyle_woodland_camo' },
    { id: 'desert_camo', nameKey: 'backgroundStyle_desert_camo' },
    { id: 'urban_camo', nameKey: 'backgroundStyle_urban_camo' },
    { id: 'digital_camo', nameKey: 'backgroundStyle_digital_camo' },
];

export const PROFESSIONAL_BACKGROUNDS: {id: ProfessionalBackground, nameKey: string, description: string}[] = [
    // Stone
    { id: 'white_marble', nameKey: 'professionalBackground_white_marble', description: 'a clean, polished white marble slab with subtle grey veining' },
    { id: 'black_slate', nameKey: 'professionalBackground_black_slate', description: 'a dark, textured slate stone surface with natural imperfections' },
    { id: 'pink_marble', nameKey: 'professionalBackground_pink_marble', description: 'a soft pink marble surface with delicate white and gold veining' },
    { id: 'raw_concrete', nameKey: 'professionalBackground_raw_concrete', description: 'a smooth, raw concrete surface with a minimalist, industrial feel' },
    { id: 'terrazzo_stone', nameKey: 'professionalBackground_terrazzo_stone', description: 'a modern terrazzo stone surface with colorful, polished stone chips' },
    { id: 'mother_of_pearl', nameKey: 'professionalBackground_mother_of_pearl', description: 'an iridescent mother of pearl surface with rainbow-like reflections' },
    // Wood
    { id: 'rich_walnut', nameKey: 'professionalBackground_rich_walnut', description: 'a rich, dark walnut wood surface with a smooth, polished finish' },
    { id: 'light_oak', nameKey: 'professionalBackground_light_oak', description: 'a light-colored oak wood surface with a visible grain' },
    { id: 'whitewashed_wood', nameKey: 'professionalBackground_whitewashed_wood', description: 'a soft, whitewashed wood plank surface with a rustic, shabby-chic feel' },
    { id: 'bamboo_wood', nameKey: 'professionalBackground_bamboo_wood', description: 'a clean, light-colored bamboo wood surface showing the characteristic grain and nodes' },
    { id: 'cherry_wood', nameKey: 'professionalBackground_cherry_wood', description: 'a smooth, reddish-brown cherry wood surface with a fine, straight grain' },
    { id: 'maple_wood', nameKey: 'professionalBackground_maple_wood', description: 'a creamy white to light brown maple wood surface with a subtle, smooth grain pattern' },
    { id: 'walnut_wood_dark', nameKey: 'professionalBackground_walnut_wood_dark', description: 'a deep, dark, and luxurious walnut wood surface with rich, complex grain patterns' },
    { id: 'pine_wood_light', nameKey: 'professionalBackground_pine_wood_light', description: 'a light-colored pine wood surface with prominent knots and a distinct grain' },
    { id: 'acacia_wood', nameKey: 'professionalBackground_acacia_wood', description: 'a durable acacia wood surface with a distinctive, often varied grain and warm, rich tones' },
    { id: 'olive_wood', nameKey: 'professionalBackground_olive_wood', description: 'a highly figured olive wood surface with beautiful, chaotic, and artistic grain patterns in contrasting yellow and brown tones' },
    { id: 'rustic_reclaimed_wood', nameKey: 'professionalBackground_rustic_reclaimed_wood', description: 'a rustic surface of reclaimed wood planks, showing age, texture, nail holes, and a weathered patina' },
    { id: 'zebrawood', nameKey: 'professionalBackground_zebrawood', description: 'a dramatic zebrawood surface with bold, contrasting dark stripes over a lighter background' },
    { id: 'ebony_wood', nameKey: 'professionalBackground_ebony_wood', description: 'a dense, luxurious, and almost pure black ebony wood surface with a very fine, smooth texture' },
    // Metal & Glitter
    { id: 'brushed_metal', nameKey: 'professionalBackground_brushed_metal', description: 'a sleek, brushed aluminum metal surface with a non-reflective finish' },
    { id: 'polished_rose_gold', nameKey: 'professionalBackground_polished_rose_gold', description: 'a sleek, polished rose gold metal surface with soft, elegant reflections' },
    { id: 'rose_gold_glitter', nameKey: 'professionalBackground_rose_gold_glitter', description: 'a shimmering rose gold glitter surface with a beautiful bokeh effect' },
    { id: 'cracked_gold_leaf', nameKey: 'professionalBackground_cracked_gold_leaf', description: 'a distressed, cracked gold leaf surface with an elegant, antique feel' },
    { id: 'holographic_foil', nameKey: 'professionalBackground_holographic_foil', description: 'an iridescent, shimmering holographic foil surface that catches the light' },
    // Fabric & Textile
    { id: 'dark_leather', nameKey: 'professionalBackground_dark_leather', description: 'a dark brown or black textured leather surface' },
    { id: 'textured_linen', nameKey: 'professionalBackground_textured_linen', description: 'a natural, textured linen fabric in a neutral color like beige or light gray' },
    { id: 'natural_jute_mat', nameKey: 'professionalBackground_natural_jute_mat', description: 'a textured, woven natural jute mat with a rustic, organic feel' },
    { id: 'plush_velvet_fabric', nameKey: 'professionalBackground_plush_velvet_fabric', description: 'a luxurious, deep-colored plush velvet fabric background, artfully draped with soft folds' },
    { id: 'soft_pink_velvet', nameKey: 'professionalBackground_soft_pink_velvet', description: 'a luxurious, soft pink plush velvet fabric, artfully draped with gentle folds' },
    { id: 'blush_pink_silk', nameKey: 'professionalBackground_blush_pink_silk', description: 'a soft, blush pink silk fabric, elegantly draped with gentle, shimmering folds' },
    { id: 'white_lace_overlay', nameKey: 'professionalBackground_white_lace_overlay', description: 'a delicate white lace fabric overlaying a soft pastel background' },
    // Specialty / Patterned
    { id: 'vintage_floral_wallpaper', nameKey: 'professionalBackground_vintage_floral_wallpaper', description: 'an elegant, vintage floral wallpaper pattern with a soft, faded look' },
];

export const MODEL_POSES: {id: ModelPose, nameKey: string}[] = [
    { id: 'flat_lay_simple', nameKey: 'modelPose_flat_lay_simple' },
    { id: 'standing', nameKey: 'modelPose_standing' },
    { id: 'closeup_casual', nameKey: 'modelPose_closeup_casual' },
    { id: 'sitting', nameKey: 'modelPose_sitting' },
    { id: 'sitting_floor_cozy', nameKey: 'modelPose_sitting_floor_cozy' },
    { id: 'sitting_hand_hip', nameKey: 'modelPose_sitting_hand_hip' },
    { id: 'sitting_on_counter', nameKey: 'modelPose_sitting_on_counter' },
    { id: 'sultry_shoulder_look', nameKey: 'modelPose_sultry_shoulder_look' },
    { id: 'gentle_touch_face', nameKey: 'modelPose_gentle_touch_face' },
    { id: 'windswept_hair_dreamy', nameKey: 'modelPose_windswept_hair_dreamy' },
    { id: 'lounging_on_silk', nameKey: 'modelPose_lounging_on_silk' },
    { id: 'playful_peekaboo', nameKey: 'modelPose_playful_peekaboo' },
    { id: 'cozy_sweater_hug', nameKey: 'modelPose_cozy_sweater_hug' },
    { id: 'sun_kissed_glow_portrait', nameKey: 'modelPose_sun_kissed_glow_portrait' },
    { id: 'playful_hair_toss_laugh', nameKey: 'modelPose_playful_hair_toss_laugh' },
    { id: 'meadow_daydream_top_down', nameKey: 'modelPose_meadow_daydream_top_down' },
    { id: 'city_lights_glamour', nameKey: 'modelPose_city_lights_glamour' },
    { id: 'delicate_flower_touch', nameKey: 'modelPose_delicate_flower_touch' },
    { id: 'parisian_balcony_daydream', nameKey: 'modelPose_parisian_balcony_daydream' },
    { id: 'cozy_cafe_window_rain', nameKey: 'modelPose_cozy_cafe_window_rain' },
    { id: 'secret_garden_reading', nameKey: 'modelPose_secret_garden_reading' },
    { id: 'vintage_car_glamour', nameKey: 'modelPose_vintage_car_glamour' },
    { id: 'recumbent', nameKey: 'modelPose_recumbent' },
    { id: 'smiling_glasses', nameKey: 'modelPose_smiling_glasses' },
    { id: 'back', nameKey: 'modelPose_back' },
    { id: 'drinking_tea', nameKey: 'modelPose_drinking_tea' },
    { id: 'jumping', nameKey: 'modelPose_jumping' },
    { id: 'dancing', nameKey: 'modelPose_dancing' },
    { id: 'meditating', nameKey: 'modelPose_meditating' },
    { id: 'heroic', nameKey: 'modelPose_heroic' },
    { id: 'action', nameKey: 'modelPose_action' },
    { id: 'yoga', nameKey: 'modelPose_yoga' },
    { id: 'casual_lean', nameKey: 'modelPose_casual_lean' },
    { id: 'walking_street', nameKey: 'modelPose_walking_street' },
    { id: 'laughing', nameKey: 'modelPose_laughing' },
    { id: 'arms_crossed', nameKey: 'modelPose_arms_crossed' },
    { id: 'thinking', nameKey: 'modelPose_thinking' },
    { id: 'hands_in_pockets', nameKey: 'modelPose_hands_in_pockets' },
    { id: 'sitting_floor_relaxed', nameKey: 'modelPose_sitting_floor_relaxed' },
    { id: 'sitting_cross_legged_side', nameKey: 'modelPose_sitting_cross_legged_side' },
    { id: 'leaning_on_floor', nameKey: 'modelPose_leaning_on_floor' },
    { id: 'standing_three_quarter_hands_pockets', nameKey: 'modelPose_standing_three_quarter_hands_pockets' },
    { id: 'standing_rear_three_quarter', nameKey: 'modelPose_standing_rear_three_quarter' },
    { id: 'sitting_top_down', nameKey: 'modelPose_sitting_top_down' },
    { id: 'low_angle_arms_crossed', nameKey: 'modelPose_low_angle_arms_crossed' },
    { id: 'closeup_chest_design', nameKey: 'modelPose_closeup_chest_design' },
    { id: 'full_body_slouched', nameKey: 'modelPose_full_body_slouched' },
    { id: 'sitting_on_chair_dynamic', nameKey: 'modelPose_sitting_on_chair_dynamic' },
];

export const MODEL_AUDIENCES: {id: ModelAudience, nameKey: string, description: string}[] = [
    // Female Models
    { id: 'teenager_female_skater', nameKey: 'modelAudience_teenager_female_skater', description: 'a female teenager with a cool skater style' },
    { id: 'woman_20s_barista', nameKey: 'modelAudience_woman_20s_barista', description: 'a young woman with a friendly barista style, perhaps with an apron' },
    { id: 'woman_20s_urban_fashion', nameKey: 'modelAudience_woman_20s_urban_fashion', description: 'a young woman in trendy, stylish urban fashion' },
    { id: 'woman_stylish_redhead', nameKey: 'modelAudience_woman_stylish_redhead', description: 'a stylish young woman with orange-red hair styled with bangs' },
    { id: 'woman_20s_athletic', nameKey: 'modelAudience_woman_20s_athletic', description: 'a woman with an athletic build, in sporty-casual clothing' },
    { id: 'woman_30s_casual', nameKey: 'modelAudience_woman_30s_casual', description: 'a woman with a relaxed and casual style' },
    { id: 'woman_30s_yogi', nameKey: 'modelAudience_woman_30s_yogi', description: 'a woman in comfortable activewear, with a calm and serene yogi vibe' },
    { id: 'woman_30s_plus_size_confident', nameKey: 'modelAudience_woman_30s_plus_size_confident', description: 'a confident and happy plus-size woman with a stylish, modern look' },
    { id: 'woman_40s_professional', nameKey: 'modelAudience_woman_40s_professional', description: 'a woman with a sharp, professional appearance' },
    { id: 'middle_aged_woman_artist', nameKey: 'modelAudience_middle_aged_woman_artist', description: 'a middle-aged woman with an artistic and creative style' },
    { id: 'woman_40s_edgy_tattoos', nameKey: 'modelAudience_woman_40s_edgy_tattoos', description: 'a stylish middle-aged woman with visible artistic tattoos on her arms' },
    { id: 'woman_50s_elegant', nameKey: 'modelAudience_woman_50s_elegant', description: 'an elegant and sophisticated woman' },
    { id: 'woman_50s_traveler', nameKey: 'modelAudience_woman_50s_traveler', description: 'an energetic, mature woman dressed for travel, perhaps with a camera' },
    { id: 'elderly_woman_gardener', nameKey: 'modelAudience_elderly_woman_gardener', description: 'an elderly woman with a warm smile, dressed for gardening' },
    { id: 'elderly_woman_baker', nameKey: 'modelAudience_elderly_woman_baker', description: 'a kind, grandmotherly woman in an apron, looking like she just finished baking' },
    
    // Male Models
    { id: 'teenager_male_gamer', nameKey: 'modelAudience_teenager_male_gamer', description: 'a male teenager with a gamer style, perhaps wearing headphones around his neck' },
    { id: 'man_20s_student', nameKey: 'modelAudience_man_20s_student', description: 'a young man with a student style' },
    { id: 'young_man_musician', nameKey: 'modelAudience_young_man_musician', description: 'a young man with a creative, musician-like appearance' },
    { id: 'man_30s_creative', nameKey: 'modelAudience_man_30s_creative', description: 'a creative professional man' },
    { id: 'man_40s_business', nameKey: 'modelAudience_man_40s_business', description: 'a man in business-casual style' },
    { id: 'man_50s_distinguished', nameKey: 'modelAudience_man_50s_distinguished', description: 'a distinguished-looking man' },
];

export const TSHIRT_FONTS: {id: TshirtFont, name: string}[] = [
    { id: 'anton', name: 'Anton' },
    { id: 'archivo_black', name: 'Archivo Black' },
    { id: 'bangers', name: 'Bangers' },
    { id: 'bebas_neue', name: 'Bebas Neue' },
    { id: 'caveat', name: 'Caveat' },
    { id: 'creepster', name: 'Creepster' },
    { id: 'dancing_script', name: 'Dancing Script' },
    { id: 'impact', name: 'Impact' },
    { id: 'lato', name: 'Lato' },
    { id: 'lobster', name: 'Lobster' },
    { id: 'merriweather', name: 'Merriweather' },
    { id: 'monoton', name: 'Monoton' },
    { id: 'montserrat', name: 'Montserrat' },
    { id: 'nosifier', name: 'Nosifier' },
    { id: 'oswald', name: 'Oswald' },
    { id: 'pacifico', name: 'Pacifico' },
    { id: 'permanent_marker', name: 'Permanent Marker' },
    { id: 'playfair_display', name: 'Playfair Display' },
    { id: 'poppins', name: 'Poppins' },
    { id: 'press_start_2p', name: 'Press Start 2P' },
    { id: 'roboto', name: 'Roboto' },
    { id: 'rock_salt', name: 'Rock Salt' },
    { id: 'special_elite', name: 'Special Elite' },
    { id: 'zilla_slab', name: 'Zilla Slab' },
];


// This is a placeholder for a base image of a model wearing a t-shirt.
// In a real application, you would use a high-quality image.
// For this example, we will ask the AI to generate the model too.
export const BASE_MODEL_IMAGE_B64 = ''; // We will generate the model instead of editing a base image.

export const WRITING_TEMPLATES: WritingTemplateCategory[] = [
  {
    id: 'holidays',
    nameKey: 'templateCategory_holidays',
    templates: [
      { id: 'halloween_1', nameKey: 'template_halloween_1', value: 'Spooky Season' },
      { id: 'halloween_2', nameKey: 'template_halloween_2', value: 'Trick or Treat' },
      { id: 'halloween_3', nameKey: 'template_halloween_3', value: 'Witch Please' },
      { id: 'christmas_1', nameKey: 'template_christmas_1', value: 'Merry & Bright' },
      { id: 'christmas_2', nameKey: 'template_christmas_2', value: 'Jingle All The Way' },
      { id: 'new_year_1', nameKey: 'template_new_year_1', value: 'New Year, New Me' },
    ],
  },
  {
    id: 'days_of_week',
    nameKey: 'templateCategory_days_of_week',
    templates: [
      { id: 'monday_1', nameKey: 'template_monday_1', value: 'Monday Mood' },
      { id: 'tuesday_1', nameKey: 'template_tuesday_1', value: 'Taco Tuesday' },
      { id: 'wednesday_1', nameKey: 'template_wednesday_1', value: 'On Wednesdays We Wear Pink' },
      { id: 'friday_1', nameKey: 'template_friday_1', value: 'Fri-nally!' },
      { id: 'saturday_1', nameKey: 'template_saturday_1', value: 'Saturday Vibes' },
    ],
  },
  {
    id: 'themes',
    nameKey: 'templateCategory_themes',
    templates: [
      { id: 'coffee_1', nameKey: 'template_coffee_1', value: 'But First, Coffee' },
      { id: 'coffee_2', nameKey: 'template_coffee_2', value: 'Powered by Caffeine' },
      { id: 'funny_1', nameKey: 'template_funny_1', value: 'I\'m Not Lazy, I\'m on Energy Saving Mode' },
      { id: 'inspirational_1', nameKey: 'template_inspirational_1', value: 'Good Vibes Only' },
      { id: 'inspirational_2', nameKey: 'template_inspirational_2', value: 'Dream Big' },
    ],
  },
];