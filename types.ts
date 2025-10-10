// FIX: Add missing React import to resolve "Cannot find namespace 'React'" error.
import React from 'react';

export type DesignStyle = 'classic' | 'split' | 'sketch' | 'slasher' | 'vintage_stamp' | 'retro_wave' | 'minimalist_line' | 'grunge_overlay' | 'full_wrap' | 'full_front' | 'cyberpunk_glitch' | 'stacked_text' | 'emblem' | 'photo_text' | 'american_traditional_tattoo' | 'watercolor_splash' | 'art_deco' | 'pop_art' | 'cosmic_galaxy' | 'japanese_ukiyo-e' | 'distressed_vintage' | 'typography_focus' | 'abstract_geometric' | 'vintage_poster' | 'geometric_pattern' | 'hand_drawn_sketch' | 'boho_floral_wreath' | 'girly_script_heart' | 'celestial_moon_phases' | 'glam_leopard_print' | 'kawaii_cute_doodle' | 'watercolor_blooms' | 'gold_foil_accents' | 'lace_trim_border' | 'pastel_tie_dye' | 'starry_night_sky' | 'cherry_blossom_dream' | 'satin_lace_trim' | 'rose_gold_glitter' | 'dreamy_angel_wings' | 'sensual_smoke_perfume' | 'full_circle' | 'upper_half_circle' | 'lower_half_circle' | 'upper_oval' | 'lower_oval';
export type ModelPose = 'flat_lay_simple' | 'standing' | 'sitting' | 'sitting_floor_cozy' | 'recumbent' | 'smiling_glasses' | 'back' | 'drinking_tea' | 'jumping' | 'dancing' | 'meditating' | 'heroic' | 'action' | 'yoga' | 'casual_lean' | 'walking_street' | 'laughing' | 'arms_crossed' | 'thinking' | 'hands_in_pockets' | 'closeup_casual' | 'sitting_hand_hip' | 'sitting_on_counter' | 'sultry_shoulder_look' | 'gentle_touch_face' | 'windswept_hair_dreamy' | 'lounging_on_silk' | 'playful_peekaboo' | 'cozy_sweater_hug' | 'sun_kissed_glow_portrait' | 'playful_hair_toss_laugh' | 'meadow_daydream_top_down' | 'city_lights_glamour' | 'delicate_flower_touch' | 'parisian_balcony_daydream' | 'cozy_cafe_window_rain' | 'secret_garden_reading' | 'vintage_car_glamour' | 'sitting_floor_relaxed' | 'sitting_cross_legged_side' | 'leaning_on_floor' | 'standing_three_quarter_hands_pockets' | 'standing_rear_three_quarter' | 'sitting_top_down' | 'low_angle_arms_crossed' | 'closeup_chest_design' | 'full_body_slouched' | 'sitting_on_chair_dynamic';
export type ModelAudience = 
  // Female
  'teenager_female_skater' |
  'woman_20s_athletic' | 'woman_20s_urban_fashion' | 'woman_20s_barista' | 'woman_stylish_redhead' |
  'woman_30s_casual' | 'woman_30s_yogi' | 'woman_30s_plus_size_confident' |
  'woman_40s_professional' | 'woman_40s_edgy_tattoos' | 'middle_aged_woman_artist' |
  'woman_50s_elegant' | 'woman_50s_traveler' |
  'elderly_woman_gardener' | 'elderly_woman_baker' |
  // Male
  'teenager_male_gamer' |
  'man_20s_student' | 'young_man_musician' |
  'man_30s_creative' |
  'man_40s_business' |
  'man_50s_distinguished';

export type TshirtFont = 'impact' | 'bebas_neue' | 'lobster' | 'montserrat' | 'oswald' | 'anton' | 'archivo_black' | 'pacifico' | 'bangers' | 'permanent_marker' | 'roboto' | 'playfair_display' | 'creepster' | 'nosifier' | 'merriweather' | 'lato' | 'poppins' | 'zilla_slab' | 'caveat' | 'dancing_script' | 'rock_salt' | 'special_elite' | 'press_start_2p' | 'monoton';

