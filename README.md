# Meal Planner Pop - Project Documentation

This project is a meal planning app with dynamic features like AI-driven conversations, mood-based recommendations, seasonal greetings, and location-based personalization.

---

## Project Structure

### **1. Core Components**

#### `/src/app/page.tsx`
- **Purpose:** Main entry point for the application
- **Features:**
  - Renders the Dashboard component
  - Server-side configurations
  - Layout management

#### `/src/components/meal-planner/Dashboard.tsx`
- **Purpose:** Main dashboard component providing:
  - AI-driven conversational interface
  - Mood-based meal suggestions
  - Dynamic greeting messages based on location and season
- **Key Features:**
  - Interactive mood selection system
  - Dynamic conversation flow
  - Location-aware greetings
  - Season detection
  - Loading states with animations
- **Dependencies:**
  - Uses `locationUtils.ts` for location/season data
  - Integrates with `QuickMealIdeas` for meal display
  - Uses Lucide icons for UI elements
- **State Management:**
  - Tracks user mood
  - Manages conversation flow
  - Handles loading states

#### `/src/components/meal-planner/QuickMealIdeas.tsx`
- **Purpose:** Enhanced meal display component
- **Key Features:**
  - Like/save functionality with animations
  - Share capabilities
  - Expandable recipe instructions
  - Mood-based meal filtering
  - Responsive grid layout
  - Interactive hover states
  - Error handling and loading states
- **Props:**
  - `userMood`: Influences meal suggestions
  - `season`: Affects seasonal recommendations
- **Data Management:**
  - Fetches and manages meal data
  - Handles loading and error states
  - Manages expanded state for instructions

#### `/src/components/meal-planner/MealCard.tsx`
- **Purpose:** Individual meal display component
- **Key Features:**
  - Responsive image display
  - Like/unlike functionality
  - Share capabilities
  - Expandable content
  - Hover effects
- **Props:**
  - `meal`: Meal data
  - `onLike`: Like handler
  - `onShare`: Share handler
  - `isExpanded`: Expansion state
  - `onToggleExpand`: Expansion handler

### **2. Type Definitions**

#### `/src/types/index.ts`
- **Core Types:**
  ```typescript
  type UserMood = 'energetic' | 'tired' | 'hungry' | 'relaxed' | null;
  
  interface Recipe {
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

  interface EnhancedMeal extends Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    isLiked?: boolean;
    isExpanded?: boolean;
  }

  3. Utility Functions
/src/lib/utils.ts

Class name merging utilities
Helper functions for data transformation
Common utility functions


Features Implementation
1. AI Conversation System

Dynamic greeting based on:

Time of day
User's location
Current season
Previous interactions


Mood-based interaction flow
Visual feedback for AI responses

2. Interactive Meal Display

Grid-based responsive layout
Like/save functionality
Share capabilities

Web Share API support
Clipboard fallback


Expandable content
Loading states and error handling

3. Enhanced UI/UX

Responsive design
Loading animations
Error boundaries
Accessibility improvements

ARIA labels
Keyboard navigation
Screen reader support




Technical Implementation
State Management

React Hooks for state management
TypeScript for type safety
Error boundaries for error handling

Styling

Tailwind CSS for styling
shadcn/ui components
Lucide icons
Responsive design principles

Performance

Image optimization with Next.js Image
Loading states
Error handling
Type safety


Future Enhancements

API Integration:

Implement /api/meal-ideas endpoint
Add authentication
Database integration


UI Improvements:

Toast notifications
Enhanced animations
More interactive elements


Feature Additions:

User preferences storage
Meal favorites system
Social sharing enhancements


Performance Optimization:

Image lazy loading
Code splitting
Cache management




Getting Started
bashCopynpm install
npm run dev
Visit http://localhost:3000 to see the application in action.

Contributing
Feel free to contribute to this project. Please ensure you follow the existing code structure and type safety patterns.
