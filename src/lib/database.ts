// src/lib/database.ts
import { supabase } from './supabaseClient'; // Ensure the path matches your project structure
import { Recipe } from '@/types'; // Import Recipe type

// Add a new recipe
export async function addRecipe(recipeData: Partial<Recipe>) {
  const { data, error } = await supabase
    .from('recipes')
    .insert([recipeData]);

  if (error) throw error;
  return data;
}

// Fetch ingredients by recipe ID
export async function fetchIngredientsByRecipe(recipeId: string) {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .eq('recipe_id', recipeId);

  if (error) throw error;
  return data;
}