// New types
export type ProductType = 'tshirt' | 'sweatshirt' | 'hoodie' | 'bag' | 'frame' | 'mug' | 'sipper_glass' | 'tumbler_wrap' | 'halloween_tumbler' | 'tumbler_trio' | 'laser_engraving' | 'phone_case' | 'sticker' | 'poster' | 'wallet' | 'cap' | 'beanie' | 'pillow' | 'flat_lay' | 'jigsaw_puzzle' | 'laptop_sleeve' | 'tshirt_teacup_scene' | 'sweatshirt_mug_scene' | 'hoodie_teacup_scene' | 'sweatshirt_teacup_scene';
export type BagMaterial = 'canvas' | 'leather' | 'nylon' | 'denim' | 'soft_pink_velvet' | 'blush_pink_silk' | 'white_lace_overlay' | 'rose_gold_sequins' | 'creamy_faux_fur';
export type TextStyle = 'none' | 'outline' | 'shadow' | 'glow' | '3d' | 'metallic' | 'gradient' | 'distressed' | 'fire' | 'comic' | 'glitch' | 'pastel_rainbow' | 'neon' | 'chrome' | 'ice' | 'wooden' | 'script' | 'varsity';
export type FrameStyle = 'classic_ornate' | 'modern_minimalist' | 'rustic_barnwood' | 'modern_mahogany' | 'rose_gold_ornate' | 'pearl_inlay_minimalist' | 'velvet_lined_shadow_box' | 'lace_carved_wood' | 'shabby_chic_distressed';
export type FrameModel = 'elegant_woman_street' | 'art_curator_gallery' | 'craftsman_workshop' | 'man_modern_loft' | 'woman_cozy_living_room' | 'couple_art_store' | 'boudoir_vanity_glamour' | 'lounging_on_silk_sheets' | 'parisian_cafe_chic' | 'floral_garden_sunlight' | 'rooftop_sunset_glamour' | 'school_counselor_office' | 'psychologist_office' | 'luxurious_american_office';
export type FrameDimension = '8.5x11' | '14x11' | '20x16' | '36x24' | 'A1' | 'A2' | 'A3' | 'A4';
export type FrameTexture = 'none' | 'grainy' | 'canvas' | 'rough' | 'smooth';
export type MugStyle = 'classic_ceramic' | 'modern_glass' | 'vintage_enamel' | 'pearl_lustre_ceramic' | 'gold_rimmed_porcelain' | 'matte_pink_heart_handle' | 'scalloped_edge_teacup' | 'rose_gold_metallic';
export type MugModel = 'woman_cafe' | 'man_office' | 'person_cozy_home';
export type SipperGlassStyle = 'classic_can_shape' | 'modern_tapered' | 'frosted_finish' | 'rose_gold_rim_crystal' | 'iridescent_holographic' | 'etched_lace_pattern' | 'frosted_pink_ombre' | 'stemless_pearl_finish';
export type SipperGlassModel = 'woman_cafe_elegant' | 'man_modern_kitchen' | 'person_outdoor_patio';
export type TumblerStyle = 'stainless_steel' | 'matte_finish' | 'glossy_white' | 'rose_gold_ombre_glitter' | 'pearlized_marble' | 'satin_finish_blush_pink' | 'lace_etched_crystal' | 'holographic_chrome' | 'soft_touch_lilac' | 'brushed_rose_gold' | 'watercolor_peony' | 'champagne_gold_glitter' | 'minimalist_ceramic_matte' | 'geode_crystal_rose_quartz' | 'mother_of_pearl_inlay' | 'silk_wrapped_blossom' | 'liquid_marble_rose_gold' | 'embossed_velvet' | 'soft_ombre_pearl' | 'engraved_botanical_matte' | 'gilded_agate_slice' | 'silk_ribbon_wrap' | 'cherry_blossom_emboss' | 'porcelain_rose_inlay' | 'opalescent_glass' | 'sculpted_floral_metal' | 'pressed_wildflower_resin' | 'embroidered_linen_wrap' | 'rose_quartz_crystal_point' | 'butterfly_wing_iridescent' | 'vintage_porcelain_tea_rose';
export type TumblerModel = 'person_gym' | 'hiker_trail' | 'student_desk' | 'woman_yoga_studio_close_up' | 'woman_luxury_spa_relaxing' | 'woman_beach_sunset_glow' | 'woman_chic_home_office_break' | 'woman_rooftop_lounge_glam';
export type HalloweenTumblerStyle = 'glossy_black' | 'matte_black' | 'stainless_steel';
export type HalloweenTumblerSetting = 'spooky_table' | 'haunted_house' | 'witchs_cauldron' | 'autumn_porch' | 'glam_witch_boudoir' | 'enchanted_moonlit_garden' | 'vampires_velvet_lounge' | 'pastel_goth_sweet_shop' | 'mystical_crystal_ball_reading';
export type TumblerTrioStyle = 'glossy_white' | 'matte_white' | 'stainless_steel';
export type TumblerTrioSetting = 'marble_countertop' | 'light_wood' | 'minimalist_shelf';
// Phone Case Types
export type PhoneCaseStyle = 'glossy' | 'matte' | 'clear';
export type PhoneCaseModel = 'person_holding' | 'on_desk' | 'flat_lay' | 'glamorous_mirror_selfie' | 'chic_cafe_lifestyle' | 'night_out_essential' | 'cozy_bed_morning' | 'rooftop_golden_hour';
// Sticker Types
export type StickerStyle = 'die_cut_glossy' | 'kiss_cut_matte' | 'holographic';
export type StickerSetting = 'on_laptop' | 'on_water_bottle' | 'on_notebook';
// Poster Types
export type PosterStyle = 'glossy_finish' | 'matte_finish';
export type PosterSetting = 'framed_on_wall' | 'person_holding' | 'taped_on_brick_wall';
// Wallet Types
export type WalletStyle = 'bifold' | 'cardholder' | 'zipper' | 'quilted_leather_chain' | 'pastel_pink_saffiano' | 'floral_embroidered_clutch' | 'rose_gold_metallic' | 'plush_velvet_pearl' | 'satin_bow_clutch' | 'lace_and_silk_wallet' | 'pearl_encrusted_cardholder' | 'holographic_mermaid_wallet' | 'plush_faux_fur_clutch';
export type WalletModel = 'person_holding' | 'flat_lay_desk' | 'in_pocket' | 'lounging_on_silk_sheets' | 'parisian_cafe_chic' | 'boudoir_vanity_table' | 'floral_garden_sunlight' | 'rooftop_sunset_glamour';
// Cap Types
export type CapStyle = 'structured_baseball' | 'unstructured_dad_hat' | 'snapback' | 'floral_trucker' | 'satin_luxe' | 'pastel_suede' | 'bow_back_canvas' | 'lace_overlay_trucker' | 'pearl_embellished_denim' | 'velvet_baseball_cap' | 'silk_scarf_tie_hat';
export type CapModel = 'person_forwards' | 'person_backwards' | 'flat_lay';
// Beanie Types
export type BeanieStyle = 'cuffed' | 'slouchy' | 'pom_pom' | 'angora_pearl' | 'chenille_heart_knit' | 'slouchy_cashmere' | 'luxe_faux_fur_pompom' | 'satin_lined_slouchy' | 'floral_embroidery' | 'sequin_knit' | 'veiled_beanie' | 'beret_style' | 'cable_knit_heart_pattern' | 'ribbon_woven_beanie' | 'mohair_fluffy_beanie' | 'crystal_scatter_beanie';
export type BeanieModel = 'person_forwards' | 'person_side_profile' | 'flat_lay' | 'cozy_window_seat' | 'sweater_weather_cuddle' | 'winter_wonderland_portrait' | 'playful_wink_smile' | 'cafe_steam_soft_light';
// Pillow Types
export type PillowStyle = 'square_cotton' | 'lumbar_linen' | 'round_velvet' | 'plush_faux_fur_heart' | 'satin_with_lace_trim' | 'round_velvet_with_tassel' | 'silk_bolster' | 'ruffled_linen_square' | 'sequin_mermaid_shimmer' | 'tulle_and_pearl_overlay' | 'chunky_knit_wool' | 'silk_with_crystal_brooch';
export type PillowSetting = 'on_sofa' | 'on_bed' | 'on_armchair' | 'luxury_boudoir_bed' | 'plush_window_nook' | 'chic_velvet_sofa' | 'faux_fur_rug_romance' | 'dreamy_chaise_lounge';
// Flat Lay Types
export type FlatLayStyle = 'minimalist_neutral' | 'rustic_outdoors' | 'urban_streetwear' | 'cozy_autumn' | 'beach_vacation' | 'tech_gadget' | 'coffee_lover' | 'fitness_active' | 'bookworm_academic' | 'artists_studio' | 'gourmet_kitchen' | 'bohemian_chic' | 'glamorous_night_out' | 'home_spa_day' | 'digital_nomad_female' | 'baking_enthusiast' | 'parisian_chic' | 'cottagecore_dream' | 'sakura_spring' | 'luxe_vanity' | 'watercolor_artist' | 'flat_lay_folded_close_up' | 'flat_lay_draped_close_up' | 'flat_lay_pocket_region_close_up' | 'flat_lay_texture_close_up' | 'boudoir_vanity_glamour' | 'parisian_cafe_lifestyle' | 'silk_sheets_romance' | 'cherry_blossom_dreamscape' | 'watercolor_artist_studio' | 'vintage_love_letters' | 'ballet_core_elegance' | 'luxe_skincare_shelfie' | 'afternoon_high_tea' | 'princess_dream_vanity';
// Jigsaw Puzzle Types
export type PuzzleStyle = 'rectangle_cardboard' | 'heart_shaped_wood';
export type PuzzleSetting = 'on_wooden_table' | 'family_playing' | 'flat_lay_minimalist';
// Laptop Sleeve Types
export type LaptopSleeveStyle = 'neoprene' | 'leather_folio' | 'canvas_pouch';
export type LaptopSleeveSetting = 'on_desk_modern' | 'person_carrying_street' | 'flat_lay_minimalist';


