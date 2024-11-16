import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heart, Share2, ChevronDown, ChevronUp } from 'lucide-react';

interface MealCardProps {
  meal: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
  };
  onLike: () => void;
  onShare: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function MealCard({ 
  meal, 
  onLike, 
  onShare, 
  isExpanded, 
  onToggleExpand 
}: MealCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative w-full pt-[75%]">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      <CardHeader className="flex-1">
        <CardTitle className="text-lg">{meal.strMeal}</CardTitle>
        <div className="text-sm text-gray-500">
          {meal.strCategory} | {meal.strArea}
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {isExpanded && (
          <p className="text-sm text-gray-600">
            {meal.strInstructions}
          </p>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={onLike}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={onShare}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={onToggleExpand}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}