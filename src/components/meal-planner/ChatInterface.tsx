import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';
import type { UserMood, LocationData } from '@/types';

interface ChatOption {
  text: string;
  value: string;
  action?: () => void;
}

interface ChatMessage {
  id: string;
  type: 'ai' | 'user';
  message: string;
  options?: ChatOption[];
}

interface ChatInterfaceProps {
  onMoodSelect: (mood: UserMood) => void;
  locationData: LocationData;
  season: string;
  userMood: UserMood;
}

export default function ChatInterface({ 
  onMoodSelect, 
  locationData, 
  season,
  userMood 
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    const locationName = locationData?.city || locationData?.country_name || "your area";
    
    const initialMessage: ChatMessage = {
      id: '1',
      type: 'ai',
      message: `${timeGreeting}! Welcome to ${locationName}. It's a beautiful ${season} day for cooking!`,
      options: !userMood ? [
        { text: "What's cooking today?", value: 'start_conversation' },
        { text: "I need meal suggestions", value: 'get_suggestions' }
      ] : undefined
    };
    
    setMessages([initialMessage]);
  }, [locationData, season, userMood]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: text
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          mood: userMood,
          season: season
        }),
      });

      const data = await response.json();

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: data.reply,
        options: !userMood ? [
          { 
            text: "Energetic!",
            value: 'energetic',
            action: () => onMoodSelect('energetic')
          },
          { 
            text: "Kind of tired...",
            value: 'tired',
            action: () => onMoodSelect('tired')
          },
          { 
            text: "Really hungry!",
            value: 'hungry',
            action: () => onMoodSelect('hungry')
          },
          { 
            text: "Feeling relaxed",
            value: 'relaxed',
            action: () => onMoodSelect('relaxed')
          }
        ] : undefined
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: "Sorry, I'm having trouble responding right now. Please try again."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionClick = (option: ChatOption) => {
    if (!option) return;
    
    if (option.action) {
      option.action();
    }
    if (option.text) {
      handleSendMessage(option.text);
    }
  };

  return (
    <Card className="border-2 border-primary shadow-lg">
      <CardHeader>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'ai' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  msg.type === 'ai' ? 'bg-primary/10' : 'bg-secondary/10'
                } rounded-lg p-4`}
              >
                {msg.type === 'ai' && <MessageSquare className="w-5 h-5 mt-1" />}
                <div className="space-y-2">
                  <p>{msg.message}</p>
                  {msg.options && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option)}
                          className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-700 transition-colors"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim()}
            className="p-2 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </CardHeader>
    </Card>
  );
}