export type ImageMode = 'fit' | 'fit_blur' | 'fit_transparent' | 'crop' | 'stretch';
export type AspectRatio = '1:1' | '16:9' | '9:16';
export type BackgroundStyle = 'studio' | 'urban_street' | 'natural_landscape' | 'dreamy_bokeh_lights' | 'luxury_silk_drape' | 'rose_petal_bed' | 'sunset_beach_glow' | 'elegant_boudoir' | 'plush_velvet_couch' | 'cherry_blossom_dreamscape' | 'satin_sheets_boudoir' | 'golden_hour_meadow' | 'sparkling_champagne_bokeh' | 'woodland_camo' | 'desert_camo' | 'urban_camo' | 'digital_camo' | 'ethereal_clouds_sky' | 'enchanted_forest_light' | 'glittering_water_surface' | 'opulent_ballroom' | 'vintage_bookstore';
export type ProfessionalBackground = 
  // Stone
  'white_marble' | 'black_slate' | 'pink_marble' | 'raw_concrete' | 'terrazzo_stone' | 'mother_of_pearl' |
  // Wood
  'rich_walnut' | 'light_oak' | 'whitewashed_wood' |
  'bamboo_wood' | 'cherry_wood' | 'maple_wood' | 'walnut_wood_dark' | 'pine_wood_light' | 'acacia_wood' | 'olive_wood' | 'rustic_reclaimed_wood' | 'zebrawood' | 'ebony_wood' |
  // Metal & Glitter
  'brushed_metal' | 'polished_rose_gold' | 'rose_gold_glitter' | 'cracked_gold_leaf' | 'holographic_foil' |
  // Fabric & Textile
  'dark_leather' | 'textured_linen' | 'natural_jute_mat' | 'plush_velvet_fabric' | 'soft_pink_velvet' | 'blush_pink_silk' | 'white_lace_overlay' |
  // Specialty / Patterned
  'vintage_floral_wallpaper';

