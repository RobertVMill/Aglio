// src/types/index.ts

// Existing types
export type UserMood = 'energetic' | 'tired' | 'hungry' | 'relaxed' | null;

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
  servings?: number;
  is_special?: boolean;
  prep_time?: number;
  cook_time?: number;
  mood?: UserMood | string;
  cuisine?: string;
  occasion?: string;
  isLiked?: boolean;
}

// New types for the meal planner components
export interface LocationData {
  city?: string;
  country_name?: string;
  latitude?: number;
  longitude?: number;
}

export interface EnhancedMeal extends Omit<Recipe, 'id'> {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  isLiked?: boolean;
  isExpanded?: boolean;
}

export type FetchState = 'idle' | 'loading' | 'error' | 'success';

export type ShareMethod = 'copy' | 'sms' | 'email';

export interface MealCardProps {
  meal: EnhancedMeal;
  onLike: (id: string) => void;
  onShare: (meal: EnhancedMeal) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export interface QuickMealIdeasProps {
  userMood?: UserMood;
  season?: string;
}