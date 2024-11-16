import { useState } from 'react';
import { Card } from '@/components/ui/card';

// Define types for the conversation messages
interface ConversationMessage {
  type: 'user' | 'ai';  // Using literal types for better type safety
  text: string;
}

// Define type for mood responses
type MoodResponse = {
  [key in 'energetic' | 'tired' | 'hungry']: string;
};

const AIGreeting = () => {
  const [isResponding, setIsResponding] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  
  // Get time of day
  const hour = new Date().getHours();
  const timeOfDay = 
    hour < 12 ? 'morning' :
    hour < 17 ? 'afternoon' : 'evening';

  // Initial greeting
  const initialGreeting = `Good ${timeOfDay}, foodie! How are you feeling today? I'd love to help you find the perfect meal.`;

  // Type the mood responses object
  const moodResponses: MoodResponse = {
    'energetic': "Sounds like a great day for trying something new! How about a vibrant, fresh meal?",
    'tired': "Let me suggest some easy comfort food options that won't take too much effort.",
    'hungry': "I've got some quick and satisfying meals in mind! What cuisine are you craving?",
  };

  const handleUserResponse = async (mood: keyof MoodResponse) => {
    setIsResponding(true);
    
    setConversation([
      ...conversation,
      { type: 'user', text: mood },
      { type: 'ai', text: moodResponses[mood] || "Let's find something perfect for you!" }
    ]);
    setIsResponding(false);
  };

  return (
    <Card className="p-6 mb-8">
      <div className="space-y-4">
        {/* Initial Greeting */}
        <p className="text-xl font-medium">{initialGreeting}</p>
        
        {/* Quick Response Buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleUserResponse('energetic')}
            className="px-4 py-2 bg-green-100 hover:bg-green-200 rounded-full text-green-700"
          >
            Feeling Energetic!
          </button>
          <button
            onClick={() => handleUserResponse('tired')}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-700"
          >
            Kind of Tired...
          </button>
          <button
            onClick={() => handleUserResponse('hungry')}
            className="px-4 py-2 bg-orange-100 hover:bg-orange-200 rounded-full text-orange-700"
          >
            Super Hungry!
          </button>
        </div>

        {/* Conversation History */}
        {conversation.map((message, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-gray-100 ml-auto max-w-[80%]' 
                : 'bg-blue-100 mr-auto max-w-[80%]'
            }`}
          >
            {message.text}
          </div>
        ))}

        {/* Loading State */}
        {isResponding && (
          <div className="bg-gray-100 p-3 rounded-lg animate-pulse">
            Thinking...
          </div>
        )}
      </div>
    </Card>
  );
};

export default AIGreeting;