// New types for writing templates
export type WritingTemplate = {
  id: string;
  nameKey: string;
  value: string;
};

export type WritingTemplateCategory = {
  id: string;
  nameKey: string;
  templates: WritingTemplate[];
};

export interface DesignOptions {
  productType: ProductType;
  logo: string | null;
  text: string;
  productColor: string; // Renamed from tshirtColor
  textColor: string;
  font: TshirtFont;
  textStyle: TextStyle;
  gradientStartColor: string;
  gradientEndColor: string;
  aspectRatio: AspectRatio;
  backgroundStyle: BackgroundStyle;
  professionalBackground: ProfessionalBackground;
  
  // T-shirt specific
  style: DesignStyle;
  pose: ModelPose;
  audience: ModelAudience;

  // Bag specific
  bagMaterial: BagMaterial;

  // Frame specific
  frameStyle: FrameStyle;
  frameModel: FrameModel;
  frameDimension: FrameDimension;
  frameTexture: FrameTexture;

  // Mug specific
  mugStyle: MugStyle;
  mugModel: MugModel;

  // Sipper Glass specific
  sipperGlassStyle: SipperGlassStyle;
  sipperGlassModel: SipperGlassModel;

  // Tumbler Wrap specific
  tumblerStyle: TumblerStyle;
  tumblerModel: TumblerModel;

  // Halloween Tumbler specific
  halloweenTumblerStyle: HalloweenTumblerStyle;
  halloweenTumblerSetting: HalloweenTumblerSetting;

  // Tumbler Trio specific
  tumblerTrioStyle: TumblerTrioStyle;
  tumblerTrioSetting: TumblerTrioSetting;
  
  // Phone Case specific
  phoneCaseStyle: PhoneCaseStyle;
  phoneCaseModel: PhoneCaseModel;

  // Sticker specific
  stickerStyle: StickerStyle;
  stickerSetting: StickerSetting;

  // Poster specific
  posterStyle: PosterStyle;
  posterSetting: PosterSetting;

  // Wallet specific
  walletStyle: WalletStyle;
  walletModel: WalletModel;

  // Cap specific
  capStyle: CapStyle;
  capModel: CapModel;
  
  // Beanie specific
  beanieStyle: BeanieStyle;
  beanieModel: BeanieModel;

  // Pillow specific
  pillowStyle: PillowStyle;
  pillowSetting: PillowSetting;

  // Flat Lay specific
  flatLayStyle: FlatLayStyle;

  // Puzzle specific
  puzzleStyle: PuzzleStyle;
  puzzleSetting: PuzzleSetting;

  // Laptop Sleeve specific
  laptopSleeveStyle: LaptopSleeveStyle;
  laptopSleeveSetting: LaptopSleeveSetting;
}

export type SetDesignOptions = React.Dispatch<React.SetStateAction<DesignOptions>>;