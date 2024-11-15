// src/types/index.ts
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
    mood?: string;
    cuisine?: string;
    occasion?: string;
  }
  