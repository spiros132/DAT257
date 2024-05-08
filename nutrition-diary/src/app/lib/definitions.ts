// Common interfaces
export interface Photo {
    thumb: string;
    highres: any;
    is_user_uploaded: boolean | undefined;
}

export interface Nutrient {
    attr_id: number;
    value: number;
}

export interface Metadata {
    is_raw_food: boolean;
}

export interface Tags {
    item: string;
    measure: string | null;
    quantity: string;
    food_group: number;
    tag_id: number;
}

export interface AltMeasures {
    serving_weight: number;
    measure: string;
    seq: number;
    qty: number;
}

// The API for searching multiple items
export interface SearchListFoodItemBase {
    food_name: string;
    serving_unit: string;
    serving_qty: number;
    photo: Photo;
    locale: string;
}

export interface SearchListFoodItemCommon extends SearchListFoodItemBase {
    tag_name: string;
    common_type: any;
    tag_id: string;
}

export interface SearchListFoodItemBranded extends SearchListFoodItemBase {
    nix_brand_id: string;
    brand_name_item_name: string;
    nf_calories: number;
    brand_name: string;
    region: number;
    brand_type: number;
    nix_item_id: string;
}


// The API for searching of the nutrients of item(s)
export interface SearchFoodItemNutrients {
    food_name: string;
    brand_name: string | null;
    
    serving_qty: number;    
    serving_unit: string;
    
    nf_calories: number;
    nf_total_fat: number;
    nf_saturated_fat: number;
    nf_cholesterol: number;
    nf_sodium: number;
    nf_total_carbohydrate: number;
    nf_dietary_fiber: number;
    nf_sugars: number;
    nf_protein: number;
    nf_potassium: number;
    nf_p: number;
    full_nutrients: Nutrient[];
    
    nix_brand_name: string | null | undefined;
    nix_brand_id: string | null | undefined;
    nix_item_name: string | null | undefined;
    nix_item_id: string | null | undefined;
    upc: string | null | undefined;

    consumed_at: string;
    metadata: Metadata;

    source: number;

    ndb_no: number;

    tags: Tags;

    alt_measures: AltMeasures[];

    lat: string | null;
    lng: string | null;
    meal_type: number;

    photo: Photo;

    sub_recipe: string | null;
    class_code: string | null;
    brick_code: string | null;
    tag_id: string | null;
}


// The API classes
export class SearchFoodItemNutrientsData {
    foods: SearchFoodItemNutrients[] = [];
}

export class SearchListFoodItemData {
    common: SearchListFoodItemCommon[] = [];
    branded: SearchListFoodItemBranded[] = [];
}

// Database interfaces
export interface UserInterface {
    username: string;
    height: number;
    weight: number;
}
export interface SavedFoodData {
    food_name: string;
    serving_unit: string;
    serving_qty: number;
    nix_brand_name: string | null | undefined;
    nix_item_name: string | null | undefined;
    photo: string;
    nix_item_id: string | null | undefined;
    upc: string | null | undefined;
    nf_calories: number;
    nf_protein: number;
    nf_fat: number;
    nf_carbohydrates: number;
}
